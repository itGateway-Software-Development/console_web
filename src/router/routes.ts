import DefaultLayout from "@/layouts/Default.vue";
import { defineAsyncComponent } from "vue";
import { LAYOUT_TYPES } from "@/layouts/types.ts";

const BasicLayout = defineAsyncComponent(() => import("@/layouts/Basic.vue"));
const BoxedLayout = defineAsyncComponent(() => import("@/layouts/Boxed.vue"));
const CoverLayout = defineAsyncComponent(() => import("@/layouts/Cover.vue"));
const ModernLayout = defineAsyncComponent(() => import("@/layouts/Modern.vue"));

const accountRoutes = [  
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/authentication/Login.vue"),
    meta: {
      title: "Sign In",
      authRequired: false,
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/authentication/Register.vue"),
    props: () => ({ layout: LAYOUT_TYPES.BOXED }),
    meta: {
      title: "Register",
      authRequired: false,
      layout: BoxedLayout
    }
  },
  {
    path: "/verify-email",
    name: "VerifyEmail",
    component: () => import("@/views/authentication/VerifyEmail.vue"),
    props: () => ({ layout: LAYOUT_TYPES.COVER }),
    meta: {
      title: "Verify Email",
      authRequired: false,
      layout: CoverLayout
    }
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("@/views/authentication/ResetPassword.vue"),
    props: () => ({ layout: LAYOUT_TYPES.COVER }),
    meta: {
      title: "Reset Password",
      authRequired: false,
      layout: CoverLayout
    }
  },
];

const dashboardRoutes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/views/dashboard/Dashboard.vue"),
    meta: {
      title: "Dashboard",
      authRequired: true,
      layout: DefaultLayout
    }
  },
];
const userSettingRoutes = [
  {
    path: "/user-profile",
    name: "UserProfile",
    component: () => import("@/views/pages/userSetting/UserProfile.vue"),
    meta: {
      title: "Profile",
      authRequired: true,
      layout: DefaultLayout
    }
  },
];
const authRoutes = [
  {
    path: "/servers",
    name: "Servers",
    component: () => import("@/views/pages/servers/Server.vue"),
    meta: {
      title: "Servers",
      authRequired: true,
      layout: DefaultLayout
    }
  },
  {
    path: "/servers/create",
    name: "ServerCreate",
    component: () => import("@/views/pages/servers/ServerCreatePage.vue"),
    meta: {
      title: "ServerCreate",
      authRequired: true,
      layout: DefaultLayout
    }
  },

  {
    path: "/two-steps/basic",
    name: "TwoStepBasic",
    component: () => import("@/views/authentication/TwoStep.vue"),
    props: () => ({ layout: LAYOUT_TYPES.BASIC }),
    meta: {
      title: "Two Steps",
      authRequired: false,
      layout: BasicLayout
    }
  },
  {
    path: "/two-steps/cover",
    name: "TwoStepCover",
    component: () => import("@/views/authentication/TwoStep.vue"),
    props: () => ({ layout: LAYOUT_TYPES.COVER }),
    meta: {
      title: "Two Step",
      authRequired: false,
      layout: CoverLayout
    }
  },
  {
    path: "/two-steps/boxed",
    name: "TwoStepBoxed",
    component: () => import("@/views/authentication/TwoStep.vue"),
    props: () => ({ layout: LAYOUT_TYPES.BOXED }),
    meta: {
      title: "Two Step",
      authRequired: false,
      layout: BoxedLayout
    }
  },
  {
    path: "/two-steps/modern",
    name: "TwoStepModern",
    component: () => import("@/views/authentication/TwoStep.vue"),
    props: () => ({ layout: LAYOUT_TYPES.MODERN }),
    meta: {
      title: "Two Step",
      authRequired: false,
      layout: ModernLayout
    }
  },
  {
    path: "/logout/basic",
    name: "LogoutBasic",
    component: () => import("@/views/authentication/Logout.vue"),
    props: () => ({ layout: LAYOUT_TYPES.BASIC }),
    meta: {
      title: "Logout",
      authRequired: false,
      layout: BasicLayout
    }
  },
  {
    path: "/logout/cover",
    name: "LogoutCover",
    component: () => import("@/views/authentication/Logout.vue"),
    props: () => ({ layout: LAYOUT_TYPES.COVER }),
    meta: {
      title: "Logout",
      authRequired: false,
      layout: CoverLayout
    }
  },
  {
    path: "/logout/boxed",
    name: "LogoutBoxed",
    component: () => import("@/views/authentication/Logout.vue"),
    props: () => ({ layout: LAYOUT_TYPES.BOXED }),
    meta: {
      title: "Logout",
      authRequired: false,
      layout: BoxedLayout
    }
  },
  {
    path: "/logout/modern",
    name: "LogoutModern",
    component: () => import("@/views/authentication/Logout.vue"),
    props: () => ({ layout: LAYOUT_TYPES.MODERN }),
    meta: {
      title: "Logout",
      authRequired: false,
      layout: ModernLayout
    }
  },
  {
    path: "/reset-password/basic",
    name: "ResetPasswordBasic",
    component: () => import("@/views/authentication/ResetPassword.vue"),
    props: () => ({ layout: LAYOUT_TYPES.BASIC }),
    meta: {
      title: "Reset Password",
      authRequired: false,
      layout: BasicLayout
    }
  },
  {
    path: "/reset-password/cover",
    name: "ResetPasswordCover",
    component: () => import("@/views/authentication/ResetPassword.vue"),
    props: () => ({ layout: LAYOUT_TYPES.COVER }),
    meta: {
      title: "Reset Password",
      authRequired: false,
      layout: CoverLayout
    }
  },
  {
    path: "/reset-password/boxed",
    name: "ResetPasswordBoxed",
    component: () => import("@/views/authentication/ResetPassword.vue"),
    props: () => ({ layout: LAYOUT_TYPES.BOXED }),
    meta: {
      title: "Reset Password",
      authRequired: false,
      layout: BoxedLayout
    }
  },
  {
    path: "/reset-password/modern",
    name: "ResetPasswordModern",
    component: () => import("@/views/authentication/ResetPassword.vue"),
    props: () => ({ layout: LAYOUT_TYPES.MODERN }),
    meta: {
      title: "Reset Password",
      authRequired: false,
      layout: ModernLayout
    }
  },
  {
    path: "/create-password/basic",
    name: "CreatePasswordBasic",
    component: () => import("@/views/authentication/CreatePassword.vue"),
    props: () => ({ layout: LAYOUT_TYPES.BASIC }),
    meta: {
      title: "Create Password",
      authRequired: false,
      layout: BasicLayout
    }
  },
  {
    path: "/create-password/cover",
    name: "CreatePasswordCover",
    component: () => import("@/views/authentication/CreatePassword.vue"),
    props: () => ({ layout: LAYOUT_TYPES.COVER }),
    meta: {
      title: "Create Password",
      authRequired: false,
      layout: CoverLayout
    }
  },
  {
    path: "/create-password/boxed",
    name: "CreatePasswordBoxed",
    component: () => import("@/views/authentication/CreatePassword.vue"),
    props: () => ({ layout: LAYOUT_TYPES.BOXED }),
    meta: {
      title: "Create Password",
      authRequired: false,
      layout: BoxedLayout
    }
  },
  {
    path: "/create-password/modern",
    name: "CreatePasswordModern",
    component: () => import("@/views/authentication/CreatePassword.vue"),
    props: () => ({ layout: LAYOUT_TYPES.MODERN }),
    meta: {
      title: "Create Password",
      authRequired: false,
      layout: ModernLayout
    }
  }
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
  ...authRoutes,
  ...userSettingRoutes,
  ...pagesRoutes,
  ...accountRoutes
];
