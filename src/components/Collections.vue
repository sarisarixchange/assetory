<template>
    <div class="new-page">
      <h1>Welcome to the New Page</h1>
      <p>This page uses the same accessibility styles as the homepage.</p>
      <!-- Add your new page content here -->
    </div>
  </template>
  
  <script>
  export default {
    name: "NewPage",
    data() {
      return {
        // Add any data properties specific to this page
      };
    },
    mounted() {
      // Load accessibility settings from localStorage
      const savedSettings = localStorage.getItem("accessibilitySettings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
  
        // Apply the saved styles
        document.documentElement.style.fontSize = `${settings.baseFontSize * settings.fontSize}px`;
        document.documentElement.style.setProperty("--link-decoration", settings.linkDecoration || "none");
        document.documentElement.style.setProperty("--font-family", settings.readableFont || "'Inter', sans-serif");
        document.documentElement.style.setProperty("--marquee-item-gap", `${settings.baseGap || 50}rem`);
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add styles specific to this page */
  .new-page {
    padding: 2rem;
    font-family: var(--font-family, 'Inter', sans-serif);
  }
  </style>