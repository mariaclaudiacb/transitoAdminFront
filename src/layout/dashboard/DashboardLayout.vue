<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" name= "Dashboard" icon="ti-home"/>
        <sidebar-link to="/incluirUsuario" name=" Incluir Usuário" icon="ti-user"/>
        <sidebar-link to="/historicoInfracoes" name=" Histórico de Infrações" icon="ti-folder"/>
        <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2"/>
        <sidebar-link to='/logout' name="Sair" icon="ti-power-off" />
        
        <!--<li  @click="logout" class="nav-item router-link-exact-active active">
         <span v-if="isLoggedIn">
          <a class="nav-link"><i class="ti-power-off"></i>
          <p>Sair</p>
          </a> 
          </span> 
        </li>-->
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
    logout: function() {
      console.log('a')
      this.$store.dispatch('attemptLogout')
      .then(()=>{
        this.$router.push('/login')
      })
    }
  }
};
</script>
