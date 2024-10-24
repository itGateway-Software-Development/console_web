import DefaultLayout from "@/layouts/Default.vue";

export const serverRoutes = [
  {
    path: "/servers",
    name: "Servers",
    component: () => import("@/modules/servers/views/Server.vue"),
    meta: {
      title: "Servers",
      authRequired: true,
      layout: DefaultLayout
    }
  },
  {
    path: "/servers/create",
    name: "ServerCreate",
    component: () => import("@/modules/servers/views/ServerCreatePage.vue"),
    meta: {
      title: "ServerCreate",
      authRequired: true,
      layout: DefaultLayout
    }
  },

];