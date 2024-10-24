import DefaultLayout from "@/layouts/Default.vue";

export const userProfileRoutes = [
    {
      path: "/user-profile",
      name: "UserProfile",
      component: () => import("@/modules/userProfile/views/UserProfile.vue"),
      meta: {
        title: "Profile",
        authRequired: true,
        layout: DefaultLayout
      }
    },
  ];