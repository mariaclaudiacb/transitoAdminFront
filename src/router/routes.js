import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";

import LoginLayout from "@/layout/login/LoginLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages

import IncluirUsuario from "@/pages/UserProfile/IncluirUsuario.vue";
import Login from "@/layout/login/Login.vue";
import Timeline from "@/pages/Timeline.vue";
import BaixaCDA from "@/pages/BaixaCDA.vue";
import Icons from "@/pages/Icons.vue";
import store from '@/store'
import { getBaixaCDA } from "../service/dividaAtivaService";

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
    name: "Dashboard",
    meta: { 
      requiresAuth: true
    },
    children: [
      {
        path: "/incluirUsuario",
        name: "incluir Usuário",
        component: IncluirUsuario,
        meta: { 
          requiresAuth: true
        }
        
      },
      {
        path: "/historicoInfracoes",
        name: "histórico de Infrações",
        component: Timeline,
        meta:{
          requiresAuth:true
        }
      },
      { 
        path: "/baixaCDA",
        name: "Baixa de CDA",
        component: BaixaCDA,
        meta:{
          requiresAuth:true
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
