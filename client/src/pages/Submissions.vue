<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import Topbar from '../components/Topbar.vue';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// --------------------
// State
// --------------------
const submissions = ref([]);
const isLoading = ref(true);
const error = ref(null);
const selectedSubmission = ref(null);
const showModal = ref(false);

const interactiveMode = false;
// --- Reactive State ---
const currentBackgroundLayer = ref('background-layer');
const iconHoveredSrc = ref('/icons/arrow-right-black.svg');

// Left Box
const isDefaultCardVisible = ref(true);
const isPinkLeftCardIconVisible = ref(false);
const isGrayLeftCardIconVisible = ref(false);
const isHighContrastLeftCardIconVisible = ref(false);
const isWCAGLeftCardIconVisible = ref(false);

// Center-top-box images
const arePinkTopCenterCardSampleImagesVisible = ref(true);
const areGrayTopCenterCardSampleImagesVisible = ref(false);
const areHighContrastTopCenterCardSampleImagesVisible = ref(false);

// Other boxes icons
const isDecoractionCardSubtitleDefault = ref(true);
const isDecoractionCardSubtitlePink = ref(false);
const isDecoractionCardSubtitleGray = ref(false);
const isDecoractionCardSubtitleHighContrast = ref(false);
const isDecoractionCardSubtitleWCAG = ref(false);

// Footer images
const areFooterImagesDefaultVisible = ref(true);
const areFooterImagesGrayscaleVisible = ref(false);
const areFooterImagesHighContrastVisible = ref(false);
const areFooterImagesWCAGcolorsVisible = ref(false);


// --- The updateTheme Function ---
const updateTheme = (payload) => {
  if (payload.theme === "default") {
    currentBackgroundLayer.value = 'background-layer';
    isDefaultCardVisible.value = true;
    isPinkLeftCardIconVisible.value = false;
    isGrayLeftCardIconVisible.value = false;
    isHighContrastLeftCardIconVisible.value = false;
    isWCAGLeftCardIconVisible.value = false;
    arePinkTopCenterCardSampleImagesVisible.value = true;
    areGrayTopCenterCardSampleImagesVisible.value = false;
    areHighContrastTopCenterCardSampleImagesVisible.value = false;
    isDecoractionCardSubtitleDefault.value = true;
    isDecoractionCardSubtitlePink.value = false;
    isDecoractionCardSubtitleGray.value = false;
    isDecoractionCardSubtitleHighContrast.value = false;
    isDecoractionCardSubtitleWCAG.value = false;
    areFooterImagesDefaultVisible.value = true;
    areFooterImagesGrayscaleVisible.value = false;
    areFooterImagesHighContrastVisible.value = false;
    areFooterImagesWCAGcolorsVisible.value = false;
    iconHoveredSrc.value = '/icons/arrow-right-black.svg';

  } else if (payload.theme === "originalInteractive" || payload.theme === "grayscale") {
    // Combined these since they share mostly the same logic in your snippet
    isDefaultCardVisible.value = false;
    isPinkLeftCardIconVisible.value = (payload.theme === "originalInteractive");
    isGrayLeftCardIconVisible.value = true;
    isHighContrastLeftCardIconVisible.value = false;
    isWCAGLeftCardIconVisible.value = false;
    arePinkTopCenterCardSampleImagesVisible.value = false;
    areGrayTopCenterCardSampleImagesVisible.value = true;
    areHighContrastTopCenterCardSampleImagesVisible.value = false;
    isDecoractionCardSubtitleDefault.value = false;
    isDecoractionCardSubtitlePink.value = false;
    isDecoractionCardSubtitleGray.value = true;
    isDecoractionCardSubtitleHighContrast.value = false;
    isDecoractionCardSubtitleWCAG.value = false;
    areFooterImagesDefaultVisible.value = false;
    areFooterImagesGrayscaleVisible.value = true;
    areFooterImagesHighContrastVisible.value = false;
    areFooterImagesWCAGcolorsVisible.value = false;
    currentBackgroundLayer.value = 'background-layer-grayscale';
    iconHoveredSrc.value = '/icons/arrow-right-black.svg';

  } else if (payload.theme === "highContrast") {
    isDefaultCardVisible.value = false;
    isPinkLeftCardIconVisible.value = false;
    isGrayLeftCardIconVisible.value = false;
    isHighContrastLeftCardIconVisible.value = true;
    isWCAGLeftCardIconVisible.value = false;
    arePinkTopCenterCardSampleImagesVisible.value = false;
    areGrayTopCenterCardSampleImagesVisible.value = false;
    areHighContrastTopCenterCardSampleImagesVisible.value = true;
    isDecoractionCardSubtitleDefault.value = false;
    isDecoractionCardSubtitlePink.value = false;
    isDecoractionCardSubtitleGray.value = false;
    isDecoractionCardSubtitleHighContrast.value = true;
    isDecoractionCardSubtitleWCAG.value = false;
    areFooterImagesDefaultVisible.value = false;
    areFooterImagesGrayscaleVisible.value = false;
    areFooterImagesHighContrastVisible.value = true;
    areFooterImagesWCAGcolorsVisible.value = false;
    currentBackgroundLayer.value = 'background-layer-highContrast';
    iconHoveredSrc.value = '/icons/arrow-right-white.svg';
  }
};

// --------------------
// Fetch submissions
// --------------------


const fetchSubmissions = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`${API_BASE_URL}/api/submissions`);

        // Como vimos en tu consola, 'response.data' ya es el array [ {...}, {...} ]
        submissions.value = response.data;

        console.log("Submissions cargadas con éxito:", submissions.value);
    } catch (err) {
        console.error("Error al cargar:", err);
        error.value = "No se pudieron cargar las sumisiones.";
    } finally {
        isLoading.value = false;
    }
};

// --------------------
// Helpers para URLs de archivos
// --------------------
// Como Multer guarda los nombres de archivo, necesitamos anteponer la URL del servidor
const getFileUrl = (fileName) => {
    if (!fileName) return null;
    // Si el backend guarda los archivos en la carpeta estática 'uploads'
    // fileName ya contiene "TIMESTAMP-RANDOM/archivo.ext"s
    return `${API_BASE_URL}/uploads/${fileName}`;
};


// Para la columna 'files', recuerda que en Postgres es un JSON string
const parseFiles = (filesJson) => {
    try {
        const files = typeof filesJson === 'string' ? JSON.parse(filesJson) : filesJson;
        return Array.isArray(files) && files.length > 0 ? files[0] : null;
    } catch (e) {
        return null;
    }
};

// --------------------
// View submission details
// --------------------
const viewDetails = (submission) => {
    selectedSubmission.value = submission;
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    selectedSubmission.value = null;
};

// --------------------
// Download (simplificado para local)
// --------------------
const downloadFile = (fileName, originalName) => {
    if (!fileName) {
        alert("No file available");
        return;
    }
    const url = getFileUrl(fileName);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", originalName || fileName);
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Delete submission
// --------------------
const deleteSubmission = async (id) => {
    if (!confirm("Are you sure you want to delete this submission and its physical files?")) {
        return;
    }

    try {
        await axios.delete(`${API_BASE_URL}/submissions/api/${id}`);
        alert("Submission deleted successfully");
        fetchSubmissions();
        if (showModal.value) closeModal();
    } catch (err) {
        console.error("Error deleting:", err);
        alert("Failed to delete submission.");
    }
};

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
};

onMounted(() => {
    fetchSubmissions();
});

</script>

<template>
    <Topbar :interactive-mode="interactiveMode" @theme-changed="updateTheme" pageTitle="Submissions Page" />

    <div class="submissions-container">
        <div class="header">
            <h1>Asset Submissions</h1>
            <button @click="fetchSubmissions" class="refresh-btn">Refresh</button>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="loading">
            <p>Loading submissions...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error">
            <p>{{ error }}</p>
            <button @click="fetchSubmissions">Try Again</button>
        </div>

        <!-- Empty State -->
        <div v-else-if="submissions?.length === 0" class="empty">
            <p>No submissions yet.</p>
        </div>

        <!-- Submissions Table -->
        <div v-else class="table-wrapper">
            <table class="submissions-table">
                <thead>
                    <tr>
                        <th>Asset Name</th>
                        <th>Creator</th>
                        <th>Type</th>
                        <th>Copyright</th>
                        <th>Submitted</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="submission in submissions" :key="submission.id">
                        <td>{{ submission.asset_name }}</td>
                        <td>{{ submission.creator_name }}</td>
                        <td>{{ submission.asset_type }}</td>
                        <td>{{ submission.copyright }}</td>
                        <td>{{ formatDate(submission.created_at) }}</td>
                        <td class="actions">
                            <button @click="viewDetails(submission)" class="btn-view">View</button>
                            <button @click="downloadFile(parseFiles(submission.files), submission.asset_name)"
                                class="btn-download">
                                Download Asset
                            </button>

                            <button @click="downloadFile(submission.representative_image, 'image')"
                                class="btn-download">
                                Download Image
                            </button>
                            <button @click="deleteSubmission(submission.id)" class="btn-delete">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Details Modal -->
        <div v-if="showModal" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h2>{{ selectedSubmission.asset_name }}</h2>
                    <button @click="closeModal" class="close-btn">&times;</button>
                </div>

                <div class="modal-body">
                    <div class="detail-row">
                        <strong>Creator:</strong>
                        <span>{{ selectedSubmission.creator_name }}</span>
                    </div>

                    <div class="detail-row">
                        <strong>Email:</strong>
                        <span>{{ selectedSubmission.email }}</span>
                    </div>

                    <div class="detail-row">
                        <strong>Asset Type:</strong>
                        <span>{{ selectedSubmission.asset_type }}</span>
                    </div>

                    <div class="detail-row">
                        <strong>Copyright:</strong>
                        <span>{{ selectedSubmission.copyright }}</span>
                    </div>

                    <div class="detail-row">
                        <strong>Keywords:</strong>
                        <span>{{ selectedSubmission.keywords || "N/A" }}</span>
                    </div>

                    <div class="detail-row">
                        <strong>Submitted:</strong>
                        <span>{{ formatDate(selectedSubmission.created_at) }}</span>
                    </div>

                    <div class="detail-section">
                        <strong>Asset Story:</strong>
                        <p>{{ selectedSubmission.story }}</p>
                    </div>

                    <div class="detail-section" v-if="selectedSubmission.creation_method">
                        <strong>Creation Method:</strong>
                        <p>{{ selectedSubmission.creation_method }}</p>
                    </div>

                    <div class="detail-section" v-if="selectedSubmission.acknowledgement">
                        <strong>Acknowledgement:</strong>
                        <p>{{ selectedSubmission.acknowledgement }}</p>
                    </div>

                    <div class="detail-section" v-if="selectedSubmission.representative_image">
                        <strong>Representative Image:</strong>
                        <img :src="getFileUrl(selectedSubmission.representative_image)" alt="Representative"
                            class="preview-image" />
                    </div>



                    <div class="modal-actions">

                        <div class="modal-actions">
                            <button
                                @click="downloadFile(parseFiles(selectedSubmission.files), selectedSubmission.asset_name)"
                                class="btn-download">
                                Download Asset File
                            </button>

                            <button
                                @click="downloadFile(selectedSubmission.representative_image, selectedSubmission.asset_name + '_image')"
                                class="btn-download">
                                Download Representative Image
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.submissions-container {
    max-width: 1400px;
    margin: 2rem auto;
    padding: 2rem;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

h1 {
    font-size: 2rem;
    color: var(--primary-color);
}

.refresh-btn {
    background: var(--secondary-color);
    border: 2px solid var(--homepage-card-buttons-border-color);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s;
}

.refresh-btn:hover {
    background: var(--hover-color);
    color: var(--hover-text-color);
}

/* States */
.loading,
.error,
.empty {
    text-align: center;
    padding: 3rem;
    font-size: 1.2rem;
}

.error {
    color: #d32f2f;
}

.error button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #d32f2f;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
}

/* Table */
.table-wrapper {
    overflow-x: auto;
    background: var(--secondary-color);
    border: 2px solid var(--homepage-card-buttons-border-color);
    border-radius: 1rem;
    box-shadow: 4px 4px 0 var(--shadow);
}

.submissions-table {
    width: 100%;
    border-collapse: collapse;
}

.submissions-table thead {
    background: var(--primary-color);
    color: var(--secondary-color);
}

.submissions-table th,
.submissions-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--homepage-card-buttons-border-color);
}

.submissions-table th {
    font-weight: bold;
    position: sticky;
    top: 0;
}

.submissions-table tbody tr:hover {
    background: var(--hover-color);
}

.submissions-table tbody tr:last-child td {
    border-bottom: none;
}

/* Actions */
.actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.btn-view,
.btn-download,
.btn-delete {
    padding: 0.4rem 0.8rem;
    border: 2px solid var(--homepage-card-buttons-border-color);
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s;
}

.btn-view {
    background: #2196F3;
    color: white;
}

.btn-view:hover {
    background: #1976D2;
}

.btn-download {
    background: #4CAF50;
    color: white;
}

.btn-download:hover {
    background: #388E3C;
}

.btn-delete {
    background: #f44336;
    color: white;
}

.btn-delete:hover {
    background: #d32f2f;
}

/* Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 2rem;
}

.modal-content {
    background: var(--secondary-color);
    border: 2px solid var(--homepage-card-buttons-border-color);
    border-radius: 1rem;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 2px solid var(--homepage-card-buttons-border-color);
}

.modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
}

.close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--primary-color);
    padding: 0;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-btn:hover {
    color: #f44336;
}

.modal-body {
    padding: 1.5rem;
}

.detail-row {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--homepage-card-buttons-border-color);
}

.detail-row strong {
    color: var(--primary-color);
}

.detail-section {
    margin: 1.5rem 0;
}

.detail-section strong {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
}

.detail-section p {
    margin: 0;
    line-height: 1.6;
    white-space: pre-wrap;
}

.preview-image {
    max-width: 100%;
    border-radius: 0.5rem;
    border: 2px solid var(--homepage-card-buttons-border-color);
    margin-top: 0.5rem;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 2px solid var(--homepage-card-buttons-border-color);
    flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
    .submissions-container {
        padding: 1rem;
    }

    .actions {
        flex-direction: column;
    }

    .detail-row {
        grid-template-columns: 1fr;
        gap: 0.5rem;
    }

    .modal-actions {
        flex-direction: column;
    }
}
</style>