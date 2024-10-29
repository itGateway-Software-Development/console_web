import DefaultLayout from "@/layouts/Default.vue";

export const serverRoutes = [
    {
        path: '/server-management/servers',
        name: 'servers',
        component: () => import('@/modules/serverManagement/servers/views/Server.vue'),
        meta: {
            title: "servers",
            authRequired: true,
            layout: DefaultLayout
          }
    },
]