<script setup lang="ts">
// Imports
import NoAvatar from "@/components/NoAvatar.vue";
import { useAmbassadorsStore } from "@/stores/ambassadors";
import type { Ambassador } from "@/types/Ambassador";
import type { ErrorTestDeleteAmbassador } from "@/types/Errors";
import axios from "axios";
import { BaseIcon } from "magma-design-system-test";
import { defineProps } from "vue";

// Props
const props = defineProps({
  ambassadors: {
    type: Array<Ambassador>,
    required: true
  }
});

// Variables
const ambassadorsStore = useAmbassadorsStore();

// Functions

// Deletes an ambassador
const deleteAmbassador = async (ambassadorId: number) => {
  try {
    const res = await axios.delete(
      `https://staging-v3.api.magma.app/api/test/ambassador/${ambassadorId}`
    );
    if (res.status === 200) {
      const index = ambassadorsStore.allAmbassadors.findIndex(
        (ambassador) => ambassador.id === ambassadorId
      );
      ambassadorsStore.allAmbassadors.splice(index, 1);
    }
  } catch (error: ErrorTestDeleteAmbassador | any) {
    if (axios.isAxiosError(error)) {
      // Axios related errors
      console.error("Axios Error :", error.message);
      console.error("Response status :", error.response?.status);
    } else {
      // Other errors
      console.error("Unexpected error :", error.message);
    }
  }
};
</script>

<template>
  <h1 class="font-medium mb-4">{{ $t("generic.added") }}</h1>
  <div class="border border-subtle rounded-lg">
    <ul id="ambassadors-list">
      <li
        v-for="ambassador in props.ambassadors"
        :key="ambassador.id"
        class="flex justify-between items-center text-sm p-[14px] border-b border-subtle last:border-none"
      >
        <div class="flex items-center gap-3">
          <NoAvatar
            :firstname="ambassador.firstname"
            :lastname="ambassador.lastname"
          />
          <p>{{ ambassador.firstname }}</p>
        </div>
        <p class="text text-foreground-default">
          {{ ambassador.email }}
        </p>
        <span class="cursor-pointer"
          ><BaseIcon icon="trash" @click="deleteAmbassador(ambassador.id)"
        /></span>
      </li>
    </ul>
  </div>
</template>
