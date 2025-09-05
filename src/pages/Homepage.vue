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
    overflow: hidden; /* Prevents SVG from overflowing the grid area */
    display: flex;    /* Optional: helps SVG fill the container */
    align-items: stretch;
    justify-content: center;
}

.left-box {
    grid-column: 1 / 5;
    grid-row: 4 / 7;
    display: flex;
    /* width: 24.625rem;
    height: 17.125rem; */
    width: clamp(20rem, 25vw, 26rem);
    aspect-ratio: 24.625 / 17.125;
    padding: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 1rem;
    border: 1px solid var(--primary-color);
    margin-left: 2.847vw;
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
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.015;
}

.left-box-heading img {
    width: 1.57994rem;
}

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
    /* background-color: red; */
    /* width: 21.9375rem; */
    /* font-size: 1rem; */
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
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.0625rem;
    align-self: stretch;
    background-color: var(--secondary-color-left-box);
}

.left-call-action {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    width: 100%;
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


.left-goto-action {
    font-weight: 400;
    margin-left: auto;
    justify-self: flex-end;
}


.left-box-action-call:hover .left-call-action {
    background-color: var(--hover-color-left-box);
    color: var(--hover-text-color-left-box);
}




/* Other boxes */


.right-box,
.center-top-box,
.center-bottom-box {
    display: flex;
    /* width: 24.625rem; */
    /* height: 16.9375rem; */
    width: clamp(20rem, 25vw, 26rem);
    aspect-ratio: 24.625 / 16.9375;
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
    margin-top: 2.809vw;
    margin-left: 2.847vw;
}

.center-bottom-box {
    grid-column: 5/9;
    grid-row: 6/ 9;
    margin-left: 6.111vw;
    /* margin-left: clamp(2rem, 6.111vw, 4rem); */

}

.right-box {
    grid-column: 9/13;
    grid-row: 4 / 7;
    margin-left: 2.847vw;
    /* margin-left: clamp(1rem, 2.5vw, 2rem); */
    justify-self: center;

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
    font-size: 1.5rem;
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
    font-size: var(--font-base);
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.other-box-subtitle img {
    width: 1.18756rem;
}

.other-box-photos {
    display: flex;
    height: 8.25rem;
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
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.0625rem;
    align-self: stretch;
    background-color: var(--secondary-color);

}

.other-call-action {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    width: 100%;
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

.other-box-action-call:hover .other-call-action {
    color: white;
    background-color: var(--hover-color);
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
<rect x="507.5" y="6" width="394" height="270" rx="16" fill="#FFFEF6" shape-rendering="crispEdges"/>
<rect x="508" y="6.5" width="393" height="269" rx="15.5" stroke="#D400A6" shape-rendering="crispEdges"/>
<g id="Frame 31">
<rect x="515.5" y="14" width="378" height="32" rx="8" fill="#D400A6"/>
</g>
<g id="Frame 29_2">
<rect x="515.5" y="54" width="378" height="35" rx="8" fill="#FFEDF4"/>
</g>
<g id="Frame 30">
<rect x="515.5" y="97" width="378" height="132" rx="8" fill="#FFEDF4"/>
</g>
<g id="Learn More Button Idle">
<g id="Group 405">
<g id="Group 631">
<rect id="Rectangle 25" x="863.5" y="237" width="30" height="31" rx="7" fill="#FFEDF4"/>
<rect id="Rectangle 26" x="515.5" y="237" width="340" height="31" rx="7" fill="#FFEDF4"/>
<path id="Rectangle 32" d="M846.5 249.136C846.5 244.3 852.13 241.647 855.859 244.726C857.973 246.47 861.027 246.47 863.141 244.726C866.87 241.647 872.5 244.3 872.5 249.136V254.952C872.5 259.748 866.691 262.14 863.315 258.733C861.213 256.613 857.787 256.613 855.685 258.733C852.309 262.14 846.5 259.748 846.5 254.952V249.136Z" fill="#FFEDF4"/>
</g>
<g id="Group 363">
<path id="^" d="M873.445 246.039H875.538C876.091 246.039 876.538 246.487 876.538 247.039V249.46C876.538 250.012 876.986 250.46 877.538 250.46H879.958C880.51 250.46 880.958 250.907 880.958 251.46V253.88C880.958 254.433 880.51 254.88 879.958 254.88H877.538C876.986 254.88 876.538 255.328 876.538 255.88V258.301C876.538 258.853 876.091 259.301 875.538 259.301H873.445C872.65 259.301 872.119 259.832 872.119 260.627V262.396C872.119 263.191 872.65 263.722 873.445 263.722H873.887C875.478 263.722 876.538 262.661 876.538 261.025C876.538 260.009 877.246 259.301 878.262 259.301H879.455C880.339 259.301 880.958 258.682 880.958 257.798V256.958C880.958 255.72 881.797 254.88 883.035 254.88H885.068C885.775 254.88 886.261 254.394 886.261 253.687V251.786C886.261 250.99 885.73 250.46 884.935 250.46H883.653C882.062 250.46 880.958 249.355 880.958 247.719C880.958 246.702 880.295 246.039 879.278 246.039H878.129C877.201 246.039 876.538 245.376 876.538 244.448V243.519C876.538 242.37 875.787 241.618 874.638 241.618H873.136C872.517 241.618 872.119 242.016 872.119 242.635V244.713C872.119 245.509 872.65 246.039 873.445 246.039Z" fill="#D400A6"/>
<path id="^ (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M877.157 245.739C877.035 245.65 876.928 245.543 876.839 245.421C876.647 245.158 876.538 244.825 876.538 244.448V243.52C876.538 242.37 875.787 241.619 874.638 241.619H873.135C872.516 241.619 872.119 242.017 872.119 242.636V244.713C872.119 245.509 872.649 246.04 873.444 246.04H875.538C876.09 246.04 876.538 246.487 876.538 247.04V249.46C876.538 250.013 876.986 250.46 877.538 250.46H879.957C880.509 250.46 880.957 250.908 880.957 251.46V253.881C880.957 254.433 880.509 254.881 879.957 254.881H877.538C876.986 254.881 876.538 255.329 876.538 255.881V258.302C876.538 258.854 876.09 259.302 875.538 259.302H873.444C872.649 259.302 872.119 259.832 872.119 260.628V262.396C872.119 263.192 872.649 263.723 873.444 263.723H873.886C875.477 263.723 876.538 262.662 876.538 261.026C876.538 260.59 876.668 260.211 876.896 259.921C876.972 259.824 877.06 259.736 877.157 259.66C877.447 259.432 877.826 259.302 878.261 259.302H879.455C880.338 259.302 880.957 258.683 880.957 257.799V256.959C880.957 256.365 881.151 255.862 881.489 255.5C881.517 255.47 881.546 255.441 881.576 255.413C881.938 255.075 882.44 254.881 883.034 254.881H885.067C885.774 254.881 886.26 254.395 886.26 253.687V251.787C886.26 250.991 885.73 250.46 884.934 250.46H883.653C882.062 250.46 880.957 249.355 880.957 247.72C880.957 246.703 880.294 246.04 879.278 246.04H878.129C877.752 246.04 877.419 245.93 877.157 245.739ZM875.919 257.683C875.919 258.235 875.472 258.683 874.919 258.683H873.444C872.906 258.683 872.409 258.865 872.046 259.229C871.682 259.593 871.5 260.09 871.5 260.628V262.396C871.5 262.935 871.682 263.432 872.046 263.795C872.409 264.159 872.906 264.341 873.444 264.341H873.886C874.823 264.341 875.652 264.026 876.249 263.423C876.845 262.819 877.157 261.98 877.157 261.026C877.157 260.665 877.28 260.397 877.456 260.22C877.632 260.044 877.9 259.921 878.261 259.921H879.455C880.045 259.921 880.583 259.712 880.975 259.319C881.367 258.927 881.576 258.389 881.576 257.799V256.959C881.576 256.483 881.734 256.128 881.969 255.893C882.204 255.659 882.559 255.5 883.034 255.5H885.067C885.566 255.5 886.028 255.326 886.366 254.987C886.705 254.649 886.879 254.187 886.879 253.687V251.787C886.879 251.248 886.697 250.751 886.333 250.387C885.969 250.024 885.473 249.841 884.934 249.841H883.653C883.005 249.841 882.495 249.619 882.148 249.268C881.801 248.917 881.576 248.395 881.576 247.72C881.576 247.074 881.363 246.487 880.936 246.061C880.51 245.634 879.923 245.421 879.278 245.421H878.129C877.542 245.421 877.157 245.035 877.157 244.448V243.52C877.157 242.808 876.921 242.166 876.456 241.701C875.991 241.236 875.35 241 874.638 241H873.135C872.691 241 872.269 241.146 871.957 241.458C871.645 241.77 871.5 242.191 871.5 242.636V244.713C871.5 245.252 871.682 245.749 872.046 246.113C872.409 246.476 872.906 246.659 873.444 246.659H874.919C875.472 246.659 875.919 247.106 875.919 247.659V250.079C875.919 250.632 876.367 251.079 876.919 251.079H879.338C879.891 251.079 880.338 251.527 880.338 252.079V253.262C880.338 253.814 879.891 254.262 879.338 254.262H876.919C876.367 254.262 875.919 254.71 875.919 255.262V257.683Z" fill="#D400A6"/>
</g>
</g>
</g>
</g>
<g id="Ellipse 9" filter="url(#filter1_d_305_607)">
<circle cx="507" cy="89.5" r="5.5" fill="#F1AFDD"/>
</g>
<g id="Ellipse 10" filter="url(#filter2_d_305_607)">
<circle cx="507" cy="104.5" r="5.5" fill="#FFFEF6"/>
<circle cx="507" cy="104.5" r="5" stroke="#D400A6"/>
</g>
<circle id="Ellipse 12" cx="901" cy="139.5" r="5.5" fill="#D400A6"/>
<circle id="Ellipse 11" cx="901" cy="154.5" r="5" fill="#FFFEF6" stroke="#D400A6"/>
</g>
<g id="About Node Idle">
<g id="leftnote" filter="url(#filter3_d_305_607)">
<rect x="46.5" y="231" width="394" height="274" rx="16" fill="#FFFEF6" shape-rendering="crispEdges"/>
<rect x="47" y="231.5" width="393" height="273" rx="15.5" stroke="#E7EB17" shape-rendering="crispEdges"/>
<g id="Frame 31_2">
<rect x="54.5" y="239" width="378" height="43" rx="8" fill="#E7EB17"/>
<foreignObject x="54.5" y="239" width="378" height="43">
   <div class="left-box-heading">
                <img v-show="isPinkLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsPink.svg'" alt="">
                <img v-show="isGrayLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsGray.svg'" alt="">
                <img v-show="isHighContrastLeftCardIconVisible" :src="iconBasePath + 'sariSariIconWhite.svg'" alt="">
                <img v-show="isWCAGLeftCardIconVisible" :src="iconBasePath + 'greaterThanBracketsHighContrast.svg'"
                    alt="">
                <h2>Sari-Sari Xchange</h2>
            </div>
</foreignObject>
</g>
<g id="Frame 29_3">
<rect x="54.5" y="290" width="378" height="168" rx="8" fill="#FCFCCE"/>
<foreignObject x="54.5" y="290" width="378" height="168">
    <div class="left-box-paragraph" xmlns="http://www.w3.org/1999/xhtml">
        <p>SSX is a community-building research & creation project using Extended Reality (XR) (ie. Virtual,
            Augmented, Mixed Realities) to foster new works by artists from the Asian diaspora.
            <br><br>
            Sari-Sari Xchange Assetory (SSXA) is a virtual asset library created with and for the Asian diaspora
            community.
        </p>
    </div>
</foreignObject>        
</g>
<g id="Learn More Button Idle_2">
<g id="Group 405_2">
<rect id="Rectangle 25_2" x="402.5" y="466" width="30" height="31" rx="7" fill="#FCFCCE"/>
<rect id="Rectangle 26_2" x="54.5" y="466" width="340" height="31" rx="7" fill="#FCFCCE"/>
<path id="Rectangle 32_2" d="M385.5 478.136C385.5 473.3 391.13 470.647 394.859 473.726C396.973 475.47 400.027 475.47 402.141 473.726C405.87 470.647 411.5 473.3 411.5 478.136V483.952C411.5 488.748 405.691 491.14 402.315 487.733C400.213 485.613 396.787 485.613 394.685 487.733C391.309 491.14 385.5 488.748 385.5 483.952V478.136Z" fill="#FCFCCE"/>
<foreignObject x="54.5" y="466" width="378" height="31">
   <div class="left-box-action-call">
                <router-link :to="{ name: 'About' }" class="left-call-action">
                    <span>Learn More</span> <span class="left-goto-action" aria-hidden="true">OK</span>
                </router-link>
            </div>
</foreignObject>    
</g>
<!-- <g id="Group 404">
<text id="OK" fill="#D400A6" xml:space="preserve" style="white-space: pre" font-family="Lakonet" font-size="20" letter-spacing="-0.05em"><tspan x="405.5" y="488">OK</tspan></text>
<line id="Line 30" x1="409" y1="490.5" x2="414" y2="490.5" stroke="#D400A6" stroke-linecap="round"/>
</g> -->
</g>
</g>
<g id="Ellipse 9_2" filter="url(#filter4_d_305_607)">
<circle cx="46" cy="314.5" r="5.5" fill="#D400A6"/>
</g>
<g id="Ellipse 10_2" filter="url(#filter5_d_305_607)">
<circle cx="46" cy="329.5" r="5.5" fill="#FFFEF6"/>
<circle cx="46" cy="329.5" r="5" stroke="#D400A6"/>
</g>
<circle id="Ellipse 12_2" cx="440" cy="364.5" r="5.5" fill="#F1AFDD"/>
<circle id="Ellipse 11_2" cx="440" cy="379.5" r="5" fill="#FFFEF6" stroke="#F1AFDD"/>
</g>
<g id="Collections Node Idle">
<g id="Frame 29_4" filter="url(#filter6_d_305_607)">
<rect x="964" y="186" width="394" height="281" rx="16" fill="#FFFEF6" shape-rendering="crispEdges"/>
<rect x="964.5" y="186.5" width="393" height="280" rx="15.5" stroke="#D400A6" shape-rendering="crispEdges"/>
<g id="Frame 31_3">
<rect x="972" y="194" width="378" height="43" rx="8" fill="#D400A6"/>
</g>
<g id="Frame 29_5">
<rect x="972" y="245" width="378" height="35" rx="8" fill="#FFEDF4"/>
</g>
<g id="Frame 30_2">
<rect x="972" y="288" width="378" height="132" rx="8" fill="#FFEDF4"/>
</g>
<g id="Learn More Button Idle_3">
<g id="Group 405_3">
<rect id="Rectangle 25_3" x="1320" y="428" width="30" height="31" rx="7" fill="#FFEDF4"/>
<rect id="Rectangle 26_3" x="972" y="428" width="340" height="31" rx="7" fill="#FFEDF4"/>
<path id="Rectangle 32_3" d="M1303 440.136C1303 435.3 1308.63 432.647 1312.36 435.726C1314.47 437.47 1317.53 437.47 1319.64 435.726C1323.37 432.647 1329 435.3 1329 440.136V445.952C1329 450.748 1323.19 453.14 1319.81 449.733C1317.71 447.613 1314.29 447.613 1312.19 449.733C1308.81 453.14 1303 450.748 1303 445.952V440.136Z" fill="#FFEDF4"/>
<g id="Group 363_2">
<path id="^_2" d="M1329.94 437.039H1332.04C1332.59 437.039 1333.04 437.487 1333.04 438.039V440.46C1333.04 441.012 1333.49 441.46 1334.04 441.46H1336.46C1337.01 441.46 1337.46 441.908 1337.46 442.46V444.881C1337.46 445.433 1337.01 445.881 1336.46 445.881H1334.04C1333.49 445.881 1333.04 446.328 1333.04 446.881V449.301C1333.04 449.854 1332.59 450.301 1332.04 450.301H1329.94C1329.15 450.301 1328.62 450.832 1328.62 451.628V453.396C1328.62 454.192 1329.15 454.722 1329.94 454.722H1330.39C1331.98 454.722 1333.04 453.661 1333.04 452.025C1333.04 451.009 1333.75 450.301 1334.76 450.301H1335.96C1336.84 450.301 1337.46 449.682 1337.46 448.798V447.958C1337.46 446.721 1338.3 445.881 1339.53 445.881H1341.57C1342.27 445.881 1342.76 445.394 1342.76 444.687V442.786C1342.76 441.99 1342.23 441.46 1341.43 441.46H1340.15C1338.56 441.46 1337.46 440.355 1337.46 438.719C1337.46 437.702 1336.79 437.039 1335.78 437.039H1334.63C1333.7 437.039 1333.04 436.376 1333.04 435.448V434.519C1333.04 433.37 1332.29 432.618 1331.14 432.618H1329.64C1329.02 432.618 1328.62 433.016 1328.62 433.635V435.713C1328.62 436.509 1329.15 437.039 1329.94 437.039Z" fill="#D400A6"/>
<path id="^ (Stroke)_2" fill-rule="evenodd" clip-rule="evenodd" d="M1333.66 436.739C1333.53 436.65 1333.43 436.543 1333.34 436.421C1333.15 436.158 1333.04 435.825 1333.04 435.448V434.52C1333.04 433.37 1332.29 432.619 1331.14 432.619H1329.64C1329.02 432.619 1328.62 433.017 1328.62 433.636V435.713C1328.62 436.509 1329.15 437.04 1329.94 437.04H1332.04C1332.59 437.04 1333.04 437.487 1333.04 438.04V440.46C1333.04 441.013 1333.49 441.46 1334.04 441.46H1336.46C1337.01 441.46 1337.46 441.908 1337.46 442.46V444.881C1337.46 445.433 1337.01 445.881 1336.46 445.881H1334.04C1333.49 445.881 1333.04 446.329 1333.04 446.881V449.302C1333.04 449.854 1332.59 450.302 1332.04 450.302H1329.94C1329.15 450.302 1328.62 450.832 1328.62 451.628V453.396C1328.62 454.192 1329.15 454.723 1329.94 454.723H1330.39C1331.98 454.723 1333.04 453.662 1333.04 452.026C1333.04 451.59 1333.17 451.211 1333.4 450.921C1333.47 450.824 1333.56 450.736 1333.66 450.66C1333.95 450.432 1334.33 450.302 1334.76 450.302H1335.95C1336.84 450.302 1337.46 449.683 1337.46 448.799V447.959C1337.46 447.365 1337.65 446.862 1337.99 446.5C1338.02 446.47 1338.05 446.441 1338.08 446.413C1338.44 446.075 1338.94 445.881 1339.53 445.881H1341.57C1342.27 445.881 1342.76 445.395 1342.76 444.687V442.787C1342.76 441.991 1342.23 441.46 1341.43 441.46H1340.15C1338.56 441.46 1337.46 440.355 1337.46 438.72C1337.46 437.703 1336.79 437.04 1335.78 437.04H1334.63C1334.25 437.04 1333.92 436.93 1333.66 436.739ZM1332.42 448.683C1332.42 449.235 1331.97 449.683 1331.42 449.683H1329.94C1329.41 449.683 1328.91 449.865 1328.55 450.229C1328.18 450.593 1328 451.09 1328 451.628V453.396C1328 453.935 1328.18 454.432 1328.55 454.795C1328.91 455.159 1329.41 455.341 1329.94 455.341H1330.39C1331.32 455.341 1332.15 455.026 1332.75 454.423C1333.34 453.819 1333.66 452.98 1333.66 452.026C1333.66 451.665 1333.78 451.397 1333.96 451.22C1334.13 451.044 1334.4 450.921 1334.76 450.921H1335.95C1336.54 450.921 1337.08 450.712 1337.47 450.319C1337.87 449.927 1338.08 449.389 1338.08 448.799V447.959C1338.08 447.483 1338.23 447.128 1338.47 446.893C1338.7 446.659 1339.06 446.5 1339.53 446.5H1341.57C1342.07 446.5 1342.53 446.326 1342.87 445.987C1343.2 445.649 1343.38 445.187 1343.38 444.687V442.787C1343.38 442.248 1343.2 441.751 1342.83 441.387C1342.47 441.024 1341.97 440.841 1341.43 440.841H1340.15C1339.5 440.841 1339 440.619 1338.65 440.268C1338.3 439.917 1338.08 439.395 1338.08 438.72C1338.08 438.074 1337.86 437.487 1337.44 437.061C1337.01 436.634 1336.42 436.421 1335.78 436.421H1334.63C1334.04 436.421 1333.66 436.035 1333.66 435.448V434.52C1333.66 433.808 1333.42 433.166 1332.96 432.701C1332.49 432.236 1331.85 432 1331.14 432H1329.64C1329.19 432 1328.77 432.146 1328.46 432.458C1328.15 432.77 1328 433.191 1328 433.636V435.713C1328 436.252 1328.18 436.749 1328.55 437.113C1328.91 437.476 1329.41 437.659 1329.94 437.659H1331.42C1331.97 437.659 1332.42 438.106 1332.42 438.659V441.079C1332.42 441.632 1332.87 442.079 1333.42 442.079H1335.84C1336.39 442.079 1336.84 442.527 1336.84 443.079V444.262C1336.84 444.814 1336.39 445.262 1335.84 445.262H1333.42C1332.87 445.262 1332.42 445.71 1332.42 446.262V448.683Z" fill="#D400A6"/>
</g>
</g>
</g>
</g>
<g id="Ellipse 9_3" filter="url(#filter7_d_305_607)">
<circle cx="963.5" cy="269.5" r="5.5" fill="#F1AFDD"/>
</g>
<g id="Ellipse 10_3" filter="url(#filter8_d_305_607)">
<circle cx="963.5" cy="284.5" r="5.5" fill="#FFFEF6"/>
<circle cx="963.5" cy="284.5" r="5" stroke="#D400A6"/>
</g>
<circle id="Ellipse 12_3" cx="1357.5" cy="319.5" r="5.5" fill="#D400A6"/>
<circle id="Ellipse 11_3" cx="1357.5" cy="334.5" r="5" fill="#FFFEF6" stroke="#D400A6"/>
</g>
<g id="Events Node Idle">
<g id="Frame 29_6" filter="url(#filter9_d_305_607)">
<rect x="551" y="462" width="394" height="262.459" rx="16" fill="#FFFEF6" shape-rendering="crispEdges"/>
<rect x="551.5" y="462.5" width="393" height="261.459" rx="15.5" stroke="#D400A6" shape-rendering="crispEdges"/>
<g id="Frame 31_4">
<rect x="559" y="470" width="378" height="32" rx="8" fill="#D400A6"/>
</g>
<g id="Frame 29_7">
<rect x="559" y="510" width="378" height="27.4592" rx="8" fill="#FFEDF4"/>
</g>
<g id="Frame 30_3">
<rect x="559" y="545.459" width="378" height="132" rx="8" fill="#FFEDF4"/>
</g>
<g id="Learn More Button Idle_4">
<g id="Group 405_4">
<rect id="Rectangle 25_4" x="907" y="685.459" width="30" height="31" rx="7" fill="#FFEDF4"/>
<rect id="Rectangle 26_4" x="559" y="685.459" width="340" height="31" rx="7" fill="#FFEDF4"/>
<path id="Rectangle 32_4" d="M890 697.595C890 692.759 895.63 690.106 899.359 693.185C901.473 694.93 904.527 694.93 906.641 693.185C910.37 690.106 916 692.759 916 697.595V703.411C916 708.208 910.191 710.599 906.815 707.192C904.713 705.072 901.287 705.072 899.185 707.192C895.809 710.599 890 708.208 890 703.411V697.595Z" fill="#FFEDF4"/>
<g id="Group 363_3">
<path id="^_3" d="M916.945 694.498H919.038C919.591 694.498 920.038 694.946 920.038 695.498V697.919C920.038 698.471 920.486 698.919 921.038 698.919H923.458C924.01 698.919 924.458 699.367 924.458 699.919V702.34C924.458 702.892 924.01 703.34 923.458 703.34H921.038C920.486 703.34 920.038 703.787 920.038 704.34V706.76C920.038 707.313 919.591 707.76 919.038 707.76H916.945C916.15 707.76 915.619 708.291 915.619 709.087V710.855C915.619 711.651 916.15 712.181 916.945 712.181H917.387C918.978 712.181 920.038 711.12 920.038 709.485C920.038 708.468 920.746 707.76 921.762 707.76H922.955C923.839 707.76 924.458 707.142 924.458 706.257V705.418C924.458 704.18 925.297 703.34 926.535 703.34H928.568C929.275 703.34 929.761 702.853 929.761 702.146V700.245C929.761 699.45 929.23 698.919 928.435 698.919H927.153C925.562 698.919 924.458 697.814 924.458 696.178C924.458 695.161 923.795 694.498 922.778 694.498H921.629C920.701 694.498 920.038 693.835 920.038 692.907V691.978C920.038 690.829 919.287 690.078 918.138 690.078H916.636C916.017 690.078 915.619 690.475 915.619 691.094V693.172C915.619 693.968 916.15 694.498 916.945 694.498Z" fill="#D400A6"/>
<path id="^ (Stroke)_3" fill-rule="evenodd" clip-rule="evenodd" d="M920.657 694.198C920.535 694.109 920.428 694.002 920.339 693.88C920.147 693.617 920.038 693.284 920.038 692.907V691.979C920.038 690.83 919.287 690.078 918.138 690.078H916.635C916.016 690.078 915.619 690.476 915.619 691.095V693.173C915.619 693.968 916.149 694.499 916.944 694.499H919.038C919.59 694.499 920.038 694.947 920.038 695.499V697.92C920.038 698.472 920.486 698.92 921.038 698.92H923.457C924.009 698.92 924.457 699.367 924.457 699.92V702.34C924.457 702.893 924.009 703.34 923.457 703.34H921.038C920.486 703.34 920.038 703.788 920.038 704.34V706.761C920.038 707.313 919.59 707.761 919.038 707.761H916.944C916.149 707.761 915.619 708.292 915.619 709.087V710.856C915.619 711.651 916.149 712.182 916.944 712.182H917.386C918.977 712.182 920.038 711.121 920.038 709.485C920.038 709.049 920.168 708.671 920.396 708.38C920.472 708.283 920.56 708.196 920.657 708.119C920.947 707.891 921.326 707.761 921.761 707.761H922.955C923.838 707.761 924.457 707.142 924.457 706.258V705.418C924.457 704.824 924.651 704.321 924.989 703.959C925.017 703.929 925.046 703.9 925.076 703.872C925.438 703.534 925.94 703.34 926.534 703.34H928.567C929.274 703.34 929.76 702.854 929.76 702.147V700.246C929.76 699.45 929.23 698.92 928.434 698.92H927.153C925.562 698.92 924.457 697.814 924.457 696.179C924.457 695.162 923.794 694.499 922.778 694.499H921.629C921.252 694.499 920.919 694.39 920.657 694.198ZM919.419 706.142C919.419 706.694 918.972 707.142 918.419 707.142H916.944C916.406 707.142 915.909 707.324 915.546 707.688C915.182 708.052 915 708.549 915 709.087V710.856C915 711.394 915.182 711.891 915.546 712.255C915.909 712.618 916.406 712.801 916.944 712.801H917.386C918.323 712.801 919.152 712.486 919.749 711.882C920.345 711.279 920.657 710.439 920.657 709.485C920.657 709.124 920.78 708.856 920.956 708.679C921.132 708.503 921.4 708.38 921.761 708.38H922.955C923.545 708.38 924.083 708.171 924.475 707.779C924.867 707.387 925.076 706.848 925.076 706.258V705.418C925.076 704.943 925.234 704.587 925.469 704.353C925.704 704.118 926.059 703.959 926.534 703.959H928.567C929.066 703.959 929.528 703.785 929.866 703.446C930.205 703.108 930.379 702.646 930.379 702.147V700.246C930.379 699.707 930.197 699.21 929.833 698.847C929.469 698.483 928.973 698.301 928.434 698.301H927.153C926.505 698.301 925.995 698.078 925.648 697.727C925.301 697.376 925.076 696.854 925.076 696.179C925.076 695.533 924.863 694.947 924.436 694.52C924.01 694.093 923.423 693.88 922.778 693.88H921.629C921.042 693.88 920.657 693.494 920.657 692.907V691.979C920.657 691.267 920.421 690.625 919.956 690.16C919.491 689.695 918.85 689.459 918.138 689.459H916.635C916.191 689.459 915.769 689.605 915.457 689.917C915.145 690.229 915 690.651 915 691.095V693.173C915 693.711 915.182 694.208 915.546 694.572C915.909 694.936 916.406 695.118 916.944 695.118H918.419C918.972 695.118 919.419 695.565 919.419 696.118V698.538C919.419 699.091 919.867 699.538 920.419 699.538H922.838C923.391 699.538 923.838 699.986 923.838 700.538V701.721C923.838 702.274 923.391 702.721 922.838 702.721H920.419C919.867 702.721 919.419 703.169 919.419 703.721V706.142Z" fill="#D400A6"/>
</g>
</g>
</g>
</g>
<g id="Ellipse 9_4" filter="url(#filter10_d_305_607)">
<circle cx="550.5" cy="545.5" r="5.5" fill="#F1AFDD"/>
</g>
<g id="Ellipse 10_4" filter="url(#filter11_d_305_607)">
<circle cx="550.5" cy="560.5" r="5.5" fill="#FFFEF6"/>
<circle cx="550.5" cy="560.5" r="5" stroke="#D400A6"/>
</g>
<circle id="Ellipse 12_4" cx="944.5" cy="595.5" r="5.5" fill="#D400A6"/>
<circle id="Ellipse 11_4" cx="944.5" cy="610.5" r="5" fill="#FFFEF6" stroke="#D400A6"/>
</g>
<g id="nodes-left">
<path id="SSX to Artists Connector" d="M442 362C515 313 436 22.9999 506.5 89.9999" stroke="#F1AFDD" stroke-width="2" stroke-linecap="round"/>
<path id="SSX to Collections Connector" d="M441.5 363.5C628 422 848.5 394.5 961.5 271" stroke="#F1AFDD" stroke-width="2" stroke-linecap="round"/>
<path id="SSX to Events Connector" d="M441.5 365.5C539 411.5 354.5 495.5 550 547.5" stroke="#F1AFDD" stroke-width="2" stroke-linecap="round"/>
</g>
<g id="node-right">
<path id="Artist Connector" d="M903 140C993 149 1354.9 -114.497 1471.5 192" stroke="#D400A6" stroke-width="2" stroke-linecap="round"/>
<path id="Collections Connector" d="M1358.5 320.5C1538.5 450 1264.5 438.5 1437.5 535" stroke="#D400A6" stroke-width="2" stroke-linecap="round"/>
<path id="Vector 6" d="M944.5 597C1116.5 448.5 1224.5 715.36 1461.5 672.86" stroke="#D400A6" stroke-width="2" stroke-linecap="round"/>
</g>
</g>
<defs>
<filter id="filter0_d_305_607" x="503.5" y="6" width="398" height="274" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-4" dy="4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape"/>
</filter>
<filter id="filter1_d_305_607" x="497.5" y="84" width="15" height="13" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-4" dy="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape"/>
</filter>
<filter id="filter2_d_305_607" x="497.5" y="99" width="15" height="13" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-4" dy="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape"/>
</filter>
<filter id="filter3_d_305_607" x="42.5" y="231" width="398" height="278" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-4" dy="4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape"/>
</filter>
<filter id="filter4_d_305_607" x="36.5" y="309" width="15" height="13" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-4" dy="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape"/>
</filter>
<filter id="filter5_d_305_607" x="36.5" y="324" width="15" height="13" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-4" dy="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape"/>
</filter>
<filter id="filter6_d_305_607" x="960" y="186" width="398" height="285" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-4" dy="4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape"/>
</filter>
<filter id="filter7_d_305_607" x="954" y="264" width="15" height="13" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-4" dy="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape"/>
</filter>
<filter id="filter8_d_305_607" x="954" y="279" width="15" height="13" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-4" dy="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape"/>
</filter>
<filter id="filter9_d_305_607" x="547" y="462" width="398" height="266.459" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-4" dy="4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape"/>
</filter>
<filter id="filter10_d_305_607" x="541" y="540" width="15" height="13" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-4" dy="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape"/>
</filter>
<filter id="filter11_d_305_607" x="541" y="555" width="15" height="13" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-4" dy="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.945098 0 0 0 0 0.686275 0 0 0 0 0.866667 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_607"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_305_607" result="shape"/>
</filter>
<clipPath id="clip0_305_607">
<rect width="1410" height="744" fill="white"/>
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