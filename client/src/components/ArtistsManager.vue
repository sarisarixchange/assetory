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
                        <td>{{ artist.title || artist.artist_name }}</td>
                        <td>{{ artist.assets?.length || 0 }} assets</td>
                        <td class="text-right">
                            <v-btn icon="mdi-pencil" variant="text" color="blue" @click="startEdit(artist)"></v-btn>
                            <v-btn icon="mdi-delete" variant="text" color="error"
                                @click="deleteArtist(artist.id)"></v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>

        <v-card v-else variant="flat">
            <v-btn prepend-icon="mdi-arrow-left" variant="text" @click="handleCancel" class="mb-4">Back to
                List</v-btn>

            <v-row>
                <v-col cols="6">

                    <v-text-field v-model="editingArtist.title" @input="isDirty = true" label="Artist Name"
                        variant="outlined"></v-text-field>

                    <v-card variant="outlined" class="pa-4">
                        <p class="text-h6">Thumbnail</p>
                        <v-img :src="getImageUrl(editingArtist.thumbnail)" height="150"
                            class="bg-grey-lighten-2 rounded my-4">
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
                    <v-btn block color="success" :disabled="isDirty === false" size="large" @click="saveChanges"
                        class="">
                        Save Changes
                    </v-btn>

                    <v-btn block color="secondary" size="large" prepend-icon="mdi-eye" @click="openPreview">
                        Preview Page
                    </v-btn>

                    <v-btn block color="red" size="large" @click="handleCancel" class="btn-secondary">
                        Cancel
                    </v-btn>



                </v-col>


                <v-col cols="12">
                    <div v-for="(card, index) in editingArtist.cards" :key="index" class="mb-6">
                        <p class="text-subtitle-1 mb-2">Description Card #{{ index + 1 }}</p>
                        <QuillEditor v-model:content="card.description" @keydown.ctrl.s.prevent="saveChanges"
                            :key="`${editingArtist.id}-${index}`" @textChange="isDirty = true" content-type="html"
                            :modules="editorModules" toolbar="full" theme="snow"
                            style="min-height: 500px; height: auto; background: white;" />
                    </div>
                </v-col>
            </v-row>
        </v-card>

        <div v-if="editingArtist">
            <v-divider class="my-6"></v-divider>
            <h3 class="text-h5 mb-4">3D Asset Management</h3>

            <v-row class="mb-4">
                <v-col cols="12">
                    <input type="file" ref="assetFileInput" hidden accept=".glb,.gltf" @change="onAssetSelected">

                    <v-btn color="primary" prepend-icon="mdi-plus-box" @click="$refs.assetFileInput.click()"
                        :disabled="!editingArtist.id">
                        Subir Nuevo Asset 3D
                    </v-btn>
                    <p v-if="!editingArtist.id" class="text-caption text-error mt-1">
                        * Guarda el artista primero para poder añadirle assets.
                    </p>
                </v-col>
            </v-row>

            <v-row>
                <v-col v-for="(asset, index) in editingArtist.assets" :key="asset.id" cols="12" sm="4">
                    <v-card variant="outlined" class="pa-3">
                        <div class="text-subtitle-1 font-weight-bold">{{ asset.asset_name }}
                            <v-switch v-model="asset.is_visible" :label="asset.is_visible ? 'Asset shows on public profile ' : 'Asset is hidden on public profile'" 
                             :color="asset.is_visible ? 'success' : 'grey'"
                                @change="toggleAssetVisibility(asset)"></v-switch>
                        </div>
                        <div class="text-caption mb-2">{{ asset.asset_Type }}</div>
                        <v-img :src="`http://localhost:3000/uploads/assets/${asset.representative_image}`" height="100"
                            cover class="bg-grey-lighten-2"></v-img> <v-card-actions class="pa-0">
                            
                            <v-spacer></v-spacer>
                            <v-btn icon="mdi-delete" size="small" color="error" variant="text"></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
// 1. Importa el módulo y los estilos
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import ImageResize from 'quill-image-resize-vue'

const router = useRouter();
// ... otros imports
const API_BASE_URL = "http://localhost:3000";
const UPLOADS_PREFIX = `${API_BASE_URL}/uploads/`;

// 2. Definir los módulos que usará el editor
const editorModules = {
    name: 'imageResize',
    module: ImageResize,
    options: {
        displaySize: true
    }
}

const artists = ref([]);
const editingArtist = ref(null);

const fetchArtists = async () => {
    const res = await axios.get('http://localhost:3000/api/artists');
    artists.value = res.data;
};

// ArtistsManager.vue

const startEdit = async (artist) => {
    // 1. Copia profunda del perfil del artista
    editingArtist.value = JSON.parse(JSON.stringify(artist));

    // 2. Cargar sus assets vinculados desde la base de datos
    try {
        const res = await axios.get(`${API_BASE_URL}/api/artists/${artist.id}/assets`);
        // Asignamos los assets traídos de la DB al objeto que estamos editando
        editingArtist.value.assets = res.data;
        console.log(`Cargados ${res.data.length} assets para ${artist.title}`);
    } catch (err) {
        console.error("Error cargando assets:", err);
        editingArtist.value.assets = [];
    }

    await nextTick();
    isDirty.value = false;
    tempSessionFolder.value = null;
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


        // --- CAPTURA DE CARPETA TEMPORAL ---
        // res.data.dbPath suele ser "artists/1740.../imagen.jpg"
        const pathParts = res.data.dbPath.split('/');
        if (pathParts.length >= 2) {
            tempSessionFolder.value = pathParts[1]; // Guardamos el ID de la sesión
        }
        // 3. Update the artist name that we are editing 
        // IMPORTANTE: Guardamos la ruta con carpeta en el estado del artista
        // Ahora editingArtist.value.thumbnail será "173859201-4421/pear.jpg"

        editingArtist.value.thumbnail = res.data.dbPath;
        // Sincronizamos el banner para que use la misma imagen y carpeta nueva
        editingArtist.value.banner_image = res.data.dbPath;

        isDirty.value = true; // Activamos la bandera de "cambios sin guardar"

        // alert("Image uploaded successfully!");
    } catch (err) {
        console.error("Error uploading image:", err);
        alert("Failed to upload image.");
    }
};

const openPreview = () => {
    // 1. Si el artista es nuevo (no tiene ID), es obligatorio guardar
    if (!editingArtist.value.id || isDirty.value) {
        alert("Please save the artist before previewing for the first time.");
    } else {

        // 3. Si todo está en orden o el usuario aceptó ver la versión vieja:
        const routeData = router.resolve({
            name: 'Artist',
            params: { slug: editingArtist.value.slug }
        });

        window.open(routeData.href, '_blank');
    }
};

const saveChanges = async () => {
    try {
        const artist = editingArtist.value;
        const isNew = !artist.id;

        // 1. Construimos el payload de forma explícita y segura
        const payload = {
            artist_name: artist.title, // Mapeamos title a la columna de la DB
            slug: artist.slug,
            thumbnail: artist.thumbnail,
            banner_image: artist.banner_image || artist.thumbnail, // Aplicamos espejo aquí también por si acaso
            cards: artist.cards.map(card => ({
                ...card,
                description: typeof card.description === 'string'
                    ? card.description
                    : card.description?.html || ''
            }))
        };

        console.log("ID detectado antes de enviar:", artist.id);

        if (!isNew) {
            console.log("Realizando UPDATE...");
            await axios.put(`${API_BASE_URL}/api/artists/${artist.id}`, payload);
        } else {
            console.log("Realizando INSERT...");
            const res = await axios.post(`${API_BASE_URL}/api/artists`, payload);

            // Sincronizamos el ID para que la siguiente edición sea un UPDATE
            editingArtist.value.id = res.data.id;
            console.log("ID asignado tras INSERT:", res.data.id);
        }

        await fetchArtists(); // Refrescamos la lista lateral

        // 1. Marcamos el estado como "limpio"
        isDirty.value = false;
        tempSessionFolder.value = null;

        alert("Saved successfully!");
    } catch (err) {
        console.error("Saving error:", err.response?.data || err);
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
    if (editingArtist.value && newTitle) {
        editingArtist.value.slug = generateSlug(newTitle);
    }
});

const createNewArtist = () => {
    editingArtist.value = {
        id: null,
        title: 'New Artist',
        thumbnail: 'artists/placeholder.png',
        banner_image: 'artists/placeholder.png',
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

const onAssetSelected = async (event) => {

    // 0. VALIDACIÓN CRÍTICA: Si no hay artista, no hacemos nada
    if (!editingArtist.value || !editingArtist.value.id) {
        alert("Please select or save an artist first.");
        return;
    }

    const file = event.target.files[0];
    if (!file) return;

    // 1. Preparamos el FormData
    const formData = new FormData();
    formData.append('model', file);

    // Enviamos datos adicionales para la tabla 'assets'
    formData.append('artist_id', editingArtist.value.id); // UUID del artista
    formData.append('asset_name', file.name.replace(/\.[^/.]+$/, "")); // Nombre sin .glb
    formData.append('creator_name', editingArtist.value.title);


    try {
        // 2. Enviamos al servidor
        const res = await axios.post('http://localhost:3000/api/upload-3d', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        // 3. Actualizamos la lista local para ver el cambio de inmediato
        if (!editingArtist.value.assets) {
            editingArtist.value.assets = [];
        }

        // El servidor nos devuelve el nuevo asset creado en la DB
        editingArtist.value.assets.push(res.data);

        alert("¡Asset 3D subido y guardado en la base de datos!");
    } catch (err) {
        console.error("Error al subir el asset:", err);
        alert("Error al subir el archivo 3D. Revisa la consola.");
    } finally {
        // Limpiamos el input para poder subir el mismo archivo otra vez si fuera necesario
        event.target.value = '';
    }
};

const getImageUrl = (filename) => {
    if (!filename) return 'https://via.placeholder.com/150'; // Fallback
    if (filename.startsWith('http')) return filename;

    // Si el nombre contiene "artists/", asumimos que es una ruta migrada
    // Si no, es una subida nueva directa en la raíz de uploads
    return `${UPLOADS_PREFIX}${filename}`;
};


// Agrega esto a tus variables reactivas
const tempSessionFolder = ref(null);
const isDirty = ref(false); // Para saber si hubo cambios


const handleCancel = async () => {
    if (tempSessionFolder.value && isDirty.value) {
        try {
            // Asegúrate de usar la URL completa si no tienes configurado un proxy
            await axios.post('http://localhost:3000/api/cleanup/temp-folder', {
                folderName: tempSessionFolder.value
            });
            console.log("♻️ Carpeta temporal removida del servidor");
        } catch (err) {
            console.error("Error limpiando carpeta temporal:", err);
        }
    }

    // Resetear estados y volver a la lista
    tempSessionFolder.value = null;
    isDirty.value = false;
    editingArtist.value = null; // Esto es lo que cierra la vista de edición en tu código
};


const handleBeforeUnload = (event) => {
    if (isDirty.value) {
        // Esto muestra la alerta clásica del navegador: "¿Seguro que quieres salir?"
        event.preventDefault();
        event.returnValue = '';
    }
};

const toggleAssetVisibility = async (asset) => {
    try {
        await axios.patch(`${API_BASE_URL}/api/assets/${asset.id}/visibility`, {
            is_visible: asset.is_visible
        });
        // Opcional: una pequeña notificación visual
        console.log(`Asset ${asset.id} visibility: ${asset.is_active}`);
    } catch (err) {
        console.error("Error changing visibility:", err);
        // Revertimos el cambio en el UI si falló la DB
        asset.is_visible = !asset.is_visible;
        alert("Failed to update visibility");
    }
};

onMounted(() => {
    // 1. Registro de eventos globales
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 2. Carga de datos iniciales
    fetchArtists();
    isDirty.value = false;

});

onUnmounted(() => window.removeEventListener('beforeunload', handleBeforeUnload));

</script>

<style scoped>
/* Esto hace que el video en el editor se vea igual que en el frontend */
:deep(.ql-editor iframe.ql-video) {
    display: block;
    width: 100% !important;
    /* Forzamos el 100% de ancho */
    max-width: 800px;
    /* O el ancho máximo que tú prefieras */
    aspect-ratio: 16 / 9;
    /* Mantiene la forma de YouTube */
    margin: 2rem auto;
    /* Lo centra y le da espacio */
    border-radius: 8px;
    border: 2px solid #eee;
}

/* Opcional: Añadir un pequeño texto o estilo cuando el video está seleccionado */
:deep(.ql-editor .ql-video.ql-selected) {
    border: 2px solid #2196F3;
    /* Color azul de Vuetify para indicar selección */
}
</style>