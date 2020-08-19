<template>
  <a-pagination
    class="pagination"
    :pageSizeOptions="pageSizeOptions"
    :total="total"
    showSizeChanger
    :showQuickJumper="true"
    :pageSize="per_page"
    :showTotal="showTotal"
    v-model="payload.page"
    @showSizeChange="onShowSizeChange"
    @change="changeCurrent"
  >
    <template slot="buildOptionText" slot-scope="props">
      <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
    </template>
  </a-pagination>
</template>
<script>
export default {
  props: {
    payload: {
      type: Object,
      default: () => ({
        page: 1,
        per_page: 12
      })
    },
    pageSizeOptions: {
      type: Array,
      default: () => ['12', '20', '30', '40', '50']
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      per_page: this.payload.per_page
    }
  },
  methods: {
    onShowSizeChange(current, pageSize) {
      this.per_page = pageSize
      const payload = {
        page: current,
        per_page: pageSize
      }
      this.$parent.saveParams(payload)
    },
    changeCurrent(page) {
      const payload = {
        page
      }
      this.$parent.saveParams(payload)
      this.$emit('change', {
        ...this.payload,
        page
      })
    },
    showTotal(total) {
      const { page, per_page } = this.payload
      return `共${total}条记录 第${page}/${Math.ceil(this.total / per_page)}页`
    }
  }
}
</script>

<style lang="less">
.pagination {
  padding-top: 10px;
  width: 100%;
  display: flex;
  .ant-pagination-total-text {
    flex: 1;
    text-align: left;
  }
}
</style>
