<template>
  <div v-if="isError">에러 발생</div>
  <div v-else>
    <h3>총 {{ users.size }} 명</h3>
    <ul>
      <li v-for="(user, i) in users" v-bind:key="i">
        <router-link v-bind:to="`/user/${user}`">{{ user }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import usePostListStore from "@/stores/postList";

export default {
  name: "UserListPage",
  components: {},
  setup() {
    const postListStore = usePostListStore();

    return {
      postListStore,
    };
  },
  mounted() {
    this.getData();

    if (!this.isError) {
      this.getUniqueUsers();
    }
  },
  data() {
    return {
      posts: [],
      users: {},
      isError: false,
    };
  },
  methods: {
    getData() {
      this.posts = this.postListStore.postList;
    },
    getUniqueUsers() {
      const duplicationUsers = [];

      for (let i = 0; i < this.posts.length; i++) {
        duplicationUsers.push(this.posts[i].userId);
      }

      this.users = new Set(duplicationUsers);
    },
  },
};
</script>
