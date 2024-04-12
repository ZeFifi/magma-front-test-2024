<script setup lang="ts">
// Imports
import { defineProps } from "vue";

// Props
const props = defineProps({
  message: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="rounded-lg p-4 bg-background-warning-default mb-6">
    <p class="text-sm">
      {{ props.message }}
    </p>
  </div>
</template>
