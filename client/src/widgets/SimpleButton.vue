<script>
export default {
    name: 'SimpleButton',
    props: {
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
        }
    }
}

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
  background-color: var(--hover-color);
  color: var(--hover-text-color);
  box-shadow: 
    -6px 6px 0 var(--shadow),
    0 6px 1px var(--shadow);
}

.btn-content {
  display: inline-flex;
  align-items: center;
  gap: 0.63rem;
}

.btn-icon {
  height: 1em;       /* matches text height */
  width: auto;
  display: inline-block;
}



</style>

<template>
    <router-link :to="to" class="simpleButton">
      <span class="btn-content">        
      {{ text }}      
      <img v-if="icon" :src="icon" alt="" class="btn-icon" />
      </span>
    </router-link>
  </template>