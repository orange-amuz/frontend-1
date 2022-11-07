<template>
  <div v-if="isLoadingDone" class="p-10">
    <h3 class="text-lg font-medium leading-6 text-gray-900"></h3>
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
    <div v-if="commentLength != 0" class="pt-3">
      <h3>댓글 수 {{ commentLength }}개</h3>
      <div class="my-6 flow-root">
        <ul role="list" class="-my-5 divide-y divide-gray-200">
          <li
            v-for="(comment, index) in post.comment"
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
              <div class="flex">
                <div v-if="comment.email == user.email">
                  <button
                    v-if="comment.isEditing"
                    class="mr-2 inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                    @click="updateComment(comment)"
                  >
                    저장
                  </button>
                  <button
                    v-else
                    class="mr-2 inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                    @click="activeEditComment(comment)"
                  >
                    수정
                  </button>
                </div>
                <button
                  class="text-red-600 mr-10 inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                  @click="removeComment(comment)"
                >
                  삭제
                </button>
              </div>
            </div>
            <div class="flex items-start space-x-4 pl-10 pr-10 pt-2">
              <div class="min-w-0 flex-1">
                <div class="relative">
                  <div
                    class="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
                  >
                    <div v-if="comment.isEditing">
                      <form @submit.prevent="updateComment(comment)">
                        <input
                          class="block w-full resize-none border-0 px-8 py-3 focus:ring-0 sm:text-sm"
                          v-model="comment.body"
                        />
                      </form>
                    </div>
                    <div
                      v-else
                      class="block w-full resize-none border-0 px-8 py-3 focus:ring-0 sm:text-sm"
                    >
                      {{ comment.body }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <h3 v-else class="pt-3">댓글이 없습니다.</h3>
    <div class="py-4">
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <h3 class="h-8 w-8 rounded-full">img</h3>
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium text-gray-900">
            {{ user.name }}
          </p>
          <p class="truncate text-sm text-gray-500">
            {{ user.email }}
          </p>
        </div>
        <div>
          <div>
            <button
              class="mr-10 inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
              @click="saveComment"
            >
              저장
            </button>
          </div>
        </div>
      </div>
      <div class="flex items-start space-x-4 pl-10 pr-10 pt-2">
        <div class="min-w-0 flex-1">
          <form @submit.prevent="saveComment" class="relative">
            <div
              class="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
            >
              <label for="comment" class="sr-only">Add your comment</label>
              <input
                class="block w-full resize-none border-0 px-8 py-3 focus:ring-0 sm:text-sm"
                type="text"
                v-model="comment"
              />

              <div class="py-2" aria-hidden="true">
                <div class="py-px">
                  <div class="h-9" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div>
      <span class="isolate inline-flex rounded-md shadow-sm">
        <button
          v-if="prefix"
          @click="onClickButton(prefix)"
          type="button"
          class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          이전 {{ prefix }}
        </button>
        <button
          v-if="unit"
          @click="onClickButton(unit)"
          type="button"
          class="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          다음 {{ unit }}
        </button>
        <button
          @click="onClickReturn"
          type="button"
          class="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          목록으로
        </button>
      </span>
    </div>
  </div>
  <div v-else>
    <h3>로딩중...</h3>
  </div>
</template>

<script>
import useFilteredPostListStore from "@/stores/filteredPostListStore";
import Post from "@/models/PostModel";
import Comment from "@/models/CommentModel";
import User from "@/models/UserModel";

export default {
  name: "PostDetailPage",
  components: {},
  setup() {
    const filteredPostListStore = useFilteredPostListStore();

    return {
      filteredPostListStore,
    };
  },
  mounted() {
    this.setData();
    this.getPost();
    this.getUser();
    this.isLoadingDone = true;
  },
  updated() {},
  data() {
    return {
      post: {},
      user: {},
      isError: false,
      isLoadingDone: false,
      commentLength: 0,
      prefix: 0,
      unit: 0,
      count: 0,
      comment: "",
    };
  },
  methods: {
    setData() {
      // this.filteredPostListStore.currentSelectedPost = this.$route.params.id;

      const tempList = this.filteredPostListStore.currentSelectedList;

      if (tempList == null) {
        this.isLoadingDone = true;
        console.log("tempList is empty");
        this.$router.push({
          name: "UserList",
        });
        return;
      }

      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i].id == this.filteredPostListStore.currentSelectedPost) {
          this.prefix = tempList[i - 1]?.id;
          this.unit = tempList[i + 1]?.id;
        }
      }
    },
    getPost() {
      this.post = Post.query()
        .where("id", parseInt(this.filteredPostListStore.currentSelectedPost))
        .with("comment")
        .get()[0];

      this.commentLength = this.post.comment.length;
    },
    getUser() {
      this.user = User.query()
        .where("id", parseInt(this.filteredPostListStore.currentSelectedUser))
        .get()[0];
    },
    onClickButton(value) {
      this.filteredPostListStore.currentSelectedPost = value;
      this.prefix = 0;
      this.unit = 0;
      this.setData();
      this.getPost();
    },
    onClickReturn() {
      this.$router.push({
        name: "UserListFiltered",
        params: { userId: this.filteredPostListStore.currentSelectedUser },
      });
    },
    saveComment() {
      Comment.insert({
        data: {
          postId: this.post.id,
          id: this.commentLength + 1,
          name: this.user.name,
          email: this.user.email,
          body: this.comment,
        },
      });
      this.comment = "";
      this.getPost();
    },
    removeComment(comment) {
      Comment.delete([comment.postId, comment.id]);
      this.getPost();
    },
    activeEditComment(comment) {
      Comment.update({
        where: [comment.postId, comment.id],
        data: {
          isEditing: true,
        },
      });
      this.getPost();
    },
    updateComment(comment) {
      Comment.update({
        where: [comment.postId, comment.id],
        data: {
          body: comment.body,
          isEditing: false,
        },
      });
      this.getPost();
    },
  },
};
</script>
