<script>
import Topbar from './Topbar.vue';
import PageBackground from './PageBackground.vue';
import Footer from './Footer.vue';
import BackTopButton from '../widgets/BackTopButton.vue';
import ReturnButton from '../widgets/returnButton.vue'; // <-- add this import

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
    collectionName: {
      type: String,
      required: true
    }
  },
  components: {
    Topbar,
    PageBackground,
    Footer,
    BackTopButton,
    ReturnButton, // <-- add this
  },
  data() {
    return {
      interactiveMode: false,
      currentTheme: { theme: 'default' },
    };
  },
  mounted() {
    this.loadInteractiveMode();
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

    scrollCarousel(direction, index) {
      const track = this.$refs['carouselTrack_' + index];

      // If Vue returns an array (rare but can happen), pick the first element
      const el = Array.isArray(track) ? track[0] : track;
      if (!el) return;

      el.scrollBy({ left: direction * 300, behavior: 'smooth' });
    },

    resolveYoutubeUrl(url) {
      const match = url.match(/(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      return match ? `https://www.youtube.com/embed/${match[1]}` : '';
    },

    getAssetLink(asset) {
      return this.assetLinkFn ? this.assetLinkFn(asset, this.entity) : '#';
    },

    loadInteractiveMode() {
      try {
        const savedSettings =
          JSON.parse(localStorage.getItem('accessibilitySettings')) || {};
        this.interactiveMode = savedSettings.interactiveMode ?? false;
      } catch (error) {
        console.error('Error in loadInteractiveMode:', error);
      }
    },

  },


};
</script>

<style scoped>
.page-container {
  position: relative;
}


.returnButton {
  margin-left: 12rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

/* collection details */
.collection-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 62.75rem;
  /* height: 23.96563rem; */
  gap: 1.5rem;
  margin-top: -4rem;
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
  background-color: var(--background-color);
}

/* actual image */
.banner-image-artist {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border: 1px solid var(--primary-color);
  border-radius: 1rem;
  padding: 0.5rem;
}



.image-banner-collection {
  display: flex;
  width: 62.75rem;
  padding: 0.5rem;
  align-items: center;
  gap: 0.625rem;
  overflow: hidden;
  align-self: center;
  box-sizing: border-box;
}

.banner-image-collection {
  width: 100%;
  /* height: 100%; */
  object-fit: contain;
  border: 1px solid var(--primary-color);
  border-radius: 1rem;
  padding: 0.5rem;
}


.collection-details {
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  width: 62.75rem;
  border: 1px solid var(--primary-color);
  ;
  border-radius: 1rem;
  padding: 1.5rem;
  gap: 0.5rem;
}

/* heading of card */
.collection-details h2 {
  font-family: var(--font-family-Decorative);
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
}

.collection-details h3 {
  font-family: var(--font-family-Decorative);
  font-size: 1.25rem;
  font-weight: 700;
}


/* collection cards */

.collection-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* Space between cards */
  margin-top: 2rem;
}

.collection-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* border: 1px solid var(--primary-color); */
  border-radius: 8px;
  padding: 1rem;
  background-color: var(--secondary-color);
}

.collection-card-heading {
  flex: 0 0 auto;
  /* Ensure the heading stays at the top */
  font-family: 'Inter', sans-serif;
  font-size: var(--font-medium);
  font-weight: 400;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  /* Add spacing below the heading */
}

.collection-card-content {
  display: flex;
  flex-direction: column;
  /* Default: stacked layout */
  gap: 1rem;
}

.side-by-side {
  flex-direction: row;
  align-items: center;
}


.collection-card-text {
  display: flex;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  color: var(--primary-color);
}

.collection-card-image {
  width: 50%;
  align-self: center;
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
  width: 62.75rem;

  text-align: center;
}

.collection-assets h2 {
  font-family: var(--font-family, 'Handjet'), sans-serif;
  /* Uses Handjet by default */
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 1.5rem;

}

.collection-assets-card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 3 columns */
  gap: 1.25rem 6.125rem;
}

.collection-assets-card {
  width: 16.5rem;
  height: 16.5rem;
  border: 1px solid var(--primary-color);
  border-radius: 0.625rem;
  color: var(--primary-color);
  padding: 2rem;
}

.collection-assets-image {
  width: 100%;
  height: 100%;
  background-color: var(--secondary-color);
  object-fit: cover;
  /* Ensures the image covers the container without distortion */
  box-sizing: border-box;
  /* Includes padding in the element's total size */
  border-radius: 8px;
  /* Optional: Add rounded corners */
}

.collection-assets-card:hover {
  box-shadow: -4px 4px 0 0 var(--primary-color);
}

.social-media-item {
  margin-right: 1rem;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
}

.carousel {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  /* hide scrollbar for Firefox */
  -ms-overflow-style: none;
  /* hide scrollbar for IE/Edge */
  white-space: nowrap;
}

.carousel-track::-webkit-scrollbar {
  display: none;
  /* hide scrollbar for Chrome/Safari */
}

.carousel-image {
  flex: 0 0 auto;
  /* width: 50%; */
  max-width: 300px;
  /* adjust per your card size */
  margin-right: 10px;
  border-radius: 1rem;
  display: inline-block;

}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1;
  padding: 0 10px;
  border-radius: 50%;
  transition: background 0.2s;
}

.carousel-arrow:hover {
  background: rgba(255, 255, 255, 1);
}

.carousel-arrow.left {
  left: 5px;
}

.carousel-arrow.right {
  right: 5px;
}


/* MOBILE FIXES */
@media (max-width: 768px) {

  /* space around the return button */
  .returnButton {
    margin-left: 1rem;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }

  /* main info container */
  .collection-details-container,
  .collection-details,
  .image-banner-collection,
  .collection-assets {
    width: 100% !important;
    margin-left: 0;
    margin-right: 0;
    padding: 1rem;
  }

  /* banner image full width */
  .image-banner-collection,
  .banner-image-collection {
    width: 100%;
  }

  /* artist banner */
  .image-banner-artist {
    width: 12rem;
    height: auto;
  }

  /* collection card layout: stack on mobile */
  .collection-card-content {
    flex-direction: column !important;
    align-items: center;
  }

  .collection-card-image,
  .collection-card-video {
    width: 100%;
  }

  /* text fills the width */
  .collection-card-text {
    width: 100%;
    font-size: 0.95rem;
  }

  /* asset grid: turn into 1 column */
  .collection-assets-card-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .collection-assets-card {
    width: 100%;
    height: auto;
    padding: 1rem;
  }

  .collection-assets-image {
    width: 100%;
    height: auto;
  }

  /* carousel – maintain responsiveness */
  .carousel-image {
    max-width: 70%;
  }

  /* shrink headings */
  .collection-details h2 {
    font-size: 1.25rem;
  }

  .collection-details h3 {
    font-size: 1.1rem;
  }
}
</style>


<template>
  <div class="page-container">
    <Topbar :interactive-mode="interactiveMode" @theme-changed="updateTheme" :pageTitle="collectionName" />

    <!-- Use the ReturnButton component -->
    <div class="returnButton">
      <ReturnButton :returnRoute="returnRoute" />
    </div>

    <div v-if="entity" class="collection-details-container">
      <!-- Background -->
      <PageBackground v-if="backgrounds" :theme="currentTheme.theme" :backgrounds="backgrounds"
        v-bind="backgroundProps" />
      <!-- Banner -->
      <div
        :class="['image-banner', (entityType === 'collection' || entityType === 'event') ? 'image-banner-collection' : 'image-banner-artist']">
        <img :src="bannerImage" alt="" aria-hidden="true"
          :class="['banner-image', (entityType === 'collection' || entityType === 'event') ? 'banner-image-collection' : 'banner-image-artist']" />
      </div>

      <!-- Title + Cards -->
      <div class="collection-details">
        <h2>{{ entity.title }}</h2>

        <div class="collection-cards">
        <div v-for="(card, index) in entity.cards" :key="index" class="collection-card">
        <!-- <h3 v-if="card.heading" v-html="card.heading" class="collection-card-heading" /> -->
        <!-- <div :class="{ 'side-by-side': card.contentSideBySide }" class="collection-card-content"> -->
            <div>
              <!-- Social (only for artists) -->
              <p v-if="card.social && typeof card.social === 'object'">
                <span v-for="(value, key) in card.social" :key="key" class="social-media-item">
                  <strong>{{ key }}:</strong> {{ value }}
                </span>
              </p>
              <p v-else-if="card.social" v-html="card.social" />

              <!-- <p v-if="card.description" v-html="card.description" class="collection-card-text" /> -->
              <p v-if="card.description" v-html="card.description" class="" />
              <iframe v-if="card.youtubeUrl" :src="resolveYoutubeUrl(card.youtubeUrl)" class="collection-card-video"
                frameborder="0" allowfullscreen />

              <img v-else-if="Array.isArray(card.image) === false && card.image" :src="resolveCardImage(card.image)"
                alt="Card Image" class="collection-card-image" />

              <div v-else-if="Array.isArray(card.image) && card.image.length" class="carousel">

                <button class="carousel-arrow left" @click="scrollCarousel(-1, index)">‹</button>

                <div :ref="'carouselTrack_' + index" class="carousel-track">
                  <img v-for="(img, imgIndex) in card.image" :key="imgIndex" :src="resolveCardImage(img)"
                    class="carousel-image" />
                </div>

                <button class="carousel-arrow right" @click="scrollCarousel(1, index)">›</button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- Assets Grid -->
      <div class="collection-assets">
        <h2>Assets</h2>
        <div class="collection-assets-card-container">
          <div v-for="(asset, index) in resolvedAssets" :key="index" class="collection-assets-card">
            <router-link :to="getAssetLink(asset)" class="collection-assets-link">
              <img :src="asset.thumbnail" :alt="'An image of' + ' ' + asset.name" class="collection-assets-image" />
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
