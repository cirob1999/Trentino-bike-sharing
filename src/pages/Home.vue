<template>
  <div>
    <navbar></navbar>
    <v-flex d-flex>
      <v-layout wrap>
        <v-flex md4 xs12 sm6 v-for='city in this.cities' :key='city.id'>
          <v-card
            class="mx-auto"
            max-width="344"
            elevation="8"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{city.city}}</v-list-item-title> 
                <!-- citi.city significa che prendo ogni città (city) dal file city -->
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-btn v-on:click="router.push('city/'+city.id)" text class="green--text">APRI</v-btn>
            </v-card-actions>
          </v-card>
          <br>
        </v-flex>
      </v-layout>
    </v-flex>
  </div>
</template>
<script>
  import Navbar from '../components/Navbar.vue'
  // importo il contenuto dal json city
  import cities from '@/assets/city.json'
  import router from '../router.js'

  export default { 
    name: 'Home',
    components: {
        'navbar': Navbar
    },
    data: function() {
      return {cities, router}
    }
  }
</script>