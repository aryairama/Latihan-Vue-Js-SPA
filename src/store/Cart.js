export default {
    namespaced: true,
    state: {
        carts: []
    },
    mutations: {
        //tambah barang
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
        //update data keranjang
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
        },
        //bacth update cart
        set: function (state, payload) {
            state.carts = payload
        }
    },
    actions: {
        add: function ({ state,commit }, payload) {
            let cartItem = state.carts.find(item => item.id === payload.id)
            if (!cartItem) {
                commit('insert', payload)
            } else {
                cartItem.quantity += 1
                commit('update', cartItem)
            }
        },
        //remove cart pada item tertentu
        remove: function ({ state, commit }, payload) {
            let cartItem = state.carts.find(item => item.id === payload.id)
            if (cartItem) {
                cartItem.quantity--
                commit('update',cartItem)
            }
        },
        //bacth update carts
        set: function ({commit}, payload) {
            commit('set',payload)
        }
    },
    getters: {
        carts: function (state) {
            return state.carts
        },
        count: function (state) {
            return state.carts.length
        },
        //menghitung total harga
        totalPrice: function (state) {
            let total = 0
            state.carts.forEach(function (cart) {
                total += cart.price * cart.quantity
            })
            return total
        },
        //total jumlah barang
        totalQuantity: function (state) {
            let total = 0
            state.carts.forEach(function (cart) {
                total += cart.quantity
            })
            return total
        },
        //total berang barang
        totalWeight: function (state) {
            let total = 0
            state.carts.forEach(function (cart) {
                total += cart.weight
            })
            return total
        }
    },
    modules: {}
}