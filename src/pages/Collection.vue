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
      currentTheme: { theme: 'default' }, // Default theme
      collection: null, // Holds the data for the selected collection
      collections: [
        { id: 0, title: "Collection Title 1", firstImage: "", secondImage:"", topDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, dui nec tempor hendrerit, ligula eros vehicula dui, ut mattis odio orci id metus. Phasellus ornare diam nibh, in vehicula tortor volutpat nec. Nam luctus tincidunt enim, id vehicula ligula egestas efficitur. Aliquam fermentum id eros sit amet pretium. Nunc sit amet dolor eget justo maximus porta id non velit. Vivamus in gravida risus. Ut nec urna fringilla, aliquam turpis et, volutpat lacus. Maecenas ornare mattis felis, quis hendrerit tortor vulputate sit amet. Donec sed consectetur risus, ut venenatis tortor. Vestibulum feugiat lacinia scelerisque. Donec pulvinar arcu neque, nec blandit sapien cursus quis. Suspendisse dui libero, venenatis ac sollicitudin quis, hendrerit", bottomDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, dui nec tempor hendrerit, ligula eros vehicula dui, ut mattis odio orci id metus. Phasellus ornare diam nibh, in vehicula tortor volutpat nec. Nam luctus tincidunt enim, id vehicula ligula egestas efficitur. Aliquam fermentum id eros sit amet pretium. Nunc sit amet dolor eget justo maximus porta id non velit. Vivamus in gravida risus. Ut nec urna fringilla, aliquam turpis et, volutpat lacus. Maecenas ornare mattis felis, quis hendrerit tortor vulputate sit amet. Donec sed consectetur risus, ut venenatis tortor. Vestibulum feugiat lacinia scelerisque. Donec pulvinar arcu neque, nec blandit sapien cursus quis. Suspendisse dui libero, venenatis ac sollicitudin quis, hendrerit" },
        { id: 1, title: "Collection Title 2", firstImage: "", secondImage:"", topDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, dui nec tempor hendrerit, ligula eros vehicula dui, ut mattis odio orci id metus. Phasellus ornare diam nibh, in vehicula tortor volutpat nec. Nam luctus tincidunt enim, id vehicula ligula egestas efficitur. Aliquam fermentum id eros sit amet pretium. Nunc sit amet dolor eget justo maximus porta id non velit. Vivamus in gravida risus. Ut nec urna fringilla, aliquam turpis et, volutpat lacus. Maecenas ornare mattis felis, quis hendrerit tortor vulputate sit amet. Donec sed consectetur risus, ut venenatis tortor. Vestibulum feugiat lacinia scelerisque. Donec pulvinar arcu neque, nec blandit sapien cursus quis. Suspendisse dui libero, venenatis ac sollicitudin quis, hendrerit", bottomDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, dui nec tempor hendrerit, ligula eros vehicula dui, ut mattis odio orci id metus. Phasellus ornare diam nibh, in vehicula tortor volutpat nec. Nam luctus tincidunt enim, id vehicula ligula egestas efficitur. Aliquam fermentum id eros sit amet pretium. Nunc sit amet dolor eget justo maximus porta id non velit. Vivamus in gravida risus. Ut nec urna fringilla, aliquam turpis et, volutpat lacus. Maecenas ornare mattis felis, quis hendrerit tortor vulputate sit amet. Donec sed consectetur risus, ut venenatis tortor. Vestibulum feugiat lacinia scelerisque. Donec pulvinar arcu neque, nec blandit sapien cursus quis. Suspendisse dui libero, venenatis ac sollicitudin quis, hendrerit" },
        { id: 2, title: "Collection Title 3", firstImage: "", secondImage:"", topDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, dui nec tempor hendrerit, ligula eros vehicula dui, ut mattis odio orci id metus. Phasellus ornare diam nibh, in vehicula tortor volutpat nec. Nam luctus tincidunt enim, id vehicula ligula egestas efficitur. Aliquam fermentum id eros sit amet pretium. Nunc sit amet dolor eget justo maximus porta id non velit. Vivamus in gravida risus. Ut nec urna fringilla, aliquam turpis et, volutpat lacus. Maecenas ornare mattis felis, quis hendrerit tortor vulputate sit amet. Donec sed consectetur risus, ut venenatis tortor. Vestibulum feugiat lacinia scelerisque. Donec pulvinar arcu neque, nec blandit sapien cursus quis. Suspendisse dui libero, venenatis ac sollicitudin quis, hendrerit", bottomDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida, dui nec tempor hendrerit, ligula eros vehicula dui, ut mattis odio orci id metus. Phasellus ornare diam nibh, in vehicula tortor volutpat nec. Nam luctus tincidunt enim, id vehicula ligula egestas efficitur. Aliquam fermentum id eros sit amet pretium. Nunc sit amet dolor eget justo maximus porta id non velit. Vivamus in gravida risus. Ut nec urna fringilla, aliquam turpis et, volutpat lacus. Maecenas ornare mattis felis, quis hendrerit tortor vulputate sit amet. Donec sed consectetur risus, ut venenatis tortor. Vestibulum feugiat lacinia scelerisque. Donec pulvinar arcu neque, nec blandit sapien cursus quis. Suspendisse dui libero, venenatis ac sollicitudin quis, hendrerit" },
      
        // Add more collections as needed
      ],
     
      
    } 
  },

  
  mounted() {

  // Get the ID from the route
  const collectionId = parseInt(this.$route.params.id, 10);

// Find the collection data based on the ID
this.collection = this.collections.find((item) => item.id === collectionId);

},

    methods: {

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
    
    <style>
   

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

.image-banner {
  width: 100%;
  height: 7rem; /* Adjust height as needed */
  border: 1px solid var(--primary-color);;
  border-radius: 20px;
  overflow: hidden; /* Ensures the image doesn't overflow the container */
  display: flex; /* Optional: Ensures proper alignment */
  align-items: center; /* Optional: Centers the image vertically */
  justify-content: center; /* Optional: Centers the image horizontally */
  padding: 0.25rem;
}

.image-banner img {
  
  width: 100%; /* Make the image fill the container horizontally */
  height: 100%; /* Make the image fill the container vertically */
  object-fit: cover; /* Ensures the image covers the container without distortion */
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
    font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
}

.collection-top-description{
    display: flex;    
    gap: 1rem; 
    
}

.collection-top-description p {
  flex: 1; /* Make the paragraph take up 50% of the container */
}

.collection-top-description img {
  flex: 1; /* Make the image take up 50% of the container */
  max-width: 100%; /* Ensure the image doesn't overflow */
  height: auto; /* Maintain the aspect ratio of the image */
  background-color: var(--secondary-color);
  border-radius: 20px; 
}
    

.collection-middle-image{
    width: 100%;
    height: 7rem;
    background-color: var(--secondary-color);
    border-radius: 20px; 

}
    
/* .collection-bottom-description{

} */


.collection-assets {
    text-align: center;

}

.collection-assets h2{
    font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
}

.collection-assets-card-container{
   display: flex;
   gap: 1rem;
}

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

    </style>


  
 

<template>
  <div class="container">
        <!-- <div :class="[background-layer, currentBackgroundLayer]" aria-hidden="true"></div> New background layer -->
    
                
        <!-- top bar -->
        <Topbar @theme-changed="updateTheme" />

            <!-- return button -->
            <div class="">
        <div class="returnButton">
        <router-link to="/collections" class="nav-button">Return <</router-link>          
        </div>
   </div>

      
      <div v-if="collection" class="collection-details-container">
      <!-- Image banner -->  
      <div class="image-banner">
        <img :src="collection.firstImage" alt="Banner Image" class="banner-image">
      </div>

      <!-- Collection details -->

      <div class="collection-details">
        <h2>{{ collection.title }}</h2>
        <div class="collection-top-description">
            <p>{{ collection.topDescription }}</p>
            <img :src="collection.secondImage" alt="Collection Image" class="collection-right-image">
        </div>

        <div class="collection-middle-image">
            <img :src="collection.thirdImage" alt="Collection Image" class="collection">
            </div>

        <div class="collection-bottom-description">
            <p>{{ collection.bottomDescription }}</p>  
              </div>
        </div>

        <div class="collection-assets">
            <h2>Assets</h2>
            <div class="collection-assets-card-container">
              
            <div class="collection-assets-card">
              <img src="" alt="Asset 1" class="collection-assets-image">
            </div>          
            <div class="collection-assets-card">
              <img src="" alt="Asset 2" class="collection-assets-image">
            </div>            
            <div class="collection-assets-card">
              <img src="" alt="Asset 3" class="collection-assets-image">
            </div>
        </div>
        </div>
    </div>
    <div v-else class="collection-details-container">
    <p>Collection not found.</p>
  </div>

  <!-- back to top button -->
  <div class="backTop">
      <div style="width:93%"></div>
      <button @click="scrollToTop">^ Back to Top</button>
        </div>

      <!-- footer -->

    <Footer :theme="currentTheme"/>
</div>
</template>