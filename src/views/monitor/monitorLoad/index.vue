<template>
  <page-layout>
    <a-card>
      <a-table :pagination="false" rowKey="id" :dataSource="list" :columns="columns">
        <template #type="text">{{ERROR_TYPES[text] || '未知错误'}}</template>
        <template #tooltip="text">
          <a-tooltip>
            <template v-if="text.length > 40" slot="title">{{text}}</template>
            <span class="pointer">{{text.length > 40 ? `${text.slice(0, 40)}...` : text}}</span>
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

      <my-pagination :total="total" :payload="payload" />
    </a-card>
  </page-layout>
</template>

<script>
import { mapState } from 'vuex';
import * as Api from '@/api/monitor';
import { ERROR_TYPES } from '@/constants/monitor';

const columns = [
  { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' } },
  { title: '资源', dataIndex: 'brief', scopedSlots: { customRender: 'tooltip' } },
  { title: '次数', dataIndex: 'total', scopedSlots: { customRender: 'tooltip' } },
  { title: '时间', dataIndex: 'create_time', scopedSlots: { customRender: 'create_time' } },
  { title: '来源', dataIndex: 'from', scopedSlots: { customRender: 'from' } },
];

export default {
  data() {
    return {
      columns,
      list: [],
      total: 0,
      ERROR_TYPES,
      payload: this.getPayload(),
    };
  },
  computed: {
    ...mapState({
      pid: (state) => state.user.user.pid,
    }),
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const { page, per_page, type = '' } = this.payload;
      const { list = [], total = 0 } = await Api.loaderrors({
        page,
        size: per_page,
        type,
        pid: this.pid,
      });
      this.list = list;
      this.total = total;
    },
  },
};
</script>

<style>
</style>