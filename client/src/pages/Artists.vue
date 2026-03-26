<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Topbar from '../components/Topbar.vue';
import PageBackground from '../components/PageBackground.vue';
import GalleryGrid from '../components/GalleryGrid.vue';
import BackTopButton from '../widgets/BackTopButton.vue';
import Footer from '../components/Footer.vue';

// --- Configuración de Rutas ---
const API_BASE_URL = "http://localhost:3000";
const UPLOADS_PREFIX = `${API_BASE_URL}/uploads/`;

// --- Estado Reactivo ---
const interactiveMode = ref(false);
const currentTheme = ref({ theme: 'default' });
const galleryName = ref('Artists');
const galleryDescription = ref('Explore artists & assets.');
const routeName = ref('Artist');
const artistsData = ref([]);

const backgrounds = {
  default: './backgrounds/background-artists-blue.svg',
  grayscale: './backgrounds/background-artists-page-grayscale.svg',
  highContrast: './backgrounds/background-artists-page-high-contrast.svg'
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

const fetchArtists = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/artists`);
    
    artistsData.value = response.data.map(artist => {
      // Limpiamos el thumbnail: si viene de la DB algo como "/imagen.jpg", quitamos la barra inicial
      const cleanThumbnail = artist.thumbnail?.startsWith('/') 
        ? artist.thumbnail.substring(1) 
        : artist.thumbnail;

      return {
        ...artist,
        // Si ya es una URL de internet, se queda igual. Si no, le ponemos el prefijo del servidor.
        thumbnail: artist.thumbnail?.startsWith('http') 
          ? artist.thumbnail 
          : `${UPLOADS_PREFIX}${cleanThumbnail || 'placeholder.png'}`,
        title: artist.artist_name || artist.title || 'Untitled'
      };
    });
  } catch (error) {
    console.error('Error fetching artists:', error);
  }
};

const updateTheme = (payload) => {
  currentTheme.value = payload;
};

onMounted(() => {
  loadInteractiveMode();
  fetchArtists();
});
</script>

<template>
  <div class="page-container">
    <Topbar 
      :interactive-mode="interactiveMode" 
      @theme-changed="updateTheme" 
      pageTitle="Artists Page" 
    />

    <div class="grid">
      <PageBackground 
        :theme="currentTheme.theme" 
        :backgrounds="backgrounds" 
        top='0rem' left='0%'
        transform='translateX(0%)' 
        width='100%' height='100%' 
        backgroundSize='100%' 
        backgroundPosition='center' 
      />

      <GalleryGrid 
        :galleryName="galleryName" 
         basePath= ""
        :galleryDescription="galleryDescription" 
        :items="artistsData"
        :isArtistsPage="true" 
        :routeName="routeName" 
      />
    </div>
    
    <BackTopButton />
    <Footer :theme="currentTheme" />
  </div>
</template>

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

