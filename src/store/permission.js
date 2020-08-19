import constantRoutes from "@/router/constantRoutes";
import dynamicRoutes from "@/router/dynamicRoutes";

import authority from "@/utils/authority";
import { routerMaps } from "@/constants";

function permissionMenu(routerMap) {
  const { user = {} } = authority.get() || {};
  const { role_menu: menu = [] } = user;
  return routerMap.filter(item => {
    const hasPermission = menu.find(it => item.path === it);
    if (hasPermission && item.children && item.children.length) {
      item.children = permissionMenu(item.children);
    }
    return hasPermission;
  });
}
function getRouter() {
  const user = authority.get() || {};
  const { role_menu = [], is_admin } = user;
  let addRouters = [];
  // 获取当前角色所有权限的路由菜单
  const permissionRouter = () => {
    let routers = [];
    addRouters = is_admin ? dynamicRoutes : permissionMenu(dynamicRoutes);
    routers = [...addRouters, ...constantRoutes];
    return routers;
  };

  const routers = permissionRouter();
  // 获取头部可以访问的路由
  const topMenus = is_admin
    ? routerMaps
    : routerMaps.filter(it => role_menu.includes(it.path));
  return {
    routers,
    addRouters,
    topMenus
  };
}

const user = authority.get() || {};
const { menu: headerMenus = [] } = user;

const permission = {
  state: {
    routers: [], // 所有路由
    addRouters: [], // 新增路由
    topMenus: [], // 有权限的头部路由
    headerMenus, // 自定义显示的路由
    currentRoutes: []
  },
  mutations: {
    SET_ROUTERS: (state, payload) => {
      Object.assign(state, payload);
    }
  },
  actions: {
    generateRoutes({ commit }) {
      return new Promise(resolve => {
        const { routers = [], addRouters = [], topMenus = [] } = getRouter();
        commit("SET_ROUTERS", {
          routers,
          addRouters,
          topMenus
        });
        resolve(addRouters);
      });
    }
  }
};

export default permission;
