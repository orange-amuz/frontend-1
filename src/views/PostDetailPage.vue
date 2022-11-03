<template>
  <div>
    <h1>{{ post.userId }}</h1>
    <h2>{{ post.id }}</h2>
    <h3>{{ post.title }}</h3>
    <h3>{{ post.completed }}</h3>
    <my-buttons :prefix="prefix" :unit="unit" :userId="$route.params.userId" />
  </div>
</template>

<script>
import usePostListStore from "@/stores/postList";
import MyButtons from "../components/Buttons.vue";

export default {
  name: "PostDetailPage",
  components: {
    MyButtons,
  },
  setup() {
    const postListStore = usePostListStore();

    return {
      postListStore,
    };
  },
  mounted() {
    this.setData();
  },
  updated() {
    this.setData();
  },
  data() {
    return {
      post: [],
      isError: false,
      prefix: 0,
      unit: 0,
    };
  },
  methods: {
    setData() {
      this.postListStore.currentSelectedPost = this.$route.params.id;

      const tempList = this.postListStore.currentSelectedList;
      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i] == this.postListStore.currentSelectedPost) {
          this.prefix = tempList[i - 1];
          this.unit = tempList[i + 1];
          this.getPost();
        }
      }
    },
    getPost() {
      for (let i = 0; i < this.postListStore.postList.length; i++) {
        if (this.postListStore.postList[i].id == this.$route.params.id) {
          this.post = this.postListStore.postList[i];
        }
      }
    },
  },
};
</script>
