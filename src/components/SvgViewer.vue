<template>
    <div class="svg-container">
      <div v-html="svgContent" class="svg-content"></div>
      <div ref="embeddedSvg" style="display: none;"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        svgContent: '',
      };
    },
    mounted() {
      this.loadSvg();
    },
    methods: {
      async loadSvg() {
        try {
          // Load main SVG
          const responseMain = await fetch('/main.svg');
          let mainSvgContent = await responseMain.text();
  
          // Load embedded SVG
          const responseEmbedded = await fetch('/home-menu.svg');
          const embeddedSvgContent = await responseEmbedded.text();

          const responseEmbeddedTwo = await fetch('/xyz-graph.svg');
          const embeddedSvgContentTwo = await responseEmbeddedTwo.text();

          const responseEmbeddedThree = await fetch('/connectors-right.svg');
          const embeddedSvgContentThree = await responseEmbeddedThree.text();
  
          // Inject embedded SVG into main SVG
          mainSvgContent = mainSvgContent.replace(
            '<!-- Placeholder for embedded SVG -->',
            `${embeddedSvgContent} ${embeddedSvgContentTwo} ${embeddedSvgContentThree}`
          );
  
          this.svgContent = mainSvgContent;
        } catch (error) {
          console.error('Error loading SVG:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .svg-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
  </style>