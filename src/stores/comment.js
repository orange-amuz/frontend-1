import { defineStore } from "pinia";

const useCommentStore = defineStore("comment", {
  state: () => ({
    currentPostNum: null,
    comments: null,
  }),
});

export default useCommentStore;
