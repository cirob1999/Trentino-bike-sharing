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
          <!-- <v-list-item
            v-for="preferito in this.preferiti"
            :key="preferito.name"
          -->
          <v-list-item v-for="preferito in this.fav" :key="preferito.nome">
            <v-list-item-icon>
              <!-- qui va modificato qualcosa? -->
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
//import Vue from 'vue';
import DataService from "@/dataService.js";

export default {
  name: "Favourite",
  components: {
    navbar: Navbar
  },
  data: function() {
    let data = [];
    //let preferiti = this.getPreferiti();
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
    this.$nextTick(function () {
      if (this.fav.length > 0){
        this.presenzaPreferiti = true;
      }else{
        this.presenzaPreferiti = false;
      }
      //this.presenzaPreferiti = (this.fav.length > 0) ? false : true;
    })
  },
  created: function() {
    this.load();
  },
  methods: {
    load: function() {
      this.loading = true;

      DataService.getPreferito().then(data => {
        // +++++ CONTROLLO CHE SIANO STATI STROVATI DEI PREFERITI NEL DB +++++
        if (data.length > 0) {
          this.fav = data;
          console.log(this.fav);

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
          this.fav.splice(this.fav.findIndex(item => item.id === id), 1)
        } 
      }
    }
  }
};
</script>