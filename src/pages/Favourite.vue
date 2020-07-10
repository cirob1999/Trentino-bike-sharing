<template>
  <div>
    <navbar></navbar>
    <div v-if="this.preferiti === null" style="text-align:center">
      <h3>Non ci sono preferiti.</h3>
    </div>
    <div v-else>
      <h3 style="text-align:center">Lista dei preferiti:</h3>
      <br>
      <v-card
        max-width="500"
        class="mx-auto"
      >
        <v-list>
          <v-list-item
            v-for="preferito in this.preferiti"
            :key="preferito.name"
          >
            <v-list-item-icon>
              <v-icon 
                v-on:click="rimuoviPreferito(preferito.name)"
                class="red--text"
                >
                mdi-heart
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="preferito.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn v-on:click="router.push('city/'+preferito.city+'/'+preferito.id)" 
                    text 
                    class="green--text">
                    APRI
              </v-btn>  
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
  // valgono piu o meno gli stessi commenti inseriti in CurrentStation.vue

  import Navbar from '../components/Navbar.vue';
  import router from '../router.js';
  import Vue from 'vue';
  import DataService from '@/dataService.js'

  export default {
    name: 'Favourite',
    components: {
        'navbar': Navbar
    },
    data: function() {
      let data = [];
      let preferiti = this.getPreferiti();
      return {
        data,
        router,
        preferiti
      };
    },
   // methods:{
      //getPreferiti(){
        //let localPreferiti = Vue.localStorage.get('preferiti');
       // if (localPreferiti === null){
        //  return null;
        //}
       // return JSON.parse(localPreferiti);
     // },
     // removePreferito(preferito){
        //let localPreferiti = Vue.localStorage.get('preferiti');
      //  if (localPreferiti === null){
       //   return;
      //  }
      //  let currentPreferiti = JSON.parse(localPreferiti);
      //  currentPreferiti = currentPreferiti.filter(function( a ) {
      //    return a.name !== preferito;
      //  });
      //  Vue.localStorage.set('preferiti', JSON.stringify(currentPreferiti));
      //  this.preferiti = this.getPreferiti();
      }
    //}
  //}
</script>