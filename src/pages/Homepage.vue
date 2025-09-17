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
            artistBasePath: 'images/artists/', 
            collectionsBasePath: 'images/collections/',
            eventsBasePath: 'images/events/',
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
.grid-container {
    /* display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr repeat(7, 1fr) 1fr; */
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: var(--container-height, 100vh);
    /* default */
}



.topBar {
    grid-column: 1/13;
    grid-row: 1 / 2;
}

/* BACKGROUNDS */
.background-layer {
    grid-column: 1 / 13;
    grid-row: 2 / 9;
    background-image: url("/icons/xyz.svg");
    /* background-image: url("/icons/xyz-default-blue.svg"); */

    background-repeat: no-repeat;
    background-size: 75%;
    /* Sends it to the background */
    z-index: -1;
}

.background-layer-grayscale {
    grid-column: 1 / 13;
    grid-row: 2 / 9;
    background-image: url("/icons/xyz-gray.svg");
    background-repeat: no-repeat;
    background-size: 75%;
    /* Sends it to the background */
    z-index: -1;
}


.background-layer-highContrast {
    grid-column: 1 / 13;
    grid-row: 2 / 9;
    background-image: url("/icons/xyz-highContrast.svg");
    background-repeat: no-repeat;
    background-size: 75%;
    /* Sends it to the background */
    z-index: -1;
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
    width: 100%;
    height: 100%;
    grid-column: 2 / 13;
    grid-row: 2 / 9;
    overflow: hidden;
    /* Prevents SVG from overflowing the grid area */
    display: flex;
    /* Optional: helps SVG fill the container */
    align-items: stretch;
    justify-content: center;
}

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
    font-family: var(--font-family, 'Handjet'), sans-serif;
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
    font-family: var(--font-family, 'Handjet'), sans-serif;
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
    font-weight: 400;
    margin-left: auto;
    justify-self: flex-end;
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
    font-family: var(--font-family, 'Handjet'), sans-serif;
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
    overflow: hidden; /* Prevents overflow */
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
    font-family: var(--font-family, 'Handjet'), sans-serif;
    color: var(--primary-color);
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.0625rem;
    align-self: stretch;
    background-color: transparent;

}

.svgDefaultButton-other-box {
    fill: var(--secondary-color);
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
    font-weight: 400;
    /* margin-left: auto; */
    justify-self: flex-end;

}

.svgDefaultButton-other-box:hover {
    fill: var(--hover-color);
}

.other-box-action-call:hover .other-call-action {
    color: white;
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
    grid-column: 1/13;
    grid-row: 9/10;
    background-color: var(--background-color);
    width: 100%;
    height: 11.125rem;
    /*15 vh  before setting*/
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
</style>

<template>

    <div class="grid-container">
        <div :class="['background-layer', currentBackgroundLayer]" aria-hidden="true"></div>
        <div :class="['background-lines']" aria-hidden="true"></div>
        <!-- New background layer -->
        <div class="topBar">
            <Topbar ref="topbar" :is-notification-visible="isNotificationVisible"
                @update-notification-visible="isNotificationVisible = $event" @theme-changed="updateTheme" />
        </div>

        <!-- background image -->
        <div class="background-image" aria-hidden="true"></div>
        <div class="grid-background" aria-hidden="true"></div>


        <!-- cards -->
        <!-- <div class="left-box">
            <div class="left-box-heading">
                <img v-show="isPinkLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsPink.svg'" alt="">
                <img v-show="isGrayLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsGray.svg'" alt="">
                <img v-show="isHighContrastLeftCardIconVisible" :src="iconBasePath + 'sariSariIconWhite.svg'" alt="">
                <img v-show="isWCAGLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsHighContrast.svg'"
                    alt="">
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
            <div class="left-box-action-call">
                <router-link :to="{ name: 'About' }" class="left-call-action">
                    <span>Learn More</span> <span class="left-goto-action" aria-hidden="true">OK</span>
                </router-link>
            </div>
        </div>



        <div class="center-top-box">
            <div class="other-box-heading">
                <img :src="iconBasePath + 'asteriskWhite.svg'" alt="">
                <h2>Artists</h2>
            </div>
            <div class="other-box-subtitle">
                <img v-show="isDecoractionCardSubtitlePink" :src="iconBasePath + 'decorationCardSubtitlePink.svg'"
                    alt="">
                <img v-show="isDecoractionCardSubtitleGray" :src="iconBasePath + 'decorationCardSubtitleGray.svg'"
                    alt="">
                <img v-show="isDecoractionCardSubtitleHighContrast"
                    :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="">
                <img v-show="isDecoractionCardSubtitleWCAG" :src="iconBasePath + 'decorationCardSubtitleWCAG.svg'"
                    alt="">
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
                    <span class="call-action-text">Open Artists</span> <span class="call-goto-action"
                        aria-hidden="true">></span>
                </router-link>
            </div>
        </div>




        <div class="center-bottom-box">
            <div class="other-box-heading">
                <img :src="iconBasePath + 'eventsIconWhite.svg'" alt="">
                <h2>Events</h2>
            </div>
            <div class="other-box-subtitle">
                <img v-show="isDecoractionCardSubtitlePink" :src="iconBasePath + 'decorationCardSubtitlePink.svg'"
                    alt="">
                <img v-show="isDecoractionCardSubtitleGray" :src="iconBasePath + 'decorationCardSubtitleGray.svg'"
                    alt="">
                <img v-show="isDecoractionCardSubtitleHighContrast"
                    :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="">
                <img v-show="isDecoractionCardSubtitleWCAG" :src="iconBasePath + 'decorationCardSubtitleWCAG.svg'"
                    alt="">
                <p>Assets created during SSX events.</p>
            </div>
            <div class="other-box-photos">
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
                <img v-show="isDecoractionCardSubtitlePink" :src="iconBasePath + 'decorationCardSubtitlePink.svg'"
                    alt="">
                <img v-show="isDecoractionCardSubtitleGray" :src="iconBasePath + 'decorationCardSubtitleGray.svg'"
                    alt="">
                <img v-show="isDecoractionCardSubtitleHighContrast"
                    :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="">
                <img v-show="isDecoractionCardSubtitleWCAG" :src="iconBasePath + 'decorationCardSubtitleWCAG.svg'"
                    alt="">
                <p>Explore collections by SSX.</p>
            </div>
            <div class="other-box-photos">
            </div>
            <div class="other-box-action-call">
                <router-link :to="{ name: 'Collections' }" class="other-call-action">
                    <span>Open Collections</span> <span class="call-goto-action" aria-hidden="true">></span>
                </router-link>
            </div>
        </div> -->

        <div class="homeSVG">

            <svg viewBox="0 0 1665 718" fill="none" xmlns="http://www.w3.org/2000/svg">
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

</template>