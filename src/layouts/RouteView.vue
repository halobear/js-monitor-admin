<template>
  <keep-alive v-if="shouldAlive">
    <router-view :key="pid" />
  </keep-alive>
  <router-view v-else :key="pid" />
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    keepAlive: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState({
      pid: (state) => state.user.user.pid || 0,
    }),
    shouldAlive() {
      const { meta = {} } = this.$route;
      return !!(this.keepAlive || meta.keepAlive);
    },
  },
};
</script>

<style>
</style>