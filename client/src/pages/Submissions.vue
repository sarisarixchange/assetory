<script setup>
import { ref, onMounted } from "vue";
import { createClient } from "@supabase/supabase-js";
import Topbar from '../components/Topbar.vue';

// --------------------
// Supabase setup
// --------------------
const SUPABASE_URL = "https://igiktlbaxubjupbuqtqf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnaWt0bGJheHVianVwYnVxdHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMjM1MjEsImV4cCI6MjA3Nzc5OTUyMX0.Is58dtSu-dUt7SNXxUl_JDbQPp6rsb91Uhp4DV8Owi0";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --------------------
// State
// --------------------
const submissions = ref([]);
const isLoading = ref(true);
const error = ref(null);
const selectedSubmission = ref(null);
const showModal = ref(false);

// --------------------
// Fetch submissions
// --------------------
const fetchSubmissions = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    const { data, error: fetchError } = await supabase
      .from("assets_table")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) throw fetchError;

    submissions.value = data;
    console.log("Fetched submissions:", data);
  } catch (err) {
    console.error("Error fetching submissions:", err);
    error.value = "Failed to load submissions. Please try again.";
  } finally {
    isLoading.value = false;
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
// Download asset file
// --------------------
const downloadAsset = async (url, assetName) => {
  if (!url) {
    alert("No file available to download");
    return;
  }

  try {
    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = assetName || "asset";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error("Error downloading file:", err);
    alert("Failed to download file");
  }
};

// --------------------
// Download representative image
// --------------------
const downloadImage = async (url, assetName) => {
  if (!url) {
    alert("No image available to download");
    return;
  }

  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${assetName}_representative` || "representative_image";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error("Error downloading image:", err);
    alert("Failed to download image");
  }
};

// --------------------
// Format date
// --------------------
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// --------------------
// Delete submission (optional)
// --------------------
const deleteSubmission = async (id) => {
  if (!confirm("Are you sure you want to delete this submission? This will also delete all associated files.")) {
    return;
  }

  try {
    // Step 1: Get the submission to find file paths
    const { data: submission, error: fetchError } = await supabase
      .from("assets_table")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Step 2: Delete files from storage
    const filesToDelete = [];

    // Delete the entire folder for this submission (contains files and representative folders)
    const { data: fileList, error: listError } = await supabase.storage
      .from("assets")
      .list(id.toString());

    if (listError) {
      console.error("Error listing files:", listError);
    } else if (fileList && fileList.length > 0) {
      // Delete all files in the submission's folder
      for (const folder of fileList) {
        // List files in each subfolder (files/ and representative/)
        const { data: subFiles, error: subListError } = await supabase.storage
          .from("assets")
          .list(`${id}/${folder.name}`);

        if (!subListError && subFiles) {
          const pathsToDelete = subFiles.map(file => `${id}/${folder.name}/${file.name}`);
          filesToDelete.push(...pathsToDelete);
        }
      }

      // Delete all collected files
      if (filesToDelete.length > 0) {
        const { error: deleteFilesError } = await supabase.storage
          .from("assets")
          .remove(filesToDelete);

        if (deleteFilesError) {
          console.error("Error deleting files:", deleteFilesError);
        } else {
          console.log("Files deleted successfully:", filesToDelete);
        }
      }
    }

    // Step 3: Delete the database row
    const { error: deleteError } = await supabase
      .from("assets_table")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    alert("Submission and all associated files deleted successfully");
    fetchSubmissions(); // Refresh the list
    
    // Close modal if it's open
    if (showModal.value && selectedSubmission.value?.id === id) {
      closeModal();
    }
  } catch (err) {
    console.error("Error deleting submission:", err);
    alert("Failed to delete submission: " + err.message);
  }
};

// --------------------
// Lifecycle
// --------------------
onMounted(() => {
  fetchSubmissions();
});
</script>

<template>
      <Topbar :interactive-mode="interactiveMode" @theme-changed="updateTheme" />

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
    <div v-else-if="submissions.length === 0" class="empty">
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
            <th>License</th>
            <th>Submitted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="submission in submissions" :key="submission.id">
            <td>{{ submission.asset_name }}</td>
            <td>{{ submission.creator_name }}</td>
            <td>{{ submission.asset_type }}</td>
            <td>{{ submission.license }}</td>
            <td>{{ formatDate(submission.created_at) }}</td>
            <td class="actions">
              <button @click="viewDetails(submission)" class="btn-view">View</button>
              <button @click="downloadAsset(submission.asset_file_url, submission.asset_name)" class="btn-download">
                Download Asset
              </button>
              <button @click="downloadImage(submission.representative_image_url, submission.asset_name)" class="btn-download">
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
            <strong>License:</strong>
            <span>{{ selectedSubmission.license }}</span>
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
          
          <div class="detail-section" v-if="selectedSubmission.representative_image_url">
            <strong>Representative Image:</strong>
            <img :src="selectedSubmission.representative_image_url" alt="Representative" class="preview-image" />
          </div>
          
          <div class="modal-actions">
            <button @click="downloadAsset(selectedSubmission.asset_file_url, selectedSubmission.asset_name)" class="btn-download">
              Download Asset File
            </button>
            <button @click="downloadImage(selectedSubmission.representative_image_url, selectedSubmission.asset_name)" class="btn-download">
              Download Representative Image
            </button>
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
.loading, .error, .empty {
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

.btn-view, .btn-download, .btn-delete {
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