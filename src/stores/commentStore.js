import { defineStore } from "pinia";

const useCommentStore = defineStore("comment", {
  state: () => ({
    currentPostNum: null,
    comments: null,
  }),
  persist: true,
});

export default useCommentStore;
