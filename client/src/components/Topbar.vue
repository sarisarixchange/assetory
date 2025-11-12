<script>
import AccessibilityMenu from './AccessibilityMenu.vue';

export default {
  name: 'Topbar',
  props: {
    isNotificationVisible: {
      type: Boolean,
      default: true,
    },
    interactiveMode: {
      type: Boolean,
      required: true
    }
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
      isOriginalInteractiveIconVisible: false
    }
  },

  computed: {
    // Check if the current route is the homepage
    isHomepage() {
      return this.$route.path === '/';
    },

    headerWidth() {
      if (this.interactiveMode) {
        return '99%';
      }
      return '63.5625rem';
      
    }

  },

  methods: {
    updateTheme(payload) {
      // Update theme based on the payload
      if (payload.theme === 'default') {
        this.isDefaultLogoIconVisible = true;
        this.isGrayscaleLogoIconVisible = false;
        this.isHighContrastLogoIconVisible = false;
        this.isWCAGLogoIconVisible = false;
        this.isOriginalInteractiveIconVisible = false;
      } else if (payload.theme === 'originalInteractive') {
        this.isDefaultLogoIconVisible = false;
        this.isGrayscaleLogoIconVisible = false;
        this.isHighContrastLogoIconVisible = false;
        this.isWCAGLogoIconVisible = false;
        this.isOriginalInteractiveIconVisible = true;
      } else if (payload.theme === 'grayscale') {
        this.isDefaultLogoIconVisible = false;
        this.isGrayscaleLogoIconVisible = true;
        this.isHighContrastLogoIconVisible = false;
        this.isWCAGLogoIconVisible = false;
        this.isOriginalInteractiveIconVisible = false;
      } else if (payload.theme === 'highContrast') {
        this.isDefaultLogoIconVisible = false;
        this.isGrayscaleLogoIconVisible = false;
        this.isHighContrastLogoIconVisible = true;
        this.isWCAGLogoIconVisible = false;
        this.isOriginalInteractiveIconVisible = false;
      } else if (payload.theme === 'wcag') {
        this.isDefaultLogoIconVisible = false;
        this.isGrayscaleLogoIconVisible = false;
        this.isHighContrastLogoIconVisible = false;
        this.isWCAGLogoIconVisible = true;
        this.isOriginalInteractiveIconVisible = false;
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
  margin-top: 0.87rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  /* background-color: transparent; */
  border: solid 1px var(--primary-color);
  border-radius: 1.25rem;
  background-color: var(--background-color);  
  height: 5rem;  

}


.logo-section {
  display: flex;
  align-items: center;
  margin-left: 1.06rem;

}

.logo {
  width: 3.75rem;
  display: flex;
  margin-right: 1rem;
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
  white-space: nowrap;
}

.marquee {
  overflow: hidden;
  width: 100%;
  display: flex;
  white-space: nowrap;
  cursor: default;
  gap: 100%;
}

.marqueeItem {
  font-family: var(--font-family, 'Handjet'), sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  min-width: 100%;
  animation: marquee-scroll 30s linear infinite;
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
  margin-left: 1rem;
  display: flex;
  gap: 1rem;
  margin-right: 1.458vw;
  justify-content: flex-end;

}



.nav-button {
  display: inline-flex;
  width: max-content;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 2.1875rem;
  padding: 0.3125rem 1.25rem;
  border: 1px solid var(--navigation-buttons-border-color);
  background: none;
  color: var(--primary-color);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.nav-button.active {
  background-color: var(--hover-color);
  color: var(--hover-text-color);
}

.nav-button.active:hover {
  background-color: var(--hover-color);
  color: var(--hover-text-color);
}


a {
  text-decoration: var(--link-decoration, none);
  /* Default: No underline */
}


.nav-button:hover {
  background-color: var(--hover-color);
  color: var(--hover-text-color);
  box-shadow: -3px 3px 0 0 var(--shadow);
}

.nav-buttons-wrapper {
  display: flex;
  flex-direction: row;
  margin: auto;
  /* background-color: red; */
  width: 69.125rem;
  height: 5rem;
  justify-content: center;
  align-items: center;

}
</style>

<template>

  <div class="nav-buttons-wrapper">
    <div class="header" :style="{ width: headerWidth }">
      <div class="logo-section">
        <h1 class="visually-hidden">Sari-Sari Asset Library</h1>
        <div class="logo" aria-hidden="true">
          <img v-show="isDefaultLogoIconVisible" src="/icons/logo.svg" alt="Sari-Sari Asset Library Logo"
            class="logo" />
          <img v-show="isGrayscaleLogoIconVisible" src="/icons/logoGray.svg" alt="Sari-Sari Asset Library Logo"
            class="logo" />
          <img v-show="isHighContrastLogoIconVisible" src="/icons/logoBlack.svg" alt="Sari-Sari Asset Library Logo"
            class="logo" />
          <img v-show="isWCAGLogoIconVisible" src="/icons/logoWCAG.svg" alt="Sari-Sari Asset Library Logo"
            class="logo" />
          <img v-show="isOriginalInteractiveIconVisible" src="/icons/logoPink.svg" alt="Sari-Sari Asset Library Logo"
            class="logo" />


        </div>
        <!-- <router-link v-if="!isHomepage" to="/" class="nav-button">Home</router-link> -->
      </div>

      <!-- top marquee -->
      <div v-if="isHomepage && interactiveMode" class="marquee" aria-hidden="true">
        <div class="marqueeItem">
          ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY
          *
          ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY
          *
        </div>
        <div class="marqueeItem">
          ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY
          *
          ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY
          *
        </div>

      </div>




      <!-- navigation menu -->
      <div class="nav-buttons">
          <router-link v-if="!interactiveMode" :to="{ name: 'Homepage' }" class="nav-button"
          :class="{ active: this.$route.name === 'Homepage' }">Home</router-link>
        <router-link v-if="!interactiveMode" :to="{ name: 'Artists' }" class="nav-button"
          :class="{ active: this.$route.name === 'Artists' }">Artists</router-link>
        <router-link v-if="!interactiveMode" :to="{ name: 'Collections' }" class="nav-button"
          :class="{ active: this.$route.name === 'Collections' }">Collections</router-link>
        <router-link v-if="!interactiveMode" :to="{ name: 'Events' }" class="nav-button"
          :class="{ active: this.$route.name === 'Events' }">Events</router-link>
        <router-link :to="{ name: 'About' }" class="nav-button" :class="{ active: this.$route.name === 'About' }">About
        </router-link>
        <router-link :to="{ name: 'Terms of Use' }" class="nav-button"
          :class="{ active: this.$route.name === 'Terms of Use' }">Terms of Use</router-link>
        <router-link :to="{ name: 'Accessibility Statement' }" class="nav-button"
          :class="{ active: this.$route.name === 'Accessibility Statement' }">Accessibility Statement</router-link>
  
        </div>



    </div>
  
    <!-- Accessibility Menu -->
    <AccessibilityMenu ref="accessibilityMenu" :is-notification-visible="isNotificationVisible"
      @update-notification-visible="$emit('update-notification-visible', $event)" @theme-changed="handleThemeChange" />

  </div>
</template>