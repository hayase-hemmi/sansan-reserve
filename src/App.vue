<script setup lang="ts">
import { designTokens } from './styles/designTokens'
</script>

<template>
  <v-app :style="{ fontFamily: designTokens.typography.fontFamily.primary }">
    <v-app-bar
      elevation="0"
      :style="{
        backgroundColor: designTokens.colors.background.card,
        borderBottom: `1px solid ${designTokens.colors.border.light}`,
        color: designTokens.colors.text.primary,
      }"
    >
      <v-app-bar-title
        :style="{
          fontFamily: designTokens.typography.fontFamily.heading,
          fontWeight: designTokens.typography.fontWeight.semibold,
          fontSize: designTokens.typography.fontSize.xl,
          letterSpacing: designTokens.typography.letterSpacing.wide,
        }"
      >
        Sansan Reserve
      </v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
