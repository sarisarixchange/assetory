<script>
import EntityPage from '../components/EntityPage.vue';
import data from '../data/artists.json';

export default {
  components: { EntityPage },
  data() {
    return {
      collection: null,
      backgrounds: {
        default: '../backgrounds/background-artist-page-default.svg',
        grayscale: '../backgrounds/background-artist-page-grayscale.svg',
        highContrast: '../backgrounds/background-artist-page-high-contrast.svg',
        wcag: '../backgrounds/background-artist-page-default.svg',
      },
    };
  },
  mounted() {
    const id = parseInt(this.$route.params.id, 10);
    this.collection = data.find((item) => item.id === id);
  },


  methods: {
    linkToAsset(asset, artist) {
      return {
        name: 'Asset',
        params: { artistId: artist.id, artistAssetId: asset.name },
        query: { fromPage: 'Artist', pageId: artist.id },
      };
    },
  },
};
</script>


<template>
  <EntityPage :entity="collection" :entityType="'artist'" :backgrounds="backgrounds"
    bannerAndCardImagePrefix="../images/artists/" assetImagePrefix="../images/artists/" :returnRoute="'/artists'"
    :assetLinkFn="linkToAsset" :backgroundProps="{
      top: '8.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60.5625rem',
      height: '23.96563rem',
      backgroundSize: '90%',
      backgroundPosition: 'center'
    }" />
</template>