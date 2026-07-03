<script>

export default {
  name: 'AccessibilityMenu',
  emits: ['theme-changed', 'update-notification-visible'], // Declare the custom events
  props: {
    isNotificationVisible: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      interactiveMode: false,
      isMenuVisible: false,
      fontSize: 1, // This is now a scale factor (1 = 16px)
      baseFontSize: null, // Default root font size in pixels
      currentTheme: 'default', // Default theme
      localNotificationVisible: this.isNotificationVisible,


      currentNavAccessibilityIcon: 'nav-buttonAccessibilityIcon',
      currentIncreaseTextIcon: 'increaseTextIcon',
      currentDecreaseTextIcon: 'decreaseTextIcon',
      currentGrayScaleIcon: 'grayscaleIcon',
      currentHighContrastIcon: 'highContrastIcon',
      currentLinksUnderlineIcon: 'linksUnderlineIcon',
      currentReadableFontIcon: 'readableFontIcon',
      currentWcagColoursIcon: 'wcagColoursIcon',
      currentResetIcon: 'resetIcon',
      // svgButtons
      currentSvgButton: 'svgButtonDefault',


      // links decoration

      linkDecoration: "none", // Stores the value of --link-decoration

      // readable font

      readableFont: "",

    }
  },

  mounted() {
    this.loadSettings();
    window.addEventListener('keydown', this.handleKeydown);
  },

  beforeUnmount() {
    // Clean up to prevent memory leaks
    window.removeEventListener('keydown', this.handleKeydown);
  },

  computed: {

    isHomepage() {
      return this.$route.path === '/';
    },


  },

  methods: {

    handleKeydown(e) {
      if (!this.isMenuVisible) return;

      // 1. ESCAPE TO CLOSE
      if (e.key === 'Escape') {
        this.closeAndRestore();
      }

      // 2. TAB LOOP LOGIC
      if (e.key === 'Tab') {
        const focusableElements = this.$el.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        // Include the H2 heading as the first element
        const firstElement = this.$el.querySelector('.accessiblityToolsHeading');
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else { // Plain Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    },

    applyTheme(theme) {
      const root = document.documentElement;

      if (theme === 'grayscale') {   // grayscale Theme
        this.currentTheme = 'grayscale'; // Update currentTheme

        root.style.setProperty('--active-color-main', '#828282');
        root.style.setProperty('--active-text-color-main', '#FFFEFA');
        root.style.setProperty('--hover-color-main', '#C8C8C8');
        root.style.setProperty('--hover-text-color-main', '#2B2B2B');

        root.style.setProperty('--background-color', '#FFFFFF');
        root.style.setProperty('--background-color-headings', '#828282');
        root.style.setProperty('--return-button-background-color', '#828282');
        root.style.setProperty('--return-button-text-color', '#FFFEFA');
        root.style.setProperty('--primary-color', '#2B2B2B');
        root.style.setProperty('--secondary-color', '#FFFFFF');
        root.style.setProperty('--navigation-buttons-border-color', '#2B2B2B');
        root.style.setProperty('--homepage-card-buttons-border-color', '#2B2B2B');
        root.style.setProperty('--hover-color', '#C8C8C8');
        root.style.setProperty('--hover-text-color', '#2B2B2B');
        root.style.setProperty('--shadow', '#2B2B2B');


        root.style.setProperty('--primary-color-left-box', '#2B2B2B');
        root.style.setProperty('--secondary-color-left-box', '#FFFFFF');
        root.style.setProperty('--text-color-left-box', '#FFFFFF');
        root.style.setProperty('--hover-color-left-box', '#C8C8C8');
        root.style.setProperty('--hover-text-color-left-box', '#2B2B2B');
        root.style.setProperty('--homepage-left-card-button-border-color', '#2B2B2B');


        // event emission 
        this.$emit('theme-changed', {
          theme: 'grayscale',
          currentBackgroundLayer: 'background-layer-grayscale',
        });
        // acc menu and icons
        this.currentNavAccessibilityIcon = 'navAccessibilityButtonGrayscaleColorPalette'
        this.currentIncreaseTextIcon = 'increaseTextIconGray'
        this.currentDecreaseTextIcon = 'decreaseTextIconGray'
        this.currentGrayScaleIcon = 'grayscaleIconGray'
        this.currentHighContrastIcon = 'highContrastIconGray'
        this.currentLinksUnderlineIcon = 'linksUnderlineIconGray'
        this.currentReadableFontIcon = 'readableFontIconGray'
        this.currentWcagColoursIcon = 'wcagColoursIconGray'
        this.currentResetIcon = 'resetIconGray',
          this.currentSvgButton = 'svgButtonGray'


      } else if (theme === 'highContrast') {  // high contrast theme
        this.currentTheme = 'highContrast'; // Update currentTheme

        root.style.setProperty('--active-color-main', '#019AED');
        root.style.setProperty('--active-text-color-main', '#FFFEFA');
        root.style.setProperty('--hover-color-main', '#019AED');
        root.style.setProperty('--hover-text-color-main', '#FFFEFA');


        root.style.setProperty('--background-color', '#FFFFFF');
        root.style.setProperty('--background-color-headings', '#000000');
        root.style.setProperty('--return-button-background-color', '#000000');
        root.style.setProperty('--return-button-text-color', '#FFFFFF');
        root.style.setProperty('--primary-color', '#2B2B2B');
        root.style.setProperty('--secondary-color', '#FFFFFF');
        root.style.setProperty('--navigation-buttons-border-color', '#2B2B2B');
        root.style.setProperty('--homepage-card-buttons-border-color', '#2B2B2B');
        root.style.setProperty('--hover-color', '#019AED');
        root.style.setProperty('--hover-text-color', '#FFFEFA');
        root.style.setProperty('--shadow', '#2B2B2B');


        root.style.setProperty('--primary-color-left-box', '#2B2B2B');
        root.style.setProperty('--secondary-color-left-box', '#FFFFFF');
        root.style.setProperty('--text-color-left-box', '#FFFFFF');
        root.style.setProperty('--hover-color-left-box', '#C8C8C8');
        root.style.setProperty('--hover-text-color-left-box', '#2B2B2B');
        root.style.setProperty('--homepage-left-card-button-border-color', '#2B2B2B');

        // event emission
        this.$emit('theme-changed', {
          theme: 'highContrast',
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
        this.currentResetIcon = 'resetIconHighContrast',
          this.currentSvgButton = 'svgButtonHighContrast'

      } else if (theme === 'originalInteractive') {
        this.currentTheme = 'originalInteractive'; // Update currentTheme

        root.style.setProperty('--active-color-main', '#828282');
        root.style.setProperty('--active-text-color-main', '#FFFEFA');
        root.style.setProperty('--hover-color-main', '#C8C8C8');
        root.style.setProperty('--hover-text-color-main', '#2B2B2B');


        root.style.setProperty('--background-color', '#FFFEFA');
        root.style.setProperty('--primary-color', '#D400A6');
        root.style.setProperty('--background-color-headings', '#FD5733');
        root.style.setProperty('--secondary-color', '#FFEDF4');
        root.style.setProperty('--navigation-buttons-border-color', '#F1AFDD');
        root.style.setProperty('--homepage-card-buttons-border-color', 'transparent');
        root.style.setProperty('--shadow', '#F1AFDD');
        root.style.setProperty('--hover-color', '#D400A6');
        root.style.setProperty('--hover-text-color', '#FFFFFF');

        root.style.setProperty('--primary-color-left-box', '#E7EB17');
        root.style.setProperty('--secondary-color-left-box', '#FCFCCE');
        root.style.setProperty('--text-color-left-box', '#D400A6');
        root.style.setProperty('--hover-color-left-box', '#E7EB17');
        root.style.setProperty('--hover-text-color-left-box', '#D400A6');
        root.style.setProperty('--homepage-left-card-button-border-color', 'transparent');


        this.$emit('theme-changed', {
          theme: 'originalInteractive',
          currentBackgroundLayer: 'background-layer',
        });


        this.currentNavAccessibilityIcon = 'nav-buttonAccessibilityIcon'
        this.currentIncreaseTextIcon = 'increaseTextIcon'
        this.currentDecreaseTextIcon = 'decreaseTextIcon'
        this.currentGrayScaleIcon = 'grayscaleIcon'
        this.currentHighContrastIcon = 'highContrastIcon'
        this.currentLinksUnderlineIcon = 'linksUnderlineIcon'
        this.currentReadableFontIcon = 'readableFontIcon'
        this.currentWcagColoursIcon = 'wcagColoursIcon'
        this.currentResetIcon = 'resetIcon'
        this.currentSvgButton = 'svgButtonDefault'

      } else {
        // Default theme
        this.currentTheme = 'default'; // Update currentTheme

        root.style.setProperty('--active-color-main', '#D400A6');
        root.style.setProperty('--active-text-color-main', '#FFFEFA');
        root.style.setProperty('--hover-color-main', '#FFEDF4');
        root.style.setProperty('--hover-text-color-main', '#000000');


        root.style.setProperty('--background-color', '#FFFEFA');
        root.style.setProperty('--background-color-headings', '#FD5733');
        root.style.setProperty('--return-button-background-color', '#FD5733');
        root.style.setProperty('--return-button-text-color', '#FFFEFA');
        root.style.setProperty('--primary-color', '#000000');
        root.style.setProperty('--secondary-color', '#FFFEFA');
        root.style.setProperty('--navigation-buttons-border-color', '#000000');
        root.style.setProperty('--homepage-card-buttons-border-color', '#000000');
        root.style.setProperty('--hover-color', '#E7F6FC');
        root.style.setProperty('--hover-text-color', '#000000');
        root.style.setProperty('--shadow', '#000000');


        root.style.setProperty('--primary-color-left-box', '#000000');
        root.style.setProperty('--secondary-color-left-box', '#FFFEFA');
        root.style.setProperty('--text-color-left-box', '#FFFEFA');
        root.style.setProperty('--hover-color-left-box', '#E7F6FC');
        root.style.setProperty('--hover-text-color-left-box', '#000000');
        root.style.setProperty('--homepage-left-card-button-border-color', '#000000');




        // event emission
        this.$emit('theme-changed', {
          theme: 'default',
          currentBackgroundLayer: 'background-layer-default',
        });


        this.currentNavAccessibilityIcon = 'nav-buttonAccessibilityIcon'
        this.currentIncreaseTextIcon = 'increaseTextIcon'
        this.currentDecreaseTextIcon = 'decreaseTextIcon'
        this.currentGrayScaleIcon = 'grayscaleIcon'
        this.currentHighContrastIcon = 'highContrastIcon'
        this.currentLinksUnderlineIcon = 'linksUnderlineIcon'
        this.currentReadableFontIcon = 'readableFontIcon'
        this.currentWcagColoursIcon = 'wcagColoursIcon'
        this.currentResetIcon = 'resetIcon'
        this.currentSvgButton = 'svgButtonDefault'

      }
    },


    saveSettings(additionalSettings = {}) {
      // Get existing settings from localStorage
      const existingSettings = JSON.parse(localStorage.getItem('accessibilitySettings')) || {};

      // Merge existing settings with new settings
      const settings = {
        ...existingSettings,
        interactiveMode: this.interactiveMode,
        isMenuVisible: this.isMenuVisible,
        fontSize: this.fontSize,
        baseFontSize: this.baseFontSize,
        linkDecoration: this.linkDecoration,
        readableFont: this.readableFont,
        currentTheme: this.currentTheme,
        currentIncreaseTextIcon: this.currentIncreaseTextIcon,
        currentDecreaseTextIcon: this.currentDecreaseTextIcon,
        currentGrayScaleIcon: this.currentGrayScaleIcon,
        currentHighContrastIcon: this.currentHighContrastIcon,
        currentLinksUnderlineIcon: this.currentLinksUnderlineIcon,
        currentReadableFontIcon: this.currentReadableFontIcon,
        currentWcagColoursIcon: this.currentWcagColoursIcon,
        currentResetIcon: this.currentResetIcon,
        ...additionalSettings, // Merge additional settings (e.g., isNotificationVisible)
      };

      // Save the merged settings back to localStorage
      try {
        localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
      } catch (error) {
        console.error('Failed to save settings to localStorage:', error);
      }
    },


    /////

    loadSettings() {
      const savedSettings = localStorage.getItem('accessibilitySettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        console.log('AccessibilityMenu: Loaded settings from localStorage:', settings);

        this.isMenuVisible = settings.isMenuVisible ?? this.isMenuVisible,

          this.fontSize = parseFloat(settings.fontSize) || 1;
        document.documentElement.style.setProperty('--font-scale', this.fontSize);
        // links decoration
        this.linkDecoration = settings.linkDecoration || this.linkDecoration,
          document.documentElement.style.setProperty("--link-decoration", this.linkDecoration);
        // readable font
        this.readableFont = settings.readableFont || this.readableFont,
          document.documentElement.style.setProperty("--font-family-Decorative", this.readableFont);
        // load current theme
        this.currentTheme = settings.currentTheme || this.currentTheme; // Load the current theme
        this.applyTheme(this.currentTheme); // Apply the loaded theme



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

    dismissNotification() {
      this.localNotificationVisible = false;
      this.saveSettings({ isNotificationVisible: this.localNotificationVisible });
    },


    accessibilityMenuVisibility() {
      if (!this.isMenuVisible) {
        // Save the element that opened the menu
        this.lastFocusedElement = document.activeElement;
        this.isMenuVisible = true;

        // Use nextTick to ensure the DOM has rendered the menu before focusing
        this.$nextTick(() => {
          const heading = this.$el.querySelector('.accessiblityToolsHeading');
          if (heading) {
            heading.setAttribute('tabindex', '-1'); // Make H2 programmatically focusable
            heading.focus();
          }
        });
      } else {
        this.closeAndRestore();
      }
      this.saveSettings();
    },

    closeAndRestore() {
      this.isMenuVisible = false;
      // Restore focus to the toggle button
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }
    },


    increaseTextSize() {
      if (this.fontSize < 2) {
        this.fontSize = parseFloat((this.fontSize + 0.1).toFixed(2));
        document.documentElement.style.setProperty('--font-scale', this.fontSize);
        this.saveSettings();
        // this.updateContainerHeight();
      }
    },


    decreaseTextSize() {
      if (this.fontSize > 0.5) {
        this.fontSize = parseFloat((this.fontSize - 0.1).toFixed(2));
        document.documentElement.style.setProperty('--font-scale', this.fontSize);
        this.saveSettings();
        // this.updateContainerHeight();
      }
    },


    reset() {

      // Step 1: Safely capture the current base font size *before* wiping it
      this.baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

      // Step 2: Clear any inline font size
      document.documentElement.style.setProperty('--dynamic-font-size', '0.8vw'); // or your original default

      // Step 3: Reset font scale
      // this.fontSize = 1;
      // const pixelSize = this.baseFontSize * this.fontSize;
      this.fontSize = 1;
      document.documentElement.style.setProperty('--font-scale', this.fontSize);
      // this.updateContainerHeight();


      // Step 4: Reset custom link styles
      this.linkDecoration = "none";
      document.documentElement.style.setProperty("--link-decoration", this.linkDecoration);

      // Step 5: Reset font family
      this.readableFont = "'Kode Mono', sans-serif";
      document.documentElement.style.setProperty("--font-family-Decorative", this.readableFont);


      // Step 6: Reset notification UI
      this.localNotificationVisible = true;
      this.$emit('update-notification-visible', this.localNotificationVisible);

      // Step 7: Save updated preferences
      this.saveSettings({ isNotificationVisible: this.localNotificationVisible });

      // Optional: re-apply theme *at the end* if it doesn't conflict
      this.applyTheme();
      localStorage.removeItem('accessibilitySettings');
    },



    changeTograyscale() {
      this.applyTheme('grayscale');

      // Save the updated setting
      this.saveSettings();
    },

    changeToHighContrast() {
      this.applyTheme('highContrast');
      // Save the updated setting
      this.saveSettings();
    },

    changeToWCAGcolors() {
      this.applyTheme('wcag');
      // Save the updated setting
      this.saveSettings();

    },

    changeToOriginalInteractive() {
      this.applyTheme('originalInteractive');
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
    activateReadableFont() {
      this.readableFont = "'Inter', sans-serif";
      document.documentElement.style.setProperty("--font-family-Decorative", this.readableFont);
      // Save the updated setting
      this.saveSettings();
    },
    // do not erase curly brackets below

  },
}

</script>

<style scoped>
.nav-buttonAccessibilityIcon {
  color: var(--primary-color);
  border-radius: 0.75rem;
  padding: 0.749rem 1.667rem;
  width: 3.125rem;
  height: 2.1875rem;
  background-image: url('/icons/personBlack.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: white;
  border: 1px solid var(--navigation-buttons-border-color);
  cursor: pointer;
}

.nav-buttonAccessibilityIcon:hover,
.nav-buttonAccessibilityIcon:focus-visible {
  background-image: url('/icons/personBlack.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: var(--hover-color-main);
  color: var(--primary-color);
  box-shadow: -4px 4px 0 0 var(--primary-color);
}

/* Estilo base para la Homepage (Ajusta los colores y propiedades según el diseño nuevo) */
.nav-buttonAccessibilityIcon-homepage {
  background-color: var(--background-color-main);
  /* O el color que te haya pedido */
  
  border: 1px solid var(--primary-border-color-main);
  background-image: url('/icons/personPurple.svg');
}

/* También puedes modificar el comportamiento del Hover/Focus exclusivo en la Homepage */
.nav-buttonAccessibilityIcon-homepage:hover,
.nav-buttonAccessibilityIcon-homepage:focus-visible {
  border: 1px solid var(--text-color-topbar-nav-button-hover);
  background-color: var(--background-color-main);
  background-image: url('/icons/personWhite.svg');


  /* box-shadow: -4px 4px 0 0 var(--secondary-color); */
}



.navAccessibilityButtonGrayscaleColorPalette {
  background-color: transparent;
  background-image: url('/icons/personGray.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

}


.navAccessibilityButtonGrayscaleColorPalette:hover {
  background-color: transparent;
  background-image: url('/icons/personBlack.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  color: var(--primary-color);
  box-shadow: -3px 3px 0 0 var(--shadow);
}

.navAccessibilityButtonHighContrastColorPalette {
  background-color: transparent;
  background-image: url('/icons/personBlack.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

}

.navAccessibilityButtonHighContrastColorPalette:hover {
  background-color: transparent;
  background-image: url('/icons/personBlack.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  color: var(--primary-color);
  box-shadow: -3px 3px 0 0 var(--shadow);
}

.navAccessibilityButtonWCAGcolorPalette {
  background-color: transparent;
  background-image: url('/icons/personWCAG.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.navAccessibilityButtonWCAGcolorPalette:hover {
  background-color: transparent;
  background-image: url('/icons/personWCAG.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  color: var(--primary-color);
  box-shadow: -3px 3px 0 0 var(--shadow);
}


/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}



/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  /* width: 22.569vw; */
  width: 20.31rem;
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  gap: 0.625rem;
  background-color: white;
  border: 1px solid var(--navigation-buttons-border-color);
  border-radius: 15px 15px 5px 5px;
  position: absolute;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 4;
  cursor: pointer;
}

.accessiblityToolsHeading {
  padding: 0.6875rem 0.875rem;
  border-radius: 10px;
  background-color: var(--primary-color);
  color: white;
  font-family: var(--font-family-Decorative);
  /* Uses Handjet by default */
  font-size: 1.25rem;
  font-weight: 400;
  text-align: center;
  cursor: default;
}


.accessibilityButtonDiv {
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  display: flex;
  border: none;
  border-radius: 10px;
  color: var(--primary-color);
  /* background-color: var(--secondary-color); */
  background-color: transparent;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  font-size: 1.5rem;
  /* min, preferred, max */
  font-weight: 500;
}


.accessibilityButtonDiv:hover {
  color: var(--hover-text-color);
}

.svgButtonDefault {
  fill: var(--secondary-color);
  stroke: var(--navigation-buttons-border-color);
}

.svgButtonDefault:hover {
  fill: var(--hover-color);
}


.svgButtonGray {
  fill: var(--secondary-color);
}

.svgButtonGray:hover {
  fill: var(--hover-color);
}

.svgButtonHighContrast {
  fill: var(--secondary-color);
}

.svgButtonHighContrast:hover {
  fill: var(--hover-color);
}

/*  */
.svgButtonHomepage {
  fill: var(--secondary-color);
  stroke: var(--navigation-buttons-border-color);
}

.svgButtonHomepage:hover {
  fill: var(--hover-color-main);
}


a {
  text-decoration: var(--link-decoration, none);
  /* Default: No underline */
}

/* Medium desktops / laptops (<= 1400px) */
@media (max-width: 1400px) {

  .increaseTextIcon,
  .increaseTextIconPink,
  .increaseTextIconGray,
  .increaseTextIconHighContrast,
  .increaseTextIconWCAG {
    margin-right: 0.3rem;
  }

  .decreaseTextIcon,
  .decreaseTextIconPink,
  .decreaseTextIconGray,
  .decreaseTextIconHighContrast,
  .decreaseTextIconWCAG {
    margin-right: 0.3rem;
  }

  .grayscaleIcon,
  .grayscaleIconPink,
  .grayscaleIconGray,
  .grayscaleIconHighContrast,
  .grayscaleIconWCAG {
    margin-right: 0.3rem;
  }

  .highContrastIcon,
  .highContrastIconPink,
  .highContrastIconGray,
  .highContrastIconHighContrast,
  .highContrastIconWCAG {
    margin-right: 0.3rem;
  }

  .linksUnderlineIcon,
  .linksUnderlineIconPink,
  .linksUnderlineIconGray,
  .linksUnderlineIconHighContrast,
  .linksUnderlineIconWCAG {
    margin-right: 0.3rem;
  }

  .readableFontIcon,
  .readableFontIconPink,
  .readableFontIconGray,
  .readableFontIconHighContrast,
  .readableFontIconWCAG {
    margin-right: 0.3rem;
  }

  .wcagColoursIcon,
  .wcagColoursIconPink,
  .wcagColoursIconGray,
  .wcagColoursIconHighContrast,
  .wcagColoursIconWCAG {
    margin-right: 0.3rem;
  }

  .resetIcon,
  .resetIconPink,
  .resetIconGray,
  .resetIconHighContrast,
  .resetIconWCAG {
    margin-right: 0.3rem;
  }
}

.increaseTextIcon {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/IncreaseTextIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.increaseTextIconPink {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/IncreaseTextIcon.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}


.increaseTextIconGray {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/IncreaseTextIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}


.increaseTextIconHighContrast {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/IncreaseTextIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.increaseTextIconWCAG {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/IncreaseTextIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.decreaseTextIcon {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/decreaseTextIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.decreaseTextIconPink {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/decreaseTextIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.decreaseTextIconGray {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/decreaseTextIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}


.decreaseTextIconHighContrast {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/decreaseTextIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}


.decreaseTextIconWCAG {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/decreaseTextIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.grayscaleIcon {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/grayscaleIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}


.grayscaleIconPink {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/grayscaleIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.grayscaleIconGray {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/grayscaleIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.grayscaleIconHighContrast {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/grayscaleIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.grayscaleIconWCAG {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/grayscaleIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.10em;
}

.highContrastIcon {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/highContrastIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}



.highContrastIconPink {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/highContrastIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.highContrastIconGray {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/highContrastIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.highContrastIconHighContrast {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/highContrastIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}


.highContrastIconWCAG {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/highContrastIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}


.linksUnderlineIcon {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/linksUnderlineIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}


.linksUnderlineIconPink {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/linksUnderlineIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

}

.linksUnderlineIconGray {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/linksUnderlineIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.linksUnderlineIconHighContrast {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/linksUnderlineIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.linksUnderlineIconWCAG {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/linksUnderlineIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.readableFontIcon {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/readableFontIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.readableFontIconPink {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/readableFontIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.readableFontIconGray {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/readableFontIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.readableFontIconHighContrast {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/readableFontIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.readableFontIconWCAG {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/readableFontIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.wcagColoursIcon {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/wcagColorsIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.wcagColoursIconPink {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/wcagColorsIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.wcagColoursIconGray {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/wcagColorsIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.wcagColoursIconHighContrast {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/wcagColorsIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.wcagColoursIconWCAG {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/wcagColorsIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.resetIcon {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/resetIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.resetIconPink {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/resetIconPink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}


.resetIconGray {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/resetIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.resetIconHighContrast {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/resetIconBlack.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.resetIconWCAG {
  width: 1rem;
  height: 1rem;
  background-image: url("/icons/resetIconWCAG.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

/* .accessibilityButtonDiv:hover .increaseTextIcon, */

.accessibilityButtonDiv:hover .increaseTextIconHighContrast,
.accessibilityButtonDiv:hover .increaseTextIconWCAG {
  background-image: url("/icons/IncreaseTextIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

/* .accessibilityButtonDiv:hover .decreaseTextIcon, */

.accessibilityButtonDiv:hover .decreaseTextIconHighContrast,
.accessibilityButtonDiv:hover .decreaseTextIconWCAG {
  background-image: url("/icons/decreaseTextIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

/* .accessibilityButtonDiv:hover .grayscaleIcon, */
.accessibilityButtonDiv:hover .grayscaleIconHighContrast,
.accessibilityButtonDiv:hover .grayscaleIconWCAG {
  background-image: url("/icons/grayscaleIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

/* .accessibilityButtonDiv:hover .highContrastIcon, */

.accessibilityButtonDiv:hover .highContrastIconHighContrast,
.accessibilityButtonDiv:hover .highContrastIconWCAG {
  background-image: url("/icons/highContrastIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

/* .accessibilityButtonDiv:hover .wcagColoursIcon, */

.accessibilityButtonDiv:hover .wcagColoursIconHighContrast,
.accessibilityButtonDiv:hover .wcagColoursIconWCAG {
  background-image: url("/icons/wcagColorsIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

/* .accessibilityButtonDiv:hover .linksUnderlineIcon, */

.accessibilityButtonDiv:hover .linksUnderlineIconHighContrast,
.accessibilityButtonDiv:hover .linksUnderlineIconWCAG {
  background-image: url("/icons/linksUnderlineIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

/* .accessibilityButtonDiv:hover .readableFontIcon, */

.accessibilityButtonDiv:hover .readableFontIconHighContrast,
.accessibilityButtonDiv:hover .readableFontIconWCAG {
  background-image: url("/icons/readableFontIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}



/* .accessibilityButtonDiv:hover .resetIcon, */

.accessibilityButtonDiv:hover .resetIconHighContrast,
.accessibilityButtonDiv:hover .resetIconWCAG {
  background-image: url("/icons/resetIconWhite.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

/* Change color of dropdown links on hover */
.dropdown-content p {
  flex-grow: 1;
}

/* Sticky left wrapper for accessibility button and menu */
.accessibility-sticky-wrapper {
  /* position: fixed; */
  /* right: clamp(18rem, 1vw, 18rem); */
  /* never smaller than 1rem, scales with vw, max 18rem */
  /* top: 3.5rem; */
  /* transform: translateY(-50%); */
  z-index: 1000;
  display: flex;
  /* flex-direction: column; */
  /* align-items: flex-start; */
}

/* Adjust dropdown to appear right of button */
.dropdown-content {

  /* Move menu to the right of the button */
  right: auto;
  top: 15.5rem;
  transform: translateY(-50%);
}
</style>

<template>
  <div class="accessibility-sticky-wrapper">
    <!-- Busca tu botón actual y cámbialo por este: -->
    <button :class="[
      'nav-buttonAccessibilityIcon',
      currentNavAccessibilityIcon,
      { 'nav-buttonAccessibilityIcon-homepage': isHomepage }
    ]" @click="accessibilityMenuVisibility" aria-label="Accessibility Menu">
    </button>
    <!-- accessibility menu -->
    <div v-show="isMenuVisible" class="dropdown-content" role="dialog" aria-modal="true"
      aria-labelledby="accessibility tools heading" ref="accessibilityMenu">
      <div>
        <h2 class="accessiblityToolsHeading">
          Accessibility Tools
        </h2>
      </div>



      <!-- buttons -->
      <svg :class="['svgButtonDefault', { svgButtonHomepage: isHomepage }]" viewBox="0 0 301 31" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 5C0 2.23858 2.23858 0 5 0H256C258.761 0 261 2.23858 261 5V7.07403C261.397 7.26364 261.785 7.49998 262.158 7.78584C264.425 9.52329 267.575 9.52329 269.842 7.78584C270.215 7.49998 270.603 7.26364 271 7.07403V7C271 3.13401 274.134 0 278 0H294C297.866 0 301 3.13401 301 7V24C301 27.866 297.866 31 294 31H278C274.134 31 271 27.866 271 24V22.4094C270.668 22.2029 270.348 21.9578 270.043 21.6723C267.769 19.5416 264.231 19.5416 261.957 21.6723C261.652 21.9578 261.332 22.2029 261 22.4095V26C261 28.7614 258.761 31 256 31H5.00001C2.23858 31 0 28.7614 0 26V5Z" />
        <foreignObject x="0" y="0" width="301" height="31">
          <button @click="increaseTextSize" class="accessibilityButtonDiv">
            <span>Increase Text</span>
            <span :class="currentIncreaseTextIcon" aria-hidden="true"></span>
          </button>
        </foreignObject>
      </svg>


      <svg :class="['svgButtonDefault', { svgButtonHomepage: isHomepage }]" viewBox="0 0 301 31" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 5C0 2.23858 2.23858 0 5 0H256C258.761 0 261 2.23858 261 5V7.07403C261.397 7.26364 261.785 7.49998 262.158 7.78584C264.425 9.52329 267.575 9.52329 269.842 7.78584C270.215 7.49998 270.603 7.26364 271 7.07403V7C271 3.13401 274.134 0 278 0H294C297.866 0 301 3.13401 301 7V24C301 27.866 297.866 31 294 31H278C274.134 31 271 27.866 271 24V22.4094C270.668 22.2029 270.348 21.9578 270.043 21.6723C267.769 19.5416 264.231 19.5416 261.957 21.6723C261.652 21.9578 261.332 22.2029 261 22.4095V26C261 28.7614 258.761 31 256 31H5.00001C2.23858 31 0 28.7614 0 26V5Z" />
        <foreignObject x="0" y="0" width="301" height="31">
          <button @click="decreaseTextSize" class="accessibilityButtonDiv">
            <span>Decrease Text</span>
            <span :class="currentDecreaseTextIcon" aria-hidden="true"></span>
          </button>
        </foreignObject>
      </svg>

      <svg :class="['svgButtonDefault', { svgButtonHomepage: isHomepage }]" viewBox="0 0 301 31" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 5C0 2.23858 2.23858 0 5 0H256C258.761 0 261 2.23858 261 5V7.07403C261.397 7.26364 261.785 7.49998 262.158 7.78584C264.425 9.52329 267.575 9.52329 269.842 7.78584C270.215 7.49998 270.603 7.26364 271 7.07403V7C271 3.13401 274.134 0 278 0H294C297.866 0 301 3.13401 301 7V24C301 27.866 297.866 31 294 31H278C274.134 31 271 27.866 271 24V22.4094C270.668 22.2029 270.348 21.9578 270.043 21.6723C267.769 19.5416 264.231 19.5416 261.957 21.6723C261.652 21.9578 261.332 22.2029 261 22.4095V26C261 28.7614 258.761 31 256 31H5.00001C2.23858 31 0 28.7614 0 26V5Z" />
        <foreignObject x="0" y="0" width="301" height="31">
          <button @click="changeTograyscale" class="accessibilityButtonDiv">
            <span>Grayscale</span>
            <span :class="currentGrayScaleIcon" aria-hidden="true"></span>
          </button>
        </foreignObject>
      </svg>



      <svg :class="['svgButtonDefault', { svgButtonHomepage: isHomepage }]" viewBox="0 0 301 31" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 5C0 2.23858 2.23858 0 5 0H256C258.761 0 261 2.23858 261 5V7.07403C261.397 7.26364 261.785 7.49998 262.158 7.78584C264.425 9.52329 267.575 9.52329 269.842 7.78584C270.215 7.49998 270.603 7.26364 271 7.07403V7C271 3.13401 274.134 0 278 0H294C297.866 0 301 3.13401 301 7V24C301 27.866 297.866 31 294 31H278C274.134 31 271 27.866 271 24V22.4094C270.668 22.2029 270.348 21.9578 270.043 21.6723C267.769 19.5416 264.231 19.5416 261.957 21.6723C261.652 21.9578 261.332 22.2029 261 22.4095V26C261 28.7614 258.761 31 256 31H5.00001C2.23858 31 0 28.7614 0 26V5Z" />
        <foreignObject x="0" y="0" width="301" height="31">
          <button @click="changeToHighContrast" class="accessibilityButtonDiv">
            <span>High Contrast</span>
            <span :class="currentHighContrastIcon" aria-hidden="true"></span>
          </button>
        </foreignObject>
      </svg>



      <svg :class="['svgButtonDefault', { svgButtonHomepage: isHomepage }]" viewBox="0 0 301 31" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 5C0 2.23858 2.23858 0 5 0H256C258.761 0 261 2.23858 261 5V7.07403C261.397 7.26364 261.785 7.49998 262.158 7.78584C264.425 9.52329 267.575 9.52329 269.842 7.78584C270.215 7.49998 270.603 7.26364 271 7.07403V7C271 3.13401 274.134 0 278 0H294C297.866 0 301 3.13401 301 7V24C301 27.866 297.866 31 294 31H278C274.134 31 271 27.866 271 24V22.4094C270.668 22.2029 270.348 21.9578 270.043 21.6723C267.769 19.5416 264.231 19.5416 261.957 21.6723C261.652 21.9578 261.332 22.2029 261 22.4095V26C261 28.7614 258.761 31 256 31H5.00001C2.23858 31 0 28.7614 0 26V5Z" />
        <foreignObject x="0" y="0" width="301" height="31">
          <button @click="activateLinksUnderline" class="accessibilityButtonDiv">
            <span>Links Underline</span>
            <span :class="currentLinksUnderlineIcon" aria-hidden="true"></span>
          </button>
        </foreignObject>
      </svg>




      <svg :class="['svgButtonDefault', { svgButtonHomepage: isHomepage }]" viewBox="0 0 301 31" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 5C0 2.23858 2.23858 0 5 0H256C258.761 0 261 2.23858 261 5V7.07403C261.397 7.26364 261.785 7.49998 262.158 7.78584C264.425 9.52329 267.575 9.52329 269.842 7.78584C270.215 7.49998 270.603 7.26364 271 7.07403V7C271 3.13401 274.134 0 278 0H294C297.866 0 301 3.13401 301 7V24C301 27.866 297.866 31 294 31H278C274.134 31 271 27.866 271 24V22.4094C270.668 22.2029 270.348 21.9578 270.043 21.6723C267.769 19.5416 264.231 19.5416 261.957 21.6723C261.652 21.9578 261.332 22.2029 261 22.4095V26C261 28.7614 258.761 31 256 31H5.00001C2.23858 31 0 28.7614 0 26V5Z" />
        <foreignObject x="0" y="0" width="301" height="31">
          <button @click="activateReadableFont" class="accessibilityButtonDiv">
            <span>Readable Font</span>
            <span :class="currentReadableFontIcon" aria-hidden="true"></span>
          </button>
        </foreignObject>
      </svg>



      <svg :class="['svgButtonDefault', { svgButtonHomepage: isHomepage }]" viewBox="0 0 301 31" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 5C0 2.23858 2.23858 0 5 0H256C258.761 0 261 2.23858 261 5V7.07403C261.397 7.26364 261.785 7.49998 262.158 7.78584C264.425 9.52329 267.575 9.52329 269.842 7.78584C270.215 7.49998 270.603 7.26364 271 7.07403V7C271 3.13401 274.134 0 278 0H294C297.866 0 301 3.13401 301 7V24C301 27.866 297.866 31 294 31H278C274.134 31 271 27.866 271 24V22.4094C270.668 22.2029 270.348 21.9578 270.043 21.6723C267.769 19.5416 264.231 19.5416 261.957 21.6723C261.652 21.9578 261.332 22.2029 261 22.4095V26C261 28.7614 258.761 31 256 31H5.00001C2.23858 31 0 28.7614 0 26V5Z" />
        <foreignObject x="0" y="0" width="301" height="31">
          <button @click="reset" class="accessibilityButtonDiv">
            <span>Reset</span>
            <span :class="currentResetIcon" aria-hidden="true"></span>
          </button>
        </foreignObject>
      </svg>
    </div>
  </div>
</template>