<template>
  <div class="p-10">
    <h3 class="mb-3">총 {{ users.length }} 명</h3>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div
        class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        v-for="(user, i) in users"
        v-bind:key="i"
      >
        <div class="min-w-0 flex-1">
          <router-link
            class="focus:outline-none"
            v-bind:to="`/user/${user.id}`"
          >
            <p class="text-sm font-medium text-gray-900">
              {{ user.name }}
            </p>
            <p class="truncate text-sm text-gray-500">ID: {{ user.id }}</p>
            <p class="truncate text-sm text-gray-500">
              User Name: {{ user.username }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usePostListStore from "@/stores/postList";
import useUserStore from "@/stores/user";

export default {
  name: "UserListPage",
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
    this.getData();
    this.getUsers();
  },
  data() {
    return {
      posts: [],
      users: [],
    };
  },
  methods: {
    getData() {
      this.posts = this.postListStore.postList;
    },
    getUsers() {
      this.users = this.userStore.userList;
    },
  },
};
</script>
