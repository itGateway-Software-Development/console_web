import DefaultLayout from "@/layouts/Default.vue";

export const operationSystemRoutes = [
    {
        path: '/server-management/operation-systems',
        name: 'operationSystems',
        component: () => import('@/modules/serverManagement/operationSystems/views/OperationSystem.vue'),
        meta: {
            title: "operationSystems",
            authRequired: true,
            layout: DefaultLayout
          }
    },
]