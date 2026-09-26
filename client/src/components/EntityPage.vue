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
    },
    isProjects: {
      type: Boolean,
      default: false
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
      if (!this.entity) return '';
      let path = this.entity.banner_image || this.entity.thumbnail;
      if (!path) return '';

      // 1. Quitar barra inicial si la tiene
      if (path.startsWith('/')) path = path.substring(1);

      // 2. Si ya es una URL externa (http/https), se devuelve directa
      if (path.startsWith('http')) return path;

      // 3. Extraer el nombre de la carpeta contenida en la prop (ej. "events/" o "artists/")
      const prefix = this.bannerAndCardImagePrefix || '';
      const folderMatch = prefix.match(/\/uploads\/([^/]+\/)/);
      const targetFolder = folderMatch ? folderMatch[1] : ''; // ej: "artists/" o "events/"

      // 4. Si la ruta ya empieza con esa carpeta, se la removemos para no duplicar
      if (targetFolder && path.startsWith(targetFolder)) {
        path = path.replace(new RegExp(`^${targetFolder}`), '');
      }

      return `${prefix}${path}`;
    },

    resolvedAssets() {
      if (!this.entity || !this.entity.assets) return [];

      const prefix = this.assetImagePrefix || '';
      const folderMatch = prefix.match(/\/uploads\/([^/]+\/)/);
      const targetFolder = folderMatch ? folderMatch[1] : ''; // ej: "artists/"

      return this.entity.assets.map((asset) => {
        let path = asset.thumbnail || asset.representative_image || '';

        if (!path) return { ...asset, thumbnail: '' };

        // 1. Quitar barra inicial
        if (path.startsWith('/')) path = path.substring(1);

        // 2. Si ya es URL externa completa, retornarla tal cual
        if (path.startsWith('http')) {
          return { ...asset, thumbnail: path };
        }

        // 3. Si path ya inicia con la carpeta del prefijo (ej: "artists/"), se elimina para no duplicar
        if (targetFolder && path.startsWith(targetFolder)) {
          path = path.replace(new RegExp(`^${targetFolder}`), '');
        }

        // 4. Concatenación limpia
        return {
          ...asset,
          thumbnail: `${prefix}${path}`
        };
      });
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

    formatCollapsibleH3(htmlContent) {
      if (!htmlContent) return '';

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      const body = doc.body;

      const headings = body.querySelectorAll('h3');
      if (headings.length === 0) return htmlContent;

      headings.forEach((h3) => {
        const details = document.createElement('details');
        details.className = 'custom-collapsible';

        const summary = document.createElement('summary');
        summary.className = 'collapsible-summary';
        summary.innerHTML = h3.innerHTML;
        details.appendChild(summary);

        const contentGroup = document.createElement('div');
        contentGroup.className = 'collapsible-content';

        let nextSibling = h3.nextElementSibling;

        // Se detiene si encuentra:
        // 1. Otro H3, H2 o H1
        // 2. Una etiqueta <hr>
        // 3. Un elemento con clase de separador de Quill (.ql-hr, .ql-divider, etc.)
        while (nextSibling) {
          const tagName = nextSibling.tagName.toLowerCase();
          const isHeader = ['h1', 'h2', 'h3'].includes(tagName);
          const isHr = tagName === 'hr' || nextSibling.querySelector('hr') || nextSibling.classList.contains('ql-hr');

          if (isHeader || isHr) {
            break; // Detiene la agrupación
          }

          const toMove = nextSibling;
          nextSibling = nextSibling.nextElementSibling;
          contentGroup.appendChild(toMove);
        }

        details.appendChild(contentGroup);

        // Reemplaza el H3 por el acordeón
        h3.parentNode.insertBefore(details, h3);

        // Si la detención fue por un <hr>, se remueve para no dejar espacio vacío redundante
        if (nextSibling && (nextSibling.tagName.toLowerCase() === 'hr' || nextSibling.classList.contains('ql-hr'))) {
          const hrToRemove = nextSibling;
          nextSibling = nextSibling.nextElementSibling;
          hrToRemove.remove();
        }

        h3.remove();
      });

      return body.innerHTML;
    }
  },


};
</script>


<template>
  <div v-if="isProjects" class="page-container-projects">
    <Topbar :interactive-mode="interactiveMode" @theme-changed="updateTheme" :pageTitle="collectionName"
      :isProjectPage="true" />


    <!-- Use the ReturnButton component -->
    <div class="returnButton-projects">
      <ReturnButton :returnRoute="returnRoute" />
    </div>

    <div v-if="entity" class="collection-details-container-projects">
      <!-- Background -->
      <PageBackground v-if="backgrounds" :theme="currentTheme.theme" :backgrounds="backgrounds"
        v-bind="backgroundProps" />
      <!-- Banner -->
      <!-- <div
        :class="['image-banner', (entityType === 'collection' || entityType === 'event') ? 'image-banner-collection' : 'image-banner-artist']">
        <img :src="bannerImage" alt="" aria-hidden="true"
          :class="['banner-image', (entityType === 'collection' || entityType === 'event') ? 'banner-image-collection' : 'banner-image-artist']" />
      </div> -->

      <!-- Title + Cards -->
      <div class="collection-details-projects">
        <!-- <h2>{{ entity.title }}</h2> -->

        <div class="collection-cards-projects">
          <div v-for="(card, index) in entity.cards" :key="index" class="collection-card-projects">
            <div>

              <div v-if="card.description" v-html="formatCollapsibleH3(card.description)"
                class="ql-editor-projects collection-card-text-projects" />


            </div>
          </div>
        </div>
      </div>


    </div>

    <div v-else class="collection-details-container">
      <p>Collection not found.</p>
    </div>

    <BackTopButton />
    <Footer :theme="currentTheme" :isMainWebsite=true />

  </div>


  <div v-else class="page-container">
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
        <!-- <h2>{{ entity.title }}</h2> -->

        <div class="collection-cards">
          <div v-for="(card, index) in entity.cards" :key="index" class="collection-card">
            <div>

              <div v-if="card.description" v-html="card.description" class="ql-editor collection-card-text" />


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
  /* display: flex; */
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

/* Estilos mínimos para que Quill se vea bien */
.ql-editor {
  padding: 0;
  /* Quill añade padding por defecto, lo quitamos */
  white-space: normal;
  /* Evita que el texto se desborde en una sola línea */
  word-wrap: break-word;
}

/* Forzar los alineados que genera Quill */
:deep(.ql-align-center) {
  text-align: center;
}

:deep(.ql-align-right) {
  text-align: right;
}

:deep(.ql-align-justify) {
  text-align: justify;
}

/* Estilos para listas (si las usas en Quill) */
:deep(.ql-editor ul),
:deep(.ql-editor ol) {
  padding-left: 1.5em;
  margin-bottom: 1em;
}

/* 1. Forzar que la imagen ocupe su propia línea y no se mezcle con el texto */
:deep(.ql-editor img) {
  display: block;
  /* Hace que la imagen sea un bloque sólido */
  clear: both;
  /* Rompe cualquier flotación previa */
  max-width: 100%;
  /* No permite que la imagen se salga del contenedor */
  height: auto;
  margin: 1.5rem auto;
  /* Centra la imagen y le da aire arriba y abajo */
}

/* 2. Asegurar que los párrafos de Quill no intenten envolver elementos de forma rara */
:deep(.ql-editor p) {
  margin-bottom: 1rem;
  display: block;
  width: 100%;
}

/* 3. Si Quill genera contenedores de video (iframes), aplicamos lo mismo */
:deep(.ql-editor iframe) {
  display: block;
  margin: 1.5rem auto;
  max-width: 100%;
  width: 100%;
  aspect-ratio: 16 / 9;
}

/* projects */

.page-container-projects {
  position: relative;
  background-color: var(--background-color-main);
}


.returnButton-projects {
  margin-left: 12rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

/* collection details */
.collection-details-container-projects {
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
  color: var(--primary-color-main);
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 400;
}



/* container */
.image-banner-artist-projects {
  width: 18.75rem;
  height: 18.75rem;
  overflow: hidden;
  align-self: center;
  box-sizing: border-box;
  background-color: var(--background-color);
}

/* actual image */
.banner-image-artist-projects {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border: 1px solid var(--primary-color);
  border-radius: 1rem;
  padding: 0.5rem;
}



.image-banner-collection-projects {
  display: flex;
  width: 62.75rem;
  padding: 0.5rem;
  align-items: center;
  gap: 0.625rem;
  overflow: hidden;
  align-self: center;
  box-sizing: border-box;
}

.banner-image-collection-projects {
  width: 100%;
  /* height: 100%; */
  object-fit: contain;
  border: 1px solid var(--primary-color);
  border-radius: 1rem;
  padding: 0.5rem;
}


.collection-details-projects {
  display: flex;
  flex-direction: column;
  background-color: var(--background-color-cards-main);
  width: 62.75rem;
  border: 1px solid var(--border-color-topbar-nav-button-hover);

  border-radius: 1rem;
  padding: 1.5rem;
  gap: 0.5rem;
}

/* heading of card */
.collection-details-projects h2 {
  font-family: var(--font-family-Decorative);
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  color: var(--primary-color-main);
}

.collection-details-projects h3 {
  font-family: var(--font-family-Decorative);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color-main);
}


/* collection cards */

.collection-cards-projects {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* Space between cards */
  margin-top: 2rem;
}

.collection-card-projects {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* border: 1px solid var(--border-color-topbar-nav-button-hover); */
  border-radius: 8px;
  padding: 1rem;
  background-color: var(--background-color-cards-main);
}

.collection-card-heading-projects {
  flex: 0 0 auto;
  /* Ensure the heading stays at the top */
  font-family: 'Inter', sans-serif;
  font-size: var(--font-medium);
  font-weight: 400;
  color: var(--primary-color-main);
  margin-bottom: 0.5rem;
  /* Add spacing below the heading */
}

.collection-card-content-projects {
  display: flex;
  flex-direction: column;
  /* Default: stacked layout */
  gap: 1rem;
}

.side-by-side-projects {
  flex-direction: row;
  align-items: center;
}


.collection-card-text-projects {
  /* display: flex; */
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  color: var(--primary-color-main);
}

.collection-card-image-projects {
  width: 50%;
  align-self: center;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.collection-card-video-projects {
  /* width: 50%; */
  height: auto;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  border: 1px solid var(--primary-color);
}

.collection-assets-projects {
  width: 62.75rem;

  text-align: center;
}

.collection-assets-projects h1 {
  font-family: var(--font-family, 'Handjet'), sans-serif;
  /* Uses Handjet by default */
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 1.5rem;
  background-color: var(-background-color-card-heading-two);
}


.collection-assets-projects h2 {
  font-family: var(--font-family, 'Handjet'), sans-serif;
  /* Uses Handjet by default */
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 1.5rem;
  background-color: var(-background-color-card-heading-two);
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

/* Estilos mínimos para que Quill se vea bien */
.ql-editor {
  padding: 0;
  /* Quill añade padding por defecto, lo quitamos */
  white-space: normal;
  /* Evita que el texto se desborde en una sola línea */
  word-wrap: break-word;
}

/* Forzar los alineados que genera Quill */
:deep(.ql-align-center) {
  text-align: center;
}

:deep(.ql-align-right) {
  text-align: right;
}

:deep(.ql-align-justify) {
  text-align: justify;
}

/* Estilos para listas (si las usas en Quill) */
:deep(.ql-editor ul),
:deep(.ql-editor ol) {
  padding-left: 1.5em;
  margin-bottom: 1em;
}

/* 1. Forzar que la imagen ocupe su propia línea y no se mezcle con el texto */
:deep(.ql-editor img) {
  display: block;
  /* Hace que la imagen sea un bloque sólido */
  clear: both;
  /* Rompe cualquier flotación previa */
  max-width: 100%;
  /* No permite que la imagen se salga del contenedor */
  height: auto;
  margin: 1.5rem auto;
  /* Centra la imagen y le da aire arriba y abajo */
}

/* 2. Asegurar que los párrafos de Quill no intenten envolver elementos de forma rara */
:deep(.ql-editor p) {
  margin-bottom: 1rem;
  display: block;
  width: 100%;
}

/* 3. Si Quill genera contenedores de video (iframes), aplicamos lo mismo */
:deep(.ql-editor iframe) {
  display: block;
  margin: 1.5rem auto;
  max-width: 100%;
  width: 100%;
  aspect-ratio: 16 / 9;
}

/* Estilos para encabezados renderizados desde Quill en Projects */
:deep(.ql-editor-projects h1) {
  background-color: var(--background-color-card-heading-two);
  /* Amarillo (puedes reemplazarlo por tu CSS var si prefieres) */
  color: #1D0018;
  /* Ajuste opcional para legibilidad */
  padding: 0.25rem 0.5rem;
  display: inline-block;
  border-radius: 4px;
  width: 100%;
}

:deep(.ql-editor-projects h2) {
  background-color: var(--background-color-card-heading-one);
  color: #fff;
  padding: 0.25rem 0.5rem;
  gap: 1rem;

  /* 1. Cambiar display para permitir el flujo natural alrededor de objetos flotados */
  display: block;

  /* 2. Asegurar que las palabras largas o URLs se rompan si el espacio es reducido */
  overflow-wrap: break-word;
  word-break: break-word;

  /* 3. Permite que el fondo abarque el texto sin forzar un ancho rígido del 100% */
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;

  border-radius: 4px;
}

/* Estilos para H3 vueltos colapsables en Projects */
:deep(.custom-collapsible) {
  border: 1px solid var(--border-color-topbar-nav-button-hover);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin: 1rem 0;
  background-color: var(--background-color-cards-main);
  transition: background-color 0.2s ease;
}

:deep(.custom-collapsible[open]) {
  background-color: var(--background-color-main);
}

:deep(.collapsible-summary) {
  font-family: var(--font-family-Decorative, sans-serif);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--primary-color-main);
  cursor: pointer;
  user-select: none;
  outline: none;
  list-style-position: inside;
}

:deep(.collapsible-summary:hover) {
  opacity: 0.8;
}

:deep(.collapsible-content) {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--border-color-topbar-nav-button-hover);
}
</style>
