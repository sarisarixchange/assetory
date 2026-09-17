<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import EntityPage from '../components/EntityPage.vue';

const route = useRoute();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const COLLECTIONS_UPLOADS_PREFIX = `${API_BASE_URL}/uploads/collections/`;

const collection = ref(null);
const backgrounds = {
  default: '../backgrounds/background-collection-blue.svg',
  grayscale: '../backgrounds/background-collection-page-grayscale.svg',
  highContrast: '../backgrounds/background-collection-page-high-contrast.svg'
};

onMounted(async () => {
  const collectionTarget = route.params.id || route.params.slug;
  try {
    const response = await axios.get(`${API_BASE_URL}/api/collections/${collectionTarget}`);
    console.log("🔍 Datos recibidos de la colección:", response.data);
    collection.value = response.data;
  } catch (error) {
    console.error(`❌ Collection lookup failed for parameter: "${collectionTarget}"`, error);
  }
});

// Enriquecimiento del esquema de datos
const enrichedCollection = computed(() => {
  if (!collection.value) return null;

  const rawAssets = collection.value.assets || collection.value.collection_assets || [];

  const enrichedAssets = rawAssets.map((asset) => {
    const rawImage = asset.thumbnail || asset.representative_image || asset.image || '';

    const formatImage = (img) => {
      if (!img) return 'placeholder.png';
      if (img.startsWith('http') || img.startsWith('/uploads/')) return img;
      return img;
    };

    return {
      ...asset,
      artistId: asset.artistSlug || asset.artist_slug || asset.artistId || 'unknown',
      artistSlug: asset.artistSlug || asset.artist_slug || 'unknown',
      thumbnail: formatImage(rawImage),
      name: asset.name || asset.asset_name || asset.title || 'Unknown Asset',
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
    query: { fromPage: 'Collection', pageId: collection.value?.slug || collection.value?.id },
  };
};
</script>

<template>
  <EntityPage 
    :entity="enrichedCollection" 
    :entityType="'collection'" 
    :backgrounds="backgrounds"
    :bannerAndCardImagePrefix="COLLECTIONS_UPLOADS_PREFIX" 
    :assetImagePrefix="`${API_BASE_URL}/uploads/artists/`" 
    :returnRoute="'/collections'" 
    :collectionName="collection?.title || 'Loading...'" 
    :assetLinkFn="linkToAsset"
    :backgroundProps="{
      top: '10rem',
      left: '0rem',
      transform: 'none',
      width: '100%',
      height: '100%',
      backgroundSize: 'contain',
      backgroundPosition: 'top center'
    }" 
  />
</template>