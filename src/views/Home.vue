<template>
  <v-container>
    <v-row class="mt-4 mb-8">
      <v-col cols="12" class="text-center">
        <h1 class="text-4xl font-bold mb-4">
          写真スタジオ予約フォーム
        </h1>
        <p class="text-lg text-gray-600 mb-6">
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
</script>
