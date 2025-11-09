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
        }
    }
}

</script>

<style scoped>


.simpleButton {
  display: inline-flex;
  align-items: center;
  background-color: var(--background-color);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
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