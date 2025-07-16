<script>
import Topbar from '../components/Topbar.vue'; // Import the Topbar component
import GalleryGrid from '../components/GalleryGrid.vue'; // Import the Grid component
import BackTopButton from '../widgets/BackTopButton.vue';
import Footer from '../components/Footer.vue'; // Import the Footer component
import collectionsData from '../data/collections.json';


export default {
  components: {
    Topbar, // Register the Topbar component
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
      data: collectionsData
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

<style></style>


<template>
  <div class="page-container">

    <!-- top bar -->
    <Topbar @theme-changed="updateTheme" />

    <!-- Collections Grid -->
    <GalleryGrid :galleryName="galleryName" 
    :galleryDescription="galleryDescription" 
    :items="data" 
    :basePath="basePath"
    :routeName="routeName" />

    <BackTopButton />

    <!-- footer -->

    <Footer :theme="currentTheme" />
  </div>
</template>