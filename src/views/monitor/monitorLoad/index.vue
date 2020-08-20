<template>
  <page-layout>
    <a-card>资源加载错误</a-card>
  </page-layout>
</template>

<script>
import * as Api from '@/api/monitor';
import { ERROR_TYPES } from '@/constants/monitor';

export default {
  data() {
    return {
      list: [],
      total: 0,
      ERROR_TYPES,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const { list = [], total = 0 } = await Api.loaderrors(this.payload);
      this.list = list;
      this.total = total;
    },
  },
};
</script>

<style>
</style>