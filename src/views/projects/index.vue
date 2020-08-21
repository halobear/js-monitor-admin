<template>
  <div class="projects">
    <global-header class="headers" />
    <a-card class="project-container" title="项目列表">
      <a-empty description="没有项目" v-if="!projects.length" />
      <a-list bordered :data-source="projects">
        <template #renderItem="item">
          <a-list-item>
            <div class="item">
              <span>{{ item }}</span>
              <div class="action-box">
                <span :class="{primary: user.pid === item}" @click="choose(item)">查看</span>
              </div>
            </div>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GlobalHeader from '@/layouts/components/GlobalHeader';

export default {
  components: {
    GlobalHeader,
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      projects: (state) => state.monitor.projects,
    }),
  },
  mounted() {
    this.$store.dispatch('fetchProjects');
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
</style>