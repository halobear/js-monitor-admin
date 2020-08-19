<template>
  <div class="page-header">
    <div class="page-header-wide">
      <div class="breadcrumb">
        <a-breadcrumb>
          <a-breadcrumb-item :key="item.path" v-for="(item, i) in breadList">
            <span
              v-if="item.meta.disabledBreadcrumb || breadList.length -1 === i"
            >{{item.meta.title || item.name}}</span>
            <router-link v-else :to="{path: item.path}">{{item.meta.title || item.name}}</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="detail">
        <div v-if="avatar" class="avatar">
          <a-avatar :src="avatar" />
        </div>
        <div class="main">
          <div class="row">
            <img v-if="logo" :src="logo" class="logo" />
            <div class="middle-flex title-wrap">
              <h1 v-if="titleText" class="title">{{ titleText }}</h1>
              <slot name="subtitle"></slot>
            </div>
            <div class="action">
              <slot name="action"></slot>
            </div>
          </div>
          <div class="row">
            <div v-if="content" class="content">
              <slot name="content"></slot>
            </div>
            <div v-if="$slots.extra" class="extra">
              <slot name="extra"></slot>
            </div>
          </div>
          <a-tabs
            v-if="tabs.length"
            type="card"
            :default-active-key="tab"
            @change="$emit('change', $event)"
          >
            <a-tab-pane v-for="item in tabs" :key="item.key" :tab="item.name"></a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: false,
    },
    breadcrumb: {
      type: Array,
      default: () => [],
    },
    logo: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    tab: {
      type: String,
      default: '',
    },
  },
  computed: {
    content() {
      return (this.$slots.content && this.$slots.content.length) || 0;
    },
    titleText() {
      return this.title || this.$route.meta.title;
    },
    breadList() {
      return this.breadcrumb.filter((item) => item.path && !item.meta.hideBreadcrumb);
    },
  },
};
</script>

<style lang="less">
.page-header {
  .ant-tabs-bar {
    border-bottom: 0;
    margin-bottom: 0;
    margin-top: 12px;
  }
  .ant-tabs-tab-active {
    font-weight: 600;
  }
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    margin-right: 10px;
  }
}
</style>

<style lang="less" scoped>
.page-header {
  background: #fff;
  padding: 16px 32px 0;
  border-bottom: 1px solid #e8e8e8;
  .page-header-wide {
    &.head {
      margin: auto;
      max-width: 1400px;
    }
    .breadcrumb {
      margin-bottom: 16px;
    }
    .detail {
      display: flex;
      .row {
        display: flex;
        width: 100%;
      }
      .avatar {
        flex: 0 1 72px;
        margin: 0 24px 8px 0;
        & > span {
          border-radius: 72px;
          display: block;
          width: 72px;
          height: 72px;
        }
      }
      .main {
        width: 100%;
        flex: 0 1 auto;
        .title-wrap {
          flex: auto;
          margin-bottom: 12px;
        }
        .title {
          font-size: 20px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.85);
          padding-right: 10px;
        }
        .logo {
          width: 28px;
          height: 28px;
          border-radius: 4px;
        }
        .content {
          margin-bottom: 16px;
          flex: auto;
        }
        .extra {
          flex: 0 1 auto;
          margin-left: 88px;
          min-width: 242px;
          text-align: right;
        }
        .action {
          margin-left: 56px;
          min-width: 266px;
          flex: 0 1 auto;
          text-align: right;
        }
      }
    }
  }
}
</style>
