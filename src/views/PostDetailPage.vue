<template>
  <div class="p-10">
    <h3 class="text-lg font-medium leading-6 text-gray-900">
      <!-- 글쓴이 : {{ userStore.currentSelectedUser.name }} -->
    </h3>
    <h3 class="text-lg font-medium leading-6 text-gray-900">
      게시글 번호 : {{ post.id }}
    </h3>
    <h3 class="mt-2 max-w-4xl text-sm text-gray-500">
      {{ post.title }}
    </h3>
    <p class="mt-2 max-w-4xl text-sm text-gray-500"></p>
    <h3 class="text-lg font-medium leading-6 text-gray-900">
      게시글 완성 여부 : {{ post.completed }}
    </h3>
    <div v-if="!isLoadingDone">댓글 로딩중...</div>
    <div v-else>
      <div v-if="isError">에러 발생</div>
      <div v-else>
        <div v-if="comments.length != 0" class="pt-3">
          <h3>댓글 수 {{ comments.length }}개</h3>
          <div class="my-6 flow-root">
            <ul role="list" class="-my-5 divide-y divide-gray-200">
              <li
                v-for="(comment, index) in comments"
                :key="index"
                class="py-4"
              >
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                    <h3 class="h-8 w-8 rounded-full">img</h3>
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-medium text-gray-900">
                      {{ comment.name }}
                    </p>
                    <p class="truncate text-sm text-gray-500">
                      {{ comment.email }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-4 pl-10 pr-10 pt-2">
                  <div class="min-w-0 flex-1">
                    <form action="#" class="relative">
                      <div
                        class="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
                      >
                        <label for="comment" class="sr-only"
                          >Add your comment</label
                        >
                        <div
                          class="block w-full resize-none border-0 px-8 py-3 focus:ring-0 sm:text-sm"
                        >
                          {{ comment.body }}
                        </div>
                        <!-- Spacer element to match the height of the toolbar -->
                        <div class="py-2" aria-hidden="true">
                          <!-- Matches height of button in toolbar (1px border + 36px content height) -->
                          <div class="py-px">
                            <div class="h-9" />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <h3 v-else class="pt-3">댓글이 없습니다.</h3>
        <my-buttons
          :prefix="prefix"
          :unit="unit"
          :userId="$route.params.userId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useCommentStore from "@/stores/comment";
import usePostListStore from "@/stores/postList";
import useUserStore from "@/stores/user";
import axios from "axios";
import MyButtons from "../components/Buttons.vue";

export default {
  name: "PostDetailPage",
  components: {
    MyButtons,
  },
  setup() {
    const userStore = useUserStore();
    const postListStore = usePostListStore();
    const commentStore = useCommentStore();

    return {
      userStore,
      postListStore,
      commentStore,
    };
  },
  mounted() {
    this.setData();
    this.getComments();
  },
  updated() {
    this.setData();
    this.getComments();
  },
  data() {
    return {
      post: [],
      comments: [],
      isError: false,
      isLoadingDone: false,
      prefix: 0,
      unit: 0,
    };
  },
  methods: {
    getComments() {
      if (this.commentStore.currentPostNum != this.$route.params.id) {
        this.isLoadingDone = false;

        axios
          .get(
            "https://jsonplaceholder.typicode.com/comments?postId=" +
              this.$route.params.id
          )
          .then((response) => {
            this.commentStore.currentPostNum = this.$route.params.id;
            this.commentStore.comments = response.data;
            this.comments = response.data;

            this.isLoadingDone = true;
          })
          .catch((error) => {
            this.isLoadingDone = true;
            this.isError = true;
            console.log(error);
          });
      } else {
        this.comments = this.commentStore.comments;

        this.isLoadingDone = true;
      }
    },
    setData() {
      this.postListStore.currentSelectedPost = this.$route.params.id;

      const tempList = this.postListStore.currentSelectedList;
      if (tempList == null) {
        // this.isLoadingDone = true;
        this.$router.push({
          name: "UserListFiltered",
          params: { userId: this.$route.params.id },
        });
        return;
      }

      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i].id == this.postListStore.currentSelectedPost) {
          this.prefix = tempList[i - 1]?.id;
          this.unit = tempList[i + 1]?.id;
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
