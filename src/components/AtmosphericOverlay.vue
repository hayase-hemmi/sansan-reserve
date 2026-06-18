<template>
  <canvas ref="canvas" class="atmospheric-canvas" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useTheme, type ThemeMode } from '../composables/useTheme'

const { currentTheme } = useTheme()
const canvas = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null
let animationId = 0
let particles: Particle[] = []

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  phase: number
  phaseSpeed: number
  drift: number
  layer: number
  twinklePhase?: number
  twinkleSpeed?: number
  rotation?: number
  rotationSpeed?: number
  length?: number
  splashTimer?: number
}

function resize() {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

function initParticles(mode: ThemeMode) {
  particles = []
  if (!canvas.value) return
  const w = canvas.value.width
  const h = canvas.value.height

  switch (mode) {
    case 'night':
      // Stars only (no moon)
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.75,
          size: Math.random() * 1.8 + 0.3,
          speed: 0, opacity: Math.random() * 0.7 + 0.2,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0, drift: 0, layer: 0,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.03 + 0.008,
        })
      }
      break

    case 'moonlight':
      // Stars + moon
      for (let i = 0; i < 120; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.7,
          size: Math.random() * 2 + 0.4,
          speed: 0, opacity: Math.random() * 0.8 + 0.2,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0, drift: 0, layer: 0,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
        })
      }
      break

    case 'sunny':
      // Warm floating dust in sunlight
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 2.5 + 0.5,
          speed: Math.random() * 0.2 + 0.05,
          opacity: Math.random() * 0.3 + 0.1,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: Math.random() * 0.008 + 0.003,
          drift: (Math.random() - 0.5) * 0.3,
          layer: Math.floor(Math.random() * 3),
        })
      }
      break

    case 'rainy':
      // Raindrops - 3 layers
      for (let i = 0; i < 150; i++) {
        const layer = i < 30 ? 0 : i < 80 ? 1 : 2
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: [2, 1.5, 1][layer]!,
          speed: [8, 12, 16][layer]! + Math.random() * 2,
          opacity: [0.3, 0.2, 0.12][layer]!,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0, drift: -1.5,
          layer,
          length: [18, 14, 10][layer]!,
          splashTimer: 0,
        })
      }
      break

    case 'snowy':
      // Snowflakes - 3 layers
      for (let i = 0; i < 80; i++) {
        const layer = i < 15 ? 0 : i < 40 ? 1 : 2
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: [4, 2.5, 1.5][layer]! + Math.random() * [2, 1.2, 0.8][layer]!,
          speed: [0.5, 0.9, 1.4][layer]! + Math.random() * 0.3,
          opacity: [0.7, 0.45, 0.25][layer]!,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: Math.random() * 0.02 + 0.005,
          drift: (Math.random() - 0.5) * 0.3,
          layer,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
        })
      }
      break
  }
}

// ── Draw functions ──

function drawStars(time: number, withMoon: boolean) {
  if (!ctx || !canvas.value) return
  const w = canvas.value.width
  const h = canvas.value.height

  for (const p of particles) {
    const twinkle = Math.sin(time * (p.twinkleSpeed || 0.02) + (p.twinklePhase || 0))
    const brightness = p.opacity * (0.5 + twinkle * 0.5)
    const flash = Math.sin(time * 0.001 + p.phase) > 0.98 ? 1.4 : 1
    const a = Math.min(brightness * flash, 1)

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(220, 230, 255, ${a})`
    ctx.fill()

    if (p.size > 1.5) {
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
      grad.addColorStop(0, `rgba(200, 215, 255, ${a * 0.25})`)
      grad.addColorStop(1, 'rgba(200, 215, 255, 0)')
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
    }
  }

  if (withMoon) {
    const mx = w * 0.82
    const my = h * 0.12
    const r = Math.min(w, h) * 0.04

    // Halo
    const haloScale = 1 + Math.sin(time * 0.0004) * 0.03
    const halo = ctx.createRadialGradient(mx, my, r * 0.5, mx, my, r * 5 * haloScale)
    halo.addColorStop(0, 'rgba(200, 215, 235, 0.12)')
    halo.addColorStop(0.4, 'rgba(200, 215, 235, 0.04)')
    halo.addColorStop(1, 'rgba(200, 215, 235, 0)')
    ctx.beginPath()
    ctx.arc(mx, my, r * 5 * haloScale, 0, Math.PI * 2)
    ctx.fillStyle = halo
    ctx.fill()

    // Body
    const body = ctx.createRadialGradient(mx - r * 0.3, my - r * 0.3, 0, mx, my, r)
    body.addColorStop(0, 'rgba(230, 235, 245, 0.85)')
    body.addColorStop(1, 'rgba(180, 195, 215, 0.65)')
    ctx.beginPath()
    ctx.arc(mx, my, r, 0, Math.PI * 2)
    ctx.fillStyle = body
    ctx.fill()
  }
}

function drawSunDust(time: number) {
  if (!ctx || !canvas.value) return
  const h = canvas.value.height
  const w = canvas.value.width

  for (const p of particles) {
    p.y -= p.speed
    p.x += Math.sin(time * 0.0008 + p.phase) * 0.4 + p.drift
    if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w }

    const pulse = Math.sin(time * p.phaseSpeed + p.phase) * 0.3 + 0.7
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
    grad.addColorStop(0, `rgba(255, 220, 120, ${p.opacity * pulse})`)
    grad.addColorStop(1, 'rgba(255, 200, 80, 0)')
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()
  }
}

function drawRain(time: number) {
  if (!ctx || !canvas.value) return
  const w = canvas.value.width
  const h = canvas.value.height

  // Fog
  const fogX = Math.sin(time * 0.00015) * w * 0.015
  const fogGrad = ctx.createRadialGradient(
    w * 0.5 + fogX, h * 0.6, h * 0.1,
    w * 0.5 + fogX, h * 0.6, h * 0.8
  )
  fogGrad.addColorStop(0, 'rgba(74, 83, 94, 0.08)')
  fogGrad.addColorStop(1, 'rgba(74, 83, 94, 0)')
  ctx.fillStyle = fogGrad
  ctx.fillRect(0, 0, w, h)

  for (const p of particles) {
    p.y += p.speed
    p.x += p.drift

    if (p.y > h) {
      p.y = -20
      p.x = Math.random() * w
    }
    if (p.x < -20) p.x = w + 20

    // Drop line
    ctx.beginPath()
    ctx.moveTo(p.x, p.y)
    ctx.lineTo(p.x + p.drift * 1.5, p.y - (p.length || 14))
    ctx.strokeStyle = `rgba(200, 210, 225, ${p.opacity})`
    ctx.lineWidth = p.size * 0.5
    ctx.stroke()
  }
}

function drawSnow(time: number) {
  if (!ctx || !canvas.value) return
  const w = canvas.value.width
  const h = canvas.value.height
  const wind = Math.sin(time * 0.0003) * 0.5 + Math.sin(time * 0.0007) * 0.3

  for (const p of particles) {
    p.y += p.speed
    p.x += wind * (0.5 + p.layer * 0.3) + p.drift + Math.sin(time * 0.001 + p.phase) * 0.3

    if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w }
    if (p.x < -10) p.x = w + 10
    if (p.x > w + 10) p.x = -10

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
    ctx.fill()

    if (p.layer === 0) {
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5)
      grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity * 0.2})`)
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
    }
  }
}

// ── Animation loop ──

function animate(time: number) {
  if (!ctx || !canvas.value) return
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  switch (currentTheme.value) {
    case 'night':
      drawStars(time, false)
      break
    case 'moonlight':
      drawStars(time, true)
      break
    case 'sunny':
      drawSunDust(time)
      break
    case 'rainy':
      drawRain(time)
      break
    case 'snowy':
      drawSnow(time)
      break
  }

  animationId = requestAnimationFrame(animate)
}

function start() {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d')
  resize()
  initParticles(currentTheme.value)
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener('resize', resize)
  start()
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(animationId)
})

watch(currentTheme, (mode) => {
  resize()
  initParticles(mode)
})
</script>

<style scoped>
.atmospheric-canvas {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 51;
}
</style>
