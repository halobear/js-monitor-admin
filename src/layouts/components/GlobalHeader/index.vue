<template>
  <transition name="showHeader">
    <a-layout-header class="ant-header-side-closed" :style="{ padding: '0' }">
      <h1 class="title" v-if="$route.name === 'projects' && tilte">{{tilte}}</h1>
      <div class="header">
        <div class="flex1">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="toggle"
          />
        </div>
        <div class="right-box">
          <div
            class="menu-icon"
            v-if="$route.name !== 'projects'"
            @click="toProject"
          >
            <a-icon type="menu"></a-icon>
          </div>
          <a-select
            v-if="projects.length"
            placeholder="选择项目"
            style="min-width: 150px;margin-right: 20px;"
            :value="user.pid"
            @change="changePid"
          >
            <a-select-option
              v-for="(item) in projects"
              :key="item.pid"
            >{{item.pid}}</a-select-option>
          </a-select>
          <a-dropdown
            style="display: inline-block; height: 100%; vertical-align: initial"
          >
            <span style="cursor: pointer">
              <a-avatar
                v-if="user.avatar"
                style="background-color: #eee"
                class="avatar"
                size="small"
                shape="circle"
                :src="user.avatar"
              />
              <span class="username">{{ user.nickname || user.username }}</span>
            </span>
            <a-menu style="width: 150px" slot="overlay">
              <a-menu-item>
                <div @click="logout" class="middle-flex">
                  <a-icon type="poweroff" />
                  <span style="padding-left: 5px">退出登录</span>
                </div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>
  </transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'GlobalHeader',
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu',
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
    device: {
      type: String,
      required: false,
      default: 'desktop',
    },
  },
  data() {
    return {
      tilte: process.env.VUE_APP_HOME_TITLE,
      visible: true,
      oldScrollTop: 0,
    };
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
    toProject() {
      if (this.$route.name === 'projects') return;
      this.$router.push({
        name: 'projects',
      });
    },
    toggle() {
      this.$emit('toggle');
    },
    logout() {
      this.$store.dispatch('logout');
    },
    changePid(pid) {
      const user = { ...this.user };
      user.pid = pid;
      this.$store.commit('SET_USER', { user });
      this.$bus.$emit('refresh');
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.username {
  padding-left: 0.2em;
}
.title {
  font-size: 18px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-weight: 600;
  vertical-align: middle;
  text-align: center;
  position: absolute;
  top: 0;
  left: 20px;
  height: 64px;
}
.menu-icon {
  padding: 10px;
  display: inline-block;
  cursor: pointer;
}
.right-box {
  height: 64px;
  display: flex;
  align-items: center;
}
</style>
