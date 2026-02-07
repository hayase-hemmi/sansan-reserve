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
  background-color: v-bind('designTokens.colors.background.card');
  font-family: v-bind('designTokens.typography.fontFamily.primary');
}

.app-header {
  background-color: v-bind('designTokens.colors.background.card');
  border-bottom: none;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: v-bind('designTokens.layout.maxWidth.xl');
  margin: 0 auto;
  padding: v-bind('designTokens.spacing.lg') v-bind('designTokens.spacing.xl');
  display: flex;
  align-items: center;
  justify-content: center;
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


.app-main {
  min-height: calc(100vh - 73px);
}

@media (max-width: 768px) {
  .header-content {
    padding: v-bind('designTokens.spacing.sm') v-bind('designTokens.spacing.lg');
  }

  .logo-img {
    height: 40px;
  }
}
</style>
