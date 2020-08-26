<template>
  <page-layout>
    <a-card title="性能监控">
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic
          suffix="ms"
          class="item"
          title="加载时间(今日)"
          :value="todayPerformance.load_time"
        />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic
          suffix="ms"
          class="item"
          title="白屏时间(今日)"
          :value="todayPerformance.white_time"
        />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic
          suffix="ms"
          class="item"
          title="sdn查询(今日)"
          :value="todayPerformance.dns_query_time"
        />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic
          suffix="ms"
          class="item"
          title="tcp连接(今日)"
          :value="todayPerformance.tcp_time"
        />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic
          suffix="ms"
          class="item"
          title="加载时间(平均)"
          :value="totalPerformance.load_time"
        />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic
          suffix="ms"
          class="item"
          title="白屏时间(平均)"
          :value="totalPerformance.white_time"
        />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic
          class="item"
          title="sdn查询(平均)"
          :value="totalPerformance.dns_query_time"
        />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic
          class="item"
          suffix="ms"
          title="tcp连接(平均)"
          :value="totalPerformance.tcp_time"
        />
      </a-card-grid>
    </a-card>

    <a-card style="margin-top: 12px" :loading="!performance.length">
      <line-chart :data="performance" style="height: 310px" />
    </a-card>
  </page-layout>
</template>

<script>
import { mapState } from 'vuex';
import LineChart from './LineChart';

export default {
  components: {
    LineChart,
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      performance: (state) => state.monitor.performance,
      todayPerformance: (state) => state.monitor.todayPerformance,
      totalPerformance: (state) => state.monitor.totalPerformance,
    }),
  },
  mounted() {
    this.$store.dispatch('fetchPerList', this.user.pid);
    this.$store.dispatch('fetchPerStatistics', this.user.pid);
  },
};
</script>

<style>
</style>