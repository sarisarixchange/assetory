<template>
  <div class="logoSection">
    <img v-for="(logo, index) in logos" :key="index" :src="logo.src" :alt="logo.alt" class="logoImg">
  </div>
</template>

<script>
import logos from '../data/logos.json';

export default {
  name: "LogoSection",
  data() {
    return { logos };
  }
};
</script>

<style scoped>
.logoSection {
  padding: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* ✅ allows wr apping */
  gap: 2rem;
  margin-left: 1.78rem;
  margin-right: 1.78rem;
  border-radius: 1rem;
  margin-top: 1.5rem;
  border: 1px solid var(--primary-color);
  background: var(--background-color);
}

.logoImg {
  width: auto;
  height: 4rem;
  object-fit: contain;  
}

/* 
.logoSection {
    display: flex;
    flex-direction: column;
    text-align: center;
    border: 1px dashed var(--primary-color);
    border-radius: 44px;
    margin-top: 2rem;
}

.logosRow {
    display: flex;
    gap: 2rem;    
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
    padding: 1rem;
    flex-wrap: wrap;    
    justify-content: center;    
}

.logosRow img {
    max-width: 100%; 
    height: auto; 
    max-height: 100px; 
    object-fit: contain; 
} */
</style>
