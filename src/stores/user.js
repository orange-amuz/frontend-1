import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  state: () => ({
    userList: null,
    currentSelectedUser: null,
  }),
});

export default useUserStore;
