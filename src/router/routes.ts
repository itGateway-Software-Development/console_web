import DefaultLayout from "@/layouts/Default.vue";
import { defineAsyncComponent } from "vue";

import { authRoutes } from "@/modules/auth/router/authRoutes";
import { userProfileRoutes } from "@/modules/userProfile/router/userProfileRoutes";
import { serverRoutes } from "@/modules/servers/router/serverRoutes";
import { locationRoutes } from "@/modules/serverManagement/location/router/locationRoutes";

const CoverLayout = defineAsyncComponent(() => import("@/layouts/Cover.vue"));

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




const pagesRoutes = [
  {
    path: "/pages/coming-soon",
    name: "ComingSoon",
    component: () => import("@/views/pages/ComingSoon.vue"),
    meta: {
      title: "Coming Soon",
      authRequired: false,
      layout: CoverLayout
    }
  },
  {
    path: "/pages/maintenance",
    name: "Maintenance",
    component: () => import("@/views/pages/Maintenance.vue"),
    meta: {
      title: "Maintenance",
      authRequired: false,
      layout: CoverLayout
    }
  }
];

export const routes = [
  ...dashboardRoutes,
  ...pagesRoutes,
  ...authRoutes,
  ...userProfileRoutes,
  ...serverRoutes,
  ...locationRoutes
];
