<script setup lang="ts">
// Imports
import { useAmbassadorsStore } from "@/stores/ambassadors";
import type { ErrorTestCreateAmbassador } from "@/types/Errors";
import axios from "axios";
import { BaseButton, BaseIcon, FieldInput } from "magma-design-system-test";
import { computed } from "vue";

// Variables
const ambassadorsStore = useAmbassadorsStore();

const ambassadorFirstname = ambassadorsStore.ambassadorFirstname;
const ambassadorLastname = ambassadorsStore.ambassadorLastname;
const ambassadorEmail = ambassadorsStore.ambassadorEmail;

// Functions

// Closes the modal
const emit = defineEmits<{
  (e: "close"): void;
}>();

// Checks if mandatory fields are filled
const isDisabled = computed(() => {
  return (
    !ambassadorsStore.ambassadorFirstname ||
    !ambassadorsStore.ambassadorLastname ||
    !ambassadorsStore.ambassadorEmail
  );
});

// Adds an ambassador to the organization and closes the modal
const onAddAmbassador = async () => {
  try {
    const res = await axios.post(
      "https://staging-v3.api.magma.app/api/test/ambassador",
      {
        organizationId: ambassadorsStore.organizationId,
        firstname: ambassadorsStore.ambassadorFirstname,
        lastname: ambassadorsStore.ambassadorLastname,
        email: ambassadorsStore.ambassadorEmail
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (res.status === 200) {
      ambassadorsStore.allAmbassadors.push(res.data);
      ambassadorsStore.setAmbassadorFirstname("");
      ambassadorsStore.setAmbassadorLastname("");
      ambassadorsStore.setAmbassadorEmail("");
    }
  } catch (error: ErrorTestCreateAmbassador | any) {
    if (axios.isAxiosError(error)) {
      // Axios related errors
      console.error("Axios Error :", error.message);
      console.error("Response status :", error.response?.status);
    } else {
      // Other errors
      console.error("Unexpected error :", error.message);
    }
  }
  emit("close");
};

// Update store on changes
const updateAmbassadorFirstname = (firstname: string) => {
  ambassadorsStore.setAmbassadorFirstname(firstname);
};

const updateAmbassadorLastname = (lastname: string) => {
  ambassadorsStore.setAmbassadorLastname(lastname);
};

const updateAmbassadorEmail = (email: string) => {
  ambassadorsStore.setAmbassadorEmail(email);
  return "";
};
</script>

<template>
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity background-blur">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >
      <div
        class="inline-block bg-white rounded-2xl p-6 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle w-[480px]"
      >
        <div class="flex justify-between mb-2">
          <div><img src="/img/icons/users-plus.png" /></div>
          <div>
            <BaseIcon
              class="cursor-pointer"
              icon="close"
              color="#94A3B8"
              @click="$emit('close')"
            />
          </div>
        </div>
        <h1 class="text-lg font-semibold mb-4">
          {{ $t("signupAmbassadorsView.modal.title") }}
        </h1>
        <div class="flex justify-between mb-4">
          <FieldInput
            v-model="ambassadorFirstname"
            class="w-[208px]"
            :label="$t('generic.firstname')"
            placeholder="Nelson"
            required
            @update:model-value="updateAmbassadorFirstname"
          />
          <FieldInput
            v-model="ambassadorLastname"
            class="w-[208px]"
            :label="$t('generic.lastname')"
            placeholder="Mandela"
            required
            @update:model-value="updateAmbassadorLastname"
          />
        </div>
        <div class="mb-4">
          <FieldInput
            v-model="ambassadorEmail"
            :label="$t('generic.email')"
            role="email"
            icon="mail"
            placeholder="nelson.mandela@gmail.com"
            required
            @update:model-value="updateAmbassadorEmail"
          />
        </div>
        <div class="flex justify-end gap-2">
          <BaseButton
            :text="$t('generic.cancel')"
            state="scdr"
            @click="$emit('close')"
          />
          <BaseButton
            :text="$t('generic.add')"
            state="trtr"
            :disabled="isDisabled"
            @click="onAddAmbassador"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background-blur {
  backdrop-filter: blur(4px);
}
</style>
