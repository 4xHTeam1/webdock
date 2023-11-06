import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import adminStore from './stores/adminstore'
import authStore from './stores/authstore'
import searchStore from './stores/searchstore'

const app = createApp(App).use(bootstrap)

app.use(router)
app.use(adminStore)
app.use(authStore)
app.use(searchStore)

app.mount('#app')
