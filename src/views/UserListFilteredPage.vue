<template>
  <div v-if="isError">에러 발생</div>
  <div v-else>
    <h1>{{ $route.params.userId }}</h1>
    <ul>
      <li>
        <button v-on:click="onClickButton(0, filteredPostIds)">전체</button>
      </li>
      <li>
        <button v-on:click="onClickButton(1, filteredPostIdComplete)">
          완료
        </button>
      </li>
      <li>
        <button v-on:click="onClickButton(2, filteredPostIdDoing)">
          작성 중
        </button>
      </li>
    </ul>
    <ul v-if="this.currentIndex == 0">
      <li v-for="(id, i) in filteredPostIds" v-bind:key="i">
        <router-link
          v-bind:to="{
            name: 'PostDetailPage',
            params: { userId: $route.params.userId, id: id },
          }"
        >
          {{ id }}
        </router-link>
      </li>
    </ul>
    <ul v-else-if="this.currentIndex == 1">
      <li v-for="(id, i) in filteredPostIdComplete" v-bind:key="i">
        <router-link v-bind:to="`/post/${$route.params.userId}/${id}`">
          {{ id }}
        </router-link>
      </li>
    </ul>
    <ul v-else>
      <li v-for="(id, i) in filteredPostIdDoing" v-bind:key="i">
        <router-link v-bind:to="`/post/${$route.params.userId}/${id}`">
          {{ id }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import usePostListStore from "@/stores/postList";

export default {
  name: "UserListFilteredPage",
  setup() {
    const postListStore = usePostListStore();

    return {
      postListStore,
    };
  },
  mounted() {
    this.getData();
    this.filterData();
    this.setDefault();
  },
  data() {
    return {
      isError: false,
      filteredPostIds: [],
      filteredPostIdComplete: [],
      filteredPostIdDoing: [],
      posts: [],
      currentIndex: 0,
    };
  },
  methods: {
    getData() {
      this.posts = this.postListStore.postList;
    },
    filterData() {
      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i].userId == this.$route.params.userId) {
          this.filteredPostIds.push(this.posts[i].id);
          if (this.posts[i].completed) {
            this.filteredPostIdComplete.push(this.posts[i].id);
          } else {
            this.filteredPostIdDoing.push(this.posts[i].id);
          }
        }
      }
    },
    onClickButton(index, postIdList) {
      this.currentIndex = index;
      this.postListStore.currentSelectedList = postIdList;
    },
    setDefault() {
      this.onClickButton(0, this.filteredPostIds);
    },
  },
};
</script>
