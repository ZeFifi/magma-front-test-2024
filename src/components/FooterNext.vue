<script setup lang="ts">
// Imports
import { useAmbassadorsStore } from "@/stores/ambassadors";
import { useSignupStore } from "@/stores/signup";
import type { ErrorTestSignupOrganization } from "@/types/Errors";
import axios from "axios";
import { BaseButton } from "magma-design-system-test";
import { computed } from "vue";
import { useRouter } from "vue-router";

// Variables
const signupStore = useSignupStore();
const ambassadorsStore = useAmbassadorsStore();
const router = useRouter();

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
  } catch (error: ErrorTestSignupOrganization | any) {
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
    class="fixed w-[calc(100%-496px)] h-[126px] bottom-0 bg-white border-t border-subtle p-10"
  >
    <div
      :class="[
        'flex',
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
    </div>
  </footer>
</template>
