<script>
import Footer from '../components/Footer.vue'; // Import the Footer component
import Topbar from '../components/Topbar.vue'; // Import the Topbar component
import ReturnButton from '../widgets/returnButton.vue'; // <-- add this import

import artistsData from '../data/artists.json';
import 'aframe';
import 'aframe-extras';



export default {
  components: {
    Footer, // Register the Footer component
    Topbar, // Register the Topbar component
    ReturnButton, // Register the ReturnButton component
  },
  props: {
    artistId: {
      type: Number,
      required: true,
    },

    artistAssetId: {
      type: String,
      required: true,
    },

    fromPage: {
      type: String,
      required: true
    },

    pageId: {
      type: Number,
      required: true,
    },
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
    // const artistAssetId = parseInt(this.$route.params.artistAssetId, 10);
    const artistAssetId = this.$route.params.artistAssetId;




    //find collection if user came from an Artist
    const artists = artistsData.find((item) => item.id === artistId);
    // set local reactive value
    if (artists) {
      this.asset = artists.assets.find((item) => item.name === artistAssetId);
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

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Ensure the container takes up the full viewport height */
}



.returnButtonAsset {
  margin-left: 0.4rem;
  border: 1px solid var(--primary-color);
  border-radius: 0 0 0.5rem 0;
  border-top: none;
  border-left: none;
  border-right: none;
  padding-right: 2rem;
  padding-bottom: 0.25rem;
  height: 115%;

}


.svg-class{
  stroke: var(--primary-color);
}

.asset-preview-wrapper {
  flex: 1;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  gap: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  width: 88.0625rem;
  height: 39.9375rem;
}

.assetDetails-and-info-wrapper {
  /* position: relative; */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;


}

.assetDetails {
  flex: 1;
  display: flex;
  margin: 2.19rem;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  background-color: transparent;
  color: var(--primary-color);
  font-family: 'Inter', sans-serif;
  border-radius: 0 0 0.5rem 0.5rem;
}

.assetDetailsContainer {
  width: 38.25rem;
  height: 21.875rem;
}

.returnButtonAbsolute {
  display: flex;
  position: absolute;
  top: 6rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

}

.assetDetails h2 {
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.0625rem;
}

.assetDetails h3 {
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
}

.assetDetails p {
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
}

hr {
  border: 1px solid var(--primary-color);
}


.technicalInformation h2 {
  position: absolute;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  border-radius: 0.5625rem;
  border: 1px solid var(--primary-color);
  display: flex;
  width: 10.4375rem;
  height: 1.875rem;
  padding: 0.25rem 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
}

.technicalInformation h3 {
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
}

.technicalInformation p {
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
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
  border-radius: 0.5625rem;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
}

.technicalInformation {
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  background-color: transparent;
  color: var(--primary-color);
  width: 38.1875rem;
  height: 16.5625rem;


}

.technical-info-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.technical-info-table td {
  padding: 0.5rem;
  vertical-align: top;
  border: 1px solid var(--secondary-color);
  /* Add borders between rows and columns */

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
  position: relative;
  /* Make the container a positioning context */
  width: 100%;
}

.preview {
  width: 48.3125rem;
  height: 35.5625rem;
  position: relative;
  /* Ensure the A-Frame scene stays in place */
  border: 1px solid var(--primary-color);
  border-radius: 0.5rem;
}

.sliders.overlay {
  accent-color: var(--primary-color);
  position: absolute;
  /* Position the sliders on top of the scene */
  top: 5px;
  /* Adjust the distance from the top */
  left: 10px;
  /* Adjust the distance from the left */
  background-color: transparent;
  /* Add a semi-transparent background */
  padding: 10px;
  border-radius: 0.5rem;
  z-index: 10;
  /* Ensure the sliders are above the A-Frame scene */
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
  position: absolute;
  /* Ensure it fills the container */
  top: 0;
  left: 0;
  z-index: 1;
  /* Place it below the sliders */

}

.download-button {
  width: 48.3125rem;
  height: 3.625rem;
  /* height: 8.5%; */
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.download-button a {
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  color: var(--primary-color);

}
</style>

<template>

  <div class="page-container">

    <!-- top bar -->
    <Topbar @theme-changed="updateTheme" />



    <div v-if="asset" class="asset-preview-wrapper">

      <!-- Use the ReturnButton component -->
      <div class="returnButtonAbsolute">
        <ReturnButton :returnRoute="`/${fromPage}/${pageId}`" />
      </div>

      <!-- Asset details -->

      <div class="assetDetails-and-info-wrapper">
        <!-- return button -->


        <div class="assetDetailsContainer">
          <!-- Asset details information -->
          <svg class="svg-class" viewBox="0 0 621 358" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Vector 7" filter="url(#filter0_d_292_1817)">
              <path
                d="M602.5 350H18.5C10.768 350 4.5 343.732 4.5 336V53.5C4.5 45.768 10.768 39.5 18.5 39.5H138.758C146.49 39.5 152.758 33.232 152.758 25.5V14C152.758 6.26801 159.026 0 166.758 0H602.5C610.232 0 616.5 6.26802 616.5 14V336C616.5 343.732 610.232 350 602.5 350Z"
                fill="#FFFEF6" />
              <path
                d="M166.758 0.5H602.5C609.956 0.5 616 6.54416 616 14V336C616 343.456 609.956 349.5 602.5 349.5H18.5C11.0442 349.5 5 343.456 5 336V53.5C5 46.0442 11.0442 40 18.5 40H138.758C146.766 40 153.258 33.5081 153.258 25.5V14C153.258 6.54416 159.302 0.5 166.758 0.5Z"
                />
              <foreignObject x="20" y="60" width="580" height="280">
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
              </foreignObject>

            </g>
            <defs>
              <filter id="filter0_d_292_1817" x="0.5" y="0" width="620" height="358" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_292_1817" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_292_1817" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>

        <div class="technicalInformation">


          <h2>Technical Information</h2>

          <svg class="svg-class" viewBox="0 0 612 265" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path
              d="M185.72 0.5H597.5C604.956 0.5 611 6.54416 611 14V251C611 258.456 604.956 264.5 597.5 264.5H14.5C7.04416 264.5 1 258.456 1 251V50.7227L1.00488 50.374C1.1899 43.0794 7.16079 37.2227 14.5 37.2227H157.72C165.728 37.2227 172.22 30.7308 172.22 22.7227V14C172.22 6.54417 178.264 0.500016 185.72 0.5Z"
              fill="#FFFEF6"  />
            <foreignObject x="20" y="40" width="580" height="220">

              <table class="technical-info-table">
                <tbody>
                  <tr>
                    <td>
                      <h3>Asset Type</h3>
                    </td>
                    <td>
                      <p>{{ asset.assetType }}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Creation Method</h3>
                    </td>
                    <td>
                      <p>{{ asset.creationMethod }}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Acknowledgement</h3>
                    </td>
                    <td>
                      <p>{{ asset.acknowledgement }}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>File Size</h3>
                    </td>
                    <td>
                      <p>{{ asset.fileSize }}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Copyright</h3>
                    </td>
                    <td>
                      <p>{{ asset.copyright }}</p>
                    </td>
                  </tr>
                </tbody>
              </table>

            </foreignObject>
          </svg>
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
            <a-entity :position="`${position.x} ${position.y} ${position.z}`"
              :scale="`${scale.x} ${scale.y} ${scale.z}`" :rotation="`${rotation.x} ${rotation.y} ${rotation.z}`"
              :gltf-model="asset.gltfModel" animation-mixer></a-entity>

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
        <router-link :to="{ name: fromPage, params: { id: pageId } }" class="nav-button">
          Return < </router-link>
      </div>
    </div>




    <!-- footer -->

    <Footer :theme="currentTheme" />
  </div>
</template>