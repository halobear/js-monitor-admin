export default [
  {
    path: "/monitor",
    name: "monitor",
    meta: { title: "工作看板", icon: "fund" },
    component: () => import("@/views/monitor/monitorCenter")
  },
  {
    path: "/monitorError",
    name: "monitorError",
    meta: { title: "错误监控", icon: "laptop" },
    redirect: { name: "monitorLatest" },
    hideChildrenInMenu: true,
    component: () => import("@/views/monitor/monitorError"),
    children: [
      {
        path: "/monitorError",
        name: "monitorLatest",
        meta: { title: "实时监控", icon: "laptop" },
        component: () => import("@/views/monitor/monitorLatest")
      },
      {
        path: "/monitorError/monitorJS",
        name: "monitorJS",
        meta: { title: "运行错误", icon: "exception" },
        component: () => import("@/views/monitor/monitorJS")
      },
      {
        path: "/monitorError/monitorLoad",
        name: "monitorLoad",
        meta: { title: "资源错误", icon: "build" },
        component: () => import("@/views/monitor/monitorLoad")
      }
    ]
  }
];
