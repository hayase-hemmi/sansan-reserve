<template>
  <div
    class="menu-card"
    :class="{ selected: isSelected }"
    @click="$emit('showDetail')"
    role="button"
    tabindex="0"
    @keypress.enter="$emit('showDetail')"
    @keypress.space.prevent="$emit('showDetail')"
  >
    <div class="menu-card-inner">
      <h3 class="menu-title">{{ menu.title }}</h3>
      <div class="menu-info">
        <span class="menu-price">{{ menu.price }}</span>
        <span class="menu-separator">/</span>
        <span class="menu-duration">約{{ menu.duration }}分</span>
      </div>
      <p class="menu-description">{{ menu.description }}</p>
    </div>
    <span class="detail-link">詳細を見る</span>
    <div v-if="isSelected" class="selected-badge">選択中</div>
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
  showDetail: []
}>()

const isSelected = computed(() => props.selectedMenu === props.menu.value)
</script>

<style scoped>
.menu-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: v-bind('designTokens.colors.background.card');
  border: 1px solid v-bind('designTokens.colors.border.medium');
  border-radius: v-bind('designTokens.borderRadius.sm');
  padding: v-bind('designTokens.spacing.xl');
  cursor: pointer;
  transition: border-color v-bind('designTokens.transitions.duration.normal') v-bind('designTokens.transitions.easing.easeInOut');
}

.menu-card:hover {
  border-color: v-bind('designTokens.colors.accent.primary');
}

.menu-card.selected {
  border-color: v-bind('designTokens.colors.accent.primary');
  background-color: v-bind('designTokens.colors.accent.hover');
}

.menu-card-inner {
  flex: 1;
}

.menu-title {
  font-family: v-bind('designTokens.typography.fontFamily.secondary');
  font-size: v-bind('designTokens.typography.fontSize.base');
  font-weight: v-bind('designTokens.typography.fontWeight.regular');
  color: v-bind('designTokens.colors.text.primary');
  margin: 0 0 v-bind('designTokens.spacing.sm') 0;
  line-height: v-bind('designTokens.typography.lineHeight.base');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wide');
}

.menu-info {
  display: flex;
  align-items: baseline;
  gap: v-bind('designTokens.spacing.xs');
  margin-bottom: v-bind('designTokens.spacing.sm');
}

.menu-price {
  font-family: v-bind('designTokens.typography.fontFamily.primary');
  font-size: v-bind('designTokens.typography.fontSize.lg');
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  color: v-bind('designTokens.colors.accent.primary');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wide');
}

.menu-separator {
  color: v-bind('designTokens.colors.text.disabled');
  font-size: v-bind('designTokens.typography.fontSize.sm');
}

.menu-duration {
  font-size: v-bind('designTokens.typography.fontSize.sm');
  color: v-bind('designTokens.colors.text.secondary');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.normal');
}

.menu-description {
  font-size: v-bind('designTokens.typography.fontSize.xs');
  color: v-bind('designTokens.colors.text.secondary');
  line-height: v-bind('designTokens.typography.lineHeight.normal');
  margin: 0;
}

.detail-link {
  display: inline-block;
  margin-top: v-bind('designTokens.spacing.md');
  font-size: v-bind('designTokens.typography.fontSize.xs');
  color: v-bind('designTokens.colors.accent.primary');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wider');
  text-decoration: underline;
  text-underline-offset: 3px;
}

.selected-badge {
  position: absolute;
  top: v-bind('designTokens.spacing.sm');
  right: v-bind('designTokens.spacing.sm');
  font-size: v-bind('designTokens.typography.fontSize.xs');
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  color: v-bind('designTokens.colors.background.card');
  background-color: v-bind('designTokens.colors.accent.primary');
  padding: 2px v-bind('designTokens.spacing.sm');
  border-radius: v-bind('designTokens.borderRadius.sm');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wider');
}

@media (max-width: 768px) {
  .menu-card {
    padding: v-bind('designTokens.spacing.lg');
  }
}
</style>
