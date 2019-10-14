/*!

 =========================================================
 * Vue Paper Dashboard - v2.0.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/paper-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import App from "./App";
import router from "./router/index";
import Axios from 'axios';
import VueJWT from 'vuejs-jwt';
import store from '@/store.js'
import PaperDashboard from "./plugins/paperDashboard";
import VueAlertify from 'vue-alertify'
import "vue-notifyjs/themes/default.css";
import { mixin } from './mixins/index'


Vue.prototype.$http = Axios
Vue.use(PaperDashboard)
Vue.use(VueAlertify)
Vue.use(VueJWT, { keyName: 'token' }) 
Vue.mixin(mixin)


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
