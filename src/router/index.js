import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../pages/Homepage.vue';
import Collections from '../pages/Collections.vue';
import Collection from '../pages/Collection.vue';
import Asset from '../pages/Asset.vue';
import Artists from '../pages/Artists.vue';
import Artist from '../pages/Artist.vue';


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
      artistAssetId: Number(route.params.artistAssetId), 
      fromArtist: route.query.fromArtist === 'true', // Convert query parameter to boolean
      collectionId: route.query.collectionId ? Number(route.query.collectionId) : null, // Convert collectionId to a number if it exists
    }),
  }
]


const router = createRouter({
  history: createWebHistory('/assetory/'), // Set the base path here
  routes,
});

export default router;