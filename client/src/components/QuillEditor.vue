<template>
  <div class="quill-editor-wrapper">
    <QuillEditor
      :content="modelValue"
      content-type="html"
      :modules="editorModules"
      :placeholder="placeholder"
      toolbar="full"
      theme="snow"
      @update:content="onContentChange"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import ImageResize from 'quill-image-resize-vue';

// 🔥 REGISTRO ÚNICO GLOBAL: Registramos el plugin una sola vez en el core de Quill
// Esto evita que el v-for intente sobreescribir el módulo en cada tarjeta.
if (!Quill.imports['modules/imageResize']) {
  Quill.register('modules/imageResize', ImageResize);
}

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Write description here...'
  }
});

const emit = defineEmits(['update:modelValue', 'textChange']);

// Configuramos el módulo ImageResize para que sea nativo en este componente modular
const editorModules = {
  name: 'imageResize',
  module: ImageResize,
  options: {
    displaySize: true
  }
};

// Sincronizamos los cambios hacia el componente Padre (ArtistsManager)
const onContentChange = (htmlContent) => {
  emit('update:modelValue', htmlContent === '<p><br></p>' ? '' : htmlContent);
  emit('textChange'); // Notificamos para activar el estado isDirty
};
</script>

<style scoped>
/* 🛡️ El Parche del Tooltip centrado para URLs de video e imágenes */
:deep(.ql-toolbar .ql-tooltip),
:deep(.ql-container .ql-tooltip) {
  z-index: 100 !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  white-space: nowrap;
}

:deep(.ql-container) {
  overflow: visible !important;
  min-height: 350px;
  height: auto;
  font-size: 16px;
  background: white;
}

:deep(.ql-editor) {
  overflow: visible !important;
}

/* Renderizado responsivo para iframes de videos incrustados */
:deep(.ql-editor iframe.ql-video) {
  display: block;
  width: 100% !important;
  max-width: 800px;
  aspect-ratio: 16 / 9;
  margin: 2rem auto;
  border-radius: 8px;
  border: 2px solid #eee;
}
</style>