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
    padding-left: 2em;
    padding-right: 2em;
}



/* Ensure content boxes appear above background */
.boxOne,
.boxTwo,
.boxThree,
.boxFour,
.boxFive,
.boxSix {
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
    margin-bottom: 1em;
}

.mainTitle {
    font-size: 5em;
    text-align: center;
    color: var(--primary-color);
    font-family: var(--font-family, 'Handjet'), sans-serif;
    /* Uses Handjet by default */
}

.textPlusArrows {

    display: flex;
    flex-direction: row;
    width: 40%;
    margin: auto;
    align-items: center;
    justify-content: center;
    /* Optional: centers everything horizontally */
}

.textPlusArrows p {
    margin-bottom: 1em;
    /* remove default margins that might mess with alignment */
    padding: 0.75em;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 350;
    color: var(--primary-color);
}

p {
    margin: 0;
    /* remove default margins that might mess with alignment */
    padding: 0.75em;
    font-family: 'Inter', sans-serif;
    font-size: 0.6rem;
    font-weight: 350;
    color: var(--primary-color);
}

.textPlusArrows img {
    width: 5%;
    height: auto;
    /* maintain aspect ratio */
}

/* .boxes{
    background-image: url('backgrounds/backgroundHomepageDefault.svg');
    background-repeat: no-repeat;
    background-size: cover;
} */

.boxes {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    /* width: 100vw; */
    /* height: 100vh;      */
    position: relative;
    /* border: 1px solid; */
}

.boxesOneAndTwo {
    display: flex;
    align-items: center;
    justify-content: center;
    /* Optional: centers everything horizontally */
    gap: 5em;
    margin-bottom: 2em;

}


.boxOne {
    padding: 0.5%;
    border-radius: 12px;
    border: 1px solid var(--primary-color);
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    align-self: center;
    position: relative;
    width: 80%;
}

.boxOneParagraphContainer {
    background-color: var(--secondary-color);

}

.boxTwo {
    background-color: var(--secondary-color-left-box);
    /* height: 50%; */
    grid-column: 3 / 5;
    grid-row: 1 / 2;
    align-self: center;
    position: relative;
    top: 20%;
    left: 10%;
    border: 1px solid var(--secondary-color-left-box);
    ;
    border-radius: 8px;
    width: 80%;
}


.boxThree {
    margin-left: auto;
    margin-right: auto;
    background-color: var(--secondary-color-left-box);
    margin-bottom: 2em;
    grid-column: 2 / 4;
    grid-row: 2 / 3;
    align-self: center;
    position: relative;
    border: 1px solid var(--secondary-color-left-box);
    ;
    border-radius: 8px;
    width: 80%;
}

.boxesFourToSix {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* Optional: centers everything horizontally */

}

.boxFour {
    padding: 0.5%;
    /* width: 80%; */
    border-radius: 12px;
    border: 1px solid var(--primary-color);
    grid-column: 1 / 2;
    grid-row: 3 / 4;
    align-self: center;
    position: relative;
}

.boxFive {
    /* margin-top: em; */
    grid-column: 2 / 4;
    grid-row: 3 / 5;
    align-self: center;
    position: relative;
    bottom: 10%;
    left: 12%;
    border: 1px solid var(--secondary-color-left-box);
    ;
    border-radius: 8px;
    width: 70%;
}

.boxSix {
    grid-column: 4 / 5;
    grid-row: 3 / 5;
    align-self: center;
    position: relative;
    top: 0%;
    border: 1px solid var(--secondary-color-left-box);
    ;
    border-radius: 8px;
    width: 80%;
}

.boxFiveParagraphContainer {
    background-color: var(--secondary-color-left-box);
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
    background-color: var(--primary-color);
    text-align: center;
    font-family: var(--font-family, 'Handjet'), sans-serif;
    color: var(--secondary-color);
    border: none;
    border-radius: 12px;
    font-size: 2em;
    padding: 0.25em;
}

.logoSection {    
   display: flex;
   flex-direction: column;
   text-align: center;
   border: 1px dashed var(--primary-color);
   border-radius: 44px; 
   margin-top: 2em;
}

.logosRow {
    display: flex;
    gap: 2em;    
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    padding: 1em;
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

                    <p>The Sari-Sari Xchange Assetory (SSXA) is a virtual asset library created with and for the Asian
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
                    <div class="other-box-subtitle">
                        <img v-show="isDecoractionCardSubtitlePink"
                            :src="iconBasePath + 'decorationCardSubtitlePink.svg'" alt="">
                        <img v-show="isDecoractionCardSubtitleGray"
                            :src="iconBasePath + 'decorationCardSubtitleGray.svg'" alt="">
                        <img v-show="isDecoractionCardSubtitleHighContrast"
                            :src="iconBasePath + 'decorationCardSubtitleHighContrast.svg'" alt="">
                        <img v-show="isDecoractionCardSubtitleWCAG"
                            :src="iconBasePath + 'decorationCardSubtitleWCAG.svg'" alt="">
                        <router-link :to="{ name: '' }" class="other-call-action">
                            <span>Visit SSX Website</span> <span class="call-goto-action" aria-hidden="true">></span>
                        </router-link>
                    </div>
                    <div class="boxOneParagraphContainer" aria-hidden="true">
                        <p>Asians are generally underrepresented and misrepresented in new media such as games, VR, and
                            AR. We also recognize the lack of diverse representation of the Asian community’s everyday
                            experiences on major digital asset platforms. </p>
                    </div>
                </div>

                <!-- cards -->


                <p class="boxTwo">Inspired by the concept of the Sari Sari store in the Philippines —small neighborhood
                    convenience stores run by women within the home as part of the local economic ecosystem — we are
                    building a diverse and accessible “glocal” digital asset network for media art creation, including
                    XR, games, and animation. </p>



                <p class="boxThree">Beyond serving as an online asset repository, SSXA seeks to use the digital asset
                    library as a storytelling platform to represent individual stories.</p>

                <!-- <div class="boxesFourToSix"> -->
                <div class="boxFour">
                    <p class="boxOneParagraphContainer">By deploying different tiers of copyright associated with
                        digital assets, SSXA embraces an ethics of care for these assets, considering the labor involved
                        in their creation and their emotional and sentimental value. </p>
                </div>

                <div class="boxFive">
                    <p class="boxFiveParagraphContainer">SSXA engages in community collaboration with local partners to
                        disseminate knowledge in digital creation through activities such as asset creation workshops
                        and tech jams.
                        <br></br>
                        Additionally, SSXA invests in innovative and accessible educational modules to further benefit
                        community members at large.
                    </p>
                </div>

                <div class="boxSix">
                    <p class="boxOneParagraphContainer">By leveraging horizontal modes of operation, SSXA empowers
                        various stakeholders to challenge systemic injustices and inequalities in the current
                        technological infrastructure.  </p>
                </div>

            </div>
        

        <div class="meetTheTeamHeader">
            <h3>*** Meet the Team ***</h3>
        </div>
        <!-- Collections Grid -->
        <GalleryGrid 
        :items="data"
        :galleryName="galleryName" 
        :galleryDescription="galleryDescription" 
        :basePath="basePath" 
        :routeName="routeName" 
        :showSearchBar = "false"
        :isAboutPage="true"
        />

        <div class="logoSection">
            <div class="logosRow">
            <img src="/images/logos/tangled-logo.png" alt="Logo of Tangled Art + Disability">
            <img src="/images/logos/reel-asian-logo.png" alt="Logo of Toronto Reel Asian International Festival">
            </div>
            <div class="logosRow">
            <img src="/images/logos/centre3-logo.png" alt="Logo of Centre3 for artistic and social practice">
            <img src="/images/logos/york-university-logo.png" alt="Logo of York University">
            <img src="/images/logos/mcmaster-logo.png" alt="Logo of McMaster University">
            </div>
            <div class="logosRow">
            <img src="/images/logos/sshrc-logo.png" alt="Logo of Social Sciences and Humanities Research Council of Canada">
                </div>
        </div>

        <!-- back to top button -->
        <BackTopButton />

        </div>
        <!-- footer -->

        <Footer :theme="currentTheme" />
    </div>
</template>