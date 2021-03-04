export default {
    namespaced: true,
    state: {
        dialog : false
    },
    mutations: {
        dialog: function (state, payload) {
            state.dialog = payload
        }
    },
    actions: {
        dialog: function ({ commit }, payload) {
            commit('dialog',payload)
        }
    },
    getters: {
        dialog: function (state) {
            return state.dialog
        }
    },
}