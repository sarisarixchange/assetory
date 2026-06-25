<template>
  <v-app v-if="!isAuthenticated" style="background-color: var(--background-color);">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12 pa-6" rounded="lg">
            <v-card-item class="text-center">
              <!-- <v-icon size="64" color="primary" class="mb-2">mdi-lock-pattern</v-icon> -->
              <v-card-title class="text-h4 font-weight-bold">SSX Assetory Admin</v-card-title>
              <v-card-subtitle>Type Admin Passowrd</v-card-subtitle>
            </v-card-item>

            <v-card-text>
              <v-form @submit.prevent="handleLogin">
                <v-text-field v-model="password" label="Password" prepend-inner-icon="mdi-lock"
                  :type="showPassword ? 'text' : 'password'"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword" :error-messages="errorMessage" variant="outlined"
                  :disabled="isLoading" autocomplete="current-password" required></v-text-field>

                <v-btn type="submit" color="primary" block size="large" class="mt-4 text-white" :loading="isLoading">
                  Entrar
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>

  <v-app v-else style="background-color: var(--background-color);">
    <v-app-bar color="surface" elevation="1">
      <v-app-bar-title class="font-weight-bold">SSX Assetory Admin Panel</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn prepend-icon="mdi-logout" color="error" variant="text" @click="handleLogout">
        Logout
      </v-btn>
    </v-app-bar>

    <!-- <v-navigation-drawer permanent color="#E7F6FC">
      <v-list nav>
        <v-list-subheader class="text-h5">CONTENT</v-list-subheader>
        <v-list-item class="text-h6" prepend-icon="mdi-file-document-multiple" @click="view = 'submissions'"
          :active="view === 'submissions'">Asset Submissions</v-list-item>
        <v-list-item class="text-h6" prepend-icon="mdi-account-edit" @click="view = 'artists'"
          :active="view === 'artists'">Artist Pages</v-list-item>
      </v-list>
      
      <template v-slot:append>
        <div class="pa-4">
          <v-btn block color="error" variant="outlined" prepend-icon="mdi-logout" @click="handleLogout">
            Log out
          </v-btn>
        </div>
      </template>
</v-navigation-drawer> -->

    <v-navigation-drawer permanent>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-cube-send" title="Submissions Manager" :active="currentTab === 'submissions'"
          @click="currentTab = 'submissions'"></v-list-item>

          <v-list-item prepend-icon="mdi-palette-outline" title="Artists Manager" :active="currentTab === 'artists'"
            @click="currentTab = 'artists'"></v-list-item>

          <v-list-item prepend-icon="mdi-calendar-text" title="Events Manager" :active="currentTab === 'events'"
            @click="currentTab = 'events'"></v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-10">
        <h2 class="text-h3 mb-6" style="font-family: var(--font-family-Decorative);">
          {{ view.toUpperCase() }}
        </h2>

        <SubmissionsManager v-if="currentTab === 'submissions'"/>

        <ArtistsManager v-if="currentTab === 'artists'" />
        
        <EventsManager v-else-if="currentTab === 'events'" />

        <!-- <div v-if="view === 'submissions'">
          <SubmissionsManager />
        </div>

        <div v-if="view === 'artists'">
          <ArtistsManager /> -->
        <!-- </div> -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SubmissionsManager from '../components/SubmissionsManager.vue';
import ArtistsManager from '../components/ArtistsManager.vue';
import EventsManager from '../components/EventsManager.vue';

const view = ref('submissions');

// Estados del formulario y de sesión
const isAuthenticated = ref(false);
const password = ref('');
const showPassword = ref(false);
const errorMessage = ref('');
const isLoading = ref(false);

const currentTab = ref('artists');

// Automatically uses localhost:3000 in dev, or mcmaster URL in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

onMounted(() => {
  // Comprobar si hay una sesión activa guardada localmente
  if (localStorage.getItem('assetory_admin_logged') === 'true') {
    isAuthenticated.value = true;
  }
});

const handleLogin = async () => {
  if (!password.value) return;

  isLoading.value = true;
  errorMessage.value = '';

  try {
    // Hacemos la petición POST al backend enviando la contraseña
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      password: password.value
    });

    if (response.data.success) {
      isAuthenticated.value = true;
      localStorage.setItem('assetory_admin_logged', 'true');
      password.value = ''; // Limpiamos la casilla
    }
  } catch (error) {
    // Capturamos el error 401 u otros problemas de conexión
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Contraseña incorrecta. Inténtalo de nuevo.';
    } else {
      errorMessage.value = 'No se pudo conectar con el servidor backend.';
    }
    console.error('Error de login:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleLogout = () => {
  isAuthenticated.value = false;
  localStorage.removeItem('assetory_admin_logged');
};
</script>

<style>
#app,
.v-application {
  font-family: var(--font-text) !important;
}
</style>