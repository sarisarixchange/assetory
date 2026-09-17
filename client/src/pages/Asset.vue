<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import 'aframe';
import 'aframe-extras';

import Footer from '../components/Footer.vue';
import Topbar from '../components/Topbar.vue';
import ReturnButton from '../widgets/returnButton.vue';

// 1. Configuración de Router y Entorno
const route = useRoute();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// 2. Props
const props = defineProps({
  artistId: { type: [String, Number], required: true },
  artistAssetId: { type: String, required: true },
  fromPage: { type: String, required: true },
  pageId: { type: [String, Number], required: true },
});

// 3. Estado Reactivo
const interactiveMode = ref(false);
const currentTheme = ref({ theme: 'default' });
const asset = ref(null);
const localFromPage = ref(null);
const localPageId = ref(null);

const position = ref({ x: 0, y: 0, z: -3 });
const scale = ref({ x: 15, y: 15, z: 15 });
const rotation = ref({ x: 0, y: 0, z: 0 });

// 4. Métodos
const updateTheme = (payload) => {
  currentTheme.value = payload;
};

const loadInteractiveMode = () => {
  try {
    const savedSettings = JSON.parse(localStorage.getItem('accessibilitySettings')) || {};
    interactiveMode.value = savedSettings.interactiveMode ?? false;
  } catch (error) {
    console.error('Error in loadInteractiveMode:', error);
  }
};

// 5. Ciclo de Vida: Mount
onMounted(async () => {
  loadInteractiveMode();

  const artistSlug = route.params.artistId;
  const assetName = route.params.artistAssetId;

  localFromPage.value = route.query.fromPage || 'Artists';
  localPageId.value = route.query.pageId;

  try {
    const response = await axios.get(`${API_BASE_URL}/api/artists/${artistSlug}`);
    const artist = response.data;

    const assetsList = artist.assets || artist.collection || [];

    const foundAsset = assetsList.find(
      (a) => (a.name || a.title || '').trim().toLowerCase() === assetName.trim().toLowerCase()
    );

    if (foundAsset) {
      const gltf = foundAsset.gltf_model || foundAsset.gltfModel || foundAsset.file_url || '';
      const download = foundAsset.download_link || foundAsset.downloadLink || gltf;

      const formatUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
      };

      asset.value = {
        ...foundAsset,
        artistId: artist.id,
        artistSlug: artist.slug,
        artistName: artist.title,
        gltfModel: formatUrl(gltf),
        downloadLink: formatUrl(download),
      };
    } else {
      console.warn(`⚠️ Asset "${assetName}" no encontrado para el artista "${artistSlug}"`);
    }
  } catch (error) {
    console.error('⚠️ Error buscando asset en la base de datos:', error);
  }
});

// 6. Ciclo de Vida: Unmount (Limpieza A-Frame)
onBeforeUnmount(() => {
  const scene = document.querySelector('a-scene');
  if (scene) {
    if (scene.hasLoaded) scene.pause();
    if (scene.renderer) {
      try {
        scene.renderer.dispose();
      } catch (err) {
        console.warn('⚠️ Renderer dispose failed:', err);
      }
    }
    if (typeof scene.destroy === 'function') {
      scene.destroy();
    }
  }
});
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Ensure the container takes up the full viewport height */
}






.svg-class {
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

.returnButtonAbsolute {
  display: flex;
  position: absolute;
  top: 6rem;
  margin-top: 1rem;
}

.assetDetailsContainer {
  width: 38.25rem;
  height: 22.1rem;
  display: flex;
  flex-direction: column;
  background-image: url('/divs/asset-upward-div.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 1rem;
  /* optional if the SVG already has curves */
  /* box-shadow: 0 4px 10px rgba(0,0,0,0.15); */
  overflow: hidden;
  /* keeps rounded corners clean */
}


.assetDetails {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2.19rem;
  padding-top: 3rem;
  ;
  padding-bottom: 1rem;
  gap: 0.5rem;
  width: 100%;
  overflow-y: auto;
  /* background-color: red; */
  color: var(--primary-color);
  font-family: 'Inter', sans-serif;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: transparent;
}

/* .assetDetailsContainer {
  position: absolute;
  top: 5rem;
  left: 20px;
  width: 38.25rem;
  height: 21.875rem;
  overflow: hidden;
}

.assetDetails {
  height: 100%;
  overflow-y: auto;
} */



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

.descriptionParagraph {
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  flex-shrink: 0;
  overflow-y: visible;
  /* let parent handle the scrolling */
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
  border: 1px solid var(--primary-color);
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
  cursor: pointer;
}


.download-button a {
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  color: var(--primary-color);
}

.download-button img {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 1rem;

}

.download-button:hover {
  background-color: var(--hover-color);
  box-shadow: -4px 4px 0 0 #000;
}
</style>

<template>

  <div class="page-container">

    <!-- top bar -->
    <Topbar :interactive-mode="interactiveMode" @theme-changed="updateTheme" pageTitle="Asset Page" />



    <div v-if="asset" class="asset-preview-wrapper">

      <!-- Use the ReturnButton component -->
      <div class="returnButtonAbsolute">
        <ReturnButton :returnRoute="`/artist/${localPageId}`" />
      </div>

      <!-- Asset details -->

      <div class="assetDetails-and-info-wrapper">


        <div class="assetDetailsContainer">
          <!-- Asset details information -->

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
            <p class="descriptionParagraph">{{ asset.description }}</p>
          </div>

          <div v-else>
            <p>Asset not found.</p>
          </div>


        </div>



        <div class="technicalInformation">


          <h2>Technical Information</h2>

          <svg class="svg-class" viewBox="0 0 612 265" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M185.72 0.5H597.5C604.956 0.5 611 6.54416 611 14V251C611 258.456 604.956 264.5 597.5 264.5H14.5C7.04416 264.5 1 258.456 1 251V50.7227L1.00488 50.374C1.1899 43.0794 7.16079 37.2227 14.5 37.2227H157.72C165.728 37.2227 172.22 30.7308 172.22 22.7227V14C172.22 6.54417 178.264 0.500016 185.72 0.5Z"
              fill="#FFFEF6" />
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
          <a-scene embedded vr-mode-ui="enabled: false" renderer="vr: false">

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
          <img src="/icons/download-icon-black.svg" alt="Download Icon" />
        </div>
      </div>

    </div>
    <!-- Fallback content when no asset is found -->
    <div v-else>
      <!-- 3D Model Preview -->
      <div class="preview">
        <a-scene embedded vr-mode-ui="enabled: false" renderer="vr: false">

          <!-- Add a light source -->
          <a-light type="directional" position="0 1 1" intensity="1"></a-light>

          <!-- Add a camera -->
          <a-camera position="0 1.6 3"></a-camera>

          <!-- Add the 3D model -->
          <a-entity :position="`${position.x} ${position.y} ${position.z}`" :scale="`${scale.x} ${scale.y} ${scale.z}`"
            :rotation="`${rotation.x} ${rotation.y} ${rotation.z}`"
            gltf-model="https://sarisarixchange.github.io/SSXAssetLibrary/Dragon Fruit.glb" animation-mixer></a-entity>
        </a-scene>

      </div>
      <!-- <div class="download-button">
          <a :href="asset.downloadLink">Download</a>
          <img src="/icons/download-icon-black.svg" alt="Download Icon" />
        </div> -->


      <div class="no-asset">
        <h2>Asset Not Found</h2>
        <p>The asset you are looking for does not exist or could not be loaded.</p>
        <router-link :to="`/artist/${localPageId}`" class="nav-button">
          Return < </router-link>
      </div>
    </div>




    <!-- footer -->

    <Footer :theme="currentTheme" />
  </div>
</template>