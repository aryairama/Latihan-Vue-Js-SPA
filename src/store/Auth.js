export default {
    namespaced : true,
    state: {
        user : {}
    },
    mutations: {
        set: function (state, payload) {
            state.user = payload
        }
    },
    actions: {
        set: function ({ commit }, payload) {
            commit('set',payload)
        }
    },
    getters: {
        user: function (state) {
            return state.user
        },
        guest: function (state) {
            return Object.keys(state.user).length === 0
        }
    }
}