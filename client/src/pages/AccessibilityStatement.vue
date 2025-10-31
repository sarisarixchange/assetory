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
      interactiveMode: false, // 👈 this must exist
      currentTheme: { theme: 'default' }
    }
  },

    mounted() {
        this.loadInteractiveMode();
    },

  methods: {
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
    <Topbar :interactive-mode="interactiveMode" @theme-changed="updateTheme" />

    
    
    <div class="accessibility-statement">
      <h2>Accessibility Statement</h2>
    
      <!-- Replace with accessibility statement below -->
    <p>
      Our website is still a work in progress. We are working with our accessibility consultant to ensure compliance with accessibility standards and will publish a full accessibility statement once the website is complete. <br>
      </br>
      If you have any questions or feedback regarding the accessibility of our website, please fill out the following Google Form: <a href="https://forms.gle/3YJm5f6b6Uu4z1Zt7" target="_blank" rel="noopener">Accessibility Feedback Form</a>
    </p>
      
    </div>
    
    <BackTopButton />

    <!-- footer -->

    <Footer :theme="currentTheme" />
  </div>
</template>