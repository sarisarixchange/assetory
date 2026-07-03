<!-- <script>
import Topbar from '../components/Topbar.vue'; // Import the Topbar component
import GalleryGrid from '../components/GalleryGrid.vue'; // Import the Grid component
import PageBackground from '../components/PageBackground.vue';
import BackTopButton from '../widgets/BackTopButton.vue';
import Footer from '../components/Footer.vue'; // Import the Footer component
import eventsData from '../data/events.json';


export default {
  components: {
    Topbar, // Register the Topbar component
    PageBackground,
    GalleryGrid, // Register the Grid component
    BackTopButton,
    Footer, // Register the Footer component    
  },

  data() {
    return {
      interactiveMode: false,
      currentTheme: { theme: 'default' }, // Default theme
      galleryName: 'Events',
      galleryDescription: 'Community events and activities',
      basePath: 'events/',
      routeName: 'Event',
      data: eventsData,
      backgrounds: {
        // default: './backgrounds/background-events-page-default.svg',
        default: './backgrounds/background-events-blue.svg',
        grayscale: './backgrounds/background-events-page-grayscale.svg',
        highContrast: './backgrounds/background-events-page-high-contrast.svg'
      }
    }
  },

  mounted() {
    this.loadInteractiveMode();
  },

  methods: {
    updateTheme(payload) {
      this.currentTheme = payload; // Update the theme
    },


    loadInteractiveMode() {
      try {
        const savedSettings =
          JSON.parse(localStorage.getItem('accessibilitySettings')) || {};
        this.interactiveMode = savedSettings.interactiveMode ?? false;
      } catch (error) {
        console.error('Error in loadInteractiveMode:', error);
      }
    },
    // do not erase curly brackets below
  },
}

</script> -->

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Topbar from '../components/Topbar.vue';
import PageBackground from '../components/PageBackground.vue';
import GalleryGrid from '../components/GalleryGrid.vue';
import BackTopButton from '../widgets/BackTopButton.vue';
import Footer from '../components/Footer.vue';

// --- Configuración de Rutas ---
const API_BASE_URL = "https://sarisarixchange.ca/assetory_api";
const UPLOADS_PREFIX = `${API_BASE_URL}/uploads/`;

// --- Estado Reactivo ---
const interactiveMode = ref(false);
const currentTheme = ref({ theme: 'default' });
const galleryName = ref('Events');
const galleryDescription = ref('Community events and activities.');
const routeName = ref('Event');
const eventsData = ref([]);

const backgrounds = {
  default: './backgrounds/background-events-blue.svg',
  grayscale: './backgrounds/background-events-page-grayscale.svg',
  highContrast: './backgrounds/background-events-page-high-contrast.svg'
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

const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/events`);
    
    // Filtramos solo los eventos activos y formateamos sus propiedades e imágenes
    const activeEvents = response.data.filter(event => event.is_active);
    
    eventsData.value = activeEvents.map(event => {
      // Si la imagen ya tiene una URL absoluta, la respeta; de lo contrario, le añade el prefijo de subidas
      const cleanThumbnail = event.thumbnail;
      return {
        ...event,
        thumbnail: cleanThumbnail?.startsWith('http') 
          ? cleanThumbnail 
          : `${UPLOADS_PREFIX}${cleanThumbnail || 'placeholder.png'}`
      };
    });
  } catch (error) {
    console.error('❌ Error fetching public events repository:', error);
  }
};

const updateTheme = (payload) => {
  currentTheme.value = payload;
};

onMounted(() => {
  loadInteractiveMode();
  fetchEvents();
});
</script>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* full viewport height */
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
    <Topbar :interactive-mode="interactiveMode"  @theme-changed="updateTheme" pageTitle="Events Page"/>

    <div class="grid">
      <!-- background image -->
      <PageBackground :theme="currentTheme.theme" :backgrounds="backgrounds" top='0' left='0%'
        transform='translateX(0%)' width='100%' height='100%' backgroundSize='100%'
        backgroundPosition='left' />

      <!-- Collections Grid -->
      <GalleryGrid :galleryName="galleryName" :galleryDescription="galleryDescription" :items="eventsData"
        basePath="" :routeName="routeName" :isEventsPage="true" />
    </div>

    <BackTopButton />

    <!-- footer -->

    <Footer :theme="currentTheme" />
  </div>
</template>