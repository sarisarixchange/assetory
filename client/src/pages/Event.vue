<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import EntityPage from '../components/EntityPage.vue';

const route = useRoute();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const EVENTS_UPLOADS_PREFIX = `${API_BASE_URL}/uploads/events/`;

const collection = ref(null);
const backgrounds = {
  default: '../backgrounds/background-event-blue.svg',
  grayscale: '../backgrounds/background-event-page-grayscale.svg',
  highContrast: '../backgrounds/background-event-page-high-contrast.svg'
};

onMounted(async () => {
  const eventSlug = route.params.slug;
  try {
    const response = await axios.get(`${API_BASE_URL}/api/events/${eventSlug}`);
    console.log("🔍 Datos recibidos del evento:", response.data); // 👈 Revisa esto en la consola F12
    collection.value = response.data;
  } catch (error) {
    console.error(`❌ Event database registry lookup failed for slug: "${eventSlug}"`, error);
  }
});

// Enriquecimiento del esquema de datos
const enrichedCollection = computed(() => {
  if (!collection.value) return null;

  // Soportamos tanto collection.value.assets como collection.value.event_assets
  const rawAssets = collection.value.assets || collection.value.event_assets || [];
  
  const enrichedAssets = rawAssets.map((asset) => {
    // Normalizamos la imagen usando representative_image como respaldo
    const rawImage = asset.thumbnail || asset.representative_image || asset.image || '';
    
    // Si la imagen ya incluye http o /uploads/, la usamos directa; si no, dejamos solo el nombre del archivo
    const formatImage = (img) => {
      if (!img) return 'placeholder.png';
      if (img.startsWith('http') || img.startsWith('/uploads/')) return img;
      return img;
    };

    return {
      ...asset,
      artistId: asset.artist_slug || asset.artistId || 'unknown',
      artistSlug: asset.artist_slug || asset.artistSlug || 'unknown',
      thumbnail: formatImage(rawImage),
      name: asset.name || asset.title || 'Unknown Asset',
    };
  });

  return {
    ...collection.value,
    cards: collection.value.cards || [],
    assets: enrichedAssets,
  };
});

const linkToAsset = (asset, artist) => {
  return {
    name: 'Asset',
    params: {
      artistId: asset.artistSlug || artist?.slug || 'unknown',
      artistAssetId: asset.name
    },
    query: { fromPage: 'Event', pageId: collection.value?.slug },
  };
};
</script>

<template>
  <EntityPage 
    :entity="enrichedCollection" 
    :entityType="'event'" 
    :backgrounds="backgrounds"
    :bannerAndCardImagePrefix="EVENTS_UPLOADS_PREFIX" 
    :assetImagePrefix="`${API_BASE_URL}/uploads/artists/`" 
    :returnRoute="'/events'"
    :collectionName="collection?.title || 'Loading...'" 
    :assetLinkFn="linkToAsset" 
    :backgroundProps="{
      top: '10rem',
      left: '5rem',
      transform: 'none',
      width: '90%',
      height: '100%',
      backgroundSize: 'contain',
      backgroundPosition: 'top center'
    }" 
  />
</template>