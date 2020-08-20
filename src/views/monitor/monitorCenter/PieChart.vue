<template>
  <ve-pie height="300px" :data="chartData" :settings="chartSettings"></ve-pie>
</template>

<script>
// import { ERROR_TYPES } from '@/constants/monitor';

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartSettings: {
        dimension: 'type',
        metrics: 'total',
      },
    };
  },
  computed: {
    chartData() {
      // const rows = this.data.map((item) => ({
      //   type: ERROR_TYPES[item.type],
      // }));
      return {
        columns: ['type', 'total'],
        rows: [
          { type: 'JS运行错误', total: 123, profit: 123 },
          { type: '图片加载错误', total: 1223, profit: 1223 },
          { type: 'script错误', total: 2123, profit: 2123 },
        ],
      };
    },
  },
};
</script>