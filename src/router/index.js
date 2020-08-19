import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress"; // 网页顶部进度
import "nprogress/nprogress.css"; // 进度条样式

import routes from "./constantRoutes";
import store from "../store";

// 隐藏旋转图标
NProgress.configure({ showSpinner: false });

// hack router push callback
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

const router = new Router({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  }
});

router.beforeEach(async (to, from, next) => {
  // 进度条开始
  NProgress.start();
  const {
    user: {
      user: { token }
    },
    permission: { addRouters }
  } = store.state;
  // 已经登录
  if (token) {
    // 动态设置加入路由
    if (!addRouters.length) {
      const routes = await store.dispatch("generateRoutes");
      router.addRoutes(routes);
      const { path = "/", query = {}, params = {} } = to;
      next({ path, query, params });
    } else {
      // 已登录并且在登录页面
      next(to.path === "/login" ? { path: "/" } : undefined);
    }
  } else {
    // 没有登录
    next(to.path !== "/login" ? { path: "/login" } : undefined);
  }

  NProgress.done(); // 进度条结束
});

router.afterEach(route => {
  // 设置路由title
  const { title = process.env.VUE_APP_HOME_TITLE } = route.meta || {};
  title && (document.title = title);

  // 进度条结束
  NProgress.done();
});

export default router;
