<script setup lang="ts">
// Imports
import { defineProps } from "vue";

// Props
const props = defineProps({
  organizationName: {
    type: String,
    required: true
  },
  organizationProfilePictureUrl: {
    type: String,
    default: null
  }
});
</script>

<template>
  <div
    id="container"
    class="overflow-hidden relative rounded-2xl bg-background-subtle"
  >
    <div id="website" class="absolute right-0 bottom-0 flex">
      <div id="left" class="bg-black rounded-tl-lg p-6">
        <div class="text-white flex items-center gap-[6px] mb-10">
          <div class="h-8 w-8">
            <img
              class="h-full w-full rounded-full object-cover"
              :src="
                props.organizationProfilePictureUrl
                  ? props.organizationProfilePictureUrl
                  : '/img/icons/image.png'
              "
              alt="company-avatar"
            />
          </div>
          <div>
            {{ props.organizationName ? props.organizationName : "Acme Inc." }}
          </div>
        </div>
      </div>
      <div id="right" class="border-t border-subtle bg-white">
        <div class="border-b border-subtle relative flex flex-col h-1/2">
          <div
            id="placeholder-1"
            class="absolute right-0 rounded-tl rounded-bl"
          ></div>
          <div
            id="placeholder-2"
            class="absolute right-0 rounded-tl rounded-bl"
          ></div>
        </div>
        <div class="relative h-1/2">
          <div
            id="placeholder-3"
            class="absolute right-0 bottom-0 rounded-tl rounded-bl border-t border-l border-subtle"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#container {
  width: 600px;
  height: 280px;
}

#website {
  width: 460px;
  height: 240px;
}

#left {
  width: 256px;
  height: 240px;
}

#right {
  width: 205px;
  height: 240px;
}

#placeholder-1 {
  top: 32px;
  width: 171px;
  height: 20px;
  background-color: #f1f5f9;
}

#placeholder-2 {
  bottom: 25px;
  width: 171px;
  height: 32px;
  background-color: #f1f5f9;
}

#placeholder-3 {
  width: 171px;
  height: 82px;
  background-color: #f1f5f9;
}
</style>
