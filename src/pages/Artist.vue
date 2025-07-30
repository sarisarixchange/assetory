  
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
    <EntityPage
      :entity="collection"
      :entityType="'artist'"
      :backgrounds="backgrounds"
      bannerPrefix="../images/artists/"
      imagePrefix="../images/artists/"
      :returnRoute="'/artists'"
      :assetLinkFn="linkToAsset"
      :backgroundProps="{ top: '8%', left: '10', width: '100%', height: '80%', backgroundSize: '80%', backgroundPosition: 'top' }"
    />
  </template>