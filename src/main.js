import { createApp } from 'vue'
import App from './App.vue'

// import HomeComplete from './components/HomeComplete.vue'
import Homepage from './components/Homepage.vue'

const app = createApp(App)
// app.component('home-complete', HomeComplete)
app.component('homepage', Homepage)
app.mount('#app')