<script setup>
import axios from 'axios';
import { reactive, ref } from "vue";
import Topbar from '../components/Topbar.vue'; // Import the Topbar component

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
// Loading state
// --------------------
const isSubmitting = ref(false);

// --------------------
// Reactive form data
// --------------------
const formData = reactive({
  assetName: "",
  creatorName: "",
  keywords: "",
  email: "",
  story: "",
  assetType: "",
  creationMethod: "",
  copyright: "",
  acknowledgement: "",
  assetFile: null,
  representativeImage: null,
});

// --------------------
// File handlers
// --------------------
const handleAssetFile = (event) => {
  const file = event.target.files[0];

  if (file) {
    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes

    if (file.size > maxSize) {
      alert("File must be under 50MB");
      event.target.value = ""; // Clear the input
      formData.assetFile = null;
      return;
    }

    formData.assetFile = file;
    console.log("Asset file selected:", file.name);
  }
};

const handleRepresentativeImage = (event) => {
  const file = event.target.files[0];

  if (file) {
    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Representative image must be under 50MB");
      event.target.value = "";
      formData.representativeImage = null;
      return;
    }

    formData.representativeImage = file;
    console.log("Representative image selected:", file.name);
  }
};

// --------------------
// Form submission
// --------------------
const submitForm = async () => {
  // Prevent double submission
  if (isSubmitting.value) return;

  // Validate required fields
  if (!formData.assetName || !formData.creatorName || !formData.email ||
    !formData.story || !formData.assetType || !formData.copyright) {
    alert("Please fill in all required fields");
    return;
  }

  if (!formData.assetFile) {
    alert("Please upload an asset file");
    return;
  }

  if (!formData.representativeImage) {
    alert("Please upload a representative image");
    return;
  }

  isSubmitting.value = true;

  const cleanData = {
    asset_name: formData.assetName,
    creator_name: formData.creatorName,
    keywords: formData.keywords,
    email: formData.email,
    story: formData.story,
    asset_type: formData.assetType,
    creation_method: formData.creationMethod,
    copyright: formData.copyright,
    acknowledgement: formData.acknowledgement,
    asset_file_url: null,
    representative_image_url: null
  };

  try {
    const data = new FormData();

    data.append('assetName', formData.assetName);
    data.append('creatorName', formData.creatorName);
    data.append('keywords', formData.keywords);
    data.append('email', formData.email);
    data.append('story', formData.story);
    data.append('assetType', formData.assetType);
    data.append('creationMethod', formData.creationMethod);
    data.append('copyright', formData.copyright);
    data.append('acknowledgement', formData.acknowledgement);

    data.append('assetFiles', formData.assetFile);
    data.append('representativeImage', formData.representativeImage);

    // Enviamos al servidor local de Node.js
        const response = await axios.post('http://localhost:3000/api/submit', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if(response.data.success){
          alert('Asset submitted successfully to local server!');

          // Reset form
            Object.keys(formData).forEach((key) => {
                formData[key] = (key === 'assetFile' || key === 'representativeImage') ? null : "";
            });
            
            const fileInputs = document.querySelectorAll('input[type="file"]');
            fileInputs.forEach(input => input.value = "");
        }
        } catch (err) {
        console.error("Error submitting to Node.js:", err);
        alert(`Error: ${err.response?.data?.error || err.message}`);
    } finally {
        isSubmitting.value = false;
    }
};


</script>

<template>
  <Topbar :interactive-mode="interactiveMode" @theme-changed="updateTheme" pageTitle="Submit Your Work Page" />

  <div class="form-container">


    <h1>SSX Assetory Asset Submission Form</h1>

    <form ref="formRef" @submit.prevent="submitForm" enctype="multipart/form-data">
      <label for="asset-name">Asset Name <span aria-hidden="true">*</span></label>
      <input type="text" id="asset-name" v-model="formData.assetName" required aria-required="true" />

      <label for="creator-name">Creator(s) Name <span aria-hidden="true">*</span></label>
      <input type="text" id="creator-name" v-model="formData.creatorName" required aria-required="true" />

      <label for="keyowords">Keywords</label>
      <input type="text" id="keywords" v-model="formData.keywords" required aria-required="true"
        placeholder="Please include 3-5 keywords" />

      <label for="email">Email Address <span aria-hidden="true">*</span></label>
      <input type="email" id="email" v-model="formData.email" required aria-required="true" />

      <label for="asset-story">Asset Story <span aria-hidden="true">*</span></label>
      <textarea type="text" id="asset-story" v-model="formData.story" required aria-required="true"></textarea>

      <fieldset class="radio-group-container">
        <legend>Asset Type <span aria-hidden="true">*</span></legend>
        <div class="radio-group">
          <label><input type="radio" name="assetType" value="3D Model" v-model="formData.assetType" required /> 3D
            Model</label>
          <label><input type="radio" name="assetType" value="Audio" v-model="formData.assetType" />
            Audio</label>
          <label><input type="radio" name="assetType" value="Motion Capture" v-model="formData.assetType" />
            Motion Capture</label>
          <label><input type="radio" name="assetType" value="Other" v-model="formData.assetType" />
            Other</label>
        </div>
      </fieldset>

      <label fo="creation-method">Creation Method</label>
      <textarea type="text" id="creation-method" v-model="formData.creationMethod" required
        aria-hidden="true"></textarea>

      <fieldset class="radio-group-container">
        <legend>Copyright <span aria-hidden="true">*</span></legend>
        <div class="radio-group">
          <label><input type="radio" name="copyright" value="CC BY 4.0 DEED" v-model="formData.copyright" required />
            CC BY 4.0 DEED</label>
          <label><input type="radio" name="copyright" value="CC BY-NC 4.0 DEED" v-model="formData.copyright" /> CC
            BY-NC 4.0 DEED</label>
          <label><input type="radio" name="copyright" value="CC BY-NC-ND 4.0 DEED" v-model="formData.copyright" />
            CC
            BY-NC-ND 4.0 DEED</label>
          <label><input type="radio" name="copyright" value="Upon Request" v-model="formData.copyright" /> Upon
            Request</label>
        </div>
        <p class="note">More details: <a
            href="https://docs.google.com/document/d/176Y8Rho2qSRki4TbzK5xIFZq_FN99ccpQVEpgDZHwbg/edit"
            target="_blank">copyright Info Document</a></p>
      </fieldset>

      <label for="asset-file">Asset File <span aria-hidden="true">*</span></label>
      <input type="file" id="asset-file" @change="handleAssetFile" required aria-describedby="file-note" />
      <p id="file-note" class="note">Upload 1 supported file (Max 50 MB)</p>

      <label for="rep-image">Representative Image <span aria-hidden="true">*</span></label>
      <input type="file" id="rep-image" accept="image/*" @change="handleRepresentativeImage" required
        aria-describedby="image-file-note" />
      <p id="image-file-note" class="note">Upload 1 supported image file (Max 50 MB)</p>

      <label for="acknowledgement">Acknowledgement</label>
      <textarea id="acknowledgement" v-model="formData.acknowledgement"></textarea>

      <div aria-live="polite">
        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Processing...' : 'Submit Asset' }}
        </button>

        <p v-if="isSubmitting" class="processing-message">
          Please wait while your asset is being uploaded. This may take a moment...
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 700px;
  margin: 3rem auto;
  padding: 2rem;
  background: var(--secondary-color);
  border: 2px solid var(--homepage-card-buttons-border-color);
  border-radius: 1.5rem;
  box-shadow: 4px 4px 0 var(--shadow);
}

h1 {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 2rem;
}

label {
  display: block;
  font-weight: bold;
  margin-top: 1rem;
}

label span {
  color: red;
}


input[type="text"],
input[type="email"],
textarea,
select {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  border: 2px solid var(--homepage-card-buttons-border-color);
  border-radius: 0.5rem;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  font-size: 1rem;
  transition: background-color 0.3s, border-color 0.3s;
}

input[type="text"]:hover,
input[type="email"]:hover,
textarea:hover,
select:hover,
input[type="text"]:focus-visible,
input[type="email"]:focus-visible,
textarea:focus-visible,
select:focus-visible {
  background-color: var(--hover-color);
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.radio-group {
  margin-top: 0.5rem;
}

.radio-group label {
  display: block;
  font-weight: normal;
  margin: 0.5rem 0;
}

input[type="file"] {
  margin-top: 0.5rem;
  width: 100%;
}

button {
  display: inline-block;
  background: var(--secondary-color);
  border: 2px solid var(--homepage-card-buttons-border-color);
  padding: 0.75rem 1.5rem;
  margin-top: 2rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover:not(:disabled),
button:focus-visible:not(:disabled) {
  background: var(--hover-color);
  color: var(--hover-text-color);
  box-shadow: 2px 2px 0 var(--shadow);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.processing-message {
  margin-top: 1rem;
  color: var(--primary-color);
  font-weight: bold;
  text-align: center;
  font-size: 1rem;
}

.note {
  font-size: 0.9rem;
  color: #555;
  margin-top: 0.25rem;
}
</style>