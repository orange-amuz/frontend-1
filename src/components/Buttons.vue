<template>
  <div>
    <span class="isolate inline-flex rounded-md shadow-sm">
      <button
        v-if="prefix != 0"
        @click="onClickPrefix"
        type="button"
        class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        이전 {{ prefix }}
      </button>
      <button
        v-if="unit != 0"
        @click="onClickUnit"
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
</template>

<script>
export default {
  name: "MyButtons",
  props: {
    userId: {
      required: true,
      type: String,
      default: "",
    },
    prefix: {
      required: true,
      type: Number,
      default: 0,
    },
    unit: {
      required: true,
      type: Number,
      default: 0,
    },
  },
  methods: {
    onClickPrefix() {
      this.$router.push({
        name: "PostDetailPage",
        params: { userId: this.userId, id: this.prefix },
      });
    },
    onClickUnit() {
      this.$router.push({
        name: "PostDetailPage",
        params: { userId: this.userId, id: this.unit },
      });
    },
    onClickReturn() {
      this.$router.push({
        name: "UserListFiltered",
        params: { userId: this.userId },
      });
    },
  },
};
</script>
