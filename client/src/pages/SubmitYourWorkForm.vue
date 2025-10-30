<script setup>
import { reactive } from "vue";
import axios from "axios";

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
  assetFiles: [],
  representativeImage: null,
});

const handleAssetFiles = (event) => {
  formData.assetFiles = Array.from(event.target.files);
};

const handleRepresentativeImage = (event) => {
  formData.representativeImage = event.target.files[0];
};

const submitForm = async () => {
  try {
    const data = new FormData();

    data.append("assetName", formData.assetName);
    data.append("creatorName", formData.creatorName);
    data.append("keywords", formData.keywords);
    data.append("email", formData.email);
    data.append("story", formData.story);
    data.append("assetType", formData.assetType);
    data.append("creationMethod", formData.creationMethod);
    data.append("copyright", formData.copyright);
    data.append("acknowledgement", formData.acknowledgement);

    formData.assetFiles.forEach((file) => {
      data.append("assetFiles", file);
    });

    if (formData.representativeImage) {
      data.append("representativeImage", formData.representativeImage);
    }

    const res = await axios.post("http://localhost:3000/submit", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Form submitted:", res.data);
    alert("Asset submitted successfully!");
  } catch (err) {
    console.error("Error submitting form:", err);
    alert("Error submitting form. Check console for details.");
  }
};
</script>



<template>
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
        <input type="radio" name="assetType" value="3D Model" v-model="formData.assetType" required /> 3D Model
        <input type="radio" name="assetType" value="Audio" v-model="formData.assetType" /> Audio
        <input type="radio" name="assetType" value="Motion Capture" v-model="formData.assetType" /> Motion Capture
        <input type="radio" name="assetType" value="Other" v-model="formData.assetType" /> Other

      </div>

      <label>Creation Method</label>
      <textarea name="creationMethod" v-model="formData.creationMethod"></textarea>

      <label>Copyright <span>*</span></label>
      <div class="radio-group">
        <input type="radio" name="license" value="CC BY 4.0 DEED" v-model="formData.license" required /> CC BY 4.0 DEED
        <input type="radio" name="license" value="CC BY-NC 4.0 DEED" v-model="formData.license" /> CC BY-NC 4.0 DEED
        <input type="radio" name="license" value="CC BY-NC-ND 4.0 DEED" v-model="formData.license" /> CC BY-NC-ND 4.0
        DEED
        <input type="radio" name="license" value="Upon Request" v-model="formData.license" /> Upon Request

      </div>
      <p class="note">More details: <a
          href="https://docs.google.com/document/d/176Y8Rho2qSRki4TbzK5xIFZq_FN99ccpQVEpgDZHwbg/edit"
          target="_blank">License Info Document</a></p>

      <label>Asset File <span>*</span></label>
      <input type="file" multiple @change="handleAssetFiles" />
      <p class="note">Upload up to 5 supported files (Max 10 MB each)</p>

      <label>Representative Image <span>*</span></label>
      <input type="file" @change="handleRepresentativeImage" />
      <p class="note">Upload 1 supported file (Max 10 MB)</p>

      <label>Acknowledgement</label>
      <textarea name="acknowledgement" v-model="formData.acknowledgement"></textarea>

      <button type="submit">Submit Asset</button>
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

.checkbox-group,
.radio-group {
  margin-top: 0.5rem;
}

.checkbox-group label,
.radio-group label {
  display: block;
  font-weight: normal;
}

input[type="file"] {
  margin-top: 0.5rem;
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

button:hover {
  background: var(--hover-color);
  color: var(--hover-text-color);
  box-shadow: 2px 2px 0 var(--shadow);
}

.note {
  font-size: 0.9rem;
  color: #555;
}
</style>