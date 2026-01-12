import { createApp } from 'vue'
import CustomApp from './CustomApp.vue'
import router from './plugins/customRouter'
import './plugins/tailwind.css'

const app = createApp(CustomApp)

app.use(router)
app.mount('#app')
