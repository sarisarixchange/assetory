<script >
import Footer from '../components/Footer.vue'; // Import the Footer component
import Topbar from '../components/Topbar.vue'; // Import the Topbar component
import artistsData from '../data/artists.json';
import collectionsData from '../data/collections.json'; // Import collections data
import 'aframe';
import 'aframe-extras';



export default {
  components: {
    Footer, // Register the Footer component
    Topbar, // Register the Topbar component
 },
 props: {
      artistId: {
      type: Number,
      required: true,
    },
    artistAssetId: {
      type: Number,
      required: true,
    },
   collectionId: {
    type: Number,
    required: true,
  },
    fromArtist: {
    type: Boolean,
    required: true
  }
  },


  data() {
        return {
      currentTheme: { theme: 'default' }, // Default theme
      asset: null, // Holds the data for the selected asset
      position: { x: 0, y: 0, z: -3 },
      scale: { x: 15, y: 15, z: 15 },
      rotation: { x: 0, y: 0, z: 0 },
     
     
    };

  
},
mounted() {
    //extract params from previous route/page, either from artist.vue or collection.vue
    const artistId = parseInt(this.$route.params.artistId, 10);
    const artistAssetId = parseInt(this.$route.params.artistAssetId, 10);


    //find collection if user came from an Artist
    const artists = artistsData.find((item) => item.id === artistId);
    // set local reactive value
    if (artists) {
      this.asset = artists.assets.find((item) => item.id === artistAssetId);
    }
},

  

 computed: {
  routeName() {
    return this.fromArtist ? 'Artist' : 'Collection';
    // console.log('Route Name:', name);
    // return name;
  },
 
  routeId() {
    return this.fromArtist ? this.artistId : this.collectionId // missing collection id
  }, 

  returnLink(){
    return {
      name: this.routeName,
      params: {id : this. routeId}
    };
  }
},

methods: {

updateTheme(payload) {
this.currentTheme = payload; // Update the theme
},

 // do not erase curly brackets below
}
}

</script>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes up the full viewport height */
}

.content {
  flex: 1; /* Allow the content to grow and take up available space */
  display: flex;
  flex-direction: column; /* Ensure children are stacked vertically */
}

.returnButton-and-playButton-wrapper{
  display: flex;
  
}

.returnButtonAsset {
  margin-left: 0.4rem;
  border:1px solid var(--primary-color);
  border-radius: 0 0 0.5rem 0;
  border-top: none; 
  border-left: none;
  border-right: none;
  padding-right: 2rem;
  padding-bottom: 0.25rem;
  height: 115%;

}

.playButton {
  flex: 1;
  background-color: transparent;
  position: relative; /* Ensure pseudo-elements are positioned relative to this div */
  width: 100%;
  border: 1px solid var(--primary-color);
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border-bottom: none;
  
}



.asset-preview-wrapper{
  flex: 1;
  display: flex;
  gap: 0.5rem;  
  padding: 0.5rem;
  

}

.assetDetails-and-info-wrapper{
  position:relative;
  display: flex;
  flex-direction: column;
  /* gap: 0.5rem; */
  width: 90%;
}

.assetDetails {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  background-color: transparent;
  color: var(--primary-color);
  padding: 20px;
  border: 1px solid var(--primary-color);
  border-top: none; /* Remove the top border to connect with playButton */
  border-left: none;
  border-radius: 0 0 0.5rem 0.5rem; /* Bottom corners rounded */
  margin-top: -1px; /* Prevent a visible gap between the two divs */
  margin-bottom: 0.5rem;
  position: relative; /* Required for the pseudo-element to position correctly */
}

.assetDetails::before {
  content: ''; /* Required to create the pseudo-element */
  position: absolute;
  bottom: 0;
  left: 0;
  height: 97%;
  width: 1px; /* Adjust the width of the left border */
  background-color: var(--primary-color); /* Use the primary color for the border */
  border-radius: 0 1rem 0 0; /* Optional: Add rounding to the bottom-left corner */
  
}




hr {
  border: 1px solid var(--primary-color);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.tag-item {
  background-color: var(--secondary-color);
  color: var(--primary-color);
  padding: 0.3rem 0.6rem;
  border: 1px solid var(--primary-color);
  border-radius: 0.5rem;
  font-size: 0.9rem;
}

.technicalInformation{
  width: 100%;    
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
  
  background-color: transparent;
  color: var(--primary-color);
  padding: 20px;
  border: 1px solid var(--primary-color);
  border-radius: 10px;

}

.technical-info-table {
  width: 100%;  
  border-collapse: collapse;
  margin-top: 1rem;
}

.technical-info-table td {
  padding: 0.5rem;
  vertical-align: top;
  border: 1px solid var(--secondary-color); /* Add borders between rows and columns */

}

.technical-info-table h3 {
  margin: 0;
  font-size: 1rem;
}

.technical-info-table p {
  margin: 0;
  font-size: 0.9rem;
  
}
.preview-and-download-button-wrapper {
  position: relative; /* Make the container a positioning context */
  width: 100%; 
}

.preview {
  width: 100%;
  height: 90%;
  position: relative; /* Ensure the A-Frame scene stays in place */
  border: 1px solid var(--primary-color);
  border-radius: 0.5rem;
}

.sliders.overlay {
  accent-color: var(--primary-color);
  position: absolute; /* Position the sliders on top of the scene */
  top: 5px; /* Adjust the distance from the top */
  left: 10px; /* Adjust the distance from the left */
  background-color: transparent; /* Add a semi-transparent background */
  padding: 10px;
  border-radius: 0.5rem;
  z-index: 10; /* Ensure the sliders are above the A-Frame scene */
  color: var(--primary-color);
  font-size: 0.5rem;
}

.sliders h3 {
  margin-bottom: 0.25rem;
}

.sliders label {
  display: block;
  margin-bottom: 0.25rem;
}





a-scene {
  width: 100%;
  height: 100%;
  position: absolute; /* Ensure it fills the container */
  top: 0;
  left: 0;
  z-index: 1; /* Place it below the sliders */
  
}

.download-button {
  height: 8.5%;
  color: var(--primary-color); 
  border: 1px solid var(--primary-color);
  border-radius: 0.5rem;

  /* Center the text vertically and horizontally */
  display: flex;
  align-items: center; /* Align items vertically */
  justify-content: center; /* Align items horizontally */
margin-top: 0.5rem;
margin-bottom: 0.5rem;
}

.download-button a {
  color: var(--primary-color); 
  
}



</style>

<template>

<div class="page-container">

    <!-- top bar -->
    <Topbar @theme-changed="updateTheme" />

   

   <div v-if="asset" class="asset-preview-wrapper">

    
   <!-- Asset details -->

  <div  class="assetDetails-and-info-wrapper">
          <!-- return button -->
          <div class="returnButton-and-playButton-wrapper">
        <div class="returnButtonAsset">
        <div class="returnButton">

          <router-link  :to="returnLink"

  class="nav-button"
>
  Returns <
</router-link>

      </div>
        </div>

       
  <div class="playButton">
        <!-- <router-link to="/play" class="nav-button">Play</router-link>      -->
        </div>
   </div>
  <div v-if="asset" class="assetDetails">
  <h2>Asset Details</h2>
  <hr>
  <h3>Creator</h3>
  <p>{{ asset.creator }}</p>
  <h3>Asset Name</h3>        
  <p>{{ asset.name }}</p>
  <h3>Keywords/Tags</h3>
  <ul class="tags-list">
    <li v-for="(tag, index) in asset.tags" :key="index" class="tag-item">
      {{ tag }}
    </li>
  </ul>
  <h3>Description</h3>
  <p>{{ asset.description }}</p>
</div>
<div v-else>
  <p>Asset not found.</p>
  </div>  

<div class="technicalInformation">
  <h2>Technical Information</h2>
  <hr>
  <table class="technical-info-table">
    <tbody>
      <tr>
        <td><h3>Asset Type</h3></td>
        <td><p>{{ asset.assetType }}</p></td>
      </tr>
      <tr>
        <td><h3>Creation Method</h3></td>
        <td><p>{{ asset.creationMethod }}</p></td>
      </tr>
      <tr>
        <td><h3>Acknowledgement</h3></td>
        <td><p>{{ asset.acknowledgement }}</p></td>
      </tr>
      <tr>
        <td><h3>File Size</h3></td>
        <td><p>{{ asset.fileSize }}</p></td>
      </tr>
      <tr>
        <td><h3>Copyright</h3></td>
        <td><p>{{ asset.copyright }}</p></td>
      </tr>
    </tbody>
  </table>
</div>
</div>



<div class="preview-and-download-button-wrapper">
  <div class="sliders overlay">
  <!-- <h3>Position</h3>
  <label>X: <input type="range" v-model="position.x" min="-10" max="10" step="0.1"></label>
  <label>Y: <input type="range" v-model="position.y" min="-10" max="10" step="0.1"></label>
  <label>Z: <input type="range" v-model="position.z" min="-10" max="10" step="0.1"></label> -->

  <!-- <h3>Scale</h3> -->
  <!-- <label>X: <input type="range" v-model="scale.x" min="1" max="30" step="0.1"></label> -->
  <!-- <label>Y: <input type="range" v-model="scale.y" min="1" max="30" step="0.1"></label> -->
  <!-- <label>Z: <input type="range" v-model="scale.z" min="1" max="30" step="0.1"></label> -->

  <h3>Rotation</h3>
  <label>X: <input type="range" v-model="rotation.x" min="0" max="360" step="1"></label>
  <label>Y: <input type="range" v-model="rotation.y" min="0" max="360" step="1"></label>
  <label>Z: <input type="range" v-model="rotation.z" min="0" max="360" step="1"></label>
</div>

  <!-- 3D Model Preview -->
<div class="preview">
  <a-scene embedded vr-mode-ui="enabled: false" enderer="vr: false">
    <!-- Add a light source -->
    <a-light type="directional" position="0 1 1" intensity="1"></a-light>

    <!-- Add a camera -->
    <a-camera position="0 1.6 3"></a-camera>

    <!-- Add the 3D model -->
    <a-entity
    :position="`${position.x} ${position.y} ${position.z}`"
    :scale="`${scale.x} ${scale.y} ${scale.z}`"
    :rotation="`${rotation.x} ${rotation.y} ${rotation.z}`"
    :gltf-model="asset.gltfModel"
    animation-mixer
    ></a-entity>

  </a-scene>
  
</div>
  <div class="download-button">
    <a :href="asset.downloadLink">Download</a>
  </div>
</div>

</div>
        <!-- Fallback content when no asset is found -->
<div v-else>

        <div class="no-asset">
          <h2>Asset Not Found</h2>
          <p>The asset you are looking for does not exist or could not be loaded.</p>          
          <router-link  :to="returnLink"

  class="nav-button"
>
  Return <
</router-link>
</div> 
</div>




    <!-- footer -->

    <Footer :theme="currentTheme"/>
    </div>
</template>