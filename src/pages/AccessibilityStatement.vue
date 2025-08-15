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

<style scoped>

/* Make the page container take the full height */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* full viewport height */
}

/* Accessibility statement should grow to fill available space */
.accessibility-statement {
  flex: 1; /* takes up remaining space */
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: var(--primary-color);
  padding: 4rem;  
  font-size: 1.5rem;  
}

.accessibility-statement h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.accessibility-statement p {
  font-size: 1.5rem;
  /* line-height: 1.5; */
  text-align: justify;
  
}

</style>


<template>
  <div class="page-container">

    <!-- top bar -->
    <Topbar @theme-changed="updateTheme" />

    
    
    <div class="accessibility-statement">
      <h2>Accessibility Statement</h2>
    
      <!-- Replace with accessibility statement below -->
    <p>
      This is the accessibility statement for our website. <br>
      We are committed to ensuring digital accessibility for people with disabilities.</br>
      We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
    </p>
      
    </div>
    
    <BackTopButton />

    <!-- footer -->

    <Footer :theme="currentTheme" />
  </div>
</template>