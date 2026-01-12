<script setup lang="ts">
import { designTokens } from './styles/designTokens'
</script>

<template>
  <div class="app-wrapper">
    <header class="app-header">
      <div class="header-content">
        <router-link to="/" class="logo-link">
          <img
            src="./assets/img/full-text-logo.png"
            alt="Sansan Reserve"
            class="logo-img"
          />
        </router-link>
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
  padding: v-bind('designTokens.spacing.md') v-bind('designTokens.spacing.xl');
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: v-bind('designTokens.spacing.xl');
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-img {
  height: 56px;
  width: auto;
  object-fit: contain;
  transition: opacity v-bind('designTokens.transitions.duration.normal') v-bind('designTokens.transitions.easing.easeInOut');
}

.logo-link:hover .logo-img {
  opacity: 0.8;
}

.header-nav {
  display: flex;
  gap: v-bind('designTokens.spacing.lg');
  align-items: center;
}

.nav-link {
  font-family: v-bind('designTokens.typography.fontFamily.navigation');
  font-size: v-bind('designTokens.typography.fontSize.sm');
  font-weight: v-bind('designTokens.typography.fontWeight.regular');
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
    padding: v-bind('designTokens.spacing.sm') v-bind('designTokens.spacing.lg');
    flex-direction: column;
    align-items: flex-start;
    gap: v-bind('designTokens.spacing.md');
  }

  .logo-img {
    height: 40px;
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
