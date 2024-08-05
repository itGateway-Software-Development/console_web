import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/register.vue'),
      meta: {
        isAuthRoute: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue'),
      meta: {
        isAuthRoute: true,
      },
    },
    {
      path: '/',
      meta: {
        requiresAuth: true,
      },
      component: () => import('@/layouts/default.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'root',
          component: () => import('@/pages/index.vue'),
        },
        // {
        //   path: '/company',
        //   name: 'company',
        //   component: () => import('@/pages/company.vue'),
        // },
        // {
        //   path: '/setting',
        //   name: 'setting',
        //   component: () => import('@/pages/setting.vue'),
        // },
        // {
        //   path: '/roles',
        //   name: 'roles',
        //   component: () => import('@/pages/role.vue'),
        // },
        // {
        //   path: '/permissions',
        //   name: 'permissions',
        //   component: () => import('@/pages/permission.vue'),
        // },
        // {
        //   path: '/users',
        //   name: 'users',
        //   component: () => import('@/pages/user.vue'),
        // }
      ],
    },
  ],
})
  router.beforeEach((to, from, next) => {

    // let accessToken = useCookie('accessToken').value;
    // let userData = useCookie('userData').value;

    let accessToken = localStorage.getItem('token')
    let userData = localStorage.getItem('userData')

    if (accessToken && userData) {
      if (to.name === 'login' || to.name === 'register') {
        next({ name: 'root' })
        return
      }
      else {
        next()
      }
    }
    else {

      if(to.name == 'login' || to.name == 'register') {
        next();
        return
      } 

      if (to.name !== 'login' && to.name !== 'forget-password' && to.name !== 'reset-password') {

        next({ name: 'login' })

        return
      }

      next()
    }
  });

  export { router };

  export default function (app) {
    app.use(router)
  }
