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
            <pie-chart :data="pieChartData" />
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :xl="9" style="margin-bottom: 20px">
        <a-card title="运行错误" extra="近10天" class="chart-card" :loading="!isLoad">
          <div class="chart">
            <line-chart :data="jsErrorDatas" />
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :xl="9" style="margin-bottom: 20px">
        <a-card title="资源错误" extra="近10天" class="chart-card" :loading="!isLoad">
          <div class="chart">
            <line-chart :data="assetErrorDatas" color="#FACC14" />
          </div>
        </a-card>
      </a-col>
    </a-row>
  </page-layout>
</template>

<script>
import { mapState } from 'vuex';
import { ERROR_TYPES } from '@/constants/monitor';

import PieChart from './PieChart';
import LineChart from './LineChart';

export default {
  components: {
    PieChart,
    LineChart,
  },
  computed: {
    ...mapState({
      statistics: (state) => state.monitor.statistics,
      user: (state) => state.user.user,
    }),
    assetErrorDatas() {
      return [...(this.statistics.assetErrorDatas || [])].reverse().map((item) => ({
        ...item,
        总数: item.total,
      }));
    },
    jsErrorDatas() {
      return [...(this.statistics.jsErrorDatas || [])].reverse().map((item) => ({
        ...item,
        总数: item.total,
      }));
    },
    isLoad() {
      return !!this.statistics.start_time;
    },
    pieChartData() {
      const { typesTotal = [] } = this.statistics;
      if (!typesTotal.length) {
        return Object.values(ERROR_TYPES).map((type) => ({
          type,
          total: 0,
        }));
      }
      return typesTotal.map((item) => ({
        type: ERROR_TYPES[item.type] || '未知',
        total: item.total,
      }));
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.dispatch('fetchMonitorStatistics', this.user.pid);
    },
  },
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