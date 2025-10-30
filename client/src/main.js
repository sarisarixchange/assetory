import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import { createPinia } from 'pinia';


const app = createApp(App);
const pinia = createPinia(); // Create a Pinia instance
app.use(pinia); // Register Pinia
app.use(router); // Use the router in the Vue app
app.mount('#app');