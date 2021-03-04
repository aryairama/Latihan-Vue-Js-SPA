import Vue from 'vue'
import Vuex from 'vuex'
import Cart from './Cart' 
import Alert from './Alert'
import Search from './Search'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    Cart,
    Alert,
    Search
  }
})
