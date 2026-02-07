<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
    class="base-button"
    :class="[variantClass, { 'is-loading': loading }]"
  >
    <span v-if="loading" class="loader"></span>
    <span :class="{ 'button-text-hidden': loading }">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { designTokens } from '../../styles/designTokens'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'outlined' | 'text'
  disabled?: boolean
  loading?: boolean
}

interface Emits {
  (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  disabled: false,
  loading: false,
})

const emit = defineEmits<Emits>()

const variantClass = computed(() => {
  return `variant-${props.variant}`
})
</script>

<style scoped>
.base-button {
  position: relative;
  font-family: v-bind('designTokens.typography.fontFamily.primary');
  font-size: v-bind('designTokens.typography.fontSize.sm');
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  padding: v-bind('designTokens.spacing.md') v-bind('designTokens.spacing["2xl"]');
  border-radius: v-bind('designTokens.borderRadius.sm');
  border: none;
  cursor: pointer;
  transition: all v-bind('designTokens.transitions.duration.normal') v-bind('designTokens.transitions.easing.easeInOut');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wider');
  text-transform: none;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
}

.variant-primary {
  background-color: v-bind('designTokens.colors.accent.primary');
  color: v-bind('designTokens.colors.background.card');
  box-shadow: v-bind('designTokens.shadows.sm');
}

.variant-primary:hover:not(:disabled) {
  background-color: v-bind('designTokens.colors.accent.secondary');
  box-shadow: v-bind('designTokens.shadows.md');
}

.variant-primary:active:not(:disabled) {
  box-shadow: v-bind('designTokens.shadows.sm');
}

.variant-outlined {
  background-color: transparent;
  color: v-bind('designTokens.colors.text.secondary');
  border: 1px solid v-bind('designTokens.colors.border.medium');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wider');
}

.variant-outlined:hover:not(:disabled) {
  background-color: v-bind('designTokens.colors.background.hover');
  border-color: v-bind('designTokens.colors.accent.primary');
  color: v-bind('designTokens.colors.accent.primary');
}

.variant-text {
  background-color: transparent;
  color: v-bind('designTokens.colors.accent.primary');
  padding: v-bind('designTokens.spacing.sm') v-bind('designTokens.spacing.md');
}

.variant-text:hover:not(:disabled) {
  background-color: v-bind('designTokens.colors.accent.hover');
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.base-button.is-loading {
  cursor: wait;
}

.button-text-hidden {
  opacity: 0;
}

.loader {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
