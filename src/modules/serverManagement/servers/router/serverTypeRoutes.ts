import DefaultLayout from "@/layouts/Default.vue";

export const serverTypeRoutes = [
    {
        path: '/server-management/server-types',
        name: 'serverTypes',
        component: () => import('@/modules/serverManagement/serverTypes/views/ServerType.vue'),
        meta: {
            title: "serverTypes",
            authRequired: true,
            layout: DefaultLayout
          }
    },
]