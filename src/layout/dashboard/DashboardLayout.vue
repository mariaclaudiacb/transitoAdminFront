<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/incluirUsuario" name=" Incluir Usuário" icon="ti-user"/>
        <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2"/>
        <li  @click="logout" class="nav-item router-link-exact-active active">
          <a class="nav-link"><i class="ti-power-off"></i>
          <p>Sair</p>
          <!-- <sidebar-link> Sair</sidebar-link>-->
          </a> 
        </li>
      </template>
      
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    logout(){
      
      if(localStorage.getItem('token') != null){
        //vc deveria remover do vuex
        localStorage.removeItem('token')
        this.$router.push('/login')
      }     
    }
  }
};
</script>
