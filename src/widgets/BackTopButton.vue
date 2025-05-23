<script>
export default {
  data() {
    return {
    }
  },
  methods: {


    scrollToTop() {
      window.scrollTo({
        top: 0, // Scroll to the top of the page
        behavior: 'smooth', // Smooth scrolling animation
      });
    },

    // do not erase curly brackets below
  },
}

</script>

<style>
.backTop {
  display: flex;
  padding: 1rem;
  margin-top: auto;
}

.backTop button {
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  font-family: 'Inter', sans-serif;
  border-radius: 8px;
  padding: 0.125rem;
  cursor: pointer;
  /* transition: background-color 0.3s ease; */
}

/* .backTop button:hover {
  background-color: #A80084;
} */
</style>

<template>
  <div class="backTop">
    <div style="width:93%"></div>
    <button @click="scrollToTop">^ Back to Top</button>
  </div>

</template>