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
  min-height: 100vh;
  /* full viewport height */
}

.accessibility-page-content {
  flex: 1;
  /* takes up remaining space */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* Accessibility statement should grow to fill available space */
.accessibility-statement {
  width: 53.5rem;
  margin: auto;
  margin-top: 1.5rem;
  flex-direction: column;
  gap: 2rem;
  color: var(--primary-color);
  padding: 4rem;
  font-size: 1.5rem;
  border-radius: 1rem;
  border: 1px solid var(--primary-color);
  background: #FFFEFA;
}

.accessibility-statement h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  border-radius: 0.5rem;
  font-family: var(--font-family-Decorative);
  border: 1px solid var(--primary-color);
  background: var(--background-color-headings);
  color: white;
}

.accessibility-statement p {
  font-size: 1.5rem;
  /* line-height: 1.5; */
  text-align: justify;
}

/* Mobile adjustments */
@media (max-width: 768px) {

  .accessibility-page-content {
    padding: 1rem;
  }

  .accessibility-statement {
    width: 100%;
    padding: 1.5rem;
  }

  .accessibility-statement h2 {
    font-size: 1.5rem;
  }

  .accessibility-statement p,
  .accessibility-statement li {
    font-size: 1.25rem;
    overflow-wrap: break-word;
  }
}
</style>


<template>
  <div class="page-container">

    <!-- top bar -->
    <Topbar :interactive-mode="interactiveMode" @theme-changed="updateTheme" />


    <div class="accessibility-page-content">
      <div class="accessibility-statement">
        <h2>Accessibility Statement</h2>

        <!-- Replace with accessibility statement below -->
        <p>
          Our website is still a work in progress. We are working with our accessibility consultant to ensure compliance
          with accessibility standards and will publish a full accessibility statement once the website is complete.
          <br>
          </br>
          If you have any questions or feedback regarding the accessibility of our website, please fill out the
          following
          Google Form: <a href="https://forms.gle/RhMw4uxXS19Z5qvj7" target="_blank" rel="noopener">Accessibility
            Feedback
            Form</a>
        </p>

      </div>
    </div>
    <BackTopButton />

    <!-- footer -->

    <Footer :theme="currentTheme" />

  </div>
</template>