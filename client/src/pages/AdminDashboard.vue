<template>
  <v-app v-if="!isAuthenticated" style="background-color: var(--background-color);">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12 pa-6" rounded="lg">
            <v-card-item class="text-center">
              <v-card-title class="text-h4 font-weight-bold">SSX Assetory Admin</v-card-title>
              <v-card-subtitle>Type Admin Password</v-card-subtitle>
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

    <v-navigation-drawer permanent>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-cube-send" title="Submissions Manager" :active="currentTab === 'submissions'"
          @click="currentTab = 'submissions'"></v-list-item>

        <v-divider class="my-2"></v-divider>
        <v-list-subheader>CONTENT MANAGEMENT</v-list-subheader>

        <v-list-item prepend-icon="mdi-palette-outline" title="Artists" :active="currentTab === 'artists'"
          @click="currentTab = 'artists'"></v-list-item>

        <v-list-item prepend-icon="mdi-calendar-text" title="Events" :active="currentTab === 'events'"
          @click="currentTab = 'events'"></v-list-item>

        <v-list-item prepend-icon="mdi-folder-multiple-image" title="Collections" :active="currentTab === 'collections'"
          @click="currentTab = 'collections'"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-10">
        <SubmissionsManager v-if="currentTab === 'submissions'"/>

        <Manager v-else :initial-module="currentTab" :key="currentTab" />
     </v-container> </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SubmissionsManager from '../components/SubmissionsManager.vue';
// 🌟 Importamos tu nuevo componente unificado maestro
import Manager from '../components/Manager.vue'; 

const isAuthenticated = ref(false);
const password = ref('');
const showPassword = ref(false);
const errorMessage = ref('');
const isLoading = ref(false);

// Iniciamos la pestaña por defecto en 'artists'
const currentTab = ref('artists');

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

onMounted(() => {
  if (localStorage.getItem('assetory_admin_logged') === 'true') {
    isAuthenticated.value = true;
  }
});

const handleLogin = async () => {
  if (!password.value) return;
  isLoading.value = true;
  errorMessage.value = '';

  // try {
  //   const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
  //     password: password.value
  //   });

    try {
   const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
    password: password.value
});

    if (response.data.success) {
      isAuthenticated.value = true;
      localStorage.setItem('assetory_admin_logged', 'true');
      password.value = '';
    }
  } catch (error) {
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