<template>
  <div>
    <navbar></navbar>
    <div style="text-align:center">
      <h3 class="display-2">{{this.title}}</h3>
    </div>
    <br>
    <br>
    <br>
    <div v-if="this.errored" style="text-align:center">
      <h3>Controlla la tua connessione</h3>
    </div>
    <div v-else-if="this.data.length !== 0 && !this.errored">
      <v-flex d-flex>
        <v-layout wrap>
          <v-flex md4 xs12 sm6 v-for='station in this.data' :key='station.id'>
            <v-card
              class="mx-auto"
              max-width="344"
              elevation="8"
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{station.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{station.address}}</v-list-item-subtitle>
                  <b><v-list-item-subtitle>Totale posti disponibili: {{station.totalSlots}}</v-list-item-subtitle></b>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-btn v-on:click="router.push(data.city+'/'+station.id)" text class="green--text">MOSTRA</v-btn>
              </v-card-actions>
            </v-card>
            <br>
          </v-flex>
        </v-layout>
      </v-flex>
    </div>
    <div v-else-if="this.data.length === 0 && !this.errored" style="text-align:center">
      <h3>Dati non presenti</h3>
    </div>
  </div>
</template>

<script>
  import Navbar from '../components/Navbar.vue'
  import cities from '@/assets/city.json'
  import axios from 'axios'; 
  import router from '../router.js'

  export default {
    name: 'Stations',
    components: {
        'navbar': Navbar
    },
    props: {
      city: {
        type: String
      }
    },
    data: function() {
      // legge il contenuto dal file city.json e mi restituisce il nome della città associata all'id 
      let title = cities.filter(a=>a.id==this.city)[0].city;
      let data = [];
      let errored = false;
      return {
        cities,
        title,
        data,
        errored,
        router
      };
    },
    mounted (){
      axios
      .get('https://os.smartcommunitylab.it/core.mobility/bikesharing/'+this.city)
      .then(response => {
        // this.data contiene tutte le informazioni prese dal server
        // dettagli contenuto: https://os.smartcommunitylab.it/openservice/services/2
        this.data = response.data;
        this.data.city= this.city;
        return this.data;
      })
      .catch(error => {
          console.log(error);
          this.errored = true;
          return this.errored;
      })
      .finally(() => this.loading = false)
    }
  }
</script>