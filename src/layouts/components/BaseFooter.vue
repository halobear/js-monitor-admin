<template>
  <div class="base-footer">
    <copyright />
  </div>
</template>

<script>
import Copyright from './Copyright';

export default {
  components: {
    Copyright
  }
};
</script>

<style lang="less" scoped>
.base-footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}
</style>