<template>
  <div>
    <navbar></navbar>
    <div style="text-align:center">
      <h3 class="display-2">{{this.data.name}}</h3>
    </div>
    <br>
    <br>
    <br>
    <!-- se this.errored è true vuol dire che c'è un problema con l'accesso all'api-->
    <div v-if="this.errored" style="text-align:center">
      <h3>Controlla la tua connessione di rete</h3>
    </div>
    <!-- se this.data.lenght è diverso da 0 (quindi il contenuto dell'array this.data contiene qualcosa)
         e non ci sono errori (!this.errored)
         allora mostra tutto il contenuto
    -->
    <div v-else-if="this.data.length !== 0 && !this.errored">
      <v-alert
        v-model="alert"
        dismissible
        color="green"
        border="left"
        elevation="2"
        colored-border
        icon="mdi-share-variant"
        style="margin:1% 15%"
      >
        <router-link :to="router.currentRoute.fullPath">{{this.currentUrl}}</router-link>
      </v-alert>
      <v-card
          class="mx-auto"
          max-width="70%"
        >
        <!-- router.push è tipo <router-link> per fare il redirect -->
        <v-card-actions>
          <v-btn
            color="green"
            text
            v-on:click="router.push({name: 'Stations', params: {city: previousCity}})"
          >
            INDIETRO
          </v-btn>
          <v-spacer></v-spacer>
          <!-- se preferiti è true allora aggiunge la classe red-text all'icona 
               v-bind:class -> collego la classe css alla variabile preferiti
                               se preferiti è true mette il cuoricino rosso
          -->
          <v-btn 
            icon
            v-bind:class="{'red--text': preferiti}"
            v-on:click="dataService.switchPreferiti()"
            >
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn 
            icon
            v-on:click="alert = true"
          >
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </v-card-actions>
        <div style="text-align:center">
          <v-card-subtitle class="pb-0">Posti totali: {{this.data.totalSlots}}</v-card-subtitle>
          <v-card-text class="text--primary">
            <div style="color:green"><b>Posti disponibili: {{this.data.slots}}</b></div>
            <div style="color:red"><b>Posti occupati: {{this.data.bikes}}</b></div>
          </v-card-text>
        </div>
        <google-map :center="{lat: this.data.position[0], lng: this.data.position[1]}" :zoom="18" style="width: 100%; height: 500px">
          <GmapMarker
              :position="{lat: this.data.position[0], lng: this.data.position[1]}"
              :clickable="true"
              :draggable="true"
              @click="center=m.position"
            />
        </google-map>
      </v-card>
    </div>
    <div v-else-if="this.data.length === 0 && !this.errored" style="text-align:center">
      <h3>Dati non presenti</h3>
    </div>
    <br>
  </div>
</template>
<script>
  import Navbar from '../components/Navbar.vue'
  import axios from 'axios'
  import router from '../router.js'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import dataService from '../dataService.js'
  //import Vue from 'vue'
  
  export default {
    name: 'CurrentStation',
    components: {
        'navbar': Navbar,
        'google-map': VueGoogleMaps.Map
    },
    props: {
      city: {
        type: String
      },
      station: {
        type: String
      }
    },
    data: function() {
      let data = [];
      let errored = false;
      let previousCity = this.city;
      let alert = false;
      let preferiti = false;
      let currentUrl = window.location.origin + '/' + router.currentRoute.fullPath;
      return {
        data,
        errored,
        router,
        previousCity,
        alert,
        currentUrl,
        preferiti
      };
    },
    mounted (){
      axios
      .get('https://os.smartcommunitylab.it/core.mobility/bikesharing/'+this.city)
      .then(response => {
        //response.data contiene i dati raw dal server quindi nome, indirizzo, posizione ecc.
        // dettagli contenuto: https://os.smartcommunitylab.it/openservice/services/2
        this.data = response.data;
        //console.log(this.data);
        this.data = JSON.parse(JSON.stringify(this.data));
        // restituisce parte dell'array dove l'id è uguale al nome della stazione passata dall'url
        this.data = this.data.filter(a=>a.id==this.station)[0]; 
        // this.$nextTick permette di eseguire codice dopo aver aggiornato dei dati 
        // https://stackoverflow.com/questions/47634258/what-is-nexttick-or-what-does-it-do-in-vuejs
        //questo va modificato
        return this.data;
      })
      .catch(error => {
          console.log(error);
          console.log (JSON.stringify(error));
          this.errored = true;
          return this.errored;
      })
      .finally(() => this.loading = false)
    },

    created: function(){
      dataService.checkIfPreferito();
    },
  }
</script>