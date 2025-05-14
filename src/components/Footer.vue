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
      } else if (payload.theme === 'high-contrast') {
        this.isHighContrastTheme = true;
      } else if (payload.theme === 'wcag') {
        this.isWCAGTheme = true;
      }
    },
  },
};
</script>

<style>



.non-homepage-footer {
  display: flex;
  border-top: 1px solid var(--primary-color);
  border-left: 1px solid var(--primary-color);
  border-right: 1px solid var(--primary-color);
  border-bottom: none; /* No bottom border */
  border-radius: 0.5rem 0.5rem 0 0; /* Top-left and top-right rounded, bottom corners straight */
  padding: 1rem;
  margin-left: 0.5rem; /* Add margin to the left */
  margin-right: 0.5rem; /* Add margin to the right */
  color: var(--primary-color);
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  margin-top: auto;
}

.leftSideFooter{
 width: 50%; 
}

.leftSideFooterInfo{
  display: flex;
  
}

.footerLogo img{
  width: 3rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

/* .footerCopyright h2{
} */

.rightSideFooter{
  width: 50%;
  display: flex;
  gap: 3rem;
  justify-content: flex-end; /* Align items to the right */
  

}

.footer-links{
  display: flex;
  flex-direction: column;
  gap:0.25rem;
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
        <p>Assetory</p>
        <p>© 2024</p>
        </div>
        </div>
        <div>
          <p>☺ Made with care & curiosity</p>
          <p>Designed by Hanan Abbas</p>
          <p>Developes by Luis Navarro</p>
        </div>
        </div>

        <div class="rightSideFooter">
          <div class="footer-links">
          <h2>Information</h2>
          <a href="">SSX Website</a>
          <a href="">About</a>
          <a href="">Accessibility</a>
          <a href="">Terms of Use</a>
      </div>

      <div class="footer-links">
          <h2>Quick Links</h2>
          <a href="">Submit</a>
          <a href="">Home</a>
          <a href="">Artists</a>
          <a href="">Collections</a>
          <a href="">Events</a>
      </div>

      <div class="footer-links">
          <h2>Contact</h2>
          <a href="">email@email.com</a>
          <a href="">@sarisarixchange</a>
          
      </div>

      </div>

        </footer>
</template>