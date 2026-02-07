<template>
  <div>
    <PhotoSlideshow :images="slideImages" class="page-hero">
      <div class="page-header">
        <h1>写真スタジオ予約フォーム</h1>
        <p>ご予約には以下のフォームに必要事項をご記入ください</p>
      </div>
    </PhotoSlideshow>

    <div class="page-body">
      <div class="page-body-inner">
        <BasicInfoForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasicInfoForm from '../components/BasicInfoForm.vue'
import PhotoSlideshow from '../components/PhotoSlideshow.vue'
import { designTokens } from '../styles/designTokens'

// TODO: 本番では実際のスタジオ写真に差し替え
// import slide1 from '../assets/img/slides/studio-1.jpg'
// const slideImages = [slide1, slide2, ...]
const slideImages: string[] = [
  'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?w=960&h=400&fit=crop',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=960&h=400&fit=crop',
  'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=960&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=960&h=400&fit=crop',
]
</script>

<style scoped>
.page-body {
  background-color: v-bind('designTokens.colors.background.main');
}

.page-body-inner {
  max-width: v-bind('designTokens.layout.maxWidth.lg');
  margin: 0 auto;
  padding: v-bind('designTokens.spacing["3xl"]') v-bind('designTokens.spacing.lg') v-bind('designTokens.spacing["4xl"]');
}

.page-hero {
  margin-bottom: 0;
}

.page-header {
  text-align: center;
  padding: v-bind('designTokens.spacing["3xl"]') v-bind('designTokens.spacing.xl');
}

.page-header h1 {
  font-family: v-bind('designTokens.typography.fontFamily.secondary');
  font-size: v-bind('designTokens.typography.fontSize["3xl"]');
  font-weight: v-bind('designTokens.typography.fontWeight.regular');
  color: v-bind('designTokens.colors.text.primary');
  line-height: v-bind('designTokens.typography.lineHeight.loose');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.widest');
  margin: 0 0 v-bind('designTokens.spacing.lg') 0;
}

.page-header p {
  font-family: v-bind('designTokens.typography.fontFamily.primary');
  font-size: v-bind('designTokens.typography.fontSize.sm');
  color: v-bind('designTokens.colors.text.secondary');
  line-height: v-bind('designTokens.typography.lineHeight.relaxed');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wider');
  margin: 0;
}

@media (max-width: 768px) {
  .page-body-inner {
    padding: v-bind('designTokens.spacing.xl') v-bind('designTokens.spacing.md') v-bind('designTokens.spacing["2xl"]');
  }

  .page-header {
    padding: v-bind('designTokens.spacing.xl') v-bind('designTokens.spacing.md');
  }

  .page-header h1 {
    font-size: v-bind('designTokens.typography.fontSize["2xl"]');
  }
}
</style>
