<template>
  <a-switch
    checkedChildren="启用"
    unCheckedChildren="禁用"
    :disabled="disabled"
    :checked="!!status"
    @change="change"
  />
</template>

<script>
export default {
  props: {
    status: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    change(e) {
      this.$emit('change', e);
    },
  },
};
</script>

<style></style>
