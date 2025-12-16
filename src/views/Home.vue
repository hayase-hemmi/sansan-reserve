<template>
  <v-container>
    <v-row class="mt-4">
      <v-col cols="12">
        <h1 class="text-4xl font-bold text-blue-600 mb-4">
          Welcome to Sansan Reserve
        </h1>
        <p class="text-lg text-gray-700 mb-6">
          Vue 3 + TypeScript + Vue Router + Vuetify + Tailwind CSS
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title class="text-h5">Vuetify Card</v-card-title>
          <v-card-text>
            This is a Vuetify card component demonstrating Material Design.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary">Action</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-semibold mb-3">Tailwind Card</h2>
          <p class="text-gray-600 mb-4">
            This card is styled with Tailwind CSS utility classes.
          </p>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Action
          </button>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// Component logic here
</script>
