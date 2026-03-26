import { defineStore } from 'pinia';

export const usePreviewStore = defineStore('preview', {
  state: () => ({
    previewArtist: null
  }),
  actions: {
    setPreviewArtist(artist) {
      this.previewArtist = artist;
    },
    clearPreview() {
      this.previewArtist = null;
    }
  }
});