<template>
  <div class="row">
    <div class="col-xl-4 col-lg-5 col-md-6">
      <card class="card" title="Inclusão de Usuários">
        <div>
          <form @submit.prevent>
            <div class="row">
              <div class="col-md-8">
                <fg-input
                  type="email"
                  label="Username"
                  placeholder="Email"
                  v-model="userAdc.usuario"
                ></fg-input>
              </div>
            </div>
            <div class="box">
              <label>Orgao Denatran</label>
              <br />
              <select v-model="userAdc.orgaoDenatranId">
                <option
                  selected
                  v-for="orgao in orgaosDenatran"
                  v-bind:key="orgao.id"
                  :value="orgao.id"
                >{{orgao.nome}}</option>
              </select>
            </div>

            <br />
            <div class="box">
              <label>Autorização</label>

              <br />

              <select v-model="userAdc.autorizacao">
                <option
                  selected
                  v-for="role in roles"
                  v-bind:key="role.id"
                  :value="role.nome"
                >{{role.nome}}</option>
              </select>
            </div>
            <br />
            <div class="text-center">
              <p-button type="info" round @click.native="updateProfile">Incluir Usuário</p-button>
            </div>
            <div class="clearfix"></div>
          </form>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { getOrgaosDenatran } from "../../service/dividaAtivaService";
import { getRoles } from "../../service/dividaAtivaService";

export default {
  data() {
    return {
      userAdc: {
        usuario: "",
        orgaoDenatranId: "",
        autorizacao: ""
      },
      orgaosDenatran: [],
      roles: []
    };
  },
  mounted() {
    getOrgaosDenatran().then(response => {
      this.orgaosDenatran = response.data;
    }),
    getRoles().then(response => {
        this.roles = response.data;
    });
  },
  methods: {
    updateProfile() {
      console.log("incluindo");

      this.$store.dispatch("attemptAddUser", this.userAdc).then(
        response => {
          this.$alertify.success("Usuário incluido com sucesso");
        },
        erro => {
          const msgErro = this.trataErro(erro); // mixin
          this.$alertify.error(msgErro);
        }
      );
    }
  }
};
</script>
<style>
.box {
}

.box select {
  background-color: #fdfaec;
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
