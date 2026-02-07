<template>
  <div class="slideshow">
    <div class="slideshow-images">
      <img
        v-for="(src, idx) in images"
        :key="idx"
        :src="src"
        :class="{ active: idx === currentIndex }"
        class="slideshow-img"
        alt=""
      />
    </div>
    <div class="slideshow-overlay" />
    <div class="slideshow-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  images: string[]
  interval?: number
}

const props = withDefaults(defineProps<Props>(), {
  interval: 4000,
})

const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (props.images.length > 1) {
    timer = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % props.images.length
    }, props.interval)
  }
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.slideshow {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 0;
}

.slideshow-images {
  position: absolute;
  inset: 0;
}

.slideshow-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1.2s ease-in-out;
}

.slideshow-img.active {
  opacity: 1;
}

.slideshow-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.72);
}

.slideshow-content {
  position: relative;
  z-index: 1;
}
</style>
