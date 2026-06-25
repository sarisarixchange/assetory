<script setup>
import { reactive, ref } from "vue";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
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
// Supabase setup
// --------------------
const SUPABASE_URL = "https://jmkknhbygadthnygsvvw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impta2tuaGJ5Z2FkdGhueWdzdnZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzOTIzOTAsImV4cCI6MjA5Nzk2ODM5MH0.oydAov7JmDzth1XGrtGtILNeRtZVOj3-aJ-p1OL4KU0";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
    license: "",
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
        !formData.story || !formData.assetType || !formData.license) {
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
        license: formData.license,
        acknowledgement: formData.acknowledgement,
        asset_file_url: null,
        representative_image_url: null
    };

    try {
        // Step 1: Insert initial row
        const { data: rowData, error: insertError } = await supabase
            .from("assets_table")
            .insert(cleanData)
            .select();

        if (insertError) throw insertError;

        const submissionId = rowData[0].id;
        console.log("Submission ID:", submissionId);

        // Step 2: Upload asset file
        const file = formData.assetFile;
        const fileName = `${uuidv4()}-${file.name}`;
        const filePath = `${submissionId}/files/${fileName}`;

        console.log(`Uploading asset file: ${file.name}`);

        const { error: uploadError } = await supabase.storage
            .from("assets")
            .upload(filePath, file);

        if (uploadError) {
            console.error(`Error uploading ${file.name}:`, uploadError);
            throw uploadError;
        }

        const assetFileUrl = supabase.storage.from("assets").getPublicUrl(filePath).data.publicUrl;
        console.log("Asset file uploaded successfully:", file.name);

        // Step 3: Upload representative image
        let representativeUrl = null;
        if (formData.representativeImage) {
            const repFileName = `${uuidv4()}-${formData.representativeImage.name}`;
            const repFilePath = `${submissionId}/representative/${repFileName}`;

            console.log("Uploading representative image...");

            const { error: repError } = await supabase.storage
                .from("assets")
                .upload(repFilePath, formData.representativeImage);

            if (repError) throw repError;

            representativeUrl = supabase.storage.from("assets").getPublicUrl(repFilePath).data.publicUrl;
            console.log("Representative image uploaded successfully");
        }

        // Step 4: Update the row with file URLs
        console.log("Updating database with URLs:", { assetFileUrl, representativeUrl });

        const { data: updateData, error: updateError } = await supabase
            .from("assets_table")
            .update({
                asset_file_url: assetFileUrl,
                representative_image_url: representativeUrl,
            })
            .eq("id", submissionId)
            .select();

        if (updateError) {
            console.error("Update error:", updateError);
            throw updateError;
        }

        console.log("Database updated successfully:", updateData);

        alert("Asset submitted successfully!");
        console.log("Submission complete:", {
            submissionId,
            assetFileUrl,
            representativeUrl,
            finalData: updateData
        });

        // Reset form
        Object.keys(formData).forEach((key) => {
            formData[key] = "";
        });
        formData.assetFile = null;
        formData.representativeImage = null;

        // Reset file inputs
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => input.value = "");

    } catch (err) {
        console.error("Error submitting form:", err);
        alert(`Error submitting form: ${err.message}`);
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
                placeholder="Please include 3–5 keywords" />

            <label for="email">Email Address <span aria-hidden="true">*</span></label>
            <input type="email" id="email" v-model="formData.email" required aria-required="true" />

            <label for="asset-story">Asset Story <span aria-hidden="true">*</span></label>
            <textarea type="text" id="asset-story" v-model="formData.story" required aria-required="true"></textarea>

            <fieldset class="radio-group-container">
                <legend>Asset Type <span aria-hidden="true">*</span></legend>
                <div class="radio-group">
                    <label><input type="radio" name="assetType" value="3D Model" v-model="formData.assetType"
                            required /> 3D
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
                    <label><input type="radio" name="license" value="CC BY 4.0 DEED" v-model="formData.license"
                            required />
                        CC BY 4.0 DEED</label>
                    <label><input type="radio" name="license" value="CC BY-NC 4.0 DEED" v-model="formData.license" /> CC
                        BY-NC 4.0 DEED</label>
                    <label><input type="radio" name="license" value="CC BY-NC-ND 4.0 DEED" v-model="formData.license" />
                        CC
                        BY-NC-ND 4.0 DEED</label>
                    <label><input type="radio" name="license" value="Upon Request" v-model="formData.license" /> Upon
                        Request</label>
                </div>
                <p class="note">More details: <a
                        href="https://docs.google.com/document/d/176Y8Rho2qSRki4TbzK5xIFZq_FN99ccpQVEpgDZHwbg/edit"
                        target="_blank">License Info Document</a></p>
                        </fieldset>

                <label for="asset-file">Asset File <span aria-hidden="true">*</span></label>
                <input type="file" id="asset-file" @change="handleAssetFile" required aria-describedby="file-note"/>
                <p id="file-note" class="note">Upload 1 supported file (Max 50 MB)</p>

                <label for="rep-image">Representative Image <span aria-hidden="true">*</span></label>
                <input type="file" id="rep-image" accept="image/*" @change="handleRepresentativeImage"required aria-describedby="image-file-note"/>
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