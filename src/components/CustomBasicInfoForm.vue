<template>
  <div class="form-container">
    <div class="form-card">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
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

          <div class="menu-section">
            <label class="menu-label">撮影メニュー <span class="required">*</span></label>
            <div class="menu-grid">
              <MenuCard
                v-for="menu in menuOptions"
                :key="menu.value"
                :menu="menu"
                :selected-menu="formData.menu"
                @select="formData.menu = menu.value"
              />
            </div>
          </div>

          <CustomSlotPicker
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
              送信する
            </BaseButton>
          </div>
        </form>
      </div>
    </div>

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
import BaseButton from './ui/BaseButton.vue'
import MenuCard from './MenuCard.vue'
import CustomSlotPicker from './CustomSlotPicker.vue'
import { createReservation, type Menu } from '../services/api'
import { designTokens } from '../styles/designTokens'
import { menuOptions } from '../data/menuData'

interface FormData {
  lastName: string
  firstName: string
  email: string
  menu: Menu | ''
  selectedSlot: string
}

const submitting = ref(false)
const showDialog = ref(false)
const dialogType = ref<'success' | 'error'>('success')
const dialogMessage = ref('')

// Input refs
const lastNameInput = ref()
const firstNameInput = ref()
const emailInput = ref()

const formData = reactive<FormData>({
  lastName: '',
  firstName: '',
  email: '',
  menu: '',
  selectedSlot: '',
})

const rules = {
  required: (value: string | number | null) => !!value || '必須項目です',
  email: (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || '正しいメールアドレスを入力してください'
  },
}

const isFormValid = computed(() => {
  return (
    formData.lastName &&
    formData.firstName &&
    formData.email &&
    formData.menu &&
    formData.selectedSlot &&
    rules.email(formData.email) === true
  )
})

const handleSubmit = async () => {
  if (!isFormValid.value) {
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
  Object.assign(formData, {
    lastName: '',
    firstName: '',
    email: '',
    menu: '',
    selectedSlot: '',
  })

  // バリデーションエラーもクリア
  lastNameInput.value?.clearError()
  firstNameInput.value?.clearError()
  emailInput.value?.clearError()
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
  border-radius: v-bind('designTokens.borderRadius.lg');
  box-shadow: v-bind('designTokens.shadows.md');
  overflow: hidden;
}

.card-body {
  padding: v-bind('designTokens.spacing["2xl"]') v-bind('designTokens.spacing.xl');
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: v-bind('designTokens.spacing.lg');
  margin-bottom: 0;
}

.form-col {
  min-width: 0;
}

.menu-section {
  margin-bottom: v-bind('designTokens.spacing.xl');
}

.menu-label {
  display: block;
  font-size: v-bind('designTokens.typography.fontSize.sm');
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  color: v-bind('designTokens.colors.text.primary');
  margin-bottom: v-bind('designTokens.spacing.md');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.normal');
}

.menu-label .required {
  color: v-bind('designTokens.colors.status.error');
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
  border-radius: v-bind('designTokens.borderRadius.lg');
  box-shadow: v-bind('designTokens.shadows.xl');
  max-width: 500px;
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
  font-family: v-bind('designTokens.typography.fontFamily.heading');
  font-size: v-bind('designTokens.typography.fontSize.xl');
  font-weight: v-bind('designTokens.typography.fontWeight.semibold');
}

.dialog-body {
  padding: v-bind('designTokens.spacing.xl');
  color: v-bind('designTokens.colors.text.primary');
  line-height: v-bind('designTokens.typography.lineHeight.relaxed');
}

.dialog-body p {
  margin: 0;
  font-size: v-bind('designTokens.typography.fontSize.base');
}

.dialog-actions {
  padding: v-bind('designTokens.spacing.md') v-bind('designTokens.spacing.xl') v-bind('designTokens.spacing.xl');
  display: flex;
  justify-content: flex-end;
}

/* Responsive */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions button {
    width: 100%;
  }
}
</style>
