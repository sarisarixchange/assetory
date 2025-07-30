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
          isDefaultLogoIconVisible: true,
          isGrayscaleLogoIconVisible: false,
          isHighContrastLogoIconVisible: false,
          isWCAGLogoIconVisible: false,
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
        this.isDefaultLogoIconVisible = true;
        this.isGrayscaleLogoIconVisible = false;
        this.isHighContrastLogoIconVisible = false;
        this.isWCAGLogoIconVisible = false;
      } else if (payload.theme === 'grayscale') {
        this.isDefaultLogoIconVisible = false;
        this.isGrayscaleLogoIconVisible = true;
        this.isHighContrastLogoIconVisible = false;
        this.isWCAGLogoIconVisible = false;
      } else if (payload.theme === 'highContrast') {
        this.isDefaultLogoIconVisible = false;
        this.isGrayscaleLogoIconVisible = false;
        this.isHighContrastLogoIconVisible = true;
        this.isWCAGLogoIconVisible = false;
      } else if (payload.theme === 'wcag') {
        this.isDefaultLogoIconVisible = false;
        this.isGrayscaleLogoIconVisible = false;
        this.isHighContrastLogoIconVisible = false;
        this.isWCAGLogoIconVisible = true;
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
        margin-left: auto;
        margin-right: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
        background-color: transparent;
        border: solid 1px  var(--primary-color);
        border-radius: 30px;
          /* Clamp the width: preferred is ~1409px = 97.847vw at 1440px */
        width: clamp(320px, 97.847vw, 2560px);

        /* Clamp the height: preferred is 77px */
        height: clamp(48px, 7.21vh, 90px); /* 77px on 1068p */
      }


      .logo-section {
        display: flex;
        align-items: center;
              /* Gap: clamp between 8px and 24px, preferred ~16px */
        gap: clamp(8px, 1.111vw, 24px);

      /* Margin-left: clamp between 10px and 30px, preferred ~17px */
      margin-left: clamp(10px, 1.181vw, 30px);
      }

      .logo {
       /* Width: clamp between 40px and 80px, preferred ~60px */
        width: clamp(10px, 3.472vw, 60px);
        display: flex;
        align-items: center;
        justify-content: center;      
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
        width: 100vw;
        display: flex;
        white-space: nowrap;
        cursor: default;
        gap: 100%;
        /* gap: var(--marquee-item-gap, var(--base-gap)); */
      }

      .marqueeItem { 
        font-family: var(--font-family, 'Handjet'), sans-serif; 
        font-size: var(--font-24px);
        font-weight: 400;
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
        width: 70vw;
        display: flex;
        gap: 1rem; /*16px*/
        margin-right: 1.458vw; /*21px*/        
        justify-content: flex-end;
        }

      

      .nav-button {
        text-align: center;  
        padding: 0.468vw 1.389vw;
        border: 1px solid  var(--navigation-buttons-border-color);
        background: none;
        color:  var(--primary-color);
        border-radius: 16px;
        font-size: var(--font-small);
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .nav-button.active {
        background-color: var(--primary-color);
        color: white;
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
          <div class="logo" aria-hidden="true">
            <img v-show="isDefaultLogoIconVisible" src="/icons/logo.svg" alt="Sari-Sari Asset Library Logo" class="logo" />
            <img v-show="isGrayscaleLogoIconVisible" src="/icons/logoGray.svg" alt="Sari-Sari Asset Library Logo" class="logo" />
            <img v-show="isHighContrastLogoIconVisible" src="/icons/logoBlack.svg" alt="Sari-Sari Asset Library Logo" class="logo" />
            <img v-show="isWCAGLogoIconVisible" src="/icons/logoWCAG.svg" alt="Sari-Sari Asset Library Logo" class="logo" />
          </div>
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
          <router-link v-if="!isHomepage" :to="{name: 'Artists'}" class="nav-button" :class="{active: this.$route.name === 'Artists'}" >Artists</router-link>
          <router-link v-if="!isHomepage" :to="{name: 'Collections'}" class="nav-button" :class="{active: this.$route.name === 'Collections'}">Collections</router-link>
          <router-link v-if="!isHomepage" :to="{name: 'Events'}" class="nav-button" :class="{active: this.$route.name === 'Events'}">Events</router-link>          
          <router-link  :to="{name: 'About'}"  class="nav-button" :class="{active: this.$route.name === 'About'}">About </router-link>       
          <router-link :to="{name: 'Accessibility Statement'}" class="nav-button" :class="{active: this.$route.name === 'Accessibility Statement'}">Accessibility Statement</router-link>
          <router-link :to="{name: 'Terms of Use'}" class="nav-button" :class="{active: this.$route.name === 'Terms of Use'}">Terms of Use</router-link>
     
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