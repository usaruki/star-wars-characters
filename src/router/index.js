import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Results from '../views/Results.vue'
import Character from '../views/Character.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/search/:query?/:page?', name: 'Results', component: Results },
  { path: '/search//:page?', name: 'ResultsEmpty', component: Results },
  { path: '/character/:character?', name: 'Character', component: Character }
]

export default new VueRouter({ 
  mode: 'history',
  routes 
})
