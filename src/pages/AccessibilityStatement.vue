<script>
import Topbar from '../components/Topbar.vue'; // Import the Topbar component
import BackTopButton from '../widgets/BackTopButton.vue';
import Footer from '../components/Footer.vue'; // Import the Footer component


export default {
  components: {
    Topbar, // Register the Topbar component
    BackTopButton,
    Footer, // Register the Footer component    
  },

  data() {
    return {
      currentTheme: { theme: 'default' }
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

    
    <BackTopButton />

    <!-- footer -->

    <Footer :theme="currentTheme" />
  </div>
</template>