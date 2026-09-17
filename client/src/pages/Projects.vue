<script setup>
import { ref, onMounted, nextTick } from 'vue';
import axios from 'axios';
import Topbar from '../components/Topbar.vue';
import GalleryGrid from '../components/GalleryGrid.vue';
import BackTopButton from '../widgets/BackTopButton.vue';
import Footer from '../components/Footer.vue';

// --- Configuración ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UPLOADS_PREFIX = `${API_BASE_URL}/uploads/`;

// --- Refs & Estado ---
const topbar = ref(null);
const interactiveMode = ref(false);
const isNotificationVisible = ref(true);
const currentTheme = ref({ theme: 'default' });
const currentBackgroundLayer = ref('background-layer');

const galleryName = ref('Projects');
const galleryDescription = ref('Explore projects & associated assets.');
const routeName = ref('Project');
const projectsData = ref([]);

// --- Carga de Estado ---
const loadAccessibilitySettings = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('accessibilitySettings')) || {};
    interactiveMode.value = saved.interactiveMode ?? false;
    isNotificationVisible.value = saved.isNotificationVisible ?? true;
  } catch (error) {
    console.error('Error loading accessibility settings:', error);
  }
};

const dismissNotification = () => {
  isNotificationVisible.value = false;
  if (topbar.value?.$refs?.accessibilityMenu) {
    topbar.value.$refs.accessibilityMenu.saveSettings({
      isNotificationVisible: false,
    });
  }
};

const updateTheme = (payload) => {
  currentTheme.value = payload;
  
  if (payload.theme === 'grayscale' || payload.theme === 'originalInteractive') {
    currentBackgroundLayer.value = 'background-layer-grayscale';
  } else if (payload.theme === 'highContrast') {
    currentBackgroundLayer.value = 'background-layer-highContrast';
  } else {
    currentBackgroundLayer.value = 'background-layer';
  }
};

const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/projects`);
    const activeProjects = response.data.filter(project => project.is_active);

    projectsData.value = activeProjects.map(project => {
      let rawThumbnail = project.thumbnail || 'projects/placeholder.png';

      if (rawThumbnail.startsWith('/')) rawThumbnail = rawThumbnail.substring(1);

      if (rawThumbnail.startsWith('http')) {
        return {
          ...project,
          thumbnail: rawThumbnail,
          title: project.project_name || project.title || 'Untitled Project'
        };
      }

      if (!rawThumbnail.startsWith('projects/')) {
        rawThumbnail = `projects/${rawThumbnail}`;
      }

      return {
        ...project,
        thumbnail: `${UPLOADS_PREFIX}${rawThumbnail}`,
        title: project.project_name || project.title || 'Untitled Project'
      };
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

onMounted(() => {
  loadAccessibilitySettings();
  fetchProjects();
});
</script>

<template>
  <div class="grid-container">
    <div class="topBar">
      <Topbar 
        ref="topbar" 
        :interactive-mode="interactiveMode" 
        :is-notification-visible="isNotificationVisible"
        @update-notification-visible="isNotificationVisible = $event" 
        @theme-changed="updateTheme" 
        pageTitle="Projects Page" 
      />
    </div>

    <div class="content-container">
      <div :class="['background-layer', currentBackgroundLayer]" aria-hidden="true"></div>

      <GalleryGrid 
        :galleryName="galleryName" 
        basePath=""
        :galleryDescription="galleryDescription" 
        :items="projectsData"
        :isArtistsPage="false" 
        :routeName="routeName" 
        :theme="currentTheme.theme"
      />

      <!-- Window Notification -->
      <div v-if="isNotificationVisible" class="notification-window">
        <p>
          This website stores accessibility menu settings you select in your browser to enhance your experience. No cookies or tracking are used.
        </p>
        <button @click="dismissNotification" class="notification-dismiss-button">Accept</button>
      </div>

      <Footer :theme="currentTheme" :isMainWebsite="true" />
    </div>

    <BackTopButton />
  </div>
</template>

<style scoped>
.grid-container {
  background-color: var(--background-color-main);
  background-image: url("/backgrounds/decorative-plus-xyz-homepage-purple.svg");
  background-size: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-container {
  display: flex;
  flex-direction: column;
  width: 90%;
  align-self: center;
  gap: 3.75rem;
  flex: 1;
}

.topBar {
  flex: 0 0 auto;
}

/* Capas de Fondo Dinámicas */
.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-image: url("/backgrounds/xyz-homepage-pink.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.background-layer-grayscale {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-image: url("/icons/xyz-gray.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.background-layer-highContrast {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-image: url("/icons/xyz-highContrast.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

/* Notification Window */
.notification-window {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0vh;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--background-color);
  border: 2px solid var(--primary-color);
  border-bottom: none;
  border-radius: 60px 60px 0 0;
  padding: 1rem;
  width: 106.5625rem;
  max-width: 90vw;
  height: 12.125rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.notification-window p {
  width: 85%;
  color: var(--primary-color);
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}

.notification-dismiss-button {
  display: inline-flex;
  padding: 0.3125rem 1.25rem;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 600;
}

@media (max-width: 1400px) {
  .notification-window {
    width: 100%;
    height: auto;
    padding: 1rem;
    border-radius: 30px 30px 0 0;
  }
  .notification-window p {
    font-size: 1rem;
  }
  .notification-dismiss-button {
    font-size: 1rem;
  }
}
</style>