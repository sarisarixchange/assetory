<script>
import Footer from '../components/Footer.vue'; // Import the Footer component
import Topbar from '../components/Topbar.vue'; // Import the Topbar component
import BackTopButton from '../widgets/BackTopButton.vue';  

import collectionsData from '../data/artists.json';


 export default {
  components: {
    Footer, // Register the Footer component
    Topbar, // Register the Topbar component
    BackTopButton
 },
  data() {
        return {
      currentTheme: { theme: 'default' }, // Default theme
      collection: null, // Holds the data for the selected    
    } 
  },

  
  mounted() {
  const collectionId = parseInt(this.$route.params.id, 10);
  this.collection = collectionsData.find((item) => item.id === collectionId);
  // console.log('Loaded collection:', this.collection);
  // if (this.collection) {
  //   console.log('Banner Image:', this.collection.bannerImage);
  // }
},

computed: {

  resolvedBannerImage() {
    return this.collection ? `../images/artists/` + this.collection.bannerImage : '';
  }, 
  
  // resolvedYoutubeUrl() {
  //   return this.collection && this.collection.youtubeUrl
  //     ? `https://www.youtube.com/embed/${this.extractYoutubeId(this.collection.youtubeUrl)}`
  //     : '';
  // },
  resolvedAssets() {
    return this.collection
      ? this.collection.assets.map((asset) => ({
          ...asset,
          thumbnail: `../images/artists/${asset.thumbnail}`, // Resolve the full path for the thumbnail
        }))
      : [];
  },
},

    methods: {

  resolveCardImage(imagePath) {
    return imagePath ? `../images/artists/${imagePath}` : '';
  },


      resolveYoutubeUrl(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : '';
  },

      extractYoutubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  },
      updateTheme(payload) {
      this.currentTheme = payload; // Update the theme
    },

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
   

/* return button */
.returnButton {
    padding-left: 0.25rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.returnButton button {
 
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  font-family: 'Inter', sans-serif;
  border-radius: 8px;
  padding: 0.125rem;
  cursor: pointer;
  /* transition: background-color 0.3s ease; */
}


/* collection details */
.collection-details-container{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 12rem;
  margin-right: 12rem;
  margin-bottom: 2rem;
  color: var(--primary-color);
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
}



/* filepath: /home/luis/sari-sari-website/assetory/src/pages/Artist.vue */
.image-banner-background {
  width: 100%;
  background-image: url('/backgrounds/flowersDefault.png'); /* Set the background image */
  background-size: contain; /* Ensures the background image covers the entire container */
  background-position: center; /* Centers the background image */
  background-repeat: no-repeat; /* Prevents the background image from repeating */
  display: flex; /* Allows child elements to be aligned */
  justify-content: center; /* Centers the child horizontally */
  align-items: center; /* Centers the child vertically */
}

.image-banner {
  width: 30%;
  border: 1px solid var(--primary-color);
  border-radius: 20px;
  overflow: hidden; /* Ensures the image doesn't overflow the container */
  display: flex; /* Optional: Ensures proper alignment */
  align-items: center; /* Optional: Centers the image vertically */
  justify-content: center; /* Optional: Centers the image horizontally */
  padding: 0.25rem;
}

.banner-image {  
  width: 100%; /* Make the image fill the container horizontally */
  /* object-fit: cover; */
  background-color: var(--secondary-color);
  border-radius: 20px;
}

.collection-details{
    display: flex;
    flex-direction: column;
    border: 1px solid var(--primary-color);;
    border-radius: 20px; 
    padding: 1rem;
    gap: 1rem;
}

.collection-details h2{
  font-size: 1.5rem;
  font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
}

.collection-details h3{
  font-size: 1rem;
  font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
}

.collection-top-description{
    display: flex;    
    gap: 1rem; 
    align-items: center; /* Vertically align items */
}

.collection-top-text {
  flex: 1; /* Allow the text to take up available space */
}

.collection-right-image {
  flex: 1; /* Make the image take up 50% of the container */
  max-width: 100%; /* Ensure the image doesn't overflow */
  height: auto; /* Maintain the aspect ratio of the image */
  background-color: var(--secondary-color);
  border-radius: 20px; 
}

.collection-right-video {
  flex: 1; /* Allow the video to take up available space */
  max-width: 100%; /* Ensure the video doesn't overflow */
  height: auto; /* Maintain the aspect ratio */
  aspect-ratio: 16 / 9; /* Ensure the video has a 16:9 aspect ratio */
  border-radius: 20px;
  border: 1px solid var(--primary-color);
  background-color: var(--secondary-color);
}

/* Handle cases where only the text is present */
.collection-top-description.no-image .collection-top-text {
  flex: 1 1 100%; /* Take up the full width */
}

/* Handle cases where only the image is present */
.collection-top-description.no-text .collection-right-image {
  flex: 1 1 100%; /* Take up the full width */
}

/* collection cards */

.collection-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Space between cards */
  margin-top: 2rem;
}

.collection-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  padding: 1rem;
  background-color: var(--secondary-color);
}

.collection-card-heading {
  flex: 0 0 auto; /* Ensure the heading stays at the top */
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem; /* Add spacing below the heading */
}

.collection-card-content {
  display: flex;
  flex-direction: column; /* Default: stacked layout */
  gap: 1rem;
}

 .side-by-side {
  flex-direction: row; /* Side-by-side layout */
  align-items: center; /* Vertically align items */
}





.collection-card-text {
  display: flex;
  font-family: 'Inter', sans-serif;
  color: var(--primary-color);
}

.collection-card-image {
  /* width: 50%; */
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.collection-card-video {
  /* width: 50%; */
  height: auto;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  border: 1px solid var(--primary-color);
}

.collection-assets {
    text-align: center;

}

.collection-assets h2{
  font-size: 1.5rem;
    font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
}

.collection-assets-card-container{
   /* display: flex; */
   display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns */
   gap: 1rem;

}
/* 
.collections-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem; 
  margin-top: 1.5rem;
  padding-left: 4rem;
  padding-right: 4rem;
} */


.collection-assets-card {
  /* width: 18.30rem; */
  width: 100%;
  height: 15rem;
  border: 1px solid  var(--primary-color);
  border-radius: 8px;
  color:  var(--primary-color);;
  margin-bottom: 0.35em;
  padding: 1rem;
}

.collection-assets-image {
  width: 100%;
  height: 100%;
  background-color: var(--secondary-color);
  object-fit: cover; /* Ensures the image covers the container without distortion */
  box-sizing: border-box; /* Includes padding in the element's total size */
  border-radius: 8px; /* Optional: Add rounded corners */
}
    
/* back to top button */

.backTop{
  display: flex;
 padding: 1rem;
}

.backTop button {
  background-color: transparent;
  color:  var(--primary-color);;
  border: 1px solid  var(--primary-color);
  font-family: 'Inter', sans-serif;
  border-radius: 8px;
  padding: 0.125rem;
  cursor: pointer;
  /* transition: background-color 0.3s ease; */
}

.social-media-item {
  margin-right: 1rem; /* Add spacing between items */
}
    </style >


  
 

<template>
  <div class="page-container">
           
                
        <!-- top bar -->
        <Topbar @theme-changed="updateTheme" />

            <!-- return button -->
            <div class="">
        <div class="returnButton">
        <router-link to="/artists" class="nav-button">Return <</router-link>          
        </div>
   </div>

      
      <div v-if="collection" class="collection-details-container">
      <!-- Image banner -->  

      <div class="image-banner-background">
      <div class="image-banner">
        <img :src="resolvedBannerImage" alt="Banner Image" class="banner-image">
      </div>
      </div>

      <!-- Collection details -->

      <div class="collection-details">
        <h2>{{ collection.title }}</h2>

        <div class="collection-cards">
  <div
    v-for="(card, index) in collection.cards"
    :key="index"
    class="collection-card"

  >
    <!-- Card heading -->
      <h3 v-if="card.heading" v-html="card.heading"
      class="collection-card-heading"></h3>

      <!-- Card content (description, image, or video) -->
  <div :class="{ 'side-by-side': card.contentSideBySide }" class="collection-card-content">

    <!-- social media links -->
<p v-if="card.social && typeof card.social === 'object'">
  <span v-for="(value, key) in card.social" :key="key" class="social-media-item">
    <strong>{{ key }}:</strong> {{ value}}  
  </span>
</p>
<p v-else-if="card.social" v-html="card.social"></p>

    <!-- Card Description -->
    <p v-if="card.description" v-html="card.description" class="collection-card-text"></p>



    <!-- YouTube Video -->
    <iframe
      v-if="card.youtubeUrl"
      :src="resolveYoutubeUrl(card.youtubeUrl)"
      class="collection-card-video"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>

    <!-- Image -->
    <img
      v-else-if="card.image"
      :src="resolveCardImage(card.image)"
      alt="Card Image"
      class="collection-card-image"
    >
  </div>
</div>
</div>

      
        </div>

        <div class="collection-assets">
            <h2>Assets</h2>
            <div class="collection-assets-card-container">
              
              <div
  v-for="(asset, index) in resolvedAssets"
  :key="index"
  class="collection-assets-card"
>
  <router-link
    :to="{ name: 'Asset', params: { 
        artistId: collection.id,
        artistAssetId: asset.name 
      }, 
        query: {
          fromPage: 'Artist',
          pageId: collection.id
         }
         }"


    class="collection-assets-link"
  >
    <img :src="asset.thumbnail" :alt="asset.name" class="collection-assets-image" />
  </router-link>
</div>
  
        </div>
        </div>
    </div>
    <div v-else class="collection-details-container">
    <p>Collection not found.</p>
  </div>

  <!-- back to top button -->
<BackTopButton />

      <!-- footer -->

    <Footer :theme="currentTheme"/>
</div>
</template>