import DefaultLayout from "@/layouts/Default.vue";

export const evmRoutes = [
    {
      path: "/services/compute/elastic-virtual-machine/",
      name: "Compute",
      meta: {
        title: "Compute",
        authRequired: true,
        layout: DefaultLayout,
      },
      children: [
        {
            path: "",
            name: "EVM Dashboard",
            component: () =>import("@/modules/compute/elasticVirtualMachine/views/Dashboard.vue"),
        },
        {
            path: "vm",
            component: () =>import("@/modules/compute/elasticVirtualMachine/views/VM.vue"),
        },
      ],
    },
  ];
  