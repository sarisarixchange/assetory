<script>
import SearchBar from '../widgets/SearchBar.vue'; // Import the SearchBar component
import { useSearchStore } from '../stores/searchStore';
import collectionsData from '../data/collections.json';
import artistsData from '../data/artists.json'; // Import artists data if needed




export default {
  name: 'GalleryGrid',

  components: {
    SearchBar // Register the SearchBar component
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
    },

    isEventsPage: {
      type: Boolean,
      default: false
    },

    isArtistsPage: {
      type: Boolean,
      default: false
    },


    theme: {
      type: String,
      default: 'default'
    },

  },

  data() {
    return {
      isDescriptionShown: false,
      cardHeight: '23.125rem',
      openCurrentIndex: null,
      openPastIndex: null,

      backgrounds: {
        default: './backgrounds/background-meet-the-team-default.svg',
        grayscale: './backgrounds/background-meet-the-team-grayscale.svg',
        highContrast: './backgrounds/background-meet-the-team-high-contrast.svg',
        wcag: './backgrounds/background-meet-the-team-default.svg'
      }
    };
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
          thumbnail: `${this.basePath}` + item.thumbnail
        }));
    },

    imageUrl() {
      return this.backgrounds[this.theme] || this.backgrounds['default']
    },

    currentTeam() {
      return this.filteredGalleryWithFullPath.filter(
        (p) => p.status === "current"
      );
    },
    pastTeam() {
      return this.filteredGalleryWithFullPath.filter(
        (p) => p.status === "past"
      );
    }
  },

  methods: {




    // If clicking the same card, toggle it closed.
    showCurrentAbout(index) {
      if (this.openCurrentIndex === index) {
        this.openCurrentIndex = null; 
        this.cardHeight = '30.5624rem';
        return;
      }
        // Otherwise open the clicked card
        this.openCurrentIndex = index;
        this.cardHeight = '30.5624rem';
    },

      closeBio() {
        this.openCurrentIndex = null;
        this.openPastIndex = null;
        this.cardHeight = '23.125rem';
      },

      showPastAbout(index) {
        // If clicking the same card, toggle it closed.
        if (this.openPastIndex === index) {
          this.openPastIndex = null;
          this.cardHeight = '23.125rem';
          return;
        }

        // Otherwise open the clicked card
        this.openPastIndex = index;
        this.cardHeight = '30.5624rem';
      }
    }



    // do not erase curly brackets below
  }

</script>
<!-- If your id param should come from the item's actual id instead of its index, just change: -->
<!-- params: { id: gallery.id } -->

<template>
  <div v-if="isAboutPage" class="aboutPage" :style="{
    // backgroundImage: `url('${this.imageUrl}')`,
    // backgroundSize: 'contain'
  }">
    <!-- current team members -->
    <div class="meetTheTeamHeader">

      <h3>
        <img class="arrowHeadingAboutPage" src="/icons/left-decor-default.svg">
        Meet the Team
        <img class="arrowHeadingAboutPage" src="/icons/right-decor-default.svg">
      </h3>
    </div>

    <div class="heading-and-searchbar-about">

      <div class="gallery-section-heading-about">
        <img class="arrow" src="/icons/arrow-left-white.svg">
        Our Team
        <img class="arrow" src="/icons/arrow-right-white.svg">
      </div>


    </div>

    <div class="galleryGridAboutPage">
      <div class="galleryCardAboutPage" :style="{ height: openCurrentIndex === index ? '30.5624rem' : '23.125rem' }"
        v-for="(gallery, index) in currentTeam" :key="'current-' + index">
        <div class="galleryCardImageWrapper">
          <div class="galleryCardContentAboutPage">
            <img :src="gallery.thumbnail"alt="" aria-hidden="true" class="galleryCardContentImageAboutPage">
          </div>
        </div>

        <!-- CLICKABLE TITLE AREA -->
        <div class="galleryCardBottomTextAboutPage" :class="{ expanded: openCurrentIndex === index }" tabindex="0"
          role="button" :aria-expanded="openCurrentIndex === index" @click="showCurrentAbout(index)"
          @keydown.esc="closeBio()" @keydown.enter="showCurrentAbout(index)"
          @keydown.space.prevent="showCurrentAbout(index)">
          <p>{{ gallery.title }}</p>
          <img class="asterisk-in-name-about-page"
            :src="openCurrentIndex === index ? '/icons/arrow-right-white.svg' : '/icons/arrow-right-black.svg'"
            src="/icons/arrow-right-black.svg" alt="">
        </div>

        <div class="about-paragraph" v-show="openCurrentIndex === index" @keydown.esc="closeBio()">
          <p>{{ gallery.about }}</p>
        </div>

      </div>
    </div>

    <!-- past team members -->
    <div class="heading-and-searchbar-about">
      <div class="gallery-section-heading-about">
        <img class="arrow" src="/icons/arrow-left-white.svg">
        Past Team Members
        <img class="arrow" src="/icons/arrow-right-white.svg">
      </div>
    </div>

    <div class="galleryGridAboutPage">
      <div class="galleryCardAboutPage" :style="{ height: openPastIndex === index ? '30.5624rem' : '23.125rem' }"
        v-for="(gallery, index) in pastTeam" :key="'past-' + index">
        <div class="galleryCardContentAboutPage">
          <img :src="gallery.thumbnail"
            alt="" aria-hidden="true"
            class="galleryCardContentImageAboutPage">
        </div>

        <!-- CLICKABLE TITLE AREA -->
        <div class="galleryCardBottomTextAboutPage" :class="{ expanded: openPastIndex === index }" tabindex="0"
          role="button" :aria-expanded="openCurrentIndex === index" @click="showPastAbout(index)"
          @keydown.esc="closeBio()" @keydown.enter="showPastAbout(index)" @keydown.space.prevent="showPastAbout(index)">

          <p>{{ gallery.title }}</p>
          <img class="asterisk-in-name-about-page"
            :src="openPastIndex === index ? '/icons/arrow-right-white.svg' : '/icons/arrow-right-black.svg'"
            src="/icons/arrow-right-black.svg" alt="">
        </div>

        <p v-show="openPastIndex === index">{{ gallery.about }}</p>

      </div>
    </div>
  </div>

  <div v-else-if="isEventsPage">

    <!-- heading and searchbar -->
    <div class="heading-and-searchbar">
      <div class="gallery-heading">
        <h2>{{ galleryName }}</h2>
        <p>{{ galleryDescription }}</p>
      </div>

      <!-- searchbar only show if enabled -->
      <SearchBar v-if="showSearchBar" />
    </div>

    <div class="eventsGalleryGrid">
      <div class="eventsGalleryCard" v-for="(gallery, index) in filteredGalleryWithFullPath" :key="index">
        <div class="eventsGalleryCardContent">
          <img :src="gallery.thumbnail"
            alt="" aria-hidden="true"
            class="galleryCardContentImage">
        </div>


        <div class="galleryCardContentGoTo">
          <router-link :to="{ name: routeName, params: { id: index } }" class="galleryCardContentLink">
            <span class="learn-more">{{ gallery.title }}</span>
            <span class="galleryCardGoToArrow" aria-hidden="true">
              <img src="/icons/arrow-right-black.svg" alt="" />
            </span>
          </router-link>
        </div>
      </div>
    </div>

  </div>


<div v-else>
  <div class="heading-and-searchbar">
    <div class="gallery-heading">
      <h2>{{ galleryName }}</h2>
      <p>{{ galleryDescription }}</p>
    </div>
    <SearchBar v-if="showSearchBar" />
  </div>

  <div class="galleryGrid">
    <div 
      :class="isArtistsPage ? 'galleryCardArtists' : 'galleryCard'"
      v-for="gallery in filteredGalleryWithFullPath" 
      :key="gallery.id"
    >
      <div class="galleryCardContent">
        <img 
          :src="gallery.thumbnail"
          alt="" 
          aria-hidden="true"
          class="galleryCardContentImage"
        >
      </div>

      <div class="galleryCardContentGoTo">
        <router-link 
          :to="{ name: routeName, params: { slug: gallery.slug } }" 
          class="galleryCardContentLink"
        >
          <span class="learn-more">{{ gallery.title }}</span>
          <span class="galleryCardGoToArrow" aria-hidden="true">
            <img src="/icons/arrow-right-black.svg" alt="" />
          </span>
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.heading-and-searchbar-about {
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

.heading-and-searchbar {
  color: var(--primary-color);
  width: 62.75rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gallery-section-heading {
  display: flex;
  height: 1.875rem;
  padding: 0.5rem;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.5rem;
  background-color: black;
  color: white;
  font-family: var(--font-family-Decorative);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.025rem;
}

.arrow {
  width: 0.54rem;


}

.galleryGrid {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
  padding-left: 5.53rem;
  padding-right: 5.53rem;
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
  font-family: var(--font-family-Decorative);
  font-size: 1.5rem;
  font-weight: 400;
}

.gallery-heading p {
  font-size: 1rem;
  font-weight: 400;
}

.galleryCard {
  display: flex;
  width: 24rem;
  /* height: 24rem; */
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


.galleryCardArtists {
  display: flex;
  width: 20.25rem;
  height: 23.125rem;
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
  height: 18.75rem;
  align-self: stretch;
  border-radius: 8px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
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
  border: 1px solid var(--primary-color);
  font-family: var(--font-family-Decorative);
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: 400;
  background-color: var(--secondary-color);
  align-items: center;
  align-self: stretch;
  padding: 0.75rem;
}

.galleryCardGoToArrow img {
  width: 0.55rem;
}

/* CSS normally can’t “select the parent” of a hovered element, but :has() flips that — it says “select .galleryCard if it has a child .galleryCardContentGoTo that’s being hovered.” */
/* Not compatible with Firefox? */
.galleryCard:has(.galleryCardContentGoTo:hover) {
  box-shadow: -4px 4px 0 0 var(--primary-color);
}

.galleryCardArtists:has(.galleryCardContentGoTo:hover) {
  box-shadow: -4px 4px 0 0 var(--primary-color);
}

.eventsGalleryCard:has(.galleryCardContentGoTo:hover) {
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



/* Events */

.eventsGalleryGrid {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  gap: 2.5rem;
  padding-left: 5.53rem;
  padding-right: 5.53rem;
  align-items: center;
}



.eventsGalleryCard {
  display: flex;
  width: 60.5625rem;
  height: 18.125rem;
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

.eventsGalleryCardContent {
  height: 13.75rem;
  align-self: stretch;
  border-radius: 8px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

/* About page */
/* css only if in about page */
.aboutPage {
  border: 1px solid var(--primary-color);
  border-radius: 1rem;
  width: 93.375rem;
  margin: auto;
  padding: 1.25rem 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.meetTheTeamHeader {
  width: 100%;
  background-color: var(--primary-color);
  text-align: center;
  font-family: var(--font-family-Decorative);
  color: var(--secondary-color);
  border: none;
  border-radius: 12px;
  font-size: 3rem;
  font-weight: 400;
}


.gallery-section-heading-about {
  display: flex;
  height: 1.875rem;
  padding: 0.5rem;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.5rem;
  background-color: black;
  color: white;
  font-family: var(--font-family-Decorative);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.025rem;
}

.arrowHeadingAboutPage {
  width: 5.45231rem;
  height: 1.96581rem;

}


.galleryGridAboutPage {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 2.94rem;
  flex-wrap: wrap;
  background-color: var(--background-color);
  /* padding-left: 5.53rem; */
  /* padding-right: 5.53rem; */
}


.galleryCardAboutPage {
  display: flex;
  width: 20.25rem;
  height: 23.125rem;
  flex-direction: column;
  justify-content: flex-start;
  /* keep content of the card at the top*/
  align-items: center;
  padding: 0.75rem;
  border-radius: 1rem;
  gap: 0.5rem;
  border: 1px solid var(--primary-color);
  background-color: #fff;
}

.galleryCardContentAboutPage {
  width: 18.75rem;
  height: 18.75rem;
  align-self: stretch;
  border-radius: 0.625rem;
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

.galleryCardImageWrapper {
  /* aspect-ratio: 1 / 1;  */
  overflow: hidden;
  background-color: var(--secondary-color);
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.galleryCardContentImageAboutPage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}


.galleryCardBottomTextAboutPage {
  display: flex;
  padding: 0.75rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.5rem;
  border: 1px solid var(--primary-color);
  background-color: var(--background-color);
  font-family: var(--font-family-Decorative);
  color: var(--primary-color);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.05625rem;
  justify-content: space-between;
  cursor: pointer;
}

.galleryCardBottomTextAboutPage:hover,
.galleryCardBottomTextAboutPage:focus-visible {
  background-color: var(--hover-color-left-box);
  color: var(--hover-text-color-left-box);
}



.asterisk-in-name-about-page {
  color: black;
  width: 0.94081rem;
  height: 0.97863rem;
  transition: transform 0.25s ease;
  /* smooth rotation */
}

/* optional: if you also want it rotated when expanded */
.galleryCardBottomTextAboutPage.expanded .asterisk-in-name-about-page {
  transform: rotate(-90deg);
  /* arrow points up when expanded */
}

.galleryCardBottomTextAboutPage.expanded {
  background-color: var(--background-color-headings);
  color: white;
  border-color: var(--primary-color);
}

.about-paragraph {
  overflow-y: auto;
}


/* Mobile adjustments */
@media (max-width: 768px) {

  .aboutPage {
    width: 100%;
    margin: auto;
    padding: 1.25rem 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .meetTheTeamHeader {
    width: 100%;
    background-color: var(--primary-color);
    text-align: center;
    font-family: var(--font-family-Decorative);
    color: var(--secondary-color);
    border: none;
    border-radius: 12px;
    font-size: 2rem;
    font-weight: 400;
  }


  .eventsGalleryGrid {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    gap: 2.5rem;
    padding-left: 5.53rem;
    padding-right: 5.53rem;
    align-items: center;
  }



  .eventsGalleryCard {
    display: flex;
    width: 100%;
    height: auto;
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
}
</style>
