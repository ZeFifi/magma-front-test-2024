<script setup lang="ts">
// Imports
import { BaseButton } from "magma-design-system-test";
import { defineProps, type PropType } from "vue";

// Props
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  toggleModal: {
    type: Function as PropType<() => void>,
    required: true
  },
  ambassadors: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div
    class="flex justify-between gap-8 aside-gradient text-white rounded-lg border-border-on-emphasis px-6 py-7 shadow-[0px_0px_0px_1px_rgba(6,16,204,0.76),0px_1px_2px_0px_rgba(14,16,56,0.40)]"
  >
    <div>
      <span class="text-5xl mr-1">{{ ambassadors.length }}</span>
      <span class="text-xl text-background-brand-disabled mr-1">/</span>
      <span class="text-xl text-background-brand-disabled">5</span>
    </div>
    <div>
      <p class="font-medium text-sm mb-4">{{ props.message }}</p>
      <BaseButton
        :text="$t('signupAmbassadorsView.cta')"
        state="scdr"
        icon="plus"
        @click="toggleModal"
      />
    </div>
  </div>
</template>

<style scoped>
.aside-gradient {
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.16) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #444ce7;
}
</style>
