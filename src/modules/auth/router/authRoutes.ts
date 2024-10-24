import { defineAsyncComponent } from "vue";
import { LAYOUT_TYPES } from "@/layouts/types.ts";

const CoverLayout = defineAsyncComponent(() => import("@/layouts/Cover.vue"));


export const authRoutes:any = [  
    {
      path: "/login",
      name: "Login",
      component: () => import("@/modules/auth/views/Login.vue"),
      meta: {
        title: "Sign In",
        authRequired: false,
      }
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/modules/auth/views/Register.vue"),
      meta: {
        title: "Register",
        authRequired: false,
      }
    },
    {
      path: "/verify-email",
      name: "VerifyEmail",
      component: () => import("@/modules/auth/views/VerifyEmail.vue"),
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
      component: () => import("@/modules/auth/views/ResetPassword.vue"),
      meta: {
        title: "Reset Password",
        authRequired: false,
      }
    },
  ];

