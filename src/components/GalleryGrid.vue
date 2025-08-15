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
  <div v-if="isAboutPage" class="aboutPage">
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
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}



.heading-and-searchbar input[type=text] {
  width: 14.875rem;
  font-family: 'Inter', sans-serif;
  border: 1px solid var(--primary-color);
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.5rem;
  gap: 0.5rem;
  margin-right: 4rem
}

.gallery-heading {
  margin-left: 4rem;
}

.gallery-heading h2 {
  font-family: var(--font-family, 'Handjet'), sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
}

.gallery-heading p {
  font-size: 1rem;
  font-weight: 400;

}

/* .galleryGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 88.0625rem;
  height: 100vh;
  justify-items: center;
  gap: 2.5rem;
} */

.galleryGrid {
  display: flex;
  width: 100%;
  /* width: 88.0625rem; */
  /* height: 100vh; */
  justify-content: center;
  /* align-items: center; */
  /* align-content: center; */
  gap: 2.5rem;
  flex-wrap: wrap;
  padding-left: 5.53rem;
  padding-right: 5.53rem;

}

.galleryCard {
  display: flex;
  width: 24rem;
  height: 24rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  border-radius: 1rem;
  gap: 0.5rem;
  border: 1px solid var(--primary-color);
  /* box-shadow: -6px 6px 0 var(--shadow), 0 6px 1px var(--shadow); */
  background-color: #fff;
}


.galleryCardContent {
  /* width: 22.5rem; */
  height: 18.75rem;
  align-self: stretch;
  border-radius: 8px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

.galleryCardContentImage {
  width: 100%;
  height: 100%;
  background-color: var(--secondary-color);
  object-fit: cover;
  box-sizing: border-box;
  border-radius: 8px;
}

.galleryCardContentGoTo {
  display: flex;
  height: 2.375rem;
  border-radius: 0.5rem;
  font-family: var(--font-family, 'Handjet'), sans-serif;
  color: var(--primary-color);
  font-size: 1.25rem;
  font-weight: 400;
  background-color: var(--secondary-color);
  align-items: center;
  align-self: stretch;
  padding: 0.75rem;
}

/* CSS normally can’t “select the parent” of a hovered element, but :has() flips that — it says “select .galleryCard if it has a child .galleryCardContentGoTo that’s being hovered.” */
/* Not compatible with Firefox? */
.galleryCard:has(.galleryCardContentGoTo:hover) {
  box-shadow: -4px 4px 0 0 var(--primary-color);
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
.aboutPage {

  background-color: var(--secondary-color);
  margin-left: 4.444vw;
  margin-right: 4.444vw;


  /* padding: 1.75%; */
}

.aboutPage .galleryGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 2.247vw;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  justify-items: center;
  gap: 2.778vw;
}

.aboutPage p {
  border-radius: 8px;
  color: var(--secondary-color);
  background-color: var(--primary-color);
  font-family: var(--font-family, 'Handjet'), sans-serif;
  font-size: var(--font-medium);
  font-weight: 400;
  height: 3.713vw;
  padding: 8px;
}

.aboutPage .galleryGrid .galleryCard {
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

.aboutPage .galleryCardContent {
  border-radius: 8px;
  background-color: var(--secondary-color);
  color: var(--primary-color);

}

.aboutPage .galleryCardContent .galleryCardContentImage {
  width: 100%;
  height: 100%;
  padding: 8px;
  /* background-color: var(--secondary-color); */
  object-fit: contain;
  box-sizing: border-box;
  border-radius: 8px;
}
</style>
