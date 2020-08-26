<template>
  <ve-line height="310px" :data="chartData" :settings="chartSettings"></ve-line>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    this.chartSettings = {
      area: true,
    };
    return {
      chartData: {
        columns: ['date', '加载时间', '白屏时间'],
        rows: this.data,
      },
    };
  },
};
</script>