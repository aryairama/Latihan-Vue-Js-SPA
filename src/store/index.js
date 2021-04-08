import Vue from 'vue'
import Vuex from 'vuex'
import Cart from './Cart' 
import Alert from './Alert'
import Auth from './Auth'
import Dialog from './Dialog'
import Region from './Region'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)
const vuexPersist = new VuexPersist({
  key: "BookStore",
  storage: localStorage,
})
export default new Vuex.Store({
  plugins:[vuexPersist.plugin],
  state: {
    prevUrl: '',
    payment: []
  },
  mutations: {
    setPrevUrl: function (state, payload) {
      state.prevUrl = payload
    },
    setPayment: function (state, payload) {
      state.payment =  payload
    }
  },
  actions: {
    setPrevUrl: function ({ commit }, payload) {
      commit('setPrevUrl',payload)
    },
    setPayment: function ({ commit }, payload) {
      commit('setPayment',payload)
    }
  },
  getters: {
    prevUrl: function (state) {
      return state.prevUrl
    },
    payment: function (state) {
      return state.payment
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
