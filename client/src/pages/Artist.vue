<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import EntityPage from '../components/EntityPage.vue';

// 1. Definimos constantes y estado reactivo
const route = useRoute();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UPLOADS_PREFIX_THUMNAIL_AND_BANNER = `${API_BASE_URL}/uploads/artists/`;
const UPLOADS_PREFIX_ASSET_IMAGE = `${API_BASE_URL}/uploads/artists/`;

const collection = ref(null);

const backgrounds = {
  default: '../backgrounds/background-artist-blue.svg',
  grayscale: '../backgrounds/background-artist-page-grayscale.svg',
  highContrast: '../backgrounds/background-artist-page-high-contrast.svg'
};

// Función auxiliar para forzar que el string siempre empiece con 'artists/'
const normalizeImagePath = (path, defaultPlaceholder = 'artists/placeholder.png') => {
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

  // 3. Limpiamos cualquier prefijo previo 'artists/'
  while (raw.startsWith('artists/')) {
    raw = raw.replace(/^artists\//, '');
  }

  // 4. Retornamos con 'artists/' al inicio
  return `artists/${raw}`;
};



// 2. Lógica de carga
onMounted(async () => {
  const slug = route.params.slug;
  try {
    const response = await axios.get(`${API_BASE_URL}/api/artists/${slug}`);
    const artist = response.data;

    if (artist) {
      // 🛡️ Forzar la normalización en thumbnail y banner
      artist.thumbnail = normalizeImagePath(artist.thumbnail);
      if (artist.banner) {
        artist.banner = normalizeImagePath(artist.banner);
      }

      // 🛡️ Normalizar las imágenes de los assets del artista
      if (artist.assets && Array.isArray(artist.assets)) {
        artist.assets = artist.assets.map(asset => {
          const rawImage = asset.thumbnail || asset.representative_image || 'placeholder.png';
          return {
            ...asset,
            thumbnail: normalizeImagePath(rawImage),
            representative_image: normalizeImagePath(asset.representative_image)
          };
        });
      }

      // Asignación final
      collection.value = artist;
    }
  } catch (error) {
    console.error("Artist not found in DB", error);
  }
});

// 3. Métodos
const linkToAsset = (asset, artist) => {
  return {
    name: 'Asset',
    params: {
      artistId: artist.slug,
      artistAssetId: asset.name
    },
    query: { fromPage: 'Artist', pageId: artist.slug },
  };
};
</script>

<template>
  <EntityPage v-if="collection" :entity="collection" :entityType="'artist'" :backgrounds="backgrounds"
    :bannerAndCardImagePrefix="UPLOADS_PREFIX_THUMNAIL_AND_BANNER" :assetImagePrefix="UPLOADS_PREFIX_ASSET_IMAGE"
    :returnRoute="'/artists'" :collectionName="collection.artist_name || collection.title || 'Loading...'"
    :assetLinkFn="linkToAsset" :backgroundProps="{
      top: '8.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '65.87494rem',
      height: '24.11456rem',
      backgroundSize: '90%',
      backgroundPosition: 'center',
      zIndex: '999',
      opacity: '1'
    }" />
</template>