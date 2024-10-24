import DefaultLayout from "@/layouts/Default.vue";

export const locationRoutes = [
    {
        path: '/server-management/location',
        name: 'location',
        component: () => import('@/modules/serverManagement/location/views/Location.vue'),
        meta: {
            title: "location",
            authRequired: true,
            layout: DefaultLayout
          }
    },
]