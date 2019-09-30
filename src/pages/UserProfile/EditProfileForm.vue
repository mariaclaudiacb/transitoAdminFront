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
          <div class="col-md-5">
              <fg-input type="text"
              label="Id Orgão Denatran"
              placeholder="Id Orgão Denatran">
              </fg-input>
          </div>
        </div>
        <br>
        <div class="box">
          
        <select >
            <option class="dropdown-item">Selecione uma opção</option>
            <option class="dropdown-item">CIASC</option>
            <option class="dropdown-item">Admnistrador</option>
            <option class="dropdown-item">Consulta</option>
            <option class="dropdown-item">Operador</option>
            <option class="dropdown-item">Desativado</option>
         
        </select>
        </div>
        <br>
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
        senha:"",
        IdOrgaoDenatran:"",
        autorizacao:""
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
.box {
  
}

.box select {
  background-color: #ffffe6;
  color: black;
  padding: 0.5%;
  width: 36%;
  border: none;
  font-size: 1em;
  -webkit-appearance: button;
  appearance: button;
  outline: none;
}

.box::before {
  content: "\f13a";
  font-family: FontAwesome;
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  text-align: center;
  font-size: 28px;
  line-height: 45px;
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.box:hover::before {
  color: rgba(255, 255, 255, 0.6);
  background-color: rgba(255, 255, 255, 0.2);
}

.box select option {
  padding: 30px;
}
</style>
