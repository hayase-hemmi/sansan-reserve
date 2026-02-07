<template>
  <div class="slot-picker">
    <BaseInput
      v-model="selectedDate"
      label="撮影希望日"
      type="date"
      :required="true"
      :rules="[rules.required]"
    />

    <!-- Loading state -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>空き枠を確認しています...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>{{ error }}</span>
    </div>

    <!-- Time Slots -->
    <div v-else-if="slots.length > 0" class="time-slots">
      <p class="slot-instruction">ご希望の時間帯を選択してください</p>
      <div class="slot-grid">
        <button
          v-for="(slot, index) in slots"
          :key="index"
          type="button"
          @click="selectSlot(index)"
          :disabled="!slot.available"
          class="slot-chip"
          :class="{
            'slot-selected': selectedSlotIndex === index,
            'slot-available': slot.available,
            'slot-disabled': !slot.available
          }"
        >
          <span class="slot-time">
            {{ formatTime(slot.start) }} - {{ formatTime(slot.end) }}
          </span>
          <span v-if="!slot.available" class="slot-badge">予約済</span>
        </button>
      </div>
    </div>

    <!-- No slots available -->
    <div v-else-if="selectedDate" class="alert alert-info">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <span>選択した日付には空きがありません。別の日付をお選びください。</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseInput from './ui/BaseInput.vue'
import { getAvailability, type TimeSlot, type Menu, getMenuDuration, toJSTISOString } from '../services/api'
import { designTokens } from '../styles/designTokens'

interface Props {
  menu: Menu | string
  modelValue?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedDate = ref('')
const selectedSlotIndex = ref<number>()
const slots = ref<TimeSlot[]>([])
const loading = ref(false)
const error = ref('')

const rules = {
  required: (value: string) => !!value || '必須項目です',
}

const selectSlot = (index: number) => {
  if (slots.value[index]?.available) {
    selectedSlotIndex.value = index
    emit('update:modelValue', slots.value[index].start)
  }
}

watch(selectedDate, async () => {
  if (selectedDate.value && props.menu) {
    selectedSlotIndex.value = undefined
    emit('update:modelValue', '')
    await fetchSlots()
  }
})

watch(() => props.menu, async () => {
  if (selectedDate.value && props.menu) {
    selectedSlotIndex.value = undefined
    emit('update:modelValue', '')
    await fetchSlots()
  }
})

const fetchSlots = async () => {
  if (!selectedDate.value || !props.menu) {
    return
  }

  loading.value = true
  error.value = ''

  try {
    const dateObj = new Date(selectedDate.value)
    const from = new Date(dateObj)
    from.setHours(9, 0, 0, 0)

    const to = new Date(dateObj)
    to.setHours(18, 0, 0, 0)

    const durationMin = getMenuDuration(props.menu as Menu)

    const response = await getAvailability(
      toJSTISOString(from),
      toJSTISOString(to),
      durationMin
    )

    slots.value = response.slots
  } catch (err) {
    error.value = err instanceof Error ? err.message : '空き枠の取得に失敗しました'
    slots.value = []
  } finally {
    loading.value = false
  }
}

const formatTime = (isoString: string): string => {
  const date = new Date(isoString)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}
</script>

<style scoped>
.slot-picker {
  margin-bottom: v-bind('designTokens.spacing.lg');
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: v-bind('designTokens.spacing["2xl"]');
  gap: v-bind('designTokens.spacing.md');
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid v-bind('designTokens.colors.border.light');
  border-top-color: v-bind('designTokens.colors.accent.primary');
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  font-size: v-bind('designTokens.typography.fontSize.sm');
  color: v-bind('designTokens.colors.text.secondary');
  margin: 0;
}

.alert {
  display: flex;
  align-items: center;
  gap: v-bind('designTokens.spacing.md');
  padding: v-bind('designTokens.spacing.lg');
  border-radius: v-bind('designTokens.borderRadius.md');
  font-size: v-bind('designTokens.typography.fontSize.sm');
  margin-bottom: v-bind('designTokens.spacing.lg');
}

.alert-error {
  background-color: rgba(200, 124, 124, 0.1);
  color: v-bind('designTokens.colors.status.error');
  border: 1px solid rgba(200, 124, 124, 0.3);
}

.alert-info {
  background-color: rgba(123, 158, 184, 0.1);
  color: v-bind('designTokens.colors.status.info');
  border: 1px solid rgba(123, 158, 184, 0.3);
}

.time-slots {
  margin-bottom: v-bind('designTokens.spacing.lg');
}

.slot-instruction {
  font-size: v-bind('designTokens.typography.fontSize.xs');
  color: v-bind('designTokens.colors.text.secondary');
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  margin-bottom: v-bind('designTokens.spacing.md');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wider');
}

.slot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: v-bind('designTokens.spacing.md');
}

.slot-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: v-bind('designTokens.spacing.sm');
  padding: v-bind('designTokens.spacing.md') v-bind('designTokens.spacing.lg');
  border-radius: v-bind('designTokens.borderRadius.sm');
  font-family: v-bind('designTokens.typography.fontFamily.primary');
  font-size: v-bind('designTokens.typography.fontSize.sm');
  font-weight: v-bind('designTokens.typography.fontWeight.regular');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wide');
  transition: all v-bind('designTokens.transitions.duration.normal') v-bind('designTokens.transitions.easing.easeInOut');
  cursor: pointer;
  border: 1px solid;
  background-color: v-bind('designTokens.colors.background.card');
  outline: none;
}

.slot-chip.slot-available {
  color: v-bind('designTokens.colors.accent.primary');
  border-color: v-bind('designTokens.colors.accent.primary');
}

.slot-chip.slot-available:hover {
  background-color: v-bind('designTokens.colors.accent.hover');
}

.slot-chip.slot-selected {
  background-color: v-bind('designTokens.colors.accent.primary');
  color: v-bind('designTokens.colors.background.card');
  border-color: v-bind('designTokens.colors.accent.primary');
  box-shadow: v-bind('designTokens.shadows.md');
}

.slot-chip.slot-disabled {
  opacity: 0.5;
  background-color: v-bind('designTokens.colors.background.hover');
  color: v-bind('designTokens.colors.text.disabled');
  border-color: v-bind('designTokens.colors.border.light');
  cursor: not-allowed;
}

.slot-time {
  flex: 1;
}

.slot-badge {
  font-size: v-bind('designTokens.typography.fontSize.xs');
  opacity: 0.7;
}

@media (max-width: 640px) {
  .slot-grid {
    grid-template-columns: 1fr;
  }
}
</style>
