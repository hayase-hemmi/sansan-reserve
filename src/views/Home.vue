<template>
  <v-container
    :style="{
      maxWidth: designTokens.layout.maxWidth.lg,
      paddingTop: designTokens.spacing['3xl'],
      paddingBottom: designTokens.spacing['4xl'],
    }"
  >
    <v-row class="mb-8">
      <v-col cols="12" class="text-center">
        <h1
          :style="{
            fontFamily: designTokens.typography.fontFamily.heading,
            fontSize: designTokens.typography.fontSize['3xl'],
            fontWeight: designTokens.typography.fontWeight.semibold,
            color: designTokens.colors.text.primary,
            lineHeight: designTokens.typography.lineHeight.tight,
            letterSpacing: designTokens.typography.letterSpacing.wide,
            marginBottom: designTokens.spacing.lg,
          }"
        >
          写真スタジオ予約フォーム
        </h1>
        <p
          :style="{
            fontFamily: designTokens.typography.fontFamily.primary,
            fontSize: designTokens.typography.fontSize.base,
            color: designTokens.colors.text.secondary,
            lineHeight: designTokens.typography.lineHeight.relaxed,
            letterSpacing: designTokens.typography.letterSpacing.normal,
          }"
        >
          ご予約には以下のフォームに必要事項をご記入ください
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <BasicInfoForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import BasicInfoForm from '../components/BasicInfoForm.vue'
import { designTokens } from '../styles/designTokens'
</script>
