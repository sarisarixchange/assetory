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
.grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    /* grid-template-rows: 7% repeat(8, 1fr); */
    grid-template-rows: 1fr repeat(8, 1fr);
    width: 100vw;
    height: 100vh;
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
    grid-column: 1 / 13;
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
    height: 100%;
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
    /* background-color: red; */
    /* width: 21.9375rem; */
    /* font-size: 1rem; */
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.05rem;
    color: var(--primary-color);
    font-family: 'Inter', sans-serif;
    font-weight: 400;
}

/* For smaller screens */
/* @media (max-width: 1200px) {
    .left-box-paragraph p {
        font-size: 1.5rem;
    }
} */

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
    grid-column: 5 / 9;
    grid-row: 2 / 5;
    /* width: 100%; */
    /* height: 100%; */
    /* margin-top: 2.809vw; */
    /* margin-left: 2.847vw; */
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
/* @media (max-width: 1200px) {
    .other-box-subtitle p {
        font-size: 1.5rem;
    }
} */


.other-box-subtitle img {
    width: 1.18756rem;
}

.other-box-photos {
    flex: 1 1 auto;
    height: 100%;
    display: flex;
    /* height: 8.25rem;     */
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    align-self: stretch;
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
            <svg viewBox="0 0 1410 744" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="nodes" clip-path="url(#clip0_305_607)">
                    <g id="Artist Node Idle">
                        <g id="Frame 29" filter="url(#filter0_d_305_607)">

                            <foreignObject x="507.5" y="6" width="394" height="270">

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
                                            :src="iconBasePath + 'sample-images-artists.png'" alt="">
                                        <img v-show="areGrayTopCenterCardSampleImagesVisible"
                                            :src="iconBasePath + 'sample-images-artists-grayscale.png'" alt="">
                                        <img v-show="areHighContrastTopCenterCardSampleImagesVisible"
                                            :src="iconBasePath + 'sample-images-artists-highContrast.png'" alt="">

                                    </div>

                                    <div class="other-box-action-call">
                                             <svg class="svgDefaultButton-other-box" viewBox="0 0 379 32" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M348.5 7.5C348.5 3.63401 351.634 0.5 355.5 0.5H371.5C375.366 0.5 378.5 3.63401 378.5 7.5V24.5C378.5 28.366 375.366 31.5 371.5 31.5H355.5C351.634 31.5 348.5 28.366 348.5 24.5V7.5Z"
                                             />
                                        <path
                                            d="M0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5H333.5C337.366 0.5 340.5 3.63401 340.5 7.5V24.5C340.5 28.366 337.366 31.5 333.5 31.5H7.49999C3.634 31.5 0.5 28.366 0.5 24.5V7.5Z"
                                             />
                                        <path
                                            d="M331.5 12.6361C331.5 7.79994 337.13 5.14705 340.859 8.22569C342.973 9.97029 346.027 9.97029 348.141 8.22569C351.87 5.14705 357.5 7.79994 357.5 12.6361V18.452C357.5 23.2484 351.691 25.6395 348.315 22.233C346.213 20.1131 342.787 20.1131 340.685 22.233C337.309 25.6395 331.5 23.2484 331.5 18.452V12.6361Z"
                                             />

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
                        </g>
                        <g id="Ellipse 9" filter="url(#filter1_d_305_607)">
                            <circle cx="507" cy="89.5" r="5.5" fill="#F1AFDD" />
                        </g>
                        <g id="Ellipse 10" filter="url(#filter2_d_305_607)">
                            <circle cx="507" cy="104.5" r="5.5" fill="#FFFEF6" />
                            <circle cx="507" cy="104.5" r="5" stroke="#D400A6" />
                        </g>
                        <circle id="Ellipse 12" cx="901" cy="139.5" r="5.5" fill="#D400A6" />
                        <circle id="Ellipse 11" cx="901" cy="154.5" r="5" fill="#FFFEF6" stroke="#D400A6" />
                    </g>
                    <g id="About Node Idle">



                        <foreignObject x="46.5" y="231" width="394" height="274">
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
                                    <svg class="svgDefaultButton-left-box" viewBox="0 0 379 32" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M348.5 7.5C348.5 3.63401 351.634 0.5 355.5 0.5H371.5C375.366 0.5 378.5 3.63401 378.5 7.5V24.5C378.5 28.366 375.366 31.5 371.5 31.5H355.5C351.634 31.5 348.5 28.366 348.5 24.5V7.5Z"
                                             />
                                        <path
                                            d="M0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5H333.5C337.366 0.5 340.5 3.63401 340.5 7.5V24.5C340.5 28.366 337.366 31.5 333.5 31.5H7.49999C3.634 31.5 0.5 28.366 0.5 24.5V7.5Z"
                                             />
                                        <path
                                            d="M331.5 12.6361C331.5 7.79994 337.13 5.14705 340.859 8.22569C342.973 9.97029 346.027 9.97029 348.141 8.22569C351.87 5.14705 357.5 7.79994 357.5 12.6361V18.452C357.5 23.2484 351.691 25.6395 348.315 22.233C346.213 20.1131 342.787 20.1131 340.685 22.233C337.309 25.6395 331.5 23.2484 331.5 18.452V12.6361Z"
                                             />

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

                        <g id="Ellipse 9_2" filter="url(#filter4_d_305_607)">
                            <circle cx="46" cy="314.5" r="5.5" fill="#D400A6" />
                        </g>
                        <g id="Ellipse 10_2" filter="url(#filter5_d_305_607)">
                            <circle cx="46" cy="329.5" r="5.5" fill="#FFFEF6" />
                            <circle cx="46" cy="329.5" r="5" stroke="#D400A6" />
                        </g>
                        <circle id="Ellipse 12_2" cx="440" cy="364.5" r="5.5" fill="#F1AFDD" />
                        <circle id="Ellipse 11_2" cx="440" cy="379.5" r="5" fill="#FFFEF6" stroke="#F1AFDD" />
                    </g>
                    <g id="Collections Node Idle">
                        <foreignObject x="964" y="186" width="394" height="281">

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
                                <div class="other-box-photos">
                                </div>

                                <div class="other-box-action-call">
                                      <svg class="svgDefaultButton-other-box" viewBox="0 0 379 32" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M348.5 7.5C348.5 3.63401 351.634 0.5 355.5 0.5H371.5C375.366 0.5 378.5 3.63401 378.5 7.5V24.5C378.5 28.366 375.366 31.5 371.5 31.5H355.5C351.634 31.5 348.5 28.366 348.5 24.5V7.5Z"
                                             />
                                        <path
                                            d="M0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5H333.5C337.366 0.5 340.5 3.63401 340.5 7.5V24.5C340.5 28.366 337.366 31.5 333.5 31.5H7.49999C3.634 31.5 0.5 28.366 0.5 24.5V7.5Z"
                                             />
                                        <path
                                            d="M331.5 12.6361C331.5 7.79994 337.13 5.14705 340.859 8.22569C342.973 9.97029 346.027 9.97029 348.141 8.22569C351.87 5.14705 357.5 7.79994 357.5 12.6361V18.452C357.5 23.2484 351.691 25.6395 348.315 22.233C346.213 20.1131 342.787 20.1131 340.685 22.233C337.309 25.6395 331.5 23.2484 331.5 18.452V12.6361Z"
                                             />

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

                        <g id="Ellipse 9_3" filter="url(#filter7_d_305_607)">
                            <circle cx="963.5" cy="269.5" r="5.5" fill="#F1AFDD" />
                        </g>
                        <g id="Ellipse 10_3" filter="url(#filter8_d_305_607)">
                            <circle cx="963.5" cy="284.5" r="5.5" fill="#FFFEF6" />
                            <circle cx="963.5" cy="284.5" r="5" stroke="#D400A6" />
                        </g>
                        <circle id="Ellipse 12_3" cx="1357.5" cy="319.5" r="5.5" fill="#D400A6" />
                        <circle id="Ellipse 11_3" cx="1357.5" cy="334.5" r="5" fill="#FFFEF6" stroke="#D400A6" />
                    </g>
                    <g id="Events Node Idle">

                        <foreignObject x="551" y="462" width="394" height="262.459">

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
                                <div class="other-box-photos">
                                </div>
                                <div class="other-box-action-call">
                                         <svg class="svgDefaultButton-other-box" viewBox="0 0 379 32" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M348.5 7.5C348.5 3.63401 351.634 0.5 355.5 0.5H371.5C375.366 0.5 378.5 3.63401 378.5 7.5V24.5C378.5 28.366 375.366 31.5 371.5 31.5H355.5C351.634 31.5 348.5 28.366 348.5 24.5V7.5Z"
                                             />
                                        <path
                                            d="M0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5H333.5C337.366 0.5 340.5 3.63401 340.5 7.5V24.5C340.5 28.366 337.366 31.5 333.5 31.5H7.49999C3.634 31.5 0.5 28.366 0.5 24.5V7.5Z"
                                             />
                                        <path
                                            d="M331.5 12.6361C331.5 7.79994 337.13 5.14705 340.859 8.22569C342.973 9.97029 346.027 9.97029 348.141 8.22569C351.87 5.14705 357.5 7.79994 357.5 12.6361V18.452C357.5 23.2484 351.691 25.6395 348.315 22.233C346.213 20.1131 342.787 20.1131 340.685 22.233C337.309 25.6395 331.5 23.2484 331.5 18.452V12.6361Z"
                                             />

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

                        <g id="Ellipse 9_4" filter="url(#filter10_d_305_607)">
                            <circle cx="550.5" cy="545.5" r="5.5" fill="#F1AFDD" />
                        </g>
                        <g id="Ellipse 10_4" filter="url(#filter11_d_305_607)">
                            <circle cx="550.5" cy="560.5" r="5.5" fill="#FFFEF6" />
                            <circle cx="550.5" cy="560.5" r="5" stroke="#D400A6" />
                        </g>
                        <circle id="Ellipse 12_4" cx="944.5" cy="595.5" r="5.5" fill="#D400A6" />
                        <circle id="Ellipse 11_4" cx="944.5" cy="610.5" r="5" fill="#FFFEF6" stroke="#D400A6" />
                    </g>
                    <g id="nodes-left">
                        <path id="SSX to Artists Connector" d="M442 362C515 313 436 22.9999 506.5 89.9999"
                            stroke="#F1AFDD" stroke-width="2" stroke-linecap="round" />
                        <path id="SSX to Collections Connector" d="M441.5 363.5C628 422 848.5 394.5 961.5 271"
                            stroke="#F1AFDD" stroke-width="2" stroke-linecap="round" />
                        <path id="SSX to Events Connector" d="M441.5 365.5C539 411.5 354.5 495.5 550 547.5"
                            stroke="#F1AFDD" stroke-width="2" stroke-linecap="round" />
                    </g>
                    <g id="node-right">
                        <path id="Artist Connector" d="M903 140C993 149 1354.9 -114.497 1471.5 192" stroke="#D400A6"
                            stroke-width="2" stroke-linecap="round" />
                        <path id="Collections Connector" d="M1358.5 320.5C1538.5 450 1264.5 438.5 1437.5 535"
                            stroke="#D400A6" stroke-width="2" stroke-linecap="round" />
                        <path id="Vector 6" d="M944.5 597C1116.5 448.5 1224.5 715.36 1461.5 672.86" stroke="#D400A6"
                            stroke-width="2" stroke-linecap="round" />
                    </g>
                </g>
                <defs>
                    <filter id="filter0_d_305_607" x="503.5" y="6" width="398" height="274" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dx="-4" dy="4" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix"
                            values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape" />
                    </filter>
                    <filter id="filter1_d_305_607" x="497.5" y="84" width="15" height="13" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dx="-4" dy="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix"
                            values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape" />
                    </filter>
                    <filter id="filter2_d_305_607" x="497.5" y="99" width="15" height="13" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dx="-4" dy="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix"
                            values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape" />
                    </filter>
                    <filter id="filter3_d_305_607" x="42.5" y="231" width="398" height="278"
                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dx="-4" dy="4" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix"
                            values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape" />
                    </filter>
                    <filter id="filter4_d_305_607" x="36.5" y="309" width="15" height="13" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dx="-4" dy="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix"
                            values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape" />
                    </filter>
                    <filter id="filter5_d_305_607" x="36.5" y="324" width="15" height="13" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dx="-4" dy="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix"
                            values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape" />
                    </filter>
                    <filter id="filter6_d_305_607" x="960" y="186" width="398" height="285" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dx="-4" dy="4" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix"
                            values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape" />
                    </filter>
                    <filter id="filter7_d_305_607" x="954" y="264" width="15" height="13" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dx="-4" dy="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix"
                            values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape" />
                    </filter>
                    <filter id="filter8_d_305_607" x="954" y="279" width="15" height="13" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dx="-4" dy="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix"
                            values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape" />
                    </filter>
                    <filter id="filter9_d_305_607" x="547" y="462" width="398" height="266.459"
                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dx="-4" dy="4" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix"
                            values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape" />
                    </filter>
                    <filter id="filter10_d_305_607" x="541" y="540" width="15" height="13" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dx="-4" dy="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix"
                            values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape" />
                    </filter>
                    <filter id="filter11_d_305_607" x="541" y="555" width="15" height="13" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dx="-4" dy="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix"
                            values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape" />
                    </filter>
                    <clipPath id="clip0_305_607">
                        <rect width="1410" height="744" fill="white" />
                    </clipPath>
                </defs>
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