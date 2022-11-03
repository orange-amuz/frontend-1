<template>
  <div>
    <button v-if="prefix != 0" @click="onClickPrefix">이전 {{ prefix }}</button>
    <button v-if="unit != 0" @click="onClickUnit">다음 {{ unit }}</button>
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
  },
};
</script>
