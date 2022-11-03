<template>
  <div v-if="isError">에러 발생</div>
  <div v-else class="">
    <div class="bg-white">
      <div
        class="mx-auto max-w-7xl py-16 px-4 sm:py-10 sm:px-6 lg:flex lg:justify-between lg:px-8"
      >
        <div class="max-w-xl">
          <h2
            class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            {{ user.name }}
          </h2>
          <p class="mt-5 text-xl text-gray-500">
            User ID: {{ user.id }}<br />
            User Name: {{ user.username }}
          </p>
        </div>
      </div>
    </div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select
        id="tabs"
        name="tabs"
        class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        <option
          v-for="(tab, index) in tabs"
          :key="tab.name"
          :selected="index == currentIndex"
        >
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block mx-auto max-w-7xl">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            v-for="(tab, index) in tabs"
            :key="tab.name"
            @click="onClickButton(index)"
            :class="[
              index == currentIndex
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
            ]"
            :aria-current="index == currentIndex ? 'page' : undefined"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
    </div>
    <div class="flow-root pt-3 px-3 mx-auto max-w-7xl">
      <ul v-if="currentIndex == 0" class="-mb-8">
        <li v-for="post in filteredPosts" :key="post.id">
          <div class="relative pb-8">
            <div class="relative flex space-x-3">
              <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <router-link
                    class="font-medium text-gray-900 text-sm"
                    v-bind:to="`/post/${$route.params.userId}/${post.id}`"
                  >
                    {{ post.id }} -
                    {{ post.title }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul v-else-if="currentIndex == 1" class="-mb-8">
        <li v-for="post in filteredPostComplete" :key="post.id">
          <div class="relative pb-8">
            <div class="relative flex space-x-3">
              <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <router-link
                    class="font-medium text-gray-900 text-sm"
                    v-bind:to="`/post/${$route.params.userId}/${post.id}`"
                  >
                    {{ post.id }} -
                    {{ post.title }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul v-else class="-mb-8">
        <li v-for="post in filteredPostDoing" :key="post.id">
          <div class="relative pb-8">
            <div class="relative flex space-x-3">
              <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <router-link
                    class="font-medium text-gray-900 text-sm"
                    v-bind:to="`/post/${$route.params.userId}/${post.id}`"
                  >
                    {{ post.id }} -
                    {{ post.title }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import usePostListStore from "@/stores/postList";
import useUserStore from "@/stores/user";
import { ClipboardIcon } from "@heroicons/vue/20/solid";

export default {
  name: "UserListFilteredPage",
  setup() {
    const postListStore = usePostListStore();
    const userStore = useUserStore();

    const tabs = [
      { name: "전체 게시글" },
      { name: "완료 게시글" },
      { name: "작성 중 게시글" },
    ];

    return {
      postListStore,
      userStore,
      tabs,
    };
  },
  mounted() {
    this.getUser();
    this.getData();
    this.filterData();
    this.setDefault();
  },
  data() {
    return {
      isError: false,
      filteredPosts: [],
      filteredPostComplete: [],
      filteredPostDoing: [],
      posts: [],
      user: {},
      currentIndex: 0,
      icon: ClipboardIcon,
    };
  },
  methods: {
    getUser() {
      console.log(this.userStore.userList);
      for (let i = 0; i < this.userStore.userList.length; i++) {
        if (this.$route.params.userId == this.userStore.userList[i].id) {
          this.user = this.userStore.userList[i];
          this.userStore.currentSelectedUser = this.userStore.userList[i];
          break;
        }
      }
      console.log(this.user);
      console.log(this.user.id);
    },
    getData() {
      this.posts = this.postListStore.postList;
    },
    filterData() {
      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i].userId == this.$route.params.userId) {
          this.filteredPosts.push(this.posts[i]);
          if (this.posts[i].completed) {
            this.filteredPostComplete.push(this.posts[i]);
          } else {
            this.filteredPostDoing.push(this.posts[i]);
          }
        }
      }
    },
    onClickButton(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.postListStore.currentSelectedList = this.filteredPosts;
          break;
        case 1:
          this.postListStore.currentSelectedList = this.filteredPostComplete;
          break;
        case 2:
          this.postListStore.currentSelectedList = this.filteredPostDoing;
          break;
        default:
          break;
      }
    },
    setDefault() {
      this.onClickButton(0);
    },
  },
};
</script>
