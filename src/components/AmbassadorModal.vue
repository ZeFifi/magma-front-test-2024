<script setup lang="ts">
// Imports
import { useAmbassadorsStore } from "@/stores/ambassadors";
import axios from "axios";
import { BaseButton, BaseIcon, FieldInput } from "magma-design-system-test";

// Variables
const ambassadorsStore = useAmbassadorsStore();

const ambassadorFirstname = ambassadorsStore.ambassadorFirstname;
const ambassadorLastname = ambassadorsStore.ambassadorLastname;
const ambassadorEmail = ambassadorsStore.ambassadorEmail;

interface Error {
  error: true;
  errorType: "ERROR-TEST-CREATE-AMBASSADOR";
  message: string;
}

// Functions

// Closes the modal
const emit = defineEmits<{
  (e: "close"): void;
}>();

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
    }
  } catch (error: Error | any) {
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
              @click="$emit('close')"
              class="cursor-pointer"
              icon="close"
              color="#94A3B8"
            />
          </div>
        </div>
        <h1 class="text-lg font-semibold mb-4">
          {{ $t("signupAmbassadorsView.modal.title") }}
        </h1>
        <div class="flex justify-between mb-4">
          <FieldInput
            v-model="ambassadorFirstname"
            @update:modelValue="updateAmbassadorFirstname"
            class="w-[208px]"
            :label="$t('generic.firstname')"
            placeholder="Nelson"
            required
          />
          <FieldInput
            v-model="ambassadorLastname"
            @update:modelValue="updateAmbassadorLastname"
            class="w-[208px]"
            :label="$t('generic.lastname')"
            placeholder="Mandela"
            required
          />
        </div>
        <div class="mb-4">
          <FieldInput
            v-model="ambassadorEmail"
            @update:modelValue="updateAmbassadorEmail"
            :label="$t('generic.email')"
            role="email"
            placeholder="nelson.mandela@gmail.com"
            required
          />
        </div>
        <div class="flex justify-end gap-2">
          <BaseButton
            @click="$emit('close')"
            :text="$t('generic.cancel')"
            state="scdr"
          />
          <BaseButton
            @click="onAddAmbassador"
            :text="$t('generic.add')"
            custom-color="#444ce7"
            state="prmr"
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
