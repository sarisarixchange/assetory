<template>
    
   <div class="marquee-container">
            <div v-show="areFooterImagesDefaultVisible" class="marquee-images">
                <!-- First set of images -->
                <img :src="marqueeBasePath + 'item1-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item2-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item3-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item4-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item5-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item6-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item7-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item8-blue.png'" alt="" aria-hidden="true" class="marquee-image">

                <!-- Duplicate set for smooth infinite scroll -->
                <img :src="marqueeBasePath + 'item1-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item2-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item3-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item4-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item5-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item6-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item7-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item8-blue.png'" alt="" aria-hidden="true" class="marquee-image">

                <!-- Duplicate set for smooth infinite scroll -->
                <img :src="marqueeBasePath + 'item1-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item2-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item3-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item4-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item5-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item6-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item7-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item8-blue.png'" alt="" aria-hidden="true" class="marquee-image">


                <!-- Duplicate set for smooth infinite scroll -->
                <img :src="marqueeBasePath + 'item1-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item2-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item3-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item4-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item5-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item6-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item7-blue.png'" alt="" aria-hidden="true" class="marquee-image">
                <img :src="marqueeBasePath + 'item8-blue.png'" alt="" aria-hidden="true" class="marquee-image">
            </div>

           
            <div v-show="areFooterImagesGrayscaleVisible" class="marque-images">

                <img :src="marqueeBasePath + 'item1-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item2-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item3-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item4-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item5-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item6-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item7-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item8-gray.png'" alt="" class="marque-image">

                <img :src="marqueeBasePath + 'item1-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item2-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item3-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item4-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item5-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item6-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item7-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item8-gray.png'" alt="" class="marque-image">

                <img :src="marqueeBasePath + 'item1-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item2-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item3-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item4-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item5-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item6-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item7-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item8-gray.png'" alt="" class="marque-image">

                <img :src="marqueeBasePath + 'item1-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item2-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item3-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item4-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item5-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item6-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item7-gray.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item8-gray.png'" alt="" class="marque-image">
            </div>

            <div v-show="areFooterImagesHighContrastVisible" class="marque-images">

                <img :src="marqueeBasePath + 'item1-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item2-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item3-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item4-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item5-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item6-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item7-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item8-darkblue.png'" alt="" class="marque-image">

                <img :src="marqueeBasePath + 'item1-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item2-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item3-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item4-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item5-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item6-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item7-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item8-darkblue.png'" alt="" class="marque-image">

                <img :src="marqueeBasePath + 'item1-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item2-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item3-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item4-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item5-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item6-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item7-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item8-darkblue.png'" alt="" class="marque-image">

                <img :src="marqueeBasePath + 'item1-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item2-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item3-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item4-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item5-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item6-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item7-darkblue.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item8-darkblue.png'" alt="" class="marque-image">
            </div>


            <div v-show="areFooterImagesWCAGcolorsVisible" class="marque-images">

                <img :src="marqueeBasePath + 'item1-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item2-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item3-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item4-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item5-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item6-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item7-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item8-wcag.png'" alt="" class="marque-image">

                <img :src="marqueeBasePath + 'item1-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item2-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item3-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item4-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item5-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item6-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item7-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item8-wcag.png'" alt="" class="marque-image">

                <img :src="marqueeBasePath + 'item1-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item2-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item3-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item4-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item5-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item6-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item7-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item8-wcag.png'" alt="" class="marque-image">

                <img :src="marqueeBasePath + 'item1-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item2-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item3-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item4-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item5-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item6-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item7-wcag.png'" alt="" class="marque-image">
                <img :src="marqueeBasePath + 'item8-wcag.png'" alt="" class="marque-image">
            </div>

        </div>
</template>

<script>
export default {
  name: 'Marquee',
  props: {
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
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0%); }
}
</style>