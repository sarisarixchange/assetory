<script>
import Footer from '../components/Footer.vue'; // Import the Footer component
import Topbar from '../components/Topbar.vue'; // Import the Topbar component


 export default {
  components: {
    Footer, // Register the Footer component
    Topbar, // Register the Topbar component
  },
  
    data() {
        return {          
          // collections
          searchQuery: "", // Holds the user's search input
          collections: [
        { image: "", linkText: "Luis Title" },
        { image: "", linkText: "Collection Title" },
        { image: "", linkText: "Collection Title" },
        { image: "", linkText: "Collection Title" },
        { image: "", linkText: "Collection Title" },
        { image: "", linkText: "Collection Title" },
        { image: "", linkText: "Collection Title" },
        { image: "", linkText: "Collection Title" },
        { image: "", linkText: "Collection Title" },
      ],          
    } 
  },

  computed: {
    filteredCollections() {
      // Filter collections based on the search query
      return this.collections.filter((collection) =>
        collection.linkText.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
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

/* searchbar */

.heading-and-searchbar{
  color: var(--primary-color);
  width: 100%;
  margin-top: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center; 
}

.heading-and-searchbar input[type=text]{
  font-family: 'Inter', sans-serif;
 border: 1px solid var(--primary-color);
 border-radius: 2rem;
 font-size: 0.75rem;
 padding: 0.25rem;
}

.collections-heading h2{
  font-family: var(--font-family, 'Handjet'), sans-serif; 
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns */
  gap: 1rem; /* Space between cards */
  margin-top: 1.5rem;
  padding-left: 4rem;
  padding-right: 4rem;
}

.collectionCard {
  padding: 1.8%;
  border-radius: 12px;
  border: 1px solid var(--primary-color);
  box-shadow: -6px 6px 0 var(--shadow), 0 6px 1px var(--shadow);
  background-color: #fff;
}

.collectionCardContent {
  /* width: 18.30rem; */
  height: 15rem;
  border-radius: 8px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  margin-bottom: 0.35em;
  padding: 1rem;
}

.collectionCardContentGoTo{
  display: flex;
  border-radius: 8px;
  font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
  color: var(--primary-color);
  font-size: 0.8rem;
  background-color: var(--secondary-color);
  padding: 1.75%;
}

.collectionCardContentLink{
margin-left: 0.5em;
width:90%;
color: var(--primary-color);
display: flex;
justify-content: space-between; /* or use margin-left: auto on .ok-action */
width: 100%; /* or any fixed width you prefer */
}

.collectionCardContentGoTo:hover {
  background-color: var(--hover-color);
}

.collectionCardContentGoTo:hover .collectionCardContentLink {
  color: var(--hover-text-color);
}

.backTop{
  display: flex;
 padding: 1rem;
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
  <div class="container">
        <!-- <div :class="[background-layer, currentBackgroundLayer]" aria-hidden="true"></div> New background layer -->

<!-- top bar -->
 <Topbar />

      <!-- collections heading and searchbar -->
      <div class="heading-and-searchbar">
        <div class="collections-heading">
        <h2>Collections</h2>
        <p>Curated assets created by the community.</p>
        </div>
<!-- searchbar -->
<input
    type="text"
    placeholder="Search ..."
    v-model="searchQuery" 
  />      </div>

 <!-- Collections Grid -->
 <div class="collections-grid">
      <div class="collectionCard" v-for="(collection, index) in filteredCollections" :key="index">
        <div class="collectionCardContent">
          <img :src="collection.image" alt="Collection Image" class="collectionCardContentImage">
        </div>
        <div class="collectionCardContentGoTo">
          <router-link
        :to="{ name: 'Collection', params: { id: index } }"
        class="collectionCardContentLink"
      >     
            <span class="learn-more">{{ collection.linkText }}</span>
            <span class="ok-action" aria-hidden="true">></span>
          </router-link>
        </div>
      </div>
    </div>
      
    <div class="backTop">
      <div style="width:93%"></div>
      <button @click="scrollToTop">^ Back to Top</button>
        </div>
      <!-- footer -->

     <Footer />
</div>
</template>