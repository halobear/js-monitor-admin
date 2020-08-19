import { BaseLayout } from "@/layouts/index";

const files = require.context(".", false, /\.js$/);
let routes = [
  {
    path: "home",
    name: "home",
    meta: { title: "幻熊科技", icon: "home" },
    hidden: true,
    component: () => import("../../views/home/index")
  }
];

files.keys().forEach(key => {
  if (key === "./index.js") return;
  const route = files(key).default;
  if (Array.isArray(route)) {
    routes = [...routes, ...route];
  } else {
    routes.push(route);
  }
});

export default [
  {
    path: "/",
    name: "index",
    component: BaseLayout,
    meta: { title: "幻熊科技" },
    redirect: "home",
    children: routes
  },
  {
    path: "*",
    redirect: { name: "home" }
  }
];
