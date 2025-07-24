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
        }
    }
}

</script>

<style scoped>


.SimpleButton {
  display: inline-block;
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  font-family: 'Inter', sans-serif;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;  
  box-shadow: 
    -6px 6px 0 var(--shadow),  /* Thick left border */
    0 6px 1px var(--shadow);   /* Thick bottom border */  
}


</style>

<template>
    <router-link :to="to" class="SimpleButton">
      {{ text }}
    </router-link>
  </template>