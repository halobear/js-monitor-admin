<template>
  <page-layout>
    <a-card>
      <a-table :pagination="false" rowKey="id" :dataSource="list" :columns="columns">
        <template #type="text">{{ERROR_TYPES[text] || '未知错误'}}</template>
        <template #tooltip="text">
          <a-tooltip>
            <template v-if="text.length" slot="title">{{text}}</template>
            <span class="pointer">{{text.length > 30 ? `${text.slice(0, 30)}...` : text}}</span>
          </a-tooltip>
        </template>
        <template #action="text,record">
          <div class="action-box">
            <span @click="remove(record)" class="danger">删除</span>
          </div>
        </template>
      </a-table>

      <my-pagination :total="total" :payload="{per_page: payload.size, page: payload.page}" />
    </a-card>
  </page-layout>
</template>

<script>
import * as Api from '@/api/monitor';
import { ERROR_TYPES } from '@/constants/monitor';

const columns = [
  { title: '项目', dataIndex: 'pid' },
  { title: '用户', dataIndex: 'uid' },
  { title: '错误类型', dataIndex: 'type', scopedSlots: { customRender: 'type' } },
  { title: '来源', dataIndex: 'from', scopedSlots: { customRender: 'tooltip' } },
  { title: '详情', dataIndex: 'stack', scopedSlots: { customRender: 'tooltip' } },
  { title: '时间', dataIndex: 'create_time' },
  { title: '操作', scopedSlots: { customRender: 'action' } },
];

export default {
  data() {
    const { size = 12, page = 1 } = this.$route.query;
    return {
      ERROR_TYPES,
      total: 0,
      list: [],
      payload: {
        page: Number(page),
        size: Number(size),
      },
      columns,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const { list = [], total = 0 } = await Api.all(this.payload);
      this.list = list;
      this.total = total;
    },
  },
};
</script>

<style>
</style>