export default {
    namespaced: true,
    state: {
        provinces: [],
        cities: []
    },
    mutations: {
        setProvinces: function (state, payload) {
            state.provinces = payload
        },
        setCities: function (state, payload) {
            state.cities =  payload
        }
    },
    actions: {
        setProvinces: function ({ commit }, payload) {
            commit('setProvinces',payload)
        },
        setCities: function ({ commit }, payload) {
            commit('setCities',payload)
        }
    },
    getters: {
        provinces: state => state.provinces
        ,
        cities: state => state.cities
        
    }
}