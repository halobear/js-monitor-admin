<template>
  <ve-line height="310px" :data="chartData" :settings="chartSettings"></ve-line>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      stack: { sell: ['cost', 'profit'] },
      area: true,
    };
    return {
      chartData: {
        columns: ['date', 'cost', 'profit', 'growthRate', 'people'],
        rows: [
          { date: '01/01', cost: 1523, profit: 1523, growthRate: 0.12, people: 100 },
          { date: '01/02', cost: 1223, profit: 1523, growthRate: 0.345, people: 100 },
          { date: '01/03', cost: 2123, profit: 1523, growthRate: 0.7, people: 100 },
          { date: '01/04', cost: 4123, profit: 1523, growthRate: 0.31, people: 100 },
          { date: '01/05', cost: 3123, profit: 1523, growthRate: 0.12, people: 100 },
          { date: '01/06', cost: 7123, profit: 1523, growthRate: 0.65, people: 100 },
        ],
      },
    };
  },
};
</script>