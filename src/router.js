import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import Stations from '@/pages/Stations.vue'
import CurrentStation from '@/pages/CurrentStation.vue'
import Favourite from '@/pages/Favourite.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/city/:city',
      name: 'Stations',
      component: Stations,
      props: true
    },
    {
      path: '/city/:city/:station',
      name: 'CurrentStation',
      component: CurrentStation,
      props: true
    },
    {
      path: '/favourite',
      name: 'Favourite',
      component: Favourite
    }
  ]
})