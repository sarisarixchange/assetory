<script>
import SearchBar from '../widgets/SearchBar.vue'; // Import the SearchBar component
import { useSearchStore } from '../stores/searchStore';
import collectionsData from '../data/collections.json';




export default {
  name: 'GalleryGrid',

  components: {
    SearchBar, // Register the SearchBar component
  },
  
  props: {
    galleryName: {
      type: String,
      required: true
    },
    galleryDescription: {
      type: String,
      required: true
    },
    // Accepts an array of items (collections, artists, etc.)
    items: {
      type: Array,
      required: true
    },

    basePath: {
      type: String,
      required: true
      // default: 'collections/' 
    },

    routeName: {
      type: String,
      required: true  // Make this required to avoid missing it accidentally
    }
  },

  computed: {
    searchQuery() {
      const searchStore = useSearchStore();
      return searchStore.searchQuery;
    },

    filteredGalleryWithFullPath() {
      return this.items
        .filter((item) =>
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
        .map((item) => ({
          ...item,
          thumbnail: `images/${this.basePath}` + item.thumbnail
        }));
    }
  },


  // do not erase curly brackets below
}

</script>
<!-- If your id param should come from the item's actual id instead of its index, just change: -->
<!-- params: { id: gallery.id } -->

<template>
  <!-- heading and searchbar -->
  <div class="heading-and-searchbar">
    <div class="gallery-heading">
      <h2>{{ galleryName }}</h2>
      <p>{{ galleryDescription }}</p>
    </div>

    <!-- searchbar -->
    <SearchBar />
  </div>

  <div class="galleryGrid">
    <div class="galleryCard" v-for="(gallery, index) in filteredGalleryWithFullPath" :key="index">
      <div class="galleryCardContent">
        <img :src="gallery.thumbnail" alt="gallery Image" class="galleryCardContentImage">
      </div>
      <div class="galleryCardContentGoTo">
        <router-link :to="{ name: routeName, params: { id: index } }" class="galleryCardContentLink">
          <span class="learn-more">{{ gallery.title }}</span>
          <span class="ok-action" aria-hidden="true">></span>
        </router-link>
      </div>
    </div>
  </div>

</template>

<style>
.heading-and-searchbar {
  color: var(--primary-color);
  width: 100%;
  margin-top: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.heading-and-searchbar input[type=text] {
  font-family: 'Inter', sans-serif;
  border: 1px solid var(--primary-color);
  border-radius: 2rem;
  font-size: 0.75rem;
  padding: 0.25rem;
}

.gallery-heading h2 {
  font-family: var(--font-family, 'Handjet'), sans-serif;
}

.galleryGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 3 columns */
  gap: 1rem;
  /* Space between cards */
  margin-top: 1.5rem;
  padding-left: 4rem;
  padding-right: 4rem;
}

.galleryCard {
  padding: 1.8%;
  border-radius: 12px;
  border: 1px solid var(--primary-color);
  box-shadow: -6px 6px 0 var(--shadow), 0 6px 1px var(--shadow);
  background-color: #fff;
}

.galleryCardContent {
  /* width: 18.30rem; */
  height: 15rem;
  border-radius: 8px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  margin-bottom: 0.35em;
  padding: 1rem;
}

.galleryCardContentImage {
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

.galleryCardContentGoTo {
  display: flex;
  border-radius: 8px;
  font-family: var(--font-family, 'Handjet'), sans-serif;
  /* Uses Handjet by default */
  color: var(--primary-color);
  font-size: 0.8rem;
  background-color: var(--secondary-color);
  padding: 1.75%;
}

.galleryCardContentLink {
  margin-left: 0.5em;
  width: 90%;
  color: var(--primary-color);
  display: flex;
  justify-content: space-between;
  /* or use margin-left: auto on .ok-action */
  width: 100%;
  /* or any fixed width you prefer */
}

.galleryCardContentGoTo:hover {
  background-color: var(--hover-color);
}

.galleryCardContentGoTo:hover .galleryCardContentLink {
  color: var(--hover-text-color);
}
</style>
