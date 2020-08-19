<template>
  <keep-alive v-if="shouldAlive">
    <router-view />
  </keep-alive>
  <router-view v-else />
</template>

<script>
export default {
  props: {
    keepAlive: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    shouldAlive() {
      const { meta = {} } = this.$route;
      return !!(this.keepAlive || meta.keepAlive);
    }
  }
};
</script>

<style>
</style>