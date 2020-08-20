import "ant-design-vue/dist/antd.css";
import "swiper/css/swiper.css";
import "kuan-css";

import Vue from "vue";
import Antd from "ant-design-vue";
import photoSwipe from "kuan-vue-photoswipe";
import VueAwesomeSwiper from "vue-awesome-swiper";

import request from "./utils/request";
import router from "./router";
import store from "./store";
import mixins from "./utils/mixins";
import { timeAgo } from "./utils/filters";

import App from "./App.vue";
import components from "@/common";
import { PageLayout } from "@/layouts/index";

import "./styles/index.less";

Vue.prototype.$http = request;
Vue.prototype.$bus = new Vue(); // event bus

Vue.filter("timeAgo", timeAgo);
Vue.mixin(mixins); // mixins
Vue.use(Antd); // antd vue
Vue.use(VueAwesomeSwiper);
Vue.component("page-layout", PageLayout);
Vue.use(photoSwipe); // 多图预览
Vue.use(components); // 全局组件

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
