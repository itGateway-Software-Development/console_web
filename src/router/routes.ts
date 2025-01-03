import DefaultLayout from "@/layouts/Default.vue";

import { authRoutes } from "@/modules/auth/router/authRoutes";
import { userProfileRoutes } from "@/modules/userProfile/router/userProfileRoutes";
import { evmRoutes } from "@/modules/compute/elasticVirtualMachine/router/evmRoutes";

const dashboardRoutes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/modules/dashboard/views/Dashboard.vue"),
    meta: {
      title: "Dashboard",
      authRequired: true,
      layout: DefaultLayout
    }
  }, 
];



export const routes = [
  ...dashboardRoutes,
  ...authRoutes,
  ...userProfileRoutes,
  ...evmRoutes
];
