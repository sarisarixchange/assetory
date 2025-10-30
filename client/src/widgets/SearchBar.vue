<template>
    <input
      type="text"
      placeholder="Search ..."
      v-model="searchQuery"
      @input="logQuery"
    />
  </template>
  
  <script>
  import { useSearchStore } from '../stores/searchStore';
  import { storeToRefs } from 'pinia';
  
  export default {
    setup() {
      const searchStore = useSearchStore();
      const { searchQuery } = storeToRefs(searchStore); // Ensures reactivity with v-model
  
      const logQuery = () => {
        console.log('Search Query:', searchQuery.value);
      };
  
      return {
        searchQuery,
        logQuery,
      };
    },
  };
  </script>
  