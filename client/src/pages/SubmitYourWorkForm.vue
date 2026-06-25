<script setup>
import {ref} from "vue";
import Topbar from '../components/Topbar.vue'; // Import the Topbar component
import AssetForm from '../components/AssetForm.vue';


const interactiveMode = false;
// --- Reactive State ---
const currentBackgroundLayer = ref('background-layer');
const iconHoveredSrc = ref('/icons/arrow-right-black.svg');

// Left Box
const isDefaultCardVisible = ref(true);
const isPinkLeftCardIconVisible = ref(false);
const isGrayLeftCardIconVisible = ref(false);
const isHighContrastLeftCardIconVisible = ref(false);
const isWCAGLeftCardIconVisible = ref(false);

// Center-top-box images
const arePinkTopCenterCardSampleImagesVisible = ref(true);
const areGrayTopCenterCardSampleImagesVisible = ref(false);
const areHighContrastTopCenterCardSampleImagesVisible = ref(false);

// Other boxes icons
const isDecoractionCardSubtitleDefault = ref(true);
const isDecoractionCardSubtitlePink = ref(false);
const isDecoractionCardSubtitleGray = ref(false);
const isDecoractionCardSubtitleHighContrast = ref(false);
const isDecoractionCardSubtitleWCAG = ref(false);

// Footer images
const areFooterImagesDefaultVisible = ref(true);
const areFooterImagesGrayscaleVisible = ref(false);
const areFooterImagesHighContrastVisible = ref(false);
const areFooterImagesWCAGcolorsVisible = ref(false);

// --- The updateTheme Function ---
const updateTheme = (payload) => {
  if (payload.theme === "default") {
    currentBackgroundLayer.value = 'background-layer';
    isDefaultCardVisible.value = true;
    isPinkLeftCardIconVisible.value = false;
    isGrayLeftCardIconVisible.value = false;
    isHighContrastLeftCardIconVisible.value = false;
    isWCAGLeftCardIconVisible.value = false;
    arePinkTopCenterCardSampleImagesVisible.value = true;
    areGrayTopCenterCardSampleImagesVisible.value = false;
    areHighContrastTopCenterCardSampleImagesVisible.value = false;
    isDecoractionCardSubtitleDefault.value = true;
    isDecoractionCardSubtitlePink.value = false;
    isDecoractionCardSubtitleGray.value = false;
    isDecoractionCardSubtitleHighContrast.value = false;
    isDecoractionCardSubtitleWCAG.value = false;
    areFooterImagesDefaultVisible.value = true;
    areFooterImagesGrayscaleVisible.value = false;
    areFooterImagesHighContrastVisible.value = false;
    areFooterImagesWCAGcolorsVisible.value = false;
    iconHoveredSrc.value = '/icons/arrow-right-black.svg';

  } else if (payload.theme === "originalInteractive" || payload.theme === "grayscale") {
    // Combined these since they share mostly the same logic in your snippet
    isDefaultCardVisible.value = false;
    isPinkLeftCardIconVisible.value = (payload.theme === "originalInteractive");
    isGrayLeftCardIconVisible.value = true;
    isHighContrastLeftCardIconVisible.value = false;
    isWCAGLeftCardIconVisible.value = false;
    arePinkTopCenterCardSampleImagesVisible.value = false;
    areGrayTopCenterCardSampleImagesVisible.value = true;
    areHighContrastTopCenterCardSampleImagesVisible.value = false;
    isDecoractionCardSubtitleDefault.value = false;
    isDecoractionCardSubtitlePink.value = false;
    isDecoractionCardSubtitleGray.value = true;
    isDecoractionCardSubtitleHighContrast.value = false;
    isDecoractionCardSubtitleWCAG.value = false;
    areFooterImagesDefaultVisible.value = false;
    areFooterImagesGrayscaleVisible.value = true;
    areFooterImagesHighContrastVisible.value = false;
    areFooterImagesWCAGcolorsVisible.value = false;
    currentBackgroundLayer.value = 'background-layer-grayscale';
    iconHoveredSrc.value = '/icons/arrow-right-black.svg';

  } else if (payload.theme === "highContrast") {
    isDefaultCardVisible.value = false;
    isPinkLeftCardIconVisible.value = false;
    isGrayLeftCardIconVisible.value = false;
    isHighContrastLeftCardIconVisible.value = true;
    isWCAGLeftCardIconVisible.value = false;
    arePinkTopCenterCardSampleImagesVisible.value = false;
    areGrayTopCenterCardSampleImagesVisible.value = false;
    areHighContrastTopCenterCardSampleImagesVisible.value = true;
    isDecoractionCardSubtitleDefault.value = false;
    isDecoractionCardSubtitlePink.value = false;
    isDecoractionCardSubtitleGray.value = false;
    isDecoractionCardSubtitleHighContrast.value = true;
    isDecoractionCardSubtitleWCAG.value = false;
    areFooterImagesDefaultVisible.value = false;
    areFooterImagesGrayscaleVisible.value = false;
    areFooterImagesHighContrastVisible.value = true;
    areFooterImagesWCAGcolorsVisible.value = false;
    currentBackgroundLayer.value = 'background-layer-highContrast';
    iconHoveredSrc.value = '/icons/arrow-right-white.svg';
  }
};

</script>

<template>
  <Topbar :interactive-mode="interactiveMode" @theme-changed="updateTheme" pageTitle="Submit Your Work Page" />

  <AssetForm/>

</template>

