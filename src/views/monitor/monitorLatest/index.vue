<template>
  <div>
    <a-card style="margin-bottom: 18px;" v-if="payload.uid">
      <a-tag closable @close="changeUser('')">{{payload.uid}}</a-tag>
    </a-card>
    <a-card>
      <a-table
        :pagination="false"
        rowKey="id"
        :dataSource="list"
        :columns="columns"
      >
        <template #tooltip="text">
          <a-tooltip>
            <template v-if="text.length > 40" slot="title">{{text}}</template>
            <span
              class="pointer"
            >{{text.length > 40 ? `${text.slice(0, 40)}...` : text}}</span>
          </a-tooltip>
        </template>
        <template #uid="text">
          <span v-if="payload.uid === text">{{text}}</span>
          <div v-else class="action-box">
            <span class="primary normal" @click="changeUser(text)">{{text}}</span>
          </div>
        </template>
        <template #type="text">{{ERROR_TYPES[text] || '未知错误'}}</template>
        <template #create_time="text">{{text | timeAgo}}</template>
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
      </a-table>

      <my-pagination
        :total="total"
        :payload="{per_page: payload.size, page: payload.page}"
      />
    </a-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import * as Api from '@/api/monitor';
import { ERROR_TYPES } from '@/constants/monitor';

const columns = [
  {
    title: '错误',
    dataIndex: 'brief',
    scopedSlots: { customRender: 'tooltip' },
  },
  { title: '用户', dataIndex: 'uid', scopedSlots: { customRender: 'uid' } },
  { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' } },
  {
    title: '详情',
    dataIndex: 'stack',
    scopedSlots: { customRender: 'tooltip' },
  },
  {
    title: '时间',
    dataIndex: 'create_time',
    scopedSlots: { customRender: 'create_time' },
  },
  { title: '来源', dataIndex: 'from', scopedSlots: { customRender: 'from' } },
];

export default {
  data() {
    const { size = 12, page = 1, pid = '', uid = '' } = this.$route.query;
    return {
      ERROR_TYPES,
      total: 0,
      list: [],
      payload: {
        page: Number(page),
        size: Number(size),
        pid,
        uid,
      },
      columns,
    };
  },
  computed: {
    ...mapState({
      pid: (state) => state.user.user.pid,
      projects: (state) => state.monitor.projects,
    }),
    tabs() {
      return ['全部', ...this.projects].map((tab) => ({
        key: tab,
        tab,
      }));
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const { page, size, uid } = this.payload;
      const params = { page, size, pid: this.pid };
      if (uid) params.uid = uid;
      const { list = [], total = 0 } = await Api.all(params);
      this.list = list;
      this.total = total;
    },
    changeUser(uid = '') {
      this.payload.uid = uid;
      this.saveParams();
    },
    changeTab(pid) {
      this.payload.pid = pid;
      this.$router.replace({ query: { ...this.payload, page: 1 } });
    },
  },
};
</script>
