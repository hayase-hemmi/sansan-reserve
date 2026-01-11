<template>
  <div>
    <!-- Date Picker -->
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="selectedDate"
          label="撮影希望日"
          type="date"
          variant="outlined"
          :rules="[rules.required]"
          @update:model-value="handleDateChange"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Loading state -->
    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p class="mt-2 text-gray-600">空き枠を確認しています...</p>
      </v-col>
    </v-row>

    <!-- Error state -->
    <v-row v-else-if="error">
      <v-col cols="12">
        <v-alert type="error" variant="tonal">
          {{ error }}
        </v-alert>
      </v-col>
    </v-row>

    <!-- Time Slots -->
    <v-row v-else-if="slots.length > 0">
      <v-col cols="12">
        <p class="text-sm text-gray-600 mb-3">ご希望の時間帯を選択してください</p>
        <v-chip-group
          v-model="selectedSlotIndex"
          column
          mandatory
        >
          <v-chip
            v-for="(slot, index) in slots"
            :key="index"
            :value="index"
            :disabled="!slot.available"
            :color="slot.available ? 'primary' : 'grey'"
            :variant="selectedSlotIndex === index ? 'elevated' : 'outlined'"
            class="ma-1"
          >
            {{ formatTime(slot.start) }} - {{ formatTime(slot.end) }}
            <span v-if="!slot.available" class="ml-2 text-xs">(予約済)</span>
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <!-- No slots available -->
    <v-row v-else-if="selectedDate">
      <v-col cols="12">
        <v-alert type="info" variant="tonal">
          選択した日付には空きがありません。別の日付をお選びください。
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getAvailability, type TimeSlot, type Menu, getMenuDuration, toJSTISOString } from '../services/api'

interface Props {
  menu: Menu | string
  modelValue?: string // Selected slot start time (ISO string)
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

// Watch for date changes
const handleDateChange = async () => {
  if (!selectedDate.value || !props.menu) {
    return
  }

  selectedSlotIndex.value = undefined
  await fetchSlots()
}

// Watch for menu changes
watch(() => props.menu, async () => {
  if (selectedDate.value && props.menu) {
    selectedSlotIndex.value = undefined
    await fetchSlots()
  }
})

// Watch for slot selection
watch(selectedSlotIndex, () => {
  if (selectedSlotIndex.value !== undefined) {
    const slot = slots.value[selectedSlotIndex.value]
    if (slot) {
      emit('update:modelValue', slot.start)
      return
    }
  }
  emit('update:modelValue', '')
})

// Fetch available slots
const fetchSlots = async () => {
  if (!selectedDate.value || !props.menu) {
    return
  }

  loading.value = true
  error.value = ''

  try {
    // Create date range for the selected day (9:00 - 18:00)
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

// Format time for display
const formatTime = (isoString: string): string => {
  const date = new Date(isoString)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}
</script>

<style scoped>
.v-chip {
  min-width: 140px;
}
</style>
