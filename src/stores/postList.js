import { defineStore } from "pinia";

const usePostListStore = defineStore("postList", {
  state: () => ({
    postList: null,
    currentSelectedList: null,
    currentSelectedUser: null,
    currentSelectedPost: null,
  }),
  actions: {
    newPostList(param) {
      this.postList = param;
    },
  },
  getters: {
    getPostList: (state) => state.postList,
  },
  persist: true,
});

export default usePostListStore;
