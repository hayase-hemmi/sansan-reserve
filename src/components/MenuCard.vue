<template>
  <div
    class="menu-card"
    :class="{ selected: isSelected }"
  >
    <div class="menu-card-header">
      <h3 class="menu-title">{{ menu.title }}</h3>
      <div class="menu-price-block">
        <span class="menu-price">{{ menu.price }}</span>
        <span v-if="menu.priceNote" class="menu-price-note">{{ menu.priceNote }}</span>
      </div>
    </div>

    <div class="menu-card-body">
      <p class="menu-description">{{ menu.description }}</p>

      <div class="menu-details">
        <div class="menu-meta">
          <span class="meta-label">所要時間</span>
          <span class="meta-value">約{{ menu.duration }}分</span>
        </div>
        <div v-if="menu.capacity" class="menu-meta">
          <span class="meta-label">定員</span>
          <span class="meta-value">{{ menu.capacity }}</span>
        </div>
        <ul class="menu-includes">
          <li v-for="(detail, i) in menu.details" :key="i">{{ detail }}</li>
        </ul>
      </div>
    </div>

    <div class="menu-card-footer">
      <button
        type="button"
        class="select-button"
        :class="{ 'is-selected': isSelected }"
        @click="$emit('select')"
      >
        {{ isSelected ? '選択中' : 'このメニューを選択' }}
      </button>
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
  display: flex;
  flex-direction: column;
  background-color: v-bind('designTokens.colors.background.card');
  border: 1px solid v-bind('designTokens.colors.border.medium');
  border-radius: v-bind('designTokens.borderRadius.sm');
  transition: border-color v-bind('designTokens.transitions.duration.normal') v-bind('designTokens.transitions.easing.easeInOut');
  overflow: hidden;
}

.menu-card:hover {
  border-color: v-bind('designTokens.colors.accent.primary');
}

.menu-card.selected {
  border-color: v-bind('designTokens.colors.accent.primary');
}

.menu-card-header {
  padding: v-bind('designTokens.spacing.xl') v-bind('designTokens.spacing.xl') v-bind('designTokens.spacing.md');
}

.menu-title {
  font-family: v-bind('designTokens.typography.fontFamily.secondary');
  font-size: v-bind('designTokens.typography.fontSize.lg');
  font-weight: v-bind('designTokens.typography.fontWeight.regular');
  color: v-bind('designTokens.colors.text.primary');
  margin: 0 0 v-bind('designTokens.spacing.sm') 0;
  line-height: v-bind('designTokens.typography.lineHeight.base');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wide');
}

.menu-price-block {
  display: flex;
  align-items: baseline;
  gap: v-bind('designTokens.spacing.sm');
  flex-wrap: wrap;
}

.menu-price {
  font-family: v-bind('designTokens.typography.fontFamily.primary');
  font-size: v-bind('designTokens.typography.fontSize.xl');
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  color: v-bind('designTokens.colors.accent.primary');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wide');
}

.menu-price-note {
  font-size: v-bind('designTokens.typography.fontSize.xs');
  color: v-bind('designTokens.colors.text.secondary');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.normal');
}

.menu-card-body {
  flex: 1;
  padding: 0 v-bind('designTokens.spacing.xl') v-bind('designTokens.spacing.md');
  overflow-y: auto;
  max-height: 200px;
}

.menu-description {
  font-size: v-bind('designTokens.typography.fontSize.sm');
  color: v-bind('designTokens.colors.text.secondary');
  line-height: v-bind('designTokens.typography.lineHeight.relaxed');
  margin: 0 0 v-bind('designTokens.spacing.md') 0;
  letter-spacing: v-bind('designTokens.typography.letterSpacing.normal');
}

.menu-details {
  border-top: 1px solid v-bind('designTokens.colors.border.light');
  padding-top: v-bind('designTokens.spacing.md');
}

.menu-meta {
  display: flex;
  align-items: center;
  gap: v-bind('designTokens.spacing.md');
  margin-bottom: v-bind('designTokens.spacing.xs');
  font-size: v-bind('designTokens.typography.fontSize.sm');
}

.meta-label {
  color: v-bind('designTokens.colors.text.secondary');
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wider');
  font-size: v-bind('designTokens.typography.fontSize.xs');
  min-width: 56px;
}

.meta-value {
  color: v-bind('designTokens.colors.text.primary');
  font-size: v-bind('designTokens.typography.fontSize.sm');
}

.menu-includes {
  list-style: none;
  padding: 0;
  margin: v-bind('designTokens.spacing.sm') 0 0 0;
}

.menu-includes li {
  position: relative;
  padding-left: v-bind('designTokens.spacing.lg');
  font-size: v-bind('designTokens.typography.fontSize.sm');
  color: v-bind('designTokens.colors.text.secondary');
  line-height: v-bind('designTokens.typography.lineHeight.relaxed');
}

.menu-includes li::before {
  content: '';
  position: absolute;
  left: v-bind('designTokens.spacing.xs');
  top: 0.65em;
  width: 6px;
  height: 1px;
  background-color: v-bind('designTokens.colors.accent.secondary');
}

.menu-card-footer {
  padding: v-bind('designTokens.spacing.md') v-bind('designTokens.spacing.xl') v-bind('designTokens.spacing.xl');
}

.select-button {
  width: 100%;
  padding: v-bind('designTokens.spacing.md');
  font-family: v-bind('designTokens.typography.fontFamily.primary');
  font-size: v-bind('designTokens.typography.fontSize.sm');
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wider');
  border: 1px solid v-bind('designTokens.colors.accent.primary');
  border-radius: v-bind('designTokens.borderRadius.sm');
  background-color: transparent;
  color: v-bind('designTokens.colors.accent.primary');
  cursor: pointer;
  transition: all v-bind('designTokens.transitions.duration.normal') v-bind('designTokens.transitions.easing.easeInOut');
}

.select-button:hover {
  background-color: v-bind('designTokens.colors.accent.hover');
}

.select-button.is-selected {
  background-color: v-bind('designTokens.colors.accent.primary');
  color: v-bind('designTokens.colors.background.card');
  border-color: v-bind('designTokens.colors.accent.primary');
}

@media (max-width: 768px) {
  .menu-card-header {
    padding: v-bind('designTokens.spacing.lg') v-bind('designTokens.spacing.lg') v-bind('designTokens.spacing.sm');
  }

  .menu-card-body {
    padding: 0 v-bind('designTokens.spacing.lg') v-bind('designTokens.spacing.sm');
    max-height: 180px;
  }

  .menu-card-footer {
    padding: v-bind('designTokens.spacing.sm') v-bind('designTokens.spacing.lg') v-bind('designTokens.spacing.lg');
  }

  .menu-title {
    font-size: v-bind('designTokens.typography.fontSize.base');
  }
}
</style>
