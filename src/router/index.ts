import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes.ts";
import LocalStorage from "@/app/service/localStorageService.ts";
import { LS_KEY_USER } from "@/app/const.ts";
import { authService } from "@/app/service/httpService/httpServiceProvider";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const title = "itG Console";

router.beforeEach((to: any, from: any, next: any) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  const nearestWithTitle = to.matched.slice().reverse().find((r: any) => r.meta && r.meta.title);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title + " | " + title || title;
  }

  const userLocalStorage = new LocalStorage(LS_KEY_USER);
  const authUser = userLocalStorage.getItems();
  const isAuthRequired = to.meta.authRequired;

  if (isAuthRequired && (!authUser || !authUser.token || !authUser.validEmail)) {
    // Redirect unauthenticated users to the login page
    console.log('User is not authenticated, redirecting to login');
    return next({ name: 'Login' });
  }

  if (authUser && authUser.token && authUser.validEmail) {
    // Redirect authenticated users away from auth-related pages
    if (['Login', 'Register', 'VerifyEmail'].includes(to.name)) {
      console.log('User is authenticated, redirecting to dashboard');
      return next({ name: 'Dashboard' });
    }
  }

  next();
});

export default router;
