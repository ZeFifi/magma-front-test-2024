// NPM
import { defineStore } from "pinia";

export const useAmbassadorsStore = defineStore("ambassadors", {
  state: () => ({
    organizationId: 0,
    ambassadorFirstname: "",
    ambassadorLastname: "",
    ambassadorEmail: "",
    allAmbassadors: [] as {
      id: number;
      firstname: string;
      lastname: string;
      email: string;
    }[]
  }),

  actions: {
    setOrganizationId(id: number) {
      this.organizationId = id;
    },

    setAmbassadorFirstname(firstname: string) {
      this.ambassadorFirstname = firstname;
    },

    setAmbassadorLastname(lastname: string) {
      this.ambassadorLastname = lastname;
    },

    setAmbassadorEmail(email: string) {
      this.ambassadorEmail = email;
    }
  }
});
