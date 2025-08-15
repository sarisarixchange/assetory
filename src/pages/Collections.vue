<script>
import Topbar from '../components/Topbar.vue'; // Import the Topbar component
import PageBackground from '../components/PageBackground.vue';
import GalleryGrid from '../components/GalleryGrid.vue'; // Import the Grid component
import BackTopButton from '../widgets/BackTopButton.vue';
import Footer from '../components/Footer.vue'; // Import the Footer component
import collectionsData from '../data/collections.json';


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
      galleryName: 'Collections',
      galleryDescription: 'Curated assets created by the community.',
      basePath: 'collections/',
      routeName: 'Collection',
      data: collectionsData, 
      backgrounds: {
         default: './backgrounds/background-collections-page-default.svg',
         grayscale: './backgrounds/background-collections-page-grayscale.svg',
         highContrast: './backgrounds/background-collections-page-high-contrast.svg',
         wcag: './backgrounds/background-collections-page-default.svg'
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

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* full viewport height */
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

      <!-- background image  -->
      <PageBackground
    :theme="currentTheme.theme"
    :backgrounds="backgrounds"
    top="0"
    left="0"
    width="100%"
    height="428.17px"
    backgroundSize= "contain"
    backgroundPosition= 'left'
  />

    <!-- Collections Grid -->
    <GalleryGrid :galleryName="galleryName" 
    :galleryDescription="galleryDescription" 
    :items="data" 
    :basePath="basePath"
    :routeName="routeName" />
</div>

    <BackTopButton />

    <!-- footer -->

    <Footer :theme="currentTheme" />
  </div>
</template>