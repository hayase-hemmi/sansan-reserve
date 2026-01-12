<template>
  <div class="page-container">
    <div class="page-header">
      <h1>写真スタジオ予約フォーム</h1>
      <p>ご予約には以下のフォームに必要事項をご記入ください</p>
    </div>

    <CustomBasicInfoForm />
  </div>
</template>

<script setup lang="ts">
import CustomBasicInfoForm from '../components/CustomBasicInfoForm.vue'
import { designTokens } from '../styles/designTokens'
</script>

<style scoped>
.page-container {
  max-width: v-bind('designTokens.layout.maxWidth.lg');
  margin: 0 auto;
  padding: v-bind('designTokens.spacing["3xl"]') v-bind('designTokens.spacing.lg') v-bind('designTokens.spacing["4xl"]');
}

.page-header {
  text-align: center;
  margin-bottom: v-bind('designTokens.spacing["2xl"]');
}

.page-header h1 {
  font-family: v-bind('designTokens.typography.fontFamily.heading');
  font-size: v-bind('designTokens.typography.fontSize["3xl"]');
  font-weight: v-bind('designTokens.typography.fontWeight.semibold');
  color: v-bind('designTokens.colors.text.primary');
  line-height: v-bind('designTokens.typography.lineHeight.tight');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wide');
  margin: 0 0 v-bind('designTokens.spacing.lg') 0;
}

.page-header p {
  font-family: v-bind('designTokens.typography.fontFamily.primary');
  font-size: v-bind('designTokens.typography.fontSize.base');
  color: v-bind('designTokens.colors.text.secondary');
  line-height: v-bind('designTokens.typography.lineHeight.relaxed');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.normal');
  margin: 0;
}

@media (max-width: 768px) {
  .page-container {
    padding: v-bind('designTokens.spacing.xl') v-bind('designTokens.spacing.md') v-bind('designTokens.spacing["2xl"]');
  }

  .page-header h1 {
    font-size: v-bind('designTokens.typography.fontSize["2xl"]');
  }
}
</style>
