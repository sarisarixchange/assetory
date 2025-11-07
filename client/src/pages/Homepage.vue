<script>
import AccessibilityMenu from '../components/AccessibilityMenu.vue';
import Topbar from '../components/Topbar.vue';
import SimpleButton from '../widgets/SimpleButton.vue';
import artists from '/src/data/artists.json';
import events from '/src/data/events.json';
import collections from '/src/data/collections.json';


export default {
    components: {
        AccessibilityMenu, // Register the AccessibilityMenu component
        Topbar,
        SimpleButton
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

            // leftbox

            isDefaultCardVisible: true,
            isPinkLeftCardIconVisible: true,
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
    /* display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr repeat(7, 1fr) 1fr; */
    display: flex;
    /* position: relative; */

    flex-direction: column;
    width: 100vw;
    /* height: var(--container-height, 100vh); */
    height: 100vh;
    /* default */
}



/* .topBar {
    grid-column: 1/13;
    grid-row: 1 / 2;
} */

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
    background-image: url("/icons/xyz.svg");
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

/* background legacy design */

.background-layer-legacy {
    position: absolute;
    top: 0;
    left: 50;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background-image: url("/icons/xyz.svg");
    background-repeat: no-repeat;
    background-size: 100%;
}

.background-layer-grayscale-legacy {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background-image: url("/icons/xyz-gray.svg");
    background-repeat: no-repeat;
    background-size: 75%;
}


.background-layer-highContrast-legacy {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background-image: url("/icons/xyz-highContrast.svg");
    background-repeat: no-repeat;
    background-size: 75%;

}

/* BACKGROUND LINES */
/* .background-lines {
    background-image: url("/icons/connectors-left.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50vw 50vh; 
    z-index: 0;
} */


/* LEFT BOX */

.left-box,
.right-box,
.center-top-box,
.center-bottom-box {
    background-color: var(--background-color);
    z-index: 3;
    cursor: default;
    box-shadow:
        -6px 6px 0 var(--shadow),
        /* Thick left border */
        0 6px 1px var(--shadow);
    /* Thick bottom border */
}

.homeSVG {

    flex: 1 1 auto;
    display: flex;
    /* background-color: red; */
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: stretch;
    justify-content: center;
}

.homeSVG #legacySVGContainer {
    margin-left: 10rem;
}

/* Large screens (desktops) */
.cardsContainer {

    margin: auto;
    width: 37.5%;
}

/* Medium desktops / laptops (<= 1400px) */
@media (max-width: 1400px) {
    .cardsContainer {
        width: 49%;
    }
}

/* Smaller laptops / large tablets (<= 1200px) */
@media (max-width: 1200px) {
    .cardsContainer {
        width: 50%;
    }
}

/* Small laptops / tablets (<= 1024px) */
@media (max-width: 1024px) {
    .cardsContainer {
        width: 55%;
    }
}


/* Tablets / portrait (<= 768px) */
@media (max-width: 768px) {
    .cardsContainer {
        width: 75%;
    }
}

/* Phones / small screens (<= 480px) */
@media (max-width: 480px) {
    .cardsContainer {
        width: 90%;
    }
}



/* box sizes new design */
.boxes-container {
    width: 24.625rem;
    height: 16.85363rem;
}

/* legacy boxes */

.left-box {
    grid-column: 1 / 5;
    grid-row: 4 / 7;
    display: flex;
    /* width: 24.625rem;
    height: 17.125rem; */
    /* width: clamp(20rem, 25vw, 26rem); */
    height: 100%;
    /* aspect-ratio: 24.625 / 17.125; */
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 1rem;
    border: 1px solid var(--primary-color);
    /* margin-left: 2.847vw; */
    box-sizing: border-box;


}

/* LEFT BOX CONTENTS */
.left-box-heading {
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    background-color: var(--primary-color-left-box);
}

.left-box-heading h2 {
    font-family: var(--font-family-Decorative);
    color: var(--text-color-left-box);
    /* font-size: 1.5rem; */
    font-size: clamp(1rem, 1.85rem, 2rem);
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.015;
}

.left-box-heading img {
    width: 1.57994rem;
}

.left-box-paragraph {
    flex: 1 1 auto;
    /* height: 50%; */
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
    overflow: auto;

}


.left-box-paragraph p {
    /* background-color: red; */
    /* width: 21.9375rem; */
    /* font-size: 1rem; */
    height: 100%;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.05rem;
    color: var(--primary-color);
    font-family: 'Inter', sans-serif;
    font-weight: 400;
}




.left-box-action-call {

    display: flex;
    border-radius: 0.5rem;
    font-family: var(--font-family-Decorative);
    color: var(--primary-color);
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.0625rem;
    align-self: stretch;
    /* background-color: var(--secondary-color-left-box); */
}

.left-call-action {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    width: 100%;
    height: 100%;
    display: flex;
    /* width: 21.25rem; */
    /* height: 1.9375rem; */
    flex-shrink: 0;
    color: var(--primary-color);
    display: flex;
    justify-content: space-between;
    border-radius: 0.5rem;
    align-items: center;
    background-color: transparent;
}



.left-goto-action {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    margin-right: 0.25rem;
}



.svgDefaultButton-left-box {
    fill: var(--secondary-color-left-box);
}


.svgDefaultButton-left-box:hover {
    fill: var(--hover-color-left-box);
}



/* Other boxes */


.right-box,
.center-top-box,
.center-bottom-box {
    display: flex;
    /* width: 24.625rem; */
    /* height: 16.9375rem; */
    height: 100%;
    /* width: clamp(20rem, 25vw, 26rem); */
    /* aspect-ratio: 24.625 / 16.9375; */
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 1rem;
    border: 1px solid var(--primary-color);
}

.center-top-box {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.center-bottom-box {
    grid-column: 5/9;
    grid-row: 6/ 9;
    /* margin-left: 6.111vw; */
    /* margin-left: clamp(2rem, 6.111vw, 4rem); */

}

.right-box {
    grid-column: 9/13;
    grid-row: 4 / 7;
    /* margin-left: 2.847vw; */
    /* margin-left: clamp(1rem, 2.5vw, 2rem); */
    /* justify-self: center; */

}


/* Other boxes contents */

.other-box-heading {
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    background-color: var(--primary-color);
    gap: 0.25em;
}

.other-box-heading h2 {
    font-family: var(--font-family-Decorative);
    color: white;
    font-size: clamp(1rem, 1.85rem, 2rem);
    font-style: normal;
    font-weight: 400;
    line-height: normal;

}

.other-box-heading,
.other-box-action-call {
    flex-shrink: 0;

}

.other-box-heading img {
    width: 0.94081rem;

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

}

.other-box-subtitle p {
    font-family: 'Inter', sans-serif;
    color: var(--primary-color);
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

/* For smaller screens */
@media (max-width: 1200px) {
    .left-box-paragraph p {
        font-size: 1.5rem;
    }


}

/* for larger screens */
@media (min-width: 1440px) {

    .left-box-paragraph p,
    .other-box-subtitle p {
        font-size: 0.9rem;
    }

}


.other-box-subtitle img {
    width: 1.18756rem;
}

.other-box-photos {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    align-self: stretch;
    border-radius: 0.5rem;
    background-color: var(--secondary-color);
    overflow: hidden;
    /* Prevents overflow */
}


.other-box-photos img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
}

.other-box-action-call {
    display: flex;
    border-radius: 0.5rem;
    font-family: var(--font-family-Decorative);
    color: var(--primary-color);
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.0625rem;
    align-self: stretch;
    background-color: transparent;

}

/* .svgDefaultButton-other-box {
    fill: var(--secondary-color);
    stroke: var(--homepage-card-buttons-border-color);

} */



.svgDefaultButton-other-box .oddShapeButton {
    fill: var(--secondary-color);
    stroke: var(--homepage-card-buttons-border-color);
}

.svgDefaultButton-other-box:hover .oddShapeButton {
    fill: var(--hover-color);
    stroke: var(--homepage-card-buttons-border-color);
}

.svgDefaultButton-left-box .oddShapeButton {
    fill: var(--secondary-color-left-box);
    stroke: var(--homepage-left-card-button-border-color);
}

.svgDefaultButton-left-box:hover .oddShapeButton {
    fill: var(--hover-color-left-box);
    stroke: var(--homepage-left-card-button-border-color);
}




.other-call-action {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    width: 100%;
    height: 100%;
    display: flex;
    /* width: 21.25rem; */
    /* height: 1.9375rem; */
    flex-shrink: 0;
    color: var(--primary-color);
    display: flex;
    justify-content: space-between;
    border-radius: 0.5rem;
    align-items: center;
}



.call-goto-action {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    height: 100%;
}

/* .svgDefaultButton-other-box:hover {
    fill: var(--hover-color);
} */

.other-box-action-call:hover .other-call-action {
    color: var(--hover-text-color);
}

/* .goToArrow {

} */

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
    background-color: transparent;
    width: 100%;
    overflow: hidden;
}


.footer-images {
    display: flex;
    gap: 1rem;
    animation: scroll 30s linear infinite;
    flex-wrap: nowrap;
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

.right-connectors {
    stroke: var(--primary-color);

}

.right-ellipse {
    fill: var(--primary-color);
    stroke: var(--primary-color);

}

.left-connectors {
    stroke: var(--shadow);
}

.left-ellipse {
    fill: var(--shadow);
    stroke: var(--shadow);
}

.interactiveModeButton {
    width: 10rem;
    height: 2.1875rem;
    display: inline-block;
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 20px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    position: absolute;
    left: 0.94rem;
    top: 6.13rem;

    /* Thick bottom border */
}

.interactiveModeButton:hover {
    color: var(--primary-color);
    box-shadow: -3px 3px 0 0 var(--shadow);
    /* background-color: var(--hover-color); */
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



        <div class="homeSVG">
            <!-- <button class="interactiveModeButton" @click="toggleInteractiveMode">
                {{ interactiveMode ? 'Interactive Mode On' : 'Interactive Mode Off' }}
            </button> -->
            <div class="cardsContainer" v-show="!interactiveMode">

                <svg id="revisedSVGContainer" viewBox="0 0 842 576" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="defaultTiles">
                        <g id="Events Node Idle">

                            <foreignObject x="8.5" y="306.5" width="393" height="269" rx="6.5">

                                <div class="center-bottom-box">
                                    <div class="other-box-heading">
                                        <img :src="iconBasePath + 'eventsIconWhite.svg'" alt="">
                                        <h2>Events</h2>
                                    </div>
                                    <div class="other-box-subtitle">
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
                                        <p>Assets created during SSX events.</p>
                                    </div>
                                    <div class="other-box-photos" aria-hidden="true">
                                        <img :src="randomEventImage" alt="">
                                    </div>


                                    <div class="other-box-action-call">
                                        <svg class="svgDefaultButton-other-box" viewBox="0 0 379 32"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path class="oddShapeButton"
                                                d="M6 0.5H335.09C337.525 0.5 339.5 2.47463 339.5 4.91016V6.99707C339.5 7.4492 339.722 7.84826 340.041 8.11133C342.339 10.0084 345.661 10.0084 347.959 8.11133C348.278 7.84826 348.5 7.4492 348.5 6.99707V4.91016C348.5 2.47463 350.475 0.5 352.91 0.5H372C375.038 0.5 377.5 2.96243 377.5 6V25C377.5 28.0376 375.038 30.5 372 30.5H354C350.962 30.5 348.5 28.0376 348.5 25V22.168C348.5 21.8592 348.368 21.5818 348.17 21.3818C345.873 19.0646 342.127 19.0646 339.83 21.3818C339.632 21.5818 339.5 21.8592 339.5 22.168V25C339.5 28.0376 337.038 30.5 334 30.5H6C2.96244 30.5 0.5 28.0376 0.5 25V6C0.5 2.96243 2.96243 0.5 6 0.5Z" />

                                            <foreignObject x="0" y="0" width="379" height="32">
                                                <a href="" class="other-call-action">
                                                    <router-link :to="{ name: 'Events' }" class="other-call-action">
                                                        <span>Open Events</span> <span class="call-goto-action"
                                                            aria-hidden="true">
                                                            <img class="goToArrow"
                                                                :src="iconBasePath + 'arrow-right-black.svg'" alt="">
                                                        </span>
                                                    </router-link>
                                                </a>
                                            </foreignObject>
                                        </svg>
                                    </div>
                                </div>
                            </foreignObject>

                            <circle id="Ellipse 9" cx="6.5" cy="389.5" r="5.5" fill="black" />
                            <circle id="Ellipse 10" cx="6.5" cy="404.5" r="5" fill="#FFFEFA" stroke="black" />
                            <circle id="Ellipse 12" cx="401.5" cy="439.5" r="5.5" fill="black" />
                            <circle id="Ellipse 11" cx="401.5" cy="454.5" r="5" fill="#FFFEFA" stroke="black" />
                        </g>


                        <g id="About Node Idle">
                            <foreignObject x="8.5" y="9.5" width="393" height="252" rx="6.5">
                                <div class="left-box">
                                    <div class="left-box-heading">
                                        <img v-show="isDefaultCardVisible" :src="iconBasePath + 'sariSariIconWhite.svg'"
                                            alt="">
                                        <img v-show="isPinkLeftCardIconVisible"
                                            :src="iconBasePath + 'greaterThanBracketsPink.svg'" alt="">
                                        <img v-show="isGrayLeftCardIconVisible"
                                            :src="iconBasePath + 'greaterThanBracketsGray.svg'" alt="">
                                        <img v-show="isHighContrastLeftCardIconVisible"
                                            :src="iconBasePath + 'sariSariIconWhite.svg'" alt="">
                                        <img v-show="isWCAGLeftCardIconVisible"
                                            :src="iconBasePath + 'greaterThanBracketsHighContrast.svg'" alt="">
                                        <h2>Sari-Sari Xchange</h2>
                                    </div>
                                    <div class="left-box-paragraph">
                                        <p>SSX is a community-building research & creation project using Extended
                                            Reality (XR) (ie. Virtual,
                                            Augmented, Mixed Realities) to foster new works by artists from the
                                            Asian diaspora.
                                            <br><br>
                                            Sari-Sari Xchange Assetory (SSXA) is a virtual asset library created
                                            with and for the Asian diaspora
                                            community.
                                        </p>
                                    </div>
                                    <div class="left-box-action-call">
                                        <svg class="svgDefaultButton-left-box" viewBox="0 0 379 32"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path class="oddShapeButton"
                                                d="M6 0.5H335.09C337.525 0.5 339.5 2.47463 339.5 4.91016V6.99707C339.5 7.4492 339.722 7.84826 340.041 8.11133C342.339 10.0084 345.661 10.0084 347.959 8.11133C348.278 7.84826 348.5 7.4492 348.5 6.99707V4.91016C348.5 2.47463 350.475 0.5 352.91 0.5H372C375.038 0.5 377.5 2.96243 377.5 6V25C377.5 28.0376 375.038 30.5 372 30.5H354C350.962 30.5 348.5 28.0376 348.5 25V22.168C348.5 21.8592 348.368 21.5818 348.17 21.3818C345.873 19.0646 342.127 19.0646 339.83 21.3818C339.632 21.5818 339.5 21.8592 339.5 22.168V25C339.5 28.0376 337.038 30.5 334 30.5H6C2.96244 30.5 0.5 28.0376 0.5 25V6C0.5 2.96243 2.96243 0.5 6 0.5Z" />
                                            <foreignObject x="0" y="0" width="379" height="32">
                                                <router-link :to="{ name: 'About' }" class="left-call-action">
                                                    <span>Learn More</span> <span class="left-goto-action"
                                                        aria-hidden="true">OK</span>
                                                </router-link>
                                            </foreignObject>
                                        </svg>
                                    </div>
                                </div>
                            </foreignObject>
                            <circle id="Ellipse 9_2" cx="6" cy="92.5" r="5.5" fill="black" />
                            <circle id="Ellipse 10_2" cx="6" cy="107.5" r="5" fill="#FFFEFA" stroke="black" />
                            <circle id="Ellipse 12_2" cx="401" cy="142.5" r="5.5" fill="black" />
                            <circle id="Ellipse 11_2" cx="401" cy="157.5" r="5" fill="#FFFEFA" stroke="black" />
                        </g>

                        <g id="Collections Node Idle">
                            <foreignObject x="443.5" y="306.5" width="393" height="267.809" rx="6.5">

                                <div class="right-box">
                                    <div class="other-box-heading">
                                        <img :src="iconBasePath + 'collectionsIconWhite.svg'" alt="">
                                        <h2>Collections</h2>
                                    </div>
                                    <div class="other-box-subtitle">
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
                                        <p>Explore collections by SSX.</p>
                                    </div>
                                    <div class="other-box-photos" aria-hidden="true">
                                        <img :src="randomCollectionImage" alt="">
                                    </div>




                                    <div class="other-box-action-call">
                                        <svg class="svgDefaultButton-other-box" viewBox="0 0 379 32"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path class="oddShapeButton"
                                                d="M6 0.5H335.09C337.525 0.5 339.5 2.47463 339.5 4.91016V6.99707C339.5 7.4492 339.722 7.84826 340.041 8.11133C342.339 10.0084 345.661 10.0084 347.959 8.11133C348.278 7.84826 348.5 7.4492 348.5 6.99707V4.91016C348.5 2.47463 350.475 0.5 352.91 0.5H372C375.038 0.5 377.5 2.96243 377.5 6V25C377.5 28.0376 375.038 30.5 372 30.5H354C350.962 30.5 348.5 28.0376 348.5 25V22.168C348.5 21.8592 348.368 21.5818 348.17 21.3818C345.873 19.0646 342.127 19.0646 339.83 21.3818C339.632 21.5818 339.5 21.8592 339.5 22.168V25C339.5 28.0376 337.038 30.5 334 30.5H6C2.96244 30.5 0.5 28.0376 0.5 25V6C0.5 2.96243 2.96243 0.5 6 0.5Z" />
                                            <foreignObject x="0" y="0" width="379" height="32">
                                                <router-link :to="{ name: 'Collections' }" class="other-call-action">
                                                    <span>Open Collections</span> <span class="call-goto-action"
                                                        aria-hidden="true">
                                                        <img class="goToArrow"
                                                            :src="iconBasePath + 'arrow-right-black.svg'" alt="">
                                                    </span>
                                                </router-link>
                                            </foreignObject>
                                        </svg>
                                    </div>
                                </div>
                            </foreignObject>
                            <circle id="Ellipse 9_3" cx="441.5" cy="390.5" r="5.5" fill="black" />
                            <circle id="Ellipse 10_3" cx="441.5" cy="405.5" r="5" fill="#FFFEFA" stroke="black" />
                            <circle id="Ellipse 12_3" cx="836.5" cy="439.5" r="5.5" fill="black" />
                            <circle id="Ellipse 11_3" cx="836.5" cy="454.5" r="5" fill="#FFFEFA" stroke="black" />
                        </g>

                        <g id="Artist Node Idle">
                            <foreignObject x="443.5" y="9.5" width="393" height="252" rx="6.5">

                                <div class="center-top-box">
                                    <div class="other-box-heading">
                                        <img :src="iconBasePath + 'asteriskWhite.svg'" alt="">
                                        <h2>Artists</h2>
                                    </div>
                                    <div class="other-box-subtitle">
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
                                        <p>Explore community assets created by artists.</p>

                                    </div>
                                    <div class="other-box-photos" aria-hidden="true">
                                        <img :src="randomArtistImage" alt="">
                                    </div>

                                    <div class="other-box-action-call">
                                        <svg class="svgDefaultButton-other-box" viewBox="0 0 379 32"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path class="oddShapeButton"
                                                d="M6 0.5H335.09C337.525 0.5 339.5 2.47463 339.5 4.91016V6.99707C339.5 7.4492 339.722 7.84826 340.041 8.11133C342.339 10.0084 345.661 10.0084 347.959 8.11133C348.278 7.84826 348.5 7.4492 348.5 6.99707V4.91016C348.5 2.47463 350.475 0.5 352.91 0.5H372C375.038 0.5 377.5 2.96243 377.5 6V25C377.5 28.0376 375.038 30.5 372 30.5H354C350.962 30.5 348.5 28.0376 348.5 25V22.168C348.5 21.8592 348.368 21.5818 348.17 21.3818C345.873 19.0646 342.127 19.0646 339.83 21.3818C339.632 21.5818 339.5 21.8592 339.5 22.168V25C339.5 28.0376 337.038 30.5 334 30.5H6C2.96244 30.5 0.5 28.0376 0.5 25V6C0.5 2.96243 2.96243 0.5 6 0.5Z" />
                                            <foreignObject x="0" y="0" width="379" height="32">
                                                <router-link :to="{ name: 'Artists' }" class="other-call-action">
                                                    <span class="call-action-text">Open Artists</span> <span
                                                        class="call-goto-action" aria-hidden="true">
                                                        <img class="goToArrow"
                                                            :src="iconBasePath + 'arrow-right-black.svg'" alt="">
                                                    </span>
                                                </router-link>
                                            </foreignObject>
                                        </svg>
                                    </div>
                                </div>
                            </foreignObject>
                            <circle id="Ellipse 12_4" cx="836.5" cy="133.5" r="5.5" fill="black" />
                            <circle id="Ellipse 11_4" cx="836.5" cy="148.5" r="5" fill="#FFFEFA" stroke="black" />
                            <circle id="Ellipse 10_4" cx="443.5" cy="98.5" r="5" fill="#FFFEFA" stroke="black" />
                            <circle id="Ellipse 9_4" cx="443.5" cy="83.5" r="5.5" fill="black" />
                        </g>
                    </g>
                </svg>
            </div>


            <!-- legacy homepage design -->

            <svg id="legacySVGContainer" v-show="interactiveMode" viewBox="0 0 1665 718" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g id="Group 641">
                    <g id="Group 594" class="right-connectors">
                        <path id="Artist Connector" d="M906 139.926C1026.16 148.939 1509.33 -114.93 1665 192"
                            stroke-width="2" stroke-linecap="round" />
                        <path id="Collections Connector" d="M1408 298C1736.5 357 1318.5 459 1665 512" stroke-width="2"
                            stroke-linecap="round" />
                        <path id="Events Connector" d="M959 575.445C1193.88 426.858 1341.36 693.874 1665 651.349"
                            stroke-width="2" stroke-linecap="round" />
                    </g>
                    <g id="Frame 26" clip-path="url(#clip0_2723_2)">
                        <g id="Artist Node Idle">

                            <foreignObject x="501.5" y="6.5" width="400" height="271">

                                <div class="center-top-box">
                                    <div class="other-box-heading">
                                        <img :src="iconBasePath + 'asteriskWhite.svg'" alt="">
                                        <h2>Artists</h2>
                                    </div>
                                    <div class="other-box-subtitle">
                                        <img v-show="isDecoractionCardSubtitlePink"
                                            :src="iconBasePath + 'decorationCardSubtitlePink.svg'" alt="">
                                        <img v-show="isDecoractionCardSubtitleGray"
                                            :src="iconBasePath + 'decorationCardSubtitleGray.svg'" alt="">
                                        <img v-show="isDecoractionCardSubtitleHighContrast"
                                            :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="">
                                        <img v-show="isDecoractionCardSubtitleWCAG"
                                            :src="iconBasePath + 'decorationCardSubtitleWCAG.svg'" alt="">
                                        <p>Explore community assets created by artists.</p>

                                    </div>
                                    <div class="other-box-photos" aria-hidden="true">
                                        <img v-show="arePinkTopCenterCardSampleImagesVisible"
                                            :src="artistBasePath + 'Thumbnail_Anonymous.png'" alt="">
                                        <img v-show="areGrayTopCenterCardSampleImagesVisible"
                                            :src="artistBasePath + 'Thumbnail_Anonymous.png'" alt="">
                                        <img v-show="areHighContrastTopCenterCardSampleImagesVisible"
                                            :src="artistBasePath + 'Thumbnail_Anonymous.png'" alt="">
                                    </div>

                                    <div class="other-box-action-call">
                                        <svg class="svgDefaultButton-other-box" viewBox="0 0 379 32"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M348.5 7.5C348.5 3.63401 351.634 0.5 355.5 0.5H371.5C375.366 0.5 378.5 3.63401 378.5 7.5V24.5C378.5 28.366 375.366 31.5 371.5 31.5H355.5C351.634 31.5 348.5 28.366 348.5 24.5V7.5Z" />
                                            <path
                                                d="M0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5H333.5C337.366 0.5 340.5 3.63401 340.5 7.5V24.5C340.5 28.366 337.366 31.5 333.5 31.5H7.49999C3.634 31.5 0.5 28.366 0.5 24.5V7.5Z" />
                                            <path
                                                d="M331.5 12.6361C331.5 7.79994 337.13 5.14705 340.859 8.22569C342.973 9.97029 346.027 9.97029 348.141 8.22569C351.87 5.14705 357.5 7.79994 357.5 12.6361V18.452C357.5 23.2484 351.691 25.6395 348.315 22.233C346.213 20.1131 342.787 20.1131 340.685 22.233C337.309 25.6395 331.5 23.2484 331.5 18.452V12.6361Z" />

                                            <foreignObject x="0" y="0" width="379" height="32">
                                                <router-link :to="{ name: 'Artists' }" class="other-call-action">
                                                    <span class="call-action-text">Open Artists</span> <span
                                                        class="call-goto-action" aria-hidden="true">></span>
                                                </router-link>
                                            </foreignObject>
                                        </svg>
                                    </div>
                                </div>
                            </foreignObject>

                            <g class="left-ellipse">
                                <circle cx="507" cy="90" r="5.5" />
                                <circle cx="507" cy="105" r="5.5" fill="#FFFEF6" />

                            </g>


                            <g class="right-ellipse">
                                <circle id="Ellipse 12" cx="901" cy="140" r="5.5" />
                                <circle id="Ellipse 11" cx="901" cy="155" r="5" fill="#FFFEF6" />
                            </g>
                        </g>

                        <g id="About Node Idle">

                            <foreignObject x="0" y="150" width="400" height="271">
                                <div class="left-box">
                                    <div class="left-box-heading">
                                        <img v-show="isPinkLeftCardIconVisible"
                                            :src="iconBasePath + 'greaterThanBracketsPink.svg'" alt="">
                                        <img v-show="isGrayLeftCardIconVisible"
                                            :src="iconBasePath + 'greaterThanBracketsGray.svg'" alt="">
                                        <img v-show="isHighContrastLeftCardIconVisible"
                                            :src="iconBasePath + 'sariSariIconWhite.svg'" alt="">
                                        <img v-show="isWCAGLeftCardIconVisible"
                                            :src="iconBasePath + 'greaterThanBracketsHighContrast.svg'" alt="">
                                        <h2>Sari-Sari Xchange</h2>
                                    </div>
                                    <div class="left-box-paragraph">
                                        <p>SSX is a community-building research & creation project using Extended
                                            Reality (XR) (ie. Virtual,
                                            Augmented, Mixed Realities) to foster new works by artists from the
                                            Asian diaspora.
                                            <br><br>
                                            Sari-Sari Xchange Assetory (SSXA) is a virtual asset library created
                                            with and for the Asian diaspora
                                            community.
                                        </p>
                                    </div>
                                    <div class="left-box-action-call">
                                        <svg class="svgDefaultButton-left-box" viewBox="0 0 379 32"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M348.5 7.5C348.5 3.63401 351.634 0.5 355.5 0.5H371.5C375.366 0.5 378.5 3.63401 378.5 7.5V24.5C378.5 28.366 375.366 31.5 371.5 31.5H355.5C351.634 31.5 348.5 28.366 348.5 24.5V7.5Z" />
                                            <path
                                                d="M0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5H333.5C337.366 0.5 340.5 3.63401 340.5 7.5V24.5C340.5 28.366 337.366 31.5 333.5 31.5H7.49999C3.634 31.5 0.5 28.366 0.5 24.5V7.5Z" />
                                            <path
                                                d="M331.5 12.6361C331.5 7.79994 337.13 5.14705 340.859 8.22569C342.973 9.97029 346.027 9.97029 348.141 8.22569C351.87 5.14705 357.5 7.79994 357.5 12.6361V18.452C357.5 23.2484 351.691 25.6395 348.315 22.233C346.213 20.1131 342.787 20.1131 340.685 22.233C337.309 25.6395 331.5 23.2484 331.5 18.452V12.6361Z" />

                                            <foreignObject x="0" y="0" width="379" height="32">
                                                <router-link :to="{ name: 'About' }" class="left-call-action">
                                                    <span>Learn More</span> <span class="left-goto-action"
                                                        aria-hidden="true">OK</span>
                                                </router-link>
                                            </foreignObject>
                                        </svg>
                                    </div>
                                </div>
                            </foreignObject>

                            <g class="right-ellipse">
                                <circle cx="5" cy="234" r="5.5" />
                                <circle cx="5" cy="249" r="5.5" fill="#FFFEF6" />
                            </g>

                            <g class="left-ellipse">
                                <circle id="Ellipse 12_2" cx="399" cy="284" r="5.5" />
                                <circle id="Ellipse 11_2" cx="399" cy="299" r="5" fill="#FFFEF6" />
                            </g>
                        </g>
                        <g id="Group 593" class="left-connectors">
                            <path id="SSX to Artists Connector"
                                d="M400.5 281.994C473.5 232.994 436 24.0001 506.5 91.0001" stroke-width="2"
                                stroke-linecap="round" />
                            <path id="SSX to Collections Connector" d="M400 283.494C586.5 341.994 838.5 401 1009.5 250"
                                stroke-width="2" stroke-linecap="round" />
                            <path id="SSX to Events Connector" d="M400 285.494C497.5 331.494 367.5 472.5 563 524.5"
                                stroke-width="2" stroke-linecap="round" />
                        </g>
                        <g id="Collections Node Idle">
                            <foreignObject x="1005" y="164" width="400" height="271">

                                <div class="right-box">
                                    <div class="other-box-heading">
                                        <img :src="iconBasePath + 'collectionsIconWhite.svg'" alt="">
                                        <h2>Collections</h2>
                                    </div>
                                    <div class="other-box-subtitle">
                                        <img v-show="isDecoractionCardSubtitlePink"
                                            :src="iconBasePath + 'decorationCardSubtitlePink.svg'" alt="">
                                        <img v-show="isDecoractionCardSubtitleGray"
                                            :src="iconBasePath + 'decorationCardSubtitleGray.svg'" alt="">
                                        <img v-show="isDecoractionCardSubtitleHighContrast"
                                            :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="">
                                        <img v-show="isDecoractionCardSubtitleWCAG"
                                            :src="iconBasePath + 'decorationCardSubtitleWCAG.svg'" alt="">
                                        <p>Explore collections by SSX.</p>
                                    </div>
                                    <div class="other-box-photos" aria-hidden="true">
                                        <img v-show="arePinkTopCenterCardSampleImagesVisible"
                                            :src="collectionsBasePath + 'collection-thumbnail-placeholder.jpeg'" alt="">
                                        <img v-show="areGrayTopCenterCardSampleImagesVisible"
                                            :src="collectionsBasePath + 'Thumbnail_Anonymous.png'" alt="">
                                        <img v-show="areHighContrastTopCenterCardSampleImagesVisible"
                                            :src="collectionsBasePath + 'Thumbnail_Anonymous.png'" alt="">
                                    </div>




                                    <div class="other-box-action-call">
                                        <svg class="svgDefaultButton-other-box" viewBox="0 0 379 32"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M348.5 7.5C348.5 3.63401 351.634 0.5 355.5 0.5H371.5C375.366 0.5 378.5 3.63401 378.5 7.5V24.5C378.5 28.366 375.366 31.5 371.5 31.5H355.5C351.634 31.5 348.5 28.366 348.5 24.5V7.5Z" />
                                            <path
                                                d="M0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5H333.5C337.366 0.5 340.5 3.63401 340.5 7.5V24.5C340.5 28.366 337.366 31.5 333.5 31.5H7.49999C3.634 31.5 0.5 28.366 0.5 24.5V7.5Z" />
                                            <path
                                                d="M331.5 12.6361C331.5 7.79994 337.13 5.14705 340.859 8.22569C342.973 9.97029 346.027 9.97029 348.141 8.22569C351.87 5.14705 357.5 7.79994 357.5 12.6361V18.452C357.5 23.2484 351.691 25.6395 348.315 22.233C346.213 20.1131 342.787 20.1131 340.685 22.233C337.309 25.6395 331.5 23.2484 331.5 18.452V12.6361Z" />

                                            <foreignObject x="0" y="0" width="379" height="32">
                                                <router-link :to="{ name: 'Collections' }" class="other-call-action">
                                                    <span>Open Collections</span> <span class="call-goto-action"
                                                        aria-hidden="true">></span>
                                                </router-link>
                                            </foreignObject>
                                        </svg>
                                    </div>
                                </div>
                            </foreignObject>
                            <g class="left-ellipse">
                                <circle cx="1010.5" cy="248" r="5.5" />
                                <circle cx="1010.5" cy="263" r="5" fill="#FFFEF6" />
                            </g>

                            <g class="right-ellipse">
                                <circle id="Ellipse 12_3" cx="1404.5" cy="298" r="5.5" />
                                <circle id="Ellipse 11_3" cx="1404.5" cy="313" r="5" fill="#FFFEF6" />
                            </g>
                        </g>
                        <g id="Events Node Idle">

                            <foreignObject x="559" y="440.5" width="405" height="276">

                                <div class="center-bottom-box">
                                    <div class="other-box-heading">
                                        <img :src="iconBasePath + 'eventsIconWhite.svg'" alt="">
                                        <h2>Events</h2>
                                    </div>
                                    <div class="other-box-subtitle">
                                        <img v-show="isDecoractionCardSubtitlePink"
                                            :src="iconBasePath + 'decorationCardSubtitlePink.svg'" alt="">
                                        <img v-show="isDecoractionCardSubtitleGray"
                                            :src="iconBasePath + 'decorationCardSubtitleGray.svg'" alt="">
                                        <img v-show="isDecoractionCardSubtitleHighContrast"
                                            :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="">
                                        <img v-show="isDecoractionCardSubtitleWCAG"
                                            :src="iconBasePath + 'decorationCardSubtitleWCAG.svg'" alt="">
                                        <p>Assets created during SSX events.</p>
                                    </div>
                                    <div class="other-box-photos" aria-hidden="true">
                                        <img v-show="arePinkTopCenterCardSampleImagesVisible"
                                            :src="eventsBasePath + 'events-thumbnail-placeholder.png'" alt="">
                                        <img v-show="areGrayTopCenterCardSampleImagesVisible"
                                            :src="eventsBasePath + 'events-thumbnail-placeholder.png'" alt="">
                                        <img v-show="areHighContrastTopCenterCardSampleImagesVisible"
                                            :src="eventsBasePath + 'events-thumbnail-placeholder.png'" alt="">
                                    </div>

                                    <div class="other-box-action-call">
                                        <svg class="svgDefaultButton-other-box" viewBox="0 0 379 32"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M348.5 7.5C348.5 3.63401 351.634 0.5 355.5 0.5H371.5C375.366 0.5 378.5 3.63401 378.5 7.5V24.5C378.5 28.366 375.366 31.5 371.5 31.5H355.5C351.634 31.5 348.5 28.366 348.5 24.5V7.5Z" />
                                            <path
                                                d="M0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5H333.5C337.366 0.5 340.5 3.63401 340.5 7.5V24.5C340.5 28.366 337.366 31.5 333.5 31.5H7.49999C3.634 31.5 0.5 28.366 0.5 24.5V7.5Z" />
                                            <path
                                                d="M331.5 12.6361C331.5 7.79994 337.13 5.14705 340.859 8.22569C342.973 9.97029 346.027 9.97029 348.141 8.22569C351.87 5.14705 357.5 7.79994 357.5 12.6361V18.452C357.5 23.2484 351.691 25.6395 348.315 22.233C346.213 20.1131 342.787 20.1131 340.685 22.233C337.309 25.6395 331.5 23.2484 331.5 18.452V12.6361Z" />

                                            <foreignObject x="0" y="0" width="379" height="32">
                                                <a href="" class="other-call-action">
                                                    <router-link :to="{ name: 'Events' }" class="other-call-action">
                                                        <span>Open Events</span> <span class="call-goto-action"
                                                            aria-hidden="true">></span>
                                                    </router-link>
                                                </a>
                                            </foreignObject>
                                        </svg>
                                    </div>
                                </div>
                            </foreignObject>


                            <g class="left-ellipse">
                                <circle cx="564.5" cy="524.5" r="5.5" />
                                <circle cx="564.5" cy="539.5" r="5.5" fill="#FFFEF6" />

                            </g>
                            <g class="right-ellipse">
                                <circle id="Ellipse 12_4" cx="958.5" cy="574.5" r="5.5" />
                                <circle id="Ellipse 11_4" cx="958.5" cy="589.5" r="5" fill="#FFFEF6" />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </div>

        <!-- Notification Window -->
        <div v-if="isNotificationVisible" class="notification-window">
            <p>
                This website stores accessibility menu settings you select in your browser to enhance your experience.
                No
                cookies or tracking are used.
            </p>
            <button @click="dismissNotification" class="notification-dismiss-button">Accept</button>
        </div>

        <!-- footer -->
        <div class="footer">
            <div v-show="areFooterImagesDefaultVisible" class="footer-images">
                <!-- First set of images -->
                <img :src="marqueeBasePath + 'item1-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item2-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item3-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item4-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item5-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item6-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item7-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item8-blue.png'" alt="" class="footer-image">

                <!-- Duplicate set for smooth infinite scroll -->
                <img :src="marqueeBasePath + 'item1-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item2-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item3-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item4-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item5-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item6-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item7-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item8-blue.png'" alt="" class="footer-image">

                <!-- Duplicate set for smooth infinite scroll -->
                <img :src="marqueeBasePath + 'item1-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item2-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item3-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item4-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item5-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item6-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item7-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item8-blue.png'" alt="" class="footer-image">


                <!-- Duplicate set for smooth infinite scroll -->
                <img :src="marqueeBasePath + 'item1-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item2-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item3-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item4-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item5-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item6-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item7-blue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item8-blue.png'" alt="" class="footer-image">
            </div>

            <!-- legacy -->
            <!-- <div v-show="areFooterImagesDefaultVisible" class="footer-images">
                <img :src="marqueeBasePath + 'item1.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item2.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item3.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item4.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item5.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item6.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item7.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item8.png'" alt="" class="footer-image">

                <img :src="marqueeBasePath + 'item1.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item2.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item3.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item4.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item5.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item6.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item7.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item8.png'" alt="" class="footer-image">

                <img :src="marqueeBasePath + 'item1.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item2.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item3.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item4.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item5.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item6.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item7.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item8.png'" alt="" class="footer-image">


                <img :src="marqueeBasePath + 'item1.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item2.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item3.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item4.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item5.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item6.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item7.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item8.png'" alt="" class="footer-image">

            </div> -->

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

</template>