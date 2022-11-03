<template>
  <div v-if="!this.isLoadingDone">로딩중...</div>
  <div v-else>
    <div v-if="hasError">
      <h1>{{ errorCode }}</h1>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import usePostListStore from "./stores/postList";

export default {
  name: "App",
  components: {},
  setup() {
    const postListStore = usePostListStore();

    return {
      postListStore,
    };
  },
  mounted() {
    this.getAllPost();
  },
  data() {
    return {
      isLoadingDone: false,
      hasError: false,
      errorCode: "",
    };
  },
  methods: {
    getAllPost() {
      axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((response) => {
          const posts = response.data;

          this.postListStore.postList = posts;

          this.isLoadingDone = true;
        })
        .catch(function (error) {
          this.isLoadingDone = true;
          this.errorCode = error;
          this.hasError = true;
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
