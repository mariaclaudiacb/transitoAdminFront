import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from '@/store.js'

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active"
});
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next({
      path: '/login',
      params: { nextUrl: to.fullPath }
    })
  }  else {
      console.log('Next')
      next() 
  }
})

/*store.dispatch('logout')
return next({ path: '/login',
params: { nextUrl: to.fullPath }})*/

export default router;
