import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { VueTelegramPlugin } from 'vue-tg'

createApp(App).use(VueTelegramPlugin).mount('#app')
