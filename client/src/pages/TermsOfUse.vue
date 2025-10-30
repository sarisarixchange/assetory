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
      interactiveMode: false,
      currentTheme: { theme: 'default' },
      data: TermsOfUseData, // Data for the Terms of Use component
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
    <Topbar :interactive-mode="interactiveMode"  @theme-changed="updateTheme" />

  

    <div class="terms-of-use">
      <h2>Terms of Use</h2>
    
      <p><strong>Definition</strong></p>
      <p>
        Sari Sari Xchange Asset Library (“SSXAL” or “SSX Asset Library” or “The Library”) is a digital asset library catering to animation, gaming, XR, and other digital creations, with a focus on Asian diaspora representation. SSXAL may encompass various assets such as 3D models, motion captures, texture materials, shaders, audio assets, imagery, vector graphics, videos, rigging data, special effects, HDRIs, and skyboxes. 
   Sari Sari Xchange (“SSX”) is a community-building research and creation project utilizing Extended Reality (XR), including Virtual, Augmented, and Mixed Realities, to foster new works by artists from the Asian diaspora. 
To streamline the agreement, the terms “include,” “including,” and “such as” are considered to be followed by “but not limited to.” Examples in this Terms of Use serve to illustrate, not limit, the scope of the terms. 
      </p>

      <!-- Replace with actual terms of use below -->
      <p><strong>General Use </strong></p>
      <p>
        The creator of the assets retains copyrights to digital assets, including the digital file, 
name, and associated information. SSX, as the library service provider, owns the website. We operates as a “Semi” Open-Source collective digital asset library created with and for the community in a respectful, accessible, responsive, and friendly environment. We encourage digital artists, designers, and hobbyists to use assets respectfully, with love and care for our labor, culture, and community. We offers four different copyright licenses, depending on 
the creator’s choice:
      </p>
       <ul>
        <li>CC BY 4.0 DEED: Users are permitted to share (copy and redistribute the material in any 
medium or format) and adapt (remix, transform, and build upon the material) the assets, with 
commercial use allowed. More details can be found at:
https://creativecommons.org/licenses/by/4.0/
</li>
        <li>CC BY-NC 4.0 DEED: Users are permitted to share and adapt the assets for non-commercial 
use only. More details can be found at: https://creativecommons.org/licenses/by-nc/4.0/
</li>
        <li>CC BY-NC-ND: Users can share but not adapt the materials, with only noncommercial uses 
permitted. More detail can be found: https://creativecommons.org/licenses/by-nc-nd/4.0/
</li>
        <li>Upon Request: Users cannot access the digital asset directly but need to contact SSXAL and fill out a form to gain access to it.
</li>
      </ul>
      <p>
        All four-tier copyrights are subject to Moral Rights in Canadian copyright law. Users are strictly prohibited from using SSAXL assets in disrespectful ways, such as cultural appropriation or discrediting the creator. 
      </p>
      <p>
        Digital assets are provided “as-is,” with no warranties, conditions, or guarantees attached to the digital assets at SSXAL. 
      </p>
<p><strong>Statement on AI Training </strong></p>
      <p>
        The assets published on the website cannot be used for AI training. 
      </p>

<p><strong>Data Storage</strong></p>
    <p>
      All the 3D assets is stored at the McMaster University server. 
    </p>

     <p><strong>Frequently Asked Questions</strong></p>
<p>What can I do with the assets?</p>
<p></p>
    </div>

   


    <BackTopButton />

    <!-- footer -->

    <Footer :theme="currentTheme" />
  </div>
</template>