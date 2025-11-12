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

<style scoped>
.backTop {
  margin-right: 15.94rem;
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  
}

.backTop button {
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: 0.5625rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  padding: 0.25rem 0.625rem;
  cursor: pointer;
  width: 8rem;
  height: 1.4375rem;
}

img {
  width: 0.68775rem;
  height: 0.45313rem;
}
</style>

<template>
  <div class="backTop">
    <div style="width:93%"></div>
    <button @click="scrollToTop">
      <span><img src="/icons/arrow-down-black.svg" aria-hidden="true" alt=""></img></span>
      <span> Back to Top </span>

    </button>
  </div>

</template>