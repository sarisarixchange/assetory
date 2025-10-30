
  <script>
  import EntityPage from '../components/EntityPage.vue';
  import data from '../data/collections.json';
  import artistsData from '../data/artists.json';

  export default {
    components: { EntityPage },
    data() {
      return {
        collection: null,
        backgrounds: {
          default: '../backgrounds/background-collection-default.svg',
          grayscale: '../backgrounds/background-collection-page-grayscale.svg',
          highContrast: '../backgrounds/background-collection-page-high-contrast.svg',
          wcag: '../backgrounds/background-collection-page-default.svg'
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
          query: { fromPage: 'Collection', pageId: this.collection.id },
        };
      },
    },
  };
</script>
  

  <template>
    <EntityPage :entity="enrichedCollection" :entityType="'collection'" :backgrounds="backgrounds"
      bannerAndCardImagePrefix="../images/collections/" assetImagePrefix="../images/artists/"
      :returnRoute="'/collections'" :assetLinkFn="linkToAsset" :backgroundProps="{
        top: '20rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '83.36881rem',
        height: '15.51719rem',
        backgroundSize: '100%',
        backgroundPosition: 'center'
      }" />
  </template>