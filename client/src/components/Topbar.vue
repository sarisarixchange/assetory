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
    },
    pageTitle: {
      type: String,
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
      isOriginalInteractiveIconVisible: false,

      isMobileMenuOpen: false // <-- for responsiveness in cellphones
    }
  },

  computed: {
    // Check if the current route is the homepage
    isHomepage() {
      return this.$route.path === '/';
    },
    isAssetory() {
      return this.$route.path === '/assetory';
    },

    headerWidth() {
      if (this.interactiveMode) {
        return '99%';
      }
      // return '63.5625rem';
      return '74rem';
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

    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    // dont erase curly brackets below
  }
}

</script>

<style scoped>
.nav-buttons-wrapper {
  display: flex;
  flex-direction: row;
  margin: auto;
  /* width: 69.125rem; */
  width: 79rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
}


.nav-buttons-wrapper-homepage {
  display: flex;
  flex-direction: row;
  margin: auto;
  width: 32.09375rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
}

.header {
  margin-top: 0.87rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  border: solid 1px var(--primary-color);
  border-radius: 1.25rem;
  background-color: var(--background-color);
  height: 5rem;
}

.header-homepage {
  /* width: 39.0625rem; */
  margin-top: 0.87rem;
  margin-left: auto;
  margin-right: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  border: solid 1px var(--primary-color);
  border-radius: 1.25rem;
  background-color: var(--background-color-main);

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

.nav-button-homepage {
  display: inline-flex;
  width: max-content;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 2.1875rem;
  padding: 0.3125rem 1.25rem;
  border: 1px solid var(--primary-border-color-main);
  background: transparent;
  color: var(--primary-color-main);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.nav-button-homepage:hover,
.nav-button-homepage:focus-visible {
  color: var(--text-color-topbar-nav-button-hover);
  border: 1px solid var(--border-color-topbar-nav-button-hover);
  box-shadow: -3px 3px 0 0 var(--shadow);
}

.nav-button.active {
  background-color: var(--hover-color);
  color: var(--hover-text-color);
}

.nav-button.active:hover,
.nav-button.active:focus-visible {
  background-color: var(--hover-color);
  color: var(--hover-text-color);
}


.nav-button-homepage.active {
  background-color: var(--background-color-topbar-nav-buttons);
  border: 1px solid var(--border-color-topbar-nav-button-active);
  color: var(--active-text-color-main);
}

.nav-button-homepage.active:hover,
.nav-button-homepage.active:focus-visible {
  background-color: transparent;
  color: var(--text-color-topbar-nav-button-hover);
  border: 1px solid var(--border-color-topbar-nav-button-hover);
  box-shadow: -3px 3px 0 0 var(--shadow);

}



a {
  text-decoration: var(--link-decoration, none);
  /* Default: No underline */
}


.nav-button:hover,
.nav-button:focus-visible {
  background-color: var(--hover-color);
  color: var(--hover-text-color);
  box-shadow: -3px 3px 0 0 var(--shadow);
}



/* Show hamburger only on mobile */
.hamburger {
  display: none;
}

.mobile-menu,
.mobile-menu a {
  visibility: hidden;
}


/* mobile CSS */
/* Hide desktop nav on mobile */
@media (max-width: 768px) {

  .nav-buttons-wrapper,
  .nav-buttons-wrapper-homepage {
    display: flex;
    flex-direction: row;
    margin: auto;
    width: 30%;
    height: 5rem;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  /* Shrink header container */
  .header,
  .header-homepage {
    width: 100% !important;
    padding-right: 1rem;
    padding-left: 1rem;
    margin-top: 0.87rem;
    margin-left: 1rem;
    margin-right: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #eee;
    border: 1px solid var(--navigation-buttons-border-color);
    border-radius: 1.25rem;
    background-color: var(--background-color);
    height: 5rem;
  }

  .nav-buttons {
    display: none !important;
  }

  .hamburger {
    display: block;
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: var(--primary-color);

  }

  .mobile-menu {
    visibility: visible;
    position: absolute;
    top: 5rem;
    right: 0;
    width: 100%;
    background: var(--background-color);
    border-top: 1px solid var(--primary-color);
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    z-index: 1000;
  }

  .mobile-menu a {
    visibility: visible;
    font-size: 1.1rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--primary-color);
    text-decoration: none;
    color: var(--primary-color)
  }


}
</style>

<template>
  <div v-if="isHomepage" class="nav-buttons-wrapper-homepage">
    <div class="header-homepage">
      <div class="logo-section">
        <h1 class="visually-hidden">{{ pageTitle }}</h1>
        <div class="logo" aria-hidden="true">
          <img v-show="isDefaultLogoIconVisible" src="/icons/logoPurple.svg" alt="Sari-Sari Asset Library Logo"
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
      </div>


      <!-- ✅ HAMBURGER BUTTON (mobile only) -->
      <button class="hamburger" @click="toggleMobileMenu" aria-label="Toggle menu">
        <i class="fa-solid fa-bars"></i>
      </button>


      <!-- navigation menu (desktop only) -->
      <div class="nav-buttons">
        <router-link v-if="!interactiveMode" :to="{ name: 'Homepage' }" class="nav-button-homepage"
          :class="{ active: this.$route.name === 'Homepage' }">Home</router-link>
        <router-link :to="{ name: '' }" class="nav-button-homepage">Projects</router-link>
        <router-link :to="{ name: '' }" class="nav-button-homepage">Mobile Units</router-link>
        <router-link :to="{ name: '' }" class="nav-button-homepage">Learning Modules</router-link>
        <!-- <router-link to="" class="nav-button-homepage">Projects</router-link> -->

      </div>

    </div>
    <!-- MOBILE MENU (shows only when hamburger is clicked) -->
    <div class="mobile-menu" v-if="isMobileMenuOpen">
      <router-link v-if="!interactiveMode" :to="{ name: 'Homepage' }" class="nav-button-homepage"
        :class="{ active: this.$route.name === 'Homepage' }">Home</router-link>
      <router-link :to="{ name: '' }" class="nav-button-homepage"
        :class="{ active: this.$route.name === 'Homepage' }">Projects</router-link>
      <router-link :to="{ name: '' }" class="nav-button-homepage"
        :class="{ active: this.$route.name === 'Homepage' }">Mobile Units</router-link>
      <router-link :to="{ name: '' }" class="nav-button-homepage"
        :class="{ active: this.$route.name === 'Homepage' }">Learning Modules</router-link>
    </div>


    <!-- Accessibility Menu -->
    <AccessibilityMenu ref="accessibilityMenu" :is-notification-visible="isNotificationVisible"
      @update-notification-visible="$emit('update-notification-visible', $event)" @theme-changed="handleThemeChange" />
  </div>


  <div v-else class="nav-buttons-wrapper">
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

      </div>

      <!-- top marquee -->
      <div v-if="interactiveMode" class="marquee" aria-hidden="true">
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

      <!-- ✅ HAMBURGER BUTTON (mobile only) -->
      <button class="hamburger" @click="toggleMobileMenu" aria-label="Toggle menu">
        <i class="fa-solid fa-bars"></i>
      </button>

      <!-- navigation menu -->
      <div class="nav-buttons">
        <router-link v-if="!interactiveMode" :to="{ name: 'Homepage' }" class="nav-button"
          :class="{ active: this.$route.name === 'Homepage' }">Home</router-link>
        <router-link v-if="!interactiveMode" :to="{ name: 'Assetory' }" class="nav-button"
          :class="{ active: this.$route.name === 'Assetory' }">Assetory</router-link>
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

    <!-- MOBILE MENU (shows only when hamburger is clicked) -->
    <div class="mobile-menu" v-if="isMobileMenuOpen">
      <router-link v-if="!interactiveMode" :to="{ name: 'Homepage' }" class="nav-button"
        :class="{ active: this.$route.name === 'Homepage' }">Home</router-link>
      <router-link v-if="!interactiveMode" :to="{ name: 'Assetory' }" class="nav-button"
        :class="{ active: this.$route.name === 'Assetory' }">Assetory</router-link>
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

    <!-- Accessibility Menu -->
    <AccessibilityMenu ref="accessibilityMenu" :is-notification-visible="isNotificationVisible"
      @update-notification-visible="$emit('update-notification-visible', $event)" @theme-changed="handleThemeChange" />

  </div>


</template>