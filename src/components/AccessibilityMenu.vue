<script>

export default {
    name: 'AccessibilityMenu',
    data() {
        return {
            isMenuVisible: false,
            fontSize: 1, // This is now a scale factor (1 = 16px)
            baseFontSize: null, // Default root font size in pixels
            baseGap: 18, // Store the base gap value
            baseGapUnit: 'rem',
           
            currentNavAccessibilityIcon: 'nav-buttonAccessibilityIcon',
            currentIncreaseTextIcon: 'increaseTextIcon', 
            currentDecreaseTextIcon: 'decreaseTextIcon', 
            currentGrayScaleIcon: 'grayscaleIcon', 
            currentHighContrastIcon: 'highContrastIcon', 
            currentLinksUnderlineIcon: 'linksUnderlineIcon', 
            currentReadableFontIcon: 'readableFontIcon', 
            currentWcagColoursIcon: 'wcagColoursIcon', 
            currentResetIcon: 'resetIcon', 
            
            // links decoration

            linkDecoration: "none", // Stores the value of --link-decoration

            // readable font

            readableFont: "",      
                
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

      applyTheme(theme) {
  const root = document.documentElement;

  if (theme === 'grayscale') {   // grayscale Theme
    root.style.setProperty('--primary-color', '#525252');
    root.style.setProperty('--secondary-color', '#F3F3F3');
    root.style.setProperty('--shadow', '#C8C8C8');
    root.style.setProperty('--hover-color', '#525252');
    root.style.setProperty('--hover-text-color', '#FFFFFF');
    
    root.style.setProperty('--primary-color-left-box', '#D2D2D2');
    root.style.setProperty('--secondary-color-left-box', '#F3F3F3');
    root.style.setProperty('--text-color-left-box', '#525252');
    root.style.setProperty('--hover-color-left-box', '#D2D2D2'); 
    root.style.setProperty('--hover-text-color-left-box', '#525252');



  
    // event emission 
    this.$emit('theme-changed', {
        currentLogoColorPalette: 'logoGrayscaleColorPalette',
        currentBackgroundLayer: 'background-layer-grayscale',
    });
    // acc menu and icons
    this.currentNavAccessibilityIcon= 'navAccessibilityButtonGrayscaleColorPalette'
    this.currentIncreaseTextIcon = 'increaseTextIconGray'
    this.currentDecreaseTextIcon = 'decreaseTextIconGray'
    this.currentGrayScaleIcon = 'grayscaleIconGray'
    this.currentHighContrastIcon = 'highContrastIconGray'
    this.currentLinksUnderlineIcon = 'linksUnderlineIconGray'
    this.currentReadableFontIcon = 'readableFontIconGray'
    this.currentWcagColoursIcon = 'wcagColoursIconGray'
    this.currentResetIcon = 'resetIconGray'            

  } else if (theme === 'high-contrast') {  // high contrast theme
    root.style.setProperty('--primary-color', '#000000');
    root.style.setProperty('--secondary-color', '#FFFFFF');
    root.style.setProperty('--shadow', 'transparent');
    root.style.setProperty('--hover-color', '#FF42D6');
    root.style.setProperty('--hover-text-color', '#000000');
    


    root.style.setProperty('--primary-color-left-box', '#000000');
    root.style.setProperty('--secondary-color-left-box', '#FFFFFF');
    root.style.setProperty('--text-color-left-box', '#FFFFFF');
    root.style.setProperty('--hover-color-left-box', '#FF42D6'); 
    root.style.setProperty('--hover-text-color-left-box', '#000000');




    // event emission
    this.$emit('theme-changed', {
        currentLogoColorPalette: 'logoHighContrastColorPalette',
        currentBackgroundLayer: 'background-layer-highContrast',
    });
     // acc menu icons
     this.currentNavAccessibilityIcon = 'navAccessibilityButtonHighContrastColorPalette'
    this.currentIncreaseTextIcon = 'increaseTextIconHighContrast'
    this.currentDecreaseTextIcon = 'decreaseTextIconHighContrast'
    this.currentGrayScaleIcon = 'grayscaleIconHighContrast'
    this.currentHighContrastIcon = 'highContrastIconHighContrast'
    this.currentLinksUnderlineIcon = 'linksUnderlineIconHighContrast'
    this.currentReadableFontIcon = 'readableFontIconHighContrast'
    this.currentWcagColoursIcon = 'wcagColoursIconHighContrast'
    this.currentResetIcon = 'resetIconHighContrast'    

  } else if (theme === 'wgac-colors') { // WCAG colors theme
    root.style.setProperty('--primary-color', '#A80084');
    root.style.setProperty('--secondary-color', '#FFEDF4');
    root.style.setProperty('--shadow', '#F1AFDD');
    root.style.setProperty('--hover-color', '#A80084');
    root.style.setProperty('--hover-text-color', '#FFFFFF');


    root.style.setProperty('--primary-color-left-box', '#A80084');
    root.style.setProperty('--secondary-color-left-box', '#FFEDF4');
    root.style.setProperty('--text-color-left-box', '#FFFFFF');
    root.style.setProperty('--hover-color-left-box', '#A80084'); 
    root.style.setProperty('--hover-text-color-left-box', '#FFFFFF');


    // event emission
    this.$emit('theme-changed', {
        currentLogoColorPalette: 'logoWCAGcolors',
        currentBackgroundLayer: 'background-layer',
    });
      // acc menu icons
      this.currentNavAccessibilityIcon = 'navAccessibilityButtonWCAGcolorPalette'
       this.currentIncreaseTextIcon = 'increaseTextIconWCAG'
          this.currentDecreaseTextIcon = 'decreaseTextIconWCAG'
          this.currentGrayScaleIcon = 'grayscaleIconWCAG'
          this.currentHighContrastIcon = 'highContrastIconWCAG'
          this.currentLinksUnderlineIcon = 'linksUnderlineIconWCAG'
          this.currentReadableFontIcon = 'readableFontIconWCAG'
          this.currentWcagColoursIcon = 'wcagColoursIconWCAG' 
          this.currentResetIcon = 'resetIconWCAG'    

  } else {
    // Default theme
    root.style.setProperty('--primary-color', '#D400A6');
    root.style.setProperty('--secondary-color', '#FFEDF4');
    root.style.setProperty('--shadow', '#F1AFDD');
    root.style.setProperty('--hover-color', '#D400A6');
    root.style.setProperty('--hover-text-color', '#FFFFFF');


    
    root.style.setProperty('--primary-color-left-box', '#E7EB17');
    root.style.setProperty('--secondary-color-left-box', '#FCFCCE');
    root.style.setProperty('--text-color-left-box', '#D400A6');
    root.style.setProperty('--hover-color-left-box', '#E7EB17'); 
    root.style.setProperty('--hover-text-color-left-box', '#D400A6');



    // event emission
    this.$emit('theme-changed', 'logo'); // Emit event


    this.currentNavAccessibilityIcon = 'nav-buttonAccessibilityIcon'
    this.currentIncreaseTextIcon = 'increaseTextIcon'
    this.currentDecreaseTextIcon = 'decreaseTextIcon'
    this.currentGrayScaleIcon = 'grayscaleIcon'
    this.currentHighContrastIcon = 'highContrastIcon' 
    this.currentLinksUnderlineIcon = 'linksUnderlineIcon'
    this.currentReadableFontIcon = 'readableFontIcon' 
    this.currentWcagColoursIcon = 'wcagColoursIcon'
    this.currentResetIcon = 'resetIcon'

  }
},

      saveSettings() {
        const settings = {
            isMenuVisible: this.isMenuVisible,
            // Save the font size and gap size
            fontSize: this.fontSize,
            baseFontSize: this.baseFontSize, // Store the base font size
            baseGap: this.baseGap, // Store the base gap size
            baseGapUnit: this.baseGapUnit,
            // links decoration
            linkDecoration: this.linkDecoration,
            // readable font
            readableFont:   this.readableFont,       
            
            currentIncreaseTextIcon: this.currentIncreaseTextIcon,
            currentDecreaseTextIcon: this.currentDecreaseTextIcon,
            currentGrayScaleIcon: this.currentGrayScaleIcon, 
            currentHighContrastIcon: this.currentHighContrastIcon,
            currentLinksUnderlineIcon: this.currentLinksUnderlineIcon,
            currentReadableFontIcon: this.currentReadableFontIcon,
            currentWcagColoursIcon: this.currentWcagColoursIcon,
            currentResetIcon: this.currentResetIcon, 
        };
        localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
      },

/////

        loadSettings() {
          const savedSettings = localStorage.getItem('accessibilitySettings');
          if (savedSettings) {
            const settings = JSON.parse(savedSettings);

            this.isMenuVisible= settings.isMenuVisible ?? this.isMenuVisible,
             // Load the font size and apply it
            this.baseFontSize= settings.baseFontSize || this.baseFontSize, // Store the base font size
            this.fontSize = settings.fontSize || this.fontSize;
            const pixelSize = this.baseFontSize * this.fontSize;
            document.documentElement.style.fontSize = `${pixelSize}px`;
            
            this.baseGap = settings.baseGap || this.baseGap, // Store the base gap size
            this.baseGapUnit = settings.baseGapUnit || this.baseGapUnit,
                      
            // links decoration
            this.linkDecoration = settings.linkDecoration || this.linkDecoration,
            document.documentElement.style.setProperty("--link-decoration", this.linkDecoration);
            // readable font
            this.readableFont = settings.readableFont ||  this.readableFont,
            document.documentElement.style.setProperty("--font-family", this.readableFont);
            
            this.currentIncreaseTextIcon = settings.currentIncreaseTextIcon || this.currentIncreaseTextIcon
            this.currentDecreaseTextIcon = settings.currentDecreaseTextIcon || this.currentDecreaseTextIcon
            this.currentGrayScaleIcon = settings.currentGrayScaleIcon || this.currentGrayScaleIcon
            this.currentHighContrastIcon = settings.currentHighContrastIcon || this.currentHighContrastIcon
            this.currentLinksUnderlineIcon = settings.currentLinksUnderlineIcon || this.currentLinksUnderlineIcon
            this.currentReadableFontIcon = settings.currentReadableFontIcon || this.currentReadableFontIcon
            this.currentWcagColoursIcon = settings.currentWcagColoursIcon || this.currentWcagColoursIcon
            this.currentResetIcon = settings.currentResetIcon || this.currentResetIcon
          
          }
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
          this.applyTheme();
          this.fontSize = 1;
          document.documentElement.style.fontSize = "";
          // Also reset the gap
          document.documentElement.style.setProperty('--marquee-item-gap', '');

          // accessibility notification window
          // this.isNotificationVisible = true;
    
          // Update our base values after reset
          this.baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
          
          const computedStyle = getComputedStyle(document.documentElement);
          const initialGap = computedStyle.getPropertyValue('--marquee-item-gap');
          this.baseGap = parseFloat(initialGap);

          //  reset links underline
            this.linkDecoration = "none";
            document.documentElement.style.setProperty("--link-decoration", this.linkDecoration);

            // reset readable font

            this.readableFont = "'Handjet', sans-serif";
            document.documentElement.style.setProperty("--font-family", this.readableFont);
            document.documentElement.style.setProperty("--marquee-item-gap", "18rem");

            // 
            
            // Save the updated setting
            this.saveSettings();
        }, 



        changeTograyscale(){
          this.applyTheme('grayscale'); 
        
             // Save the updated setting
          this.saveSettings();
        }, 

        changeToHighContrast(){
          this.applyTheme('high-contrast');          
             // Save the updated setting
             this.saveSettings();
        }, 

        changeToWCAGcolors(){
          this.applyTheme('wgac-colors');       
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
        // do not erase curly brackets below

    },
  }

    </script>

<style>
:root {
  --primary-color: #D400A6; /* Main pink color */
  --secondary-color: #FFEDF4; /* Light pink background */
  --hover-color: #A80084; /* Darker pink for hover states */
  --hover-text-color: #FFFFFF;
  --shadow: #F1AFDD; /* Shadow color */


  --primary-color-left-box: #E7EB17;
  --secondary-color-left-box: #FCFCCE;
  --text-color-left-box: #D400A6; /* Secondary text color */
  --hover-color-left-box: #E7EB17; 
  --hover-text-color-left-box:#D400A6;
  
}

  

  
  .nav-buttonAccessibilityIcon {
  color: var(--primary-color);
  border-radius: 10px;
  padding: 0.5rem 1rem;
  width: 5%;
  height: auto;
  background-image: url('/person.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: var(--background-color);
  border: 1px solid var(--primary-color);
  transition: background-color 0.2s;
  cursor: pointer;
}

.nav-buttonAccessibilityIcon:hover {
  background-image: url('/personIconWhite.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: var(--primary-color);
}



.navAccessibilityButtonGrayscaleColorPalette {
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
        background-color: var(--primary-color);
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
  color:var(--primary-color);
  background-color: var(--secondary-color);
  justify-content: space-between;
  align-items: center;
}


.accessibilityButtonDiv:hover {
  color: var(--secondary-color);
  background-color: var(--primary-color);
}

a {
  text-decoration: var(--link-decoration, none); /* Default: No underline */
}

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

.accessibilityButtonDiv:hover .increaseTextIcon,  .accessibilityButtonDiv:hover .increaseTextIconGray,  .accessibilityButtonDiv:hover .increaseTextIconHighContrast, .accessibilityButtonDiv:hover .increaseTextIconWCAG{
  background-image: url("/IncreaseTextIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.accessibilityButtonDiv:hover .decreaseTextIcon, .accessibilityButtonDiv:hover .decreaseTextIconGray,  .accessibilityButtonDiv:hover .decreaseTextIconHighContrast, .accessibilityButtonDiv:hover .decreaseTextIconWCAG{
  background-image: url("/decreaseTextIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.accessibilityButtonDiv:hover .grayscaleIcon, .accessibilityButtonDiv:hover .grayscaleIconGray,  .accessibilityButtonDiv:hover .grayscaleIconHighContrast, .accessibilityButtonDiv:hover .grayscaleIconWCAG{
  background-image: url("/grayscaleIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.accessibilityButtonDiv:hover .highContrastIcon, .accessibilityButtonDiv:hover .highContrastIconGray, .accessibilityButtonDiv:hover .highContrastIconHighContrast, .accessibilityButtonDiv:hover .highContrastIconWCAG{
  background-image: url("/highContrastIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.accessibilityButtonDiv:hover .wcagColoursIcon, .accessibilityButtonDiv:hover .wcagColoursIconGray, accessibilityButtonDiv:hover .wcagColoursIconHighContrast, .accessibilityButtonDiv:hover .wcagColoursIconWCAG{
  background-image: url("/wcagColorsIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

.accessibilityButtonDiv:hover .linksUnderlineIcon, .accessibilityButtonDiv:hover .linksUnderlineIconGray, .accessibilityButtonDiv:hover .linksUnderlineIconHighContrast, .accessibilityButtonDiv:hover .linksUnderlineIconWCAG{
  background-image: url("/linksUnderlineIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.accessibilityButtonDiv:hover .readableFontIcon, .accessibilityButtonDiv:hover .readableFontIconGray, .accessibilityButtonDiv:hover .readableFontIconHighContrast, .accessibilityButtonDiv:hover .readableFontIconWCAG{
  background-image: url("/readableFontIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

}
.accessibilityButtonDiv:hover .resetIcon, .accessibilityButtonDiv:hover .resetIconGray, .accessibilityButtonDiv:hover .resetIconHighContrast, .accessibilityButtonDiv:hover .resetIconWCAG{
  background-image: url("/resetIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

/* Change color of dropdown links on hover */
.dropdown-content p {
  flex-grow: 1;
}
</style>

<template>
  
<button :class="['nav-buttonAccessibilityIcon', currentNavAccessibilityIcon]" @click="accessibilityMenuVisibility" 
aria-label="Accessibility Menu" >
</button>
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
              <h2 class="accessiblityToolsHeading">
                Accessibility Tools
              </h2>
            </div>
            <button  
                  @click="increaseTextSize" 
                  class="accessibilityButtonDiv"
                >
                  <span>Increase Text</span>
                  <span :class="currentIncreaseTextIcon" aria-hidden="true"></span>

                              </button>

                  <button
                    @click="decreaseTextSize" 
                    class="accessibilityButtonDiv"
                    >
                  <span>Decrease Text</span>
                  <span :class="currentDecreaseTextIcon" aria-hidden="true"></span>
                  </button> 

                  <button
                   @click="changeTograyscale" 
                   class="accessibilityButtonDiv"
                   >
                  <span>Grayscale</span>
                  <span :class="currentGrayScaleIcon" aria-hidden="true"></span>
                </button>

                  <button
                   @click="changeToHighContrast" 
                   class="accessibilityButtonDiv"
                   >
                  <span>High Contrast</span>
                  <span :class="currentHighContrastIcon" aria-hidden="true"></span>
              </button>

                  <button
                   @click="activateLinksUnderline"
                   class="accessibilityButtonDiv"
                   >
                   <span>Links Underline</span>
                   <span :class="currentLinksUnderlineIcon" aria-hidden="true"></span>
            </button>

                  <button 
                  @click="activateReadableFont" 
                  class="accessibilityButtonDiv"
                  >
                  <span>Readable Font</span>
                  <span :class="currentReadableFontIcon" aria-hidden="true"></span>
          </button>

                  <button 
                   @click="changeToWCAGcolors" 
                   class="accessibilityButtonDiv"
                   >
                  <span>WCAG AAA Colours</span>
                  <span :class="currentWcagColoursIcon" aria-hidden="true"></span>
        </button>

                  <button
                   @click="reset" 
                   class="accessibilityButtonDiv"
                   >
                  <span>Reset</span>
                  <span :class="currentResetIcon" aria-hidden="true"></span>
      </button>
            </div>          
            </template>