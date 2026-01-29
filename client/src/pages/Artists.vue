<script>
import Topbar from '../components/Topbar.vue'; // Import the Topbar component
import PageBackground from '../components/PageBackground.vue';
import GalleryGrid from '../components/GalleryGrid.vue'; // Import the Grid component
import BackTopButton from '../widgets/BackTopButton.vue';
import Footer from '../components/Footer.vue'; // Import the Footer component
import astistsData from '../data/artists.json';
import axios from 'axios';



export default {
  components: {
    PageBackground,
    Topbar, // Register the Topbar component
    GalleryGrid, // Register the Grid component
    BackTopButton,
    Footer, // Register the Footer component
  },

  data() {
    return {
      interactiveMode: false,
      currentTheme: { theme: 'default' }, // Default theme      
      galleryName: 'Artists',
      galleryDescription: 'Explore artists & assets.',
      basePath: 'artists/',
      routeName: 'Artist',
      data: [],
      // data: astistsData,
      // backgrounds
      backgrounds: {
        //  default: 'backgrounds/background-artists-page-default.svg',
        default: './backgrounds/background-artists-blue.svg',
        grayscale: './backgrounds/background-artists-page-grayscale.svg',
        highContrast: './backgrounds/background-artists-page-high-contrast.svg'
      }

    }
  },

  mounted() {
    this.loadInteractiveMode();
    this.fetchArtists();
  },

  methods: {
    async fetchArtists() {
      try {
        const response = await axios.get('http://localhost:3000/api/artists');
        this.data = response.data;
      } catch (error) {
        console.error('Error fetching artists from DB:', error);
      }
    },
    updateTheme(payload) {
      this.currentTheme = payload; // Update the theme
    },

    loadInteractiveMode() {
      try {
        const savedSettings =
          JSON.parse(localStorage.getItem('accessibilitySettings')) || {};
        this.interactiveMode = savedSettings.interactiveMode ?? false;
      } catch (error) {
        console.error('Error in loadInteractiveMode:', error);
      }
    },

  }
  // do not erase curly brackets below
}

</script>

<style scoped>
/* Make the page container take the full height */
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
    <Topbar :interactive-mode="interactiveMode" @theme-changed="updateTheme" pageTitle="Artists Page" />

    <div class="grid">

      <!-- background image -->
      <PageBackground :theme="currentTheme.theme" :backgrounds="backgrounds" top='0rem' left='0%'
        transform='translateX(0%)' width='100%' height='100%' backgroundSize='100%' backgroundPosition='center' />


      <!-- Artists Grid -->
      <GalleryGrid :galleryName="galleryName" :galleryDescription="galleryDescription" :items="data"
        :basePath="basePath" :isArtistsPage="true" :routeName="routeName" />

    </div>
    <BackTopButton />

    <!-- footer -->

    <Footer :theme="currentTheme" />
  </div>
</template>