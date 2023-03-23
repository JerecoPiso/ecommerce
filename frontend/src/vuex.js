import { createStore } from 'vuex'

import  createPersistedState  from "vuex-persistedstate";
const store = createStore({
    state: {
        user: null,
        token: null,
    },
    mutations: {
         setUser(state, user) {
            state.user = user;
        },
         setToken(state, token) {
            state.token = token;
        },
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