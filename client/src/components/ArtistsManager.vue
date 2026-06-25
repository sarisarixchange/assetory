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
                        <QuillEditor v-model="card.description" placeholder="Write something here..."
                            @textChange="isDirty = true" @keydown.ctrl.s.prevent="saveChanges" />
                        <!-- <QuillEditor v-model:content="card.description" @keydown.ctrl.s.prevent="saveChanges"
                            :key="`${editingArtist.id}-${index}`" @textChange="isDirty = true" content-type="html"
                            :modules="editorModules" toolbar="full" theme="snow"
                            style="min-height: 500px; height: auto; background: white;" /> -->
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

                    <!-- <v-btn color="primary" prepend-icon="mdi-plus-box" @click="$refs.assetFileInput.click()"
                        :disabled="!editingArtist.id">
                        Upload New 3D Asset
                    </v-btn> -->


                    <v-row class="mb-4">
                        <v-col cols="12" class="d-flex ga-4">
                            <v-btn color="primary" prepend-icon="mdi-plus-box" @click="showUploadDialog = true"
                                :disabled="!editingArtist.id">
                                Upload New Asset
                            </v-btn>

                            <v-btn color="secondary" prepend-icon="mdi-file-find" @click="openSubmissionsSelector"
                                :disabled="!editingArtist.id">
                                Add Asset From Previous Submissions
                            </v-btn>
                        </v-col>
                    </v-row>
                    <p v-if="!editingArtist.id" class="text-caption text-error mt-1">
                        * Guarda el artista primero para poder añadirle assets.
                    </p>
                    <v-dialog v-model="showUploadDialog" max-width="800px">
                        <v-card>
                            <v-card-text>
                                <AssetForm :artist-id="editingArtist.id"
                                    :initial-creator-name="editingArtist.artist_name || editingArtist.title"
                                    @success="handleUploadSuccess" @cancel="showUploadDialog = false" />
                            </v-card-text>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="showSubmissionsDialog" max-width="900px">
                        <v-card class="pa-4">
                            <v-card-title class="text-h5 d-flex align-center">
                                Select Asset from Submissions
                                <v-spacer></v-spacer>
                                <v-btn icon="mdi-close" variant="text" @click="showSubmissionsDialog = false"></v-btn>
                            </v-card-title>

                            <v-card-text>
                                <div v-if="isFetchingSubmissions" class="text-center pa-4">
                                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                                    <p class="mt-2 text-caption">Loading submissions database...</p>
                                </div>

                                <v-table v-else hover>
                                    <thead>
                                        <tr>
                                            <th>Asset Name</th>
                                            <th>Creator Name</th>
                                            <th>Type</th>
                                            <th class="text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="availableSubmissions.length === 0">
                                            <td colspan="4" class="text-center text-grey-darken-1 pa-4">
                                                No unassigned submissions available at the moment.
                                            </td>
                                        </tr>
                                        <tr v-for="submission in availableSubmissions" :key="submission.id">
                                            <td><strong>{{ submission.asset_name }}</strong></td>
                                            <td>{{ submission.creator_name }}</td>
                                            <td><v-chip size="small" variant="tonal">{{ submission.asset_type
                                            }}</v-chip></td>
                                            <td class="text-right">
                                                <v-btn color="success" prepend-icon="mdi-link-plus" size="small"
                                                    @click="linkSubmissionToArtist(submission.id)">
                                                    Link Asset
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-card-text>
                        </v-card>
                    </v-dialog>

                </v-col>
            </v-row>

            <v-row>
                <v-col v-for="(asset, index) in editingArtist.assets" :key="asset.id" cols="12" sm="4">
                    <v-card variant="outlined" class="pa-3">
                        <div class="text-subtitle-1 font-weight-bold">{{ asset.asset_name }}
                            <v-switch v-model="asset.is_visible"
                                :label="asset.is_visible ? 'Asset shows on public profile ' : 'Asset is hidden on public profile'"
                                :color="asset.is_visible ? 'success' : 'grey'"
                                @change="toggleAssetVisibility(asset)"></v-switch>
                        </div>
                        <div class="text-caption mb-2">{{ asset.asset_Type }}</div>
                        <v-img :src="`http://localhost:3000/uploads/assets/${asset.representative_image}`" height="100"
                            cover class="bg-grey-lighten-2"></v-img> <v-card-actions class="pa-0">

                            <v-spacer></v-spacer>
                            <v-btn icon="mdi-link-off" size="small" color="error" variant="text"
                                title="Remove from artist profile" @click="unlinkAssetFromArtist(asset.id)"></v-btn>
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
// import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.snow.css'
// import ImageResize from 'quill-image-resize-vue'
// Cerca de la línea 60-70 en tu <script setup>
import QuillEditor from './QuillEditor.vue'; // Asegúrate de que la ruta sea correcta (.vue)
import AssetForm from './AssetForm.vue';

const router = useRouter();
// ... otros imports
const API_BASE_URL = "http://localhost:3000";
const UPLOADS_PREFIX = `${API_BASE_URL}/uploads/`;

// 2. Definir los módulos que usará el editor


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
        alert("Please save the artist before previewing.");
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


// Handle the cancel or back action when editing or creating an artist profile
const handleCancel = async () => {
    // 🔥 CONDITION: Only ask for confirmation if changes were actually made (!isDirty means no changes)
    if (isDirty.value) {
        const confirmCancel = confirm("Are you sure you want to leave? Any unsaved changes on this artist profile will be lost.");
        if (!confirmCancel) {
            return; // Stay in the editor if user cancels the alert
        }
    }

    // If there are no unsaved changes (or user clicked OK), proceed with cleanup if a folder exists
    if (tempSessionFolder.value && isDirty.value) {
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/cleanup/temp-folder`, {
                folderName: tempSessionFolder.value
            });
            console.log("♻️ Temporary session folder removed from server storage.");
        } catch (err) {
            console.error("❌ Error cleaning up temporary folder:", err);
        }
    }

    // Reset reactive state parameters and seamlessly close the editor view layout
    tempSessionFolder.value = null;
    isDirty.value = false;
    editingArtist.value = null;
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

const showUploadDialog = ref(false);

const handleUploadSuccess = (newAsset) => {
    // Añadimos el nuevo asset a la lista visual del artista actual
    editingArtist.value.assets.push(newAsset);
    showUploadDialog.value = false;
};

// Unlink a specific asset from the current artist profile without deleting it entirely
const unlinkAssetFromArtist = async (assetId) => {
    if (!confirm("Are you sure you want to remove this asset from this artist's profile? (It will still remain in Submissions)")) return;

    try {
        // 🔥 UPDATE: We now target the unlinking endpoint instead of deleting the whole row
        const res = await axios.patch(`${API_BASE_URL}/api/assets/${assetId}/unlink-artist`);

        if (res.status === 200 || res.data.success) {
            console.log(`🔗 Asset ${assetId} successfully unlinked from artist.`);

            // REACTIVE UI UPDATE: Remove the asset from the current artist view layout instantly
            editingArtist.value.assets = editingArtist.value.assets.filter(
                (asset) => asset.id !== assetId
            );
        }
    } catch (err) {
        console.error("❌ Error unlinking asset from profile:", err);
        alert("Failed to remove the asset connection from this server profile.");
    }
};

// --- LOGIC TO ACCRETE ASSETS FROM SUBMISSIONS ---
const showSubmissionsDialog = ref(false);
const availableSubmissions = ref([]);
const isFetchingSubmissions = ref(false);

// Fetch all submissions from the database to display in the selector modal
const openSubmissionsSelector = async () => {
    showSubmissionsDialog.value = true;
    isFetchingSubmissions.value = true;
    try {
        const res = await axios.get(`${API_BASE_URL}/api/submissions`);

        // Filter out assets that are already linked to this artist to avoid duplicates
        availableSubmissions.value = res.data.filter(submission =>
            submission.artist_id !== editingArtist.value.id
        );
    } catch (err) {
        console.error("❌ Error fetching available submissions:", err);
    } finally {
        isFetchingSubmissions.value = false;
    }
};

// Link a chosen submission asset to the currently active artist profile
const linkSubmissionToArtist = async (assetId) => {
    try {
        // We perform a PATCH request to update the artist_id foreign key of the asset
        const res = await axios.patch(`${API_BASE_URL}/api/assets/${assetId}/link-artist`, {
            artist_id: editingArtist.value.id
        });

        if (res.data.success || res.status === 200) {
            console.log(`✅ Asset ${assetId} successfully linked to artist ${editingArtist.value.id}`);

            // Find the asset object within our fetched list to push it reactively to the view
            const linkedAsset = availableSubmissions.value.find(a => a.id === assetId);
            if (linkedAsset) {
                // Ensure the updated property is correctly set locally
                linkedAsset.artist_id = editingArtist.value.id;
                editingArtist.value.assets.push(linkedAsset);
            }

            // Remove it from the available list or simply close the dialog layout
            showSubmissionsDialog.value = false;
            alert("Asset linked successfully!");
        }
    } catch (err) {
        console.error("❌ Error linking asset to artist:", err);
        alert("Failed to assign the asset to this profile.");
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

/* Inside ArtistsManager.vue - <style scoped> section */

/* Ensure the Quill tooltip container always stays on top of other Vuetify layers */
:deep(.ql-toolbar .ql-tooltip),
:deep(.ql-container .ql-tooltip) {
    z-index: 10;
    /* Keeps it above the text area boundaries */
    left: 50% !important;
    /* Forces the tooltip to center horizontally relative to the editor */
    transform: translateX(-50%);
    /* Perfectly balances the centering offset alignment */
    white-space: nowrap;
    /* Prevents input controls from wrapping awkwardly */
}

/* Optional: Prevent the editor wrapper card from clipping any overflow tooltips */
:deep(.ql-container) {
    overflow: visible !important;
}

:deep(.ql-editor) {
    overflow: visible !important;
}
</style>