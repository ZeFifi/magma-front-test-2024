<script setup lang="ts">
// Imports
import { defineProps } from "vue";

// Props
const props = defineProps({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  }
});

// Functions

// Gets initials from the ambassador firstname and lastname
const getInitials = (firstname: string, lastname: string) => {
  return firstname.charAt(0) + lastname.charAt(0);
};
</script>

<template>
  <div
    class="bg-background-subtle w-8 h-8 rounded-full flex justify-center items-center"
  >
    <p class="font-semibold text-xs text-foreground-default">
      {{ getInitials(props.firstname, props.lastname) }}
    </p>
  </div>
</template>
