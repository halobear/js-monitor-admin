export default [
  {
    path: "/monitor",
    name: "monitor",
    meta: { title: "监控中心", icon: "fund" },
    component: () => import("@/views/monitor/monitorCenter")
  },
  {
    path: "/monitor/latest",
    name: "monitor/latest",
    meta: { title: "实时监控", icon: "laptop" },
    component: () => import("@/views/monitor/monitorLatest")
  },
  {
    path: "/monitor/monitorJS",
    name: "monitorJS",
    meta: { title: "运行错误", icon: "exception" },
    component: () => import("@/views/monitor/monitorJS")
  },
  {
    path: "/monitor/monitorLoad",
    name: "monitorLoad",
    meta: { title: "资源错误", icon: "build" },
    component: () => import("@/views/monitor/monitorLoad")
  }
];
