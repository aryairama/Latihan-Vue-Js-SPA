import Vue from 'vue'
import Vuex from 'vuex'
import Cart from './Cart' 
import Alert from './Alert'
import Auth from './Auth'
import Dialog from './Dialog'
import Region from './Region'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prevUrl: ''
  },
  mutations: {
    setPrevUrl: function (state, payload) {
      state.prevUrl = payload
    }
  },
  actions: {
    setPrevUrl: function ({ commit }, payload) {
      commit('setPrevUrl',payload)
    }
  },
  getters: {
    prevUrl: function (state) {
      return state.prevUrl
    }
  },
  modules: {
    Cart,
    Alert,
    Auth,
    Dialog,
    Region
  }
})
