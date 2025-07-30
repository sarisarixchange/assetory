<script>
import Topbar from './Topbar.vue';
import PageBackground from './PageBackground.vue';
import Footer from './Footer.vue';
import BackTopButton from '../widgets/BackTopButton.vue';

export default {
  props: {
    entity: Object,
    entityType: String,
    backgrounds: Object,
    bannerPrefix: String,
    imagePrefix: String,
    backgroundProps: Object,
    returnRoute: String,
    assetLinkFn: Function,
  },
  components: {
    Topbar,
    PageBackground,
    Footer,
    BackTopButton,
  },
  data() {
    return {
      currentTheme: { theme: 'default' },
    };
  },
  computed: {
    bannerImage() {
      return this.entity ? `${this.bannerPrefix}${this.entity.bannerImage}` : '';
    },
    resolvedAssets() {
      return this.entity
        ? this.entity.assets.map((asset) => ({
            ...asset,
            thumbnail: `${this.imagePrefix}${asset.thumbnail}`,
          }))
        : [];
    },
  },
  methods: {
    updateTheme(payload) {
      this.currentTheme = payload;
    },
    resolveCardImage(path) {
      return path ? `${this.imagePrefix}${path}` : '';
    },
    resolveYoutubeUrl(url) {
      const match = url.match(/(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      return match ? `https://www.youtube.com/embed/${match[1]}` : '';
    },
    getAssetLink(asset) {
      return this.assetLinkFn ? this.assetLinkFn(asset, this.entity) : '#';
    },
  },
};
</script>

<style scoped>
.page-container {
position: relative;
}

/* return button */
.returnButton {
padding-left: 0.25rem;
margin-top: 2rem;
margin-bottom: 0.5rem;
}

.returnButton button { 
background-color: transparent;
color: var(--primary-color);
border: 1px solid var(--primary-color);
font-family: 'Inter', sans-serif;
font-size: var(--font-medium);
font-weight: 400;

border-radius: 8px;
padding: 0.125rem;
cursor: pointer;
/* transition: background-color 0.3s ease; */
}


/* collection details */
.collection-details-container{
display: flex;
flex-direction: column;
gap: 1rem;
margin-left: 12rem;
margin-right: 12rem;
margin-bottom: 2rem;
color: var(--primary-color);
font-family: 'Inter', sans-serif;
font-size: var(--font-base);
font-weight: 400;
}


.image-banner-artist {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-image-artist {
  border: 1px solid var(--primary-color);
  border-radius: 20px;
  padding: 0.25rem;
}

.collection-details{
display: flex;
flex-direction: column;
border: 1px solid var(--primary-color);;
border-radius: 20px; 
padding: 1rem;
gap: 1rem;
}

.image-banner-collection {
  width: 100%;
  border: 1px solid var(--primary-color);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
}

.banner-image-collection {
  width: 100%;
  background-color: var(--secondary-color);
  border-radius: 20px;
}

/* heading of card */
.collection-details h2{
font-family: var(--font-family, 'Handjet'), sans-serif; 
font-size: var(--font-24px);
font-weight: 400;
}

.collection-details h3{
font-family: var(--font-family, 'Handjet'), sans-serif; 
font-size: var(--font-base);
font-weight: 400;
}


/* collection cards */

.collection-cards {
display: flex;
flex-direction: column;
gap: 1rem; /* Space between cards */
margin-top: 2rem;
}

.collection-card {
display: flex;
flex-direction: column;
gap: 1rem;
border: 1px solid var(--primary-color);
border-radius: 8px;
padding: 1rem;
background-color: var(--secondary-color);
}

.collection-card-heading {
flex: 0 0 auto; /* Ensure the heading stays at the top */
font-family: 'Inter', sans-serif;
font-size: var(--font-medium);
font-weight: 400;
color: var(--primary-color);
margin-bottom: 0.5rem; /* Add spacing below the heading */
}

.collection-card-content {
display: flex;
flex-direction: column; /* Default: stacked layout */
gap: 1rem;
}

.side-by-side {
flex-direction: row;
align-items: center;
}


.collection-card-text {
display: flex;
font-family: 'Inter', sans-serif;
font-size: var(--font-base);
font-weight: 400;
color: var(--primary-color);
}

.collection-card-image {
/* width: 50%; */
height: auto;
border-radius: 8px;
object-fit: cover;
}

.collection-card-video {
/* width: 50%; */
height: auto;
aspect-ratio: 16 / 9;
border-radius: 8px;
border: 1px solid var(--primary-color);
}

.collection-assets {
text-align: center;

}

.collection-assets h2{
font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
font-size: var(--font-medium);
font-weight: 400;
}

.collection-assets-card-container{
display: grid;
grid-template-columns: repeat(3, 1fr); /* 3 columns */
gap: 1rem;

}

.collection-assets-card {
width: 100%;
height: 15rem;
border: 1px solid  var(--primary-color);
border-radius: 8px;
color:  var(--primary-color);;
margin-bottom: 0.35em;
padding: 1rem;
}

.collection-assets-image {
width: 100%;
height: 100%;
background-color: var(--secondary-color);
object-fit: cover; /* Ensures the image covers the container without distortion */
box-sizing: border-box; /* Includes padding in the element's total size */
border-radius: 8px; /* Optional: Add rounded corners */
}


.social-media-item {
margin-right: 1rem; 
font-size: var(--font-base);
font-weight: 400;
}
</style >


<template>
  <div class="page-container">
    <Topbar @theme-changed="updateTheme" />

    <div class="returnButton">
      <router-link :to="returnRoute" class="nav-button">Return <</router-link>
    </div>

    <PageBackground
      v-if="backgrounds"
      :theme="currentTheme.theme"
      :backgrounds="backgrounds"
      v-bind="backgroundProps"
    />

    <div v-if="entity" class="collection-details-container">
      <!-- Banner -->
      <div :class="['image-banner', (entityType === 'collection' ||  entityType === 'event') ? 'image-banner-collection' :  'image-banner-artist']">
        <img :src="bannerImage" alt="Banner Image" :class="['banner-image', (entityType === 'collection' ||  entityType === 'event') ? 'banner-image-collection' : 'banner-image-artist']" />
      </div>

      <!-- Title + Cards -->
      <div class="collection-details">
        <h2>{{ entity.title }}</h2>
        <div class="collection-cards">
          <div
            v-for="(card, index) in entity.cards"
            :key="index"
            class="collection-card"
          >
            <h3 v-if="card.heading" v-html="card.heading" class="collection-card-heading" />
            <div :class="{ 'side-by-side': card.contentSideBySide }" class="collection-card-content">
              
              <!-- Social (only for artists) -->
              <p v-if="card.social && typeof card.social === 'object'">
                <span
                  v-for="(value, key) in card.social"
                  :key="key"
                  class="social-media-item"
                >
                  <strong>{{ key }}:</strong> {{ value }}
                </span>
              </p>
              <p v-else-if="card.social" v-html="card.social" />

              <p v-if="card.description" v-html="card.description" class="collection-card-text" />
              <iframe
                v-if="card.youtubeUrl"
                :src="resolveYoutubeUrl(card.youtubeUrl)"
                class="collection-card-video"
                frameborder="0"
                allowfullscreen
              />
              <img
                v-else-if="card.image"
                :src="resolveCardImage(card.image)"
                alt="Card Image"
                class="collection-card-image"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Assets Grid -->
      <div class="collection-assets">
        <h2>Assets</h2>
        <div class="collection-assets-card-container">
          <div
            v-for="(asset, index) in resolvedAssets"
            :key="index"
            class="collection-assets-card"
          >
            <router-link :to="getAssetLink(asset)" class="collection-assets-link">
              <img :src="asset.thumbnail" :alt="asset.name" class="collection-assets-image" />
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="collection-details-container">
      <p>Collection not found.</p>
    </div>

    <BackTopButton />
    <Footer :theme="currentTheme" />
  </div>

</template>

