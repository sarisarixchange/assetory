<script >
import Footer from '../components/Footer.vue'; // Import the Footer component
import Topbar from '../components/Topbar.vue'; // Import the Topbar component

export default {
  components: {
    Footer, // Register the Footer component
    Topbar, // Register the Topbar component
 },
  data() {
        return {
      currentTheme: { theme: 'default' }, // Default theme
    } 
},
methods: {

updateTheme(payload) {
this.currentTheme = payload; // Update the theme
},

 // do not erase curly brackets below
}
}

</script>

<template>
    <!-- top bar -->
    <Topbar @theme-changed="updateTheme" />

    <!-- footer -->

    <Footer :theme="currentTheme"/>
</template>