<template>
  <div>
    <navbar></navbar>
    <div v-if="!presenzaPreferiti" style="text-align:center">
      <h3>Non ci sono preferiti.</h3>
    </div>
    <div v-else>
      <h3 style="text-align:center">Lista dei preferiti:</h3>
      <br />
      <v-card max-width="500" class="mx-auto">
        <v-list>
          <v-list-item v-for="preferito in this.fav" :key="preferito.nome">
            <v-list-item-icon>
              <v-icon
                v-on:click="rimuovi(preferito.id)"
                class="red--text"
              >mdi-heart</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="preferito.nome"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                v-on:click="router.push('city/'+preferito.città+'/'+preferito.id)"
                text
                class="green--text"
              >APRI</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
// valgono piu o meno gli stessi commenti inseriti in CurrentStation.vue

import Navbar from "../components/Navbar.vue";
import router from "../router.js";
import DataService from "@/dataService.js";

export default {
  name: "Favourite",
  components: {
    navbar: Navbar
  },
  data: function() {
    let data = [];
    return {
      data,
      router,
      DataService,
      preferiti: [],
      fav: [],
      presenzaPreferiti: false
    };
  },
  updated: function () {
    //nextTick permette di fare qualcosa dopo aver modificato i dati e VueJs ha aggiornato il DOM e prima che
    //il browser ha renderizzato i cambiamenti sulla pagina
    //https://stackoverflow.com/questions/47634258/what-is-nexttick-or-what-does-it-do-in-vuejs
    this.$nextTick(function () {
      if (this.fav.length > 0){
        this.presenzaPreferiti = true;
      }else{
        this.presenzaPreferiti = false;
      }
      //sintetizzato --> this.presenzaPreferiti = (this.fav.length > 0) ? false : true;
    })
  },
  created: function() {
    this.load();
  },
  methods: {
    load: function() {
      this.loading = true;

      DataService.getPreferito().then(data => {
        // Verifico che ci siano dei preferiti e trasferisco i dati in fav
        if (data.length > 0) {
          this.fav = data;
          this.presenzaPreferiti = true;
        } else {
          this.presenzaPreferiti = false;
          
        }
      });
    },
    rimuovi: function(id){
      DataService.rimuoviPreferito(id);
      for (var i=0; i < this.fav.length; i++){
        console.log(this.fav[i]);
        if (this.fav[i].id === id){
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
          this.fav.splice(this.fav.findIndex(item => item.id === id), 1)
        } 
      }
    }
  }
};
</script>