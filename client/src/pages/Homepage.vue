<script>
import AccessibilityMenu from '../components/AccessibilityMenu.vue';
import Topbar from '../components/Topbar.vue';
import SimpleButton from '../widgets/SimpleButton.vue';
import artists from '/src/data/artists.json';
import events from '/src/data/events.json';
import collections from '/src/data/collections.json';
import LogoSection from '../components/LogoSection.vue';
import OddShapeButton from '../widgets/OddShapeButton.vue';


export default {
    components: {
        AccessibilityMenu, // Register the AccessibilityMenu component
        Topbar,
        SimpleButton,
        LogoSection,
        OddShapeButton
    },
    data() {
        return {
            interactiveMode: false, // 👈 this must exist
            iconBasePath: 'icons/', // Base path for icons
            artistBasePath: 'images/artists/',
            collectionsBasePath: 'images/collections/',
            eventsBasePath: 'images/events/',
            marqueeBasePath: 'images/marquee/',

            randomArtistImage: null,
            randomEventImage: null,
            randomCollectionImage: null,

            isNotificationVisible: true,

            isCollectionsHovered: false,
            isAboutHovered: false,
            isEventsHovered: false,
            isArtistsHovered: false,

            // leftbox

            isDefaultCardVisible: true,
            isPinkLeftCardIconVisible: false,
            isGrayLeftCardIconVisible: false,
            isHighContrastLeftCardIconVisible: false,
            isWCAGLeftCardIconVisible: false,


            // center-top-box images
            arePinkTopCenterCardSampleImagesVisible: true,
            areGrayTopCenterCardSampleImagesVisible: false,
            areHighContrastTopCenterCardSampleImagesVisible: false,

            // other boxes icons
            isDecoractionCardSubtitleDefault: true,
            isDecoractionCardSubtitlePink: false,
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
        this.loadInteractiveMode();
        this.updateScale();
        window.addEventListener("resize", this.updateScale);
        this.pickRandomArtistImage();   // ✅ add this line
        this.pickRandomEventImage();   // ✅ add this line
        this.pickRandomCollectionImage();   // ✅ add this line

    },



    beforeDestroy() {
        window.removeEventListener("resize", this.updateScale);
    },

    methods: {

        pickRandomArtistImage() {
            // Build list of full image URLs
            const thumbnails = artists.map(a => this.artistBasePath + a.thumbnail)
                .filter(path => !path.includes('Thumbnail_Anonymous.png'));


            // Helper
            const getRandom = () =>
                thumbnails[Math.floor(Math.random() * thumbnails.length)];

            // Assign three different random images
            this.randomArtistImage = getRandom();

        },


        pickRandomEventImage() {
            // Build list of full image URLs
            const thumbnails = events.map(a => this.eventsBasePath + a.thumbnail)
                .filter(path => !path.includes('events-thumbnail-placeholder.png'));


            // Helper
            const getRandom = () =>
                thumbnails[Math.floor(Math.random() * thumbnails.length)];

            // Assign three different random images
            this.randomEventImage = getRandom();
        },


        pickRandomCollectionImage() {
            // Build list of full image URLs
            const thumbnails = collections.map(a => this.collectionsBasePath + a.thumbnail)
                .filter(path => !path.includes('events-thumbnail-placeholder.png'));


            // Helper
            const getRandom = () =>
                thumbnails[Math.floor(Math.random() * thumbnails.length)];

            // Assign three different random images
            this.randomCollectionImage = getRandom();
        },


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

        toggleInteractiveMode() {
            try {
                this.interactiveMode = !this.interactiveMode;

                // Check if refs are available
                if (this.$refs.topbar && this.$refs.topbar.$refs.accessibilityMenu) {
                    this.$refs.topbar.$refs.accessibilityMenu.saveSettings({
                        interactiveMode: this.interactiveMode,
                    });
                } else {
                }
            } catch (error) {
                console.error('Error in dismissNotification:', error);
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

        loadInteractiveMode() {
            try {
                const savedSettings =
                    JSON.parse(localStorage.getItem('accessibilitySettings')) || {};
                this.interactiveMode = savedSettings.interactiveMode ?? false;
            } catch (error) {
                console.error('Error in loadInteractiveMode:', error);
            }
        },

        updateTheme(payload) {
            if (payload.theme === "default") {
                this.currentBackgroundLayer = 'background-layer';
                // leftbox
                this.isDefaultCardVisible = true
                this.isPinkLeftCardIconVisible = false
                this.isGrayLeftCardIconVisible = false
                this.isHighContrastLeftCardIconVisible = false
                this.isWCAGLeftCardIconVisible = false
                // center-top-box images
                this.arePinkTopCenterCardSampleImagesVisible = true
                this.areGrayTopCenterCardSampleImagesVisible = false
                this.areHighContrastTopCenterCardSampleImagesVisible = false
                // other boxes icons
                this.isDecoractionCardSubtitleDefault = true
                this.isDecoractionCardSubtitlePink = false;
                this.isDecoractionCardSubtitleGray = false;
                this.isDecoractionCardSubtitleHighContrast = false;
                this.isDecoractionCardSubtitleWCAG = false;
                // footer images
                this.areFooterImagesDefaultVisible = true;
                this.areFooterImagesGrayscaleVisible = false;
                this.areFooterImagesHighContrastVisible = false;
                this.areFooterImagesWCAGcolorsVisible = false;

            } else if (payload.theme === "originalInteractive") {

                this.isDefaultCardVisible = false;
                this.isPinkLeftCardIconVisible = true;
                this.isGrayLeftCardIconVisible = true;
                this.isHighContrastLeftCardIconVisible = false;
                this.isWCAGLeftCardIconVisible = false;
                // center-top-box
                this.arePinkTopCenterCardSampleImagesVisible = false;
                this.areGrayTopCenterCardSampleImagesVisible = true;
                this.areHighContrastTopCenterCardSampleImagesVisible = false;
                // other boxes icons
                this.isDecoractionCardSubtitleDefault = false;
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

            } else if (payload.theme === "grayscale") {

                this.isDefaultCardVisible = false;
                this.isPinkLeftCardIconVisible = false;
                this.isGrayLeftCardIconVisible = true;
                this.isHighContrastLeftCardIconVisible = false;
                this.isWCAGLeftCardIconVisible = false;
                // center-top-box
                this.arePinkTopCenterCardSampleImagesVisible = false;
                this.areGrayTopCenterCardSampleImagesVisible = true;
                this.areHighContrastTopCenterCardSampleImagesVisible = false;
                // other boxes icons
                this.isDecoractionCardSubtitleDefault = false;
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
                this.isDefaultCardVisible = false;
                this.isPinkLeftCardIconVisible = false;
                this.isGrayLeftCardIconVisible = false;
                this.isHighContrastLeftCardIconVisible = true;
                this.isWCAGLeftCardIconVisible = false;
                // center-top-box
                this.arePinkTopCenterCardSampleImagesVisible = false;
                this.areGrayTopCenterCardSampleImagesVisible = false;
                this.areHighContrastTopCenterCardSampleImagesVisible = true;
                // other boxes icons
                this.isDecoractionCardSubtitleDefault = false;
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
                this.isDecoractionCardSubtitleDefault = false;
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
.grid-container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
}

.topBar {
    flex: 0 0 auto;
}

/* BACKGROUNDS */
.background-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background-image: url("/backgrounds/xyz-homepage-pink.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}

.background-layer-grayscale {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background-image: url("/icons/xyz-gray.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

}


.background-layer-highContrast {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background-image: url("/icons/xyz-highContrast.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}



/* LEFT BOX */


/* 
.mainContainer {
    flex: 1 1 auto;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: stretch;
    justify-content: center;
} */


/* Large screens (desktops) */
.cardsContainer {
    /* background-color: red; */
    display: flex;
    margin: auto;
    width: 51.8125rem;
    height: 43.4375rem;
    flex-shrink: 0;
    gap: 3rem;

}



/* box sizes new design */
.cardsContainerLeftSide {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
}

/* Medium desktops / laptops (<= 1400px) */
@media (max-width: 1400px) {
    .cardsContainerLeftSide {
        gap: 1rem;
        margin-top: 0.75rem;
    }
}


/* left top box */

.left-top-box {
    width: 24.625rem;
    display: inline-flex;
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.4375rem;
    border: 1px solid var(--primary-color);
    background: var(--background-color);
}

/* LEFT BOX CONTENTS */
.left-top-box-heading {
    height: 2rem;
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    background-color: var(--primary-color-left-box);
}

.left-top-box-heading h2 {
    font-family: var(--font-family-Decorative);
    color: var(--text-color-left-box);
    font-size: 1.25rem;
    /* font-size: clamp(1rem, 1.85rem, 2rem); */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.015;
}

.left-top-box-heading img {
    width: 1.57994rem;
}

.left-top-box-paragraph {
    flex: 1 1 auto;
    display: flex;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 0.5rem;
    background-color: var(--secondary-color-left-box);
    overflow: auto;

}


.left-top-box-paragraph p {
    height: 4.75rem;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.05rem;
    color: var(--primary-color);
    font-family: 'Inter', sans-serif;
    font-weight: 400;
}




.left-top-box-action-call {
    height: 2rem;
    display: flex;
    border-radius: 0.5rem;
    font-family: var(--font-family-Decorative);
    color: var(--primary-color);
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.0625rem;
    align-self: stretch;
    /* background-color: var(--secondary-color-left-box); */
}

.left-top-box-call-action {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-shrink: 0;
    color: var(--primary-color);
    display: flex;
    justify-content: space-between;
    border-radius: 0.5rem;
    align-items: center;
    background-color: transparent;
    margin-right: 5rem;
}



.left-top-box-goto-action {
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    padding-right: 0rem;
}

/* Medium desktops / laptops (<= 1400px) */
@media (max-width: 1400px) {
    .left-goto-action {
        font-size: 1.5rem;
        padding-right: 0.25rem;
    }
}

/* left bottom box */

.left-bottom-box {
    display: flex;
    width: 24.625rem;
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.4375rem;
    border: 1px solid var(--primary-color);
    background: var(--background-color);
}

/* LEFT BOX CONTENTS */
.left-bottom-box-heading {
    height: 2rem;
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    background-color: var(--primary-color-left-box);
}

.left-bottom-box-heading h2 {
    font-family: var(--font-family-Decorative);
    color: var(--text-color-left-box);
    font-size: 1.25rem;
    /* font-size: clamp(1rem, 1.85rem, 2rem); */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.015;
}

.left-bottom-box-heading img {
    width: 1.57994rem;
}

.left-bottom-box-paragraph {
    flex: 1 1 auto;
    display: flex;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 0.5rem;
    background-color: var(--secondary-color-left-box);
    overflow: auto;
}


.left-bottom-box-paragraph p {
    height: 100%;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.05rem;
    color: var(--primary-color);
    font-family: 'Inter', sans-serif;
    font-weight: 400;
}





/* Medium desktops / laptops (<= 1400px) */
/* @media (max-width: 1400px) {
    .left-goto-action {
        font-size: 1.5rem;
        padding-right: 0.25rem;
    }
}
 */

/* box sizes new design */
.cardsContainerRightSide {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
}

@media (max-width: 1400px) {
    .cardsContainerRightSide {
        gap: 1rem;
        margin-top: 0.75rem;
    }
}


/* left top box */

.right-top-box {
    width: 24.625rem;
    display: inline-flex;
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.4375rem;
    border: 1px solid var(--primary-color);
    background: var(--background-color);
}

.right-top-box-heading {
    height: 2rem;
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    background-color: var(--primary-color-left-box);
}

.right-top-box-heading h2 {
    font-family: var(--font-family-Decorative);
    color: var(--text-color-left-box);
    font-size: 1.25rem;
    /* font-size: clamp(1rem, 1.85rem, 2rem); */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.015;
}

.right-top-box-subtitle {
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    gap: 0.5vw;
    background-color: var(--background-color);
    border: 1px solid #000;
}

.right-top-box-subtitle p {
    font-family: 'Inter', sans-serif;
    color: var(--primary-color);
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

@media (max-width: 1400px) {
    .right-top-box-subtitle p {
        font-size: 0.8rem;
    }
}

.right-top-box-heading img {
    width: 1.57994rem;
}

.right-top-box-photo img {
    display: flex;
    width: 23.625rem;
    height: 12.875rem;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    align-self: stretch;
    border-radius: 0.5rem;
}

.right-top-box-action-call {
    display: flex;
    border-radius: 0.5rem;
    font-family: var(--font-family-Decorative);
    color: var(--primary-color);
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.0625rem;
    align-self: stretch;
}

.right-top-box-call-action {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-shrink: 0;
    color: var(--primary-color);
    display: flex;
    justify-content: space-between;
    border-radius: 0.5rem;
    align-items: center;
    background-color: transparent;
    margin-right: 5rem;
}

.right-top-box-goto-action {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    padding-right: 0rem;

}

.right-top-box-goto-action img {
    width: 1.45881rem;
    height: 0.96119rem;
}



/* Medium desktops / laptops (<= 1400px) */
@media (max-width: 1400px) {
    .right-top-box-goto-action {
        font-size: 1.5rem;
        padding-right: 0.25rem;
    }
}

/* right bottom box */
.right-bottom-box {
    width: 24.625rem;
    display: inline-flex;
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.4375rem;
    border: 1px solid var(--primary-color);
    background: var(--background-color);
}

.right-bottom-box-heading {
    height: 2rem;
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    background-color: var(--primary-color-left-box);
}

.right-bottom-box-heading h2 {
    font-family: var(--font-family-Decorative);
    color: var(--text-color-left-box);
    font-size: 1.25rem;
    /* font-size: clamp(1rem, 1.85rem, 2rem); */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.015;
}

.right-bottom-box-subtitle {
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    gap: 0.5vw;
    background-color: var(--background-color);
    border: 1px solid #000;
}

.right-bottom-box-subtitle p {
    font-family: 'Inter', sans-serif;
    color: var(--primary-color);
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

@media (max-width: 1400px) {
    .right-bottom-box-subtitle p {
        font-size: 0.8rem;
    }
}

.right-bottom-box-heading {
    width: 23.62rem;
}

.right-bottom-box-photo img {
    display: flex;
    height: 8.25rem;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    align-self: stretch;
}



.right-bottom-box-action-call {
    display: flex;
    border-radius: 0.5rem;
    font-family: var(--font-family-Decorative);
    color: var(--primary-color);
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.0625rem;
    align-self: stretch;
}

.right-bottom-box-call-action {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-shrink: 0;
    color: var(--primary-color);
    display: flex;
    justify-content: space-between;
    border-radius: 0.5rem;
    align-items: center;
    background-color: transparent;
    margin-right: 5rem;
}



.right-bottom-box-goto-action {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    padding-right: 0rem;

}

.right-bottom-box-goto-action img {
    width: 1.45881rem;
    height: 0.96119rem;
}

.left-top-box:has(.left-top-box-action-call:hover),
.right-top-box:has(.right-top-box-action-call:hover),
.right-bottom-box:has(.right-bottom-box-action-call:hover){
    box-shadow: -4px 4px 0 0 var(--primary-color);
}




/* FOOTER */

.footer {
    /* flex: 0 0 auto; */
    background-image: url("/images/logos/logos-condensed.svg");
    background-size: contain;
    background-color: var(--background-color);
    display: flex;
    height: 6.6875rem;
    border-radius: 0.5rem;
    border: 1px solid var(--primary-color);
    margin-left: 2.28rem;
    margin-right: 2.28rem;
    margin-bottom: 0.5rem;
}


/* Medium desktops / laptops (<= 1400px) */
@media (max-width: 1400px) {
    .footer-image {
        width: 4%;
        object-fit: contain;
        flex-shrink: 0;
    }
}
</style>

<template>

    <div class="grid-container">
        <div :class="['background-layer', currentBackgroundLayer]" aria-hidden="true"></div>
        <div :class="['background-lines']" aria-hidden="true"></div>

        <!-- New background layer -->
        <div class="topBar">
            <Topbar ref="topbar" :interactive-mode="interactiveMode" :is-notification-visible="isNotificationVisible"
                @update-notification-visible="isNotificationVisible = $event" @theme-changed="updateTheme" />
        </div>

        <!-- background image -->
        <div class="background-image" aria-hidden="true"></div>
        <div class="grid-background" aria-hidden="true"></div>



        <div class="cardsContainer">
            <div class="cardsContainerLeftSide">
                <!-- left top box -->
                <div class="left-top-box">
                    <div class="left-top-box-heading">
                        <img v-show="isDefaultCardVisible" :src="iconBasePath + 'sariSariIconWhite.svg'" alt="">
                        <img v-show="isPinkLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsPink.svg'"
                            alt="">
                        <img v-show="isGrayLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsGray.svg'"
                            alt="">
                        <img v-show="isHighContrastLeftCardIconVisible" :src="iconBasePath + 'sariSariIconWhite.svg'"
                            alt="">
                        <img v-show="isWCAGLeftCardIconVisible"
                            :src="iconBasePath + 'greaterThanBracketsHighContrast.svg'" alt="">
                        <h2>Sari-Sari Xchange</h2>
                    </div>
                    <div class="left-top-box-paragraph">
                        <p>
                            SSX is a community-building research & creation project using Extended Reality (XR) (ie.
                            Virtual, Augmented, Mixed Realities) to foster new works by artists from the Asian
                            diaspora.
                        </p>
                    </div>


                    <div class="left-top-box-action-call" @mouseenter="isAboutHovered = true"
                        @mouseleave="isAboutHovered = false">

                        <OddShapeButton label="Learn More" iconText="OK" :to="{ name: '' }"
                            fillColor="var(--secondary-color-left-box)" hoverColor="var(--hover-color-main)" />
                    </div>
                </div>

                <!-- left bottom box -->

                <div class="left-bottom-box">
                    <div class="left-bottom-box-heading">
                        <img v-show="isDefaultCardVisible" :src="iconBasePath + 'sariSariIconWhite.svg'" alt="">
                        <img v-show="isPinkLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsPink.svg'"
                            alt="">
                        <img v-show="isGrayLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsGray.svg'"
                            alt="">
                        <img v-show="isHighContrastLeftCardIconVisible" :src="iconBasePath + 'sariSariIconWhite.svg'"
                            alt="">
                        <img v-show="isWCAGLeftCardIconVisible"
                            :src="iconBasePath + 'greaterThanBracketsHighContrast.svg'" alt="">
                        <h2>Land Acknowledgement</h2>
                    </div>
                    <div class="left-bottom-box-paragraph">
                        <p>As Settlers from the Asian Diaspora, we would like to recognize the importance of
                            acknowledging the Indigenous peoples on whose land we live and work.
                            <br></br>

                            The City of Hamilton and Toronto is situated upon the traditional territories of the
                            Erie,
                            Neutral, Huron-Wendat, Haudenosaunee and Mississaugas, Chippewa, now home to many
                            diverse
                            first nations, inuit, and metis peoples. This land is covered by the Dish With One Spoon
                            Wampum Belt Covenant, which was an agreement to share and care for the resources around
                            the
                            Great Lakes.
                            <br></br>

                            It is important that we continue to uphold the principles of the Dish with One Spoon
                            agreement by recognizing the rights and contributions of Indigenous peoples,
                            acknowledging
                            their ongoing struggle for justice as we move forward with this project. Taking
                            collaborative approaches to build community, we keep in mind that the shared space for
                            knowledge exchange that we create cannot be owned.
                        </p>
                    </div>
                </div>
            </div>

            <div class="cardsContainerRightSide">

                <!-- right top box -->
                <div class="right-top-box">

                    <div class="right-top-box-heading">
                        <img v-show="isDefaultCardVisible" :src="iconBasePath + 'asteriskWhite.svg'" alt="">
                        <img v-show="isPinkLeftCardIconVisible" :src="iconBasePath + 'asteriskWhite.svg'" alt="">
                        <img v-show="isGrayLeftCardIconVisible" :src="iconBasePath + 'asteriskWhite.svg'" alt="">
                        <img v-show="isHighContrastLeftCardIconVisible" :src="iconBasePath + 'asteriskWhite.svg'"
                            alt="">
                        <img v-show="isWCAGLeftCardIconVisible" :src="iconBasePath + 'asteriskWhite.svg'" alt="">
                        <h2>Projects</h2>
                    </div>
                    <!-- right top box -->
                    <div class="right-top-box-subtitle">
                        <img v-show="isDecoractionCardSubtitleDefault"
                            :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="">
                        <img v-show="isDecoractionCardSubtitlePink"
                            :src="iconBasePath + 'decorationCardSubtitlePink.svg'" alt="">
                        <img v-show="isDecoractionCardSubtitleGray"
                            :src="iconBasePath + 'decorationCardSubtitleGray.svg'" alt="">
                        <img v-show="isDecoractionCardSubtitleHighContrast"
                            :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="">
                        <img v-show="isDecoractionCardSubtitleWCAG"
                            :src="iconBasePath + 'decorationCardSubtitleWCAG.svg'" alt="">
                        <p>See what we’re up to!</p>
                    </div>
                    <div class="right-top-box-photo" aria-hidden="true">
                        <img src="/images/homepage/right-top-card-background-image.png" alt="">
                    </div>

                    <div class="right-top-box-action-call" @mouseenter="isAboutHovered = true"
                        @mouseleave="isAboutHovered = false">


                        <OddShapeButton label="Open Projects"
                            iconSrc='/icons/arrow-right-black.svg' iconAlt=""
                            :to="{ name: '' }" fillColor="var(--background-color)" hoverColor="var(--hover-color-main)" />


                    </div>
                </div>



                <!-- right bottom box -->
                <div class="right-bottom-box">

                    <div class="right-bottom-box-heading">
                        <img v-show="isDefaultCardVisible" :src="iconBasePath + 'collectionsIconWhite.svg'" alt="">
                        <img v-show="isPinkLeftCardIconVisible" :src="iconBasePath + 'collectionsIconWhite.svg'" alt="">
                        <img v-show="isGrayLeftCardIconVisible" :src="iconBasePath + 'collectionsIconWhite.svg'" alt="">
                        <img v-show="isHighContrastLeftCardIconVisible" :src="iconBasePath + 'collectionsIconWhite.svg'"
                            alt="">
                        <img v-show="isWCAGLeftCardIconVisible" :src="iconBasePath + 'collectionsIconWhite.svg'" alt="">
                        <h2>Assetory</h2>
                    </div>

                    <div class="right-bottom-box-subtitle">
                        <img v-show="isDecoractionCardSubtitleDefault"
                            :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="">
                        <img v-show="isDecoractionCardSubtitlePink"
                            :src="iconBasePath + 'decorationCardSubtitlePink.svg'" alt="">
                        <img v-show="isDecoractionCardSubtitleGray"
                            :src="iconBasePath + 'decorationCardSubtitleGray.svg'" alt="">
                        <img v-show="isDecoractionCardSubtitleHighContrast"
                            :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="">
                        <img v-show="isDecoractionCardSubtitleWCAG"
                            :src="iconBasePath + 'decorationCardSubtitleWCAG.svg'" alt="">
                        <p>Explore the online platform for more 3D assets.</p>
                    </div>
                    <div class="right-bottom-box-photo" aria-hidden="true">
                        <img src="/images/homepage/right-bottom-card-background-image.png" alt="">
                    </div>

                    <div class="right-bottom-box-action-call" @mouseenter="isAboutHovered = true"
                        @mouseleave="isAboutHovered = false">

                         <OddShapeButton label="Open SSXA"
                            iconSrc='/icons/arrow-right-black.svg' iconAlt=""
                            :to="{ name: 'Assetory' }" fillColor="var(--background-color)" hoverColor="var(--hover-color-main)" />
                    </div>
                </div>
            </div>

        </div>

        <div class="footer">
        </div>

    </div>

</template>