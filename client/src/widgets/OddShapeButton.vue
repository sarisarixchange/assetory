<template>
    <!-- 1. Quitamos dimensiones fijas y añadimos preserveAspectRatio -->
    <svg class="svgDefaultButton" 
         viewBox="0 0 379 32" 
         preserveAspectRatio="none"
         xmlns="http://www.w3.org/2000/svg" 
         @mouseenter="isHovered = true"
         @mouseleave="isHovered = false">
        
        <!-- 2. Añadimos vector-effect="non-scaling-stroke" para que el borde no se engrose al estirarse -->
        <path class="oddShapeButton" 
            :fill="(isHovered || isFocused) ? hoverColor : fillColor" 
            :stroke="strokeColor" 
            :stroke-width="isFocused ? 3 : 1"
            vector-effect="non-scaling-stroke"
            d="M6 0.5H335.09C337.525 0.5 339.5 2.47463 339.5 4.91016V6.99707C339.5 7.4492 339.722 7.84826 340.041 8.11133C342.339 10.0084 345.661 10.0084 347.959 8.11133C348.278 7.84826 348.5 7.4492 348.5 6.99707V4.91016C348.5 2.47463 350.475 0.5 352.91 0.5H372C375.038 0.5 377.5 2.96243 377.5 6V25C377.5 28.0376 375.038 30.5 372 30.5H354C350.962 30.5 348.5 28.0376 348.5 25V22.168C348.5 21.8592 348.368 21.5818 348.17 21.3818C345.873 19.0646 342.127 19.0646 339.83 21.3818C339.632 21.5818 339.5 21.8592 339.5 22.168V25C339.5 28.0376 337.038 30.5 334 30.5H6C2.96244 30.5 0.5 28.0376 0.5 25V6C0.5 2.96243 2.96243 0.5 6 0.5Z" />

        <!-- 3. Hacemos que el contenedor de texto lea el 100% dinámico -->
        <foreignObject x="0" y="0" width="100%" height="100%">
            <router-link :to="to" class="button-text" @focus="isFocused = true" @blur="isFocused = false"
                :aria-label="label + ' ' + (iconAlt || '')"
                :style="{ color: (isHovered || isFocused) ? hoverTextColor : textColor }">
                <span class="label">{{ label }}</span>
                <img v-if="iconSrc" class="icon-img" :src="isHovered ? hoverIconSrc : iconSrc" :alt="iconAlt" />
                <span v-else-if="iconText" class="icon-text" aria-hidden="true">
                    {{ iconText }}
                </span>
            </router-link>
        </foreignObject>
    </svg>
</template>

<script setup>
import { ref } from 'vue'


const props = defineProps({
    to: { type: [String, Object], required: true },
    label: { type: String, default: 'Learn More' },
    iconText: { type: String, default: '→' },
    iconSrc: { type: String, default: '' },  // e.g. "/icons/arrow-right-black.svg"
    iconAlt: { type: String, default: 'button icon' },
    hoverIconSrc: String,   // <-- new
    fillColor: { type: String, default: 'var(--secondary-color-left-box)' },
    hoverColor: { type: String, default: 'var(--hover-color-left-box)' },
    strokeColor: { type: String, default: 'var(--homepage-left-card-button-border-color)' },
    textColor: { type: String, default: 'var(--primary-color)' },
    hoverTextColor: { type: String, default: 'var(--hover-text-color)' }
})

const isHovered = ref(false)
const isFocused = ref(false) // Track keyboard focus


</script>

<style scoped>
.svgDefaultButton {
    font-family: var(--font-family-Decorative);
    width: 100%;
    height: 100%;
    display: block;
}

.button-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--font-family-Decorative);
    font-weight: 600;
    /* color: var(--primary-color); */
    width: 100%;
    height: 100%;
    text-decoration: none;
    outline: none;
   
}


.label {
    /* background-color: aliceblue; */
    font-size: 1.5rem;
    /* padding-left: 0.5rem; */
    padding-right: 0.5rem;
    width: 92%;
    height: 100%;
    display: flex;
    flex-shrink: 0;
    /* color: var(--primary-color); */
    display: flex;
    /* justify-content: space-between; */
    border-radius: 0.5rem;
    align-items: center;
}

/* .button-text:hover {

    color: var(--hover-text-color);
} */



.iconText {
    font-family: var(--font-family-Decorative);
}



.icon-img {
    width: 1rem;
    height: 1rem;
    object-fit: contain;
    display: inline-block;
    /* margin-left: 0.5rem; */
}
</style>