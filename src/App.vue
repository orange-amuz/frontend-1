<template>
  <div v-if="!this.isLoadingUserDone">유저 로딩중...</div>
  <div v-else>
    <div v-if="!this.isLoadingPostsDone">게시글 로딩중...</div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import usePostListStore from "./stores/postList";
import useUserStore from "@/stores/user";

export default {
  name: "App",
  components: {},
  setup() {
    const postListStore = usePostListStore();
    const userStore = useUserStore();

    return {
      postListStore,
      userStore,
    };
  },
  mounted() {
    this.getAllUser();
    this.getAllPost();
  },
  data() {
    return {
      isLoadingPostsDone: false,
      isLoadingUserDone: false,
      hasError: false,
      errorCode: "",
    };
  },
  methods: {
    getAllUser() {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          this.userStore.userList = response.data;
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

          this.postListStore.postList = posts;

          this.isLoadingPostsDone = true;
        })
        .catch(function (error) {
          this.isLoadingPostsDone = true;
          this.errorCode = error;
          this.hasError = true;
        });
    },
    getUniqueUsers() {
      const duplicationUsers = [];

      for (let i = 0; i < this.posts.length; i++) {
        duplicationUsers.push(this.posts[i].userId);
      }

      const uniqueUsers = new Set(duplicationUsers);
      // console.log(uniqueUsers);
      // console.log(this.userStore.userList);

      const exitUsers = [];
      for (let i = 0; i < this.userStore.userList.length; i++) {
        if (uniqueUsers.has(this.userStore.userList[i].id)) {
          exitUsers.push(this.userStore.userList[i]);
        }
      }

      this.userStore.userList = exitUsers;
    },
  },
};
</script>

<style>
body {
  margin: 0px;
}
</style>
