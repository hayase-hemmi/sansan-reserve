<template>
  <div class="demo-page">
    <div class="demo-header">
      <h1>デザイントークン</h1>
      <p>このプロジェクトのデザインシステムの詳細です</p>
    </div>

    <div class="demo-section">
      <h2>タイポグラフィ</h2>
      <div class="typography-showcase">
        <div class="typo-item">
          <p class="size-4xl">見出し 4XL (36px)</p>
          <code>fontSize['4xl']</code>
        </div>
        <div class="typo-item">
          <p class="size-3xl">見出し 3XL (30px)</p>
          <code>fontSize['3xl']</code>
        </div>
        <div class="typo-item">
          <p class="size-2xl">見出し 2XL (24px)</p>
          <code>fontSize['2xl']</code>
        </div>
        <div class="typo-item">
          <p class="size-xl">見出し XL (20px)</p>
          <code>fontSize.xl</code>
        </div>
        <div class="typo-item">
          <p class="size-lg">見出し LG (18px)</p>
          <code>fontSize.lg</code>
        </div>
        <div class="typo-item">
          <p class="size-base">本文 Base (16px)</p>
          <code>fontSize.base</code>
        </div>
        <div class="typo-item">
          <p class="size-sm">小文字 SM (14px)</p>
          <code>fontSize.sm</code>
        </div>
        <div class="typo-item">
          <p class="size-xs">極小 XS (12px)</p>
          <code>fontSize.xs</code>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2>スペーシング</h2>
      <div class="spacing-showcase">
        <div class="spacing-item" v-for="(value, key) in spacings" :key="key">
          <div class="spacing-visual" :style="{ width: value, height: '40px', backgroundColor: designTokens.colors.accent.primary }"></div>
          <div class="spacing-info">
            <p class="spacing-name">{{ key }}</p>
            <code>{{ value }}</code>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2>ボーダー半径</h2>
      <div class="radius-showcase">
        <div class="radius-item" v-for="(value, key) in borderRadii" :key="key">
          <div
            class="radius-box"
            :style="{
              borderRadius: value,
              backgroundColor: designTokens.colors.accent.secondary,
              border: `2px solid ${designTokens.colors.accent.primary}`
            }"
          ></div>
          <p class="radius-name">{{ key }}</p>
          <code>{{ value }}</code>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2>シャドウ</h2>
      <div class="shadow-showcase">
        <div class="shadow-item" v-for="(value, key) in shadows" :key="key">
          <div
            class="shadow-box"
            :style="{
              boxShadow: value,
              backgroundColor: designTokens.colors.background.card
            }"
          ></div>
          <p class="shadow-name">{{ key }}</p>
          <code class="shadow-code">{{ value }}</code>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h2>カラーパレット（全色）</h2>

      <h3>背景色</h3>
      <div class="color-grid">
        <div class="color-item" v-for="(value, key) in designTokens.colors.background" :key="`bg-${key}`">
          <div class="color-swatch" :style="{ backgroundColor: value, border: '1px solid #ddd' }"></div>
          <p class="color-name">background.{{ key }}</p>
          <p class="color-code">{{ value }}</p>
        </div>
      </div>

      <h3>テキスト色</h3>
      <div class="color-grid">
        <div class="color-item" v-for="(value, key) in designTokens.colors.text" :key="`text-${key}`">
          <div class="color-swatch" :style="{ backgroundColor: value }"></div>
          <p class="color-name">text.{{ key }}</p>
          <p class="color-code">{{ value }}</p>
        </div>
      </div>

      <h3>アクセント色</h3>
      <div class="color-grid">
        <div class="color-item" v-for="(value, key) in designTokens.colors.accent" :key="`accent-${key}`">
          <div class="color-swatch" :style="{ backgroundColor: value }"></div>
          <p class="color-name">accent.{{ key }}</p>
          <p class="color-code">{{ value }}</p>
        </div>
      </div>

      <h3>ステータス色</h3>
      <div class="color-grid">
        <div class="color-item" v-for="(value, key) in designTokens.colors.status" :key="`status-${key}`">
          <div class="color-swatch" :style="{ backgroundColor: value }"></div>
          <p class="color-name">status.{{ key }}</p>
          <p class="color-code">{{ value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { designTokens } from '../styles/designTokens'

const spacings = {
  'xs (4px)': designTokens.spacing.xs,
  'sm (8px)': designTokens.spacing.sm,
  'md (16px)': designTokens.spacing.md,
  'lg (24px)': designTokens.spacing.lg,
  'xl (32px)': designTokens.spacing.xl,
  '2xl (48px)': designTokens.spacing['2xl'],
  '3xl (64px)': designTokens.spacing['3xl'],
  '4xl (96px)': designTokens.spacing['4xl'],
}

const borderRadii = {
  sm: designTokens.borderRadius.sm,
  md: designTokens.borderRadius.md,
  lg: designTokens.borderRadius.lg,
  xl: designTokens.borderRadius.xl,
}

const shadows = {
  sm: designTokens.shadows.sm,
  md: designTokens.shadows.md,
  lg: designTokens.shadows.lg,
  xl: designTokens.shadows.xl,
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

.demo-section h3 {
  font-size: v-bind('designTokens.typography.fontSize.lg');
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  color: v-bind('designTokens.colors.text.primary');
  margin: v-bind('designTokens.spacing.xl') 0 v-bind('designTokens.spacing.lg') 0;
}

.typography-showcase {
  display: flex;
  flex-direction: column;
  gap: v-bind('designTokens.spacing.lg');
}

.typo-item {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: v-bind('designTokens.spacing.md');
  padding: v-bind('designTokens.spacing.md');
  border-bottom: 1px solid v-bind('designTokens.colors.border.light');
}

.typo-item p {
  margin: 0;
  font-family: v-bind('designTokens.typography.fontFamily.primary');
  color: v-bind('designTokens.colors.text.primary');
}

.size-4xl { font-size: v-bind('designTokens.typography.fontSize["4xl"]'); }
.size-3xl { font-size: v-bind('designTokens.typography.fontSize["3xl"]'); }
.size-2xl { font-size: v-bind('designTokens.typography.fontSize["2xl"]'); }
.size-xl { font-size: v-bind('designTokens.typography.fontSize.xl'); }
.size-lg { font-size: v-bind('designTokens.typography.fontSize.lg'); }
.size-base { font-size: v-bind('designTokens.typography.fontSize.base'); }
.size-sm { font-size: v-bind('designTokens.typography.fontSize.sm'); }
.size-xs { font-size: v-bind('designTokens.typography.fontSize.xs'); }

code {
  font-family: monospace;
  font-size: v-bind('designTokens.typography.fontSize.xs');
  color: v-bind('designTokens.colors.accent.primary');
  background-color: v-bind('designTokens.colors.accent.hover');
  padding: 2px 6px;
  border-radius: v-bind('designTokens.borderRadius.sm');
}

.spacing-showcase {
  display: flex;
  flex-direction: column;
  gap: v-bind('designTokens.spacing.lg');
}

.spacing-item {
  display: flex;
  align-items: center;
  gap: v-bind('designTokens.spacing.lg');
}

.spacing-visual {
  flex-shrink: 0;
  border-radius: v-bind('designTokens.borderRadius.sm');
}

.spacing-info {
  display: flex;
  flex-direction: column;
  gap: v-bind('designTokens.spacing.xs');
}

.spacing-name {
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  margin: 0;
}

.radius-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: v-bind('designTokens.spacing.xl');
}

.radius-item {
  text-align: center;
}

.radius-box {
  width: 100%;
  height: 80px;
  margin-bottom: v-bind('designTokens.spacing.md');
}

.radius-name {
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  margin: v-bind('designTokens.spacing.xs') 0;
}

.shadow-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: v-bind('designTokens.spacing.xl');
}

.shadow-item {
  text-align: center;
}

.shadow-box {
  width: 100%;
  height: 80px;
  margin-bottom: v-bind('designTokens.spacing.md');
  display: flex;
  align-items: center;
  justify-content: center;
}

.shadow-name {
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  margin: v-bind('designTokens.spacing.xs') 0;
}

.shadow-code {
  font-size: 10px;
  display: block;
  word-break: break-all;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: v-bind('designTokens.spacing.lg');
  margin-bottom: v-bind('designTokens.spacing.xl');
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
</style>
