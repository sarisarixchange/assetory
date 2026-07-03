<template>
  <!-- marquee for main homepage -->
    <div v-if="isHomepage" class="marquee-container">
  <div v-show="areFooterImagesDefaultVisible" class="marquee-images">
    
    <template v-for="set in 4" :key="'set-' + set">
      <img 
        v-for="num in 8" 
        :key="'img-' + set + '-' + num"
        :src="`${marqueeBasePath}item${num}-no-filter.png`" 
        alt="" 
        aria-hidden="true" 
        class="marquee-image"
      />
    </template>

  </div>
</div>

  <!-- marquee for assetory homepage -->
    <div v-else class="marquee-container">
  <div v-show="areFooterImagesDefaultVisible" class="marquee-images">
    
    <template v-for="set in 4" :key="'set-' + set">
      <img 
        v-for="num in 8" 
        :key="'img-' + set + '-' + num"
        :src="`${marqueeBasePath}item${num}-blue.png`" 
        alt="" 
        aria-hidden="true" 
        class="marquee-image"
      />
    </template>

  </div>
</div>
  
 </template>

<script>

export default {
    name: 'Marquee',
    props: {
        isHomepage: { type: Boolean, default: false },
        marqueeBasePath: { type: String, default: 'images/marquee/' },
        areFooterImagesDefaultVisible: { type: Boolean, default: true },
        areFooterImagesGrayscaleVisible: { type: Boolean, default: false },
        areFooterImagesHighContrastVisible: { type: Boolean, default: false },
        areFooterImagesWCAGcolorsVisible: { type: Boolean, default: false }
    }
}
</script>

<style scoped>
.marquee-container {
    background-color: transparent;
    width: 100%;
    overflow: hidden;
}

.marquee-images {
    display: flex;
    gap: 1rem;
    animation: scroll 30s linear infinite;
    flex-wrap: nowrap;
}

.marquee-image {
    width: 4%;
    object-fit: contain;
    flex-shrink: 0;
}

@media (max-width: 1400px) {
    .marquee-image {
        width: 4%;
        object-fit: contain;
        flex-shrink: 0;
    }
}

@keyframes scroll {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(0%);
    }
}
</style>