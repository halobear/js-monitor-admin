// import { BaseLayout } from "@/layouts/index";
import { RouteView } from "@/layouts/index";

export default [
  {
    path: "/test",
    name: "testRoot",
    meta: { title: "测试路由", icon: "usb" },
    component: RouteView,
    hidden: process.env.NODE_ENV !== "development",
    hideChildrenInMenu: true,
    redirect: { name: "test" },
    children: [
      {
        path: "/test",
        name: "test",
        meta: { title: "test" },
        component: () => import("../../views/test/index")
      }
    ]
  }
];
