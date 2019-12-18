<template>
  <section id="cd-timeline" class="cd-container">
    <div class="col-xl-5 col-lg-7 col-md-6">
      <label class="fontes">ID Auto de Infração</label>
      <br />
      <input type="id" v-model="historicoAuto.idAuto" placeholder="ID Auto de Infração" />
      <br />
      <br />

      <p-button type="info" class="botao" round @click.native="clickPesquisar">Pesquisar</p-button>
    </div>
   
    <div v-for="(event, index) in historicoAuto.events" :key="index" class="cd-timeline-block">
      <div class="cd-timeline-img">
        <!--<img v-if='event.icon' v-bind:src="'img/cd-icon-'+event.icon+'.svg'" alt="Picture">-->
      </div>

      <div class="cd-timeline-content">
        <h2 v-html="event.Evento"></h2>
        <p v-bind:class="{'comment' : event.itens !== undefined }">
          <span >

            Id Histórico: {{event.id}}
            <br>
            Modificado por: {{ event.modifiedBy}}
            <br>
           
            Ação: {{event.action}}
            
            <br>
          <template v-if="event.alteracoes" >  
            Alterações:
          <ul  class="itens">
          <li v-for="(alteracao,index) in event.alteracoes " v-html="alteracao" :key="index">
                      </li>
        </ul>
        </template>
            </span>
         </p>
        <ul v-if="event.itens" class="itens">
          <li v-for="(item,index) in event.itens" v-html="item" :key="index"></li>
        </ul>
        <span class="cd-date">Data: {{event.modifiedDate  | dateTime}}</span>
      </div>
    </div>
  </section>
</template>
<script>
import { getHistorico } from "../service/dividaAtivaService";
export default {
 
  data() {
    return {
      historicoAuto: {
        events: [],
        idAuto: ""
      }      
    };
  },
  methods: {
    clickPesquisar() {
        getHistorico(this.historicoAuto.idAuto).then(response => {
            this.historicoAuto.events = response.data;
        });
    },
    clickReadMore(){
        getHistorico(this.historicoAuto.idAuto).then(response =>{
            this.historicoAuto.events.fileContent = response.data;
        })
    }
   }
};
</script>


<style >
.fontes {
  font-weight: 500;
  font-family: "Blippo", fantasy;
  color: #5e5e5e;
  text-transform: uppercase;
}
.botao {
  font-weight: bold;
  font-family: monospace;
  color: #d1d1d1;
  text-transform: uppercase;
}
</style>