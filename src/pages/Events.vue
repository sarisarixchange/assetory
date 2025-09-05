<script>
import Topbar from '../components/Topbar.vue'; // Import the Topbar component
import GalleryGrid from '../components/GalleryGrid.vue'; // Import the Grid component
import PageBackground from '../components/PageBackground.vue';
import BackTopButton from '../widgets/BackTopButton.vue';
import Footer from '../components/Footer.vue'; // Import the Footer component
import eventsData from '../data/events.json';


export default {
  components: {
    Topbar, // Register the Topbar component
    PageBackground,
    GalleryGrid, // Register the Grid component
    BackTopButton,
    Footer, // Register the Footer component    
  },

  data() {
    return {
      currentTheme: { theme: 'default' }, // Default theme
      galleryName: 'Events',
      galleryDescription: 'Community events and activities',
      basePath: 'events/',
      routeName: 'Event',
      data: eventsData,
      backgrounds: {
         default: './backgrounds/background-events-page-default.svg',
         grayscale: './backgrounds/background-events-page-grayscale.svg',
         highContrast: './backgrounds/background-events-page-high-contrast.svg',
         wcag: './backgrounds/background-events-page-default.svg'
    }
  }
  },

  methods: {
    updateTheme(payload) {
      this.currentTheme = payload; // Update the theme
    },



    // do not erase curly brackets below
  },
}

</script>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* full viewport height */
}

.grid {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>


<template>
  <div class="page-container">

    <!-- top bar -->
    <Topbar @theme-changed="updateTheme" />

    <div class="grid">
        <!-- background image -->
      <PageBackground :theme="currentTheme.theme" :backgrounds="backgrounds"
        top='3.375rem' 
        left='0%'
        transform='translateX(0%)' 
        width= '44.83081rem'
        height= '47.65975rem'
        backgroundSize='50%'
        backgroundPosition='left' />

      <!-- Collections Grid -->
      <GalleryGrid :galleryName="galleryName" :galleryDescription="galleryDescription" :items="data"
        :basePath="basePath" :routeName="routeName" :isEventsPage="true"/>
    </div>

    <BackTopButton />

    <!-- footer -->

    <Footer :theme="currentTheme" />
  </div>
</template>