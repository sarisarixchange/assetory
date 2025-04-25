import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../components/Homepage.vue';
import Collections from '../components/Collections.vue';
import Collection from '../components/Collection.vue';

const routes = [
  { path: '/', component: Homepage, name: 'Homepage' },
  { path: '/collections', component: Collections, name: 'Collections' },
  {path: '/collection/:id', component: Collection, name: 'Collection' },  // Dynamic route
];

const router = createRouter({
// If Deploying to the Root of a Domain (e.g., https://example.com/):
// Change it to history: createWebHistory() with no base path.
// This is the correct setup for apps served from the root.
//   history: createWebHistory(),
history: createWebHistory('/sari-sari-website/'), // Set the base path here
  routes,
});

export default router;