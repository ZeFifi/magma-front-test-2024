<script setup lang="ts">
// Components
import FooterNext from "@/components/FooterNext.vue";
import SignupSidebar from "@/components/shell/SignupSidebar.vue";
import { useRoute } from "vue-router";
import SignupAmbassadorsView from "./SignupAmbassadorsView.vue";
import SignupOrganizationView from "./SignupOrganizationView.vue";

const route = useRoute();
</script>

<template>
  <div class="flex">
    <SignupSidebar />
    <div>
      <template v-if="route.path === '/sign-up/organization'">
        <SignupOrganizationView
      /></template>
      <template v-else><SignupAmbassadorsView /></template>
      <FooterNext />
    </div>
  </div>
</template>
