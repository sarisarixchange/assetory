<template>
  <v-app style="background-color: var(--background-color);">
    <v-navigation-drawer permanent color="#E7F6FC">
      <v-list nav>
        <v-list-subheader class="text-h5">CONTENT</v-list-subheader>
        <v-list-item class="text-h6" prepend-icon="mdi-file-document-multiple" @click="view = 'submissions'"
          :active="view === 'submissions'">Asset Submissions</v-list-item>
        <v-list-item class="text-h6"  prepend-icon="mdi-account-edit" @click="view = 'artists'"
          :active="view === 'artists'">Artist Pages</v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-10">
        <h2 class="text-h3 mb-6" style="font-family: var(--font-family-Decorative);">
          {{ view.toUpperCase() }}
        </h2>

        <div v-if="view === 'submissions'">
          <SubmissionsManager />
        </div>

        <div v-if="view === 'artists'">
          <ArtistsManager />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import SubmissionsManager from '../components/SubmissionsManager.vue';
import ArtistsEditor from '../components/ArtistsEditor.vue';
import ArtistsManager from '../components/ArtistsManager.vue';

const view = ref('submissions');
</script>

<style>
#app,
.v-application {
  font-family: var(--font-text) !important;
}

h2.text-h3 {
  font-family: var(--font-family-Decorative) !important;
  font-weight: normal;
  /* Opcional, según tu fuente */
}


.v-list-item-title,
.v-list-subheader,
.v-btn,
.v-card-title,
.v-table {
  font-family: var(--font-text) !important;
}
</style>