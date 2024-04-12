// NPM
import { defineStore } from "pinia";

export const useSignupStore = defineStore("signup", {
  state: () => ({
    organizationName: "",
    organizationWebsite: "",
    organizationLogo: null as File | null
  }),

  actions: {
    setOrganizationName(name: string) {
      this.organizationName = name;
    },

    setWebsite(url: string) {
      this.organizationWebsite = url;
    },

    setLogo(file: File | null) {
      this.organizationLogo = file;
    }
  }
});
