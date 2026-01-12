<template>
  <v-card
    class="mx-auto"
    max-width="800"
    :style="{
      boxShadow: designTokens.shadows.md,
    }"
  >
    <v-card-title
      :style="{
        backgroundColor: designTokens.colors.accent.primary,
        color: designTokens.colors.background.card,
        fontSize: designTokens.typography.fontSize.xl,
        fontWeight: designTokens.typography.fontWeight.semibold,
        fontFamily: designTokens.typography.fontFamily.heading,
        padding: `${designTokens.spacing.xl} ${designTokens.spacing.xl}`,
        letterSpacing: designTokens.typography.letterSpacing.wide,
      }"
    >
      基本情報入力
    </v-card-title>

    <v-card-text
      :style="{
        padding: `${designTokens.spacing['2xl']} ${designTokens.spacing.xl}`,
      }"
    >
      <v-form ref="formRef" v-model="valid">
        <v-row>
          <!-- お名前（姓） -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.lastName"
              :rules="[rules.required]"
              label="お名前（姓）"
              placeholder="山田"
              variant="outlined"
              required
            ></v-text-field>
          </v-col>

          <!-- お名前（名） -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.firstName"
              :rules="[rules.required]"
              label="お名前（名）"
              placeholder="太郎"
              variant="outlined"
              required
            ></v-text-field>
          </v-col>

          <!-- メールアドレス -->
          <v-col cols="12">
            <v-text-field
              v-model="formData.email"
              :rules="[rules.required, rules.email]"
              label="メールアドレス"
              placeholder="example@example.com"
              variant="outlined"
              type="email"
              required
            ></v-text-field>
          </v-col>

          <!-- 撮影メニュー -->
          <v-col cols="12">
            <v-select
              v-model="formData.menu"
              :items="menuOptions"
              :rules="[rules.required]"
              label="撮影メニュー"
              variant="outlined"
              required
            ></v-select>
          </v-col>

          <!-- 撮影日時選択 -->
          <v-col cols="12">
            <SlotPicker
              v-model="formData.selectedSlot"
              :menu="formData.menu"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-card-actions
      :style="{
        padding: `${designTokens.spacing.xl} ${designTokens.spacing.xl} ${designTokens.spacing['2xl']}`,
        gap: designTokens.spacing.md,
      }"
    >
      <v-spacer></v-spacer>
      <v-btn
        variant="outlined"
        @click="handleReset"
        :disabled="submitting"
        :style="{
          color: designTokens.colors.text.secondary,
          borderColor: designTokens.colors.border.medium,
          padding: `${designTokens.spacing.md} ${designTokens.spacing.xl}`,
          fontSize: designTokens.typography.fontSize.base,
          fontWeight: designTokens.typography.fontWeight.medium,
          borderRadius: designTokens.borderRadius.md,
        }"
      >
        クリア
      </v-btn>
      <v-btn
        color="primary"
        variant="elevated"
        :disabled="!valid || !formData.selectedSlot || submitting"
        :loading="submitting"
        @click="handleSubmit"
        :style="{
          backgroundColor: designTokens.colors.accent.primary,
          color: designTokens.colors.background.card,
          padding: `${designTokens.spacing.md} ${designTokens.spacing['2xl']}`,
          fontSize: designTokens.typography.fontSize.base,
          fontWeight: designTokens.typography.fontWeight.semibold,
          borderRadius: designTokens.borderRadius.md,
          boxShadow: designTokens.shadows.sm,
        }"
      >
        送信する
      </v-btn>
    </v-card-actions>

    <!-- Success/Error Dialog -->
    <v-dialog v-model="showDialog" max-width="500">
      <v-card
        :style="{
          boxShadow: designTokens.shadows.lg,
          borderRadius: designTokens.borderRadius.lg,
        }"
      >
        <v-card-title
          :style="{
            backgroundColor: dialogType === 'success' ? designTokens.colors.status.success : designTokens.colors.status.error,
            color: designTokens.colors.background.card,
            fontSize: designTokens.typography.fontSize.xl,
            fontWeight: designTokens.typography.fontWeight.semibold,
            padding: `${designTokens.spacing.xl} ${designTokens.spacing.xl}`,
          }"
        >
          {{ dialogType === 'success' ? '予約完了' : 'エラー' }}
        </v-card-title>
        <v-card-text
          :style="{
            padding: `${designTokens.spacing.xl} ${designTokens.spacing.xl}`,
            color: designTokens.colors.text.primary,
            fontSize: designTokens.typography.fontSize.base,
            lineHeight: designTokens.typography.lineHeight.relaxed,
          }"
        >
          {{ dialogMessage }}
        </v-card-text>
        <v-card-actions
          :style="{
            padding: `${designTokens.spacing.md} ${designTokens.spacing.xl} ${designTokens.spacing.xl}`,
          }"
        >
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="showDialog = false"
            :style="{
              backgroundColor: designTokens.colors.accent.primary,
              color: designTokens.colors.background.card,
              padding: `${designTokens.spacing.md} ${designTokens.spacing.xl}`,
              borderRadius: designTokens.borderRadius.md,
            }"
          >
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SlotPicker from './SlotPicker.vue'
import { createReservation, type Menu } from '../services/api'
import { designTokens } from '../styles/designTokens'

interface FormData {
  lastName: string
  firstName: string
  email: string
  menu: Menu | ''
  selectedSlot: string // ISO string
}

const formRef = ref()
const valid = ref(false)
const submitting = ref(false)
const showDialog = ref(false)
const dialogType = ref<'success' | 'error'>('success')
const dialogMessage = ref('')

const formData = reactive<FormData>({
  lastName: '',
  firstName: '',
  email: '',
  menu: '',
  selectedSlot: '',
})

const menuOptions = [
  { title: 'スタンダードプラン（30分）', value: 'standard' },
  { title: 'プレミアムプラン（60分）', value: 'premium' },
  { title: 'ファミリープラン（90分）', value: 'family' },
  { title: 'ウェディングプラン（120分）', value: 'wedding' },
]

const rules = {
  required: (value: string | number | null) => !!value || '必須項目です',
  email: (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || '正しいメールアドレスを入力してください'
  },
}

const handleSubmit = async () => {
  const { valid: isValid } = await formRef.value.validate()
  if (!isValid || !formData.selectedSlot || !formData.menu) {
    return
  }

  submitting.value = true

  try {
    const response = await createReservation({
      lastName: formData.lastName,
      firstName: formData.firstName,
      email: formData.email,
      menu: formData.menu as Menu,
      start: formData.selectedSlot,
    })

    if (response.ok) {
      dialogType.value = 'success'
      dialogMessage.value = 'ご予約ありがとうございます！確認メールをお送りいたしました。'
      showDialog.value = true

      // Reset form after successful submission
      setTimeout(() => {
        handleReset()
      }, 2000)
    } else {
      dialogType.value = 'error'
      dialogMessage.value = getErrorMessage(response.errorCode, response.message)
      showDialog.value = true
    }
  } catch (error) {
    dialogType.value = 'error'
    dialogMessage.value = error instanceof Error ? error.message : '予約の送信に失敗しました'
    showDialog.value = true
  } finally {
    submitting.value = false
  }
}

const getErrorMessage = (errorCode?: string, message?: string): string => {
  if (errorCode === 'SLOT_TAKEN') {
    return '申し訳ございません。選択された時間枠はすでに予約済みです。別の時間をお選びください。'
  }
  if (errorCode === 'INVALID_TOKEN') {
    return 'システムエラーが発生しました。管理者にお問い合わせください。'
  }
  return message || '予約の処理中にエラーが発生しました。'
}

const handleReset = () => {
  formRef.value.reset()
  Object.assign(formData, {
    lastName: '',
    firstName: '',
    email: '',
    menu: '',
    selectedSlot: '',
  })
}
</script>

<style scoped>
/* Custom styling for form inputs */
:deep(.v-field__outline) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.v-field--focused .v-field__outline) {
  border-width: 2px;
}

:deep(.v-input) {
  margin-bottom: 0.5rem;
}

:deep(.v-label) {
  font-weight: 500;
  letter-spacing: 0.02em;
}
</style>
