<script>
import teamData from '../data/team.json';
import GalleryGrid from '../components/GalleryGrid.vue'; // Import the Grid component
import AccessibilityMenu from '../components/AccessibilityMenu.vue';
import Topbar from '../components/Topbar.vue';
import SimpleButton from '../widgets/SimpleButton.vue';
import artists from '/src/data/artists.json';
import events from '/src/data/events.json';
import collections from '/src/data/collections.json';
import LogoSection from '../components/LogoSection.vue';
import OddShapeButton from '../widgets/OddShapeButton.vue';
import Marquee from '../components/Marquee.vue';
import Footer from '../components/Footer.vue'; // Import the Footer component
import ContactForm from '../components/ContactForm.vue'



export default {
    components: {
        AccessibilityMenu, // Register the AccessibilityMenu component
        Topbar,
        SimpleButton,
        LogoSection,
        OddShapeButton,
        Marquee,
        GalleryGrid,
        Footer,
        ContactForm
    },
    data() {
        return {
            currentTheme: { theme: 'default' }, // Default theme
            interactiveMode: false, // 👈 this must exist
            iconBasePath: 'icons/', // Base path for icons
            artistBasePath: 'images/artists/',
            collectionsBasePath: 'images/collections/',
            eventsBasePath: 'images/events/',
            marqueeBasePath: 'images/marquee/',
            galleryName: '',
            galleryDescription: '',
            basePath: 'team/',
            routeName: '',
            data: teamData,

            iconHoveredSrc: '/icons/arrow-right-black.svg',
            isNotificationVisible: true,

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
                this.iconHoveredSrc = '/icons/arrow-right-black.svg';

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
                this.iconHoveredSrc = '/icons/arrow-right-black.svg';

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
                this.iconHoveredSrc = '/icons/arrow-right-black.svg';

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
                this.iconHoveredSrc = '/icons/arrow-right-white.svg';

            }
        },





        // do not erase curly brackets below
    },
}
</script>
<style scoped>
.grid-container {
    background-color: var(--background-color-main);
    display: flex;
    flex-direction: column;
    /* width: 100vw; */
    /* height: 100vh; */
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
    padding-left: 3rem;
    padding-right: 3rem;
    width: 100%;
    /* height: 43.4375rem; */
    /* justify-content: center; */
    /* Center cards horizontally */
    flex-shrink: 0;
    gap: 3rem;
    /* background-color: blue; */
}

/* Mobile adjustments */
@media (max-width: 768px) {
    .cardsContainer {
        flex-wrap: wrap;
        width: 100%;
        /* Use full screen width */
        gap: 1rem;
        /* Smaller gap for mobile */
    }
}

/* box sizes new design */
.cardsContainerLeftSide {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    /* background-color: red; */


}

.cardsContainerLeftSideTop {
    width: 100%;
    display: flex;
    gap: 1.8rem;
    align-items: center;
    justify-content: center;
    /* background-color: green; */
}

/* Medium desktops / laptops (<= 1400px) */
@media (max-width: 1400px) {
    .cardsContainerLeftSide {
        gap: 1rem;
        margin-top: 0.75rem;
    }
}


/* left top box */

.sarisariXchangeBlurbContiner {

    width: 18.7rem;
    height: 22rem;
    display: inline-flex;
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.4375rem;
    border: 1px solid var(--primary-border-color-main);
    background: var(--background-color-cards-main);
}

/* LEFT BOX CONTENTS */
.sarisariXchangeBlurbContiner-heading {
    height: 2rem;
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    background-color: var(--background-color-card-heading-one);
}

.sarisariXchangeBlurbContiner-heading h2 {
    font-family: var(--font-family-Decorative);
    color: var(--text-color-left-box);
    font-size: 1.25rem;
    /* font-size: clamp(1rem, 1.85rem, 2rem); */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.015;
}

.sarisariXchangeBlurbContiner-heading img {
    width: 1.25rem;
}

.sarisariXchangeBlurbContiner-paragraph {
    flex: 1 1 auto;
    /* display: flex; */
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 0.5rem;
    background-color: transparent;
    overflow: auto;

}


.sarisariXchangeBlurbContiner-paragraph p {
    /* height: 4.75rem; */
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.05rem;
    color: var(--primary-color-main);
    font-family: 'Inter', sans-serif;
    font-weight: 400;
}




.sarisariXchangeBlurbContiner-action-call {
    height: 2rem;
    display: flex;
    border-radius: 0.5rem;
    font-family: var(--font-family-Decorative);
    color: var(--primary-color-main);
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.0625rem;
    align-self: stretch;
}

.sarisariXchangeBlurbContiner-call-action {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-shrink: 0;
    color: var(--primary-color-main);
    justify-content: space-between;
    border-radius: 0.5rem;
    align-items: center;
    background-color: transparent;
    margin-right: 5rem;
}



.sarisariXchangeBlurbContiner-goto-action {
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

.sarisariXchangeLandAcknowledgementContainer {
    display: flex;
    width: 49.43rem;
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.4375rem;
    border: 1px solid var(--primary-border-color-main);
    background-color: transparent;
}

/* LEFT BOX CONTENTS */
.sarisariXchangeLandAcknowledgementContainer-heading {
    height: 2rem;
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    background-color: var(--background-color-card-heading-one);
}

.sarisariXchangeLandAcknowledgementContainer-heading h2 {
    font-family: var(--font-family-Decorative);
    color: var(--text-color-left-box);
    font-size: 1.25rem;
    /* font-size: clamp(1rem, 1.85rem, 2rem); */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.015;
}

.sarisariXchangeLandAcknowledgementContainer-heading img {
    width: 1.25rem;
}

.sarisariXchangeLandAcknowledgementContainer-paragraph {
    flex: 1 1 auto;
    display: flex;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 0.5rem;
    background-color: transparent;
    overflow: auto;
}


.sarisariXchangeLandAcknowledgementContainer-paragraph p {
    height: 100%;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.05rem;
    color: var(--primary-color-main);
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


/* right top box */

.exploreProjectsContainer {
    width: 51.62rem;
    height: 40.97rem;
    display: inline-flex;
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.4375rem;
    border: 1px solid var(--primary-border-color-main);
    background: var(--background-color-cards-main);
}

.exploreProjectsContainer-heading {
    height: 2rem;
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    background-color: var(--background-color-card-heading-two);
}

.exploreProjectsContainer-heading h2 {
    font-family: var(--font-family-Decorative);
    color: var(--color-card-heading-two);
    font-size: 1.25rem;
    /* font-size: clamp(1rem, 1.85rem, 2rem); */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.015;
}

.exploreProjectsContainer-subtitle {
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    gap: 0.5vw;
    background-color: transparent;
    border: 1px solid #000;
}

.exploreProjectsContainer-subtitle p {
    font-family: 'Inter', sans-serif;
    color: var(--secondary-color-main);
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

@media (max-width: 1400px) {
    .exploreProjectsContainer-subtitle p {
        font-size: 0.8rem;
    }
}

.exploreProjectsContainer-subtitle img {
    width: 1.18756rem;
    height: 0.71619rem;
}

.exploreProjectsContainer-heading img {
    width: 0.94rem;
}

.exploreProjectsContainer-photo img {
    display: flex;
    /* width: 23.625rem;
    height: 12.875rem; */
    width: 100%;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    align-self: stretch;
    border-radius: 0.5rem;
}

.exploreProjectsContainer-action-call {
    /* background-color: red; */
    width: 100%;
    /* O los píxeles exactos que quieras estirarlo, ej: 450px */
    /* height: 48px; */
    display: flex;
    border-radius: 0.5rem;
    font-family: var(--font-family-Decorative);
    color: var(--primary-color-main);
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.0625rem;
    align-self: stretch;
}

.exploreProjectsContainer-call-action {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-shrink: 0;
    color: var(--primary-color-main);
    display: flex;
    justify-content: space-between;
    border-radius: 0.5rem;
    align-items: center;
    background-color: transparent;
    margin-right: 5rem;
}

.exploreProjectsContainer-goto-action {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    padding-right: 0rem;

}

.exploreProjectsContainer-goto-action img {
    width: 1.45881rem;
    height: 0.96119rem;

}



/* Medium desktops / laptops (<= 1400px) */
@media (max-width: 1400px) {
    .exploreProjectsContainer-goto-action {
        font-size: 1.5rem;
        padding-right: 0.25rem;
    }
}

/* right bottom box */
.exploreAssetoryContainer {
    width: 24.625rem;
    height: 18rem;
    display: inline-flex;
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.4375rem;
    border: 1px solid var(--primary-border-color-main);
    background: var(--background-color-cards-main);
}

.exploreAssetoryContainer-heading {
    height: 2rem;
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    background-color: var(--background-color-card-heading-two);
}

.exploreAssetoryContainer-heading h2 {
    font-family: var(--font-family-Decorative);
    color: var(--color-card-heading-two);
    font-size: 1.25rem;
    /* font-size: clamp(1rem, 1.85rem, 2rem); */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.015;
}

.exploreAssetoryContainer-heading img {
    width: 0.94rem;
}

.exploreAssetoryContainer-subtitle {
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    gap: 0.5vw;
    background-color: transparent;
    border: 1px solid var(--primary-border-color-main);
}

.exploreAssetoryContainer-subtitle p {
    font-family: 'Inter', sans-serif;
    color: var(--secondary-color-main);
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

@media (max-width: 1400px) {
    .exploreAssetoryContainer-subtitle p {
        font-size: 0.8rem;
    }
}

.exploreAssetoryContainer-subtitle img {
    width: 1.18756rem;
    height: 0.71619rem;
}

.exploreAssetoryContainer-heading {
    width: 23.62rem;
}

.exploreAssetoryContainer-photo img {
    display: flex;
    height: 8.25rem;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    align-self: stretch;
}



.exploreAssetoryContainer-action-call {
    height: 2rem;
    display: flex;
    border-radius: 0.5rem;
    font-family: var(--font-family-Decorative);
    color: var(--primary-color-main);
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.0625rem;
    align-self: stretch;
}

.exploreAssetoryContainer-call-action {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-shrink: 0;
    color: var(--primary-color-main);
    display: flex;
    justify-content: space-between;
    border-radius: 0.5rem;
    align-items: center;
    background-color: transparent;
    margin-right: 5rem;
}



.exploreAssetoryContainer-goto-action {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    padding-right: 0rem;

}

.exploreAssetoryContainer-goto-action img {
    width: 1.45881rem;
    height: 0.96119rem;
}

/* This triggers when the box is hovered OR when any child inside it gets focus */
.sarisariXchangeBlurbContiner:hover,
.sarisariXchangeBlurbContiner:focus-within,
.exploreProjectsContainer:hover,
.exploreProjectsContainer:focus-within,
.exploreAssetoryContainer:hover,
.exploreAssetoryContainer:focus-within {
    box-shadow: -4px 4px 0 0 var(--primary-color);
}


.assetoryPromoContainer {
    display: flex;
    padding-left: 6rem;
    padding-right: 6rem;
    /* background-color: red; */
    align-items: center;
}

.assetoryPromo {
    width: 35.43rem;
    height: 15.6rem;
    display: inline-flex;
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.4375rem;
    border: 1px solid var(--primary-border-color-main);
    background: var(--background-color-main);

}

.assetoryPromoHeading {
    /* height: 2rem; */
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    background-color: var(--background-color-card-heading-two);
}

.assetoryPromoHeading h2 {
    font-family: var(--font-family-Decorative);
    color: var(--color-card-heading-two);
    font-size: 1.25rem;
    /* font-size: clamp(1rem, 1.85rem, 2rem); */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.015;
}

.assetoryPromoHeading img {
    width: 0.94rem;
}

.assetoryPromoParagraphPlusButtons {
    display: flex;
    gap: 1rem;
}

.assetoryPromoParagraph {
    background-color: transparent;
    color: var(--primary-color-main);
    width: 100%;
    font-size: 1.15rem;
}

.assetoryPromoButtons {
    font-size: 0.75rem;

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
    background-color: var(--background-color);
    border: 2px solid var(--primary-color);
    border-bottom: none;
    /* Removes the bottom border */
    border-radius: 60px 60px 0 0;
    /* Top-left and top-right corners rounded */
    padding: 1rem;
    width: 106.5625rem;
    height: 12.125rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
    /* Ensure it appears above other elements */

}

.notification-window p {
    width: 85%;
    color: var(--primary-color);
    font-family: 'Inter', sans-serif;
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.1rem;
    margin-left: 2.5rem;
    margin-right: 2.5rem;
}

.notification-dismiss-button {

    display: inline-flex;
    padding: 0.3125rem 1.25rem;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 600;
}

.notification-dismiss-button:hover {
    background-color: var(--primary-color);
}


/* FOOTER */

.footer {
    /* flex: 0 0 auto; */
    background-image: url("/images/logos/logos-condensed.svg");
    background-size: contain;
    background-color: var(--background-color);
    background-repeat: no-repeat;
    display: flex;
    height: 6.6875rem;
    border-radius: 0.5rem;
    border: 1px solid var(--primary-color);
    margin-left: 6.5rem;
    margin-right: 6.5rem;
    margin-bottom: 0.5rem;
}


/* Medium desktops / laptops (<= 1400px) */
@media (max-width: 1400px) {
    .footer-image {
        width: 4%;
        object-fit: contain;
        flex-shrink: 0;
    }

    .notification-window {
        width: 100%;
        height: auto;
        padding: 1rem;
        border-radius: 30px 30px 0 0;
    }

    .notification-window p {
        font-size: 1rem;
        margin-left: 1rem;
        margin-right: 1rem;
        letter-spacing: -0.05rem;
    }

    .notification-dismiss-button {
        font-size: 1rem;
        padding: 0.4rem 1rem;
    }
}

.form-section {
    /* background-color: red; */
    width: 100%;
    /* color: black; */
    /* background: red; */
    border-radius: 8px;
    /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); */
    padding-left: 6.5rem;
    padding-right: 6.5rem;
    /* max-width: 600px; */
    margin: 0 auto;
}
</style>

<template>

    <div class="grid-container">
        <div :class="['background-layer', currentBackgroundLayer]" aria-hidden="true"></div>
        <div :class="['background-lines']" aria-hidden="true"></div>


        <!-- New background layer -->
        <div class="topBar">
            <Topbar ref="topbar" :interactive-mode="interactiveMode" :is-notification-visible="isNotificationVisible"
                @update-notification-visible="isNotificationVisible = $event" @theme-changed="updateTheme"
                pageTitle="Sari Sari Xchange Project Homepage" />
        </div>

        <!-- background image -->
        <div class="background-image" aria-hidden="true"></div>
        <div class="grid-background" aria-hidden="true"></div>



        <div class="cardsContainer">
            <div class="cardsContainerLeftSide">

                <div class="cardsContainerLeftSideTop">
                    <!-- Sari Sari Xchange intro -->
                    <div class="sarisariXchangeBlurbContiner">
                        <div class="sarisariXchangeBlurbContiner-heading">
                            <img v-show="isDefaultCardVisible" :src="iconBasePath + 'sariSariIconWhite.svg'" alt=""
                                aria-hidden="true">
                            <img v-show="isPinkLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsPink.svg'"
                                alt="" aria-hidden="true">
                            <img v-show="isGrayLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsGray.svg'"
                                alt="" aria-hidden="true">
                            <img v-show="isHighContrastLeftCardIconVisible"
                                :src="iconBasePath + 'sariSariIconWhite.svg'" alt="" aria-hidden="true">
                            <img v-show="isWCAGLeftCardIconVisible"
                                :src="iconBasePath + 'greaterThanBracketsHighContrast.svg'" alt="" aria-hidden="true">
                            <h2>Sari-Sari Xchange</h2>
                        </div>
                        <div class="sarisariXchangeBlurbContiner-paragraph">
                            <p>The Sari-Sari Xchange is a community-building research & creation project using Extended
                                Reality (XR) (ie. Virtual, Augmented, Mixed Realities) to foster new works by artists
                                from
                                the Asian diaspora.

                                <br><br>

                                We undertake exploration in emergent XR technologies and new storytelling techniques,
                                address under-representation and issues of systemic racism as well as inaccessibility of
                                these new technologies for both creators and users with disabilities.
                            </p>
                        </div>


                        <!-- <div class="sarisariXchangeBlurbContiner-action-call" @mouseenter="isAboutHovered = true"
                        @mouseleave="isAboutHovered = false">

                        <OddShapeButton label="Learn More" iconText="OK" :to="{ name: 'About' }"
                            fillColor="var(--secondary-color-left-box)" hoverColor="var(--hover-color-main)" />
                    </div> -->
                    </div>


                    <!-- Assetory  -->
                    <div class="exploreAssetoryContainer">

                        <div class="exploreAssetoryContainer-heading">
                            <img v-show="isDefaultCardVisible" :src="iconBasePath + 'collectionsIconWhite.svg'" alt=""
                                aria-hidden="true">
                            <img v-show="isPinkLeftCardIconVisible" :src="iconBasePath + 'collectionsIconWhite.svg'"
                                alt="" aria-hidden="true">
                            <img v-show="isGrayLeftCardIconVisible" :src="iconBasePath + 'collectionsIconWhite.svg'"
                                alt="" aria-hidden="true">
                            <img v-show="isHighContrastLeftCardIconVisible"
                                :src="iconBasePath + 'collectionsIconWhite.svg'" alt="" aria-hidden="true">
                            <img v-show="isWCAGLeftCardIconVisible" :src="iconBasePath + 'collectionsIconWhite.svg'"
                                alt="" aria-hidden="true">
                            <h2>Assetory</h2>
                        </div>

                        <div class="exploreAssetoryContainer-subtitle">
                            <img v-show="isDecoractionCardSubtitleDefault"
                                :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt=""
                                aria-hidden="true">
                            <img v-show="isDecoractionCardSubtitlePink"
                                :src="iconBasePath + 'decorationCardSubtitlePink.svg'" alt="" aria-hidden="true">
                            <img v-show="isDecoractionCardSubtitleGray"
                                :src="iconBasePath + 'decorationCardSubtitleGray.svg'" alt="" aria-hidden="true">
                            <img v-show="isDecoractionCardSubtitleHighContrast"
                                :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt=""
                                aria-hidden="true">
                            <img v-show="isDecoractionCardSubtitleWCAG"
                                :src="iconBasePath + 'decorationCardSubtitleWCAG.svg'" alt="" aria-hidden="true">
                            <p>Explore the online platform for more 3D assets.</p>
                        </div>
                        <div class="exploreAssetoryContainer-photo" aria-hidden="true">
                            <img src="/images/homepage/right-bottom-card-background-image.png" alt=""
                                aria-hidden="true">
                        </div>

                        <div class="exploreAssetoryContainer-action-call" @mouseenter="isAboutHovered = true"
                            @mouseleave="isAboutHovered = false">

                            <OddShapeButton label="Open SSXA" iconSrc='/icons/arrow-right-black.svg'
                                :hoverIconSrc="iconHoveredSrc" iconAlt="" :to="{ name: 'Assetory' }"
                                fillColor="transparent" textColor="var(--secondary-color-main)"
                                hoverColor="var(--hover-color-main)" strokeColor="var(--primary-border-color-main)" />
                        </div>
                    </div>
                </div>

                <!-- Land acknowledgement -->

                <div class="sarisariXchangeLandAcknowledgementContainer">
                    <div class="sarisariXchangeLandAcknowledgementContainer-heading">
                        <img v-show="isDefaultCardVisible" :src="iconBasePath + 'sariSariIconWhite.svg'" alt=""
                            aria-hidden="true">
                        <img v-show="isPinkLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsPink.svg'"
                            alt="" aria-hidden="true">
                        <img v-show="isGrayLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsGray.svg'"
                            alt="" aria-hidden="true">
                        <img v-show="isHighContrastLeftCardIconVisible" :src="iconBasePath + 'sariSariIconWhite.svg'"
                            alt="" aria-hidden="true">
                        <img v-show="isWCAGLeftCardIconVisible"
                            :src="iconBasePath + 'greaterThanBracketsHighContrast.svg'" alt="" aria-hidden="true">
                        <h2>Land Acknowledgement</h2>
                    </div>
                    <div class="sarisariXchangeLandAcknowledgementContainer-paragraph">
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

                <!-- projects -->
                <div class="exploreProjectsContainer">

                    <div class="exploreProjectsContainer-heading">
                        <img v-show="isDefaultCardVisible" :src="iconBasePath + 'asteriskWhite.svg'" alt=""
                            aria-hidden="true">
                        <img v-show="isPinkLeftCardIconVisible" :src="iconBasePath + 'asteriskWhite.svg'" alt=""
                            aria-hidden="true">
                        <img v-show="isGrayLeftCardIconVisible" :src="iconBasePath + 'asteriskWhite.svg'" alt=""
                            aria-hidden="true">
                        <img v-show="isHighContrastLeftCardIconVisible" :src="iconBasePath + 'asteriskWhite.svg'" alt=""
                            aria-hidden="true">
                        <img v-show="isWCAGLeftCardIconVisible" :src="iconBasePath + 'asteriskWhite.svg'" alt=""
                            aria-hidden="true">
                        <h2>Projects</h2>
                    </div>

                    <div class="exploreProjectsContainer-subtitle">
                        <img v-show="isDecoractionCardSubtitleDefault"
                            :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="" aria-hidden="true">
                        <img v-show="isDecoractionCardSubtitlePink"
                            :src="iconBasePath + 'decorationCardSubtitlePink.svg'" alt="" aria-hidden="true">
                        <img v-show="isDecoractionCardSubtitleGray"
                            :src="iconBasePath + 'decorationCardSubtitleGray.svg'" alt="" aria-hidden="true">
                        <img v-show="isDecoractionCardSubtitleHighContrast"
                            :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="" aria-hidden="true">
                        <img v-show="isDecoractionCardSubtitleWCAG"
                            :src="iconBasePath + 'decorationCardSubtitleWCAG.svg'" alt="" aria-hidden="true">
                        <p>See what we’re up to!</p>
                    </div>


                    <div class="exploreProjectsContainer-photo" aria-hidden="true">
                        <img src="/images/homepage/right-top-card-background-image.png" alt="" aria-hidden="true">
                    </div>

                    <div class="exploreProjectsContainer-action-call" @mouseenter="isAboutHovered = true"
                        @mouseleave="isAboutHovered = false">
                        <OddShapeButton label="Open Projects" iconSrc='/icons/arrow-right-black.svg'
                            :hoverIconSrc="iconHoveredSrc" iconAlt="" :to="{ name: '' }" fillColor="transparent"
                            textColor="var(--secondary-color-main)" hoverColor="var(--hover-color-main)"
                            strokeColor="var(--primary-border-color-main)" />
                    </div>

                </div>
            </div>
        </div>

        <!-- marquee -->
        <div class="assetoryPromoContainer">
            <div class="assetoryPromo">
                <div class="assetoryPromoHeading">
                    <img v-show="isDefaultCardVisible" :src="iconBasePath + 'sariSariIconWhite.svg'" alt=""
                        aria-hidden="true">
                    <img v-show="isPinkLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsPink.svg'" alt=""
                        aria-hidden="true">
                    <img v-show="isGrayLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsGray.svg'" alt=""
                        aria-hidden="true">
                    <img v-show="isHighContrastLeftCardIconVisible" :src="iconBasePath + 'sariSariIconWhite.svg'" alt=""
                        aria-hidden="true">
                    <img v-show="isWCAGLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsHighContrast.svg'"
                        alt="" aria-hidden="true">
                    <h2>Hey, we’ve got more!</h2>
                </div>

                <div class="assetoryPromoParagraphPlusButtons">
                    <div class="assetoryPromoParagraph">
                        <p>We’ve been working on a open-source asset library that highlights artists and their 3D work.
                            Yeah, sounds cool. Check it out & stay in touch.
                        </p>
                    </div>
                    <div class="assetoryPromoButtons">
                        <SimpleButton :to="{ name: '' }" text="Visit the SSX Assetory"
                            :icon="iconBasePath + 'arrow-right-black.svg'" />
                        <SimpleButton :to="{ name: 'Submit Your Work Form' }" text="Submit your work"
                            :icon="iconBasePath + 'submit-your-work-icon-black.svg'" />
                        <SimpleButton :to="{ name: '' }" text="Instagram" icon="" />
                    </div>
                </div>
            </div>

            <Marquee :are-footer-images-default-visible="true" />
        </div>

        <!-- Collections Grid -->
        <GalleryGrid :items="data" :galleryName="galleryName" :galleryDescription="galleryDescription"
            :basePath="basePath" :routeName="routeName" :showSearchBar="false" :is-homepage="true"
            :theme="currentTheme.theme" />

        <!-- contact form -->
        <section class="form-section">
            <ContactForm backgroundColor="var(--background-color-cards-main-two)"/>
        </section>

        <!-- Notification Window -->
        <div v-if="isNotificationVisible" class="notification-window">
            <p>
                This website stores accessibility menu settings you select in your browser to enhance your
                experience.
                No
                cookies or tracking are used.
            </p>
            <button @click="dismissNotification" class="notification-dismiss-button">Accept</button>
        </div>



        <div class="footer">
        </div>

        <!-- footer -->

        <Footer :theme="currentTheme" />

    </div>

</template>
