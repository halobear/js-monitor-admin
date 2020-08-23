<template>
  <div class="projects">
    <global-header class="headers" />
    <a-card class="project-container" title="项目列表">
      <a-table :dataSource="projects" :columns="columns" rowKey="id">
        <template #todayError="text">
          <span v-if="text" class="red">{{text}}</span>
          <span v-else class="gray">{{text}}</span>
        </template>
        <template #time="text">
          {{text}}
          <span class="lable">ms</span>
        </template>
        <template #action="text,row">
          <div class="action-box">
            <span
              :class="{primary: user.pid === row.pid}"
              @click="choose(row.pid)"
            >查看</span>
            <span class="danger" @click="remove(row.pid)">删除</span>
          </div>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GlobalHeader from '@/layouts/components/GlobalHeader';
import * as Api from '@/api/monitor';

const columns = [
  { title: '序号', dataIndex: 'id' },
  { title: '项目名称', dataIndex: 'pid' },
  {
    title: '白屏时间',
    dataIndex: 'white_time',
    scopedSlots: { customRender: 'time' },
  },
  {
    title: '加载时间',
    dataIndex: 'load_time',
    scopedSlots: { customRender: 'time' },
  },
  { title: '所有错误', dataIndex: 'error' },
  {
    title: '今日错误',
    dataIndex: 'todayError',
    scopedSlots: { customRender: 'todayError' },
  },
  { title: '操作', scopedSlots: { customRender: 'action' } },
];

export default {
  components: {
    GlobalHeader,
  },
  data() {
    return {
      columns,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      projects: (state) => state.monitor.projects,
    }),
  },
  methods: {
    toHome() {
      this.$router.push({
        name: 'home',
      });
    },
    choose(pid) {
      const user = { ...this.user };
      user.pid = pid;
      this.$store.commit('SET_USER', { user });
      this.$nextTick(() => {
        this.$router.push({
          name: 'monitor',
        });
      });
    },
    remove(pid) {
      this.$confirm({
        title: '请确认',
        content: '删除后将无法恢复',
        onOk: async () => {
          await Api.removeProjects(pid);
          this.$message.success('删除成功');
          const projects = this.projects.filter((item) => item.pid !== pid);
          this.$store.commit('SET_MONITOR', { projects });
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.projects {
  min-height: 100vh;
  background-color: #f0f2f5;
  overflow: hidden;
}
.headers {
  background-color: #fff;
  padding: 0 20px !important;
  & /deep/ .trigger {
    opacity: 0;
  }
}
.project-container {
  max-width: 90%;
  width: 800px;
  margin: 20px auto;
}
.item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.gray {
  color: #999;
}
.red {
  color: #f5222d;
}
.lable {
  color: #999;
  font-size: 12px;
}
</style>