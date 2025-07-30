<script>
import Footer from '../components/Footer.vue'; // Import the Footer component
import Topbar from '../components/Topbar.vue'; // Import the Topbar component
import PageBackground from '../components/PageBackground.vue';
import BackTopButton from '../widgets/BackTopButton.vue';  
import collectionsData from '../data/artists.json';


 export default {
  components: {
    Footer, // Register the Footer component
    Topbar, // Register the Topbar component
    PageBackground,
    BackTopButton
 },
  data() {
        return {
      currentTheme: { theme: 'default' }, // Default theme
      collection: null, // Holds the data for the selected    
      backgrounds: {
         default: '../backgrounds/background-artist-page-default.png',
         grayscale: '../backgrounds/background-artist-page-grayscale.svg',
         highContrast: '../backgrounds/background-artist-page-high-contrast.svg',
         wcag: '../backgrounds/background-artist-page-default.svg'
  }
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
     .page-container {
  position: relative;
}

/* return button */
.returnButton {
    padding-left: 0.25rem;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
}

.returnButton button { 
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  font-family: 'Inter', sans-serif;
  font-size: var(--font-medium);
  font-weight: 400;

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


.image-banner {    
  overflow: hidden; /* Ensures the image doesn't overflow the container */
  display: flex; /* Optional: Ensures proper alignment */
  align-items: center; /* Optional: Centers the image vertically */
  justify-content: center; /* Optional: Centers the image horizontally */
}

.banner-image {  
  border: 1px solid var(--primary-color);
  border-radius: 20px;
  padding: 0.25rem;
}

.collection-details{
    display: flex;
    flex-direction: column;
    border: 1px solid var(--primary-color);;
    border-radius: 20px; 
    padding: 1rem;
    gap: 1rem;
}

/* heading of card */
.collection-details h2{
  font-family: var(--font-family, 'Handjet'), sans-serif; 
  font-size: var(--font-24px);
  font-weight: 400;
}

.collection-details h3{
  font-family: var(--font-family, 'Handjet'), sans-serif; 
  font-size: var(--font-base);
  font-weight: 400;
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
  font-size: var(--font-medium);
  font-weight: 400;
  color: var(--primary-color);
  margin-bottom: 0.5rem; /* Add spacing below the heading */
}

.collection-card-content {
  display: flex;
  flex-direction: column; /* Default: stacked layout */
  gap: 1rem;
}

 .side-by-side {
  flex-direction: row;
  align-items: center;
}


.collection-card-text {
  display: flex;
  font-family: 'Inter', sans-serif;
  font-size: var(--font-base);
  font-weight: 400;
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
   font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
   font-size: var(--font-medium);
   font-weight: 400;
}

.collection-assets-card-container{
   display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns */
   gap: 1rem;

}

.collection-assets-card {
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
    

.social-media-item {
  margin-right: 1rem; 
  font-size: var(--font-base);
  font-weight: 400;
}
    </style >


  
 

<template>
  <div class="page-container">
           
                
        <!-- top bar -->
        <Topbar @theme-changed="updateTheme" />


   
            <!-- return button -->
            
        <div class="returnButton">
        <router-link to="/artists" class="nav-button">Return <</router-link>          
        </div>
   

           <!-- background image  -->
           <PageBackground
    :theme="currentTheme.theme"
    :backgrounds="backgrounds"
    top="8%"
    left="10"
    width="100%"
    height="80%"
    backgroundSize= "80%"
    backgroundPosition= 'top'
  />
      <div v-if="collection" class="collection-details-container">
      <!-- Image banner -->  

      <div class="image-banner">
        <img :src="resolvedBannerImage" alt="Banner Image" class="banner-image">
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