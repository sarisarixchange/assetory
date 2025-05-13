<script>
import AccessibilityMenu from './AccessibilityMenu.vue'; 

 export default {
    name: 'Topbar',
    props: {
    isNotificationVisible: {
      type: Boolean,
      default: true,
    },
  },
    components: {
    AccessibilityMenu, // Register the AccessibilityMenu component
  },
     data() {
        return {
          currentLogoColorPalette: 'logo',
        }
      }, 

      computed: {
    // Check if the current route is the homepage
    isHomepage() {
      return this.$route.path === '/';
    }, 
  }, 

  methods: {
    updateTheme(payload) {
       // Update theme based on the payload
       if (payload.theme === 'default') {
        this.currentLogoColorPalette = 'logo';
      } else if (payload.theme === 'grayscale') {
        this.currentLogoColorPalette = 'logoGrayscaleColorPalette';
      } else if (payload.theme === 'high-contrast') {
        this.currentLogoColorPalette = 'logoHighContrastColorPalette';
      } else if (payload.theme === 'wcag') {
        this.currentLogoColorPalette = 'logoWCAGcolors';
      }
    },
    
    handleThemeChange(payload) {
      // Handle the event locally
      this.updateTheme(payload);

      // Propagate the event to the parent
      this.$emit('theme-changed', payload);
    },
  // dont erase curly brackets below
    }
  }

</script>

<style>
      .header {
        margin-top: 0.25em;
        margin-left: 0.25em;
        margin-right: 0.25em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* padding: 0.5rsem 0.5rem; */
        border-bottom: 1px solid #eee;
        background-color: transparent;
        border: solid 1px  var(--primary-color);
        border-radius: 17px;
      }

      .logo-section {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .logo {
        width: 2.7vw;
        height: 2.7vw;
        background-image: url('icons/logo.svg'); 
        background-size: contain;
        background-repeat: no-repeat;    
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.5em;
      }
    
      .logoGrayscaleColorPalette {
        background-image: url('icons/logoGray.svg'); 
        background-size: contain;
        background-repeat: no-repeat;    
      }

      .logoHighContrastColorPalette {
        background-image: url('icons/logoBlack.svg'); 
        background-size: contain;
        background-repeat: no-repeat;    
      }

      .logoWCAGcolors {
            background-image: url('icons/logoWCAG.svg'); 
            background-size: contain;
            background-repeat: no-repeat;    
          }

      .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
    white-space: nowrap; /* Prevents screen readers from pausing mid-sentence */
}
    .marquee {
        overflow: hidden;
        width: 65%;
        display: flex;
        white-space: nowrap;
        cursor: default;
        gap: var(--marquee-item-gap, var(--base-gap)); /* adjust rem as needed */
      }

      .marqueeItem { 
        font-family: var(--font-family, 'Handjet'), sans-serif; 
        font-size: 0.84rem;
        color: var(--primary-color);
        display: flex;
        align-items: center;
        min-width: 100%; /* Ensures each item takes the full width */
        animation: marquee-scroll 30s linear infinite;
        /* margin-right: var(--marquee-item-margin-right); */
      }

        @keyframes marquee-scroll {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }


      .nav-buttons {
        display: flex;
        gap: 1rem;
        padding: 0.5%;          
      }

      .nav-button {
        text-align: center;  
        padding: 0.45rem 0.75rem;
        border: 1px solid  var(--navigation-buttons-border-color);
        background: none;
        color:  var(--primary-color);
        border-radius: 20px;
        font-size: 0.50rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      a {
       text-decoration: var(--link-decoration, none); /* Default: No underline */
      }


      .nav-button:hover {
        color: white;
        background-color: var(--hover-color);
      }  

</style>

<template>
     <div class="header">
        <div class="logo-section">
          <h1 class="visually-hidden">Sari-Sari Asset Library</h1>
          <div :class="['logo' , currentLogoColorPalette]" aria-hidden="true"></div>
          <router-link  v-if="!isHomepage" to="/" class="nav-button">Home</router-link> 
           </div>

             <!-- top marquee -->
          <div v-if="isHomepage" class="marquee" aria-hidden="true">
            <div class="marqueeItem" >
              ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * 
            </div> 
            <div class="marqueeItem">
              ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY *
            </div>
          
          </div>
           

          <!-- navigation menu -->
        <div class="nav-buttons" >
          <a v-if="!isHomepage" href="" class="nav-button">Artists</a>
          <a v-if="!isHomepage" href="" class="nav-button">Collections</a>
          <a v-if="!isHomepage" href="" class="nav-button">Events</a>
          <a href="" class="nav-button">About</a>
          <a href="" class="nav-button">Accessibility Statement</a>
          <a href="" class="nav-button">Terms of Use</a>
     
          <!-- Accessibility Menu -->
          <AccessibilityMenu
          ref="accessibilityMenu"
      :is-notification-visible="isNotificationVisible"
      @update-notification-visible="$emit('update-notification-visible', $event)"
      @theme-changed="handleThemeChange"
    />                       
        </div>
      </div>

</template>