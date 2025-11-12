<script>
import Topbar from '../components/Topbar.vue'; // Import the Topbar component
import PageBackground from '../components/PageBackground.vue';
import GalleryGrid from '../components/GalleryGrid.vue'; // Import the Grid component
import BackTopButton from '../widgets/BackTopButton.vue';
import SimpleButton from '../widgets/SimpleButton.vue';
import Footer from '../components/Footer.vue'; // Import the Footer component
import teamData from '../data/team.json';
import LogoSection from '../components/LogoSection.vue';
import { formToJSON } from 'axios';



export default {
    components: {
        Topbar, // Register the Topbar component
        PageBackground,
        GalleryGrid, // Register the Grid component
        BackTopButton,
        SimpleButton,
        LogoSection,
        Footer, // Register the Footer component
    },
    data() {
        return {
            interactiveMode: false,
            currentTheme: { theme: 'default' }, // Default theme
            iconBasePath: 'icons/', // Base path for icons
            galleryName: '',
            galleryDescription: '',
            basePath: 'team/',
            routeName: '',
            data: teamData,
            backgrounds: {
                default: 'backgrounds/background-about-page-orange.svg',
                interactive: './backgrounds/background-about-page-default.svg',
                grayscale: './backgrounds/background-about-page-grayscale.svg',
                highContrast: './backgrounds/background-about-page-high-contrast.svg',
                wcag: './backgrounds/background-about-page-default.svg'
            },


            // other boxes icons
            isDecoractionCardSubtitleOrange: true,
            isDecoractionCardSubtitlePink: false,
            isDecoractionCardSubtitleGray: false,
            isDecoractionCardSubtitleHighContrast: false,
            isDecoractionCardSubtitleWCAG: false,

        }
    },

    mounted() {
        this.loadInteractiveMode();
    },

    methods: {
        updateTheme(payload) {
            this.currentTheme = payload; // Update the theme
        },

        loadInteractiveMode() {
            try {
                const savedSettings =
                    JSON.parse(localStorage.getItem('accessibilitySettings')) || {};
                this.interactiveMode = savedSettings.interactiveMode ?? false;
            } catch (error) {
                console.error('Error in loadInteractiveMode:', error);
            }
        }
    }
}

</script>

<style scoped>
.page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    /* Ensure the container takes up the full viewport height */
}


.content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
    padding-right: 2rem;
}

.about {
    margin: auto;
    margin-bottom: 1.5rem;
    display: flex;
    width: 53.5rem;
    padding: 1.25rem 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    border-radius: 1rem;
    border: 1px solid var(--primary-color);
    background: #FFFEFA;
}

.about h2 {

    display: flex;
    padding: 0.75rem 1.25rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    justify-content: center;
    border-radius: 0.5rem;
    font-family: var(--font-family-Decorative);
    border: 1px solid var(--primary-color);
    background: var(--background-color-headings);
    color: white;
}

.separator {
    width: 9.02819rem;
    height: auto;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
}

/* Ensure content boxes appear above background */
.boxOne,
.boxTwo,
.boxThree,
.boxFour,
.boxFive,
.boxSix {
    background: white;
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

.titleAndIntroText {
    text-align: center;
}

.mainTitle {
    font-size: 8rem;
    font-weight: 400;
    text-align: center;
    color: var(--primary-color);
    font-family: var(--font-family, 'Handjet'), sans-serif;
}

.textPlusArrows {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: auto;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    align-items: center;
    justify-content: center;
}

.textPlusArrows p {
    width: 40.0625rem;
    /* margin-bottom: 1em; */
    padding: 0.75rem;
    font-family: 'Inter', sans-serif;
    font-size: 2rem;
    font-weight: 400;
    color: var(--primary-color);
}



.textPlusArrows img {
    width: 4.89713rem;
    height: 7.42763rem;
}



.boxes {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr) 0.5fr;
    margin-top: 1.5rem;
}

.boxesOneAndTwo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5rem;
    margin-bottom: 2rem;

}

.svg-container {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    /* align-items: center; */
}


.boxOne {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    /* margin-left: 3.71rem; */
    gap: 0.5rem;
    /* justify-content: center; */
    /* align-items: center; */
    border-radius: 16px;
    border: 1px solid var(--primary-color);
    /* grid-column: 1 / 3; */
    /* grid-row: 1 / 2; */
    /* align-self: center; */
    /* position: relative; */

}

.other-box-heading {

    display: flex;
    padding: 0.75rem 0.5rem;
    align-self: stretch;
    /* Ensures vertical alignment */
    align-items: center;
    border-radius: 8px;
    background-color: var(--primary-color);
    font-family: var(--font-family, 'Handjet'), sans-serif;
    /* Uses Handjet by default */
    color: white;
    font-size: var(--font-24px);
    font-weight: 400;
    gap: 0.5rem;

}

.other-box-action-call {
    display: flex;
    padding: 0.5rem;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    border-radius: 8px;
    font-family: var(--font-family, 'Handjet'), sans-serif;
    /* Uses Handjet by default */
    color: var(--primary-color);
    font-size: var(--font-medium);
    font-weight: 400;
    background-color: var(--secondary-color);
    align-items: center;

}

.other-box-action-call:hover {
    background-color: var(--hover-color);
}

.other-call-action {
    color: var(--primary-color);
    display: flex;
    justify-content: space-between;
    /* or use margin-left: auto on .ok-action */
    width: 100%;
}


.other-goto-action {
    font-size: var(--font-medium);
    font-weight: 400;
    margin-left: auto;
}


.other-box-action-call:hover .other-call-action {
    color: var(--hover-text-color)
}



.other-box-action-call:hover .other-goto-action {
    color: var(--hover-text-color)
}

.boxOneParagraphContainer {
    height: 100%;
    display: flex;
    padding: 1.25rem;
    align-items: center;
    align-self: stretch;
    border-radius: 8px;
    background-color: var(--secondary-color);
    overflow: auto;

}

.boxOneParagraphContainer p {
    font-size: 1.25rem;
    font-weight: 500;
    margin: 0;
    font-family: 'Inter', sans-serif;
    color: var(--primary-color);
}

.boxTwo {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    /* margin-right: 6.853rem; */
    grid-column: 3 / 5;
    grid-row: 1 / 2;
    flex-direction: column;
    /* justify-content: center;
    align-self: end;
    align-items: center;
    justify-self: end; */
    gap: 8px;
    border: 1px solid var(--primary-color-left-box);
    background-color: #FFFEF6;
    border-radius: 16px;
    box-shadow: -4px 4px 0 0 #FFEDF4;
}


.boxThree {
    display: flex;
    /* width: 33.0625rem; */
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    margin-left: auto;
    margin-right: auto;
    background-color: var(--secondary-color-left-box);
    margin-bottom: 2rem;
    grid-column: 2 / 4;
    grid-row: 2 / 3;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    /* ← this centers it horizontally inside the grid cell */
    align-items: center;
    gap: 8px;
    border: 1px solid var(--primary-color-left-box);
    background-color: #FFFEF6;
    border-radius: 16px;
    box-shadow: -4px 4px 0 0 #FFEDF4;
}


.boxesFourToSix {

    display: flex;
    flex-direction: row;
    justify-content: center;
    /* Optional: centers everything horizontally */

}

.boxFour {
    /* width: 23.06rem; */
    width: 100%;
    height: 100%;
    display: inline-flex;
    padding: 8px;
    /* margin-left: 4.27rem; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: start;
    gap: 8px;
    border-radius: 16px;
    border: 1px solid var(--primary-color);
    grid-column: 1 / 3;
    grid-row: 3 / 4;
}

.boxFive {
    display: flex;
    /* width: 26.312rem; */
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    /* margin-left: auto; */
    /* margin-right: auto; */
    /* margin-top: 4rem; */
    grid-column: 2 / 4;
    grid-row: 3 / 5;
    flex-direction: column;
    justify-content: center;
    align-self: start;
    /* ← this centers it horizontally inside the grid cell */
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--primary-color-left-box);
    background-color: #FFFEF6;
    border-radius: 16px;
    box-shadow: -4px 4px 0 0 #FFEDF4;
}

.boxTwoThreeAndFiveParagraphContainer {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    padding: 1.25rem;
    align-items: center;
    align-self: stretch;
    border-radius: 8px;
    background-color: var(--secondary-color-left-box);
    overflow: auto;
}

.boxTwo p,
.boxThree p,
.boxFive p {
    /* padding: 1.25rem; */
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
    align-self: stretch;
    border-radius: 8px;
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--primary-color);
}

/* For smaller screens */
@media (max-width: 1200px) {

    .boxOneParagraphContainer p,
    .boxTwo p,
    .boxThree p,
    .boxFive p {
        font-size: 1.5rem;
    }


}

/* for larger screens */
@media (min-width: 1440px) {

    .boxOneParagraphContainer p,
    .boxTwo p,
    .boxThree p,
    .boxFive p {
        font-size: 0.9rem;
    }

}

.boxSix {
    /* width: 24.06rem; */
    width: 100%;
    height: 100%;
    display: inline-flex;
    padding: 0.5rem;
    /* margin-right: 4.11rem; */
    /* margin-top: 8rem; */
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
    grid-column: 3 / 5;
    grid-row: 3 / 5;
    align-self: start;
    justify-self: end;
    position: relative;
    border: 1px solid var(--primary-color);
    border-radius: 16px;
}







.lines {
    stroke: var(--primary-color);
}

.leftEllipses {
    fill: var(--primary-color);
    stroke: var(--primary-color);
}

.buttonsRow {
    display: flex;
    justify-content: center;
    gap: 1.25rem;
    /* margin-top: 1rem; */
}
</style>

<template>
    <div class="page-container">
        <!-- top bar -->
        <Topbar :interactive-mode="interactiveMode" @theme-changed="updateTheme" />

        <!-- body -->
        <div class="content">
            <div class="titleAndIntroText">

                <div class="textPlusArrows">

                    <img v-show="isDecoractionCardSubtitleOrange"
                        :src="iconBasePath + 'arrowLeftHomepageOrangeTheme.svg'" alt="">
                    <img v-show="isDecoractionCardSubtitlePink"
                        :src="iconBasePath + 'arrowLeftHomePageDefaultTheme.svg'" alt="">
                    <img v-show="isDecoractionCardSubtitleGray" :src="iconBasePath + 'decorationCardSubtitleGray.svg'"
                        alt="">
                    <img v-show="isDecoractionCardSubtitleHighContrast"
                        :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="">
                    <img v-show="isDecoractionCardSubtitleWCAG" :src="iconBasePath + 'decorationCardSubtitleWCAG.svg'"
                        alt="">

                    <p>The <strong>Sari-Sari Xchange Assetory</strong> (SSXA) is a virtual asset library created with
                        and for the Asian
                        diaspora community. </p>


                    <img v-show="isDecoractionCardSubtitleOrange"
                        :src="iconBasePath + 'arrowRightHomepageOrangeTheme.svg'" alt="">
                    <img v-show="isDecoractionCardSubtitlePink"
                        :src="iconBasePath + 'arrowRightHomePageDefaultTheme.svg'" alt="">
                </div>

                <div class="buttonsRow">
                    <SimpleButton :to="{ name: '' }" text="Visit the SSX website"
                        :icon="iconBasePath + 'arrow-right-black.svg'" />
                    <SimpleButton :to="{ name: 'Submit Your Work Form' }" text="Submit your work"
                        :icon="iconBasePath + 'submit-your-work-icon-black.svg'" />
                </div>

                <img class="separator" v-show="isDecoractionCardSubtitleOrange"
                    :src="iconBasePath + 'separator-orange.svg'" alt="">

            </div>

            <PageBackground :theme="currentTheme.theme" :backgrounds="backgrounds" top="-4rem" left="50%"
                transform="translateX(-50%)" width="100%" height="65rem" backgroundSize="contain"
                backgroundPosition="center" />

            <div class="about" v-show="interactiveMode == false">
                <h2>About this asset library</h2>
                <p>Asians are generally <b>underrepresented</b> and <b>misrepresented</b> in <b>new media</b> such as
                    games, VR, and AR. We
                    also recognize the lack of diverse representation of the Asian community’s everyday experiences on
                    major digital asset platforms.<br><br>

                    Inspired by the concept of the <b>Sari Sari store in the Philippines</b> —small neighborhood
                    convenience
                    stores run by women within the home as part of the local economic ecosystem — we are building a
                    diverse and accessible “<b>glocal</b>” digital asset network for media art creation, including XR,
                    games,
                    and animation.<br><br>

                    Beyond serving as an online asset repository, SSXA seeks to use the digital asset library as a
                    <b>storytelling</b> platform to represent individual stories.<br><br>

                    By deploying different tiers of <b>copyright</b> associated with digital assets, SSXA embraces an
                    <b>
                        ethics of care</b> for these assets, considering the <b>labor</b> involved in their creation and
                    their emotional and
                    sentimental value.<br><br>

                    SSXA engages in community collaboration with local partners to disseminate knowledge in digital
                    creation through activities such as <b>asset creation workshops</b> and <b>tech jams</b>.<br><br>

                    Additionally, SSXA invests in innovative and accessible educational modules to further benefit
                    community members at large.<br><br>

                    By leveraging <b>horizontal modes of operation</b>, SSXA empowers various stakeholders to <b>
                        challenge systemic injustices and inequalities
                    </b> in the current <b>technological infrastructure</b>.
                </p>


            </div>


            <div v-show="interactiveMode == true" class="svg-container">
                <svg viewBox="0 0 1360 782" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <g id="boxThree">
                        <foreignObject x="409.816" y="300.795" width="528" height="128">
                            <div class="boxThree">
                                <div class="boxTwoThreeAndFiveParagraphContainer">
                                    <p>Beyond serving as an online asset repository, SSXA seeks to use the digital asset
                                        library as a <strong>storytelling</strong> platform to represent individual
                                        stories.</p>
                                </div>
                            </div>
                        </foreignObject>
                    </g>
                    <g id="boxFive">
                        <foreignObject x="455.316" y="505.295" width="437" height="272">
                            <div class="boxFive">
                                <div class="boxTwoThreeAndFiveParagraphContainer">
                                    <p>SSXA engages in community collaboration with local partners to
                                        disseminate knowledge in digital creation through activities such as
                                        <strong>asset creation
                                            workshops</strong>
                                        and <strong> tech jams</strong>.
                                        <br></br>
                                        Additionally, SSXA invests in innovative and accessible educational modules to
                                        further benefit
                                        community members at large.
                                    </p>
                                </div>
                            </div>
                        </foreignObject>

                    </g>

                    <g id="boxFour">
                        <foreignObject x="20.3163" y="452.295" width="385" height="200">
                            <div class="boxFour">
                                <div class="boxOneParagraphContainer">
                                    <p>By deploying different tiers of <strong>copyright</strong> associated with
                                        digital assets, SSXA embraces an <strong> ethics of care </strong> for these
                                        assets,
                                        considering the <strong>labor</strong> involved
                                        in their creation and their emotional and sentimental value. </p>
                                </div>
                            </div>
                        </foreignObject>



                    </g>

                    <g id="boxSix">
                        <foreignObject x="957.316" y="572.295" width="385" height="176">
                            <div class="boxSix">
                                <div class="boxOneParagraphContainer">
                                    <p>By leveraging horizontal modes of operation, SSXA empowers
                                        various stakeholders to <strong>challenge systemic injustices</strong> and
                                        <strong>inequalities</strong> in the current
                                        <strong>technological infrastructure</strong>.
                                    </p>
                                </div>
                            </div>
                        </foreignObject>

                    </g>

                    <g id="boxOne">
                        <foreignObject x="11.3163" y="0.294922" width="592" height="238">

                            <div class="boxOne">
                                <div class="other-box-heading">
                                    <img :src="iconBasePath + 'asteriskWhite.svg'" alt="">
                                    <h2>About</h2>
                                </div>

                                <div class="other-box-action-call">
                                    <router-link :to="{ name: '' }" class="other-call-action">
                                        <span>Visit SSX Website</span> <span class="call-goto-action"
                                            aria-hidden="true">></span>
                                    </router-link>
                                </div>
                                <div class="boxOneParagraphContainer" aria-hidden="true">
                                    <p>Asians are generally <strong>underrepresented</strong> and
                                        <strong>misrepresented</strong> in
                                        new media such as games, VR, and
                                        AR. We also recognize the lack of diverse representation of the Asian
                                        community’s everyday
                                        experiences on major digital asset platforms.
                                    </p>
                                </div>
                            </div>
                        </foreignObject>
                    </g>

                    <g id="boxTwo">
                        <foreignObject x="708.316" y="53.2949" width="630" height="176">
                            <div class="boxTwo">
                                <div class="boxTwoThreeAndFiveParagraphContainer">
                                    <p> Inspired by the concept of the <strong>Sari Sari store in the
                                            Philippines</strong> —small
                                        neighborhood
                                        convenience stores run by women within the home as part of the local economic
                                        ecosystem — we are
                                        building a diverse and accessible “<strong>glocal</strong>” digital asset
                                        network for media art
                                        creation, including
                                        XR, games, and animation. </p>
                                </div>
                            </div>
                        </foreignObject>
                    </g>

                    <!-- ellipses -->
                    <g class="leftEllipses">
                        <circle id="Ellipse 50_2" cx="456.816" cy="629.795" r="5.5" />
                        <circle id="Ellipse 51_2" cx="456.816" cy="648.795" r="5" fill="#FFFEF6" />
                        <circle id="Ellipse 9_5" cx="1336.82" cy="152.795" r="5.5" />
                        <circle id="Ellipse 10_5" cx="1336.82" cy="137.795" r="5" fill="#FFFEF6" />
                        <circle id="Ellipse 9" cx="936.816" cy="361.795" r="5.5" />
                        <circle id="Ellipse 10" cx="936.816" cy="380.795" r="5" fill="#FFFEF6" />
                        <circle id="Ellipse 9_2" cx="890.816" cy="566.795" r="5.5" />
                        <circle id="Ellipse 10_2" cx="890.816" cy="585.795" r="5" fill="#FFFEF6" />
                        <circle id="Ellipse 9_3" cx="403.816" cy="513.795" r="5.5" />
                        <circle id="Ellipse 10_3" cx="403.816" cy="532.795" r="5" fill="#FFFEF6" />
                        <circle id="Ellipse 50_5" cx="709.816" cy="119.795" r="5.5" />
                        <circle id="Ellipse 51_5" cx="709.816" cy="138.795" r="5" fill="#FFFEF6" />

                        <circle id="Ellipse 9_4" cx="601.816" cy="106.795" r="5" fill="#FFFEF6" />
                        <circle id="Ellipse 10_4" cx="601.816" cy="125.795" r="5" />
                        <circle id="Ellipse 50_4" cx="958.816" cy="688.795" r="5.5" />
                        <circle id="Ellipse 51_4" cx="958.816" cy="707.795" r="5" />

                        <circle id="Ellipse 50_3" cx="21.8163" cy="518.795" r="5.5" />
                        <circle id="Ellipse 51_3" cx="21.8163" cy="537.795" r="5" fill="#FFFEF6" />

                        <circle id="Ellipse 50" cx="410.816" cy="366.795" r="5.5" />
                        <circle id="Ellipse 51" cx="410.816" cy="385.795" r="5" fill="#FFFEF6" />

                    </g>
                    <!-- vectors -->
                    <g class="lines">
                        <path d="M603.316 124.625C643.316 66.6249 657.316 160.795 708.816 119.795" />
                        <path d="M1337.82 151.795C1433.32 515.295 1103.82 251.795 938.316 361.795" />
                        <path d="M410.317 367.295C293.399 420.636 -76.1016 180.637 21.3165 518.795" />
                        <path d="M405.316 513.795C506.316 544.077 367.816 599.295 457.816 627.795" />
                        <path d="M892.316 567.148C992.316 553.648 870.316 705.162 959.316 688.662" />
                    </g>
                </svg>


            </div>


            <!-- Collections Grid -->
            <GalleryGrid :items="data" :galleryName="galleryName" :galleryDescription="galleryDescription"
                :basePath="basePath" :routeName="routeName" :showSearchBar="false" :isAboutPage="true"
                :theme="currentTheme.theme" />

            <!-- Logos -->
            <LogoSection />


            <!-- back to top button -->
            <BackTopButton />

        </div>
        <!-- footer -->

        <Footer :theme="currentTheme" />
    </div>
</template>