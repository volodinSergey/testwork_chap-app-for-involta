import { createApp } from 'vue'

import { VueTelegramPlugin } from 'vue-tg'

import App from './App.vue'

createApp(App).use(VueTelegramPlugin).mount('#app')
