<template>
  <card class="card" title="Inclusão de Usuários">
    <div>
      <form @submit.prevent>
        <div class="row">
          
          <div class="col-md-8">
            <fg-input type="email"
                      label="Username"
                      placeholder="Email"
                      v-model="userAdc.email">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-8">
            <fg-input type="password"
                      label="Senha"
                      placeholder="Senha"
                      v-model="userAdc.senha">
            </fg-input>
          </div>
        </div>   
        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="updateProfile">
            Incluir Usuário
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
export default {
  data() {
    return {
      userAdc: {
        email: "",
        senha:""
      }
    };
  },
  methods: {
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.userAdc));
    }
  }
};
</script>
<style>
</style>
