export default {
    namespaced: true,
    state: {
        status: false,
        color: 'success',
        text : ''
    },
    mutations: {
        set: function (state, payload) {
            state.status = payload.status
            state.color = payload.color
            state.text = payload.text
        }
    },
    actions: {
        set: function ({ commit }, payload) {
            commit('set',payload)
        }
    },
    getters: {
        status: function (state) {
            return state.status
        },
        color: function (state) {
            return state.color
        },
        text: function (state) {
            return state.text
        }
    }
}