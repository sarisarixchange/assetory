<script>
import AccessibilityMenu from '../components/AccessibilityMenu.vue';
import Topbar from '../components/Topbar.vue';

export default {
  components: {
    AccessibilityMenu, // Register the AccessibilityMenu component
    Topbar
  },
  data() {
    return {
      iconBasePath: 'icons/', // Base path for icons
      marqueeBasePath: 'images/marquee/',

      isNotificationVisible: true,

      // leftbox
      isPinkLeftCardIconVisible: true,
      isGrayLeftCardIconVisible: false,
      isHighContrastLeftCardIconVisible: false,
      isWCAGLeftCardIconVisible: false,


      // center-top-box images
      arePinkTopCenterCardSampleImagesVisible: true,
      areGrayTopCenterCardSampleImagesVisible: false,
      areHighContrastTopCenterCardSampleImagesVisible: false,

      // other boxes icons
      isDecoractionCardSubtitlePink: true,
      isDecoractionCardSubtitleGray: false,
      isDecoractionCardSubtitleHighContrast: false,
      isDecoractionCardSubtitleWCAG: false,

      // footer images
      areFooterImagesDefaultVisible: true,
      areFooterImagesGrayscaleVisible: false,
      areFooterImagesHighContrastVisible: false,
      areFooterImagesWCAGcolorsVisible: false,

      //  background image
      currentBackgroundLayer: 'background-layer'

    }
  },
  mounted() {
    this.loadNotificationState(); // Load the notification state when the component is mounted
    this.updateScale();
    window.addEventListener("resize", this.updateScale);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.updateScale);
  },

  methods: {
    updateScale() {
      const designWidth = 1440; 
      const designHeight = 1068;

      const scaleX = window.innerWidth / designWidth;
      const scaleY = window.innerHeight / designHeight;
      const scale = Math.min(scaleX, scaleY);

      const gridContainer = this.$refs.gridContainer;
      if (gridContainer) {
        gridContainer.style.transform = `scale(${scale})`;
      }
    },


    dismissNotification() {
      try {
        this.isNotificationVisible = false; // Update the state

        // Check if refs are available
        if (this.$refs.topbar && this.$refs.topbar.$refs.accessibilityMenu) {
          this.$refs.topbar.$refs.accessibilityMenu.saveSettings({
            isNotificationVisible: this.isNotificationVisible,
          });
        } else {
        }
      } catch (error) {
        console.error('Error in dismissNotification:', error);
      }
    },

    loadNotificationState() {
      try {
        const savedSettings =
          JSON.parse(localStorage.getItem('accessibilitySettings')) || {};
        this.isNotificationVisible =
          savedSettings.isNotificationVisible ?? true; // Load the notification state
      } catch (error) {
        console.error('Error in loadNotificationState:', error);
      }
    },
    updateTheme(payload) {
      if (payload.theme === "default") {
        this.currentBackgroundLayer = 'background-layer';
        // leftbox
        this.isPinkLeftCardIconVisible = true
        this.isGrayLeftCardIconVisible = false
        this.isHighContrastLeftCardIconVisible = false
        this.isWCAGLeftCardIconVisible = false
        // center-top-box images
        this.arePinkTopCenterCardSampleImagesVisible = true
        this.areGrayTopCenterCardSampleImagesVisible = false
        this.areHighContrastTopCenterCardSampleImagesVisible = false
        // other boxes icons
        this.isDecoractionCardSubtitlePink = true;
        this.isDecoractionCardSubtitleGray = false;
        this.isDecoractionCardSubtitleHighContrast = false;
        this.isDecoractionCardSubtitleWCAG = false;
        // footer images
        this.areFooterImagesDefaultVisible = true;
        this.areFooterImagesGrayscaleVisible = false;
        this.areFooterImagesHighContrastVisible = false;
        this.areFooterImagesWCAGcolorsVisible = false;

      } else if (payload.theme === "grayscale") {

        this.isPinkLeftCardIconVisible = false;
        this.isGrayLeftCardIconVisible = true;
        this.isHighContrastLeftCardIconVisible = false;
        this.isWCAGLeftCardIconVisible = false;
        // center-top-box
        this.arePinkTopCenterCardSampleImagesVisible = false;
        this.areGrayTopCenterCardSampleImagesVisible = true;
        this.areHighContrastTopCenterCardSampleImagesVisible = false;
        // other boxes icons
        this.isDecoractionCardSubtitlePink = false;
        this.isDecoractionCardSubtitleGray = true;
        this.isDecoractionCardSubtitleHighContrast = false;
        this.isDecoractionCardSubtitleWCAG = false;
        // footer images
        this.areFooterImagesDefaultVisible = false;
        this.areFooterImagesGrayscaleVisible = true;
        this.areFooterImagesHighContrastVisible = false;
        this.areFooterImagesWCAGcolorsVisible = false;
        // background image
        this.currentBackgroundLayer = 'background-layer-grayscale';

      } else if (payload.theme === "highContrast") {
        this.isPinkLeftCardIconVisible = false;
        this.isGrayLeftCardIconVisible = false;
        this.isHighContrastLeftCardIconVisible = true;
        this.isWCAGLeftCardIconVisible = false;
        // center-top-box
        this.arePinkTopCenterCardSampleImagesVisible = false;
        this.areGrayTopCenterCardSampleImagesVisible = false;
        this.areHighContrastTopCenterCardSampleImagesVisible = true;
        // other boxes icons
        this.isDecoractionCardSubtitlePink = false;
        this.isDecoractionCardSubtitleGray = false;
        this.isDecoractionCardSubtitleHighContrast = true;
        this.isDecoractionCardSubtitleWCAG = false;
        // footer images
        this.areFooterImagesDefaultVisible = false;
        this.areFooterImagesGrayscaleVisible = false;
        this.areFooterImagesHighContrastVisible = true;
        this.areFooterImagesWCAGcolorsVisible = false;
        // background image
        this.currentBackgroundLayer = 'background-layer-highContrast';

      } else if (payload.theme === "wcag") {
        this.isPinkLeftCardIconVisible = false
        this.isGrayLeftCardIconVisible = false
        this.isHighContrastLeftCardIconVisible = false
        this.isWCAGLeftCardIconVisible = true
        // center-top-box
        this.arePinkTopCenterCardSampleImagesVisible = true;
        this.areGrayTopCenterCardSampleImagesVisible = false;
        this.areHighContrastTopCenterCardSampleImagesVisible = false;
        // other boxes icons
        this.isDecoractionCardSubtitlePink = false;
        this.isDecoractionCardSubtitleGray = false;
        this.isDecoractionCardSubtitleHighContrast = false;
        this.isDecoractionCardSubtitleWCAG = true;
        // footer images
        this.areFooterImagesDefaultVisible = false;
        this.areFooterImagesGrayscaleVisible = false;
        this.areFooterImagesHighContrastVisible = false;
        this.areFooterImagesWCAGcolorsVisible = true;
        // background image
        this.currentBackgroundLayer = 'background-layer-wcag';

      }
    },





    // do not erase curly brackets below
  },
}
</script>
<style scoped>


.scale-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content:left;
  align-items: flex-start;  /* <-- this keeps it top-aligned */
  /* background-color: red; */
}

.grid-container {
  /* width: 1440px;  */
  height: 1068px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 7% repeat(8, 1fr);
  width: 100vw;
  /* height: 100vh; */
  transform-origin: top center;
  transition: transform 0.3s ease; 
  /* background-color: green; */
}

.header {
  grid-column: 1/13;
  grid-row: 1 / 2;
}

.background-layer {
  grid-column: 1 / 12;
  /* Full width */
  grid-row: 1 / 9;
  /* Covers rows 2 to 9 */
  background-image: url("/icons/xyz.svg");
  background-repeat: no-repeat;
  background-size: contain;
  /* background-position: center; */
  z-index: -1;
  /* Sends it to the background */
}



.background-layer-grayscale {
  grid-column: 1 / 9;
  /* Full width */
  grid-row: 1 / 9;
  /* Covers rows 2 to 9 */
  background-image: url("/icons/xyz-gray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  /* background-position: center; */
  z-index: -1;
  /* Sends it to the background */
}


.background-layer-highContrast {
  grid-column: 1 / 9;
  /* Full width */
  grid-row: 1 / 9;
  /* Covers rows 2 to 9 */
  background-image: url("/icons/xyz-highContrast.svg");
  background-repeat: no-repeat;
  background-size: contain;
  z-index: -1;
  /* Sends it to the background */
}

/* BOXES */
.left-box,
.right-box,
.center-top-box,
.center-bottom-box {
  background-color: #FFFEF6;
  z-index: 3;
  /* Place content above grid and background */
  /* margin: 1em; */
  cursor: default;
  box-shadow:
    -6px 6px 0 var(--shadow),
    /* Thick left border */
    0 6px 1px var(--shadow);
  /* Thick bottom border */
}


.left-box {
  grid-column: 1 / 5;
  grid-row: 4 / 7;
  display: flex;
  width: 24.625rem;
  height: 16.5rem;
  /* width: 28.125vw;  */
  /* height: 24.719vh; */
  /* padding: 0.556vh; */
  padding: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  /* gap: 0.749vh; */
  /* border-radius: 12px; */
  border-radius: 1rem;
  border: 1px solid var(--primary-color);
  margin-left: 2.847vw;

}

.right-box,
.center-top-box,
.center-bottom-box {
  display: flex;
  width: 24.625rem;
  height: 16.9375rem;
  padding: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1rem;
  border: 1px solid var(--primary-color);
  /* width: 28.125vw; */
  /* height: 25.843vh; */
  /* gap: 0.749vh; */
  /* padding: 0.556vh; */
  /* border-radius: 12px; */
}

.center-top-box {
  grid-column: 5 / 9;
  grid-row: 2 / 5;

  margin-top: 2.809vw;
  margin-left: 2.847vw;
}

.center-bottom-box {
  grid-column: 5/9;
  grid-row: 6/ 9;
  margin-left: 6.111vw;
}

.right-box {
  grid-column: 9/13;
  grid-row: 4 / 7;
  margin-left: 2.847vw;
}


/* 
          .left-box {
              width: clamp(250px, 28.125vw, 600px);
              height: clamp(190px, 24.719vh, 400px);
          }

            .right-box,
            .center-top-box,
            .center-bottom-box {
              width: clamp(250px, 28.125vw, 600px);
              height: clamp(190px, 25.843vh, 400px);
            } */



.footer {
  grid-column: 1/13;
  grid-row: 9/10
}

/* BOX CONTENTS */
.left-box-heading {
  display: flex;
  padding: 0.5rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.5rem;
  /* border-radius: 8px; */
  background-color: var(--primary-color-left-box);
  /* padding-left: 0.556vw; */
  /* gap: 0.25em; */
  /* height: 4.026vh; */
  /* height: clamp(40px, 4.026vh, 60px);  */
  /* preferred ~43px */
}

.left-box-heading h2 {
  font-family: var(--font-family, 'Handjet'), sans-serif;
  color: var(--text-color-left-box);
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.015r
}

/* .left-box-heading img {
  width: 0.54rem;
  height: 0.819rem;
} */

.left-box-paragraph {
  display: flex;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  /* gap: 0.5rem; */
  align-self: stretch;
  border-radius: 0.5rem;
  /* border-radius: 8px; */
  background-color: var(--secondary-color-left-box);
  /* height: 15.73vh; */
  /* height: clamp(120px, 15.73vh, 220px); */
  /* preferred ~168px */
}

.left-box-paragraph p {
  width: 21.9375rem;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.05rem;
  /* padding: 0.556vh 0; */
  /* padding-left: 0.938vw; */
  color: var(--primary-color);
  font-family: 'Inter', sans-serif;
  /* font-size: var(--font-base); */
  font-weight: 400;
  /* height: 4.026vh; */
  /* height: clamp(36px, 4.026vh, 64px);  */
  /* preferred ~43px */
}

.learn-more-container {
  /* display: flex; */
  justify-content: center;
  align-items: center;
  /* gap: 0.5rem; */
  align-self: stretch;
  border-radius: 1rem;
  padding: 0.556vh 0.556vw;
  /* height: 2.903vh; */
  /* height: clamp(24px, 2.903vh, 48px);  */
  /* preferred ~31px */
}


.call-action {
  display: flex;
}

.ok-action {
  margin-left: auto;
}

.learn-more {
  width: 21.25rem;
  /* height: 1.9375rem; */
  /* flex-shrink: 0; */
  border-radius: 0.4375rem;
  color: var(--secondary-text-color);
  font-family: var(--font-family, 'Handjet'), sans-serif;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.0625rem;
  background-color: var(--secondary-color-left-box);

}

.connecting-empty-span {
  width: 1.625rem;
  height: 1rem;
  align-self: end;
  flex-shrink: 0;
  background-color: var(--secondary-color-left-box);
  clip-path: path('M0,0 Q50%,30% 100%,0 Q50%,100% 0,100% Z');
}


.ok-action {
  background-color: green;
  text-align: center;
  width: 1.875rem;
  /* height: 1.9375rem; */
  /* flex-shrink: 0; */
  border-radius: 0.4375rem;
  color: var(--secondary-text-color);
  font-family: var(--font-family, 'Handjet'), sans-serif;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.0625rem;
  background-color: var(--secondary-color-left-box);

}

.call-action:hover .learn-more,
.call-action:hover .connecting-empty-span,
.call-action:hover .ok-action {
  background-color: var(--hover-color-left-box);
  color: var(--hover-text-color-left-box);
}


/* Other boxes */

.other-box-heading {
  display: flex;
  padding: 0.5rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.5rem;
  background-color: var(--primary-color);
  /* padding-top: 2%; */
  gap: 0.25em;
  /* padding: 0.556vh 0; */
  /* padding-left: 0.556vw; */
  /* height: 4.026vh; */
  /* height: clamp(36px, 4.026vh, 64px);  */
  /* preferred ~43px */
}

.other-box-heading h2 {
  font-family: var(--font-family, 'Handjet'), sans-serif;
  color: white;
  font-size: var(--font-24px);
  font-weight: 400;

}

.other-box-subtitle {
  display: flex;
  padding: 0.5rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.5rem;
  gap: 0.5vw;
  background-color: var(--secondary-color);
  /* padding: 0.556vh 0; */
  /* padding-left: 0.556vw; */
  /* height: 3.277vh; */
  /* height: clamp(24px, 3.277vh, 48px);  */
  /* preferred ~35px */
}

.other-box-subtitle p {
  font-family: 'Inter', sans-serif;
  color: var(--primary-color);
  font-size: var(--font-base);
  font-weight: 400;
}

.other-box-subtitle img {
  width: 1vw;
}

.other-box-photos {
  display: flex;
  height: 8.25rem;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  align-self: stretch;
  /* display: block; */
  /* width: 100%; */
  /* height: 12.36vh; */
  /* height: clamp(120px, 12.36vh, 240px);  */
  /* preferred ~132px */
  border-radius: 0.5rem;
  background-color: var(--secondary-color);
}



.other-box-photos img {
  width: 100%;
}

.other-box-action-call {
  display: flex;
  border-radius: 0.5rem;
  font-family: var(--font-family, 'Handjet'), sans-serif;
  color: var(--primary-color);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.0625rem;
  align-self: stretch;
  /* font-size: var(--font-medium); */
  /* font-weight: 400; */
  /* padding: 0.556vh 0.556vw; */
  background-color: var(--secondary-color);
  /* align-items: center; */
  /* height: 2.903vh; */
}

/* <div class="other-box-action-call">
        <router-link :to="{ name: 'Artists' }" class="other-call-action">
          <span>Open Artists</span> <span class="call-goto-action" aria-hidden="true">></span>
        </router-link>
      </div> */



.other-call-action {
  width: 21.25rem;
  height: 1.9375rem;
  flex-shrink: 0;
  color: var(--primary-color);
  display: flex;
  justify-content: space-between;
  /* margin-left: 0.5em; */
  /* width: 92%; */

  /* or use margin-left: auto on .ok-action */
  /* width: 100%;  */

}


.other-goto-action {
  /* font-size: var(--font-medium); */
  font-weight: 400;
  margin-left: auto;
}

.other-box-action-call:hover {
  background-color: var(--hover-color);
}

.other-box-action-call:hover .other-call-action {
  color: var(--hover-text-color)
}



.other-box-action-call:hover .other-goto-action {
  color: var(--hover-text-color)
}

/* notification window */
.notification-window {
  display: flex;
  align-items: center;
  position: fixed;
  /* Ensures it's positioned relative to the viewport */
  bottom: 0vh;
  /* Adjust to place it above the footer */
  left: 50%;
  /* Center horizontally */
  transform: translateX(-50%);
  /* Center alignment */
  background-color: #f9f9f9;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-bottom: none;
  /* Removes the bottom border */
  border-radius: 60px 60px 0 0;
  /* Top-left and top-right corners rounded */
  padding: 1rem;
  width: 80%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  /* Ensure it appears above other elements */
  font-family: 'Inter', sans-serif;
  font-size: var(--font-xl);
  font-weight: 400;
}

.notification-dismiss-button {
  width: 20%;
  margin-left: 2%;
  /* margin-top: 0.5rem; */
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: var(--font-24px);
  font-weight: 400;
}

.notification-dismiss-button:hover {
  background-color: var(--primary-color);
}

/* New Footer Styles */
.footer {
  background-color: transparent;
  width: 100%;
  height: 15vh;
  overflow: hidden;
  /* Prevent horizontal overflow */
}

.footer-images {
  display: flex;
  gap: 1rem;
  animation: scroll 30s linear infinite;

  flex-wrap: nowrap;
  /* Keep images in a single line */
}

.footer-image {
  width: 5%;
  object-fit: contain;
  flex-shrink: 0;
}

@keyframes scroll {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0%);
    /* Scroll by 100% of the container width */
  }
}
</style>

<template>
  <div class="scale-wrapper">
    <div class="grid-container" ref="gridContainer">
      <div :class="['background-layer', currentBackgroundLayer]" aria-hidden="true"></div> <!-- New background layer -->

      <Topbar ref="topbar" :is-notification-visible="isNotificationVisible"
        @update-notification-visible="isNotificationVisible = $event" @theme-changed="updateTheme" />

      <!-- background image -->
      <div class="background-image" aria-hidden="true"></div>
      <div class="grid-background" aria-hidden="true"></div>


      <!-- cards -->
      <div class="left-box">
        <div class="left-box-heading">
          <img v-show="isPinkLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsPink.svg'" alt="">
          <img v-show="isGrayLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsGray.svg'" alt="">
          <img v-show="isHighContrastLeftCardIconVisible" :src="iconBasePath + 'sariSariIconWhite.svg'" alt="">
          <img v-show="isWCAGLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsHighContrast.svg'" alt="">
          <h2>Sari-Sari Xchange</h2>
        </div>
        <div class="left-box-paragraph">
          <p>SSX is a community-building research & creation project using Extended Reality (XR) (ie. Virtual,
            Augmented, Mixed Realities) to foster new works by artists from the Asian diaspora.
            <br><br>
            Sari-Sari Xchange Assetory (SSXA) is a virtual asset library created with and for the Asian diaspora
            community.
          </p>
        </div>
        <div class="learn-more-container">
          <a href="" class="call-action">
            <span class="learn-more">Learn More</span><span class="connecting-empty-span"></span> <span
              class="ok-action" aria-hidden="true">OK</span>
          </a>
        </div>

      </div>



      <div class="center-top-box">
        <div class="other-box-heading">
          <img :src="iconBasePath + 'asteriskWhite.svg'" alt="">
          <h2>Artists</h2>
        </div>
        <div class="other-box-subtitle">
          <img v-show="isDecoractionCardSubtitlePink" :src="iconBasePath + 'decorationCardSubtitlePink.svg'" alt="">
          <img v-show="isDecoractionCardSubtitleGray" :src="iconBasePath + 'decorationCardSubtitleGray.svg'" alt="">
          <img v-show="isDecoractionCardSubtitleHighContrast"
            :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="">
          <img v-show="isDecoractionCardSubtitleWCAG" :src="iconBasePath + 'decorationCardSubtitleWCAG.svg'" alt="">
          <p>Explore community assets created by artists.</p>

        </div>
        <div class="other-box-photos" aria-hidden="true">
          <img v-show="arePinkTopCenterCardSampleImagesVisible" :src="iconBasePath + 'sample-images-artists.png'"
            alt="">
          <img v-show="areGrayTopCenterCardSampleImagesVisible"
            :src="iconBasePath + 'sample-images-artists-grayscale.png'" alt="">
          <img v-show="areHighContrastTopCenterCardSampleImagesVisible"
            :src="iconBasePath + 'sample-images-artists-highContrast.png'" alt="">

        </div>

        <div class="other-box-action-call">
          <router-link :to="{ name: 'Artists' }" class="other-call-action">
            <span>Open Artists</span> <span class="call-goto-action" aria-hidden="true">></span>
          </router-link>
        </div>
      </div>




      <div class="center-bottom-box">
        <div class="other-box-heading">
          <img :src="iconBasePath + 'eventsIconWhite.svg'" alt="">
          <h2>Events</h2>
        </div>
        <div class="other-box-subtitle">
          <img v-show="isDecoractionCardSubtitlePink" :src="iconBasePath + 'decorationCardSubtitlePink.svg'" alt="">
          <img v-show="isDecoractionCardSubtitleGray" :src="iconBasePath + 'decorationCardSubtitleGray.svg'" alt="">
          <img v-show="isDecoractionCardSubtitleHighContrast"
            :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="">
          <img v-show="isDecoractionCardSubtitleWCAG" :src="iconBasePath + 'decorationCardSubtitleWCAG.svg'" alt="">
          <p>Assets created during SSX events.</p>
        </div>
        <div class="other-box-photos">
          <!-- <img :src="/sample-images-artists.png"> -->


        </div>
        <div class="other-box-action-call">
          <a href="" class="other-call-action">
            <router-link :to="{ name: 'Events' }" class="other-call-action">
              <span>Open Events</span> <span class="call-goto-action" aria-hidden="true">></span>
            </router-link>
          </a>
        </div>
      </div>


      <div class="right-box">
        <div class="other-box-heading">
          <img :src="iconBasePath + 'collectionsIconWhite.svg'" alt="">
          <h2>Collections</h2>
        </div>
        <div class="other-box-subtitle">
          <img v-show="isDecoractionCardSubtitlePink" :src="iconBasePath + 'decorationCardSubtitlePink.svg'" alt="">
          <img v-show="isDecoractionCardSubtitleGray" :src="iconBasePath + 'decorationCardSubtitleGray.svg'" alt="">
          <img v-show="isDecoractionCardSubtitleHighContrast"
            :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="">
          <img v-show="isDecoractionCardSubtitleWCAG" :src="iconBasePath + 'decorationCardSubtitleWCAG.svg'" alt="">
          <p>Explore collections by SSX.</p>
        </div>
        <div class="other-box-photos">
          <!-- <img :src="/sample-images-artists.png"> -->


        </div>
        <div class="other-box-action-call">
          <router-link :to="{ name: 'Collections' }" class="other-call-action">
            <span>Open Collections</span> <span class="call-goto-action" aria-hidden="true">></span>
          </router-link>
        </div>
      </div>


      <!-- Notification Window -->
      <div v-if="isNotificationVisible" class="notification-window">
        <p style="padding-left:0.25rem;padding-right:0.25rem;">
          This website stores accessibility menu settings you select in your browser to enhance your experience. No
          cookies or tracking are used.
        </p>
        <button @click="dismissNotification" class="notification-dismiss-button">Accept</button>
      </div>

      <!-- footer -->
      <div class="footer">
        <div v-show="areFooterImagesDefaultVisible" class="footer-images">
          <!-- First set of images -->
          <img :src="marqueeBasePath + 'item1.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item2.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item3.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item4.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item5.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item6.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item7.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item8.png'" alt="" class="footer-image">

          <!-- Duplicate set for smooth infinite scroll -->
          <img :src="marqueeBasePath + 'item1.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item2.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item3.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item4.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item5.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item6.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item7.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item8.png'" alt="" class="footer-image">

          <!-- Duplicate set for smooth infinite scroll -->
          <img :src="marqueeBasePath + 'item1.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item2.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item3.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item4.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item5.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item6.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item7.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item8.png'" alt="" class="footer-image">


          <!-- Duplicate set for smooth infinite scroll -->
          <img :src="marqueeBasePath + 'item1.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item2.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item3.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item4.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item5.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item6.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item7.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item8.png'" alt="" class="footer-image">

        </div>


        <div v-show="areFooterImagesGrayscaleVisible" class="footer-images">

          <img :src="marqueeBasePath + 'item1-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item2-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item3-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item4-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item5-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item6-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item7-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item8-gray.png'" alt="" class="footer-image">

          <img :src="marqueeBasePath + 'item1-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item2-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item3-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item4-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item5-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item6-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item7-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item8-gray.png'" alt="" class="footer-image">

          <img :src="marqueeBasePath + 'item1-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item2-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item3-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item4-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item5-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item6-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item7-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item8-gray.png'" alt="" class="footer-image">

          <img :src="marqueeBasePath + 'item1-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item2-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item3-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item4-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item5-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item6-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item7-gray.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item8-gray.png'" alt="" class="footer-image">
        </div>

        <div v-show="areFooterImagesHighContrastVisible" class="footer-images">

          <img :src="marqueeBasePath + 'item1-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item2-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item3-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item4-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item5-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item6-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item7-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item8-highContrast.png'" alt="" class="footer-image">

          <img :src="marqueeBasePath + 'item1-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item2-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item3-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item4-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item5-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item6-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item7-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item8-highContrast.png'" alt="" class="footer-image">

          <img :src="marqueeBasePath + 'item1-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item2-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item3-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item4-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item5-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item6-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item7-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item8-highContrast.png'" alt="" class="footer-image">

          <img :src="marqueeBasePath + 'item1-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item2-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item3-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item4-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item5-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item6-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item7-highContrast.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item8-highContrast.png'" alt="" class="footer-image">
        </div>


        <div v-show="areFooterImagesWCAGcolorsVisible" class="footer-images">

          <img :src="marqueeBasePath + 'item1-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item2-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item3-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item4-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item5-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item6-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item7-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item8-wcag.png'" alt="" class="footer-image">

          <img :src="marqueeBasePath + 'item1-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item2-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item3-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item4-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item5-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item6-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item7-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item8-wcag.png'" alt="" class="footer-image">

          <img :src="marqueeBasePath + 'item1-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item2-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item3-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item4-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item5-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item6-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item7-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item8-wcag.png'" alt="" class="footer-image">

          <img :src="marqueeBasePath + 'item1-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item2-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item3-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item4-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item5-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item6-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item7-wcag.png'" alt="" class="footer-image">
          <img :src="marqueeBasePath + 'item8-wcag.png'" alt="" class="footer-image">
        </div>

      </div>
    </div>
  </div>
</template>