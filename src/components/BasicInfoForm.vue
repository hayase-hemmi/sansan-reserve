<template>
  <v-card class="mx-auto" max-width="800">
    <v-card-title class="text-h5 bg-primary">
      基本情報入力
    </v-card-title>

    <v-card-text class="pt-6">
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

          <!-- フリガナ（姓） -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.lastNameKana"
              :rules="[rules.required, rules.kana]"
              label="フリガナ（セイ）"
              placeholder="ヤマダ"
              variant="outlined"
              required
            ></v-text-field>
          </v-col>

          <!-- フリガナ（名） -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.firstNameKana"
              :rules="[rules.required, rules.kana]"
              label="フリガナ（メイ）"
              placeholder="タロウ"
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

          <!-- 電話番号 -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.phone"
              :rules="[rules.required, rules.phone]"
              label="電話番号"
              placeholder="090-1234-5678"
              variant="outlined"
              type="tel"
              required
            ></v-text-field>
          </v-col>

          <!-- 撮影希望日 -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.preferredDate"
              :rules="[rules.required]"
              label="撮影希望日"
              variant="outlined"
              type="date"
              required
            ></v-text-field>
          </v-col>

          <!-- 撮影プラン -->
          <v-col cols="12">
            <v-select
              v-model="formData.plan"
              :items="planOptions"
              :rules="[rules.required]"
              label="撮影プラン"
              variant="outlined"
              required
            ></v-select>
          </v-col>

          <!-- 参加人数 -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="formData.participants"
              :rules="[rules.required, rules.number]"
              label="参加人数"
              variant="outlined"
              type="number"
              min="1"
              required
            ></v-text-field>
          </v-col>

          <!-- 備考 -->
          <v-col cols="12">
            <v-textarea
              v-model="formData.notes"
              label="備考・ご要望"
              placeholder="ご要望やご質問などございましたらご記入ください"
              variant="outlined"
              rows="4"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-card-actions class="px-6 pb-6">
      <v-spacer></v-spacer>
      <v-btn
        color="grey"
        variant="outlined"
        @click="handleReset"
      >
        クリア
      </v-btn>
      <v-btn
        color="primary"
        variant="elevated"
        :disabled="!valid"
        @click="handleSubmit"
      >
        送信する
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface FormData {
  lastName: string
  firstName: string
  lastNameKana: string
  firstNameKana: string
  email: string
  phone: string
  preferredDate: string
  plan: string
  participants: number | null
  notes: string
}

const formRef = ref()
const valid = ref(false)

const formData = reactive<FormData>({
  lastName: '',
  firstName: '',
  lastNameKana: '',
  firstNameKana: '',
  email: '',
  phone: '',
  preferredDate: '',
  plan: '',
  participants: null,
  notes: '',
})

const planOptions = [
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
  phone: (value: string) => {
    const pattern = /^[0-9-]+$/
    return pattern.test(value) || '正しい電話番号を入力してください'
  },
  kana: (value: string) => {
    const pattern = /^[ァ-ヶー]+$/
    return pattern.test(value) || 'カタカナで入力してください'
  },
  number: (value: number | null) => {
    return (value !== null && value > 0) || '1以上の数値を入力してください'
  },
}

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (valid) {
    console.log('Form submitted:', formData)
    alert('お申し込みありがとうございます！確認メールをお送りいたしました。')
    // ここで実際のAPI送信処理を行う
  }
}

const handleReset = () => {
  formRef.value.reset()
  Object.assign(formData, {
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
    email: '',
    phone: '',
    preferredDate: '',
    plan: '',
    participants: null,
    notes: '',
  })
}
</script>

<style scoped>
.v-card-title {
  color: white;
}
</style>
