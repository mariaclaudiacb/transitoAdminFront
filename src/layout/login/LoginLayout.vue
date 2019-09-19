<template>
     <div class="wrapper">
         <div  >
            <top-navbar></top-navbar>

            <login></login>
          
            <content-footer></content-footer>
         </div>
     </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "@/layout/dashboard/TopNavbar.vue";
import ContentFooter from "@/layout/dashboard/ContentFooter.vue";
import MobileMenu from "@/layout/dashboard/MobileMenu";
import Login from "@/layout/login/Login.vue";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    MobileMenu,
    Login
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
