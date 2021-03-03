export default {
    namespaced: true,
    state: {
        carts: []
    },
    mutations: {
        insert: function (state, payload) {
            state.carts.push({
                id: payload.id,
                title: payload.title,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                quantity: 1
            })
        },
        update: function (state, payload) {
            let idx = state.carts.indexOf(payload)
            state.carts.splice(idx, 1, {
                id: payload.id,
                title: payload.title,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                quantity: payload.quantity
            })
            if (payload.quantity <= 0) {
                state.carts.splice(idx, 1)
            }
        }
    },
    actions: {
        add: function ({
            state,
            commit
        }, payload) {
            let cartItem = state.carts.find(item => item.id === payload.id)
            if (!cartItem) {
                commit('insert', payload)
            } else {
                cartItem.quantity += 1
                commit('update', cartItem)
            }
        }
    },
    getters: {
        carts: function (state) {
            return state.carts
        },
        count: function (state) {
            return state.carts.length
        }
    },
    modules: {}
}