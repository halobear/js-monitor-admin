<template>
  <page-layout>
    <a-card>
      <a-table :pagination="false" rowKey="id" :dataSource="list" :columns="columns">
        <template #type="text">{{ERROR_TYPES[text] || '未知错误'}}</template>
        <template #tooltip="text">
          <a-tooltip>
            <template v-if="text.length > 45" slot="title">{{text}}</template>
            <span class="pointer">{{text.length > 45 ? `${text.slice(0, 45)}...` : text}}</span>
          </a-tooltip>
        </template>
        <template #from="text">
          <a-tooltip>
            <template v-if="text.length > 40" slot="title">{{text}}</template>
            <a
              :href="text"
              target="__blank"
              class="pointer"
            >{{text.length > 40 ? `${text.slice(0, 40)}...` : text}}</a>
          </a-tooltip>
        </template>
        <template #create_time="text">{{text | timeAgo}}</template>
      </a-table>

      <my-pagination :total="total" :payload="{per_page: payload.size, page: payload.page}" />
    </a-card>
  </page-layout>
</template>

<script>
import * as Api from '@/api/monitor';

import { ERROR_TYPES } from '@/constants/monitor';

const columns = [
  { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' } },
  { title: '错误', dataIndex: 'brief', scopedSlots: { customRender: 'tooltip' } },
  { title: '详情', dataIndex: 'stack', scopedSlots: { customRender: 'tooltip' } },
  { title: '次数', dataIndex: 'total', scopedSlots: { customRender: 'tooltip' } },
  { title: '时间', dataIndex: 'create_time', scopedSlots: { customRender: 'create_time' } },
  { title: '来源', dataIndex: 'from', scopedSlots: { customRender: 'from' } },
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
      const { list = [], total = 0 } = await Api.jserrors(this.payload);
      this.list = list;
      this.total = total;
    },
  },
};
</script>
