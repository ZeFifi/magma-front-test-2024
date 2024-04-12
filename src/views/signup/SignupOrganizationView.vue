<script setup lang="ts">
// Imports
import { useSignupStore } from "@/stores/signup";
import { computed, ref } from "vue";

import OrganizationPreviewIllustration from "@/components/OrganizationPreviewIllustration.vue";
import { FieldAvatarUploader, FieldInput } from "magma-design-system-test";

// Variables
const signupStore = useSignupStore();

// States
const organizationName = signupStore.organizationName;
const organizationWebsite = signupStore.organizationWebsite;
const organizationProfilePicture = ref<File | null>(null);

// Functions
const organizationProfilePictureUrl = computed<string | null>(() => {
  if (organizationProfilePicture.value) {
    return URL.createObjectURL(organizationProfilePicture.value);
  }
  return null;
});

// Update store on changes
const updateOrganizationName = (name: string) => {
  signupStore.setOrganizationName(name);
};

const updateOrganizationWebsite = (url: string) => {
  signupStore.setWebsite(url);
};

const updateOrganizationLogo = (logo: File) => {
  signupStore.setLogo(logo);
};
</script>

<template>
  <div class="mt-[152px] w-[728px]">
    <div class="ml-32">
      <h1 class="text-mgm-txt-xl mb-6">
        {{ $t("signupOrganizationView.heading") }}
      </h1>
      <div class="flex flex-col gap-4 mb-10">
        <FieldInput
          v-model="organizationName"
          @update:modelValue="updateOrganizationName"
          :label="$t('signupOrganizationView.form.organization')"
          placeholder="Acme Inc."
          required
        />
        <FieldInput
          v-model="organizationWebsite"
          @update:modelValue="updateOrganizationWebsite"
          :label="$t('generic.website')"
          placeholder="https://acme.com"
          required
        />
        <FieldAvatarUploader
          v-model="organizationProfilePicture"
          @update:modelValue="updateOrganizationLogo"
          :id="'avatar-uploader'"
          :label="$t('generic.logo')"
          :description="$t('signupProfileView.form.avatar.description')"
          :cta="$t('signupProfileView.form.avatar.cta')"
        />
      </div>
      <OrganizationPreviewIllustration
        :organizationName="organizationName"
        :organizationProfilePictureUrl="organizationProfilePictureUrl || ''"
      />
    </div>
  </div>
</template>
