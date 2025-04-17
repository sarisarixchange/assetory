<script>
 export default {
    data() {
        return {
            isMenuVisible: false,
            isNotificationVisible: true,
            fontSize: 1, // This is now a scale factor (1 = 16px)
            baseFontSize: null, // Default root font size in pixels
            baseGap: 18, // Store the base gap value
            baseGapUnit: 'rem',
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

            linkDecoration: "none", // Stores the value of --link-decoration

            // readable font

            readableFont: "",

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
  // Get the actual current root font size when component mounts
  this.baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  
  // Get the initial computed gap size from CSS
  const computedStyle = getComputedStyle(document.documentElement);
  const initialGap = computedStyle.getPropertyValue('--marquee-item-gap');
  this.baseGap = parseFloat(initialGap);
},

    methods: {

      saveSettings() {
        const settings = {
            isMenuVisible: this.isMenuVisible,
            isNotificationVisible: this.isNotificationVisible,
            // Save the font size and gap size
            fontSize: this.fontSize,
            baseFontSize: this.baseFontSize, // Store the base font size
            baseGap: this.baseGap, // Store the base gap size
            baseGapUnit: this.baseGapUnit,
            currentHeaderColorPalette: this.currentHeaderColorPalette,
            currentLogoColorPalette: this.currentLogoColorPalette,
            currentMarqueeColorPalette: this.currentMarqueeColorPalette,
            currentNavButtonColorPalette: this.currentNavButtonColorPalette,
            currentNavAccessibiltyButtonColorPalette: this.currentNavAccessibiltyButtonColorPalette,
            currentaccessibilityButtonDivColorPalette: this.currentaccessibilityButtonDivColorPalette,
            currentaccessiblityToolsHeadingColorPalette: this.currentaccessiblityToolsHeadingColorPalette, 
            currentIncreaseTextIcon: this.currentIncreaseTextIcon,
            currentDecreaseTextIcon: this.currentDecreaseTextIcon,
            currentGrayScaleIcon: this.currentGrayScaleIcon, 
            currentHighContrastIcon: this.currentHighContrastIcon,
            currentLinksUnderlineIcon: this.currentLinksUnderlineIcon,
            currentReadableFontIcon: this.currentReadableFontIcon,
            currentWcagColoursIcon: this.currentWcagColoursIcon,
            currentResetIcon: this.currentResetIcon, 
             // leftbox
            isPinkLeftCardIconVisible: this.isPinkLeftCardIconVisible,
            isGrayLeftCardIconVisible: this.isGrayLeftCardIconVisible,
            isHighContrastLeftCardIconVisible: this.isHighContrastLeftCardIconVisible,
            isWCAGLeftCardIconVisible: this.isWCAGLeftCardIconVisible,
            currentLeftBox: this.currentLeftBox,
            currentLeftBoxHeading: this.currentLeftBoxHeading,
            currentLeftBoxParagraph: this.currentLeftBoxParagraph,
            currentLeftBoxActionCall: this.currentLeftBoxActionCall,
            currentLeftBoxCallAction: this.currentLeftBoxCallAction,
            currentLeftBoxGotoAction: this.currentLeftBoxGotoAction,
            // center-top-box
            arePinkTopCenterCardSampleImagesVisible: this.arePinkTopCenterCardSampleImagesVisible,
            areGrayTopCenterCardSampleImagesVisible: this.areGrayTopCenterCardSampleImagesVisible,
            areHighContrastTopCenterCardSampleImagesVisible: this.areHighContrastTopCenterCardSampleImagesVisible,
            // other boxes
            currentOtherBox: this.currentOtherBox,
            currentOtherBoxHeading: this.currentOtherBoxHeading,
            currentOtherBoxSubtitle: this.currentOtherBoxSubtitle,
            isDecoractionCardSubtitlePink: this.isDecoractionCardSubtitlePink,
            isDecoractionCardSubtitleGray: this.isDecoractionCardSubtitleGray,
            isDecoractionCardSubtitleHighContrast: this.isDecoractionCardSubtitleHighContrast,
            isDecoractionCardSubtitleWCAG: this.isDecoractionCardSubtitleWCAG,
            currentOtherBoxPhotos: this.currentOtherBoxPhotos,
            currentOtherBoxActionCall: this.currentOtherBoxActionCall,
            currentOtherBoxCallAction: this.currentOtherBoxCallAction,
            currentOtherBoxGotoAction: this.currentOtherBoxGotoAction,
            // links decoration
            linkDecoration: this.linkDecoration,
            // readable font
            readableFont:   this.readableFont,
            readableFont: this.readableFont,
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

/////

           
      // /////

        loadSettings() {
          const savedSettings = localStorage.getItem('accessibilitySettings');
          if (savedSettings) {
            const settings = JSON.parse(savedSettings);

            this.isMenuVisible= settings.isMenuVisible ?? this.isMenuVisible,
            this.isNotificationVisible= settings.isNotificationVisible ?? this.isNotificationVisible,
             // Load the font size and apply it
            this.baseFontSize= settings.baseFontSize || this.baseFontSize, // Store the base font size
            this.fontSize = settings.fontSize || this.fontSize;
            const pixelSize = this.baseFontSize * this.fontSize;
            document.documentElement.style.fontSize = `${pixelSize}px`;
            
            this.baseGap = settings.baseGap || this.baseGap, // Store the base gap size
            this.baseGapUnit = settings.baseGapUnit || this.baseGapUnit,
            this.currentHeaderColorPalette = settings.currentHeaderColorPalette || this.currentHeaderColorPalette,
            this.currentLogoColorPalette= settings.currentLogoColorPalette || this.currentLogoColorPalette,
            this.currentMarqueeColorPalette = settings.currentMarqueeColorPalette || this.currentMarqueeColorPalette,
            this.currentNavButtonColorPalette = settings.currentNavButtonColorPalette || this.currentNavButtonColorPalette,
            this.currentNavAccessibiltyButtonColorPalette = settings.currentNavAccessibiltyButtonColorPalette || this.currentNavAccessibiltyButtonColorPalette,
            this.currentaccessibilityButtonDivColorPalette = settings.currentaccessibilityButtonDivColorPalette || this.currentaccessibilityButtonDivColorPalette,
            this.currentaccessiblityToolsHeadingColorPalette = settings.currentaccessiblityToolsHeadingColorPalette || this.currentaccessiblityToolsHeadingColorPalette, 
            this.currentIncreaseTextIcon = settings.currentIncreaseTextIcon || this.currentIncreaseTextIcon,
            this.currentDecreaseTextIcon = settings.currentDecreaseTextIcon || this.currentDecreaseTextIcon,
            this.currentGrayScaleIcon = settings.currentGrayScaleIcon || this.currentGrayScaleIcon, 
            this.currentHighContrastIcon = settings.currentHighContrastIcon || this.currentHighContrastIcon,
            this.currentLinksUnderlineIcon = settings.currentLinksUnderlineIcon || this.currentLinksUnderlineIcon,
            this.currentReadableFontIcon = settings.currentReadableFontIcon || this.currentReadableFontIcon,
            this.currentWcagColoursIcon = settings.currentWcagColoursIcon || this.currentWcagColoursIcon,
            this.currentResetIcon = settings.currentResetIcon || this.currentResetIcon, 
             // leftbox
             this.isPinkLeftCardIconVisible = settings.isPinkLeftCardIconVisible ?? this.isPinkLeftCardIconVisible,
             this.isGrayLeftCardIconVisible = settings.isGrayLeftCardIconVisible ?? this.isGrayLeftCardIconVisible,
             this.isHighContrastLeftCardIconVisible = settings.isHighContrastLeftCardIconVisible ?? this.isHighContrastLeftCardIconVisible,
             this.isWCAGLeftCardIconVisible = settings.isWCAGLeftCardIconVisible ?? this.isWCAGLeftCardIconVisible,
             this.currentLeftBox = settings.currentLeftBox || this.currentLeftBox,
             this.currentLeftBoxHeading = settings.currentLeftBoxHeading || this.currentLeftBoxHeading,
             this.currentLeftBoxParagraph = settings.currentLeftBoxParagraph || this.currentLeftBoxParagraph,
             this.currentLeftBoxActionCall = settings.currentLeftBoxActionCall || this.currentLeftBoxActionCall,
             this.currentLeftBoxCallAction = settings.currentLeftBoxCallAction || this.currentLeftBoxCallAction,
             this.currentLeftBoxGotoAction = settings.currentLeftBoxGotoAction || this.currentLeftBoxGotoAction,
            // center-top-box
            this.arePinkTopCenterCardSampleImagesVisible = settings.arePinkTopCenterCardSampleImagesVisible ?? this.arePinkTopCenterCardSampleImagesVisible,
            this.areGrayTopCenterCardSampleImagesVisible = settings.areGrayTopCenterCardSampleImagesVisible ?? this.areGrayTopCenterCardSampleImagesVisible,
            this.areHighContrastTopCenterCardSampleImagesVisible = settings.areHighContrastTopCenterCardSampleImagesVisible ?? this.areHighContrastTopCenterCardSampleImagesVisible,
            // other boxes
            this.currentOtherBox = settings.currentOtherBox || this.currentOtherBox,
            this.currentOtherBoxHeading = settings.currentOtherBoxHeading || this.currentOtherBoxHeading,
            this.currentOtherBoxSubtitle = settings.currentOtherBoxSubtitle || this.currentOtherBoxSubtitle,
            this.isDecoractionCardSubtitlePink = settings.isDecoractionCardSubtitlePink ?? this.isDecoractionCardSubtitlePink,
            this.isDecoractionCardSubtitleGray = settings.isDecoractionCardSubtitleGray ?? this.isDecoractionCardSubtitleGray,
            this.isDecoractionCardSubtitleHighContrast = settings.isDecoractionCardSubtitleHighContrast ?? this.isDecoractionCardSubtitleHighContrast,
            this.isDecoractionCardSubtitleWCAG = settings.isDecoractionCardSubtitleWCAG ?? this.isDecoractionCardSubtitleWCAG,
            this.currentOtherBoxPhotos = settings.currentOtherBoxPhotos || this.currentOtherBoxPhotos,
            this.currentOtherBoxActionCall = settings.currentOtherBoxActionCall || this.currentOtherBoxActionCall,
            this.currentOtherBoxCallAction = settings.currentOtherBoxCallAction || this.currentOtherBoxCallAction,
            this.currentOtherBoxGotoAction = settings.currentOtherBoxGotoAction || this.currentOtherBoxGotoAction,
            // links decoration
            this.linkDecoration = settings.linkDecoration || this.linkDecoration,
            document.documentElement.style.setProperty("--link-decoration", this.linkDecoration);
            // readable font
            this.readableFont = settings.readableFont ||  this.readableFont,
            document.documentElement.style.setProperty("--font-family", this.readableFont);
            
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

        accessibilityMenuVisibility(){
            this.isMenuVisible =! this.isMenuVisible;
            this.saveSettings();
        }, 

        
        // increase text size
        increaseTextSize() {
          if (this.fontSize < 2) { // Limit the maximum font size
            this.fontSize += 0.1; // Increment font size
            this.updateFontSize(); // Apply the updated font size
            this.saveSettings(); // Save the updated font size to localStorage
          }
        },

        // decrease text size
        decreaseTextSize() {
          if (this.fontSize > 0.5) { // Limit the minimum font size
            this.fontSize -= 0.1; // Decrement font size
            this.updateFontSize(); // Apply the updated font size
            this.saveSettings(); // Save the updated font size to localStorage
          }
        },

        updateFontSize() {
            const pixelSize = this.baseFontSize * this.fontSize; // Calculate the new font size in pixels
            document.documentElement.style.fontSize = `${pixelSize}px`; // Apply the font size to the root element
            this.updateGap(); // Update the gap size proportionally
            this.saveSettings(); // Save the updated font size to localStorage
          },

        updateGap() {
          // Scale the gap proportionally with the font size
          // document.documentElement.style.setProperty('--marquee-item-gap', `${this.baseGap * this.fontSize}rem`);
          document.documentElement.style.setProperty('--marquee-item-gap', `${this.baseGap * this.fontSize}rem`);
          console.log(this.baseGap * this.fontSize)
          this.saveSettings();
        },

        reset() {
          this.fontSize = 1;
          document.documentElement.style.fontSize = "";
          // Also reset the gap
          document.documentElement.style.setProperty('--marquee-item-gap', '');

          // accessibility notification window
          this.isNotificationVisible = true; // Show the notification
    
          // Update our base values after reset
          this.baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
          
          const computedStyle = getComputedStyle(document.documentElement);
          const initialGap = computedStyle.getPropertyValue('--marquee-item-gap');
          this.baseGap = parseFloat(initialGap);

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
            this.linkDecoration = "none";
            document.documentElement.style.setProperty("--link-decoration", this.linkDecoration);

            // reset readable font

            this.readableFont = "'Handjet', sans-serif";
            document.documentElement.style.setProperty("--font-family", this.readableFont);
            document.documentElement.style.setProperty("--marquee-item-gap", "18rem");


            // reset footer images
           this.areFooterImagesDefaultVisible= true;
           this.areFooterImagesGrayscaleVisible= false;
           this.areFooterImagesHighContrastVisible= false;
           this.areFooterImagesWCAGcolorsVisible= false

              // background image
            this.currentBackgroundLayer= 'background-layer'
          // Save the updated setting
            this.saveSettings();
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

             // Save the updated setting
             this.saveSettings();
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
             // Save the updated setting
             this.saveSettings();
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
             // Save the updated setting
             this.saveSettings();

        },

       activateLinksUnderline() {
          this.linkDecoration = "underline"; // Update the property
          document.documentElement.style.setProperty("--link-decoration", this.linkDecoration);
          // Save the updated setting
          this.saveSettings();
        },

        //redable font
        activateReadableFont(){
            this.readableFont = "'Inter', sans-serif";
            document.documentElement.style.setProperty("--font-family", this.readableFont);
            document.documentElement.style.setProperty("--marquee-item-gap", "50rem");
          // Save the updated setting
            this.saveSettings();
  
    }

    // do not erase curly brackets below
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
        font-family: 'Handjet';
        src: url('/fonts/Handjet.ttf') format('opentype');
        font-weight: normal;
        font-style: normal;
        }

        :root {
          --base-gap: 18rem; /* Base gap size */
        }
        
      body {
        font-family: 'Inter', sans-serif;
        font-size: 16px; /* 1rem = 16px */
        background: white;
        height: 100vh;
        margin: 0;
        background-color: #f9f9f9;
          }

       /* Increase root font size for larger screens */
       @media (min-width: 600px) {
          html {
            font-size: 12px; /* 1rem = 12px */
          }
        }

        /* Increase root font size for larger screens */
        @media (min-width: 768px) {
          html {
            font-size: 18px; /* 1rem = 18px */
          }
        }

        /* Further increase root font size for very large screens */
        @media (min-width: 1200px) {
          html {
            font-size: 20px; /* 1rem = 20px */
          }
        }

    h2 {
      font-size: 1rem; 
      font-weight: normal; 
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
    
      .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
    white-space: nowrap; /* Prevents screen readers from pausing mid-sentence */
}
    .marquee {
        overflow: hidden;
        width: 65%;
        display: flex;
        white-space: nowrap;
        cursor: default;
        gap: var(--marquee-item-gap, var(--base-gap)); /* adjust rem as needed */
      }

      .marqueeItem { 
        font-family: var(--font-family, 'Handjet'), sans-serif; 
        font-size: 0.84rem;
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
        padding: 0.45rem 0.75rem;
        border: 1px solid #D400A6;
        background: none;
        color: #D400A6;
        border-radius: 20px;
        font-size: 0.50rem;
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
  font-size: 1rem;
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
        padding: 0.30em;
        border-radius: 10px;
        margin-bottom: 0.25em;
        /* background-color: #D400A6; */
        color: white;
        /* font-size: 0.75em; */
        font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
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
  font-size: 0.5rem;

}

.accessibilityButtonDiv {
  font-size: 0.60rem;
  width: 100%;
  padding: 0.5em;
  display: flex;
  border: none;
  background-color: #FFEDF4;  
  justify-content: space-between; /* Pushes first item left, second item right */
  align-items: center;
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

.increaseTextIcon {
  width: 1em;
  height: 1em; 
  background-image: url("/IncreaseTextIcon.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}


.increaseTextIconGray{
  width: 1em;
  height: 1em; 
  background-image: url("/IncreaseTextIconGray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}


.increaseTextIconHighContrast{
  width: 1em;
  height: 1em; 
  background-image: url("/IncreaseTextIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.increaseTextIconWCAG{
  width: 1em;
  background-image: url("/IncreaseTextIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.decreaseTextIcon{
  width: 1em;
  height: 1em; 
  background-image: url("/decreaseTextIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.decreaseTextIconGray{
  width: 1em;
  height: 1em; 
  background-image: url("/decreaseTextIconGray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}


.decreaseTextIconHighContrast{
  width: 1em;
  height: 1em; 
  background-image: url("/decreaseTextIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}


.decreaseTextIconWCAG{
  width: 1em;
  height: 1em; 
  background-image: url("/decreaseTextIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.grayscaleIcon {  
  width: 1em;
  height: 1em; 
  background-image: url("/grayscaleIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.grayscaleIconGray{
  width: 1em;
  height: 1em; 
  background-image: url("/grayscaleIconGray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.grayscaleIconHighContrast{
  width: 1em;
  height: 1em; 
  background-image: url("/grayscaleIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.grayscaleIconWCAG{
  width: 1em;
  height: 1em; 
  background-image: url("/grayscaleIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}


.highContrastIcon{
  width: 1em;
  height: 1em; 
  background-image: url("/highContrastIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.highContrastIconGray{
  width: 1em;
  height: 1em; 
  background-image: url("/highContrastIconGray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.highContrastIconHighContrast{
  width: 1em;
  height: 1em; 
  background-image: url("/highContrastIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}


.highContrastIconWCAG{
  width: 1em;
  height: 1em; 
  background-image: url("/highContrastIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}


.linksUnderlineIcon{
  width: 1em;
  height: 1em; 
  background-image: url("/linksUnderlineIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.linksUnderlineIconGray{
  width: 1em;
  height: 1em; 
  background-image: url("/linksUnderlineIconGray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.linksUnderlineIconHighContrast{
  width: 1em;
  height: 1em; 
  background-image: url("/linksUnderlineIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.linksUnderlineIconWCAG{
  width: 1em;
  height: 1em; 
  background-image: url("/linksUnderlineIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.readableFontIcon {
  width: 1em;
  height: 1em; 
  background-image: url("/readableFontIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.readableFontIconGray {
  width: 1em;
  height: 1em; 
  background-image: url("/readableFontIconGray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.readableFontIconHighContrast {
  width: 1em;
  height: 1em; 
  background-image: url("/readableFontIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.readableFontIconWCAG {
  width: 1em;
  height: 1em; 
  background-image: url("/readableFontIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.wcagColoursIcon {
  width: 1em;
  height: 1em; 
  background-image: url("/wcagColorsIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.wcagColoursIconGray {
  width: 1em;
  height: 1em; 
  background-image: url("/wcagColorsIconGray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.wcagColoursIconHighContrast {
  width: 1em;
  height: 1em; 
  background-image: url("/wcagColorsIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.wcagColoursIconWCAG {
  width: 1em;
  height: 1em; 
  background-image: url("/wcagColorsIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.resetIcon {
  width: 1em;
  height: 1em; 
  background-image: url("/resetIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}


.resetIconGray {
  width: 1em;
  height: 1em; 
  background-image: url("/resetIconGray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.resetIconHighContrast {
  width: 1em;
  height: 1em; 
  background-image: url("/resetIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
}

.resetIconWCAG {
  width: 1em;
  height: 1em; 
  background-image: url("/resetIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* margin-right: 0.10em; */
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
  font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
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
  font-size: 0.6rem;
  font-weight: 350;
  min-height:  16vh;
}

.left-box-action-call{
  display: flex;
  border-radius: 8px;
  font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
  color: #D400A6;
  font-size: 0.8rem;
  background-color: #FCFCCE;
  padding: 1.75%;
}



.left-box-action-call:hover {
  background-color: #E7EB17;
}

.call-action{
margin-left: 0.5em;
width:90%;
color: #D400A6;
display: flex;
justify-content: space-between; /* or use margin-left: auto on .ok-action */
width: 100%; /* or any fixed width you prefer */
}

.ok-action {
  margin-left: auto;
}

.goto-action {
  color: #D400A6;
}



/* Other boxes */

.other-box-heading{
  display: flex; 
  border-radius: 8px;
  background-color: #D400A6;
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
  background-color: #FFEDF4;
  font-family: 'Inter', sans-serif;
  color:#D400A6;
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
    background-color: #FFEDF4;
    margin-bottom: 0.35em;
    
    
}



.other-box-photos img {
  width: 100%;
}

.other-box-action-call{
  display: flex;
  border-radius: 8px;
  font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
  color: #D400A6;
  font-size: 0.8rem;
  padding: 1.75%;
  background-color: #FFEDF4;
  align-items: center;
}

.other-box-action-call:hover {
  background-color: #D400A6;
}

.other-call-action{
margin-left: 0.5em;
width:92%;
color:#D400A6;
display: flex;
  justify-content: space-between; /* or use margin-left: auto on .ok-action */
  width: 100%; /* or any fixed width you prefer */
}


.other-goto-action {
  font-size: 1.5vw; 
  margin-left: auto;
}


.other-box-action-call:hover .other-call-action{
color:white
}



.other-box-action-call:hover  .other-goto-action{
  color:white
}

/* notification window */
.notification-window {
  display: flex;
  position: fixed; /* Ensures it's positioned relative to the viewport */
  bottom: 0vh; /* Adjust to place it above the footer */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Center alignment */
  background-color: #f9f9f9;
  color: #525252;
  border: 2px solid #d400a6;
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
  background-color: #d400a6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.8rem;
}

.notification-dismiss-button:hover {
  background-color: #a80084;
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
        <div :class="[background-layer, currentBackgroundLayer]" aria-hidden="true"></div> <!-- New background layer -->
      <div :class="['header', currentHeaderColorPalette]">
        <div class="logo-section">
          <h1 class="visually-hidden">Sari-Sari Asset Library</h1>
          <div :class="['logo' , currentLogoColorPalette]" aria-hidden="true"></div>
          </div>
          
          <!-- top marquee -->
          <div class="marquee" aria-hidden="true">
            <div :class="['marqueeItem', currentMarqueeColorPalette]" >
              ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * 
            </div> 
            <div :class="['marqueeItem', currentMarqueeColorPalette]">
              ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY *
            </div>
            <!-- <div :class="['marqueeItem', currentMarqueeColorPalette]">
              ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY *
            </div>
            <div :class="['marqueeItem', currentMarqueeColorPalette]">
              ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY * ASSET LIBRARY *
            </div> -->
          </div>

          <!-- navigation menu -->
        <div class="nav-buttons" >
          <a href="" :class="['nav-button', currentNavButtonColorPalette]">About</a>
          <a href="" :class="['nav-button', currentNavButtonColorPalette]">Accessibility Statement</a>
          <a href="" :class="['nav-button', currentNavButtonColorPalette]">Terms of Use</a>
          <button :class="['nav-buttonAccessibilityIcon', currentNavAccessibiltyButtonColorPalette]" @click="accessibilityMenuVisibility" aria-label="Accessibility Menu" ></button>
          <!-- accessibility menu -->
          <div 
              v-show="isMenuVisible" 
              class="dropdown-content" 
              role="dialog" 
              aria-modal="true" 
              aria-labelledby="accessibility tools heading"
              ref="accessibilityMenu"
            >
            <div>
              <h2 :class="['accessiblityToolsHeading', currentaccessiblityToolsHeadingColorPalette]">
                Accessibility Tools
              </h2>
            </div>
            <button  
                  @click="increaseTextSize" 
                  :class="['accessibilityButtonDiv', currentaccessibilityButtonDivColorPalette]"
                >
                  <span>Increase Text</span>
                  <span :class="currentIncreaseTextIcon" aria-hidden="true"></span>
                </button>

                  <button
                    @click="decreaseTextSize" :class="['accessibilityButtonDiv', currentaccessibilityButtonDivColorPalette]"
                    >
                  <span>Decrease Text</span>
                  <span :class="currentDecreaseTextIcon" aria-hidden="true"></span>
                  </button> 

                  <button
                   @click="changeTograyscale" :class="['accessibilityButtonDiv', currentaccessibilityButtonDivColorPalette]"
                   >
                  <span>Grayscale</span>
                  <span :class="currentGrayScaleIcon" aria-hidden="true"></span>
                </button>

                  <button
                   @click="changeToHighContrast" :class="['accessibilityButtonDiv', currentaccessibilityButtonDivColorPalette]"
                   >
                  <span>High Contrast</span>
                  <span :class="currentHighContrastIcon" aria-hidden="true"></span>
              </button>

                  <button
                   @click="activateLinksUnderline" :class="['accessibilityButtonDiv', currentaccessibilityButtonDivColorPalette]"
                   >
                   <span>Links Underline</span>
                   <span :class="currentLinksUnderlineIcon" aria-hidden="true"></span>
            </button>

                  <button 
                  @click="activateReadableFont" :class="['accessibilityButtonDiv', currentaccessibilityButtonDivColorPalette]"
                  >
                  <span>Readable Font</span>
                  <span :class="currentReadableFontIcon" aria-hidden="true"></span>
          </button>

                  <button 
                   @click="changeToWCAGcolors" :class="['accessibilityButtonDiv', currentaccessibilityButtonDivColorPalette]"
                   >
                  <span>WCAG AAA Colours</span>
                  <span :class="currentWcagColoursIcon" aria-hidden="true"></span>
        </button>

                  <button
                   @click="reset" :class="['accessibilityButtonDiv', currentaccessibilityButtonDivColorPalette]"
                   >
                  <span>Reset</span>
                  <span :class="currentResetIcon" aria-hidden="true"></span>
      </button>
            </div>          
        </div>
      </div>

<!-- background image -->
        <div class="background-image" aria-hidden="true"></div>
        <div class="grid-background" aria-hidden="true"></div>
        

        <!-- cards -->
        <div :class="['left-box', currentLeftBox]">
          <div :class="['left-box-heading', currentLeftBoxHeading]">
            <img v-show="isPinkLeftCardIconVisible" src="/greaterThanBracketsPink.svg" alt="">
            <img v-show="isGrayLeftCardIconVisible" src="/greaterThanBracketsGray.svg" alt="">
            <img v-show="isHighContrastLeftCardIconVisible" src="/sariSariIconWhite.svg" alt="">
            <img v-show="isWCAGLeftCardIconVisible" src="/greaterThanBracketsHighContrast.svg" alt="">
            <h2>Sari-Sari Xchange</h2></div>
          <div :class="['left-box-paragraph', currentLeftBoxParagraph]">
            <p>SSX is a community-building research & creation project using Extended Reality (XR) (ie. Virtual,
               Augmented, Mixed Realities) to foster new works by artists from the Asian diaspora. 
               <br><br>
               Sari-Sari Xchange Assetory (SSXA) is a virtual asset library created with and for the Asian diaspora community.</p>
          </div>
        <div :class="['left-box-action-call', currentLeftBoxActionCall]">
         <a href="" :class="['call-action', currentLeftBoxCallAction]" >
        <span class="learn-more">Learn More</span> <span class="ok-action" aria-hidden="true">OK</span>
    </a>
</div>

        </div>

        
     
        <div :class="['center-top-box', currentOtherBox]">
          <div :class="['other-box-heading', currentOtherBoxHeading]">
            <img src="/asteriskWhite.svg" alt="">
            <h2>Artists</h2>
          </div>
          <div :class="['other-box-subtitle', currentOtherBoxSubtitle]">
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
            
          <div :class="['other-box-action-call', currentOtherBoxActionCall]">
            <a href="" :class="['other-call-action', currentOtherBoxCallAction]" >
              <span >Open Artists</span> <span class="call-goto-action" aria-hidden="true">></span>
            </a>
          </div>
        </div>


        

        <div :class="['center-bottom-box', currentOtherBox]">
          <div :class="['other-box-heading', currentOtherBoxHeading]">
            <img src="/eventsIconWhite.svg" alt="">
            <h2>Events</h2>
          </div>
            <div :class="['other-box-subtitle', currentOtherBoxSubtitle]">
              <img v-show="isDecoractionCardSubtitlePink" src="/decorationCardSubtitlePink.svg" alt="">
            <img v-show="isDecoractionCardSubtitleGray" src="/decorationCardSubtitleGray.svg" alt="">
            <img v-show="isDecoractionCardSubtitleHighContrast" src="/decorationCardSubtitleHighContrast.svg" alt="">
            <img v-show="isDecoractionCardSubtitleWCAG" src="/decorationCardSubtitleWCAG.svg" alt="">
            <p>Assets created during SSX events.</p>
          </div>
          <div :class="['other-box-photos', currentOtherBoxPhotos]">
            <!-- <img src="/sample-images-artists.png"> -->

          
            </div>
          <div :class="['other-box-action-call', currentOtherBoxActionCall]">
            <a  href="" :class="['other-call-action', currentOtherBoxCallAction]">
              <span>Open Events</span> <span class="call-goto-action" aria-hidden="true">></span>
            </a>
          </div>
        </div>


        <div :class="['right-box', currentOtherBox]">
          <div :class="['other-box-heading', currentOtherBoxHeading]">
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
          <div :class="['other-box-action-call', currentOtherBoxActionCall]">
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