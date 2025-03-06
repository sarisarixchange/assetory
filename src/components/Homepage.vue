<script>
 export default {
    data() {
        return {
            zoomLevel: 1, // Initial zoom level
            isMenuVisible: false,
            fontSize: 1, // Default scale (1 = 100%)
            currentHeaderColorPalette: 'headerDefaultColorPalette',
            currentLogoColorPalette: 'logoDefaultColorPalette',
            currentMarqueeColorPalette: 'marqueeItem',
            currentNavButtonColorPalette: 'navButtonDefaultColorPalette',
            currentNavAccessibiltyButtonColorPalette: 'navAccessibilityButtonDefaultColorPalette',
            currentaccessibilityButtonDivColorPalette: 'accessibilityButtonDivDefaultColorPalette',
            currentaccessiblityToolsHeadingColorPalette: 'accessiblityToolsHeadingDefaultColorPalette', 
            currentIncreaseTextIcon: 'increaseTextIcon', 
            currentDecreaseTextIcon: 'decreaseTextIcon', 
            currentGrayScaleIcon: 'grayscaleIcon', 
            currentHighContrastIcon: 'highContrastIcon', 
            currentLinksUnderlineIcon: 'linksUnderlineIcon', 
            currentReadableFontIcon: 'readableFontIcon', 
            currentWcagColoursIcon: 'wcagColoursIcon', 
            currentResetIcon: 'resetIcon', 
            // leftbox
            isPinkLeftCardIconVisible: true,
            isGrayLeftCardIconVisible: false,
            isHighContrastLeftCardIconVisible: false,
            isWCAGLeftCardIconVisible: false,
            currentLeftBox: 'left-box',
            currentLeftBoxHeading: 'left-box-heading', 
            currentLeftBoxParagraph: 'left-box-paragraph',
            currentLeftBoxActionCall: 'left-box-action-call',
            currentLeftBoxCallAction: 'call-action', 
            currentLeftBoxGotoAction: 'goto-action',
            // center-top-box

            arePinkTopCenterCardSampleImagesVisible: true,
            areGrayTopCenterCardSampleImagesVisible: false,
            areHighContrastTopCenterCardSampleImagesVisible: false,

            // other boxes
            currentOtherBox: 'other-box',
            currentOtherBoxHeading: 'other-box-heading', 
            currentOtherBoxSubtitle: 'other-box-subtitle',
            isDecoractionCardSubtitlePink: true,
            isDecoractionCardSubtitleGray: false,
            isDecoractionCardSubtitleHighContrast:false,
            isDecoractionCardSubtitleWCAG: false,
            currentOtherBoxPhotos: 'other-box-photos', 
            currentOtherBoxActionCall: 'other-box-action-call',
            currentOtherBoxCallAction: 'other-call-action', 
            currentOtherBoxGotoAction: 'other-goto-action',

            // links decoration

            isUnderlined: false,

            // readable font

            isReadableFont: false,

          // footer images
          areFooterImagesDefaultVisible: true,
          areFooterImagesGrayscaleVisible: false, 
          areFooterImagesHighContrastVisible: false,
          areFooterImagesWCAGcolorsVisible: false,         

          //  background image
          currentBackgroundLayer: 'background-layer'
                
    } 
  },

    methods: {

        accessibilityMenuVisibility(){
            this.isMenuVisible =! this.isMenuVisible
            console.log("test")

        }, 

        increaseZoom() {
            if (this.zoomLevel < 2) { // Prevent excessive zoom
                this.zoomLevel += 0.1;
                document.body.style.zoom = this.zoomLevel;
            }
        },

        decreaseZoom() {
            if (this.zoomLevel > 0.5) { // Prevent too much shrinking
                this.zoomLevel -= 0.1;
                document.body.style.zoom = this.zoomLevel;
            }
          }, 

        resetZoom() {
        this.zoomLevel = 1;
        document.body.style.zoom = "1"; // Reset zoom to default
        },
        
        increaseTextSize() {
            if (this.fontSize < 2) { // Prevents excessive scaling
                this.fontSize += 0.1;
                document.body.style.fontSize = `${this.fontSize}em`; // Apply scaling
            }
        },

        decreaseTextSize() {
            if (this.fontSize > 0.5) { // Prevents text from being too small
                this.fontSize -= 0.1;
                document.body.style.fontSize = `${this.fontSize}em`;
            }
          },

          reset() {
            this.fontSize = 1;
            document.body.style.fontSize = ""; // Resets to default

            this.currentHeaderColorPalette = 'headerDefaultColorPalette'
            this.currentLogoColorPalette = 'logoDefaultColorPalette'
            this.currentNavButtonColorPalette =  'navButtonDefaultColorPalette'
            this.currentMarqueeColorPalette= 'marqueeItem'
            this.currentNavAccessibiltyButtonColorPalette = 'navAccessibilityButtonDefaultColorPalette'
            this.currentaccessibilityButtonDivColorPalette = 'accessibilityButtonDivDefaultColorPalette'
            this.currentaccessiblityToolsHeadingColorPalette = 'accessiblityToolsHeadingDefaultColorPalette'
            this.currentIncreaseTextIcon = 'increaseTextIcon'
            this.currentDecreaseTextIcon = 'decreaseTextIcon'
            this.currentGrayScaleIcon = 'grayscaleIcon'
            this.currentHighContrastIcon = 'highContrastIcon' 
            this.currentLinksUnderlineIcon = 'linksUnderlineIcon'
            this.currentReadableFontIcon = 'readableFontIcon' 
            this.currentWcagColoursIcon = 'wcagColoursIcon'
            this.currentResetIcon = 'resetIcon'
            // leftbox
            this.isPinkLeftCardIconVisible = true
            this.isGrayLeftCardIconVisible = false
            this.isHighContrastLeftCardIconVisible= false
            this.isWCAGLeftCardIconVisible = false

            this.currentLeftBox = 'left-box'
            this.currentLeftBoxHeading = 'left-box-heading' 
            this.currentLeftBoxParagraph = 'left-box-paragraph'
            this.currentLeftBoxActionCall = 'left-box-action-call', 
            this.currentLeftBoxCallAction= 'call-action', 
            this.currentLeftBoxGotoAction= 'goto-action',

            // top center box
            this.arePinkTopCenterCardSampleImagesVisible= true
            this.areGrayTopCenterCardSampleImagesVisible= false
            this.areHighContrastTopCenterCardSampleImagesVisible = false

            // other boxes
            this.currentOtherBox= 'other-box'
           this.currentOtherBoxHeading= 'other-box-heading'
           this.currentOtherBoxSubtitle= 'other-box-subtitle'

           this.isDecoractionCardSubtitlePink= true
           this.isDecoractionCardSubtitleGray= false
           this.isDecoractionCardSubtitleHighContrast=false
           this.isDecoractionCardSubtitleWCAG= false

           this.currentOtherBoxPhotos= 'other-box-photos'
           this.currentOtherBoxActionCall= 'other-box-action-call'
           this.currentOtherBoxCallAction= 'other-call-action', 
           this.currentOtherBoxGotoAction= 'other-goto-action',
          //  reset links underline

          
            this.isUnderlined = false;
            document.documentElement.style.setProperty("--link-decoration", "none");


            this.isReadableFont = false;
            document.documentElement.style.setProperty("--font-family", "'Lakonet', sans-serif");
            document.documentElement.style.setProperty("--marquee-item-gap", "1.5vw");


            // reset footer images
           this.areFooterImagesDefaultVisible= true;
           this.areFooterImagesGrayscaleVisible= false;
           this.areFooterImagesHighContrastVisible= false;
           this.areFooterImagesWCAGcolorsVisible= false

              // background image
            this.currentBackgroundLayer= 'background-layer'
          
        }, 



        changeTograyscale(){
          this.currentNavButtonColorPalette = "navButtonGrayscale"
          this.currentNavAccessibiltyButtonColorPalette = "navAccessibilityButtonGrayscaleColorPalette"
          this.currentHeaderColorPalette = "headerGrayscaleColorPalette"
          this.currentLogoColorPalette = "logoGrayscaleColorPalette"
          this.currentMarqueeColorPalette= 'marqueeItemGrayscale',

          this.currentaccessibilityButtonDivColorPalette = 'accessibilityButtonDivGrayscaleColorPalette'
          this.currentaccessiblityToolsHeadingColorPalette = 'accessiblityToolsHeadingGrayscaleColorPalette'
          // acc menu icons
          this.currentIncreaseTextIcon = 'increaseTextIconGray'
          this.currentDecreaseTextIcon = 'decreaseTextIconGray'
          this.currentGrayScaleIcon = 'grayscaleIconGray'
          this.currentHighContrastIcon = 'highContrastIconGray'
          this.currentLinksUnderlineIcon = 'linksUnderlineIconGray'
          this.currentReadableFontIcon = 'readableFontIconGray'
          this.currentWcagColoursIcon = 'wcagColoursIconGray'
          this.currentResetIcon = 'resetIconGray'    
            
            // left box
            this.isPinkLeftCardIconVisible = false
            this.isGrayLeftCardIconVisible = true
            this.isHighContrastLeftCardIconVisible= false
            this.isWCAGLeftCardIconVisible= false

            this.currentLeftBox = 'left-box-grayscale'
            this.currentLeftBoxHeading = 'left-box-heading-grayscale'
            this.currentLeftBoxParagraph = 'left-box-paragraph-grayscale'
            this.currentLeftBoxActionCall = 'left-box-action-call-grayscale' 
            this.currentLeftBoxCallAction= 'call-action-grayscale', 
            this.currentLeftBoxGotoAction= 'goto-action-grayscale',

            
            // center top box
            this.arePinkTopCenterCardSampleImagesVisible= false
            this.areGrayTopCenterCardSampleImagesVisible= true
            this.areHighContrastTopCenterCardSampleImagesVisible = false
            // other-boxes
            this.currentOtherBox= 'other-box-grayscale'
            this.currentOtherBoxHeading = 'other-box-heading-grayscale'
            this.currentOtherBoxSubtitle = 'other-box-subtitle-grayscale'

            this.isDecoractionCardSubtitlePink= false
           this.isDecoractionCardSubtitleGray= true
           this.isDecoractionCardSubtitleHighContrast=false
           this.isDecoractionCardSubtitleWCAG= false

            this.currentOtherBoxPhotos= 'other-box-photos-grayscale'
            this.currentOtherBoxActionCall = 'other-box-action-call-grayscale', 
            this.currentOtherBoxCallAction= 'other-call-action-grayscale', 
            this.currentOtherBoxGotoAction= 'other-goto-action-grayscale'

            // footer images

            this.areFooterImagesDefaultVisible= false
            this.areFooterImagesGrayscaleVisible= true
            this.areFooterImagesHighContrastVisible= false
            this.areFooterImagesWCAGcolorsVisible= false     

            // background image
            this.currentBackgroundLayer= 'background-layer-grayscale'
        }, 

        changeToHighContrast(){
          this.currentNavButtonColorPalette = "navButtonHighContrast"
          this.currentNavAccessibiltyButtonColorPalette = "navAccessibilityButtonHighContrastColorPalette"
          this.currentHeaderColorPalette = "headerHighContrastColorPalette"
          this.currentLogoColorPalette = "logoHighContrastColorPalette"
          this.currentMarqueeColorPalette = 'marqueeItemHighContrast'

          this.currentaccessibilityButtonDivColorPalette = 'accessibilityButtonDivHighContrastColorPalette'
          this.currentaccessiblityToolsHeadingColorPalette = 'accessiblityToolsHeadingHighContrastColorPalette'
          // acc menu icons
          this.currentIncreaseTextIcon = 'increaseTextIconHighContrast'
          this.currentDecreaseTextIcon = 'decreaseTextIconHighContrast'
          this.currentGrayScaleIcon = 'grayscaleIconHighContrast'
          this.currentHighContrastIcon = 'highContrastIconHighContrast'
          this.currentLinksUnderlineIcon = 'linksUnderlineIconHighContrast'
          this.currentReadableFontIcon = 'readableFontIconHighContrast'
          this.currentWcagColoursIcon = 'wcagColoursIconHighContrast'
          this.currentResetIcon = 'resetIconHighContrast'    
            
            // left box
            this.isPinkLeftCardIconVisible = false
            this.isGrayLeftCardIconVisible = false
            this.isHighContrastLeftCardIconVisible = true
            this.isWCAGLeftCardIconVisible = false


            this.currentLeftBox = 'left-box-highContrast'
            this.currentLeftBoxHeading = 'left-box-heading-highContrast'
            this.currentLeftBoxParagraph = 'left-box-paragraph-highContrast'
            this.currentLeftBoxActionCall = 'left-box-action-call-highContrast', 
            this.currentLeftBoxCallAction= 'call-action-highContrast', 
            this.currentLeftBoxGotoAction= 'goto-action-highContrast',
            
            // center top box
            this.arePinkTopCenterCardSampleImagesVisible= false
            this.areGrayTopCenterCardSampleImagesVisible= false
            this.areHighContrastTopCenterCardSampleImagesVisible = true
            // other-boxes
            this.currentOtherBox= 'other-box-highContrast'
            this.currentOtherBoxHeading = 'other-box-heading-highContrast'
            this.currentOtherBoxSubtitle = 'other-box-subtitle-highContrast'

            this.isDecoractionCardSubtitlePink= false
           this.isDecoractionCardSubtitleGray= false
           this.isDecoractionCardSubtitleHighContrast=true
           this.isDecoractionCardSubtitleWCAG= false


            this.currentOtherBoxPhotos= 'other-box-photos-highContrast'
            this.currentOtherBoxActionCall = 'other-box-action-call-highContrast', 
            this.currentOtherBoxCallAction= 'other-call-action-highContrast', 
            this.currentOtherBoxGotoAction= 'other-goto-action-highContrast'
            // footer images

            this.areFooterImagesDefaultVisible=false
            this.areFooterImagesGrayscaleVisible= false     
            this.areFooterImagesHighContrastVisible= true
            this.areFooterImagesWCAGcolorsVisible= false


            // background image
            this.currentBackgroundLayer= 'background-layer-highContrast'
        }, 

        changeToWCAGcolors(){
          this.currentNavButtonColorPalette = "navButtonWCAGcolorPalette"
          this.currentNavAccessibiltyButtonColorPalette = "navAccessibilityButtonWCAGcolorPalette"
          this.currentHeaderColorPalette = "headerWCAGcolorPalette"
          this.currentLogoColorPalette = "logoWCAGcolors"
          this.currentMarqueeColorPalette= 'marqueeItemWCAGcolors'

          this.currentaccessibilityButtonDivColorPalette = 'accessibilityButtonDivWCAGcolorPalette'
          this.currentaccessiblityToolsHeadingColorPalette = 'accessiblityToolsHeadingWCAGcolorPalette'
          // acc menu icons
          this.currentIncreaseTextIcon = 'increaseTextIconWCAG'
          this.currentDecreaseTextIcon = 'decreaseTextIconWCAG'
          this.currentGrayScaleIcon = 'grayscaleIconWCAG'
          this.currentHighContrastIcon = 'highContrastIconWCAG'
          this.currentLinksUnderlineIcon = 'linksUnderlineIconWCAG'
          this.currentReadableFontIcon = 'readableFontIconWCAG'
          this.currentWcagColoursIcon = 'wcagColoursIconWCAG' 
          this.currentResetIcon = 'resetIconWCAG'    
            
            // left box
            this.isPinkLeftCardIconVisible = false
            this.isGrayLeftCardIconVisible = false
            this.isHighContrastLeftCardIconVisible = false
            this.isWCAGLeftCardIconVisible= true

            this.currentLeftBox = 'left-box-WCAGcolors'
            this.currentLeftBoxHeading = 'left-box-heading-WCAGcolors'
            this.currentLeftBoxParagraph = 'left-box-paragraph-WCAGcolors'
            this.currentLeftBoxActionCall = 'left-box-action-call-WCAGcolors', 
            this.currentLeftBoxCallAction= 'call-action-WCAGcolors', 
            this.currentLeftBoxGotoAction= 'goto-action-WCAGcolors',
            
            // center top box
            this.arePinkTopCenterCardSampleImagesVisible= false
            this.areGrayTopCenterCardSampleImagesVisible= false
            this.areHighContrastTopCenterCardSampleImagesVisible = true

            // other-boxes
            this.currentOtherBox= 'other-box-WCAGcolors'
            this.currentOtherBoxHeading = 'other-box-heading-WCAGcolors'
            this.currentOtherBoxSubtitle = 'other-box-subtitle-WCAGcolors'

            this.isDecoractionCardSubtitlePink= false
           this.isDecoractionCardSubtitleGray= false
           this.isDecoractionCardSubtitleHighContrast=false
           this.isDecoractionCardSubtitleWCAG= true


            this.currentOtherBoxPhotos= 'other-box-photos-WCAGcolors'
            this.currentOtherBoxActionCall = 'other-box-action-call-WCAGcolors', 
            this.currentOtherBoxCallAction= 'other-call-action-WCAGcolors', 
            this.currentOtherBoxGotoAction= 'other-goto-action-WCAGcolors'

            // footer images
            this.areFooterImagesDefaultVisible = false
            this.areFooterImagesGrayscaleVisible = false   
            this.areFooterImagesHighContrastVisible = false
            this.areFooterImagesWCAGcolorsVisible = true  


            // background image
            this.currentBackgroundLayer= 'background-layer'

        },

        activateLinksUnderline() {
            this.isUnderlined = true;
            document.documentElement.style.setProperty("--link-decoration","underline");
    }, 

        activateReadableFont(){
            this.isReadableFont = true;
            document.documentElement.style.setProperty("--font-family", "'Inter', sans-serif");
            document.documentElement.style.setProperty("--marquee-item-gap", "12vw");

    }

    }, 

}

</script>
    
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      @font-face {
        font-family: 'Lakonet';
        src: url('/fonts/Lakonet.otf') format('opentype');
        font-weight: normal;
        font-style: normal;
        }

      body {
            /* display: flex; */
            /* justify-content: center; */
            /* align-items: center; */
            height: 100vh;
            margin: 0;
            background-color: #f9f9f9;
        }

      body {
        font-family: 'Inter', sans-serif;
        background: white;
        /* padding: 1em;  */
      }

      /* Header styles from previous implementation */
      .header {
        margin-top: 0.25em;
        margin-left: 0.25em;
        margin-right: 0.25em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* padding: 0.5rsem 0.5rem; */
        border-bottom: 1px solid #eee;
        background-color: transparent;
        border: solid 1px #D400A6;
        border-radius: 17px;
      }

      .logo-section {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .logo {
        width: 2.7vw;
        height: 2.7vw;
        background-image: url('/logo.svg'); 
        background-size: contain;
        background-repeat: no-repeat;    
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.5em;
      }
    
    .marquee {
        overflow: hidden;
        width: 65%;
        display: flex;
        white-space: nowrap;
        cursor: default;
        gap: var(--marquee-item-gap, 1.5vw);
        }

      .marqueeItem { 
        font-family: var(--font-family, 'Lakonet'), sans-serif; 
        font-size: 1.25vw;
        color:#D400A6;
        display: flex;
        align-items: center;
        min-width: 100%; /* Ensures each item takes the full width */
        animation: marquee-scroll 30s linear infinite;
        /* margin-right: var(--marquee-item-margin-right); */
      }

        @keyframes marquee-scroll {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }


      .nav-buttons {
        display: flex;
        gap: 1rem;
        padding: 0.5%;          
      }

      .nav-button {
        text-align: center;  
        padding: 0.5rem 1rem;
        border: 1px solid #D400A6;
        background: none;
        color: #D400A6;
        border-radius: 20px;
        font-size: 0.65em;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      a {
       text-decoration: var(--link-decoration, none); /* Default: No underline */
      }


      .nav-button:hover {
        color: white;
        background-color: #D400A6;
      }

  
    
  .nav-buttonAccessibilityIcon {
    color: #D400A6;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    width: 5%;  
    height: auto;
    background-image: url('/person.svg'); 
    background-size: contain;
    background-repeat: no-repeat;    
    background-position: center;
    background-color: white;
    border: 1px solid #D400A6;
    transition: background-color 0.2s;
    cursor: pointer;
}
      
    .nav-buttonAccessibilityIcon:hover {
    background-image: url('/personIconWhite.svg'); 
    background-size: contain;
    background-repeat: no-repeat;    
    background-position: center;
    background-color: #D400A6;
      }

.accessibility-menu {
        cursor: pointer;
        z-index: 5;
        width: 15vw;
        /* background-color: red; */
        margin-left: 7.5em;

      }

     
      /* Ensure content boxes appear above background */
      .left-box, .right-box, .center-top-box, .center-bottom-box {
        z-index: 3; /* Place content above grid and background */
        margin: 1em;
        cursor: default;
        box-shadow: 
        -6px 6px 0 #F1AFDD,  /* Thick left border */
        0 6px 1px #F1AFDD;   /* Thick bottom border */
      }

    
      .cardTitles {
        font-weight: bold;
      }

      .left-box {
        padding: 1.8%;
        border-radius: 12px;
        border: 1px solid #D400A6;
     
      }



      .right-box {
        padding: 1.8%;
        /* width: 80%; */
        border-radius: 12px;
        border: 1px solid #D400A6;
        
      }

      .center-top-box {
        padding: 1.8%;
        /* width: 80%; */
        border-radius: 12px;
        border: 1px solid #D400A6;
      }

      .center-bottom-box {
        padding: 1.8%;
        /* width: 80%; */
        border-radius: 12px;
        border: 1px solid #D400A6;
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




 
  .dropbtn {
  background-color: #3498DB;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/* Dropdown button on hover & focus */
.dropbtn:hover, .dropbtn:focus {
  background-color: #2980B9;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}



/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  padding: 1em;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  right: 0.5vw;
  top: 7vh;
  width: 20vw;
  /* height: 10vh; */
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 4;
  cursor:pointer;
}

.accessiblityToolsHeading {
        padding: 1em;
        border-radius: 10px;
        margin-bottom: 0.25em;
        /* background-color: #D400A6; */
        color: white;
        font-size: 0.75em;
        font-family: var(--font-family, 'Lakonet'), sans-serif; /* Uses Lakonet by default */
        /* font-family: Doto; */
        /* font-weight: 900; */
        text-align: center;
        cursor: default;
      }

/* Links inside the dropdown */
.dropdown-content p {
  border-radius: 5px;
  margin-bottom: 0.125em;
  /* color: #D400A6; */
  font-family: 'Inter', sans-serif;
  padding: 0.4em;
  text-decoration: none;
  text-align: left;
  display: block;
  font-size: 0.75em;

}

.accessibilityButtonDiv {
  display: flex;
  /* background-image: url("/accessibilityUnionNonHover.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center; */
  background-color: #FFEDF4;  
}


.accessibilityButtonDiv:hover {
  /* background-image: url("/accessibilityUnionHover.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center; */
  background-color: #D400A6;
}

/* .accessibilityButtonDiv:hover p{
  color: white;
} */

.increaseTextIcon{
  width: 1em;
  background-image: url("/IncreaseTextIcon.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.increaseTextIconGray{
  width: 1em;
  background-image: url("/IncreaseTextIconGray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}


.increaseTextIconHighContrast{
  width: 1em;
  background-image: url("/IncreaseTextIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.increaseTextIconWCAG{
  width: 1em;
  background-image: url("/IncreaseTextIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.decreaseTextIcon{
  width: 1em;
  background-image: url("/decreaseTextIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.decreaseTextIconGray{
  width: 1em;
  background-image: url("/decreaseTextIconGray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}


.decreaseTextIconHighContrast{
  width: 1em;
  background-image: url("/decreaseTextIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}


.decreaseTextIconWCAG{
  width: 1em;
  background-image: url("/decreaseTextIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.grayscaleIcon {  
  width: 1em;
  background-image: url("/grayscaleIconPink.svg");
  /* background-image: url("/decreaseTextIconGray.svg"); */
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.grayscaleIconGray{
  width: 1em;
  background-image: url("/grayscaleIconGray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.grayscaleIconHighContrast{
  width: 1em;
  background-image: url("/grayscaleIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.grayscaleIconWCAG{
  width: 1em;
  background-image: url("/grayscaleIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}


.highContrastIcon{
  width: 1em;
  background-image: url("/highContrastIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.highContrastIconGray{
  width: 1em;
  background-image: url("/highContrastIconGray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.highContrastIconHighContrast{
  width: 1em;
  background-image: url("/highContrastIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}


.highContrastIconWCAG{
  width: 1em;
  background-image: url("/highContrastIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}


.linksUnderlineIcon{
  width: 1em;
  background-image: url("/linksUnderlineIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.linksUnderlineIconGray{
  width: 1em;
  background-image: url("/linksUnderlineIconGray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.linksUnderlineIconHighContrast{
  width: 1em;
  background-image: url("/linksUnderlineIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.linksUnderlineIconWCAG{
  width: 1em;
  background-image: url("/linksUnderlineIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.readableFontIcon {
  width: 1em;
  background-image: url("/readableFontIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.readableFontIconGray {
  width: 1em;
  background-image: url("/readableFontIconGray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.readableFontIconHighContrast {
  width: 1em;
  background-image: url("/readableFontIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.readableFontIconWCAG {
  width: 1em;
  background-image: url("/readableFontIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.wcagColoursIcon {
  width: 1em;
  background-image: url("/wcagColorsIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.wcagColoursIconGray {
  width: 1em;
  background-image: url("/wcagColorsIconGray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.wcagColoursIconHighContrast {
  width: 1em;
  background-image: url("/wcagColorsIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.wcagColoursIconWCAG {
  width: 1em;
  background-image: url("/wcagColorsIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.resetIcon {
  width: 1em;
  background-image: url("/resetIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}


.resetIconGray {
  width: 1em;
  background-image: url("/resetIconGray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.resetIconHighContrast {
  width: 1em;
  background-image: url("/resetIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.resetIconWCAG {
  width: 1em;
  background-image: url("/resetIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.accessibilityButtonDiv:hover .increaseTextIcon, .accessibilityButtonDiv:hover .increaseTextIconWCAG{
  background-image: url("/IncreaseTextIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.accessibilityButtonDiv:hover .decreaseTextIcon, .accessibilityButtonDiv:hover .decreaseTextIconGray,  .accessibilityButtonDiv:hover .decreaseTextIconWCAG{
  background-image: url("/decreaseTextIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.accessibilityButtonDiv:hover .grayscaleIcon, .accessibilityButtonDiv:hover .grayscaleIconGray, .accessibilityButtonDiv:hover .grayscaleIconWCAG{
  background-image: url("/grayscaleIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.accessibilityButtonDiv:hover .highContrastIcon, .accessibilityButtonDiv:hover .highContrastIconGray, .accessibilityButtonDiv:hover .highContrastIconWCAG{
  background-image: url("/highContrastIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.accessibilityButtonDiv:hover .linksUnderlineIcon, .accessibilityButtonDiv:hover .linksUnderlineIconGray, .accessibilityButtonDiv:hover .linksUnderlineIconWCAG{
  background-image: url("/linksUnderlineIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.accessibilityButtonDiv:hover .readableFontIcon, .accessibilityButtonDiv:hover .readableFontIconGray, .accessibilityButtonDiv:hover .readableFontIconWCAG{
  background-image: url("/readableFontIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.accessibilityButtonDiv:hover .wcagColoursIcon, .accessibilityButtonDiv:hover .wcagColoursIconGray, .accessibilityButtonDiv:hover .wcagColoursIconWCAG{
  background-image: url("/wcagColorsIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.accessibilityButtonDiv:hover .resetIcon, .accessibilityButtonDiv:hover .resetIconGray, .accessibilityButtonDiv:hover .resetIconWCAG{
  background-image: url("/resetIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

/* Change color of dropdown links on hover */
.dropdown-content p {
  flex-grow: 1;
}

.left-box-heading{
  display: flex;
  border-radius: 8px;
  background-color: #E7EB17;
  font-family: var(--font-family, 'Lakonet'), sans-serif; /* Uses Lakonet by default */
  color: #D400A6;
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
  background-color: #FCFCCE;
  color: #D400A6;  
  margin-bottom: 0.35em;
}

.left-box-paragraph p {
  padding: 0.75em;
  font-family: 'Inter', sans-serif;
  font-size: 0.7em;
  font-weight: 350;
  min-height:  16vh;
}

.left-box-action-call{
  display: flex;
  border-radius: 8px;
  font-family: var(--font-family, 'Lakonet'), sans-serif; /* Uses Lakonet by default */
  color: #D400A6;
  font-size: 0.8em;
  background-color: #FCFCCE;
  font-size: 1vw;
  padding: 1.75%;
}



.left-box-action-call:hover {
  /* background-image: url("/learnMoreUnionYellow.svg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center; */
  background-color: #E7EB17;
}

.call-action{
margin-left: 0.5em;
width:90%;
color: #D400A6;
}

.goto-action {
  color: #D400A6;
}



/* Other boxes */

.other-box-heading{
  display: flex; 
  border-radius: 8px;
  background-color: #D400A6;
  font-family: var(--font-family, 'Lakonet'), sans-serif; /* Uses Lakonet by default */
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
  background-color: #FFEDF4;
  font-family: 'Inter', sans-serif;
  color:#D400A6;
  gap: 0.5vw;
  font-size: 0.80vw;
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
    background-color: #FFEDF4;
    margin-bottom: 0.35em;
    
    
}



.other-box-photos img {
  width: 100%;
}

.other-box-action-call{
  display: flex;
  border-radius: 8px;
  font-family: var(--font-family, 'Lakonet'), sans-serif; /* Uses Lakonet by default */
  color: #D400A6;
  font-size: 1vw;
  padding: 0.5%;
  background-color: #FFEDF4;
  align-items: center;
}

.other-box-action-call:hover {
  background-color: #D400A6;
}

.other-call-action{
margin-left: 0.5em;

width:92%;
color:#D400A6
}

.other-box-action-call:hover .other-call-action{
color:white
}

.other-goto-action{
 font-size: 1.5vw; 
 color:#D400A6
}

.other-box-action-call:hover  .other-goto-action{
  color:white
}

      /* New Footer Styles */
      .footer {
        background-color: transparent;
        width: 100%;    
      }

      .footer-images {
        display: flex;
        gap: 1rem;
        animation: scroll 20s linear infinite;
      }

      .footer-image {
        /* height: 50%; */
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
        }
      
      }

      /* default Color palette */

    .headerDefaultColorPalette {
      border-color: #D400A6;
    }

    .logo {
        background-image: url('/logo.svg'); 
        background-size: contain;
        background-repeat: no-repeat;    
      }

    

      .navButtonDefaultColorPalette {
        color: #D400A6;
        border-color: #D400A6;
      }

      .navButtonDefaultColorPalette:hover {
        background-color: #D400A6
      }

      .navAccessibilityButtonDefaultColorPalette {
        border-color: #D400A6;
      background-image: url('/person.svg'); 
      background-size: contain;
      background-repeat: no-repeat;    
      background-position: center;
      }

    .navAccessibilityButtonDefaultColorPalette:hover {
      background-image: url('/personIconWhite.svg'); 
      background-size: contain;
      background-repeat: no-repeat;    
      background-position: center;
    }


    .accessibilityButtonDivDefaultColorPalette  {
        background-color: #FFEDF4 ;
        color: #D400A6;
      }

      .accessibilityButtonDivDefaultColorPalette:hover  {
        background-color: #D400A6;
        color: white;
      }

      .accessiblityToolsHeadingDefaultColorPalette {
        background-color: #D400A6;
        color: white;
      }

      /* default left card colors */
      .left-box-heading{
      background-color: #E7EB17;
      color: #D400A6;
      }



.left-box-paragraph{
  background-color: #FCFCCE;
  color: #D400A6;  

}

/* .left-box-paragraph p {
  
} */

.left-box-action-call{
  color: #D400A6;
  background-color: #FCFCCE;

}

.left-box-action-call:hover {
  background-color: #E7EB17;
}

.marqueeItem {
  color: #D400A6;
}


    /* grayscale */

    .headerGrayscaleColorPalette {
      border-color: #525252;
    }

    .logoGrayscaleColorPalette {
        background-image: url('/logoGray.svg'); 
        background-size: contain;
        background-repeat: no-repeat;    
      }

      .navButtonGrayscale {
        border-color: #525252;
        color: #3E3E3E;
      }
     
      .navButtonGrayscale:hover{
      background-color: #525252
      }
      

      .navAccessibilityButtonGrayscaleColorPalette {
      border-color: #525252;
      background-image: url('/personGray.svg'); 
      background-size: contain;
      background-repeat: no-repeat;    
      background-position: center;
      }

    .navAccessibilityButtonGrayscaleColorPalette:hover {
      background-color: #525252;
      background-image: url('/personIconWhite.svg'); 
      background-size: contain;
      background-repeat: no-repeat;    
      background-position: center;
    }

.accessibilityButtonDivGrayscaleColorPalette {
        background-color: #F3F3F3;
        color: #525252;
      }

.accessibilityButtonDivGrayscaleColorPalette:hover {
        background-color: #525252;
        color: white;
      }

  .accessiblityToolsHeadingGrayscaleColorPalette{
        background-color: #525252;
        color: white;

      }

  /* grayscale left card colors */

.left-box-grayscale {
    border-color: #D2D2D2;
    box-shadow: 
        -6px 6px 0 #C8C8C8,  /* Thick left border */
        0 6px 1px #C8C8C8;   /* Thick bottom border */
      
  }

  .left-box-heading-grayscale{
background-color: #D2D2D2;
color: #525252;
}



.left-box-paragraph-grayscale{
  background-color: #F3F3F3;
  color: #525252;  
  border-color: #525252;
  

}

/* .left-box-paragraph p {
  
} */

.left-box-action-call-grayscale{
  color: #525252;
  background-color: #F3F3F3;

}

.left-box-action-call-grayscale:hover {
  background-color: #D2D2D2;
}

.call-action-grayscale, .goto-action-grayscale{
  color: #525252;
}


/* other-box-grayscale */

.other-box-grayscale {
    border-color: #525252;
    box-shadow: 
        -6px 6px 0 #C8C8C8,  /* Thick left border */
        0 6px 1px #C8C8C8;   /* Thick bottom border */
      
    
  }

.other-box-heading-grayscale{
      color: #FDFDFD;
      background-color: #525252
      }


.other-box-photos-grayscale {
  background-color: #F3F3F3;
}

.other-box-subtitle-grayscale{
  background-color: #F3F3F3;
  color: #525252;  

}

.other-box-action-call-grayscale{
  color: #525252;
  background-color: #F3F3F3;

}

.other-box-action-call-grayscale:hover {
  background-color: #525252;
  color: #FFFFFF
}

.other-call-action-grayscale, .other-goto-action-grayscale{
  color: #525252;
}

.marqueeItemGrayscale {
  color: #525252;
}

 
/* high contrast */


.headerHighContrastColorPalette {
      border-color: #000000;
    }

.logoHighContrastColorPalette {
    background-image: url('/logoBlack.svg'); 
    background-size: contain;
    background-repeat: no-repeat;    
  }

.navButtonHighContrast {
  border-color: #FF42D6;
  color: #000000;
}

.navButtonHighContrast:hover{
  background-color: #FF42D6;
  color: #000000;

}


.navAccessibilityButtonHighContrastColorPalette {
border-color: #FF42D6;
background-image: url('/personBlack.svg'); 
background-size: contain;
background-repeat: no-repeat;    
background-position: center;
}

.navAccessibilityButtonHighContrastColorPalette:hover {
background-color: #FF42D6;
background-image: url('/personBlack.svg'); 
background-size: contain;
background-repeat: no-repeat;    
background-position: center;
}

.accessibilityButtonDivHighContrastColorPalette {
  background-color: #FFFFFF;
  color: #000000;
}

.accessibilityButtonDivHighContrastColorPalette:hover {
        background-color: #FF42D6;
        color: #000000;
      }

  .accessiblityToolsHeadingHighContrastColorPalette{
        background-color: #000000;
        color: #FFFFFF;

      }

  /* highcontrast left card colors */

.left-box-highContrast {
    border-color: #000000;
    box-shadow: 
        0 0 0 transparent,  /* Thick left border */
        0 0 0 transparent;   /* Thick bottom border */
  }

  .left-box-heading-highContrast {
background-color: #000000;
color: #FFFFFF;
}



.left-box-paragraph-highContrast {
  background-color: #FFFFFF;
  color: #000000;  
  border-color: #525252;

}


.left-box-action-call-highContrast{
  color: #000000;
  background-color: #FFFFFF;
  border: 1px solid #FF42D6

}

.left-box-action-call-highContrast:hover {
  background-color: #FF42D6;
}

.call-action-highContrast, .goto-action-highContrast{
  color: #000000;
}

/* other box highContrast */

.other-box-highContrast {
    border-color: #000000;
    box-shadow: 
        -6px 6px 0 transparent,  /* Thick left border */
        0 6px 1px transparent;   /* Thick bottom border */
      
  }

.other-box-heading-highContrast {
      color: #FFFFFF;
      background-color: #000000
      }


.other-box-photos-highContrast {
  background-color: #FFFFFF;
}

.other-box-subtitle-highContrast {
  background-color: #FFFFFF;
  color: #000000;  

}

.other-box-action-call-highContrast {
  color: #000000;
  background-color: #FFFFFF;
  border: 1px solid #FF42D6


}

.other-box-action-call-highContrast:hover .other-call-action-highContrast, .other-box-action-call-highContrast:hover .other-goto-action-highContrast  {
  background-color: #FF42D6;
  color: #000000
}

.other-call-action-highContrast, .other-goto-action-highContrast{
  color: #000000;
}

.marqueeItemHighContrast {
  color: #000000;
}

/* WCAG  */

.headerDefaultColorPalette {
      border-color: #A80084;
    }

    .logoWCAGcolors {
        background-image: url('/logoWCAG.svg'); 
        background-size: contain;
        background-repeat: no-repeat;    
      }

    

      .navButtonWCAGcolorPalette {
        color: #A80084;
        border-color: #A80084;
        
      }

      .navButtonWCAGcolorPalette:hover {
        background-color: #A80084
      }

      .navAccessibilityButtonWCAGcolorPalette {
      border-color: #A80084;
      background-image: url('/personWCAG.svg'); 
      background-size: contain;
      background-repeat: no-repeat;    
      background-position: center;
      }

    .navAccessibilityButtonWCAGcolorPalette:hover {
      background-image: url('/personIconWhite.svg'); 
      background-size: contain;
      background-repeat: no-repeat;    
      background-position: center;
      background-color: #A80084

    }


    .accessibilityButtonDivWCAGcolorPalette  {
        background-color: #FFEDF4 ;
        color: #A80084;
      }

      .accessibilityButtonDivWCAGcolorPalette:hover  {
        background-color: #A80084;
        color: white;
      }

      .accessiblityToolsHeadingWCAGcolorPalette {
        background-color: #A80084;
        color: white;
      }

      /* default left card colors */
      .left-box-heading-WCAGcolors{
      background-color: #E7EB17;
      color: #A80084;
      }



.left-box-paragraph-WCAGcolors{
  background-color: #FCFCCE;
  color: #A80084;  

}

.left-box-action-call-WCAGcolors{
  color: #A80084;
  background-color: #FCFCCE;

}

.left-box-action-call-WCAGcolors:hover {
  background-color: #E7EB17;
}



.call-action-WCAGcolors{
color: #A80084;
}

.goto-action-WCAGcolors {
  color: #A80084;
}



/* Other boxes */

.other-box-heading-WCAGcolors{
  background-color: #A80084;
  color: white;
}

.other-box-subtitle-WCAGcolors {
  background-color: #FFEDF4;
  color:#A80084;
}

.other-box-photos-WCAGcolors {
    background-color: #FFEDF4;    
}


.other-box-action-call-WCAGcolors {
  color: #A80084;
  background-color: #FFEDF4;
}

.other-box-action-call-WCAGcolors:hover {
  background-color: #A80084;
}

.other-call-action-WCAGcolors{
color:#A80084
}

.other-box-action-call-WCAGcolors:hover .other-call-action-WCAGcolors{
color:white
}


.other-box-action-call-WCAGcolors:hover  .other-goto-action-WCAGcolors{
  color:white
}

.marqueeItemWCAGcolors {
  color: #A80084;
}

    </style>

    <template>
      <div class="grid-container">
        <div :class="[background-layer, currentBackgroundLayer]"></div> <!-- New background layer -->
      <div :class="['header', currentHeaderColorPalette]">
        <div class="logo-section">
          <div :class="['logo' , currentLogoColorPalette]"></div>
          </div>
          <div class="marquee">
            <div :class="['marqueeItem', currentMarqueeColorPalette]">
              ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * 
            </div> 
            <div :class="['marqueeItem', currentMarqueeColorPalette]">
              ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY *
            </div>
          </div>
        <div class="nav-buttons" >
          <a href="" :class="['nav-button', currentNavButtonColorPalette]">About</a>
          <a href="" :class="['nav-button', currentNavButtonColorPalette]">Accessibility Statement</a>
          <a href="" :class="['nav-button', currentNavButtonColorPalette]">Terms of Use</a>
          <button :class="['nav-buttonAccessibilityIcon', currentNavAccessibiltyButtonColorPalette]" @click="accessibilityMenuVisibility" aria-label="Accessibility Options" ></button>
          
          <div v-show="isMenuVisible" class="dropdown-content">
            <div>
              <h3 :class="['accessiblityToolsHeading', currentaccessiblityToolsHeadingColorPalette]">Accessibility Tools</h3>
            </div>
              <div  
              @click="increaseTextSize" 
              :class="['accessibilityButtonDiv', currentaccessibilityButtonDivColorPalette]">
              <p>Increase Text</p>
              <div :class="currentIncreaseTextIcon"></div>
              </div>


                  <div  @click="decreaseTextSize" :class="['accessibilityButtonDiv', currentaccessibilityButtonDivColorPalette]">
                  <p>Decrease Text</p>
                  <div :class="currentDecreaseTextIcon"></div>
                  </div>

                  <div @click="changeTograyscale" :class="['accessibilityButtonDiv', currentaccessibilityButtonDivColorPalette]">
                  <p>Grayscale</p>
                  <div :class="currentGrayScaleIcon"></div>
                  </div>

                  <div @click="changeToHighContrast" :class="['accessibilityButtonDiv', currentaccessibilityButtonDivColorPalette]">
                  <p>High Contrast</p>
                  <div :class="currentHighContrastIcon"></div>
                  </div>

                  <div @click="activateLinksUnderline" :class="['accessibilityButtonDiv', currentaccessibilityButtonDivColorPalette]">
                   <p>Links Underline</p>
                   <div :class="currentLinksUnderlineIcon"></div>
                  </div>

                  <div @click="activateReadableFont" :class="['accessibilityButtonDiv', currentaccessibilityButtonDivColorPalette]">
                  <p>Readable Font</p>
                  <div :class="currentReadableFontIcon"></div>
                  </div>

                  <div @click="changeToWCAGcolors" :class="['accessibilityButtonDiv', currentaccessibilityButtonDivColorPalette]">
                  <p>WCAG AAA Colours</p>
                  <div :class="currentWcagColoursIcon"></div>
                  </div>

                  <div @click="reset" :class="['accessibilityButtonDiv', currentaccessibilityButtonDivColorPalette]">
                  <p>Reset</p>
                  <div :class="currentResetIcon"></div>
                  </div>
            </div>          
        </div>
      </div>

       <!-- <div class="content-container"> -->
        <div class="background-image"></div>
        <div class="grid-background"></div>
        
        <div :class="['left-box', currentLeftBox]">
          <div :class="['left-box-heading', currentLeftBoxHeading]">
            <img v-show="isPinkLeftCardIconVisible" src="/greaterThanBracketsPink.svg">
            <img v-show="isGrayLeftCardIconVisible" src="/greaterThanBracketsGray.svg">
            <img v-show="isHighContrastLeftCardIconVisible" src="/sariSariIconWhite.svg">
            <img v-show="isWCAGLeftCardIconVisible" src="/greaterThanBracketsHighContrast.svg">
            <h5>Sari-Sari Xchange</h5></div>
          <div :class="['left-box-paragraph', currentLeftBoxParagraph]">
            <p>SSX is a community-building research & creation project using Extended Reality (XR) (ie. Virtual,
               Augmented, Mixed Realities) to foster new works by artists from the Asian diaspora. 
               <br><br>
               Sari-Sari Xchange Assetory (SSXA) is a virtual asset library created with and for the Asian diaspora community.</p>
          </div>
          <div :class="['left-box-action-call', currentLeftBoxActionCall]">
            <a href="" :class="['call-action', currentLeftBoxCallAction]">Learn More</a>
            <a href="" :class="['goto-action', currentLeftBoxGotoAction]">OK</a>
          </div>
        </div>

        
     
        <div :class="['center-top-box', currentOtherBox]">
          <div :class="['other-box-heading', currentOtherBoxHeading]">
            <img src="/asteriskWhite.svg">
            <h5>Artists</h5>
          </div>
          <div :class="['other-box-subtitle', currentOtherBoxSubtitle]">
            <img v-show="isDecoractionCardSubtitlePink" src="/decorationCardSubtitlePink.svg">
            <img v-show="isDecoractionCardSubtitleGray" src="/decorationCardSubtitleGray.svg">
            <img v-show="isDecoractionCardSubtitleHighContrast" src="/decorationCardSubtitleHighContrast.svg">
            <img v-show="isDecoractionCardSubtitleWCAG" src="/decorationCardSubtitleWCAG.svg">
            <p >Explore community assets created by artists.</p>
            
          </div>
          <div :class="['other-box-photos', currentOtherBoxPhotos]">
          <img v-show="arePinkTopCenterCardSampleImagesVisible" src="/sample-images-artists.png">
          <img v-show="areGrayTopCenterCardSampleImagesVisible" src="/sample-images-artists-grayscale.png">
          <img v-show="areHighContrastTopCenterCardSampleImagesVisible" src="/sample-images-artists-highContrast.png">

            </div>
            
          <div :class="['other-box-action-call', currentOtherBoxActionCall]">
            <a href="" :class="['other-call-action', currentOtherBoxCallAction]">Open Artists</a>
            <a href="" :class="['other-goto-action',  currentOtherBoxGotoAction]">></a>
          </div>
        </div>


        

        <div :class="['center-bottom-box', currentOtherBox]">
          <div :class="['other-box-heading', currentOtherBoxHeading]">
            <img src="/eventsIconWhite.svg">
            <h5>Events</h5>
          </div>
            <div :class="['other-box-subtitle', currentOtherBoxSubtitle]">
              <img v-show="isDecoractionCardSubtitlePink" src="/decorationCardSubtitlePink.svg">
            <img v-show="isDecoractionCardSubtitleGray" src="/decorationCardSubtitleGray.svg">
            <img v-show="isDecoractionCardSubtitleHighContrast" src="/decorationCardSubtitleHighContrast.svg">
            <img v-show="isDecoractionCardSubtitleWCAG" src="/decorationCardSubtitleWCAG.svg">
            <p>Assets created during SSX events.</p>
          </div>
          <div :class="['other-box-photos', currentOtherBoxPhotos]">
            <!-- <img src="/sample-images-artists.png"> -->

          
            </div>
          <div :class="['other-box-action-call', currentOtherBoxActionCall]">
            <a :class="['other-call-action', currentOtherBoxCallAction]">Open Events</a>
            <a href="" :class="['other-goto-action',  currentOtherBoxGotoAction]">></a>
          </div>
        </div>


        <div :class="['right-box', currentOtherBox]">
          <div :class="['other-box-heading', currentOtherBoxHeading]">
            <img src="/collectionsIconWhite.svg">
            <h5>Collections</h5>
          </div>
          <div :class="['other-box-subtitle', currentOtherBoxSubtitle]">
            <img v-show="isDecoractionCardSubtitlePink" src="/decorationCardSubtitlePink.svg">
            <img v-show="isDecoractionCardSubtitleGray" src="/decorationCardSubtitleGray.svg">
            <img v-show="isDecoractionCardSubtitleHighContrast" src="/decorationCardSubtitleHighContrast.svg">
            <img v-show="isDecoractionCardSubtitleWCAG" src="/decorationCardSubtitleWCAG.svg">
            <p>Explore collections by SSX.</p>
          </div>
          <div :class="['other-box-photos', currentOtherBoxPhotos]">
            <!-- <img src="/sample-images-artists.png"> -->


            </div>
          <div :class="['other-box-action-call', currentOtherBoxActionCall]">
            <a href="" :class="['other-call-action', currentOtherBoxCallAction]">Open Collections</a>
            <a href="" :class="['other-goto-action',  currentOtherBoxGotoAction]">></a>
          </div>
        </div>
      

      <div class="footer">
        <div v-show="areFooterImagesDefaultVisible" class="footer-images">
          <!-- First set of images -->
          <img src="/item1.png" alt="item 1" class="footer-image">
          <img src="/item2.png" alt="item 2" class="footer-image">
          <img src="/item3.png" alt="item 3" class="footer-image">
          <img src="/item4.png" alt="item 4" class="footer-image">
          <img src="/item5.png" alt="item 11" class="footer-image">
          <img src="/item6.png" alt="item 6" class="footer-image">
          <img src="/item7.png" alt="item 7" class="footer-image">
          <img src="/item8.png" alt="item 8" class="footer-image">
          
          <!-- Duplicate set for smooth infinite scroll -->
          <img src="/item1.png" alt="item 1" class="footer-image">
          <img src="/item2.png" alt="item 2" class="footer-image">
          <img src="/item3.png" alt="item 3" class="footer-image">
          <img src="/item4.png" alt="item 4" class="footer-image">
          <img src="/item5.png" alt="item 11" class="footer-image">
          <img src="/item6.png" alt="item 6" class="footer-image">
          <img src="/item7.png" alt="item 7" class="footer-image">
          <img src="/item8.png" alt="item 8" class="footer-image">

           <!-- Duplicate set for smooth infinite scroll -->
          <img src="/item1.png" alt="item 1" class="footer-image">
          <img src="/item2.png" alt="item 2" class="footer-image">
          <img src="/item3.png" alt="item 3" class="footer-image">
          <img src="/item4.png" alt="item 4" class="footer-image">
          <img src="/item5.png" alt="item 11" class="footer-image">
          <img src="/item6.png" alt="item 6" class="footer-image">
          <img src="/item7.png" alt="item 7" class="footer-image">
          <img src="/item8.png" alt="item 8" class="footer-image">

           <!-- Duplicate set for smooth infinite scroll -->
           <img src="/item1.png" alt="item 1" class="footer-image">
          <img src="/item2.png" alt="item 2" class="footer-image">
          <img src="/item3.png" alt="item 3" class="footer-image">
          <img src="/item4.png" alt="item 4" class="footer-image">
          <img src="/item5.png" alt="item 11" class="footer-image">
          <img src="/item6.png" alt="item 6" class="footer-image">
          <img src="/item7.png" alt="item 7" class="footer-image">
          <img src="/item8.png" alt="item 8" class="footer-image">
        </div>


        <div v-show="areFooterImagesGrayscaleVisible" class="footer-images">
        
          <img src="/item1-gray.png" alt="item 1" class="footer-image">
          <img src="/item2-gray.png" alt="item 2" class="footer-image">
          <img src="/item3-gray.png" alt="item 3" class="footer-image">
          <img src="/item4-gray.png" alt="item 4" class="footer-image">
          <img src="/item5-gray.png" alt="item 11" class="footer-image">
          <img src="/item6-gray.png" alt="item 6" class="footer-image">
          <img src="/item7-gray.png" alt="item 7" class="footer-image">
          <img src="/item8-gray.png" alt="item 8" class="footer-image">
    
          <img src="/item1-gray.png" alt="item 1" class="footer-image">
          <img src="/item2-gray.png" alt="item 2" class="footer-image">
          <img src="/item3-gray.png" alt="item 3" class="footer-image">
          <img src="/item4-gray.png" alt="item 4" class="footer-image">
          <img src="/item5-gray.png" alt="item 11" class="footer-image">
          <img src="/item6-gray.png" alt="item 6" class="footer-image">
          <img src="/item7-gray.png" alt="item 7" class="footer-image">
          <img src="/item8-gray.png" alt="item 8" class="footer-image">

           <img src="/item1-gray.png" alt="item 1" class="footer-image">
          <img src="/item2-gray.png" alt="item 2" class="footer-image">
          <img src="/item3-gray.png" alt="item 3" class="footer-image">
          <img src="/item4-gray.png" alt="item 4" class="footer-image">
          <img src="/item5-gray.png" alt="item 11" class="footer-image">
          <img src="/item6-gray.png" alt="item 6" class="footer-image">
          <img src="/item7-gray.png" alt="item 7" class="footer-image">
          <img src="/item8-gray.png" alt="item 8" class="footer-image">

           <img src="/item1-gray.png" alt="item 1" class="footer-image">
          <img src="/item2-gray.png" alt="item 2" class="footer-image">
          <img src="/item3-gray.png" alt="item 3" class="footer-image">
          <img src="/item4-gray.png" alt="item 4" class="footer-image">
          <img src="/item5-gray.png" alt="item 11" class="footer-image">
          <img src="/item6-gray.png" alt="item 6" class="footer-image">
          <img src="/item7-gray.png" alt="item 7" class="footer-image">
          <img src="/item8-gray.png" alt="item 8" class="footer-image">
        </div>

        <div v-show="areFooterImagesHighContrastVisible" class="footer-images">
        
        <img src="/item1-highContrast.png" alt="item 1" class="footer-image">
        <img src="/item2-highContrast.png" alt="item 2" class="footer-image">
        <img src="/item3-highContrast.png" alt="item 3" class="footer-image">
        <img src="/item4-highContrast.png" alt="item 4" class="footer-image">
        <img src="/item5-highContrast.png" alt="item 11" class="footer-image">
        <img src="/item6-highContrast.png" alt="item 6" class="footer-image">
        <img src="/item7-highContrast.png" alt="item 7" class="footer-image">
        <img src="/item8-highContrast.png" alt="item 8" class="footer-image">
  
        <img src="/item1-highContrast.png" alt="item 1" class="footer-image">
        <img src="/item2-highContrast.png" alt="item 2" class="footer-image">
        <img src="/item3-highContrast.png" alt="item 3" class="footer-image">
        <img src="/item4-highContrast.png" alt="item 4" class="footer-image">
        <img src="/item5-highContrast.png" alt="item 11" class="footer-image">
        <img src="/item6-highContrast.png" alt="item 6" class="footer-image">
        <img src="/item7-highContrast.png" alt="item 7" class="footer-image">
        <img src="/item8-highContrast.png" alt="item 8" class="footer-image">

        <img src="/item1-highContrast.png" alt="item 1" class="footer-image">
        <img src="/item2-highContrast.png" alt="item 2" class="footer-image">
        <img src="/item3-highContrast.png" alt="item 3" class="footer-image">
        <img src="/item4-highContrast.png" alt="item 4" class="footer-image">
        <img src="/item5-highContrast.png" alt="item 11" class="footer-image">
        <img src="/item6-highContrast.png" alt="item 6" class="footer-image">
        <img src="/item7-highContrast.png" alt="item 7" class="footer-image">
        <img src="/item8-highContrast.png" alt="item 8" class="footer-image">
         
        <img src="/item1-highContrast.png" alt="item 1" class="footer-image">
        <img src="/item2-highContrast.png" alt="item 2" class="footer-image">
        <img src="/item3-highContrast.png" alt="item 3" class="footer-image">
        <img src="/item4-highContrast.png" alt="item 4" class="footer-image">
        <img src="/item5-highContrast.png" alt="item 11" class="footer-image">
        <img src="/item6-highContrast.png" alt="item 6" class="footer-image">
        <img src="/item7-highContrast.png" alt="item 7" class="footer-image">
        <img src="/item8-highContrast.png" alt="item 8" class="footer-image">
      </div>


      <div v-show="areFooterImagesWCAGcolorsVisible" class="footer-images">
        
        <img src="/item1-wcag.png" alt="item 1" class="footer-image">
        <img src="/item2-wcag.png" alt="item 2" class="footer-image">
        <img src="/item3-wcag.png" alt="item 3" class="footer-image">
        <img src="/item4-wcag.png" alt="item 4" class="footer-image">
        <img src="/item5-wcag.png" alt="item 11" class="footer-image">
        <img src="/item6-wcag.png" alt="item 6" class="footer-image">
        <img src="/item7-wcag.png" alt="item 7" class="footer-image">
        <img src="/item8-wcag.png" alt="item 8" class="footer-image">
  
        <img src="/item1-wcag.png" alt="item 1" class="footer-image">
        <img src="/item2-wcag.png" alt="item 2" class="footer-image">
        <img src="/item3-wcag.png" alt="item 3" class="footer-image">
        <img src="/item4-wcag.png" alt="item 4" class="footer-image">
        <img src="/item5-wcag.png" alt="item 11" class="footer-image">
        <img src="/item6-wcag.png" alt="item 6" class="footer-image">
        <img src="/item7-wcag.png" alt="item 7" class="footer-image">
        <img src="/item8-wcag.png" alt="item 8" class="footer-image">

        <img src="/item1-wcag.png" alt="item 1" class="footer-image">
        <img src="/item2-wcag.png" alt="item 2" class="footer-image">
        <img src="/item3-wcag.png" alt="item 3" class="footer-image">
        <img src="/item4-wcag.png" alt="item 4" class="footer-image">
        <img src="/item5-wcag.png" alt="item 11" class="footer-image">
        <img src="/item6-wcag.png" alt="item 6" class="footer-image">
        <img src="/item7-wcag.png" alt="item 7" class="footer-image">
        <img src="/item8-wcag.png" alt="item 8" class="footer-image">
         
        <img src="/item1-wcag.png" alt="item 1" class="footer-image">
        <img src="/item2-wcag.png" alt="item 2" class="footer-image">
        <img src="/item3-wcag.png" alt="item 3" class="footer-image">
        <img src="/item4-wcag.png" alt="item 4" class="footer-image">
        <img src="/item5-wcag.png" alt="item 11" class="footer-image">
        <img src="/item6-wcag.png" alt="item 6" class="footer-image">
        <img src="/item7-wcag.png" alt="item 7" class="footer-image">
        <img src="/item8-wcag.png" alt="item 8" class="footer-image">
      </div>

      </div>
    </div>
</template>