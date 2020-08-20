<template>
  <page-layout>
    <a-card title="数据统计" style="margin-bottom: 20px">
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic class="item" title="运行错误(今日)" :value="112893" />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic class="item" title="资源错误(今日)" :value="112893" />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic class="item" title="运行错误(总数)" :value="112893" />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic class="item" title="资源错误(总数)" :value="112893" />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic class="item" title="影响人数(今日)" :value="112893" />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic class="item" title="影响页面(今日)" :value="112893" />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic class="item" title="影响人数(总数)" :value="112893" />
      </a-card-grid>
      <a-card-grid style="width:25%;text-align:center">
        <a-statistic class="item" title="影响页面(总数)" :value="112893" />
      </a-card-grid>
    </a-card>
    <a-row :gutter="12">
      <a-col :md="24" :xl="6" style="margin-bottom: 20px">
        <a-card title="扇形图" extra="今日">
          <div class="chart">
            <a-statistic class="item" title="运行错误(今日)" :value="112893" />
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :xl="9" style="margin-bottom: 20px">
        <a-card title="运行错误" extra="近10天">
          <div class="chart">
            <a-statistic class="item" title="资源错误(今日)" :value="112893" />
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :xl="9" style="margin-bottom: 20px">
        <a-card title="资源错误" extra="近10天">
          <div class="chart">
            <a-statistic class="item" title="运行错误(今日)" :value="112893" />
          </div>
        </a-card>
      </a-col>
    </a-row>
  </page-layout>
</template>

<script>
export default {
  components: {},
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
.chart {
  height: 250px;
}
</style>