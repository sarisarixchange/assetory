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
          currentBackgroundLayer: 'background-layer',

       
      currentLeftBoxActionCall: "left-box-action-call",
      currentLeftBoxCallAction: "call-action",

      collection: null, // Holds the data for the selected collection
      collections: [
        { id: 0, title: "Collection Title 1", firstImage: "", secondImage:"", topDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, dui nec tempor hendrerit, ligula eros vehicula dui, ut mattis odio orci id metus. Phasellus ornare diam nibh, in vehicula tortor volutpat nec. Nam luctus tincidunt enim, id vehicula ligula egestas efficitur. Aliquam fermentum id eros sit amet pretium. Nunc sit amet dolor eget justo maximus porta id non velit. Vivamus in gravida risus. Ut nec urna fringilla, aliquam turpis et, volutpat lacus. Maecenas ornare mattis felis, quis hendrerit tortor vulputate sit amet. Donec sed consectetur risus, ut venenatis tortor. Vestibulum feugiat lacinia scelerisque. Donec pulvinar arcu neque, nec blandit sapien cursus quis. Suspendisse dui libero, venenatis ac sollicitudin quis, hendrerit", bottomDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, dui nec tempor hendrerit, ligula eros vehicula dui, ut mattis odio orci id metus. Phasellus ornare diam nibh, in vehicula tortor volutpat nec. Nam luctus tincidunt enim, id vehicula ligula egestas efficitur. Aliquam fermentum id eros sit amet pretium. Nunc sit amet dolor eget justo maximus porta id non velit. Vivamus in gravida risus. Ut nec urna fringilla, aliquam turpis et, volutpat lacus. Maecenas ornare mattis felis, quis hendrerit tortor vulputate sit amet. Donec sed consectetur risus, ut venenatis tortor. Vestibulum feugiat lacinia scelerisque. Donec pulvinar arcu neque, nec blandit sapien cursus quis. Suspendisse dui libero, venenatis ac sollicitudin quis, hendrerit" },
        { id: 1, title: "Collection Title 2", firstImage: "", secondImage:"", topDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, dui nec tempor hendrerit, ligula eros vehicula dui, ut mattis odio orci id metus. Phasellus ornare diam nibh, in vehicula tortor volutpat nec. Nam luctus tincidunt enim, id vehicula ligula egestas efficitur. Aliquam fermentum id eros sit amet pretium. Nunc sit amet dolor eget justo maximus porta id non velit. Vivamus in gravida risus. Ut nec urna fringilla, aliquam turpis et, volutpat lacus. Maecenas ornare mattis felis, quis hendrerit tortor vulputate sit amet. Donec sed consectetur risus, ut venenatis tortor. Vestibulum feugiat lacinia scelerisque. Donec pulvinar arcu neque, nec blandit sapien cursus quis. Suspendisse dui libero, venenatis ac sollicitudin quis, hendrerit", bottomDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, dui nec tempor hendrerit, ligula eros vehicula dui, ut mattis odio orci id metus. Phasellus ornare diam nibh, in vehicula tortor volutpat nec. Nam luctus tincidunt enim, id vehicula ligula egestas efficitur. Aliquam fermentum id eros sit amet pretium. Nunc sit amet dolor eget justo maximus porta id non velit. Vivamus in gravida risus. Ut nec urna fringilla, aliquam turpis et, volutpat lacus. Maecenas ornare mattis felis, quis hendrerit tortor vulputate sit amet. Donec sed consectetur risus, ut venenatis tortor. Vestibulum feugiat lacinia scelerisque. Donec pulvinar arcu neque, nec blandit sapien cursus quis. Suspendisse dui libero, venenatis ac sollicitudin quis, hendrerit" },
        { id: 2, title: "Collection Title 3", firstImage: "", secondImage:"", topDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, dui nec tempor hendrerit, ligula eros vehicula dui, ut mattis odio orci id metus. Phasellus ornare diam nibh, in vehicula tortor volutpat nec. Nam luctus tincidunt enim, id vehicula ligula egestas efficitur. Aliquam fermentum id eros sit amet pretium. Nunc sit amet dolor eget justo maximus porta id non velit. Vivamus in gravida risus. Ut nec urna fringilla, aliquam turpis et, volutpat lacus. Maecenas ornare mattis felis, quis hendrerit tortor vulputate sit amet. Donec sed consectetur risus, ut venenatis tortor. Vestibulum feugiat lacinia scelerisque. Donec pulvinar arcu neque, nec blandit sapien cursus quis. Suspendisse dui libero, venenatis ac sollicitudin quis, hendrerit", bottomDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, dui nec tempor hendrerit, ligula eros vehicula dui, ut mattis odio orci id metus. Phasellus ornare diam nibh, in vehicula tortor volutpat nec. Nam luctus tincidunt enim, id vehicula ligula egestas efficitur. Aliquam fermentum id eros sit amet pretium. Nunc sit amet dolor eget justo maximus porta id non velit. Vivamus in gravida risus. Ut nec urna fringilla, aliquam turpis et, volutpat lacus. Maecenas ornare mattis felis, quis hendrerit tortor vulputate sit amet. Donec sed consectetur risus, ut venenatis tortor. Vestibulum feugiat lacinia scelerisque. Donec pulvinar arcu neque, nec blandit sapien cursus quis. Suspendisse dui libero, venenatis ac sollicitudin quis, hendrerit" },
      
        // Add more collections as needed
      ],
     
      
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


  // Get the ID from the route
  const collectionId = parseInt(this.$route.params.id, 10);

// Find the collection data based on the ID
this.collection = this.collections.find((item) => item.id === collectionId);

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
  
    }, 

    scrollToTop() {
    window.scrollTo({
      top: 0, // Scroll to the top of the page
      behavior: 'smooth', // Smooth scrolling animation
    });
  },

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
        background-color: red;
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


/* return button */
.returnButton {
    padding-left: 0.25rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.returnButton button {
 
  background-color: transparent;
  color: #D400A6;
  border: 1px solid #D400A6;
  font-family: 'Inter', sans-serif;
  border-radius: 8px;
  padding: 0.125rem;
  cursor: pointer;
  /* transition: background-color 0.3s ease; */
}


/* collection details */
.collection-details-container{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 12rem;
  margin-right: 12rem;
  margin-bottom: 2rem;
  color: #D400A6;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
}

.image-banner {
  width: 100%;
  height: 7rem; /* Adjust height as needed */
  border: 1px solid #D400A6;
  border-radius: 20px;
  overflow: hidden; /* Ensures the image doesn't overflow the container */
  display: flex; /* Optional: Ensures proper alignment */
  align-items: center; /* Optional: Centers the image vertically */
  justify-content: center; /* Optional: Centers the image horizontally */
  padding: 0.25rem;
}

.image-banner img {
  
  width: 100%; /* Make the image fill the container horizontally */
  height: 100%; /* Make the image fill the container vertically */
  object-fit: cover; /* Ensures the image covers the container without distortion */
  background-color:#FFEDF4;
  border-radius: 20px;
}

.collection-details{
    display: flex;
    flex-direction: column;
    border: 1px solid #D400A6;
    border-radius: 20px; 
    padding: 1rem;
    gap: 1rem;
}

.collection-details h2{
    font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
}

.collection-top-description{
    display: flex;    
    gap: 1rem; 
    
}

.collection-top-description p {
  flex: 1; /* Make the paragraph take up 50% of the container */
}

.collection-top-description img {
  flex: 1; /* Make the image take up 50% of the container */
  max-width: 100%; /* Ensure the image doesn't overflow */
  height: auto; /* Maintain the aspect ratio of the image */
  background-color:#FFEDF4;
  border-radius: 20px; 
}
    

.collection-middle-image{
    width: 100%;
    height: 7rem;
    background-color:#FFEDF4;
    border-radius: 20px; 

}
    
/* .collection-bottom-description{

} */


.collection-assets {
    text-align: center;

}

.collection-assets h2{
    font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
}

.collection-assets-card-container{
   display: flex;
   gap: 1rem;
}

.collection-assets-card {
  width: 18.30rem;
  height: 15rem;
  border: 1px solid #D400A6;
  border-radius: 8px;
  background-color: #FFEDF4;
  color: #D400A6;
  margin-bottom: 0.35em;
  padding: 1rem;
}
    
/* back to top button */

.backTop{
  display: flex;
 padding: 1rem;
}

.backTop button {
  background-color: transparent;
  color: #D400A6;
  border: 1px solid #D400A6;
  font-family: 'Inter', sans-serif;
  border-radius: 8px;
  padding: 0.125rem;
  cursor: pointer;
  /* transition: background-color 0.3s ease; */
}

/* footer */

.non-homepage-footer {
  display: flex;
  border-top: 1px solid #D400A6;
  border-left: 1px solid #D400A6;
  border-right: 1px solid #D400A6;
  border-bottom: none; /* No bottom border */
  border-radius: 20px 20px 0 0; /* Top-left and top-right rounded, bottom corners straight */
  padding: 1rem;
  margin-left: 1rem; /* Add margin to the left */
  margin-right: 1rem; /* Add margin to the right */
  color: #D400A6;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
}

.leftSideFooter{
 width: 50%; 
}

.leftSideFooterInfo{
  display: flex;
  
}

.footerLogo img{
  width: 3rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

/* .footerCopyright h2{
} */

.rightSideFooter{
  width: 50%;
  display: flex;
  gap: 3rem;
  justify-content: flex-end; /* Align items to the right */
  

}

.footer-links{
  display: flex;
  flex-direction: column;
  gap:0.25rem;
}

.footer-links a {
  color: #D400A6; /* Set the desired purple color */
  text-decoration: none; /* Remove underline if needed */
}


    </style>


  
 

<template>
  <div class="container">
        <!-- <div :class="[background-layer, currentBackgroundLayer]" aria-hidden="true"></div> New background layer -->
      <div :class="['header', currentHeaderColorPalette]">
        <div class="logo-section">
          <h1 class="visually-hidden">Sari-Sari Asset Library</h1>
          <div :class="['logo' , currentLogoColorPalette]" aria-hidden="true"></div>
          <router-link to="/" :class="['nav-button', currentNavButtonColorPalette]">Home</router-link>          </div>
          
  

          <!-- navigation menu -->
        <div class="nav-buttons" >
          <a href="" :class="['nav-button', currentNavButtonColorPalette]">Artists</a>
          <a href="" :class="['nav-button', currentNavButtonColorPalette]">Collections</a>
          <a href="" :class="['nav-button', currentNavButtonColorPalette]">Events</a>
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

            <!-- return button -->
            <div class="">
        <div class="returnButton">
        <router-link to="/collections" :class="['nav-button', currentNavButtonColorPalette]">Return <</router-link>          
        </div>
   </div>

      
      <div v-if="collection" class="collection-details-container">
      <!-- Image banner -->  
      <div class="image-banner">
        <img :src="collection.firstImage" alt="Banner Image" class="banner-image">
      </div>

      <!-- Collection details -->

      <div class="collection-details">
        <h2>{{ collection.title }}</h2>
        <div class="collection-top-description">
            <p>{{ collection.topDescription }}</p>
            <img :src="collection.secondImage" alt="Collection Image" class="collection-right-image">
        </div>

        <div class="collection-middle-image">
            <img :src="collection.thirdImage" alt="Collection Image" class="collection">
            </div>

        <div class="collection-bottom-description">
            <p>{{ collection.bottomDescription }}</p>  
              </div>
        </div>

        <div class="collection-assets">
            <h2>Assets</h2>
            <div class="collection-assets-card-container">
            <div class="collection-assets-card"></div>
            <div class="collection-assets-card"></div>
            <div class="collection-assets-card"></div>
        </div>
        </div>
    </div>
    <div v-else class="collection-details-container">
    <p>Collection not found.</p>
  </div>

  <!-- back to top button -->
  <div class="backTop">
      <div style="width:93%"></div>
      <button @click="scrollToTop">^ Back to Top</button>
        </div>

      <!-- footer -->

      <footer class="non-homepage-footer">
        
        <div class="leftSideFooter">
        <div class="leftSideFooterInfo">
          <div class="footerLogo">
        <img src="/logo.svg" alt="Footer Logo">
        </div>
        <div class="footerCopyright">
        <h2>Sari-Sari XChange</h2>
        <p>Assetory</p>
        <p>© 2024</p>
        </div>
        </div>
        <div>
          <p>☺ Made with care & curiosity</p>
          <p>Designed by Hanan Abbas</p>
          <p>Developes by Luis Navarro</p>
        </div>
        </div>

        <div class="rightSideFooter">
          <div class="footer-links">
          <h2>Information</h2>
          <a href="">SSX Website</a>
          <a href="">About</a>
          <a href="">Accessibility</a>
          <a href="">Terms of Use</a>
      </div>

      <div class="footer-links">
          <h2>Quick Links</h2>
          <a href="">Submit</a>
          <a href="">Home</a>
          <a href="">Artists</a>
          <a href="">Collections</a>
          <a href="">Events</a>
      </div>

      <div class="footer-links">
          <h2>Contact</h2>
          <a href="">email@email.com</a>
          <a href="">@sarisarixchange</a>
          
      </div>

      </div>

        </footer>
</div>
</template>