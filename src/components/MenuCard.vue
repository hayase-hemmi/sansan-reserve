<template>
  <div
    class="menu-card"
    :class="{ selected: isSelected }"
    @click="$emit('select')"
    role="button"
    tabindex="0"
    @keypress.enter="$emit('select')"
    @keypress.space.prevent="$emit('select')"
  >
    <div class="menu-card-content">
      <div class="menu-header">
        <h3 class="menu-title">{{ menu.title }}</h3>
        <div class="menu-price">{{ menu.price }}</div>
      </div>
      <p class="menu-description">{{ menu.description }}</p>
      <div class="menu-footer">
        <div class="menu-duration">
          <span class="icon">⏱</span>
          <span>{{ menu.duration }}分</span>
        </div>
      </div>
    </div>
    <div v-if="isSelected" class="selected-indicator">
      <span class="checkmark">✓</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MenuOption } from '../data/menuData'
import type { Menu } from '../services/api'
import { designTokens } from '../styles/designTokens'

interface Props {
  menu: MenuOption
  selectedMenu?: Menu | ''
}

const props = defineProps<Props>()

defineEmits<{
  select: []
}>()

const isSelected = computed(() => props.selectedMenu === props.menu.value)
</script>

<style scoped>
.menu-card {
  position: relative;
  background-color: v-bind('designTokens.colors.background.card');
  border: 2px solid v-bind('designTokens.colors.accent.secondary');
  border-radius: v-bind('designTokens.borderRadius.lg');
  padding: v-bind('designTokens.spacing.xl');
  cursor: pointer;
  transition: all v-bind('designTokens.transitions.duration.normal') v-bind('designTokens.transitions.easing.easeInOut');
  user-select: none;
}

.menu-card:hover {
  border-color: v-bind('designTokens.colors.accent.primary');
  box-shadow: v-bind('designTokens.shadows.md');
  transform: translateY(-2px);
}

.menu-card:focus {
  outline: none;
  border-color: v-bind('designTokens.colors.accent.primary');
  box-shadow: 0 0 0 3px v-bind('designTokens.colors.accent.hover');
}

.menu-card.selected {
  border-color: v-bind('designTokens.colors.accent.primary');
  background-color: v-bind('designTokens.colors.accent.hover');
  box-shadow: v-bind('designTokens.shadows.sm');
}

.menu-card-content {
  position: relative;
  z-index: 1;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: v-bind('designTokens.spacing.md');
  margin-bottom: v-bind('designTokens.spacing.sm');
}

.menu-title {
  font-family: v-bind('designTokens.typography.fontFamily.heading');
  font-size: v-bind('designTokens.typography.fontSize.lg');
  font-weight: v-bind('designTokens.typography.fontWeight.semibold');
  color: v-bind('designTokens.colors.text.primary');
  margin: 0;
  line-height: v-bind('designTokens.typography.lineHeight.tight');
}

.menu-price {
  font-family: v-bind('designTokens.typography.fontFamily.primary');
  font-size: v-bind('designTokens.typography.fontSize.xl');
  font-weight: v-bind('designTokens.typography.fontWeight.bold');
  color: v-bind('designTokens.colors.accent.primary');
  white-space: nowrap;
}

.menu-description {
  font-size: v-bind('designTokens.typography.fontSize.sm');
  color: v-bind('designTokens.colors.text.secondary');
  line-height: v-bind('designTokens.typography.lineHeight.normal');
  margin: v-bind('designTokens.spacing.md') 0;
}

.menu-footer {
  display: flex;
  align-items: center;
  gap: v-bind('designTokens.spacing.lg');
  margin-top: v-bind('designTokens.spacing.lg');
}

.menu-duration {
  display: flex;
  align-items: center;
  gap: v-bind('designTokens.spacing.xs');
  font-size: v-bind('designTokens.typography.fontSize.sm');
  color: v-bind('designTokens.colors.text.secondary');
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
}

.icon {
  font-size: v-bind('designTokens.typography.fontSize.base');
}

.selected-indicator {
  position: absolute;
  top: v-bind('designTokens.spacing.md');
  right: v-bind('designTokens.spacing.md');
  width: 28px;
  height: 28px;
  background-color: v-bind('designTokens.colors.accent.primary');
  border-radius: v-bind('designTokens.borderRadius.full');
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: v-bind('designTokens.shadows.sm');
}

.checkmark {
  color: v-bind('designTokens.colors.background.card');
  font-size: 18px;
  font-weight: v-bind('designTokens.typography.fontWeight.bold');
}

@media (max-width: 768px) {
  .menu-card {
    padding: v-bind('designTokens.spacing.lg');
  }

  .menu-title {
    font-size: v-bind('designTokens.typography.fontSize.base');
  }

  .menu-price {
    font-size: v-bind('designTokens.typography.fontSize.lg');
  }
}
</style>
