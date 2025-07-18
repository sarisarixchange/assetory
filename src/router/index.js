import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../pages/Homepage.vue';
import Collections from '../pages/Collections.vue';
import Collection from '../pages/Collection.vue';
import Asset from '../pages/Asset.vue';
import Artists from '../pages/Artists.vue';
import Artist from '../pages/Artist.vue';
import Events from '../pages/Events.vue'; 
import Event from '../pages/Event.vue';


const routes = [
  { path: '/', component: Homepage, name: 'Homepage' },
  { path: '/collections', component: Collections, name: 'Collections' },
  { path: '/collection/:id',  component: Collection, name: 'Collection', props: true },
  // { path: '/asset/:collectionId/:id', component: Asset, name: 'Asset', 
  //   props: (route) => ({
  //     collectionId: Number(route.params.collectionId), // Convert collectionId to a number
  //     id: Number(route.params.id), // Convert id to a number
  //   }),
  //  }, 
  {path: '/artists', component: Artists, name: 'Artists' }, 
  { path: '/artist/:id',  component: Artist, name: 'Artist', props: true },

  { path: '/asset/:artistId/:artistAssetId', component: Asset, name: 'Asset', 
    props: (route) => ({
      artistId: Number(route.params.artistId),
      // artistAssetId: Number(route.params.artistAssetId), 
      artistAssetId: route.params.artistAssetId,
      fromPage: route.query.fromPage || null, 
      pageId: route.query.pageId ? Number(route.query.pageId) : null, // Convert collectionId to a number if it exists
    }),
  },
  {path: '/events', component: Events, name: 'Events'}, 
  {path: '/event/:id', component: Event, name: 'Event', props: true}
]


const router = createRouter({
  history: createWebHistory('/assetory/'), // Set the base path here
  routes,
});

export default router;