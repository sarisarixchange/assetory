<script>
import SearchBar from '../widgets/SearchBar.vue'; // Import the SearchBar component
import { useSearchStore } from '../stores/searchStore';
import collectionsData from '../data/collections.json';
import artistsData from '../data/artists.json'; // Import artists data if needed




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
    }, 

    showSearchBar: {
      type: Boolean,
      default: true // show by default
    }, 

    isAboutPage: {
      type: Boolean,
      default: false
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
    <div v-if="isAboutPage" class="alwaysPrimary">
  <!-- heading and searchbar -->
  <div class="heading-and-searchbar">
    <div class="gallery-heading">
      <h2>{{ galleryName }}</h2>
      <p>{{ galleryDescription }}</p>
    </div>

    <!-- searchbar only show if enabled -->
<SearchBar v-if="showSearchBar" />
  </div>

  <div class="galleryGrid">
    <div class="galleryCard" v-for="(gallery, index) in filteredGalleryWithFullPath" :key="index">
      <div class="galleryCardContent">
        <img :src="gallery.thumbnail" alt="gallery Image" class="galleryCardContentImage">
      </div>
     
      <p>{{ gallery.title }}</p>
      
     
    </div>
  </div>
</div>

  <div v-else>

    <!-- heading and searchbar -->
    <div class="heading-and-searchbar">
    <div class="gallery-heading">
      <h2>{{ galleryName }}</h2>
      <p>{{ galleryDescription }}</p>
    </div>

    <!-- searchbar only show if enabled -->
<SearchBar v-if="showSearchBar" />
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
  font-size: var(--font-small);
  font-weight: 500;
  padding: 0.25rem;
  margin-right: 5.521vw;
}

.gallery-heading{
  margin-top: 2.247vw;
  margin-left: 4.444vw;
}

.gallery-heading h2 {
  font-family: var(--font-family, 'Handjet'), sans-serif;
  font-size: var(--font-24px);
  font-weight: 400;
}

.gallery-heading p {
  font-size: var(--font-base);
  font-weight: 400;
  
}

.galleryGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 2.247vw;
  padding-left:12.396vw;
  padding-right: 12.396vw;
  /*added quickly for showcase*/
  height: 45vw; 
  justify-items: center; 
  /* gap: 1rem;  */
}

.galleryCard {
  display: flex;
  flex-direction: column;
  padding: 0.833vw;
  border-radius: 12px;
  border: 1px solid var(--primary-color);
  box-shadow: -6px 6px 0 var(--shadow), 0 6px 1px var(--shadow);
  background-color: #fff;
  width: 22.5vw;
  height: 34.644vh;
}

.galleryCardContent {
  width: 20.833vw;
  height: 28.09vh;
  border-radius: 8px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

.galleryCardContentImage {
  width: 100%;
  height: 100%;
  background-color: var(--secondary-color);
  object-fit:contain;
  box-sizing: border-box;
  border-radius: 8px;
}

.galleryCardContentGoTo {
  display: flex;
  border-radius: 8px;
  font-family: var(--font-family, 'Handjet'), sans-serif;
  color: var(--primary-color);
  font-size: var(--font-medium);
  font-weight: 400;
  background-color: var(--secondary-color);
  height: 3.555vh;
  margin-top: 0.748vh;
  align-items: center; 
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

/* css only if in about page */
.alwaysPrimary {
 
  background-color: var(--secondary-color);
  margin-left: 4.444vw;
  margin-right: 4.444vw;
  
  
  /* padding: 1.75%; */
}

.alwaysPrimary .galleryGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 2.247vw;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  justify-items: center; 
  gap: 2.778vw;
}

.alwaysPrimary p {
  border-radius: 8px;
  color: var(--secondary-color);
  background-color: var(--primary-color);
  font-family: var(--font-family, 'Handjet'), sans-serif;
  font-size: var(--font-medium);
  font-weight: 400;
  height: 3.713vw;
  padding: 8px;
}

.alwaysPrimary .galleryGrid .galleryCard {
  display: flex;
  flex-direction: column;
  /* padding: 0.833vw; */
  border-radius: 12px;
  border: 1px solid var(--primary-color);
  box-shadow: -6px 6px 0 var(--shadow), 0 6px 1px var(--shadow);
  background-color: #fff;
  width: 21.875vw;
  height: 24.125vh;
  
}

.alwaysPrimary .galleryCardContent {
  border-radius: 8px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  
}

.alwaysPrimary .galleryCardContent .galleryCardContentImage {
  width: 100%;
  height: 100%;
  padding: 8px;
  /* background-color: var(--secondary-color); */
  object-fit: contain;
  box-sizing: border-box;
  border-radius: 8px;
}
</style>
