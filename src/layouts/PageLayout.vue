<template>
  <div style="margin: -24px -24px 0px">
    <page-header
      :hideHeader="hideHeader"
      :breadcrumb="breadcrumb"
      :title="title"
      :logo="logo"
      :avatar="avatar"
      :tabs="tabs"
      :tab="tab"
      @change="$emit('change', $event)"
    >
      <slot name="subtitle" slot="subtitle"></slot>
      <slot name="action" slot="action"></slot>
      <slot
        v-if="$slots.content && $slots.content.length"
        slot="content"
        name="content"
      ></slot>
      <div slot="content" v-if="!$slots.content && desc">
        <p
          style="font-size: 14px;line-height: 1.5;color: rgba(0,0,0,.65)"
        >{{ desc }}</p>
      </div>
      <slot slot="extra" name="extra"></slot>
    </page-header>
    <div ref="page" class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader';

export default {
  name: 'PageLayout',
  components: { PageHeader },
  props: [
    'desc',
    'logo',
    'title',
    'avatar',
    'extraImage',
    'tabs',
    'tab',
    'hideHeader',
  ],
  data() {
    return {
      breadcrumb: [],
    };
  },
  mounted() {
    this.getBreadcrumb();
  },
  updated() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.breadcrumb = this.$route.matched;
    },
  },
};
</script>

<style lang="less" scoped>
.link {
  margin-top: 16px;
  line-height: 24px;
  a {
    font-size: 14px;
    margin-right: 32px;
    i {
      font-size: 22px;
      margin-right: 8px;
    }
  }
}
.page-content {
  margin: 12px 12px 0px;
}
</style>
