<template>
  <v-row>
    <v-col cols="12">
      <v-card variant="outlined" class="mb-4">
        <v-card-title class="d-flex align-center">
          Asset Submissions
          <v-spacer></v-spacer>
          <v-btn prepend-icon="mdi-refresh" @click="fetchSubmissions" variant="text">Refresh</v-btn>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="submissions"
          :loading="isLoading"
          hover
        >
          <template v-slot:item.created_at="{ item }">
            {{ formatDate(item.created_at) }}
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn icon="mdi-eye" variant="text" color="info" @click="viewDetails(item)"></v-btn>
            <v-btn icon="mdi-download" variant="text" color="success" @click="downloadFile(parseFiles(item.files), item.asset_name)"></v-btn>
            <v-btn icon="mdi-delete" variant="text" color="error" @click="deleteSubmission(item.id)"></v-btn>
          </template>
        </v-data-table>
      </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showModal" max-width="700">
      <v-card v-if="selectedSubmission">
        <v-card-title class="bg-primary text-white d-flex">
          {{ selectedSubmission.asset_name }}
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" variant="text" @click="closeModal"></v-btn>
        </v-card-title>
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="6"><strong>Creator:</strong> {{ selectedSubmission.creator_name }}</v-col>
            <v-col cols="6"><strong>Email:</strong> {{ selectedSubmission.email }}</v-col>
            <v-col cols="12"><v-divider></v-divider></v-col>
            <v-col cols="12">
              <strong>Story:</strong>
              <p class="mt-2">{{ selectedSubmission.story }}</p>
            </v-col>
            <v-col cols="12" v-if="selectedSubmission.representative_image">
              <strong>Representative Image:</strong>
              <v-img :src="getFileUrl(selectedSubmission.representative_image)" class="mt-2 border rounded" max-height="300"></v-img>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="deleteSubmission(selectedSubmission.id)">Delete</v-btn>
          <v-btn @click="closeModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';

const API_URL = "http://localhost:3000";
const submissions = ref([]);
const isLoading = ref(true);
const selectedSubmission = ref(null);
const showModal = ref(false);

const headers = [
  { title: 'Asset Name', key: 'asset_name' },
  { title: 'Creator', key: 'creator_name' },
  { title: 'Type', key: 'asset_type' },
  { title: 'Submitted', key: 'created_at' },
  { title: 'Actions', key: 'actions', sortable: false },
];

const fetchSubmissions = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`${API_URL}/submissions`);
    submissions.value = response.data;
  } catch (err) {
    console.error("Error:", err);
  } finally {
    isLoading.value = false;
  }
};

const getFileUrl = (fileName) => `${API_URL}/uploads/${fileName}`;

const parseFiles = (filesJson) => {
  try {
    const files = typeof filesJson === 'string' ? JSON.parse(filesJson) : filesJson;
    return Array.isArray(files) ? files[0] : null;
  } catch (e) { return null; }
};

const viewDetails = (submission) => {
  selectedSubmission.value = submission;
  showModal.value = true;
};

const closeModal = () => { showModal.value = false; };

const downloadFile = (fileName, originalName) => {
  if (!fileName) return;
  window.open(getFileUrl(fileName), '_blank');
};

const deleteSubmission = async (id) => {
  if (!confirm("Delete this submission?")) return;
  try {
    await axios.delete(`${API_URL}/submissions/${id}`);
    fetchSubmissions();
    closeModal();
  } catch (err) { alert("Error deleting"); }
};

const formatDate = (date) => date ? new Date(date).toLocaleDateString() : "N/A";

onMounted(fetchSubmissions);
</script>