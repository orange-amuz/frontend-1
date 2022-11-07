<template>
  <div v-if="!this.isLoadingUserDone">유저 로딩중...</div>
  <div v-else>
    <div v-if="!this.isLoadingCommentDone">댓글 로딩중...</div>
    <div v-else>
      <div v-if="!this.isLoadingPostsDone">게시글 로딩중...</div>
      <div v-else><router-view /></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import User from "@/models/UserModel";
import Post from "./models/PostModel";
import Comment from "./models/CommentModel";

import useFilteredPostListStore from "./stores/filteredPostListStore";

export default {
  name: "App",
  components: {},
  setup() {
    const filteredPostListStore = useFilteredPostListStore();

    return {
      filteredPostListStore,
    };
  },
  mounted() {
    // this.filteredPostListStore.currentSelectedList = null;
    // this.filteredPostListStore.currentSelectedPost = null;
    // this.filteredPostListStore.currentSelectedUser = null;
    this.getAllUser();
    this.getAllComment();
    this.getAllPost();
  },
  data() {
    return {
      isLoadingUserDone: false,
      isLoadingCommentDone: false,
      isLoadingPostsDone: false,
      hasError: false,
      errorCode: "",
    };
  },
  methods: {
    getAllUser() {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          User.create({
            data: response.data,
          });

          this.isLoadingUserDone = true;
        })
        .catch(function (error) {
          this.isLoadingUserDone = true;

          this.errorCode = error;
        });
    },
    getAllPost() {
      axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((response) => {
          const posts = response.data;

          Post.create({
            data: posts,
          });

          this.isLoadingPostsDone = true;
        })
        .catch(function (error) {
          this.isLoadingPostsDone = true;
          this.errorCode = error;
          this.hasError = true;
        });
    },
    getAllComment() {
      axios
        .get("https://jsonplaceholder.typicode.com/comments")
        .then((response) => {
          const comments = response.data;

          Comment.create({ data: comments });

          this.isLoadingCommentDone = true;
        })
        .catch((error) => {
          this.isLoadingCommentDone = true;
          console.log(error);
        });
    },
  },
};
</script>

<style>
body {
  margin: 0px;
}
</style>
