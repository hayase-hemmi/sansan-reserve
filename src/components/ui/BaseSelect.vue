<template>
  <div class="select-wrapper">
    <label v-if="label" :for="id" class="select-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <select
      :id="id"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      @blur="handleBlur"
      class="select-field"
      :class="{ 'has-error': errorMessage }"
    >
      <option value="" disabled>選択してください</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.title }}
      </option>
    </select>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { designTokens } from '../../styles/designTokens'

interface Option {
  title: string
  value: string
}

interface Props {
  id?: string
  label?: string
  modelValue: string
  options: Option[]
  required?: boolean
  disabled?: boolean
  rules?: Array<(value: string) => true | string>
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
})

const emit = defineEmits<Emits>()

const errorMessage = ref('')

const handleBlur = () => {
  if (props.rules) {
    for (const rule of props.rules) {
      const result = rule(props.modelValue)
      if (result !== true) {
        errorMessage.value = result
        return
      }
    }
  }
  errorMessage.value = ''
}

// リセット機能: 値が空文字列になったらエラーメッセージもクリア
const clearError = () => {
  errorMessage.value = ''
}

watch(() => props.modelValue, (newValue) => {
  if (newValue === '') {
    clearError()
  }
})

// コンポーネントから呼び出せるようにする
defineExpose({
  clearError
})
</script>

<style scoped>
.select-wrapper {
  margin-bottom: v-bind('designTokens.spacing.lg');
  display: flex;
  flex-direction: column;
}

.select-label {
  font-family: v-bind('designTokens.typography.fontFamily.primary');
  font-size: v-bind('designTokens.typography.fontSize.sm');
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  color: v-bind('designTokens.colors.text.primary');
  margin-bottom: v-bind('designTokens.spacing.sm');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wide');
}

.required {
  color: v-bind('designTokens.colors.status.error');
  margin-left: 2px;
}

.select-field {
  font-family: v-bind('designTokens.typography.fontFamily.primary');
  font-size: v-bind('designTokens.typography.fontSize.base');
  padding: v-bind('designTokens.spacing.md');
  border: 2px solid v-bind('designTokens.colors.accent.secondary');
  border-radius: v-bind('designTokens.borderRadius.md');
  background-color: v-bind('designTokens.colors.background.input');
  color: v-bind('designTokens.colors.text.primary');
  transition: all v-bind('designTokens.transitions.duration.normal') v-bind('designTokens.transitions.easing.easeInOut');
  outline: none;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23423e3e' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
}

.select-field:hover {
  border-color: v-bind('designTokens.colors.accent.primary');
}

.select-field:focus {
  border-color: v-bind('designTokens.colors.accent.primary');
  box-shadow: v-bind('designTokens.shadows.sm');
}

.select-field:disabled {
  background-color: v-bind('designTokens.colors.background.hover');
  color: v-bind('designTokens.colors.text.disabled');
  cursor: not-allowed;
}

.select-field.has-error {
  border-color: v-bind('designTokens.colors.status.error');
}

.error-message {
  font-size: v-bind('designTokens.typography.fontSize.xs');
  color: v-bind('designTokens.colors.status.error');
  margin-top: v-bind('designTokens.spacing.xs');
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
}
</style>
