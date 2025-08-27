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
    bannerAndCardImagePrefix: String,
    assetImagePrefix: String,
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
      return this.entity ? `${this.bannerAndCardImagePrefix}${this.entity.bannerImage}` : '';
    },
    resolvedAssets() {
      return this.entity
        ? this.entity.assets.map((asset) => ({
            ...asset,
            thumbnail: `${this.assetImagePrefix}${asset.thumbnail}`,
          }))
        : [];
    },
  },
  methods: {
    updateTheme(payload) {
      this.currentTheme = payload;
    },
    resolveCardImage(path) {  
      return path ? `${this.bannerAndCardImagePrefix}${path}` : ''
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
align-items: center;
width: 60.5625rem;
/* height: 23.96563rem; */
gap: 1.5rem;
  margin-left: auto;
  margin-right: auto;
margin-bottom: 4.5rem;
color: var(--primary-color);
font-family: 'Inter', sans-serif;
font-size: 1rem;
font-weight: 400;
}

/* container */
.image-banner-artist {
  width: 18.75rem;
  height: 18.75rem;
  overflow: hidden;
  align-self: center;
  box-sizing: border-box; 
}

/* actual image */
.banner-image-artist {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border: 1px solid var(--primary-color);
  border-radius:1rem;
  padding: 0.5rem;
}

.collection-details{
display: flex;
flex-direction: column;
background-color: var(--background-color);
width: 53.5rem;
border: 1px solid var(--primary-color);;
border-radius: 1rem;
padding: 1.5rem;
gap: 0.5rem;
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
  width: 53.5rem;
 text-align: center;

}



.collection-assets h2{
font-family: var(--font-family, 'Handjet'), sans-serif; /* Uses Handjet by default */
font-size: 1.25rem;
font-style: normal;
font-weight: 400;
margin-bottom: 1.5rem;

}

.collection-assets-card-container{
display: grid;
grid-template-columns: repeat(3, 1fr); /* 3 columns */
gap: 2rem;

}

.collection-assets-card {
width: 16.5rem;
height: 16.5rem;
border: 1px solid  var(--primary-color);
border-radius: 0.625rem;
color:  var(--primary-color);
padding: 2rem;
}

.collection-assets-image {
width: 100%;
height: 100%;
background-color: var(--secondary-color);
object-fit: cover; /* Ensures the image covers the container without distortion */
box-sizing: border-box; /* Includes padding in the element's total size */
border-radius: 8px; /* Optional: Add rounded corners */
}

.collection-assets-card:hover {
  box-shadow: -4px 4px 0 0 var(--primary-color);
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

    

    <div v-if="entity" class="collection-details-container">
      <!-- Background -->
      <PageBackground
      v-if="backgrounds"
      :theme="currentTheme.theme"
      :backgrounds="backgrounds"
      v-bind="backgroundProps"
    />
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

