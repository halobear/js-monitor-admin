<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <side-menu
      mode="inline"
      :menus="menus"
      :collapsed="collapsed"
      :collapsible="true"
      @toggle="toggle"
    ></side-menu>

    <a-layout :style="{ minHeight: '100vh' }">
      <!-- layout header -->
      <global-header @toggle="toggle" />

      <!-- layout content -->
      <a-layout-content
        :style="{ height: '100%', position: 'relative', margin: '24px 24px 0', paddingTop:  '0' }"
        :key="pid"
      >
        <route-view :key="routerKey" />
      </a-layout-content>

      <!-- layout footer -->
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { triggerWindowResizeEvent } from '@/utils/util';
import { mapState } from 'vuex';
import { mixinDevice } from '@/utils/mixins';
import { convertRoutes } from '@/utils/routeConvert';

import SideMenu from './components/Menu/SideMenu';
import GlobalFooter from './components/BaseFooter';
import GlobalHeader from './components/GlobalHeader';
import RouteView from './RouteView';

export default {
  mixins: [mixinDevice],
  components: {
    RouteView,
    SideMenu,
    GlobalHeader,
    GlobalFooter,
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: (state) => state.permission.routers,
      collapsed: (state) => state.app.collapsed,
      pid: (state) => state.user.user.pid || 1,
    }),
    menus() {
      const routes = convertRoutes(this.mainMenu.find((item) => item.path === '/')) || {};
      const { children = [] } = routes;
      return children;
    },
    routerKey() {
      return this.$route.meta.key || this.$route.fullPath;
    },
  },
  methods: {
    toggle() {
      this.$store.dispatch('toggleSidebar', !this.collapsed);
      triggerWindowResizeEvent();
    },
  },
};
</script>
