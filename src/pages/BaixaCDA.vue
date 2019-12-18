<template>
  <div class="row">
    <div class="col-xl-4 col-lg-5 col-md-6">
      <card class="card" title="Baixa de CDA">
        <form @submit.prevent>
          <div class="box">
            <label>Motivo da Baixa</label>
            <br />
            <input type="radio" name="motivoBaixa" v-model="baixaCDAPag" /> Baixa CDA por Pagamento
            <br />
            <input type="radio" name="motivoBaixa" v-model="baixaCDAErro" /> Baixa CDA por Erro
            <br />
            <br />
          </div>

          <div class="box">
            <label>Orgão Denatran</label>
            <br />
            <select v-model="baixaCDA.orgaoDenatran">
              <option
                v-for="orgaoDenatran in listaOrgaosDenatran"
                :key="orgaoDenatran.id"
                 :value="orgaoDenatran.id"
              >{{orgaoDenatran.nome}}</option>
            </select>
            <br />
            <br />
            <p-button type="submit" @click.native="trocarOrgao">Buscar Orgãos Detran</p-button>
          </div>
          <br />
          <div class="box">
            <label>Orgão Detran</label>
            <br />

            <select>
              <option v-for="detran in orgaoDetran" :key="detran.id" :value="detran.id">{{detran.nome}}</option>
            </select>
          </div>

          <div class="row">
            <div class="col-md-8">
              <fg-input
                type="text"
                label="Numero do Auto"
                placeholder="Numero do Auto"
                v-model="baixaCDA.numeroAuto"
              ></fg-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8">
              <fg-input
                type="text"
                label="Codigo da Infracao"
                placeholder="Codigo da Infracao"
                v-model="baixaCDA.codigoInfracao"
              ></fg-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8">
              <fg-input
                type="text"
                label="Desdobramento"
                placeholder="Desdobramento"
                v-model="baixaCDA.desdobramento"
              ></fg-input>
            </div>
          </div>
          <br />
          <div class="text-center">
            <p-button type="info" round>Baixar CDA</p-button>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>
<script>
import { getOrgaosDenatran } from "../service/dividaAtivaService";
import { getBaixaCDAPag } from "../service/dividaAtivaService";
import { getBaixaCDAErro } from "../service/dividaAtivaService";
import { getOrgaosDetran } from "../service/dividaAtivaService";

export default {
  data() {
    return {
      baixaCDA: {
        orgaoDenatran: "",
        codigoInfracao: "",
        numeroAuto: "",
        desdobramento: ""
      },
      listaOrgaosDenatran: [],
      baixaCDAPag: "",
      baixaCDAErro: ""
    };
  },

  mounted() {
    getOrgaosDenatran().then(response => {
      console.log(response);
      this.listaOrgaosDenatran = response.data;
    });
  },

  computed:{
    orgaoDetran(){
      console.log("gdyug")
      return this.$store.orgaoDenatran
    }

  },
  methods: {
    botaoBaixarCDA() {
      this.$store.dispatch("attemptBaixarCDA", this.baixaCDA).then(
        response => {
          this.$alertify.success("Baixa da CDA realizada com sucesso");
        },
        erro => {
          this.$alertify.error("Não foi possivel baixar a CDA");
        }
      );
    },

    trocarOrgao() {
      this.$store
        .dispatch("attemptOrgaosDetran", this.baixaCDA.orgaoDenatran)
        .then(
          resp => {
            this.$alertify.success("Orgão Denatran alterado com sucesso");
          },
          erro => {
            this.$alertify.error("Não foi possivel alterar o orgão Denatran");
          }
        );
    }
  }
};
</script>