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
        class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm sm:px-6 lg:px-8"
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
    <div class="hidden sm:block mx-auto max-w-7xl sm:px-6 lg:px-8">
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
    <div class="flow-root pt-3 px-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <ul v-if="currentIndex == 0" class="-mb-8">
        <li v-for="post in filteredPosts" :key="post.id">
          <div class="relative pb-8">
            <div class="relative flex space-x-3">
              <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <button
                    class="font-medium text-gray-900 text-sm"
                    @click="onClickLink(post.id)"
                  >
                    {{ post.id }} -
                    {{ post.title }}
                  </button>
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
                  <button
                    class="font-medium text-gray-900 text-sm"
                    @click="onClickLink(post.id)"
                  >
                    {{ post.id }} -
                    {{ post.title }}
                  </button>
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
                  <button
                    class="font-medium text-gray-900 text-sm"
                    @click="onClickLink(post.id)"
                  >
                    {{ post.id }} -
                    {{ post.title }}
                  </button>
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
import { ClipboardIcon } from "@heroicons/vue/20/solid";
import useFilteredPostListStore from "@/stores/filteredPostListStore";

export default {
  name: "UserListFilteredPage",
  setup() {
    const filteredPostListStore = useFilteredPostListStore();
    const tabs = [
      { name: "전체 게시글" },
      { name: "완료 게시글" },
      { name: "작성 중 게시글" },
    ];

    return {
      tabs,
      filteredPostListStore,
    };
  },
  mounted() {
    this.getUser();
    this.filterPost();
    this.setDefault();
  },
  data() {
    return {
      isError: false,
      filteredPosts: [],
      filteredPostComplete: [],
      filteredPostDoing: [],
      user: {},
      currentIndex: 0,
      icon: ClipboardIcon,
    };
  },
  methods: {
    getUser() {
      const users = this.$store.state.entities.user.data;

      for (let i = 1; i <= Object.keys(users).length; i++) {
        if (users[i].id == parseInt(this.$route.params.userId)) {
          this.user = users[i];
          break;
        }
      }

      this.filteredPostListStore.currentSelectedUser =
        this.$route.params.userId;
    },
    filterPost() {
      const posts = this.$store.state.entities.post.data;

      for (let i = 1; i <= Object.keys(posts).length; i++) {
        if (posts[i].userId == parseInt(this.$route.params.userId)) {
          this.filteredPosts.push(posts[i]);
          if (posts[i].completed) {
            this.filteredPostComplete.push(posts[i]);
          } else {
            this.filteredPostDoing.push(posts[i]);
          }
        }
      }
    },
    onClickButton(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.filteredPostListStore.currentSelectedList = this.filteredPosts;
          break;
        case 1:
          this.filteredPostListStore.currentSelectedList =
            this.filteredPostComplete;
          break;
        case 2:
          this.filteredPostListStore.currentSelectedList =
            this.filteredPostDoing;
          break;
        default:
          break;
      }
    },
    onClickLink(id) {
      // this.filteredPostListStore.currentSelectedUser = userId;
      this.filteredPostListStore.currentSelectedPost = id;
      this.$router.push({
        path: "/post",
      });
    },
    setDefault() {
      this.onClickButton(0);
    },
  },
};
</script>
