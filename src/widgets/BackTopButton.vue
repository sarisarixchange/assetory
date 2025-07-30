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
  /* margin-top: auto; */
}

.backTop button {
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  font-family: 'Inter', sans-serif;
  font-size: var(--font-xs);
  font-weight: 500;
  border-radius: 9px;
  padding: 0.278vh 0.694vw;
  /* margin-bottom: 2.247vw; */
  cursor: pointer;
  width: 7.014vw;
  height: 2.154vh;
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