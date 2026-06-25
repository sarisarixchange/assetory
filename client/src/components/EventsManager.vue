<template>
  <v-container>
    <v-card v-if="!editingEvent" variant="outlined">
      <v-toolbar color="transparent" density="compact">
        <v-toolbar-title>Community Events Management</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" prepend-icon="mdi-plus" @click="createNewEvent">
          Create New Event
        </v-btn>
      </v-toolbar>

      <v-table>
        <thead>
          <tr>
            <th>Event Title</th>
            <th>Status</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="events.length === 0">
            <td colspan="3" class="text-center text-grey-darken-1 pa-4">
              No events found. Click "Create New Event" to start.
            </td>
          </tr>
          <tr v-for="event in events" :key="event.id">
            <td><strong>{{ event.title }}</strong></td>
            <td>
              <v-chip :color="event.is_active ? 'success' : 'warning'" size="small" variant="tonal">
                {{ event.is_active ? 'Active' : 'Draft' }}
              </v-chip>
            </td>
            <td class="text-right">
              <v-btn icon="mdi-pencil" variant="text" color="blue" @click="startEdit(event)"></v-btn>
              <v-btn icon="mdi-delete" variant="text" color="error" @click="deleteEvent(event.id)"></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>


    <v-card v-else variant="flat">
      <v-btn prepend-icon="mdi-arrow-left" variant="text" @click="handleCancel" class="mb-4">
        Back to List
      </v-btn>

      <v-row>
        <v-col cols="6">
          <v-text-field v-model="editingEvent.title" @input="isDirty = true" label="Event Title"
            variant="outlined"></v-text-field>

          <v-card variant="outlined" class="pa-4">
            <p class="text-h6">Event Cover (Thumbnail & Banner)</p>

            <v-img :src="getImageUrl(editingEvent.thumbnail)" height="150"
              class="bg-grey-lighten-2 rounded my-4"></v-img>

            <input type="file" ref="fileInput" style="display: none;" accept="image/*" @change="onFileSelected">

            <v-btn block color="blue-darken-1" variant="tonal" prepend-icon="mdi-upload"
              @click="$refs.fileInput.click()" class="mb-4">
              Upload Image
            </v-btn>

            <v-text-field v-model="editingEvent.thumbnail" label="Thumbnail Filename" hint="Example: cover.jpg"
              variant="outlined" density="compact" prepend-inner-icon="mdi-image" readonly></v-text-field>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-btn block color="success" :disabled="isDirty === false" size="large" @click="saveChanges" class="mb-1">
            Save Changes
          </v-btn>

          <v-btn block color="secondary" size="large" prepend-icon="mdi-eye" @click="openPreview" class="mb-1">
            Preview Page
          </v-btn>

          <v-btn block color="red" size="large" @click="handleCancel">
            Cancel
          </v-btn>

          <v-switch v-model="editingEvent.is_active" @change="isDirty = true"
            :label="editingEvent.is_active ? 'Status: Active (Public)' : 'Status: Draft (Hidden)'" color="success" inset
            class="ml-2 mb-4"></v-switch>
        </v-col>

        <v-col cols="12">
          <div v-for="(card, index) in editingEvent.cards" :key="index" class="mb-6">
            <p class="text-subtitle-1 mb-2">Event Description Card #{{ index + 1 }}</p>
            <QuillEditor v-model="card.description" placeholder="Write something here..."
              @textChange="isDirty = true" @keydown.ctrl.s.prevent="saveChanges" />
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>

import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import QuillEditor from './QuillEditor.vue';

const router = useRouter();

const API_BASE_URL = "http://localhost:3000";
const UPLOADS_PREFIX = `${API_BASE_URL}/uploads/`;

const events = ref([]);
const editingEvent = ref(null);
const tempSessionFolder = ref(null); // 🔥 CAPTURA DE SESIÓN TEMPORAL
const isDirty = ref(false);          // 🔥 CONTROL DE CAMBIOS SIN GUARDAR
const fileInput = ref(null);

const fetchEvents = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/events`);
  events.value = res.data;
};

const startEdit = async (event) => {
  editingEvent.value = JSON.parse(JSON.stringify(event));
  
  await nextTick();
  isDirty.value = false;
  tempSessionFolder.value = null; // Reseteamos al cambiar de edición
};


const onFileSelected = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  try {
    // 🔥 Apuntamos al nuevo endpoint exclusivo de eventos
    const res = await axios.post(`${API_BASE_URL}/api/upload-event-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    const pathParts = res.data.dbPath.split('/');
    if (pathParts.length >= 2) {
      tempSessionFolder.value = pathParts[1]; // Sigue guardando el ID de sesión para el cleanup
    }

    // Ahora dbPath vendrá perfecto como: "events/1782337.../filename.jpg"
    editingEvent.value.thumbnail = res.data.dbPath;
    editingEvent.value.banner_image = res.data.dbPath; // Espejo

    isDirty.value = true;
  } catch (err) {
    console.error("❌ Error uploading event image:", err);
    alert("Failed to upload image.");
  }
};

const openPreview = () => {
    // 1. Si el event es nuevo (no tiene ID), es obligatorio guardar
    if (!editingEvent.value.id || isDirty.value) {
        alert("Please save the event before previewing.");
    } else {

        // 3. Si todo está en orden o el usuario aceptó ver la versión vieja:
        const routeData = router.resolve({
            name: 'Event',
            params: { slug: editingEvent.value.slug }
        });

        window.open(routeData.href, '_blank');
    }
};

const saveChanges = async () => {
  if (!editingEvent.value.title.trim()) {
    alert("Please specify a valid Event Title before saving.");
    return;
  }

  try {
    const event = editingEvent.value;
    const isNew = !event.id;

    const payload = {
      title: event.title,
      slug: event.slug,
      is_active: event.is_active,
      thumbnail: event.thumbnail,
      banner_image: event.banner_image,
      cards: event.cards
    };

    if (!isNew) {
      await axios.put(`${API_BASE_URL}/api/events/${event.id}`, payload);
    } else {
      const res = await axios.post(`${API_BASE_URL}/api/events`, payload);
      editingEvent.value.id = res.data.id;
    }

    await fetchEvents();

    // Sincronizamos estados preventivos tras guardar con éxito
    isDirty.value = false;
    tempSessionFolder.value = null;

    alert("Saved successfully!");
    // editingEvent.value = null;
  } catch (err) {
    console.error("❌ Error storing event data:", err);
    alert("Failed saving event changes.");
  }
};

const generateSlug = (text) => {
  return text.toLowerCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
};

watch(() => editingEvent.value?.title, (newTitle) => {
  if (editingEvent.value && !editingEvent.value.id && newTitle) {
    editingEvent.value.slug = generateSlug(newTitle);
  }
});

const createNewEvent = () => {
  editingEvent.value = {
    id: null,
    title: 'New Event',
    slug: '',
    is_active: true,
    thumbnail: 'events/placeholder.jpg',
    banner_image: 'events/placeholder.jpg',
    cards: [{ description: '' }]
  };
  isDirty.value = true;
  tempSessionFolder.value = null;
};

// 🔥 CONTROL ABSOLUTO DE CANCELACIÓN E INTERRUPCIONES
const handleCancel = async () => {
  if (isDirty.value) {
    const confirmCancel = confirm("Are you sure you want to leave? Any unsaved changes on this event will be lost.");
    if (!confirmCancel) return;
  }

  // Si se subió un archivo pero se canceló, borramos la carpeta temporal
  if (tempSessionFolder.value && isDirty.value) {
    try {
      await axios.post(`${API_BASE_URL}/api/cleanup/temp-folder`, {
        folderName: tempSessionFolder.value
      });
      console.log("♻️ Temporary event session folder removed from storage.");
    } catch (err) {
      console.error("❌ Error cleaning up temporary folder:", err);
    }
  }

  tempSessionFolder.value = null;
  isDirty.value = false;
  editingEvent.value = null;
};

const handleBeforeUnload = (event) => {
  if (isDirty.value) {
    event.preventDefault();
    event.returnValue = '';
  }
};

const getImageUrl = (filename) => {
  if (!filename) return 'http://localhost:3000/uploads/events/placeholder.jpg';
  if (filename.startsWith('http')) return filename;
  return `${UPLOADS_PREFIX}${filename}`;
};

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
  fetchEvents();
});

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
});
</script>