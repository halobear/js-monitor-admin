<template>
  <page-layout>
    <a-card
      title="数据统计"
      style="margin-bottom: 20px"
      :extra="statistics.start_time ? `${statistics.start_time} - ${statistics.end_time}` : ''"
      :loading="!isLoad"
    >
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic class="item" title="运行错误(今日)" :value="statistics.jsErrorTodayTotal" />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic class="item" title="资源错误(今日)" :value="statistics.assetErrorTodayTotal" />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic class="item" title="影响人数(今日)" :value="statistics.personEffetTodayTotal" />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic class="item" title="影响页面(今日)" :value="statistics.fromTodayTotal" />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic class="item" title="运行错误(总数)" :value="statistics.jsErrorTotal" />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic class="item" title="资源错误(总数)" :value="statistics.assetErrorTotal" />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic class="item" title="影响人数(总数)" :value="statistics.personEffetTotal" />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic class="item" title="影响页面(总数)" :value="statistics.fromTotal" />
      </a-card-grid>
    </a-card>
    <a-row :gutter="12">
      <a-col :md="24" :xl="6" style="margin-bottom: 20px">
        <a-card title="扇形图" extra="今日" class="chart-card" :loading="!isLoad">
          <div class="chart">
            <pie-chart />
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :xl="9" style="margin-bottom: 20px">
        <a-card title="运行错误" extra="近10天" class="chart-card" :loading="!isLoad">
          <div class="chart">
            <line-chart />
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :xl="9" style="margin-bottom: 20px">
        <a-card title="资源错误" extra="近10天" class="chart-card" :loading="!isLoad">
          <div class="chart">
            <line-chart />
          </div>
        </a-card>
      </a-col>
    </a-row>
  </page-layout>
</template>

<script>
import { mapState } from 'vuex';
import PieChart from './PieChart';
import LineChart from './LineChart';

export default {
  components: {
    PieChart,
    LineChart,
  },
  data() {
    return {
      isLoad: false,
    };
  },
  computed: {
    ...mapState({
      statistics: (state) => state.monitor.statistics,
    }),
  },
  async mounted() {
    await this.$store.dispatch('fetchMonitorStatistics');
    this.isLoad = true;
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  align-items: center;
  min-height: 100px;
  .item {
    margin-right: 12px;
    flex: 1;
    text-align: center;
    &:only-child {
      margin-right: 0;
    }
  }
}
.chart-card {
  & /deep/ .ant-card-body {
    padding: 12px;
  }
  & /deep/ .chart {
    height: 310px;
    position: relative;
  }
}
</style>