<template>
    <v-container>
        <v-tabs v-model="currentModule" @update:modelValue="onModuleChange" color="primary" class="mb-6">
            <v-tab value="artists" :disabled="editingItem !== null">Artists</v-tab>
            <v-tab value="events" :disabled="editingItem !== null">Events</v-tab>
            <v-tab value="collections" :disabled="editingItem !== null">Collections</v-tab>
        </v-tabs>

        <v-card v-if="!editingItem" variant="outlined">
            <v-toolbar color="transparent" density="compact">
                <v-toolbar-title>{{ config.viewTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="primary" prepend-icon="mdi-plus" @click="createNewItem">
                    {{ config.addButtonLabel }}
                </v-btn>
            </v-toolbar>

            <v-table hover>
                <thead>
                    <tr>
                        <th>Name / Title</th>
                        <th v-if="currentModule === 'artists'">Assets Count</th>
                        <th>Status</th>
                        <th class="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="items.length === 0">
                        <td :colspan="currentModule === 'artists' ? 4 : 3" class="text-center text-grey-darken-1 pa-4">
                            No elements found. Click the button above to start.
                        </td>
                    </tr>
                    <tr v-for="item in items" :key="item.id">
                        <td><strong>{{ item.title || item.artist_name }}</strong></td>
                        <td v-if="currentModule === 'artists'">
                            {{ item.assets?.length || 0 }} assets
                        </td>
                        <td>
                            <v-chip :color="item.is_active !== false ? 'success' : 'warning'" size="small" variant="tonal">
                                {{ item.is_active !== false ? 'Active' : 'Draft' }}
                            </v-chip>
                        </td>
                        <td class="text-right">
                            <v-btn icon="mdi-pencil" variant="text" color="blue" @click="startEdit(item)"></v-btn>
                            <v-btn icon="mdi-delete" variant="text" color="error" @click="deleteItem(item.id)"></v-btn>
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
                <v-col cols="12" md="6">
                    <v-text-field 
                        v-model="editingItem.title" 
                        @input="isDirty = true" 
                        :label="config.titleLabel"
                        variant="outlined"
                    ></v-text-field>

                    <v-card variant="outlined" class="pa-4">
                        <p class="text-h6">Cover Image (Thumbnail & Banner)</p>
                        <v-img :src="getImageUrl(editingItem.thumbnail)" height="150" class="bg-grey-lighten-2 rounded my-4">
                        </v-img>

                        <input type="file" ref="fileInput" style="display: none;" accept="image/*" @change="onFileSelected">

                        <v-btn block color="blue-darken-1" variant="tonal" prepend-icon="mdi-upload"
                            @click="$refs.fileInput.click()" class="mb-4">
                            Upload Image
                        </v-btn>

                        <v-text-field 
                            v-model="editingItem.thumbnail" 
                            label="Thumbnail Path"
                            variant="outlined" 
                            density="compact"
                            prepend-inner-icon="mdi-image"
                            readonly
                        ></v-text-field>
                    </v-card>
                </v-col>

                <v-col cols="12" md="6">
                    <v-btn block color="success" :disabled="isDirty === false" size="large" @click="saveChanges" class="mb-4">
                        Save Changes
                    </v-btn>

                    <v-btn v-if="currentModule === 'artists'" block color="secondary" size="large" prepend-icon="mdi-eye" @click="openPreview" class="mb-4">
                        Preview Page
                    </v-btn>

                    <v-switch
                        v-model="editingItem.is_active"
                        @change="isDirty = true"
                        :label="editingItem.is_active ? 'Status: Active (Public)' : 'Status: Draft (Hidden)'"
                        color="success"
                        inset
                        class="ml-2 mb-4"
                    ></v-switch>

                    <v-btn block color="red" size="large" @click="handleCancel">
                        Cancel
                    </v-btn>
                </v-col>

                <v-col cols="12">
                    <div v-for="(card, index) in editingItem.cards" :key="index" class="mb-6">
                        <p class="text-subtitle-1 mb-2">Description Section #{{ index + 1 }}</p>
                        <QuillEditor 
                            v-model="card.description" 
                            placeholder="Write specifications and rich text details here..."
                            @textChange="isDirty = true" 
                            @keydown.ctrl.s.prevent="saveChanges" 
                        />
                    </div>
                </v-col>
            </v-row>
        </v-card>

<div v-if="editingItem">
            <v-divider class="my-6"></v-divider>
            <h3 class="text-h5 mb-4">3D Asset Management</h3>

            <v-row class="mb-4">
                <v-col cols="12" class="d-flex ga-4">
                    <v-btn color="primary" prepend-icon="mdi-plus-box" @click="showUploadDialog = true" :disabled="!editingItem.id">
                        Upload New Asset
                    </v-btn>

                    <v-btn color="secondary" prepend-icon="mdi-file-find" @click="openSubmissionsSelector" :disabled="!editingItem.id">
                        Add Asset From Previous Submissions
                    </v-btn>
                </v-col>
            </v-row>
            
            <p v-if="!editingItem.id" class="text-caption text-error mt-1 mb-4">
                * Please save the details first before managing linked 3D assets.
            </p>

            <v-dialog v-model="showUploadDialog" max-width="800px">
                <v-card>
                    <v-card-text>
                        <AssetForm 
                            :artist-id="editingItem.id"
                            :initial-creator-name="editingItem.title"
                            @success="handleUploadSuccess" 
                            @cancel="showUploadDialog = false" 
                        />
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
                                    <td><v-chip size="small" variant="tonal">{{ submission.asset_type }}</v-chip></td>
                                    <td class="text-right">
                                        <v-btn color="success" prepend-icon="mdi-link-plus" size="small" @click="linkSubmissionToItem(submission.id)">
                                            Link Asset
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-row>
                <v-col v-for="asset in editingItem.assets" :key="asset.id" cols="12" sm="4">
                    <v-card variant="outlined" class="pa-3">
                        <div class="text-subtitle-1 font-weight-bold">{{ asset.asset_name }}
                            <v-switch v-model="asset.is_visible"
                                :label="asset.is_visible ? 'Visible' : 'Hidden'"
                                :color="asset.is_visible ? 'success' : 'grey'"
                                @change="toggleAssetVisibility(asset)"></v-switch>
                        </div>
                        <v-img :src="`http://localhost:3000/uploads/assets/${asset.representative_image}`" height="100" cover class="bg-grey-lighten-2"></v-img>
                        <v-card-actions class="pa-0">
                            <v-spacer></v-spacer>
                            <v-btn icon="mdi-link-off" size="small" color="error" variant="text" @click="unlinkAssetFromItem(asset.id)"></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
            </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import QuillEditor from './QuillEditor.vue';
import AssetForm from './AssetForm.vue';

const router = useRouter();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UPLOADS_PREFIX = `${API_BASE_URL}/uploads/`;

// ⚙️ MAPEO DE CONFIGURACIONES ARQUITECTÓNICAS POR MÓDULO


const MODULES_CONFIG = {
    artists: {
        viewTitle: 'Artist Profiles Library',
        addButtonLabel: 'Add New Artist',
        titleLabel: 'Artist Name',
        dbTitleField: 'artist_name',
        endpoint: '/api/artists',
        uploadEndpoint: '/api/upload', // El de artistas
        placeholder: 'artists/placeholder.png'
    },
    events: {
        viewTitle: 'Community Events Management',
        addButtonLabel: 'Create New Event',
        titleLabel: 'Event Title',
        dbTitleField: 'title',
        endpoint: '/api/events',
        uploadEndpoint: '/api/upload-event-image', // Tu endpoint corregido
        placeholder: 'events/placeholder.jpg'
    },
    collections: {
        viewTitle: 'Curated Collections Registry',
        addButtonLabel: 'Add New Collection',
        titleLabel: 'Collection Name',
        dbTitleField: 'collection_name',
        endpoint: '/api/collections',
        uploadEndpoint: '/api/upload-collection-image', // Escalable para el futuro
        placeholder: 'collections/placeholder.jpg'
    }
};

// Estados Reactivos Generales
// Dentro del <script setup> de tu Manager.vue añade/modifica esto:
const props = defineProps({
  initialModule: {
    type: String,
    default: 'artists'
  }
});

// Asignamos la prop al estado interno que ya tenías
const currentModule = ref(props.initialModule);
// const currentModule = ref('artists');
const items = ref([]);
const editingItem = ref(null);
const isDirty = ref(false);
const tempSessionFolder = ref(null);
const fileInput = ref(null);

// Carga computada rápida del mapa activo
const config = computed(() => MODULES_CONFIG[currentModule.value]);

// Consumo Dinámico de Datos de la API
const fetchModuleData = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}${config.value.endpoint}`);
        items.value = res.data;
    } catch (err) {
        console.error(`❌ Error fetching ${currentModule.value}:`, err);
        items.value = [];
    }
};

const onModuleChange = () => {
    editingItem.value = null;
    isDirty.value = false;
    tempSessionFolder.value = null;
    fetchModuleData();
};

const startEdit = async (rowData) => {
    // Clonación profunda de la fila seleccionada
    editingItem.value = JSON.parse(JSON.stringify(rowData));
    
    // Unificamos el mapeo de títulos reactivos en el formulario (.title)
    if (currentModule.value === 'artists') {
        editingItem.value.title = rowData.artist_name || rowData.title;
    } else if (currentModule.value === 'collections') {
        editingItem.value.title = rowData.collection_name;
    } else if (currentModule.value === 'events') {
        editingItem.value.title = rowData.title;
    }

    // 🌟 Carga dinámica de assets: Consume la ruta del módulo activo (ej: /api/artists/:id/assets o /api/events/:id/assets)
    try {
        const res = await axios.get(`${API_BASE_URL}${config.value.endpoint}/${rowData.id}/assets`);
        editingItem.value.assets = res.data;
    } catch (err) {
        console.error(`Error loading linked assets for ${currentModule.value}:`, err);
        editingItem.value.assets = [];
    }

    await nextTick();
    isDirty.value = false;
    tempSessionFolder.value = null;
};

const createNewItem = () => {
    editingItem.value = {
        id: null,
        title: '',
        thumbnail: config.value.placeholder,
        banner_image: config.value.placeholder,
        is_active: true,
        cards: [
            {
                heading: currentModule.value === 'artists' ? 'Biography' : 'Overview',
                description: '',
                contentSideBySide: false
            }
        ],
        assets: []
    };
    isDirty.value = true;
    tempSessionFolder.value = null;
};

// Subida de Archivos unificada usando la ruta inyectada por Multer
// 🛠️ REEMPLAZA ESTA FUNCIÓN EN TU MANAGER.VUE ACTUAL
const onFileSelected = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
        const res = await axios.post(`${API_BASE_URL}${config.value.uploadEndpoint}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        // res.data.dbPath contiene algo como: "artists/1719600000-1234/imagen.png"
        const pathParts = res.data.dbPath.split('/');
        if (pathParts.length >= 2) {
            tempSessionFolder.value = pathParts[1]; // Almacena el código de sesión para el cleanup
        }

        // 🌟 CORRECCIÓN CRÍTICA: Extraemos solo el nombre del archivo final
        // para que las páginas públicas (Artists.vue, Events.vue) no hagan un 404
        // al buscar carpetas que no entienden.
        const fileNameOnly = pathParts[pathParts.length - 1]; 

        // Reconstruimos el path plano que tus componentes públicos ya saben leer:
        // Si el módulo es 'artists', guardamos 'artists/nombre_archivo.png'
        // Si es 'events', guardamos 'events/nombre_archivo.jpg'
        const cleanPathForPublicVistas = `${currentModule.value}/${fileNameOnly}`;

        editingItem.value.thumbnail = cleanPathForPublicVistas;
        editingItem.value.banner_image = cleanPathForPublicVistas;
        isDirty.value = true;
    } catch (err) {
        console.error("❌ Failed uploading target file:", err);
        alert("Failed to upload image asset.");
    }
};

// Guardado Maestro Dinámico (Envía el payload con el nombre de columna requerido)
const saveChanges = async () => {
    try {
        const item = editingItem.value;
        const isNew = !item.id;

        // Limpieza de tarjetas para asegurar compatibilidad con base de datos JSONB
        const formattedCards = item.cards.map(card => ({
            heading: card.heading || '',
            description: typeof card.description === 'string' ? card.description : card.description?.html || '',
            image: card.image || '',
            youtubeUrl: card.youtubeUrl || '',
            contentSideBySide: !!card.contentSideBySide
        }));

        const payload = {
            [config.value.dbTitleField]: item.title,
            slug: item.slug,
            thumbnail: item.thumbnail,
            banner_image: item.banner_image || item.thumbnail,
            is_active: item.is_active ?? true,
            cards: formattedCards
        };

        // Si es el módulo de eventos, tu index.js (Línea ~478) procesa directo la propiedad 'description' si no mandas 'cards'
        // pero como mandamos 'cards', lo inyectamos de manera transparente.
        if (!isNew) {
            await axios.put(`${API_BASE_URL}${config.value.endpoint}/${item.id}`, payload);
        } else {
            const res = await axios.post(`${API_BASE_URL}${config.value.endpoint}`, payload);
            editingItem.value.id = res.data.id;
        }

        await fetchModuleData();
        isDirty.value = false;
        tempSessionFolder.value = null;
        editingItem.value = null;
        alert("¡Guardado exitosamente!");
    } catch (err) {
        console.error("Saving transaction rolled back error:", err);
        alert("Error al guardar la entidad en la base de datos.");
    }
};

const deleteItem = async (id) => {
    if (!confirm(`Are you sure you want to completely remove this entry from ${currentModule.value}?`)) return;
    try {
        await axios.delete(`${API_BASE_URL}${config.value.endpoint}/${id}`);
        fetchModuleData();
    } catch (err) {
        console.error("❌ Deletion process failure:", err);
    }
};

// Lógica de Cancelación con Cleanup de Almacenamiento Huérfano Integrado
const handleCancel = async () => {
    if (isDirty.value) {
        const confirmCancel = confirm("Are you sure you want to leave? Any unsaved changes will be lost.");
        if (!confirmCancel) return;
    }

    if (tempSessionFolder.value && isDirty.value) {
        try {
            await axios.post(`${API_BASE_URL}/api/cleanup/temp-folder`, {
                folderName: tempSessionFolder.value
            });
            console.log("♻️ Temporary session folder cleanly purged from node storage system.");
        } catch (err) {
            console.error("❌ Error running storage maintenance folder cleanup:", err);
        }
    }

    tempSessionFolder.value = null;
    isDirty.value = false;
    editingItem.value = null;
};

const generateSlug = (text) => {
    return text.toLowerCase().trim()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
};

watch(() => editingItem.value?.title, (newTitle) => {
    if (editingItem.value && newTitle) {
        editingItem.value.slug = generateSlug(newTitle);
    }
});

const getImageUrl = (filename) => {
    if (!filename) return 'https://via.placeholder.com/150';
    if (filename.startsWith('http')) return filename;
    return `${UPLOADS_PREFIX}${filename}`;
};

const openPreview = () => {
    if (!editingItem.value.id || isDirty.value) {
        alert("Please save before previewing.");
    } else {
        const routeData = router.resolve({
            name: 'Artist',
            params: { slug: editingItem.value.slug }
        });
        window.open(routeData.href, '_blank');
    }
};

// --- LOGIC EXCLUSIVA: ASSETS SUBMISSIONS & 3D DIALOGS (Solo Artistas) ---
const showUploadDialog = ref(false);
const showSubmissionsDialog = ref(false);
const availableSubmissions = ref([]);
const isFetchingSubmissions = ref(false);

const handleUploadSuccess = (newAsset) => {
    editingItem.value.assets.push(newAsset);
    showUploadDialog.value = false;
};

const openSubmissionsSelector = async () => {
    showSubmissionsDialog.value = true;
    isFetchingSubmissions.value = true;
    try {
        const res = await axios.get(`${API_BASE_URL}/api/submissions`);
        availableSubmissions.value = res.data.filter(sub => sub.artist_id !== editingItem.value.id);
    } catch (err) {
        console.error("❌ Error loading submissions database layout:", err);
    } finally {
        isFetchingSubmissions.value = false;
    }
};

// Vincula un asset existente usando la configuración del módulo activo
const linkSubmissionToItem = async (assetId) => {
    try {
        // Tu backend index.js espera '/api/assets/:id/link-artist' y el body con 'artist_id'
        if (currentModule.value !== 'artists') {
            alert("La vinculación de assets en este módulo no está soportada en el backend aún.");
            return;
        }

        await axios.patch(`${API_BASE_URL}/api/assets/${assetId}/link-artist`, { 
            artist_id: editingItem.value.id
        });

        const linkedAsset = availableSubmissions.value.find(a => a.id === assetId);
        if (linkedAsset) {
            // Aseguramos estructura reactiva local
            if (!editingItem.value.assets) editingItem.value.assets = [];
            editingItem.value.assets.push(linkedAsset);
        }
        showSubmissionsDialog.value = false;
        alert("Asset vinculado con éxito!");
    } catch (err) {
        console.error("Error linking asset:", err);
        alert("Error al vincular el asset.");
    }
};

const unlinkAssetFromItem = async (assetId) => {
    if (!confirm("¿Remover la conexión de este asset con el artista?")) return;
    try {
        // Tu backend index.js posee '/api/assets/:id/unlink-artist'
        await axios.patch(`${API_BASE_URL}/api/assets/${assetId}/unlink-artist`);
        editingItem.value.assets = editingItem.value.assets.filter(a => a.id !== assetId);
        alert("Asset desvinculado.");
    } catch (err) {
        console.error("Error unlinking asset:", err);
        alert("No se pudo desvincular el asset.");
    }
};

const toggleAssetVisibility = async (asset) => {
    try {
        await axios.patch(`${API_BASE_URL}/api/assets/${asset.id}/visibility`, { is_visible: asset.is_visible });
    } catch (err) {
        asset.is_visible = !asset.is_visible;
    }
};

const handleBeforeUnload = (event) => {
    if (isDirty.value) {
        event.preventDefault();
        event.returnValue = '';
    }
};

onMounted(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    fetchModuleData();
});

onUnmounted(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
});
</script>

<style scoped>
/* Estilos espejo de video y Tooltip inyectados desde tu plantilla de artistas */
:deep(.ql-editor iframe.ql-video) {
    display: block;
    width: 100% !important;
    max-width: 800px;
    aspect-ratio: 16 / 9;
    margin: 2rem auto;
    border-radius: 8px;
    border: 2px solid #eee;
}
:deep(.ql-editor .ql-video.ql-selected) {
    border: 2px solid #2196F3;
}
:deep(.ql-toolbar .ql-tooltip),
:deep(.ql-container .ql-tooltip) {
    z-index: 10;
    left: 50% !important;
    transform: translateX(-50%);
    white-space: nowrap;
}
:deep(.ql-container), :deep(.ql-editor) {
    overflow: visible !important;
}
</style>