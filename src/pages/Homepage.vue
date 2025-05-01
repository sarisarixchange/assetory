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
          
            isNotificationVisible: true,       
            //  topbar 
            currentLogoColorPalette: 'logo',
                      
            // leftbox
            isPinkLeftCardIconVisible: true,
            isGrayLeftCardIconVisible: false,
            isHighContrastLeftCardIconVisible: false,
            isWCAGLeftCardIconVisible: false,
           

            // center-top-box
            arePinkTopCenterCardSampleImagesVisible: true,
            areGrayTopCenterCardSampleImagesVisible: false,
            areHighContrastTopCenterCardSampleImagesVisible: false,

            // other boxes
          
            isDecoractionCardSubtitlePink: true,
            isDecoractionCardSubtitleGray: false,
            isDecoractionCardSubtitleHighContrast:false,
            isDecoractionCardSubtitleWCAG: false,
            currentOtherBoxPhotos: 'other-box-photos', 
           

            
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
  // call saved accessibility settings
  this.loadSettings();
},

    methods: {
      updateTheme(payload) {
      // Update multiple properties based on the payload
      this.currentLogoColorPalette = payload.currentLogoColorPalette;
      this.currentBackgroundLayer = payload.currentBackgroundLayer;
      },

      saveSettings() {
        const settings = {
            isNotificationVisible: this.isNotificationVisible,
            
            // topbar
            currentLogoColorPalette: this.currentLogoColorPalette,
           
           
             // leftbox
            isPinkLeftCardIconVisible: this.isPinkLeftCardIconVisible,
            isGrayLeftCardIconVisible: this.isGrayLeftCardIconVisible,
            isHighContrastLeftCardIconVisible: this.isHighContrastLeftCardIconVisible,
            isWCAGLeftCardIconVisible: this.isWCAGLeftCardIconVisible,
                      
            // center-top-box
            arePinkTopCenterCardSampleImagesVisible: this.arePinkTopCenterCardSampleImagesVisible,
            areGrayTopCenterCardSampleImagesVisible: this.areGrayTopCenterCardSampleImagesVisible,
            areHighContrastTopCenterCardSampleImagesVisible: this.areHighContrastTopCenterCardSampleImagesVisible,
            // other boxes
           
            isDecoractionCardSubtitlePink: this.isDecoractionCardSubtitlePink,
            isDecoractionCardSubtitleGray: this.isDecoractionCardSubtitleGray,
            isDecoractionCardSubtitleHighContrast: this.isDecoractionCardSubtitleHighContrast,
            isDecoractionCardSubtitleWCAG: this.isDecoractionCardSubtitleWCAG,
            currentOtherBoxPhotos: this.currentOtherBoxPhotos,
           
          
          // footer images
          areFooterImagesDefaultVisible: this.areFooterImagesDefaultVisible,
          areFooterImagesGrayscaleVisible: this.areFooterImagesGrayscaleVisible,
          areFooterImagesHighContrastVisible: this.areFooterImagesHighContrastVisible,
          areFooterImagesWCAGcolorsVisible: this.areFooterImagesWCAGcolorsVisible,
          //  background image
          currentBackgroundLayer: this.currentBackgroundLayer
        };
        localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
      },

      // /////

        loadSettings() {
          const savedSettings = localStorage.getItem('accessibilitySettings');
          if (savedSettings) {
            const settings = JSON.parse(savedSettings);

            this.isNotificationVisible= settings.isNotificationVisible ?? this.isNotificationVisible,
              // topbar
           
            this.currentLogoColorPalette= settings.currentLogoColorPalette || this.currentLogoColorPalette,
           
            
             // leftbox
             this.isPinkLeftCardIconVisible = settings.isPinkLeftCardIconVisible ?? this.isPinkLeftCardIconVisible,
             this.isGrayLeftCardIconVisible = settings.isGrayLeftCardIconVisible ?? this.isGrayLeftCardIconVisible,
             this.isHighContrastLeftCardIconVisible = settings.isHighContrastLeftCardIconVisible ?? this.isHighContrastLeftCardIconVisible,
             this.isWCAGLeftCardIconVisible = settings.isWCAGLeftCardIconVisible ?? this.isWCAGLeftCardIconVisible,
          
          
            // center-top-box
            this.arePinkTopCenterCardSampleImagesVisible = settings.arePinkTopCenterCardSampleImagesVisible ?? this.arePinkTopCenterCardSampleImagesVisible,
            this.areGrayTopCenterCardSampleImagesVisible = settings.areGrayTopCenterCardSampleImagesVisible ?? this.areGrayTopCenterCardSampleImagesVisible,
            this.areHighContrastTopCenterCardSampleImagesVisible = settings.areHighContrastTopCenterCardSampleImagesVisible ?? this.areHighContrastTopCenterCardSampleImagesVisible,
            // other boxes
          
            this.isDecoractionCardSubtitlePink = settings.isDecoractionCardSubtitlePink ?? this.isDecoractionCardSubtitlePink,
            this.isDecoractionCardSubtitleGray = settings.isDecoractionCardSubtitleGray ?? this.isDecoractionCardSubtitleGray,
            this.isDecoractionCardSubtitleHighContrast = settings.isDecoractionCardSubtitleHighContrast ?? this.isDecoractionCardSubtitleHighContrast,
            this.isDecoractionCardSubtitleWCAG = settings.isDecoractionCardSubtitleWCAG ?? this.isDecoractionCardSubtitleWCAG,
            this.currentOtherBoxPhotos = settings.currentOtherBoxPhotos || this.currentOtherBoxPhotos,
          
            // footer images
            this.areFooterImagesDefaultVisible = settings.areFooterImagesDefaultVisible ?? this.areFooterImagesDefaultVisible,
            this.areFooterImagesGrayscaleVisible = settings.areFooterImagesGrayscaleVisible ?? this.areFooterImagesGrayscaleVisible,
            this.areFooterImagesHighContrastVisible = settings.areFooterImagesHighContrastVisible ?? this.areFooterImagesHighContrastVisible,
            this.areFooterImagesWCAGcolorsVisible = settings.areFooterImagesWCAGcolorsVisible ?? this.areFooterImagesWCAGcolorsVisible,
            //  background image
            this.currentBackgroundLayer = settings.currentBackgroundLayer || this.currentBackgroundLayer
          }
          },



          dismissNotification() {
          this.isNotificationVisible = false; // Hides the notification
          this.saveSettings();
        },

   
  
    // do not erase curly brackets below
    }, 
}

</script>
    
    <style>   

      /* Ensure content boxes appear above background */
      .left-box, .right-box, .center-top-box, .center-bottom-box {
        z-index: 3; /* Place content above grid and background */
        margin: 1em;
        cursor: default;
        box-shadow: 
        -6px 6px 0 var(--shadow),  /* Thick left border */
        0 6px 1px var(--shadow);   /* Thick bottom border */
      }

    


      .left-box {
        padding: 1.8%;
        border-radius: 12px;
        border: 1px solid var(--primary-color);
     
      }



      .right-box {
        padding: 1.8%;
        /* width: 80%; */
        border-radius: 12px;
        border: 1px solid  var(--primary-color);;
        
      }

      .center-top-box {
        padding: 1.8%;
        /* width: 80%; */
        border-radius: 12px;
        border: 1px solid  var(--primary-color);;
      }

      .center-bottom-box {
        padding: 1.8%;
        /* width: 80%; */
        border-radius: 12px;
        border: 1px solid  var(--primary-color);;
      } 

      .grid-container {
        
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            grid-template-rows: 7% repeat(8, 1fr);
            width: 100vw;
            height: 100vh;     
            position: relative;
       
        }

      .background-layer {
          grid-column: 1 / 9; /* Full width */
          grid-row: 1 / 9; /* Covers rows 2 to 9 */
          background-image: url("/xyz.svg"); 
          background-repeat: no-repeat;
          background-size: contain;
          /* background-position: center; */
          z-index: -1; /* Sends it to the background */
      }

      .background-layer-grayscale {
        grid-column: 1 / 9; /* Full width */
          grid-row: 1 / 9; /* Covers rows 2 to 9 */
          background-image: url("/xyz-gray.svg"); 
          background-repeat: no-repeat;
          background-size: contain;
          /* background-position: center; */
          z-index: -1; /* Sends it to the background */
      }

      
      .background-layer-highContrast{
        grid-column: 1 / 9; /* Full width */
          grid-row: 1 / 9; /* Covers rows 2 to 9 */
          background-image: url("/xyz-highContrast.svg"); 
          background-repeat: no-repeat;
          background-size: contain;
          /* background-position: center; */
          z-index: -1; /* Sends it to the background */
      }
         
        .header {grid-column: 1/9; grid-row: 1 / 2; 
            /* Aligns to the top of the row */
          /* align-self: start;    */
          /* Takes up only half of the row height */
          /* height: 50%;           */
        }

        .left-box { 
          grid-column: 2 / 4; 
          grid-row: 3 / 6; 
          align-self: center;
          position: relative;
          top: 15%;
          right: 20%;
           }

        .right-box { 
          grid-column: 6 / 8; 
          grid-row: 4 / 6;
          align-self: center;
          position: relative;
          top: 20%;
          left: 20%;
            }

        .center-top-box { 
          grid-column: 4 / 6; 
          grid-row: 2 / 5; 
          align-self: center; 
          position: relative;
          top: 3%;
        }

        .center-bottom-box {
           grid-column: 4 / 6;
           grid-row:  6/ 9; 
           align-self: center; 
           position: relative;
           left: 13%;
          }

        .footer{grid-column: 1/9; grid-row: 9/10} 





.left-box-heading{
  display: flex;
  border-radius: 8px;
  background-color: var(--primary-color-left-box);
  font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
  color:  var(--text-color-left-box);
  align-items: center; /* Ensures vertical alignment */
  font-size: 1.5vw;
  padding: 1%;
  padding-top: 2%;
  margin-bottom: 0.35em; 
  gap: 0.25em;
}

.left-box-heading img {
  width: 1.5vw; /* Using em to scale with text */
  margin-bottom: 0.1em;
  margin-left: 0.25em;
}

.left-box-paragraph{
  border-radius: 8px;
  background-color: var(--secondary-color-left-box);
  color: var(--primary-color);
  margin-bottom: 0.35em;
}

.left-box-paragraph p {
  padding: 0.75em;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 350;
  min-height:  16vh;
}

.left-box-action-call{
  display: flex;
  border-radius: 8px;
  font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
  color:  var(--secondary-text-color);
  font-size: 0.8rem;
  background-color: var(--secondary-color-left-box);
  padding: 1.75%;
}


.call-action{
margin-left: 0.5em;
width:90%;
color:  var(--primary-color);
display: flex;
justify-content: space-between; /* or use margin-left: auto on .ok-action */
width: 100%; /* or any fixed width you prefer */
}

.ok-action {
  margin-left: auto;
}


.left-box-action-call:hover  {
  background-color: var(--hover-color-left-box);
}

.left-box-action-call:hover .call-action {
  color: var(--hover-text-color-left-box);
}


/* Other boxes */

.other-box-heading{
  display: flex; 
  border-radius: 8px;
  background-color:  var(--primary-color);
  font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
  color: white;
  align-items: center; /* Ensures vertical alignment */
  font-size: 1.5vw;
  padding: 1%;
  padding-top: 2%;
  margin-bottom: 0.35em; 
  gap: 0.25em;
}


.other-box-heading img {
  width: 1vw; /* Using em to scale with text */
  margin-bottom: 0.1em;
  margin-left: 0.25em;
}

.other-box-subtitle {
  display: flex;
  padding: 0.5em;
  border-radius: 8px;
  background-color: var(--secondary-color);;
  font-family: 'Inter', sans-serif;
  color: var(--primary-color);;
  gap: 0.5vw;
  font-size: 0.5rem;
  font-weight: 350;
  margin-bottom: 0.35em;
}

.other-box-subtitle img {
  width: 1vw;
}

.other-box-photos {
    display: block;  /* Ensures it behaves like a normal div */
    width: 100%;
    min-height: 16vh;
    border-radius: 8px;
    background-color: var(--secondary-color);
    margin-bottom: 0.35em;  
}



.other-box-photos img {
  width: 100%;
}

.other-box-action-call{
  display: flex;
  border-radius: 8px;
  font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
  color:  var(--primary-color);
  font-size: 0.8rem;
  padding: 1.75%;
  background-color: var(--secondary-color);
  align-items: center;
}

.other-box-action-call:hover {
  background-color:  var(--hover-color);
}

.other-call-action{
margin-left: 0.5em;
width:92%;
color: var(--primary-color);
display: flex;
  justify-content: space-between; /* or use margin-left: auto on .ok-action */
  width: 100%; /* or any fixed width you prefer */
}


.other-goto-action {
  font-size: 1.5vw; 
  margin-left: auto;
}


.other-box-action-call:hover .other-call-action{
color:var(--hover-text-color)
}



.other-box-action-call:hover  .other-goto-action{
  color:var(--hover-text-color)
}

/* notification window */
.notification-window {
  display: flex;
  position: fixed; /* Ensures it's positioned relative to the viewport */
  bottom: 0vh; /* Adjust to place it above the footer */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Center alignment */
  background-color: #f9f9f9;
  color:  var(--primary-color);
  border: 2px solid  var(--primary-color);
  border-bottom: none; /* Removes the bottom border */
  border-radius: 60px 60px 0 0; /* Top-left and top-right corners rounded */
  padding: 1rem;
  width: 80%;
  /* max-width: 600px; */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10; /* Ensure it appears above other elements */
  /* text-align: center; */
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
}

.notification-dismiss-button {
  margin-top: 0.5rem;
  background-color:  var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.8rem;
}

.notification-dismiss-button:hover {
  background-color:  var(--primary-color);
}

      /* New Footer Styles */
      .footer {
    background-color: transparent;
    width: 100%;
    height: 15vh;
    overflow: hidden; /* Prevent horizontal overflow */
}

.footer-images {
    display: flex;
    gap: 1rem;
    animation: scroll 30s linear infinite;

    flex-wrap: nowrap; /* Keep images in a single line */
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
        transform: translateX(0%); /* Scroll by 100% of the container width */
    }
}

    </style>

    <template>
      <div class="grid-container">
        <div :class="['background-layer', currentBackgroundLayer]" aria-hidden="true"></div> <!-- New background layer -->
     
        <Topbar />
      

<!-- background image -->
        <div class="background-image" aria-hidden="true"></div>
        <div class="grid-background" aria-hidden="true"></div>
        

        <!-- cards -->
        <div class="left-box">
          <div class="left-box-heading">
            <img v-show="isPinkLeftCardIconVisible" src="/greaterThanBracketsPink.svg" alt="">
            <img v-show="isGrayLeftCardIconVisible" src="/greaterThanBracketsGray.svg" alt="">
            <img v-show="isHighContrastLeftCardIconVisible" src="/sariSariIconWhite.svg" alt="">
            <img v-show="isWCAGLeftCardIconVisible" src="/greaterThanBracketsHighContrast.svg" alt="">
            <h2>Sari-Sari Xchange</h2></div>
          <div class="left-box-paragraph">
            <p>SSX is a community-building research & creation project using Extended Reality (XR) (ie. Virtual,
               Augmented, Mixed Realities) to foster new works by artists from the Asian diaspora. 
               <br><br>
               Sari-Sari Xchange Assetory (SSXA) is a virtual asset library created with and for the Asian diaspora community.</p>
          </div>
        <div class="left-box-action-call">
         <a href="" class="call-action" >
        <span class="learn-more">Learn More</span> <span class="ok-action" aria-hidden="true">OK</span>
    </a>
</div>

        </div>

        
     
        <div class="center-top-box">
          <div class="other-box-heading">
            <img src="/asteriskWhite.svg" alt="">
            <h2>Artists</h2>
          </div>
          <div class="other-box-subtitle">
            <img v-show="isDecoractionCardSubtitlePink" src="/decorationCardSubtitlePink.svg" alt="">
            <img v-show="isDecoractionCardSubtitleGray" src="/decorationCardSubtitleGray.svg" alt="">
            <img v-show="isDecoractionCardSubtitleHighContrast" src="/decorationCardSubtitleHighContrast.svg" alt="">
            <img v-show="isDecoractionCardSubtitleWCAG" src="/decorationCardSubtitleWCAG.svg" alt="">
            <p >Explore community assets created by artists.</p>
            
          </div>
          <div :class="['other-box-photos', currentOtherBoxPhotos]" aria-hidden="true">
          <img v-show="arePinkTopCenterCardSampleImagesVisible" src="/sample-images-artists.png" alt="">
          <img v-show="areGrayTopCenterCardSampleImagesVisible" src="/sample-images-artists-grayscale.png" alt="">
          <img v-show="areHighContrastTopCenterCardSampleImagesVisible" src="/sample-images-artists-highContrast.png" alt="">

            </div>
            
          <div class="other-box-action-call">
            <a href="" class="other-call-action" >
              <span >Open Artists</span> <span class="call-goto-action" aria-hidden="true">></span>
            </a>
          </div>
        </div>


        

        <div class="center-bottom-box">
          <div class="other-box-heading">
            <img src="/eventsIconWhite.svg" alt="">
            <h2>Events</h2>
          </div>
            <div class="other-box-subtitle">
            <img v-show="isDecoractionCardSubtitlePink" src="/decorationCardSubtitlePink.svg" alt="">
            <img v-show="isDecoractionCardSubtitleGray" src="/decorationCardSubtitleGray.svg" alt="">
            <img v-show="isDecoractionCardSubtitleHighContrast" src="/decorationCardSubtitleHighContrast.svg" alt="">
            <img v-show="isDecoractionCardSubtitleWCAG" src="/decorationCardSubtitleWCAG.svg" alt="">
            <p>Assets created during SSX events.</p>
          </div>
          <div :class="['other-box-photos', currentOtherBoxPhotos]">
            <!-- <img src="/sample-images-artists.png"> -->

          
            </div>
          <div class="other-box-action-call">
            <a  href="" :class="['other-call-action', currentOtherBoxCallAction]">
              <span>Open Events</span> <span class="call-goto-action" aria-hidden="true">></span>
            </a>
          </div>
        </div>


        <div class="right-box">
          <div class="other-box-heading">
            <img src="/collectionsIconWhite.svg" alt="">
            <h2>Collections</h2>
          </div>
          <div :class="['other-box-subtitle', currentOtherBoxSubtitle]">
            <img v-show="isDecoractionCardSubtitlePink" src="/decorationCardSubtitlePink.svg" alt="" >
            <img v-show="isDecoractionCardSubtitleGray" src="/decorationCardSubtitleGray.svg" alt="">
            <img v-show="isDecoractionCardSubtitleHighContrast" src="/decorationCardSubtitleHighContrast.svg" alt="">
            <img v-show="isDecoractionCardSubtitleWCAG" src="/decorationCardSubtitleWCAG.svg" alt="">
            <p>Explore collections by SSX.</p>
          </div>
          <div :class="['other-box-photos', currentOtherBoxPhotos]">
            <!-- <img src="/sample-images-artists.png"> -->


            </div>
          <div class="other-box-action-call">
            <router-link :to="{ name: 'Collections' }" :class="['other-call-action', currentOtherBoxCallAction]">
              <span>Open Collections</span> <span class="call-goto-action" aria-hidden="true">></span>
              </router-link>
            </div>
        </div>
    
    
    <!-- Notification Window -->
    <div v-if="isNotificationVisible" class="notification-window">
      <p style="padding-left:0.25rem;padding-right:0.25rem;">
        This website stores accessibility menu settings you select in your browser to enhance your experience. No cookies or tracking are used.
      </p>
      <button @click="dismissNotification" class="notification-dismiss-button">Accept</button>
    </div>

    <!-- footer -->
      <div class="footer">
        <div v-show="areFooterImagesDefaultVisible" class="footer-images">
          <!-- First set of images -->
          <img src="/item1.png" alt="" class="footer-image">
          <img src="/item2.png" alt="" class="footer-image">
          <img src="/item3.png" alt="" class="footer-image">
          <img src="/item4.png" alt="" class="footer-image">
          <img src="/item5.png" alt="" class="footer-image">
          <img src="/item6.png" alt="" class="footer-image">
          <img src="/item7.png" alt="" class="footer-image">
          <img src="/item8.png" alt="" class="footer-image">
          
          <!-- Duplicate set for smooth infinite scroll -->
          <img src="/item1.png" alt="" class="footer-image">
          <img src="/item2.png" alt="" class="footer-image">
          <img src="/item3.png" alt="" class="footer-image">
          <img src="/item4.png" alt="" class="footer-image">
          <img src="/item5.png" alt="" class="footer-image">
          <img src="/item6.png" alt="" class="footer-image">
          <img src="/item7.png" alt="" class="footer-image">
          <img src="/item8.png" alt="" class="footer-image">

           <!-- Duplicate set for smooth infinite scroll -->
           <img src="/item1.png" alt="" class="footer-image">
          <img src="/item2.png" alt="" class="footer-image">
          <img src="/item3.png" alt="" class="footer-image">
          <img src="/item4.png" alt="" class="footer-image">
          <img src="/item5.png" alt="" class="footer-image">
          <img src="/item6.png" alt="" class="footer-image">
          <img src="/item7.png" alt="" class="footer-image">
          <img src="/item8.png" alt="" class="footer-image">

                <!-- Duplicate set for smooth infinite scroll -->
                <img src="/item1.png" alt="" class="footer-image">
          <img src="/item2.png" alt="" class="footer-image">
          <img src="/item3.png" alt="" class="footer-image">
          <img src="/item4.png" alt="" class="footer-image">
          <img src="/item5.png" alt="" class="footer-image">
          <img src="/item6.png" alt="" class="footer-image">
          <img src="/item7.png" alt="" class="footer-image">
          <img src="/item8.png" alt="" class="footer-image">
        </div>


        <div v-show="areFooterImagesGrayscaleVisible" class="footer-images">
        
          <img src="/item1-gray.png" alt="" class="footer-image">
          <img src="/item2-gray.png" alt="" class="footer-image">
          <img src="/item3-gray.png" alt="" class="footer-image">
          <img src="/item4-gray.png" alt="" class="footer-image">
          <img src="/item5-gray.png" alt="" class="footer-image">
          <img src="/item6-gray.png" alt="" class="footer-image">
          <img src="/item7-gray.png" alt="" class="footer-image">
          <img src="/item8-gray.png" alt="" class="footer-image">
    
          <img src="/item1-gray.png" alt="" class="footer-image">
          <img src="/item2-gray.png" alt="" class="footer-image">
          <img src="/item3-gray.png" alt="" class="footer-image">
          <img src="/item4-gray.png" alt="" class="footer-image">
          <img src="/item5-gray.png" alt="" class="footer-image">
          <img src="/item6-gray.png" alt="" class="footer-image">
          <img src="/item7-gray.png" alt="" class="footer-image">
          <img src="/item8-gray.png" alt="" class="footer-image">

          <img src="/item1-gray.png" alt="" class="footer-image">
          <img src="/item2-gray.png" alt="" class="footer-image">
          <img src="/item3-gray.png" alt="" class="footer-image">
          <img src="/item4-gray.png" alt="" class="footer-image">
          <img src="/item5-gray.png" alt="" class="footer-image">
          <img src="/item6-gray.png" alt="" class="footer-image">
          <img src="/item7-gray.png" alt="" class="footer-image">
          <img src="/item8-gray.png" alt="" class="footer-image">

          <img src="/item1-gray.png" alt="" class="footer-image">
          <img src="/item2-gray.png" alt="" class="footer-image">
          <img src="/item3-gray.png" alt="" class="footer-image">
          <img src="/item4-gray.png" alt="" class="footer-image">
          <img src="/item5-gray.png" alt="" class="footer-image">
          <img src="/item6-gray.png" alt="" class="footer-image">
          <img src="/item7-gray.png" alt="" class="footer-image">
          <img src="/item8-gray.png" alt="" class="footer-image">
        </div>

        <div v-show="areFooterImagesHighContrastVisible" class="footer-images">
        
        <img src="/item1-highContrast.png" alt="" class="footer-image">
        <img src="/item2-highContrast.png" alt="" class="footer-image">
        <img src="/item3-highContrast.png" alt="" class="footer-image">
        <img src="/item4-highContrast.png" alt="" class="footer-image">
        <img src="/item5-highContrast.png" alt="" class="footer-image">
        <img src="/item6-highContrast.png" alt="" class="footer-image">
        <img src="/item7-highContrast.png" alt="" class="footer-image">
        <img src="/item8-highContrast.png" alt="" class="footer-image">
  
        <img src="/item1-highContrast.png" alt="" class="footer-image">
        <img src="/item2-highContrast.png" alt="" class="footer-image">
        <img src="/item3-highContrast.png" alt="" class="footer-image">
        <img src="/item4-highContrast.png" alt="" class="footer-image">
        <img src="/item5-highContrast.png" alt="" class="footer-image">
        <img src="/item6-highContrast.png" alt="" class="footer-image">
        <img src="/item7-highContrast.png" alt="" class="footer-image">
        <img src="/item8-highContrast.png" alt="" class="footer-image">

        <img src="/item1-highContrast.png" alt="" class="footer-image">
        <img src="/item2-highContrast.png" alt="" class="footer-image">
        <img src="/item3-highContrast.png" alt="" class="footer-image">
        <img src="/item4-highContrast.png" alt="" class="footer-image">
        <img src="/item5-highContrast.png" alt="" class="footer-image">
        <img src="/item6-highContrast.png" alt="" class="footer-image">
        <img src="/item7-highContrast.png" alt="" class="footer-image">
        <img src="/item8-highContrast.png" alt="" class="footer-image">
         
        <img src="/item1-highContrast.png" alt="" class="footer-image">
        <img src="/item2-highContrast.png" alt="" class="footer-image">
        <img src="/item3-highContrast.png" alt="" class="footer-image">
        <img src="/item4-highContrast.png" alt="" class="footer-image">
        <img src="/item5-highContrast.png" alt="" class="footer-image">
        <img src="/item6-highContrast.png" alt="" class="footer-image">
        <img src="/item7-highContrast.png" alt="" class="footer-image">
        <img src="/item8-highContrast.png" alt="" class="footer-image">
      </div>


      <div v-show="areFooterImagesWCAGcolorsVisible" class="footer-images">
        
        <img src="/item1-wcag.png" alt="" class="footer-image">
        <img src="/item2-wcag.png" alt="" class="footer-image">
        <img src="/item3-wcag.png" alt="" class="footer-image">
        <img src="/item4-wcag.png" alt="" class="footer-image">
        <img src="/item5-wcag.png" alt="" class="footer-image">
        <img src="/item6-wcag.png" alt="" class="footer-image">
        <img src="/item7-wcag.png" alt="" class="footer-image">
        <img src="/item8-wcag.png" alt="" class="footer-image">
  
        <img src="/item1-wcag.png" alt="" class="footer-image">
        <img src="/item2-wcag.png" alt="" class="footer-image">
        <img src="/item3-wcag.png" alt="" class="footer-image">
        <img src="/item4-wcag.png" alt="" class="footer-image">
        <img src="/item5-wcag.png" alt="" class="footer-image">
        <img src="/item6-wcag.png" alt="" class="footer-image">
        <img src="/item7-wcag.png" alt="" class="footer-image">
        <img src="/item8-wcag.png" alt="" class="footer-image">

        <img src="/item1-wcag.png" alt="" class="footer-image">
        <img src="/item2-wcag.png" alt="" class="footer-image">
        <img src="/item3-wcag.png" alt="" class="footer-image">
        <img src="/item4-wcag.png" alt="" class="footer-image">
        <img src="/item5-wcag.png" alt="" class="footer-image">
        <img src="/item6-wcag.png" alt="" class="footer-image">
        <img src="/item7-wcag.png" alt="" class="footer-image">
        <img src="/item8-wcag.png" alt="" class="footer-image">
         
        <img src="/item1-wcag.png" alt="" class="footer-image">
        <img src="/item2-wcag.png" alt="" class="footer-image">
        <img src="/item3-wcag.png" alt="" class="footer-image">
        <img src="/item4-wcag.png" alt="" class="footer-image">
        <img src="/item5-wcag.png" alt="" class="footer-image">
        <img src="/item6-wcag.png" alt="" class="footer-image">
        <img src="/item7-wcag.png" alt="" class="footer-image">
        <img src="/item8-wcag.png" alt="" class="footer-image">
      </div>

      </div>
    </div>
</template>