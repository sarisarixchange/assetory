import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../pages/Homepage.vue';
import Collections from '../pages/Collections.vue';
import Collection from '../pages/Collection.vue';
import Asset from '../pages/Asset.vue';

const routes = [
  { path: '/', component: Homepage, name: 'Homepage' },
  { path: '/collections', component: Collections, name: 'Collections' },
  { path: '/collection/:id', component: Collection, name: 'Collection' },
  { path: '/Asset', component: Asset, name: 'Asset' },
]

const router = createRouter({
  history: createWebHistory('/sari-sari-website/'), // Set the base path here
  routes,
});

export default router;