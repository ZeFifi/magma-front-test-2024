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
          :label="$t('signupOrganizationView.form.organization')"
          placeholder="Acme Inc."
          required
          @update:model-value="updateOrganizationName"
        />
        <FieldInput
          v-model="organizationWebsite"
          :label="$t('generic.website')"
          placeholder="https://acme.com"
          required
          @update:model-value="updateOrganizationWebsite"
        />
        <FieldAvatarUploader
          :id="'avatar-uploader'"
          v-model="organizationProfilePicture"
          :label="$t('generic.logo')"
          :description="$t('signupProfileView.form.avatar.description')"
          :cta="$t('signupProfileView.form.avatar.cta')"
          @update:model-value="updateOrganizationLogo"
        />
      </div>
      <OrganizationPreviewIllustration
        :organization-name="signupStore.organizationName"
        :organization-profile-picture-url="organizationProfilePictureUrl || ''"
      />
    </div>
  </div>
</template>
