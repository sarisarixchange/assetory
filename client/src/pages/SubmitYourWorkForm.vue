<script setup>
import { reactive, ref } from "vue";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import Topbar from '../components/Topbar.vue'; // Import the Topbar component



// --------------------
// Supabase setup
// --------------------
const SUPABASE_URL = "https://igiktlbaxubjupbuqtqf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnaWt0bGJheHVianVwYnVxdHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMjM1MjEsImV4cCI6MjA3Nzc5OTUyMX0.Is58dtSu-dUt7SNXxUl_JDbQPp6rsb91Uhp4DV8Owi0";

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
    <Topbar :interactive-mode="interactiveMode" @theme-changed="updateTheme" />

    <div class="form-container">


        <h1>SSX Assetory Asset Submission Form</h1>

        <form ref="formRef" @submit.prevent="submitForm" enctype="multipart/form-data">
            <label>Asset Name <span>*</span></label>
            <input type="text" name="assetName" v-model="formData.assetName" required />

            <label>Creator(s) Name <span>*</span></label>
            <input type="text" name="creatorName" v-model="formData.creatorName" required />

            <label>Keywords</label>
            <input type="text" name="keywords" v-model="formData.keywords" placeholder="Please include 3–5 keywords" />

            <label>Email Address <span>*</span></label>
            <input type="email" name="email" v-model="formData.email" required />

            <label>Asset Story <span>*</span></label>
            <textarea name="assetStory" v-model="formData.story" required></textarea>

            <label>Asset Type <span>*</span></label>
            <div class="radio-group">
                <label><input type="radio" name="assetType" value="3D Model" v-model="formData.assetType" required /> 3D
                    Model</label>
                <label><input type="radio" name="assetType" value="Audio" v-model="formData.assetType" /> Audio</label>
                <label><input type="radio" name="assetType" value="Motion Capture" v-model="formData.assetType" />
                    Motion Capture</label>
                <label><input type="radio" name="assetType" value="Other" v-model="formData.assetType" /> Other</label>
            </div>

            <label>Creation Method</label>
            <textarea name="creationMethod" v-model="formData.creationMethod"></textarea>

            <label>Copyright <span>*</span></label>
            <div class="radio-group">
                <label><input type="radio" name="license" value="CC BY 4.0 DEED" v-model="formData.license" required />
                    CC BY 4.0 DEED</label>
                <label><input type="radio" name="license" value="CC BY-NC 4.0 DEED" v-model="formData.license" /> CC
                    BY-NC 4.0 DEED</label>
                <label><input type="radio" name="license" value="CC BY-NC-ND 4.0 DEED" v-model="formData.license" /> CC
                    BY-NC-ND 4.0 DEED</label>
                <label><input type="radio" name="license" value="Upon Request" v-model="formData.license" /> Upon
                    Request</label>
            </div>
            <p class="note">More details: <a
                    href="https://docs.google.com/document/d/176Y8Rho2qSRki4TbzK5xIFZq_FN99ccpQVEpgDZHwbg/edit"
                    target="_blank">License Info Document</a></p>

            <label>Asset File <span>*</span></label>
            <input type="file" @change="handleAssetFile" />
            <p class="note">Upload 1 supported file (Max 50 MB)</p>

            <label>Representative Image <span>*</span></label>
            <input type="file" accept="image/*" @change="handleRepresentativeImage" />
            <p class="note">Upload 1 supported image file (Max 50 MB)</p>

            <label>Acknowledgement</label>
            <textarea name="acknowledgement" v-model="formData.acknowledgement"></textarea>

            <button type="submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Processing...' : 'Submit Asset' }}
            </button>

            <p v-if="isSubmitting" class="processing-message">
                Please wait while your asset is being uploaded. This may take a moment...
            </p>
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
select:hover {
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

button:hover:not(:disabled) {
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