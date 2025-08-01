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
    grid-template-rows: 7% repeat(8, 1fr);
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
    background-color: #FFFEF6;
    z-index: 3;
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
    width: 21.9375rem;
    font-size: 1rem;
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
    width: clamp(20rem, 22vw, 26rem);
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
    background-color: #f9f9f9;
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
    background-color: transparent;
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
        <div class="left-box">
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