<template>
  <v-app shadow>
    <v-main>
  <router-view />
  </v-main>
  </v-app>
</template>


<script></script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  --font-scale: 1;
  font-size: calc(clamp(10px, 0.9vw, 16px) * var(--font-scale)) !important;
}


body {
  font-family: 'Inter', sans-serif;
  background: white;
  height: 100vh;
  margin: 0;
  /* background-color: #f9f9f9; */
  background-color: var(--background-color);
}

/* @font-face {
        font-family: 'Handjet';
        src: url('/fonts/Handjet.ttf') format('opentype');
        font-weight: normal;
        font-style: normal;
        } */

:root {
  --base-gap: 16rem;
  --font-family-Decorative: 'Kode Mono', sans-serif;
  --font-text:  'Inter', sans-serif;

  /* new default theme */
  /* --background-color: #FFFEFA;
  --primary-color: #000000;
  --secondary-color: #DBF2FD;
  --navigation-buttons-border-color: #A9D0F5;
  --hover-color: #FD5733;
  --hover-text-color: #FFFFFF;
  --shadow: #000000; */


  /* interactive theme */
  /* --background-color: #FFFEF6;
  --primary-color: #D400A6;
  --secondary-color: #FFEDF4;
  --navigation-buttons-border-color: #F1AFDD;
  --hover-color: #A80084;
  --hover-text-color: #FFFFFF;
  --shadow: #F1AFDD;


  --primary-color-left-box: #E7EB17;
  --secondary-color-left-box: #FCFCCE;
  --text-color-left-box: #D400A6;
  --hover-color-left-box: #E7EB17;
  --hover-text-color-left-box: #D400A6; */

  /* default (orange + blue theme) */

  /* Main Sari Sari website */
  --active-color-main: #D400A6;
  --active-text-color-main: #FFFEFA;
  --hover-color-main: #FFEDF4;
  --hover-text-color-main: #000000;

  /* Assetory */
  --background-color: #FFFEFA;
  --background-color-headings: #FD5733;
  --return-button-background-color: #FD5733;
  --return-button-text-color: #FFFEFA;
  --primary-color: #000000;
  --secondary-color: #FFFEFA;
  --navigation-buttons-border-color: #000000;
  --homepage-card-buttons-border-color: #000000;
  --hover-color: #E7F6FC;
  --hover-text-color: #000000;
  --shadow: #000000;

  --primary-color-left-box: #000000;
  --secondary-color-left-box: #FFFEFA;
  --text-color-left-box: #FFFEFA;
  --hover-color-left-box: #E7F6FC;
  --hover-text-color-left-box: #000000;
  --homepage-left-card-button-border-color: #000000;

}
</style>