// @unocss-include
import type { RouteRecordRaw } from "vue-router";
import { LAYOUT } from "~/router/constant";

const bugs: RouteRecordRaw = {
  path: "/bugs",
  name: "Bugs",
  component: LAYOUT,
  redirect: "/bugs/warnOnDoubleApple",
  meta: {
    title: "routes.bugs.bugs",
    icon: "i-mdi-bug",
  },
  children: [
    {
      path: "warnOnDoubleApple",
      name: "WarnOnDoubleApple",
      component: () => import("~/pages/bugs/warnOnDoubleApple.vue"),
      meta: {
        title: "routes.bugs.warnOnDoubleApple",
        icon: "i-mdi-bug",
      },
    },
  ],
};

export default bugs;
