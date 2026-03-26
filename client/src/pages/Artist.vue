<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import EntityPage from '../components/EntityPage.vue';

// 1. Definimos constantes y estado reactivo
const route = useRoute();
const API_BASE_URL = "http://localhost:3000";
const UPLOADS_PREFIX = `${API_BASE_URL}/uploads/`;

const collection = ref(null);
const backgrounds = {
  default: '../backgrounds/background-artist-blue.svg',
  grayscale: '../backgrounds/background-artist-page-grayscale.svg',
  highContrast: '../backgrounds/background-artist-page-high-contrast.svg'
};

// 2. Lógica de carga
onMounted(async () => {
  const slug = route.params.slug;
  try {
    const response = await axios.get(`${API_BASE_URL}/api/artists/${slug}`);
    collection.value = response.data;
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
  <EntityPage 
    v-if="collection"
    :entity="collection" 
    :entityType="'artist'" 
    :backgrounds="backgrounds"
    :bannerAndCardImagePrefix="UPLOADS_PREFIX" 
    :assetImagePrefix="UPLOADS_PREFIX" 
    :returnRoute="'/artists'"
    :collectionName="collection.artist_name || collection.title || 'Loading...'" 
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