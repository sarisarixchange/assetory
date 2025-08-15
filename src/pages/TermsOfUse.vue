<script>
import Topbar from '../components/Topbar.vue'; // Import the Topbar component
import BackTopButton from '../widgets/BackTopButton.vue';
import Footer from '../components/Footer.vue'; // Import the Footer component
import TermsOfUseData from '../data/termsofuse.json';
 // Import the TermsOfUse component

export default {
  components: {
    Topbar, // Register the Topbar component
    BackTopButton,
    Footer, // Register the Footer component    
  },

  data() {
    return {
      currentTheme: { theme: 'default' },
      data: TermsOfUseData, // Data for the Terms of Use component
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

/* Accessibility statement should grow to fill available space */
.terms-of-use {
  flex: 1; /* takes up remaining space */
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: var(--primary-color);
  padding: 4rem;
  font-size: 1.5rem;  
}

.terms-of-use h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.terms-of-use p {
  font-size: 1.5rem;
  /* line-height: 1.5; */
  text-align: justify;
  
}
</style>


<template>
  <div class="page-container">

    <!-- top bar -->
    <Topbar @theme-changed="updateTheme" />

  

    <div class="terms-of-use">
      <h2>Terms of Use</h2>
    
      <!-- Replace with actual terms of use below -->
    <p>
      The terms of use for our website are as follows: <br>
      By using this website, you agree to comply with the terms and conditions set forth herein.
      <br>
      You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful
      </p>
      
    </div>


    <BackTopButton />

    <!-- footer -->

    <Footer :theme="currentTheme" />
  </div>
</template>