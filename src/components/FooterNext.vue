<script setup lang="ts">
// Imports
import { useAmbassadorsStore } from "@/stores/ambassadors";
import { useSignupStore } from "@/stores/signup";
import axios from "axios";
import { BaseButton } from "magma-design-system-test";
import { computed } from "vue";
import { useRouter } from "vue-router";

// Variables
const signupStore = useSignupStore();
const ambassadorsStore = useAmbassadorsStore();
const router = useRouter();

interface Error {
  error: true;
  errorType: "ERROR-TEST-SIGNUP-ORGANIZATION";
  message: string;
}

// Functions

// Checks if the current step is ambassadors step
const isAmbassadorsStep = computed(() => {
  return router.currentRoute.value.path === "/sign-up/ambassadors";
});

// Updates store on changes
const updateAmbassadorId = (id: number) => {
  ambassadorsStore.setOrganizationId(id);
};

// Checks if mandatory fields are filled
const isDisabled = computed(() => {
  return !signupStore.organizationName || !signupStore.organizationWebsite;
});

// Adds the organization and redirects to the ambassadors step
const onContinue = async () => {
  try {
    const { data } = await axios.post(
      "https://staging-v3.api.magma.app/api/test/organization",
      {
        logo: signupStore.organizationLogo,
        organizationData: JSON.stringify({
          name: signupStore.organizationName,
          website: signupStore.organizationWebsite
        })
      },
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    updateAmbassadorId(data.id);
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
  router.push("/sign-up/ambassadors");
};
</script>

<template>
  <footer
    :class="[
      'absolute flex h-[126px] bottom-0 bg-white w-full border-t border-subtle pt-10 pr-10 pb-10 pl-[536px]',
      {
        'justify-between': isAmbassadorsStep,
        'justify-end': !isAmbassadorsStep
      }
    ]"
  >
    <BaseButton
      v-if="isAmbassadorsStep"
      @click="router.push('/sign-up/organization')"
      :text="$t('generic.back')"
      state="scdr"
      icon="arrow-left"
    />
    <BaseButton
      @click="onContinue"
      :text="$t('generic.continue')"
      state="scdr"
      icon="arrow-right"
      :disabled="isDisabled"
    />
  </footer>
</template>