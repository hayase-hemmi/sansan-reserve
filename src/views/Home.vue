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

import slide1 from '../assets/img/slides/_MG_0150.jpg'
import slide2 from '../assets/img/slides/_MG_0325.jpg'
import slide3 from '../assets/img/slides/_MG_2333.jpg'
import slide4 from '../assets/img/slides/_MG_2358.jpg'
import slide5 from '../assets/img/slides/_MG_4929.jpg'
import slide6 from '../assets/img/slides/_MG_6280.jpg'

const slideImages: string[] = [slide1, slide2, slide3, slide4, slide5, slide6]
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
