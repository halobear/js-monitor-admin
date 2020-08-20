<template>
  <ve-pie height="300px" :data="chartData" :settings="chartSettings"></ve-pie>
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
    return {
      chartSettings: {
        dimension: 'type',
        metrics: 'total',
      },
    };
  },
  computed: {
    chartData() {
      return {
        columns: ['type', 'total'],
        rows: this.data,
      };
    },
  },
};
</script>