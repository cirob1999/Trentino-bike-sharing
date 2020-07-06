<template>
  <nav>
    <v-toolbar 
      flat 
      color="green" >
      <!-- il drawer viene mostrato se drawer è true, quando si clicca sull'icona, cambia il valore -->
      <v-app-bar-nav-icon @click="drawer = !drawer"  class="white--text"></v-app-bar-nav-icon>
      <router-link to='/' style="text-decoration:none"><v-toolbar-title class="white--text">Trentino Bike Sharing</v-toolbar-title></router-link>
    </v-toolbar>
    <v-navigation-drawer 
      temporary
      absolute
      v-model="drawer" >
      <v-list
        dense
        nav
      >
        <router-link to='/' style="text-decoration:none">
          <v-list-item
            link
          >
            <v-list-item-icon>
              <v-icon>location_city</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Città</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to='/favourite' style="text-decoration:none">
          <v-list-item
            link
          >
            <v-list-item-icon>
              <v-icon>star</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Preferiti</v-list-item-title>
            </v-list-item-content>
            
          </v-list-item>
        </router-link>

        <router-link to='/' style="text-decoration:none">
          <v-list-item
            link
          >
            <v-list-item-icon>
              <v-icon>info</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Info</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <br><v-spacer></v-spacer>
  </nav>
</template>
<script>
  // drawer è chiuso anziche sempre aperto su desktop
  // perchè altrimenti si sovrappone con gli elementi degli altri componenti
  export default {
    name: 'Navbar',
    data(){
      return {
        drawer: false
      }
    }
  }
</script>