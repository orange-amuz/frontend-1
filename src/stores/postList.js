import { defineStore } from "pinia";

const usePostListStore = defineStore("postList", {
  state: () => ({
    postList: [],
    currentSelectedList: [],
    currentSelectedUser: 0,
    currentSelectedPost: 0,
  }),
  actions: {
    newPostList(param) {
      this.postList = param;
    },
  },
  getters: {
    getPostList: (state) => state.postList,
  },
});

export default usePostListStore;
