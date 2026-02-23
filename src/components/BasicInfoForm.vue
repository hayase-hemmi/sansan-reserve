<template>
  <div class="form-container">
    <div class="form-card">
      <div class="card-body">
        <form v-if="step === 1" @submit.prevent="handleSubmit">
          <div class="form-row">
            <div class="form-col">
              <BaseInput
                ref="lastNameInput"
                v-model="formData.lastName"
                label="お名前（姓）"
                placeholder="山田"
                :required="true"
                :rules="[rules.required]"
              />
            </div>

            <div class="form-col">
              <BaseInput
                ref="firstNameInput"
                v-model="formData.firstName"
                label="お名前（名）"
                placeholder="太郎"
                :required="true"
                :rules="[rules.required]"
              />
            </div>
          </div>

          <BaseInput
            ref="emailInput"
            v-model="formData.email"
            label="メールアドレス"
            type="email"
            placeholder="example@example.com"
            :required="true"
            :rules="[rules.required, rules.email]"
          />

          <BaseInput
            ref="phoneInput"
            v-model="formData.phone"
            label="電話番号"
            type="tel"
            placeholder="090-1234-5678"
            :required="true"
            :rules="[rules.required, rules.phone]"
          />

          <div class="form-row">
            <div class="form-col">
              <BaseSelect
                ref="guestCountSelect"
                v-model="formData.guestCount"
                label="ご来店人数"
                :options="guestCountOptions"
                :required="true"
                :rules="[rules.required]"
              />
            </div>

            <div class="form-col">
              <BaseSelect
                ref="hasPetSelect"
                v-model="formData.hasPet"
                label="ペット同伴"
                :options="petOptions"
                :required="true"
                :rules="[rules.required]"
              />
            </div>
          </div>

          <div class="menu-section">
            <label class="menu-label">撮影メニュー <span class="required">*</span></label>
            <div class="menu-grid">
              <MenuCard
                v-for="menu in menuOptions"
                :key="menu.value"
                :menu="menu"
                :selected-menu="formData.menu"
                @show-detail="detailMenu = menu"
              />
            </div>
          </div>

          <SlotPicker
            v-model="formData.selectedSlot"
            :menu="formData.menu"
          />

          <div class="form-actions">
            <BaseButton
              variant="outlined"
              @click="handleReset"
              :disabled="submitting"
            >
              クリア
            </BaseButton>
            <BaseButton
              type="submit"
              variant="primary"
              :disabled="!isFormValid || submitting"
              :loading="submitting"
            >
              入力内容を確認する
            </BaseButton>
          </div>
        </form>

        <!-- STEP 2: Confirmation -->
        <div v-else class="confirmation">
          <h2 class="confirmation-title">ご予約内容の確認</h2>
          <p class="confirmation-subtitle">以下の内容でよろしければ「予約を確定する」ボタンを押してください。</p>

          <dl class="confirmation-list">
            <div class="confirmation-item">
              <dt class="confirmation-label">お名前</dt>
              <dd class="confirmation-value">{{ formData.lastName }} {{ formData.firstName }}</dd>
            </div>

            <div class="confirmation-item">
              <dt class="confirmation-label">メールアドレス</dt>
              <dd class="confirmation-value">{{ formData.email }}</dd>
            </div>

            <div class="confirmation-item">
              <dt class="confirmation-label">電話番号</dt>
              <dd class="confirmation-value">{{ formData.phone }}</dd>
            </div>

            <div class="confirmation-item">
              <dt class="confirmation-label">ご来店人数</dt>
              <dd class="confirmation-value">{{ guestCountDisplay }}</dd>
            </div>

            <div class="confirmation-item">
              <dt class="confirmation-label">ペット同伴</dt>
              <dd class="confirmation-value">{{ hasPetDisplay }}</dd>
            </div>

            <div class="confirmation-item">
              <dt class="confirmation-label">撮影メニュー</dt>
              <dd class="confirmation-value">
                <span class="confirmation-menu-title">{{ selectedMenuOption?.title }}</span>
                <span class="confirmation-menu-meta">{{ selectedMenuOption?.price }} / 約{{ selectedMenuOption?.duration }}分</span>
              </dd>
            </div>

            <div class="confirmation-item">
              <dt class="confirmation-label">予約日時</dt>
              <dd class="confirmation-value">{{ formatSelectedDateTime }}</dd>
            </div>
          </dl>

          <div class="form-actions">
            <BaseButton
              variant="outlined"
              @click="goBack"
              :disabled="submitting"
            >
              戻る
            </BaseButton>
            <BaseButton
              variant="primary"
              @click="handleSubmit"
              :disabled="submitting"
              :loading="submitting"
            >
              予約を確定する
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Menu Detail Modal -->
    <MenuDetailModal
      :menu="detailMenu"
      :selected-menu="formData.menu"
      @select="formData.menu = $event"
      @close="detailMenu = null"
    />

    <!-- Success/Error Dialog -->
    <Teleport to="body">
      <div v-if="showDialog" class="dialog-overlay" @click="showDialog = false">
        <div class="dialog-content" @click.stop>
          <div class="dialog-header" :class="dialogType === 'success' ? 'success' : 'error'">
            <h3>{{ dialogType === 'success' ? '予約完了' : 'エラー' }}</h3>
          </div>
          <div class="dialog-body">
            <p>{{ dialogMessage }}</p>
          </div>
          <div class="dialog-actions">
            <BaseButton variant="primary" @click="showDialog = false">
              閉じる
            </BaseButton>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import BaseInput from './ui/BaseInput.vue'
import BaseSelect from './ui/BaseSelect.vue'
import BaseButton from './ui/BaseButton.vue'
import MenuCard from './MenuCard.vue'
import MenuDetailModal from './MenuDetailModal.vue'
import SlotPicker from './SlotPicker.vue'
import { createReservation, type Menu } from '../services/api'
import { designTokens } from '../styles/designTokens'
import { menuOptions, type MenuOption } from '../data/menuData'

interface FormData {
  lastName: string
  firstName: string
  email: string
  phone: string
  guestCount: string
  hasPet: string
  menu: Menu | ''
  selectedSlot: string
}

const guestCountOptions = [
  { value: '1', title: '1人' },
  { value: '2', title: '2人' },
  { value: '3', title: '3人' },
  { value: '4', title: '4人' },
]

const petOptions = [
  { value: 'no', title: 'なし' },
  { value: 'yes', title: 'あり' },
]

const step = ref<1 | 2>(1)
const detailMenu = ref<MenuOption | null>(null)
const submitting = ref(false)
const showDialog = ref(false)
const dialogType = ref<'success' | 'error'>('success')
const dialogMessage = ref('')

// Input refs
const lastNameInput = ref()
const firstNameInput = ref()
const emailInput = ref()
const phoneInput = ref()
const guestCountSelect = ref()
const hasPetSelect = ref()

const formData = reactive<FormData>({
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
  guestCount: '',
  hasPet: '',
  menu: '',
  selectedSlot: '',
})

const rules = {
  required: (value: string | number | null) => !!value || '必須項目です',
  email: (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || '正しいメールアドレスを入力してください'
  },
  phone: (value: string) => {
    const pattern = /^[0-9\-]{10,14}$/
    return pattern.test(value) || '正しい電話番号を入力してください'
  },
}

const formatSelectedDateTime = computed(() => {
  if (!formData.selectedSlot) return ''
  const date = new Date(formData.selectedSlot)
  const dayNames = ['日', '月', '火', '水', '木', '金', '土']
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayOfWeek = dayNames[date.getDay()]
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}年${month}月${day}日（${dayOfWeek}）${hours}:${minutes}`
})

const selectedMenuOption = computed(() => {
  if (!formData.menu) return null
  return menuOptions.find(m => m.value === formData.menu) || null
})

const guestCountDisplay = computed(() => {
  const option = guestCountOptions.find(o => o.value === formData.guestCount)
  return option?.title || ''
})

const hasPetDisplay = computed(() => {
  const option = petOptions.find(o => o.value === formData.hasPet)
  return option?.title || ''
})

const isFormValid = computed(() => {
  return (
    formData.lastName &&
    formData.firstName &&
    formData.email &&
    formData.phone &&
    formData.guestCount &&
    formData.hasPet &&
    formData.menu &&
    formData.selectedSlot &&
    rules.email(formData.email) === true &&
    rules.phone(formData.phone) === true
  )
})

const handleSubmit = async () => {
  if (!isFormValid.value) {
    return
  }

  if (step.value === 1) {
    step.value = 2
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  submitting.value = true

  try {
    const response = await createReservation({
      lastName: formData.lastName,
      firstName: formData.firstName,
      email: formData.email,
      phone: formData.phone,
      guestCount: parseInt(formData.guestCount, 10),
      hasPet: formData.hasPet === 'yes',
      menu: formData.menu as Menu,
      start: formData.selectedSlot,
    })

    if (response.ok) {
      dialogType.value = 'success'
      dialogMessage.value = 'ご予約ありがとうございます！\n確認メールをお送りいたしました。'
      showDialog.value = true

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

const goBack = () => {
  step.value = 1
}

const handleReset = () => {
  step.value = 1
  Object.assign(formData, {
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    guestCount: '',
    hasPet: '',
    menu: '',
    selectedSlot: '',
  })

  // バリデーションエラーもクリア
  lastNameInput.value?.clearError()
  firstNameInput.value?.clearError()
  emailInput.value?.clearError()
  phoneInput.value?.clearError()
  guestCountSelect.value?.clearError()
  hasPetSelect.value?.clearError()
}
</script>

<style scoped>
.form-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.form-card {
  background-color: v-bind('designTokens.colors.background.card');
  border: 1px solid v-bind('designTokens.colors.border.light');
  border-radius: v-bind('designTokens.borderRadius.sm');
  box-shadow: v-bind('designTokens.shadows.lg');
  overflow: hidden;
}

.card-body {
  padding: v-bind('designTokens.spacing["3xl"]') v-bind('designTokens.spacing["2xl"]');
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: v-bind('designTokens.spacing.lg');
  margin-bottom: v-bind('designTokens.spacing.lg');
}

.form-col {
  min-width: 0;
}

.form-col :deep(.input-wrapper),
.form-col :deep(.select-wrapper) {
  margin-bottom: 0;
}

.menu-section {
  margin-bottom: v-bind('designTokens.spacing.xl');
}

.menu-label {
  display: block;
  font-size: v-bind('designTokens.typography.fontSize.xs');
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  color: v-bind('designTokens.colors.text.secondary');
  margin-bottom: v-bind('designTokens.spacing.md');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wider');
  text-transform: uppercase;
}

.menu-label .required {
  color: v-bind('designTokens.colors.status.error');
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: v-bind('designTokens.spacing.lg');
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: v-bind('designTokens.spacing.md');
  margin-top: v-bind('designTokens.spacing.xl');
  padding-top: v-bind('designTokens.spacing.xl');
  border-top: 1px solid v-bind('designTokens.colors.border.light');
}

/* Dialog Styles */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: v-bind('designTokens.spacing.lg');
}

.dialog-content {
  background-color: v-bind('designTokens.colors.background.card');
  border-radius: v-bind('designTokens.borderRadius.sm');
  box-shadow: v-bind('designTokens.shadows.xl');
  max-width: 480px;
  width: 100%;
  overflow: hidden;
}

.dialog-header {
  padding: v-bind('designTokens.spacing.xl');
  color: v-bind('designTokens.colors.background.card');
}

.dialog-header.success {
  background-color: v-bind('designTokens.colors.status.success');
}

.dialog-header.error {
  background-color: v-bind('designTokens.colors.status.error');
}

.dialog-header h3 {
  margin: 0;
  font-family: v-bind('designTokens.typography.fontFamily.secondary');
  font-size: v-bind('designTokens.typography.fontSize.xl');
  font-weight: v-bind('designTokens.typography.fontWeight.regular');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wider');
}

.dialog-body {
  padding: v-bind('designTokens.spacing.xl');
  color: v-bind('designTokens.colors.text.primary');
  line-height: v-bind('designTokens.typography.lineHeight.relaxed');
}

.dialog-body p {
  margin: 0;
  font-size: v-bind('designTokens.typography.fontSize.base');
  white-space: pre-line;
}

.dialog-actions {
  padding: v-bind('designTokens.spacing.md') v-bind('designTokens.spacing.xl') v-bind('designTokens.spacing.xl');
  display: flex;
  justify-content: flex-end;
}

/* Confirmation Screen */
.confirmation-title {
  font-family: v-bind('designTokens.typography.fontFamily.secondary');
  font-size: v-bind('designTokens.typography.fontSize.xl');
  font-weight: v-bind('designTokens.typography.fontWeight.regular');
  color: v-bind('designTokens.colors.text.primary');
  margin: 0 0 v-bind('designTokens.spacing.sm') 0;
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wider');
}

.confirmation-subtitle {
  font-size: v-bind('designTokens.typography.fontSize.sm');
  color: v-bind('designTokens.colors.text.secondary');
  margin: 0 0 v-bind('designTokens.spacing.xl') 0;
  line-height: v-bind('designTokens.typography.lineHeight.relaxed');
}

.confirmation-list {
  margin: 0;
  padding: 0;
}

.confirmation-item {
  display: flex;
  align-items: baseline;
  padding: v-bind('designTokens.spacing.md') 0;
  border-bottom: 1px solid v-bind('designTokens.colors.border.light');
}

.confirmation-item:first-child {
  border-top: 1px solid v-bind('designTokens.colors.border.light');
}

.confirmation-label {
  font-size: v-bind('designTokens.typography.fontSize.xs');
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  color: v-bind('designTokens.colors.text.secondary');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wider');
  min-width: 140px;
  flex-shrink: 0;
}

.confirmation-value {
  font-size: v-bind('designTokens.typography.fontSize.base');
  color: v-bind('designTokens.colors.text.primary');
  margin: 0;
  line-height: v-bind('designTokens.typography.lineHeight.normal');
}

.confirmation-menu-title {
  display: block;
  font-family: v-bind('designTokens.typography.fontFamily.secondary');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wide');
}

.confirmation-menu-meta {
  display: block;
  font-size: v-bind('designTokens.typography.fontSize.sm');
  color: v-bind('designTokens.colors.accent.primary');
  margin-top: v-bind('designTokens.spacing.xs');
}

.confirmation .form-actions {
  border-top: none;
}

/* Responsive */
@media (max-width: 768px) {
  .card-body {
    padding: v-bind('designTokens.spacing.xl') v-bind('designTokens.spacing.lg');
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .menu-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions button {
    width: 100%;
  }

  .confirmation-item {
    flex-direction: column;
    gap: v-bind('designTokens.spacing.xs');
  }

  .confirmation-label {
    min-width: unset;
  }
}
</style>
