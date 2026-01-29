<template>
    <v-container>
        <v-card v-if="!editingArtist" variant="outlined">
            <v-toolbar color="transparent" density="compact">
                <v-toolbar-title>Artist Pages</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="primary" prepend-icon="mdi-plus" @click="createNewArtist">Add New Artist</v-btn>
            </v-toolbar>

            <v-table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Assets Count</th>
                        <th class="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="artist in artists" :key="artist.id">
                        <td>{{ artist.title }}</td>
                        <td>{{ artist.assets?.length || 0 }} assets</td>
                        <td class="text-right">
                            <v-btn icon="mdi-pencil" variant="text" color="blue" @click="startEdit(artist)"></v-btn>
                            <v-btn icon="mdi-delete" variant="text" color="error" @click="deleteArtist(artist.id)"></v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>

        <v-card v-else variant="flat">
            <v-btn prepend-icon="mdi-arrow-left" variant="text" @click="editingArtist = null" class="mb-4">Back to
                List</v-btn>

            <v-row>
                <v-col cols="6">
                    
                    <v-text-field v-model="editingArtist.title" label="Artist Name" variant="outlined"></v-text-field>

                    <v-card variant="outlined" class="pa-4">
                        <p class="text-h6">Thumbnail</p>
                        <v-img
                            :src="editingArtist.thumbnail.startsWith('http') ? editingArtist.thumbnail : '../images/artists/' + editingArtist.thumbnail"
                            height="150" class="bg-grey-lighten-2 rounded my-4">
                        </v-img>

                        <input type="file" ref="fileInput" style="display: none;" accept="image/*"
                            @change="onFileSelected">

                        <v-btn block color="blue-darken-1" variant="tonal" prepend-icon="mdi-upload"
                            @click="$refs.fileInput.click()" class="mb-4">Upload Image</v-btn>


                        <v-text-field v-model="editingArtist.thumbnail" label="Thumbnail Filename"
                            hint="Example: carmela.png" variant="outlined" density="compact"
                            prepend-inner-icon="mdi-image"></v-text-field>   
                    </v-card> 
                </v-col>

                <v-col cols="6">
                    <v-btn block color="success" size="large" @click="saveChanges" class="">
                            Save Changes
                        </v-btn>

                    
                </v-col>


                <v-col cols="12">                    
                    <div v-for="(card, index) in editingArtist.cards" :key="index" class="mb-6">
                        <p class="text-subtitle-1 mb-2">Description Card #{{ index + 1 }}</p>
                        <QuillEditor v-model:content="card.description" content-type="html" toolbar="full" theme="snow"
                            style="min-height: 500px; height: auto; background: white;" />
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const artists = ref([]);
const editingArtist = ref(null);

const fetchArtists = async () => {
    const res = await axios.get('http://localhost:3000/api/artists');
    artists.value = res.data;
};

const startEdit = (artist) => {
    // Copia profunda para no modificar la lista original
    editingArtist.value = JSON.parse(JSON.stringify(artist));
};

// En el <script setup> de ArtistsManager.vue

const onFileSelected = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 1. Prepare the file to send it
    const formData = new FormData();
    formData.append('image', file);

    try {
        // 2. send to new endpoint
        const res = await axios.post('http://localhost:3000/api/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        // 3. Update the artist name that we are editing 
        editingArtist.value.thumbnail = res.data.filename;
        alert("Image uploaded successfully!");
    } catch (err) {
        console.error("Error uploading image:", err);
        alert("Failed to upload image.");
    }
};

// const saveChanges = async () => {
//     try {
//         // CAMBIO AQUÍ: Verificamos si el ID existe explícitamente, incluso si es 0
//         if (editingArtist.value.id !== undefined && editingArtist.value.id !== null) {
//             console.log("updating artist with ID:", editingArtist.value.id);
//             await axios.put(`http://localhost:3000/api/artists/${editingArtist.value.id}`, editingArtist.value);
//         } else {
//             console.log("Creando nuevo artista");
//             await axios.post(`http://localhost:3000/api/artists`, editingArtist.value);
//         }

//         editingArtist.value = null;
//         fetchArtists();
//         alert("Saved successfully!");
//     } catch (err) {
//         console.error("Error detallado:", err.response || err);
//         alert("Failed to save. Check terminal for details.");
//     }
// };

const saveChanges = async () => {
    try {
        // Limpiamos los datos de las tarjetas antes de enviar
        const payload = {
            ...editingArtist.value,
            cards: editingArtist.value.cards.map(card => ({
                ...card,
                // Aseguramos que la descripción sea un string de HTML
                description: typeof card.description === 'string'
                    ? card.description
                    : card.description?.html || ''
            }))
        };

        if (payload.id) {
            await axios.put(`http://localhost:3000/api/artists/${payload.id}`, payload);
        } else {
            await axios.post(`http://localhost:3000/api/artists`, payload);
        }

        editingArtist.value = null;
        fetchArtists();
        alert("Saved successfully!");
    } catch (err) {
        console.error("Error al guardar:", err.response?.data || err);
        alert(`Error: ${err.response?.data?.error || "Check terminal"}`);
    }
};

const generateSlug = (text) => {
    return text.toLowerCase().trim()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Quita acentos
        .replace(/\s+/g, '-') // Espacios por guiones
        .replace(/[^\w-]+/g, ''); // Quita lo que no sea letra o guion
};

// Si el título cambia y es un artista nuevo, actualizamos el slug
watch(() => editingArtist.value?.title, (newTitle) => {
    if (editingArtist.value && !editingArtist.value.id) {
        editingArtist.value.slug = generateSlug(newTitle);
    }
});

const createNewArtist = () => {
    editingArtist.value = {
        id: null,
        title: 'New Artist',
        thumbnail: 'placeholder.png',
        banner_image: 'placeholder.png',
        cards: [
            {
                heading: 'Biography',
                description: '',
                contentSideBySide: false
            }
        ],
        assets: []
    };
};


const deleteArtist = async (id) => {
    if (!confirm("Are you sure you want to delete this artist? This cannot be undone.")) return;

    try {
        await axios.delete(`http://localhost:3000/api/artists/${id}`);
        fetchArtists(); // Refrescar la lista
    } catch (err) {
        console.error("Error deleting artist:", err);
        alert("Failed to delete artist.");
    }
};
onMounted(fetchArtists);
</script>
