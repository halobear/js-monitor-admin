<template>
  <page-layout hideHeader :tabs="tabs" :tab="$route.name" @change="change">
    <router-view />
  </page-layout>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { key: 'monitorLatest', name: '实时监控' },
        { key: 'monitorJS', name: '运行错误' },
        { key: 'monitorLoad', name: '资源错误' },
      ],
    };
  },
  methods: {
    change(name) {
      if (this.$route.name === name) return;
      this.$router.push({ name });
    },
  },
};
</script>

<style>
</style>