<script setup lang="ts">
import { designTokens } from './styles/designTokens'
</script>

<template>
  <div class="app-wrapper">
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">Sansan Reserve</h1>
        <nav class="header-nav">
          <router-link to="/demo/form" class="nav-link">
            予約フォーム
          </router-link>
          <router-link to="/demo/components" class="nav-link">
            コンポーネント
          </router-link>
          <router-link to="/demo/design-tokens" class="nav-link">
            デザイン
          </router-link>
        </nav>
      </div>
    </header>

    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background-color: v-bind('designTokens.colors.background.main');
  font-family: v-bind('designTokens.typography.fontFamily.primary');
}

.app-header {
  background-color: v-bind('designTokens.colors.background.card');
  border-bottom: 1px solid v-bind('designTokens.colors.border.light');
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: v-bind('designTokens.shadows.sm');
}

.header-content {
  max-width: v-bind('designTokens.layout.maxWidth.xl');
  margin: 0 auto;
  padding: v-bind('designTokens.spacing.lg') v-bind('designTokens.spacing.xl');
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: v-bind('designTokens.spacing.xl');
}

.app-title {
  font-family: v-bind('designTokens.typography.fontFamily.heading');
  font-size: v-bind('designTokens.typography.fontSize.xl');
  font-weight: v-bind('designTokens.typography.fontWeight.semibold');
  color: v-bind('designTokens.colors.text.primary');
  letter-spacing: v-bind('designTokens.typography.letterSpacing.wide');
  margin: 0;
  flex-shrink: 0;
}

.header-nav {
  display: flex;
  gap: v-bind('designTokens.spacing.lg');
  align-items: center;
}

.nav-link {
  font-family: v-bind('designTokens.typography.fontFamily.primary');
  font-size: v-bind('designTokens.typography.fontSize.sm');
  font-weight: v-bind('designTokens.typography.fontWeight.medium');
  color: v-bind('designTokens.colors.text.secondary');
  text-decoration: none;
  padding: v-bind('designTokens.spacing.sm') v-bind('designTokens.spacing.md');
  border-radius: v-bind('designTokens.borderRadius.md');
  transition: all v-bind('designTokens.transitions.duration.normal') v-bind('designTokens.transitions.easing.easeInOut');
  white-space: nowrap;
}

.nav-link:hover {
  color: v-bind('designTokens.colors.accent.primary');
  background-color: v-bind('designTokens.colors.accent.hover');
}

.nav-link.router-link-active {
  color: v-bind('designTokens.colors.accent.primary');
  background-color: v-bind('designTokens.colors.accent.secondary');
  font-weight: v-bind('designTokens.typography.fontWeight.semibold');
}

.app-main {
  min-height: calc(100vh - 73px);
}

@media (max-width: 768px) {
  .header-content {
    padding: v-bind('designTokens.spacing.md') v-bind('designTokens.spacing.lg');
    flex-direction: column;
    align-items: flex-start;
    gap: v-bind('designTokens.spacing.md');
  }

  .app-title {
    font-size: v-bind('designTokens.typography.fontSize.lg');
  }

  .header-nav {
    width: 100%;
    justify-content: space-between;
    gap: v-bind('designTokens.spacing.sm');
  }

  .nav-link {
    font-size: v-bind('designTokens.typography.fontSize.xs');
    padding: v-bind('designTokens.spacing.xs') v-bind('designTokens.spacing.sm');
  }
}
</style>
