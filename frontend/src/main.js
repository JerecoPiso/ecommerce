import { createApp } from 'vue'
import router from './router'
import axios from 'axios'
import App from './App.vue'
import store from './vuex'
import VueCookies from 'vue-cookies'

const app = createApp(App)

app.use(store)
app.use(VueCookies, {
    expires: '1d',
    path: '/',
    domain: '',
    secure: true,
    sameSite: 'Lax'
})
axios.defaults.baseURL = "http://localhost:5000/"
// axios.defaults.withCredentials = true
app.config.globalProperties.$axios = axios;

app.use(router)

app.mount('#app')
