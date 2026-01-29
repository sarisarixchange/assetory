<template>
  <v-card variant="outlined" class="pa-6" style="background-color: var(--secondary-color);">
    <div class="d-flex align-center mb-4">
      <v-icon icon="mdi-account-edit" class="me-2" color="primary"></v-icon>
      <h2 class="text-h5">Edit Artists Content</h2>
      <v-spacer></v-spacer>
      <v-btn 
        color="success" 
        prepend-icon="mdi-content-save" 
        @click="saveContent"
        :loading="isSaving"
      >
        Save Changes
      </v-btn>
    </div>
 
    <div class="editor-wrapper">
      <QuillEditor 
        v-model:content="content" 
        content-type="html" 
        toolbar="full"
        theme="snow"
        style="height: 400px; background: white; color: black;"
      />
    </div>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const content = ref('<h3>Loading content...</h3>');
const isSaving = ref(false);
const API_URL = "http://localhost:3000";

// Cargar el contenido guardado al iniciar
const loadContent = async () => {
  try {
    const res = await axios.get(`${API_URL}/page-content/artists`);
    if (res.data) content.value = res.data.content;
  } catch (err) {
    console.log("No existing content found, starting fresh.");
    content.value = "<h1>Meet our Artists</h1><p>Start writing here...</p>";
  }
};

const saveContent = async () => {
  isSaving.value = true;
  try {
    await axios.post(`${API_URL}/page-content/artists`, {
      content: content.value
    });
    alert("Content updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Error saving content.");
  } finally {
    isSaving.value = false;
  }
};

onMounted(loadContent);
</script>

<style>
/* Ajuste para que Quill se vea bien con tu diseño */
.editor-wrapper .ql-container {
  font-size: 16px !important;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.editor-wrapper .ql-toolbar {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: #f3f3f3;
}
</style>