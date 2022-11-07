import { defineStore } from "pinia";

const useFilteredPostListStore = defineStore("filteredPostList", {
  state: () => ({
    currentSelectedList: null,
    currentSelectedUser: null,
    currentSelectedPost: null,
  }),
  persist: true,
});

export default useFilteredPostListStore;
