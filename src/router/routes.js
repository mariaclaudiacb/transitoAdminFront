import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";

import LoginLayout from "@/layout/login/LoginLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages

import UserProfile from "@/pages/UserProfile.vue";
import Login from "@/layout/login/Login.vue";
import Icons from "@/pages/Icons.vue";
import store from '@/store'

const routes = [
  {
    path:"/", 
    component: LoginLayout,
    redirect:"/login",
    children:[
      {
        path:"login",
        name:"login",
        component:Login

      }
    ]
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { 
      requiresAuth: true
    },
    children: [
      {
        path: "/incluirUsuario",
        name: "incluirUsuario",
        component: UserProfile,
        meta: { 
          requiresAuth: true
        }
        
      },
      {
        path: "/icons",
        name: "icons",
        component: Icons,
        meta: { 
          requiresAuth: true
        }
      }
    ]
  },
  {
    name: 'logout',
    path: '/logout',
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      store.dispatch('attemptLogout')
      return next({ name: 'login' })
    }
  },
  { path: "*", component: NotFound }
];


/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
