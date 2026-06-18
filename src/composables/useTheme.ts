import { ref, watch } from 'vue'

export type ThemeMode = 'day' | 'night' | 'sunny' | 'moonlight' | 'rainy' | 'snowy'

export interface ThemeInfo {
  id: ThemeMode
  label: string
  color: string
}

export const themes: ThemeInfo[] = [
  { id: 'day',       label: 'Day',       color: '#f2efe9' },
  { id: 'night',     label: 'Night',     color: '#080808' },
  { id: 'sunny',     label: 'Sunny',     color: '#5a8a3c' },
  { id: 'moonlight', label: 'Moonlight', color: '#7a8fa6' },
  { id: 'rainy',     label: 'Rainy',     color: '#4a535e' },
  { id: 'snowy',     label: 'Snowy',     color: '#d4dde7' },
]

const STORAGE_KEY = 'sansan-reserve-theme'

const currentTheme = ref<ThemeMode>(
  (localStorage.getItem(STORAGE_KEY) as ThemeMode) || 'day'
)

function applyTheme(theme: ThemeMode) {
  const body = document.body
  themes.forEach(t => body.classList.remove(`theme-${t.id}`))
  if (theme !== 'day') {
    body.classList.add(`theme-${theme}`)
  }
}

// Apply on init
applyTheme(currentTheme.value)

watch(currentTheme, (newTheme) => {
  applyTheme(newTheme)
  localStorage.setItem(STORAGE_KEY, newTheme)
})

export function useTheme() {
  const setTheme = (theme: ThemeMode) => {
    currentTheme.value = theme
  }

  const nextTheme = () => {
    const idx = themes.findIndex(t => t.id === currentTheme.value)
    const next = themes[(idx + 1) % themes.length]
    setTheme(next.id)
  }

  return {
    currentTheme,
    themes,
    setTheme,
    nextTheme,
  }
}
