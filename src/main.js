import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router.js'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueLocalStorage from 'vue-localstorage'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw', // api key a caso, in futuro metterne una vera
    libraries: 'places', 
  },
  installComponents: true
})
Vue.use(VueLocalStorage);
Vue.component('google-map', VueGoogleMaps.Map);
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
