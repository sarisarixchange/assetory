<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Topbar from '../components/Topbar.vue';
import PageBackground from '../components/PageBackground.vue';
import GalleryGrid from '../components/GalleryGrid.vue';
import BackTopButton from '../widgets/BackTopButton.vue';
import Footer from '../components/Footer.vue';

// --- Configuración de Rutas ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UPLOADS_PREFIX = `${API_BASE_URL}/uploads/collections/`;

// --- Estado Reactivo ---
const interactiveMode = ref(false);
const currentTheme = ref({ theme: 'default' });
const galleryName = ref('Collections');
const galleryDescription = ref('Curated assets created by the community.');
const routeName = ref('Collection');
const collectionsData = ref([]);

const backgrounds = {
  default: './backgrounds/background-collections-blue.svg',
  grayscale: './backgrounds/background-collections-page-grayscale.svg',
  highContrast: './backgrounds/background-collections-page-high-contrast.svg'
};

// --- Lógica de Carga ---
const loadInteractiveMode = () => {
  try {
    const savedSettings = JSON.parse(localStorage.getItem('accessibilitySettings')) || {};
    interactiveMode.value = savedSettings.interactiveMode ?? false;
  } catch (error) {
    console.error('Error in loadInteractiveMode:', error);
  }
};

const fetchCollections = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/collections`);
    const activeCollections = response.data.filter(collection => collection.is_active);
    
    collectionsData.value = activeCollections.map(collection => {
      const cleanThumbnail = collection.thumbnail;
      return {
        ...collection,
        // Forzamos que 'id' y 'slug' tengan el valor adecuado de la base de datos
        id: collection.id || collection.slug,
        slug: collection.slug,
        thumbnail: cleanThumbnail?.startsWith('http') 
          ? cleanThumbnail 
          : `${UPLOADS_PREFIX}${cleanThumbnail || 'placeholder.png'}`
      };
    });
  } catch (error) {
    console.error('❌ Error fetching public collections repository:', error);
  }
};

const updateTheme = (payload) => {
  currentTheme.value = payload;
};

onMounted(() => {
  loadInteractiveMode();
  fetchCollections();
});
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.grid {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <div class="page-container">

    <!-- top bar -->
    <Topbar :interactive-mode="interactiveMode" @theme-changed="updateTheme" pageTitle="Collections Page"/>

    <div class="grid">

      <!-- background image -->
      <PageBackground
        :theme="currentTheme.theme"
        :backgrounds="backgrounds" 
        top='0' left='0'
        transform='translateX(0%)'
        width='100%' 
        height='100%' 
        backgroundSize='cover'
        backgroundPosition='center' />

      <!-- Collections Grid -->
      <GalleryGrid 
        :galleryName="galleryName" 
        :galleryDescription="galleryDescription" 
        :items="collectionsData"
        basePath="" 
        :routeName="routeName" 
      />
    </div>

    <BackTopButton />

    <!-- footer -->
    <Footer :theme="currentTheme" />
  </div>
</template>