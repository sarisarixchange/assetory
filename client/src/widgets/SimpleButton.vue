<script setup>

import { ref } from 'vue'


const props = defineProps({
  to: {
    type: [String, Object],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: null
  },
  backgroundColor: {
    type: String,
    default: 'var(--background-color)'
  },

  color: {
    type: String,
    default: 'var(--primary-color)'
  },

  borderColor: {
    type: String,
    default: 'var(--primary-color)'
  },

  backgroundColorHover: {
    type: String,
    default: 'var(--hover-color)'
  },
  textColorHover: {
    type: String,
    default: 'var(--hover-text-color)'
  },

  borderColorHover: {
    type: String,
    default: 'var(--primary-color)'
  },

  iconHover: {
    type: String,
    default: null
  },

  shadow: {
    type: String,
    default: '-6px 6px 0 var(--shadow), 0 6px 1px var(--shadow)'
  }
})

const isHovered = ref(false);


</script>

<style scoped>
.simpleButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: v-bind(backgroundColor);
  color: v-bind(color);
  border: 1px solid v-bind(borderColor);
  font-family: 'Inter', sans-serif;
  font-size: var(--font-base);
  font-weight: 600;
  border-radius: 0.625rem;
  padding: 0.5rem 1rem;
  cursor: pointer;

}

.simpleButton:hover {
  background-color: v-bind(BackgroundColorHover);
  color: v-bind(textColorHover);
  border-color: v-bind(borderColorHover);
  box-shadow: v-bind(shadow);

}

.btn-content {
  display: inline-flex;
  align-items: center;
  gap: 0.63rem;
}

.btn-icon {
  height: 1em;
  /* matches text height */
  width: auto;
  display: inline-block;
}
</style>

<template>
  <router-link :to="to" class="simpleButton" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <span class="btn-content">
      {{ text }}
      <img v-if="icon" :src="(isHovered && iconHover) ? iconHover : icon" alt="" class="btn-icon" />
      
    </span>

  </router-link>
</template>