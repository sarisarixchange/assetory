<script>
export default {
  name: 'Footer',
  props: {
  theme: {
    type: Object,
    default: () => ({ theme: 'default' }), // Default theme
  },
},

watch: {
  theme(newTheme) {
    this.updateTheme(newTheme);
  },
},

  data() {
    return {

      isDefaultTheme: true,
      isGrayscaleTheme: false,
      isHighContrastTheme: false,
      isWCAGTheme: false,
    };
  },

 

  methods: {
    updateTheme(payload) {
      console.log('Theme updated in Footer:', payload);

      // Reset all theme flags
      this.isDefaultTheme = false;
      this.isGrayscaleTheme = false;
      this.isHighContrastTheme = false;
      this.isWCAGTheme = false;

      // Update theme based on the payload
      if (payload.theme === 'default') {
        this.isDefaultTheme = true;
      } else if (payload.theme === 'grayscale') {
        this.isGrayscaleTheme = true;
      } else if (payload.theme === 'highContrast') {
        this.isHighContrastTheme = true;
      } else if (payload.theme === 'wcag') {
        this.isWCAGTheme = true;
      }
    },
  },
};
</script>

<style scoped>

h2 {
  font-size: 1rem;
  font-weight: 700;
}



.non-homepage-footer {
  display: flex;
  border-top: 1px solid var(--primary-color);
  border-left: 1px solid var(--primary-color);
  border-right: 1px solid var(--primary-color);
  border-bottom: none; /* No bottom border */
  border-radius: 2rem 2rem 0 0; /* Top-left and top-right rounded, bottom corners straight */
  padding: 2rem;
  margin-left: 0.97rem; /* Add margin to the left */
  margin-right: 0.97rem; /* Add margin to the right */
  color: var(--primary-color);
  font-family: 'Inter', sans-serif;
  /* width: 107.5rem; */
  height: 14.5625rem;
  /* margin: auto; */
  margin-left: 6.25rem; 
   margin-right: 6.25rem;
}

.leftSideFooter{
 width: 50%; 
}

.leftSideFooterInfo{
  display: flex;
  
}

.footerLogo img{
  width: 5.37119rem;
  height: 5.375rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.footerCopyright h3 {
  font-size: 0.875rem;
  font-weight: 400;
}

.acknowledgements p {
  font-size: 0.75rem;
  font-weight: 400;
}

.rightSideFooter{
  width: 50%;
  display: flex;
  gap: 5.2rem;
  justify-content: flex-end; /* Align items to the right */
}

.rightSideFooter a {
  font-size: 0.75rem;
  font-weight: 400;
}

.footer-links{
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.footer-links a {
  color: var(--primary-color);
}


</style>

<template>

<footer class="non-homepage-footer">
        <div class="leftSideFooter">
        <div class="leftSideFooterInfo">
          <div class="footerLogo">
        <img v-show="isDefaultTheme" src="/icons/logo.svg" alt="Footer Logo">
        <img v-show="isGrayscaleTheme" src="/icons/logoGray.svg" alt="Footer Logo">
        <img v-show="isHighContrastTheme" src="/icons/logoBlack.svg" alt="Footer Logo">
        <img v-show="isWCAGTheme" src="/icons/logoWCAG.svg" alt="Footer Logo">
        </div>
        <div class="footerCopyright">
        <h2>Sari-Sari XChange</h2>
        <h3>Assetory</h3>
        <p>© 2025</p>
        </div>
        </div>
        <div class="acknowledgements">
          <p>☺ Made with care & curiosity</p>
          <p>Designed by Hanan Abbas</p>
          <p>Developed by Luis Navarro</p>
        </div>
        </div>

        <div class="rightSideFooter">
          <div class="footer-links">
          <h2>Information</h2>
          
          <a href="https://sarisarixchange.mcmaster.ca/" target="_blank">SSX Website</a>
          <router-link to="/about">About</router-link>
          <router-link to="/accessibility-statement">Accessibility</router-link>
          <router-link to="/terms-of-use">Terms of Use</router-link>
      </div>

      <div class="footer-links">
          <h2>Quick Links</h2>
          <a href="">Submit</a>
          <router-link to="/">Home</router-link>
          <router-link to="/artists">Artists</router-link>
          <router-link to="/collections">Collections</router-link>
          <router-link to="/events">Events</router-link>
      </div>

      <div class="footer-links">
          <h2>Contact</h2>
          <a href="mailto:sarisarixchange@gmail.com">sarisarixchange@gmail.com</a>
          <a href="https://www.instagram.com/sarisarixchange/" target="_blank">@sarisarixchange</a>
          
      </div>

      </div>

        </footer>
</template>