<script>
import AccessibilityMenu from '../components/AccessibilityMenu.vue';
import Topbar from '../components/Topbar.vue';
import SimpleButton from '../widgets/SimpleButton.vue';
import artists from '/src/data/artists.json';
import events from '/src/data/events.json';
import collections from '/src/data/collections.json';
import OddShapeButton from '../widgets/OddShapeButton.vue';


export default {
    components: {
        AccessibilityMenu, // Register the AccessibilityMenu component
        Topbar,
        SimpleButton,
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
            iconHoveredSrc: '/icons/arrow-right-white.svg',


            randomArtistImage: null,
            randomEventImage: null,
            randomCollectionImage: null,

          

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
                // if (this.$refs.topbar && this.$refs.topbar.$refs.accessibilityMenu) {
                //     this.$refs.topbar.$refs.accessibilityMenu.saveSettings({
                //         interactiveMode: this.interactiveMode,
                //     });
                // } else {
                // }
            } catch (error) {
                console.error('Error in dismissNotification:', error);
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
    /* display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr repeat(7, 1fr) 1fr; */
    display: flex;
    /* position: relative; */

    flex-direction: column;
    width: 100vw;
    height: 100vh;

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

/* .left-box,
.right-box,
.center-top-box,
.center-bottom-box {
    background-color: var(--background-color);
    z-index: 3;
    cursor: default;
    box-shadow:
        -6px 6px 0 var(--shadow),
           0 6px 1px var(--shadow);

} */

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
/* .cardsContainer {
    margin-top: auto;
    margin-bottom: auto;
    width: 54.5rem;
    height: 35.9375rem;
    flex-shrink: 0;
} */


/* Large screens (desktops) */
.cardsContainer {
    /* background-color: red; */
    justify-content: center;
    display: flex;
    margin: auto;
    width: 52.5rem;
    /* height: 36rem; */
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

/* //////////////// */

/* left top box */


.left-top-box-container {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    background: var(--background-color);
    width: 25.3125rem;
    height: 16.875rem;
    border-radius: 0.4375rem;
    padding: 0.5rem;
    background-image: url('/backgrounds/about-tile-circles.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.left-top-box {
    width: 100%;
    height: 16rem;
    display: flex;
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* gap: 0.5rem; */
    border-radius: inherit;
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
    width: 1.25rem;
}


.left-top-box-paragraph {
    flex: 1 1 auto;
    display: flex;
    padding: 0.5rem;

    justify-content: center;
    /* align-items: center; */
    align-self: stretch;
    border-radius: 0.5rem;
    /* background-color: var(--secondary-color-left-box); */
    overflow: auto;

}


.left-top-box-paragraph p {
    /* height: 4.75rem; */
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



/* left bottom box */



.left-bottom-box-container {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    background: var(--background-color);
    width: 25.3125rem;
    height: 16.875rem;
    border-radius: 0.4375rem;
    padding: 0.5rem;
    background-image: url('/backgrounds/about-tile-circles.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.left-bottom-box {
    width: 100%;
    height: 16rem;
    /* background-color: blue; */
    display: flex;
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: inherit;
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


.left-bottom-box-subtitle {
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: 0.5rem;
    gap: 0.5rem;
    background-color: var(--background-color);
    border: 1px solid #000;
}

.left-bottom-box-subtitle p {
    font-family: 'Inter', sans-serif;
    color: var(--primary-color);
    font-size: 0.85rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}



.left-bottom-box-subtitle img {
    width: 1.18756rem;
    height: 0.71619rem;
}

.left-bottom-box-heading img {
    width: 1.25rem;
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




.left-bottom-box-photo {
    display: flex;
    height: 8.25rem;
    /* padding: 0.5rem; */
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    align-self: stretch;
    overflow: hidden;


    /* optional: prevents any overflow */
}

.left-bottom-box-photo img {
    height: 100%;
    width: auto;
    object-fit: contain;
    border-radius: 0.5rem;
}




.left-bottom-box-action-call {
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

.left-bottom-box-call-action {
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



.left-bottom-box-goto-action {
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    padding-right: 0rem;
}



/* right top box */


.right-top-box-container {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    background: var(--background-color);
    /* background-color: red; */
    width: 25.3125rem;
    height: 16.875rem;
    border-radius: 0.4375rem;
    padding: 0.5rem;
    background-image: url('/backgrounds/about-tile-circles.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.right-top-box {
    width: 100%;
    height: 16rem;
    /* background-color: blue; */
    display: flex;
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: inherit;
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
    font-size: 0.85rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}



.right-top-box-subtitle img {
    width: 1.18756rem;
    height: 0.71619rem;
}

.right-top-box-heading img {
    width: 0.94rem;
}

.right-top-box-photo {
    display: flex;
    height: 8.25rem;
    /* padding: 0.5rem; */
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    align-self: stretch;
    overflow: hidden;
    /* optional: prevents any overflow */
}

.right-top-box-photo img {
    height: 100%;
    width: auto;
    object-fit: contain;
    border-radius: 0.5rem;
}

.right-top-box-action-call {
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




/* right bottom box */


.right-bottom-box-container {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    background: var(--background-color);
    width: 25.3125rem;
    height: 16.875rem;
    border-radius: 0.4375rem;
    padding: 0.5rem;
    background-image: url('/backgrounds/about-tile-circles.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.right-bottom-box {
    width: 100%;
    height: 16rem;
    display: flex;
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: inherit;
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


.right-bottom-box-heading img {
    width: 0.94rem;
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
    font-size: 0.85rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}



.right-bottom-box-subtitle img {
    width: 1.18756rem;
    height: 0.71619rem;
}


.right-bottom-box-photo {
    display: flex;
    height: 8.25rem;
    /* padding: 0.5rem; */
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    align-self: stretch;
    overflow: hidden;
    /* optional: prevents any overflow */
}

.right-bottom-box-photo img {
    height: 100%;
    width: auto;
    object-fit: contain;
    border-radius: 0.5rem;
}



.right-bottom-box-action-call {
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
.left-bottom-box:has(.left-bottom-box-action-call:hover),
.right-top-box:has(.right-top-box-action-call:hover),
.right-bottom-box:has(.right-bottom-box-action-call:hover) {
    box-shadow:
        -4px 4px 0 0 var(--primary-color),
        /* original */
        0px 4px 0 0 var(--primary-color);
    /* extra to the right */
}


/* /////////////// */


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
    flex-shrink: 0;
    color: var(--primary-color);
    display: flex;
    justify-content: space-between;
    border-radius: 0.5rem;
    align-items: center;
    background-color: transparent;
    margin-right: 5rem;
}



.left-goto-action {
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
    border: 1px solid var(--primary-color);
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

.right-box:has(.other-box-action-call:hover) {
    box-shadow: -4px 4px 0 0 var(--primary-color);
}

.eventsGalleryCard:has(.galleryCardContentGoTo:hover) {
    box-shadow: -4px 4px 0 0 var(--primary-color);
}

/* .goToArrow {

} */



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

/* larger desktops / laptops (> 1400px) */

.footer-image {
    width: 4%;
    object-fit: contain;
    flex-shrink: 0;
    /* margin-bottom: 3rem; */
}

/* Medium desktops / laptops (<= 1400px) */
@media (max-width: 1400px) {
    .footer-image {
        width: 4%;
        object-fit: contain;
        flex-shrink: 0;
    }


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

#collectionsTile.hovered {
    filter: url(#tileShadow);
}

#aboutTile.hovered {
    filter: url(#tileShadowAbout);
}

#eventsTile.hovered {
    filter: url(#tileShadowEvents);
}


#artistsTile.hovered {
    filter: url(#tileShadowArtists);
}


/* Mobile adjustments */
@media (max-width: 768px) {


    .grid-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        /* height: 90vh; */
        /* background-color: red; */
    }


    .cardsContainer {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        justify-self: center
    }


}
</style>

<template>

    <div class="grid-container">
        <div :class="['background-layer', currentBackgroundLayer]" aria-hidden="true"></div>
        <div :class="['background-lines']" aria-hidden="true"></div>

        <!-- New background layer -->
        <div class="topBar">
            <Topbar ref="topbar" :interactive-mode="interactiveMode"  @theme-changed="updateTheme" />
        </div>

        <!-- background image -->
        <div class="background-image" aria-hidden="true"></div>
        <div class="grid-background" aria-hidden="true"></div>


        <!-- <button class="interactiveModeButton" @click="toggleInteractiveMode">
                {{ interactiveMode ? 'Interactive Mode On' : 'Interactive Mode Off' }}
            </button> -->


        <div class="cardsContainer" v-show="!interactiveMode">
            <div class="cardsContainerLeftSide">
                <div class="left-top-box-container">
                    <div class="left-top-box">
                        <div class="left-top-box-heading">
                            <img v-show="isDefaultCardVisible" :src="iconBasePath + 'sariSariIconWhite.svg'" alt="">
                            <img v-show="isPinkLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsPink.svg'"
                                alt="">
                            <img v-show="isGrayLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsGray.svg'"
                                alt="">
                            <img v-show="isHighContrastLeftCardIconVisible"
                                :src="iconBasePath + 'sariSariIconWhite.svg'" alt="">
                            <img v-show="isWCAGLeftCardIconVisible"
                                :src="iconBasePath + 'greaterThanBracketsHighContrast.svg'" alt="">
                            <h2>Sari-Sari Xchange</h2>
                        </div>
                        <div class="left-top-box-paragraph">
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

                        <div class="left-top-box-action-call" @mouseenter="isAboutHovered = true"
                            @mouseleave="isAboutHovered = false">
                            <OddShapeButton label="Learn More" iconText="OK" :to="{ name: 'About' }"
                                fillColor="var(--secondary-color-left-box)" hoverColor="var(--hover-color)" />
                        </div>
                    </div>
                </div>

                <div class="left-bottom-box-container">
                    <div class="left-bottom-box">
                        <div class="left-bottom-box-heading">
                            <img :src="iconBasePath + 'eventsIconWhite.svg'" alt="">
                            <h2>Events</h2>
                        </div>
                        <div class="left-bottom-box-subtitle">
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
                        <div class="left-bottom-box-photo" aria-hidden="true">
                            <img :src="randomEventImage" alt="">
                        </div>


                        <div class="left-bottom-box-action-call" @mouseenter="isEventsHovered = true"
                            @mouseleave="isEventsHovered = false">

                            <OddShapeButton label="Open Events" iconSrc="/icons/arrow-right-black.svg"
                                :hoverIconSrc="iconHoveredSrc" :to="{ name: 'Events' }"
                                fillColor="var(--secondary-color-left-box)" hoverColor="var(--hover-color)" />


                        </div>
                    </div>
                </div>
            </div>



            <div class="cardsContainerRightSide">
                <div class="right-bottom-box-container">
                    <div class="right-bottom-box">
                        <div class="right-bottom-box-heading">
                            <img :src="iconBasePath + 'asteriskWhite.svg'" alt="">
                            <h2>Artists</h2>
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
                            <p>Explore community assets created by artists.</p>

                        </div>
                        <div class="right-bottom-box-photo" aria-hidden="true">
                            <img :src="randomArtistImage" alt="">
                        </div>

                        <div class="right-bottom-box-action-call" @mouseenter="isArtistsHovered = true"
                            @mouseleave="isArtistsHovered = false">

                            <OddShapeButton label="Open Artists" iconSrc="/icons/arrow-right-black.svg"
                                :hoverIconSrc="iconHoveredSrc" :to="{ name: 'Artists' }"
                                fillColor="var(--secondary-color-left-box)" hoverColor="var(--hover-color)" />
                        </div>
                    </div>
                </div>


                <div class="right-top-box-container">
                    <div class="right-top-box">
                        <div class="right-top-box-heading">
                            <img :src="iconBasePath + 'collectionsIconWhite.svg'" alt="">
                            <h2>Collections</h2>
                        </div>

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
                            <p>Explore collections by SSX.</p>
                        </div>

                        <div class="right-top-box-photo" aria-hidden="true">
                            <img :src="randomCollectionImage" alt="">
                        </div>

                        <!-- ✅ When hovered, triggers class on the SVG <g> -->
                        <div class="right-top-box-action-call" @mouseenter="isCollectionsHovered = true"
                            @mouseleave="isCollectionsHovered = false">

                            <OddShapeButton label="Open Collections" iconSrc="/icons/arrow-right-black.svg"
                                :hoverIconSrc="iconHoveredSrc" :to="{ name: 'Collections' }"
                                fillColor="var(--secondary-color-left-box)" hoverColor="var(--hover-color)" />

                        </div>
                    </div>
                </div>


            </div>
        </div>

        <div class="homeSVG" v-show="interactiveMode">
            <!-- legacy homepage design -->

            <svg id="legacySVGContainer" viewBox="0 0 1665 718" fill="none" xmlns="http://www.w3.org/2000/svg">
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

                <img :src="marqueeBasePath + 'item1-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item2-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item3-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item4-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item5-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item6-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item7-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item8-darkblue.png'" alt="" class="footer-image">

                <img :src="marqueeBasePath + 'item1-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item2-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item3-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item4-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item5-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item6-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item7-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item8-darkblue.png'" alt="" class="footer-image">

                <img :src="marqueeBasePath + 'item1-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item2-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item3-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item4-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item5-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item6-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item7-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item8-darkblue.png'" alt="" class="footer-image">

                <img :src="marqueeBasePath + 'item1-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item2-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item3-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item4-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item5-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item6-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item7-darkblue.png'" alt="" class="footer-image">
                <img :src="marqueeBasePath + 'item8-darkblue.png'" alt="" class="footer-image">
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