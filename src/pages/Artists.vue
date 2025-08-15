<script>
import Topbar from '../components/Topbar.vue'; // Import the Topbar component
import PageBackground from '../components/PageBackground.vue';
import GalleryGrid from '../components/GalleryGrid.vue'; // Import the Grid component
import BackTopButton from '../widgets/BackTopButton.vue';
import Footer from '../components/Footer.vue'; // Import the Footer component
import astistsData from '../data/artists.json';



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
      currentTheme: { theme: 'default' }, // Default theme
      pageBackgroundImage: 'page-background-image-default',
      galleryName: 'Artists',
      galleryDescription: 'Explore artists & assets.',
      basePath: 'artists/',
      routeName: 'Artist',
      data: astistsData, 
      // backgrounds
      backgrounds: {
        //  default: 'backgrounds/background-artists-page-default.svg',
         default: './backgrounds/background-artists-page-default.svg',
         grayscale: './backgrounds/background-artists-page-grayscale.svg',
         highContrast: './backgrounds/background-artists-page-high-contrast.svg',
         wcag: './backgrounds/background-artists-page-default.svg'
  }
      
    }
  },

  methods: {
    updateTheme(payload) {
      this.currentTheme = payload; // Update the theme
    }



  }
  // do not erase curly brackets below
}

</script>

<style scoped>

.page-container {
  display: flex;
  flex-direction: column;
  position: relative;
  
}

</style>

<template>
  <div class="page-container">

    <!-- top bar -->
    <Topbar @theme-changed="updateTheme" />

    <!-- background image -->
    <PageBackground
    :theme="currentTheme.theme"
    :backgrounds="backgrounds"
    top="0"
    left="0"
    width="28.681vw"
    height="40.091vw"
    backgroundSize= ""
    backgroundPosition= 'left'
  />


    <!-- Artists Grid -->
    <GalleryGrid 
    :galleryName="galleryName" 
    :galleryDescription="galleryDescription" 
    :items="data" 
    :basePath="basePath"
    :routeName="routeName"
     />


    <BackTopButton />

    <!-- footer -->

    <Footer :theme="currentTheme" />
  </div>
</template>