<template>
  <div class="theme-switcher">
    <button
      class="theme-toggle"
      @click="isOpen = !isOpen"
      :aria-label="'テーマ切り替え: 現在 ' + currentThemeInfo.label"
      :title="'テーマ: ' + currentThemeInfo.label"
    >
      <span
        class="toggle-dot"
        :style="{ backgroundColor: currentThemeInfo.color }"
      />
    </button>

    <Transition name="panel">
      <div v-if="isOpen" class="theme-panel">
        <button
          v-for="theme in themes"
          :key="theme.id"
          class="theme-option"
          :class="{ active: currentTheme === theme.id }"
          @click="selectTheme(theme.id)"
          :aria-label="theme.label"
          :title="theme.label"
        >
          <span
            class="option-dot"
            :style="{ backgroundColor: theme.color }"
          />
          <span class="option-label">{{ theme.label }}</span>
        </button>
      </div>
    </Transition>
  </div>

  <Transition name="toast">
    <div v-if="toastVisible" class="theme-toast">
      <span
        class="toast-dot"
        :style="{ backgroundColor: currentThemeInfo.color }"
      />
      {{ currentThemeInfo.label }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme, type ThemeMode } from '../composables/useTheme'

const { currentTheme, themes, setTheme } = useTheme()

const isOpen = ref(false)
const toastVisible = ref(false)
let toastTimer: ReturnType<typeof setTimeout> | null = null

const currentThemeInfo = computed(() =>
  themes.find(t => t.id === currentTheme.value)!
)

const selectTheme = (id: ThemeMode) => {
  setTheme(id)
  isOpen.value = false

  if (toastTimer) clearTimeout(toastTimer)
  toastVisible.value = true
  toastTimer = setTimeout(() => {
    toastVisible.value = false
  }, 1500)
}
</script>

<style scoped>
.theme-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 200;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--border-medium);
  background-color: var(--bg-card);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toggle-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  min-width: 140px;
  transition: background-color 0.4s, border-color 0.4s;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  width: 100%;
}

.theme-option:hover {
  background-color: var(--bg-hover);
}

.theme-option.active {
  background-color: var(--accent-hover);
}

.option-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.option-label {
  font-family: 'Inter', 'Zen Kaku Gothic Antique', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: 0.04em;
  transition: color 0.4s;
}

/* Toast */
.theme-toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 300;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 999px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  font-family: 'Inter', 'Zen Kaku Gothic Antique', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: 0.04em;
  transition: background-color 0.4s, border-color 0.4s, color 0.4s;
}

.toast-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: background-color 0.4s;
}

/* Transitions */
.panel-enter-active {
  animation: panelIn 0.2s cubic-bezier(0, 0, 0.2, 1);
}
.panel-leave-active {
  animation: panelIn 0.15s cubic-bezier(0.4, 0, 1, 1) reverse;
}

@keyframes panelIn {
  from {
    opacity: 0;
    transform: translateY(-4px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.toast-enter-active {
  animation: toastIn 0.3s cubic-bezier(0, 0, 0.2, 1);
}
.toast-leave-active {
  animation: toastIn 0.2s cubic-bezier(0.4, 0, 1, 1) reverse;
}

@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@media (max-width: 768px) {
  .theme-switcher {
    top: 12px;
    right: 12px;
  }

  .theme-toggle {
    width: 32px;
    height: 32px;
  }

  .toggle-dot {
    width: 14px;
    height: 14px;
  }

  .theme-toast {
    top: 12px;
    font-size: 0.75rem;
    padding: 8px 16px;
  }
}
</style>
