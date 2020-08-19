<template>
  <div class="login-container">
    <ul class="circles">
      <li v-for="n in 10" :key="n"></li>
    </ul>
    <div class="login-wrap">
      <div class="title">{{title}}</div>
      <a-form-model class="form-model" ref="form" :model="form" :rules="rules">
        <a-form-model-item prop="username">
          <a-input size="large" placeholder="请输入账号" v-model="form.username">
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
          <div class="middle-flex">
            <a-input size="large" placeholder="请输入密码" v-model="form.password">
              <a-icon slot="prefix" type="lock" />
            </a-input>
            <!-- <code-button
              :phone="form.phone ||'' "
              style="min-width: 110px;height: 39px;margin-left: 15px;"
            />-->
          </div>
        </a-form-model-item>
        <a-form-model-item>
          <a-button size="large" style="width: 100%" type="primary" @click="onSubmit">登录</a-button>
        </a-form-model-item>
      </a-form-model>
      <div v-if="haloPhone" class="halo-phone">客服热线：{{haloPhone}}</div>
    </div>
    <base-footer class="footer" />
  </div>
</template>

<script>
import BaseFooter from '@/layouts/components/BaseFooter';

const isDev = process.env.NODE_ENV === 'development';

export default {
  components: {
    BaseFooter,
  },
  data() {
    return {
      title: process.env.VUE_APP_HOME_TITLE,
      haloPhone: process.env.VUE_APP_HALO_PHONE,
      form: {
        username: isDev ? 'admin' : '',
        password: isDev ? 'admin' : '',
      },
      rules: {
        username: [
          {
            required: true,
            message: '请正确输账号',
          },
        ],
        password: [{ required: true, message: '请输入验证码' }],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        await this.$store.dispatch('login', this.form);
        const routes = await this.$store.dispatch('generateRoutes');
        this.$router.addRoutes(routes);
        this.$router.push({ name: 'index' });
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: auto;
  background: #f0f2f5 url('./bg.svg') no-repeat center 110px;
  background-size: 100%;
}
.login-wrap {
  position: relative;
  z-index: 1;
}
.form-model {
  width: 368px;
}
.title {
  font-size: 30px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  position: relative;
  top: 2px;
  text-align: center;
  padding-bottom: 50px;
}
.halo-phone {
  text-align: center;
  padding-top: 20px;
}
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
}
.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: #fff;
    animation: animate 25s linear infinite;
    bottom: -200px;
    @keyframes animate {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
      }
      100% {
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
      }
    }
    &:nth-child(1) {
      left: 15%;
      width: 80px;
      height: 80px;
      animation-delay: 0s;
    }
    &:nth-child(2) {
      left: 5%;
      width: 20px;
      height: 20px;
      animation-delay: 2s;
      animation-duration: 12s;
    }
    &:nth-child(3) {
      left: 70%;
      width: 20px;
      height: 20px;
      animation-delay: 4s;
    }
    &:nth-child(4) {
      left: 40%;
      width: 60px;
      height: 60px;
      animation-delay: 0s;
      animation-duration: 18s;
    }
    &:nth-child(5) {
      left: 65%;
      width: 20px;
      height: 20px;
      animation-delay: 0s;
    }
    &:nth-child(6) {
      left: 75%;
      width: 150px;
      height: 150px;
      animation-delay: 3s;
    }
    &:nth-child(7) {
      left: 35%;
      width: 200px;
      height: 200px;
      animation-delay: 7s;
    }
    &:nth-child(8) {
      left: 50%;
      width: 25px;
      height: 25px;
      animation-delay: 15s;
      animation-duration: 45s;
    }
    &:nth-child(9) {
      left: 20%;
      width: 15px;
      height: 15px;
      animation-delay: 2s;
      animation-duration: 35s;
    }
    &:nth-child(10) {
      left: 85%;
      width: 150px;
      height: 150px;
      animation-delay: 0s;
      animation-duration: 11s;
    }
  }
}
</style>