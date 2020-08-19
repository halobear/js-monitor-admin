<template>
  <transition name="showHeader">
    <a-layout-header class="ant-header-side-closed" :style="{ padding: '0' }">
      <div class="header">
        <div class="flex1">
          <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle" />
        </div>
        <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial">
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
    </a-layout-header>
  </transition>
</template>

<script>
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
      visible: true,
      oldScrollTop: 0,
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle');
    },
    logout() {
      this.$store.dispatch('logout');
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
</style>
