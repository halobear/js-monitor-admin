<template>
  <a-button @click="startTimer" v-if="num === 60">获取验证码</a-button>
  <a-button v-else>{{num}}</a-button>
</template>

<script>
import { isPhone } from 'kuan-utils/lib/validate';
import { getCode } from '@/api/user';

export default {
  props: {
    phone: {
      type: [Number, String],
      default: '',
    },
  },
  data() {
    return {
      num: 60,
    };
  },
  beforeDestroy() {
    if (this.timer) clearTimeout(this.timer);
  },
  methods: {
    async startTimer() {
      if (this.num === 60) {
        if (isPhone(this.phone)) {
          await getCode({ phone: this.phone });
        } else {
          this.$message.warning('请输入正确的手机号码');
          return;
        }
      }
      if (this.num <= 0) {
        return (this.num = 60);
      }
      this.num -= 1;
      this.timer = setTimeout(() => {
        this.startTimer();
      }, 1000);
    },
  },
};
</script>

<style>
</style>
