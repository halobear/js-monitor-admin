<template>
  <a-tooltip>
    <template slot="title">
      <span>{{status ? `${texts[1]}状态` : `${texts[0]}状态`}}</span>
    </template>
    <span
      @click="$emit('click')"
      :class="{success: !status, danger: status}"
    >{{status ? texts[0] : texts[1]}}</span>
  </a-tooltip>
</template>

<script>
export default {
  props: {
    status: {
      type: Number,
      default: 0
    },
    texts: {
      type: Array,
      default: () => ["停用", "开启"]
    }
  }
};
</script>

<style>
</style>
