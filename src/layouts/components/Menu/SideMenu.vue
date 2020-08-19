<template>
  <a-layout-sider
    width="186px"
    :class="['sider', 'theme']"
    :collapsible="collapsible"
    :trigger="null"
    v-model="collapsed"
  >
    <logo />
    <s-menu
      theme="light"
      :collapsed="collapsed"
      :menu="menus"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0px;"
    ></s-menu>
  </a-layout-sider>
</template>

<script>
import Logo from '../tools/Logo';
import SMenu from './index';
import { mixinDevice } from '@/utils/mixins';

export default {
  name: 'SideMenu',
  components: { Logo, SMenu },
  mixins: [mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline',
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false,
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
    menus: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj);
    },
    toggle() {
      this.$emit('toggle');
    },
  },
};
</script>