import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from '../pages/AdminDashboard.vue';
import Homepage from '../pages/Homepage.vue';
import Assetory from '../pages/Assetory.vue';
import HomepageAutoScaling from '../pages/HomepageAutoScaling.vue';
import About from '../pages/About.vue';
import Collections from '../pages/Collections.vue';
import Collection from '../pages/Collection.vue';
import Asset from '../pages/Asset.vue';
import Artists from '../pages/Artists.vue';
import Artist from '../pages/Artist.vue';
import Events from '../pages/Events.vue'; 
import Event from '../pages/Event.vue';
import AccessibilityStatement from '../pages/AccessibilityStatement.vue'
import TermsOfUse from '../pages/TermsOfUse.vue'
import SubmitYourWorkForm from '../pages/SubmitYourWorkForm.vue';
// import Submissions from '../pages/Submissions.vue';



const routes = [
  { path: '/', component: Homepage, name: 'Homepage'},
  {path: '/admin', component: AdminDashboard, name: 'Admin Dashboard' },
  {path: '/assetory', component: Assetory, name: 'Assetory'},
  { path: '/homeautoscaling', component: HomepageAutoScaling, name: 'Homepage Auto Scaling' },
  {path: '/about', component: About, name: 'About'},
  {path: '/accessibility-statement', component: AccessibilityStatement, name: 'Accessibility Statement'},
  {path: '/terms-of-use', component: TermsOfUse, name: 'Terms of Use'},
  { path: '/collections', component: Collections, name: 'Collections' },
  { path: '/collection/:id',  component: Collection, name: 'Collection', props: true },
  // { path: '/asset/:collectionId/:id', component: Asset, name: 'Asset', 
  //   props: (route) => ({
  //     collectionId: Number(route.params.collectionId), // Convert collectionId to a number
  //     id: Number(route.params.id), // Convert id to a number
  //   }),
  //  }, 
  {path: '/artists', component: Artists, name: 'Artists' }, 
  { path: '/artist/:slug',  component: Artist, name: 'Artist', props: true },

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
  {path: '/event/:slug', component: Event, name: 'Event', props: true}, 
  {path: '/submit-your-work', component: SubmitYourWorkForm, name: 'Submit Your Work Form'},
  // {path: '/submissions', component: Submissions, name: 'Submissions'},

]


const base =
  import.meta.env.MODE === 'github'
    ? '/assetory/'
    : import.meta.env.MODE === 'mcmaster'
    ? '/'
    : './'

const router = createRouter({
  history: createWebHistory(base),
  routes,
})

export default router