<template>
  <ve-line height="310px" :data="chartData" :settings="chartSettings" :colors="colors"></ve-line>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    color: {
      type: String,
      default: '#F04864', // '#E6965C'
    },
  },
  data() {
    this.chartSettings = {
      area: true,
    };
    return {
      colors: [this.color],
      chartData: {
        columns: ['date', '总数'],
        rows: this.data,
      },
    };
  },
};
</script>