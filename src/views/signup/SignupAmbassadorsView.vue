<script setup lang="ts">
// Imports
import { useAmbassadorsStore } from "@/stores/ambassadors";
import { ref } from "vue";

import AddAmbassadorsBlock from "@/components/AddAmbassadorsBlock.vue";
import AmbassadorModal from "@/components/AmbassadorModal.vue";
import AmbassadorsList from "@/components/AmbassadorsList.vue";
import WarningMessage from "@/components/WarningMessage.vue";

// Variables
const ambassadorStore = useAmbassadorsStore();
const ambassadors = ambassadorStore.allAmbassadors;

// Functions

// Checks if there are ambassadors
const hasAmbassadors = () => {
  if (ambassadors.length > 0) {
    return true;
  }
  return false;
};

// Toggles the modal
const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

// States
const isModalOpen = ref(false);
</script>

<template>
  <div class="mt-[152px] w-[728px]">
    <div class="ml-32">
      <h1 class="text-mgm-txt-xl mb-6">
        {{ $t("signupAmbassadorsView.heading") }}
      </h1>
      <div>
        <WarningMessage :message="$t('signupAmbassadorsView.advice')" />
        <AddAmbassadorsBlock
          class="mb-10"
          :message="$t('signupAmbassadorsView.description')"
          :toggle-modal="toggleModal"
          :ambassadors="ambassadors"
        />
        <AmbassadorsList v-if="hasAmbassadors()" :ambassadors="ambassadors" />
      </div>
    </div>
    <div v-if="isModalOpen">
      <AmbassadorModal @close="isModalOpen = false" />
    </div>
  </div>
</template>
