export default [
  {
    path: "/monitor",
    name: "monitor",
    meta: { title: "监控中心", icon: "fund" },
    component: () => import("@/views/monitor/monitorCenter")
  },
  {
    path: "/monitor/monitorLoad",
    name: "monitorLoad",
    meta: { title: "资源错误", icon: "build" },
    component: () => import("@/views/monitor/monitorLoad")
  }
];
