<!-- <script>
import EntityPage from '../components/EntityPage.vue';
import data from '../data/events.json';
import artistsData from '../data/artists.json';

export default {
  components: { EntityPage },
  data() {
    return {
      collection: null,
      backgrounds: {
        // default: '../backgrounds/background-event-page-default.svg',
        default: '../backgrounds/background-event-blue.svg',
        grayscale: '../backgrounds/background-event-page-grayscale.svg',
        highContrast: '../backgrounds/background-event-page-high-contrast.svg'
      }
    };
  },
  mounted() {
    const id = parseInt(this.$route.params.id, 10);
    this.collection = data.find((item) => item.id === id);
  },
  computed: {
    enrichedCollection() {
      if (!this.collection) return null;

      const enrichedAssets = this.collection.assets.map((asset) => {
        const artist = artistsData.find((a) => a.id === asset.artistId);
        const artistAsset = artist?.assets.find((a) => a.name === asset.name);

        return {
          ...asset,
          artistId: artist?.id || null,
          thumbnail: artistAsset?.thumbnail || null,
          name: artistAsset?.name || 'Unknown Asset',
        };
      });

      return {
        ...this.collection,
        assets: enrichedAssets,
      };
    },


  },
  methods: {
    linkToAsset(asset, artist) {
      return {
        name: 'Asset',
        params: { artistId: artist.id, artistAssetId: asset.name },
        query: { fromPage: 'Event', pageId: this.collection.id },
      };
    },
  },
};
</script> -->


<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import EntityPage from '../components/EntityPage.vue';

// 1. Configuración de constantes y estado reactivo
const route = useRoute();
const API_BASE_URL = "https://sarisarixchange.ca/assetory_api";
const UPLOADS_PREFIX = `${API_BASE_URL}/uploads/`;

const collection = ref(null);
const backgrounds = {
  default: '../backgrounds/background-event-blue.svg',
  grayscale: '../backgrounds/background-event-page-grayscale.svg',
  highContrast: '../backgrounds/background-event-page-high-contrast.svg'
};

// 2. Lógica de carga asíncrona desde la BD usando el slug de la URL
onMounted(async () => {
  const eventSlug = route.params.slug; // Dependiendo de cómo definieras tu index.js de rutas públicas (usualmente :id o :slug)
  try {
    // Apuntamos directamente al endpoint individual por slug que creamos en Express
    const response = await axios.get(`${API_BASE_URL}/api/events/${eventSlug}`);
    collection.value = response.data;
  } catch (error) {
    console.error(`❌ Event database registry lookup failed for slug: "${eventSlug}"`, error);
  }
});

// 3. Enriquecimiento del esquema de datos para inyectar en <EntityPage />
const enrichedCollection = computed(() => {
  if (!collection.value) return null;

  const assets = collection.value.assets || [];
  const enrichedAssets = assets.map((asset) => {
    return {
      ...asset,
      artistId: asset.artistId || null,
      thumbnail: asset.thumbnail || null,
      name: asset.name || 'Unknown Asset',
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
      artistId: artist?.slug || 'unknown',
      artistAssetId: asset.name
    },
    query: { fromPage: 'Event', pageId: collection.value?.slug },
  };
};
</script>


<template>
  <!-- <EntityPage :entity="enrichedCollection" :entityType="'event'" :backgrounds="backgrounds"
    bannerAndCardImagePrefix="../images/events/" assetImagePrefix="../images/artists/" :returnRoute="'/events'"
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
    }" /> -->

  <EntityPage :entity="enrichedCollection" :entityType="'event'" :backgrounds="backgrounds"
    :bannerAndCardImagePrefix="UPLOADS_PREFIX" :assetImagePrefix="UPLOADS_PREFIX" :returnRoute="'/events'"
    :collectionName="collection?.title || 'Loading...'" :assetLinkFn="linkToAsset" :backgroundProps="{
      top: '10rem',
      left: '5rem',
      transform: 'none',
      width: '90%',
      height: '100%',
      backgroundSize: 'contain',
      backgroundPosition: 'top center'
    }" />
</template>