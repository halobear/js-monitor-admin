<template>
  <page-layout title="飞熊CRM">
    <!-- <a-card>
      <h2 class="title">飞熊CRM</h2>
      <p></p>
    </a-card>-->
  </page-layout>
</template>

<script>
export default {
  mounted() {
    this.$router.push({
      name: "monitor"
    })
  }
};
</script>

<style lang="less" scoped>
.title {
  padding-bottom: 20px;
}
</style>