import DefaultLayout from "@/layouts/Default.vue";

export const evmRoutes = [
    {
      path: "/services/compute",
      name: "Compute",
      meta: {
        title: "Compute",
        authRequired: true,
        layout: DefaultLayout,
      },
      children: [
        {
          path: "elastic-virtual-machine",
          component: () =>import("@/modules/compute/elasticVirtualMachine/views/EVM.vue"),
        },
      ],
    },
  ];
  