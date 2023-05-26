import { createStore } from 'vuex'

import createPersistedState from "vuex-persistedstate";
const store = createStore({
    state: {
        user: null,
        token: null,
        cartitem: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        },
        setCartitem(state, cartitem){
            state.cartitem = cartitem
        }
    },
    actions: {

    },
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        },
    },
    plugins: [createPersistedState()],
})

export default store;