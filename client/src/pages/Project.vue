<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import EntityPage from '../components/EntityPage.vue';

// 1. Definimos constantes y estado reactivo
const route = useRoute();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Prefijos base apuntando a /uploads/projects/
const UPLOADS_PREFIX_THUMBNAIL_AND_BANNER = `${API_BASE_URL}/uploads/projects/`;
const UPLOADS_PREFIX_ASSET_IMAGE = `${API_BASE_URL}/uploads/projects/`;

const project = ref(null);
const backgrounds = {
  default: '../backgrounds/background-artist-blue.svg', // Puedes ajustar el SVG de fondo si tienes uno exclusivo de proyectos
  grayscale: '../backgrounds/background-artist-page-grayscale.svg',
  highContrast: '../backgrounds/background-artist-page-high-contrast.svg'
};

// Función auxiliar para forzar que el string siempre empiece con 'projects/'
const normalizeImagePath = (path, defaultPlaceholder = 'projects/placeholder.png') => {
  if (!path) return defaultPlaceholder;

  let raw = String(path).trim();

  // 1. Si viene con barra inicial, la removemos
  if (raw.startsWith('/')) {
    raw = raw.substring(1);
  }

  // 2. Si es una URL completa (http/https), se retorna tal cual
  if (raw.startsWith('http')) {
    return raw;
  }

  // 3. Limpiamos cualquier prefijo previo 'projects/'
  while (raw.startsWith('projects/')) {
    raw = raw.replace(/^projects\//, '');
  }

  // 4. Retornamos con 'projects/' al inicio
  return `projects/${raw}`;
};

// 2. Lógica de carga
onMounted(async () => {
  const slug = route.params.slug;
  try {
    const response = await axios.get(`${API_BASE_URL}/api/projects/${slug}`);
    const projectData = response.data;

    if (projectData) {
      // 🛡️ Forzar la normalización en thumbnail y banner
      projectData.thumbnail = normalizeImagePath(projectData.thumbnail);
      if (projectData.banner) {
        projectData.banner = normalizeImagePath(projectData.banner);
      }

      // 🛡️ Normalizar las imágenes de los assets del proyecto
      if (projectData.assets && Array.isArray(projectData.assets)) {
        projectData.assets = projectData.assets.map(asset => {
          const rawImage = asset.thumbnail || asset.representative_image || 'placeholder.png';
          return {
            ...asset,
            thumbnail: normalizeImagePath(rawImage),
            representative_image: normalizeImagePath(asset.representative_image)
          };
        });
      }

      // Asignación final
      project.value = projectData;
    }
  } catch (error) {
    console.error("Project not found in DB", error);
  }
});

// 3. Métodos
const linkToAsset = (asset, currentProject) => {
  return {
    name: 'Asset',
    params: {
      artistId: currentProject.slug,
      artistAssetId: asset.name
    },
    query: { fromPage: 'Project', pageId: currentProject.slug },
  };
};
</script>

<template>
  <EntityPage 
    v-if="project"
    :entity="project" 
    :entityType="'project'" 
    :backgrounds="backgrounds"
    :bannerAndCardImagePrefix="UPLOADS_PREFIX_THUMBNAIL_AND_BANNER" 
    :assetImagePrefix="UPLOADS_PREFIX_ASSET_IMAGE" 
    :returnRoute="'/projects'"
    :collectionName="project.project_name || project.title || 'Loading...'" 
    :assetLinkFn="linkToAsset" 
    :backgroundProps="{
      top: '8.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60.5625rem',
      height: '23.96563rem',
      backgroundSize: '90%',
      backgroundPosition: 'center'
    }" 
  />
</template>