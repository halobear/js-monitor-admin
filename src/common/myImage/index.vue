<template>
  <img
    class="img"
    ref="img"
    v-if="src"
    :src="src"
    :style="{width, height}"
    v-bind="$attrs"
    v-on="$listeners"
    @click="preview"
  >
  <span v-else>无</span>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '60px'
    },
    height: {
      type: String,
      default: '60px'
    }
  },
  methods: {
    preview() {
      const { src } = this.$refs.img
      if (!src) return
      this.$preview(src)
    }
  }
}
</script>

<style lang="less" scoped>
.img {
  object-fit: cover;
  object-position: center center;
}
</style>
