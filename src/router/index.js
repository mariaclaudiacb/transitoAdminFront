import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from '@/store.js';


Vue.use(VueRouter);

const router = new VueRouter({
  routes, 
  linkActiveClass: "active"
});
router.beforeEach((to, from, next) => {

  const requiresAuth = to.meta.requiresAuth === true

  if (!requiresAuth) {
    if (!store.getters.isLoggedIn) {
      next()
      return
    } else {
        
      next({ path: '/dashboard' })
    }
  }
  else {

    if (!Vue.$jwt.hasToken()) {
      return false
    }
    const decoded = Vue.$jwt.decode()
    
    if (decoded.roles.indexOf('ROLE_CIASC') >= 0) {
      next()
      return
    }
    else {
      store.dispatch('attemptLogout').then(() => {                
      })
    }
  }
})
export default router;
