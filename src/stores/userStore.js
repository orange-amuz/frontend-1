import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  state: () => ({
    userList: null,
    currentSelectedUser: null,
  }),
  persist: true,
});

export default useUserStore;
