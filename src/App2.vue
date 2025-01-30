<template>
  <div id="app">
    <SvgViewer />
  </div>
</template>

<script>
import SvgViewer from './components/SvgViewer.vue';

export default {
  components: {
    SvgViewer,
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  text-align: center;
}
</style>