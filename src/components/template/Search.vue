<template>
  <a-card style="margin-bottom: 15px;">
    <a-form-model class="search-list" ref="form" :model="form">
      <a-form-model-item prop="phone" label="道具名称">
        <a-input placeholder="请输入关键词" v-model="form.phone"></a-input>
      </a-form-model-item>
      <a-form-model-item prop="code" label="隶属方案">
        <a-input placeholder="请输入关键词" v-model="form.code"></a-input>
      </a-form-model-item>
      <a-form-model-item prop="code" label="品类">
        <a-input placeholder="请选择" v-model="form.code"></a-input>
      </a-form-model-item>
      <a-form-model-item prop="code" label="区域">
        <a-input placeholder="请选择区域" v-model="form.code"></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="onSubmit">查询</a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">重置</a-button>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script>
// import * as Api from "@/api/storage";

export default {
  data() {
    return {
      form: {}
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      // const res = await Api.
    },
    onSubmit() {
      console.log(this.form);
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.search-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  & /deep/ .ant-form-item {
    display: flex;
    align-items: center;
    margin-right: 15px;
    margin-bottom: 0;
  }
  & /deep/ .ant-form-item-label {
    min-width: 40px;
    text-align: right;
  }
}
</style>