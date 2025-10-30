<script>
import EntityPage from '../components/EntityPage.vue';
import data from '../data/events.json';
import artistsData from '../data/artists.json';

export default {
  components: { EntityPage },
  data() {
    return {
      collection: null,
      backgrounds: {
        default: '../backgrounds/background-event-page-default.svg',
        grayscale: '../backgrounds/background-event-page-grayscale.svg',
        highContrast: '../backgrounds/background-event-page-high-contrast.svg',
        wcag: '../backgrounds/background-event-page-default.svg'
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
</script>


<template>
  <EntityPage :entity="enrichedCollection" :entityType="'event'" :backgrounds="backgrounds"
    bannerAndCardImagePrefix="../images/events/" assetImagePrefix="../images/artists/" :returnRoute="'/events'"
    :assetLinkFn="linkToAsset" :backgroundProps="{
      top: '15rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '72.90375rem',
      height: '23.65413rem',
      backgroundSize: '100%',
      backgroundPosition: 'center'
    }" />
</template>