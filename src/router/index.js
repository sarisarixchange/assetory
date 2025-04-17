import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../components/Homepage.vue';
import Collections from '../components/Collections.vue';

const routes = [
  { path: '/', component: Homepage, name: 'Homepage' },
  { path: '/collections', component: Collections, name: 'Collections' },
];

const router = createRouter({
//   history: createWebHistory(),
history: createWebHistory('/sari-sari-website/'), // Set the base path here
  routes,
});

export default router;