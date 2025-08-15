<script>
import Footer from '../components/Footer.vue'; // Import the Footer component
import Topbar from '../components/Topbar.vue'; // Import the Topbar component
import GalleryGrid from '../components/GalleryGrid.vue'; // Import the Grid component
import BackTopButton from '../widgets/BackTopButton.vue';
import SimpleButton from '../widgets/SimpleButton.vue';
import teamData from '../data/team.json';



export default {
    components: {
        Footer, // Register the Footer component
        Topbar, // Register the Topbar component
        GalleryGrid, // Register the Grid component
        BackTopButton,
        SimpleButton
    },
    data() {
        return {
            currentTheme: { theme: 'default' }, // Default theme
            iconBasePath: 'icons/', // Base path for icons
            galleryName: '',
            galleryDescription: '',
            basePath: 'team/',
            routeName: '',
            data: teamData,


            // other boxes icons
            isDecoractionCardSubtitlePink: true,
            isDecoractionCardSubtitleGray: false,
            isDecoractionCardSubtitleHighContrast: false,
            isDecoractionCardSubtitleWCAG: false,

        }
    },

    methods: {
        updateTheme(payload) {
            this.currentTheme = payload; // Update the theme
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
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
    padding-right: 2rem;
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
    margin: 1em;
    cursor: default;
    box-shadow:
        -6px 6px 0 var(--shadow),
        /* Thick left border */
        0 6px 1px var(--shadow);
    /* Thick bottom border */
}

.titleAndIntroText {
    text-align: center;
    margin-bottom: 1rem;
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


.boxOne {
    display: flex;
    flex-direction: column;
    width: 37rem;
    padding: 0.5rem;
    margin-left: 3.71rem;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    border: 1px solid var(--primary-color);
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    align-self: center;
    position: relative;

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
    display: flex;
    padding: 1.25rem;
    align-items: center;
    align-self: stretch;
    border-radius: 8px;
    background-color: var(--secondary-color);
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
    width: 39.375rem;
    padding: 0.5rem;
    margin-right: 6.853rem;
    grid-column: 3 / 5;
    grid-row: 1 / 2;
    flex-direction: column;
    justify-content: center;
    align-self: end;
    /* ← pushes the div to the bootom of the grid cell */
    align-items: center;
    justify-self: end;
    gap: 8px;
    border: 1px solid var(--primary-color-left-box);
    background-color: #FFFEF6;
    border-radius: 16px;
    box-shadow: -4px 4px 0 0 #FFEDF4;
}





.boxThree {
    display: flex;
    width:  33.0625rem;
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
    width: 23.06rem;
    display: inline-flex;
    padding: 8px;
    margin-left: 4.27rem;
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
    width: 26.312rem;
    padding: 0.5rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 4rem;
    background-color: var(--secondary-color-left-box);
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

.boxTwo p,
.boxThree p,
.boxFive p {
    /* display: inline-flex; */
    padding: 1.25rem;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    background-color: var(--secondary-color-left-box);
    border-radius: 8px;
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--primary-color);

    
}


.boxSix {
    width: 24.06rem;
    display: inline-flex;
    padding: 0.5rem;
    margin-right: 4.11rem;
    margin-top: 8rem;
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




.background-layer {
    grid-column: 1 / 9;
    /* Full width */
    grid-row: 1 / 9;
    /* Covers rows 2 to 9 */
    background-image: url("backgrounds/backgroundAboutPageDefault.svg");
    background-repeat: no-repeat;
    background-size: contain;
    /* background-position: center; */
    z-index: -1;
    /* Sends it to the background */
}

.meetTheTeamHeader {
    margin-left: 4rem;
    margin-right: 4rem;
    background-color: var(--primary-color);
    text-align: center;
    font-family: var(--font-family, 'Handjet'), sans-serif;
    color: var(--secondary-color);
    border: none;
    border-radius: 12px;
    font-size: var(--font-48px);
    font-weight: 400;
    padding: 0.25rem;
}

.logoSection {
    display: flex;
    flex-direction: column;
    text-align: center;
    border: 1px dashed var(--primary-color);
    border-radius: 44px;
    margin-top: 2rem;
}

.logosRow {
    display: flex;
    gap: 2rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
    padding: 1rem;
}
</style>

<template>
    <div class="page-container">


        <!-- top bar -->
        <Topbar @theme-changed="updateTheme" />

        <!-- body -->
        <div class="content">
            <div class="titleAndIntroText">
                <h2 class="mainTitle"> SARI-SARI XCHANGE</h2>
                <div class="textPlusArrows">

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

                    <img v-show="isDecoractionCardSubtitlePink"
                        :src="iconBasePath + 'arrowRightHomePageDefaultTheme.svg'" alt="">
                </div>
                <SimpleButton to="" text="Submit your work" />
            </div>

            <div class="boxes">
                <div class="background-layer" aria-hidden="true"></div> <!-- New background layer -->
                <!-- <div class="boxesOneAndTwo"> -->
                <div class="boxOne">
                    <div class="other-box-heading">
                        <img :src="iconBasePath + 'asteriskWhite.svg'" alt="">
                        <h2>About</h2>
                    </div>

                    <div class="other-box-action-call">
                        <router-link :to="{ name: '' }" class="other-call-action">
                            <span>Visit SSX Website</span> <span class="call-goto-action" aria-hidden="true">></span>
                        </router-link>
                    </div>
                    <div class="boxOneParagraphContainer" aria-hidden="true">
                        <p>Asians are generally <strong>underrepresented</strong> and <strong>misrepresented</strong> in
                            new media such as games, VR, and
                            AR. We also recognize the lack of diverse representation of the Asian community’s everyday
                            experiences on major digital asset platforms. </p>
                    </div>
                </div>

                <!-- cards -->

                <div class="boxTwo">
                    <p> Inspired by the concept of the <strong>Sari Sari store in the Philippines</strong> —small
                        neighborhood
                        convenience stores run by women within the home as part of the local economic ecosystem — we are
                        building a diverse and accessible “<strong>glocal</strong>” digital asset network for media art
                        creation, including
                        XR, games, and animation. </p>
                </div>

                <div class="boxThree">
                    <p>Beyond serving as an online asset repository, SSXA seeks to use the digital asset
                        library as a <strong>storytelling</strong> platform to represent individual stories.</p>
                </div>

                <!-- <div class="boxesFourToSix"> -->
                <div class="boxFour">
                    <div class="boxOneParagraphContainer">
                        <p>By deploying different tiers of <strong>copyright</strong> associated with
                            digital assets, SSXA embraces an <strong> ethics of care </strong> for these assets,
                            considering the <strong>labor</strong> involved
                            in their creation and their emotional and sentimental value. </p>
                    </div>
                </div>

                <div class="boxFive">
                    <p>SSXA engages in community collaboration with local partners to
                        disseminate knowledge in digital creation through activities such as <strong>asset creation
                            workshops</strong>
                        and <strong> tech jams</strong>.
                        <br></br>
                        Additionally, SSXA invests in innovative and accessible educational modules to further benefit
                        community members at large.
                    </p>
                </div>

                <div class="boxSix">
                    <div class="boxOneParagraphContainer">
                        <p>By leveraging horizontal modes of operation, SSXA empowers
                            various stakeholders to <strong>challenge systemic injustices</strong> and
                            <strong>inequalities</strong> in the current
                            <strong>technological infrastructure</strong>.
                        </p>
                    </div>
                </div>

            </div>


            <div class="meetTheTeamHeader">
                <h3>
                    <img src="/icons/left-decor-default.svg">
                    Meet the Team
                    <img src="/icons/right-decor-default.svg">
                </h3>

            </div>
            <!-- Collections Grid -->
            <GalleryGrid :items="data" :galleryName="galleryName" :galleryDescription="galleryDescription"
                :basePath="basePath" :routeName="routeName" :showSearchBar="false" :isAboutPage="true" />

            <div class="logoSection">
                <div class="logosRow">
                    <img src="/images/logos/tangled-logo.png" alt="Logo of Tangled Art + Disability">
                    <img src="/images/logos/reel-asian-logo.png"
                        alt="Logo of Toronto Reel Asian International Festival">
                </div>
                <div class="logosRow">
                    <img src="/images/logos/centre3-logo.png" alt="Logo of Centre3 for artistic and social practice">
                    <img src="/images/logos/york-university-logo.png" alt="Logo of York University">
                    <img src="/images/logos/mcmaster-logo.png" alt="Logo of McMaster University">
                </div>
                <div class="logosRow">
                    <img src="/images/logos/sshrc-logo.png"
                        alt="Logo of Social Sciences and Humanities Research Council of Canada">
                </div>
            </div>

            <!-- back to top button -->
            <BackTopButton />

        </div>
        <!-- footer -->

        <Footer :theme="currentTheme" />
    </div>
</template>