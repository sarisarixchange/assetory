<script>
import EntityPage from '../components/EntityPage.vue';
import data from '../data/artists.json';
import axios from 'axios'; // 1. Asegúrate de importar axios

export default {
  components: { EntityPage },
  data() {
    return {
      collection: null,
      backgrounds: {
        // default: '../backgrounds/background-artist-page-default.svg',
        default: '../backgrounds/background-artist-blue.svg',
        grayscale: '../backgrounds/background-artist-page-grayscale.svg',
        highContrast: '../backgrounds/background-artist-page-high-contrast.svg'
      },
    };
  },

  async mounted() {
    const slug = this.$route.params.slug;
    try {
      const response = await axios.get(`http://localhost:3000/api/artists/${slug}`);
      this.collection = response.data;
    } catch (error) {
      console.error("Artist not found in DB");
    }
  },


  methods: {
    linkToAsset(asset, artist) {
      return {
        name: 'Asset',
        params: { 
          artistId: artist.slug, 
          artistAssetId: asset.name },
        query: { fromPage: 'Artist', pageId: artist.slug },
      };
    },
  },
};
</script>


<template>
  <EntityPage :entity="collection" :entityType="'artist'" :backgrounds="backgrounds"
    bannerAndCardImagePrefix="../images/artists/" assetImagePrefix="../images/artists/" :returnRoute="'/artists'"
    :collectionName="collection?.title || 'Loading...'" :assetLinkFn="linkToAsset" :backgroundProps="{
      top: '8.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60.5625rem',
      height: '23.96563rem',
      backgroundSize: '90%',
      backgroundPosition: 'center'
    }" />
</template>