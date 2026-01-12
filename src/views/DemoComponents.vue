<template>
  <div class="demo-page">
    <div class="demo-header">
      <h1>UIコンポーネント デモ</h1>
      <p>カスタムUIコンポーネントの動作確認用ページです</p>
    </div>

    <div class="demo-section">
      <h2>BaseInput - 入力フィールド</h2>
      <div class="component-showcase">
        <BaseInput
          v-model="demoInput"
          label="お名前"
          placeholder="山田太郎"
          :required="true"
          :rules="[rules.required]"
        />

        <BaseInput
          v-model="demoEmail"
          label="メールアドレス"
          type="email"
          placeholder="example@example.com"
          :required="true"
          :rules="[rules.required, rules.email]"
        />

        <BaseInput
          v-model="demoDate"
          label="日付"
          type="date"
          :required="true"
        />

        <BaseInput
          v-model="demoDisabled"
          label="無効化された入力"
          :disabled="true"
        />
      </div>
      <div class="value-display">
        <p><strong>入力値:</strong> {{ demoInput }}</p>
        <p><strong>メール:</strong> {{ demoEmail }}</p>
        <p><strong>日付:</strong> {{ demoDate }}</p>
      </div>
    </div>

    <div class="demo-section">
      <h2>BaseSelect - セレクトボックス</h2>
      <div class="component-showcase">
        <BaseSelect
          v-model="demoSelect"
          label="撮影メニュー"
          :options="menuOptions"
          :required="true"
        />
      </div>
      <div class="value-display">
        <p><strong>選択値:</strong> {{ demoSelect }}</p>
      </div>
    </div>

    <div class="demo-section">
      <h2>BaseButton - ボタン</h2>
      <div class="component-showcase button-row">
        <BaseButton variant="primary" @click="showMessage('Primary clicked!')">
          プライマリボタン
        </BaseButton>

        <BaseButton variant="outlined" @click="showMessage('Outlined clicked!')">
          アウトラインボタン
        </BaseButton>

        <BaseButton variant="text" @click="showMessage('Text clicked!')">
          テキストボタン
        </BaseButton>

        <BaseButton variant="primary" :loading="demoLoading" @click="toggleLoading">
          ローディング
        </BaseButton>

        <BaseButton variant="primary" :disabled="true">
          無効化ボタン
        </BaseButton>
      </div>
      <div class="value-display" v-if="message">
        <p>{{ message }}</p>
      </div>
    </div>

    <div class="demo-section">
      <h2>カラーパレット</h2>
      <div class="color-grid">
        <div class="color-item">
          <div class="color-swatch" :style="{ backgroundColor: designTokens.colors.background.main }"></div>
          <p class="color-name">背景 (Main)</p>
          <p class="color-code">{{ designTokens.colors.background.main }}</p>
        </div>
        <div class="color-item">
          <div class="color-swatch" :style="{ backgroundColor: designTokens.colors.accent.primary }"></div>
          <p class="color-name">アクセント (Primary)</p>
          <p class="color-code">{{ designTokens.colors.accent.primary }}</p>
        </div>
        <div class="color-item">
          <div class="color-swatch" :style="{ backgroundColor: designTokens.colors.text.primary }"></div>
          <p class="color-name">テキスト (Primary)</p>
          <p class="color-code">{{ designTokens.colors.text.primary }}</p>
        </div>
        <div class="color-item">
          <div class="color-swatch" :style="{ backgroundColor: designTokens.colors.status.success }"></div>
          <p class="color-name">成功</p>
          <p class="color-code">{{ designTokens.colors.status.success }}</p>
        </div>
        <div class="color-item">
          <div class="color-swatch" :style="{ backgroundColor: designTokens.colors.status.error }"></div>
          <p class="color-name">エラー</p>
          <p class="color-code">{{ designTokens.colors.status.error }}</p>
        </div>
        <div class="color-item">
          <div class="color-swatch" :style="{ backgroundColor: designTokens.colors.status.info }"></div>
          <p class="color-name">情報</p>
          <p class="color-code">{{ designTokens.colors.status.info }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '../components/ui/BaseInput.vue'
import BaseSelect from '../components/ui/BaseSelect.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import { designTokens } from '../styles/designTokens'

const demoInput = ref('')
const demoEmail = ref('')
const demoDate = ref('')
const demoDisabled = ref('無効化された値')
const demoSelect = ref('')
const demoLoading = ref(false)
const message = ref('')

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

const showMessage = (msg: string) => {
  message.value = msg
  setTimeout(() => {
    message.value = ''
  }, 2000)
}

const toggleLoading = () => {
  demoLoading.value = true
  setTimeout(() => {
    demoLoading.value = false
  }, 2000)
}
</script>

<style scoped>
.demo-page {
  max-width: v-bind('designTokens.layout.maxWidth.lg');
  margin: 0 auto;
  padding: v-bind('designTokens.spacing["2xl"]') v-bind('designTokens.spacing.lg');
}

.demo-header {
  text-align: center;
  margin-bottom: v-bind('designTokens.spacing["3xl"]');
}

.demo-header h1 {
  font-family: v-bind('designTokens.typography.fontFamily.heading');
  font-size: v-bind('designTokens.typography.fontSize["3xl"]');
  font-weight: v-bind('designTokens.typography.fontWeight.semibold');
  color: v-bind('designTokens.colors.text.primary');
  margin: 0 0 v-bind('designTokens.spacing.md') 0;
}

.demo-header p {
  font-size: v-bind('designTokens.typography.fontSize.base');
  color: v-bind('designTokens.colors.text.secondary');
  margin: 0;
}

.demo-section {
  background-color: v-bind('designTokens.colors.background.card');
  border: 1px solid v-bind('designTokens.colors.border.light');
  border-radius: v-bind('designTokens.borderRadius.lg');
  padding: v-bind('designTokens.spacing["2xl"]');
  margin-bottom: v-bind('designTokens.spacing["2xl"]');
}

.demo-section h2 {
  font-family: v-bind('designTokens.typography.fontFamily.heading');
  font-size: v-bind('designTokens.typography.fontSize.xl');
  font-weight: v-bind('designTokens.typography.fontWeight.semibold');
  color: v-bind('designTokens.colors.text.primary');
  margin: 0 0 v-bind('designTokens.spacing.xl') 0;
  padding-bottom: v-bind('designTokens.spacing.md');
  border-bottom: 1px solid v-bind('designTokens.colors.border.light');
}

.component-showcase {
  margin-bottom: v-bind('designTokens.spacing.xl');
}

.button-row {
  display: flex;
  gap: v-bind('designTokens.spacing.md');
  flex-wrap: wrap;
}

.value-display {
  background-color: v-bind('designTokens.colors.accent.hover');
  border: 1px solid v-bind('designTokens.colors.border.light');
  border-radius: v-bind('designTokens.borderRadius.md');
  padding: v-bind('designTokens.spacing.lg');
}

.value-display p {
  margin: v-bind('designTokens.spacing.xs') 0;
  font-size: v-bind('designTokens.typography.fontSize.sm');
  color: v-bind('designTokens.colors.text.primary');
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: v-bind('designTokens.spacing.lg');
}

.color-item {
  text-align: center;
}

.color-swatch {
  width: 100%;
  height: 80px;
  border-radius: v-bind('designTokens.borderRadius.md');
  border: 1px solid v-bind('designTokens.colors.border.light');
  margin-bottom: v-bind('designTokens.spacing.sm');
}

.color-name {
  font-size: v-bind('designTokens.typography.fontSize.sm');
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  color: v-bind('designTokens.colors.text.primary');
  margin: v-bind('designTokens.spacing.xs') 0;
}

.color-code {
  font-size: v-bind('designTokens.typography.fontSize.xs');
  color: v-bind('designTokens.colors.text.secondary');
  font-family: monospace;
  margin: 0;
}

@media (max-width: 768px) {
  .button-row {
    flex-direction: column;
  }

  .button-row button {
    width: 100%;
  }
}
</style>
