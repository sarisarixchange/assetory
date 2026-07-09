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
  background-color: var(--background-color);
}


:root {
  --base-gap: 16rem;
  --font-family-Decorative: 'Kode Mono', sans-serif;
  --font-text: 'Inter', sans-serif;
 
  /* Main Sari Sari website */
  --active-color-main: #D400A6;
  --primary-color-main: #FFFBEB;
  --secondary-color-main: #E47BCD;
  --primary-border-color-main: #9D488B;
  --background-color-main: #1D0018;
  --background-color-cards-main: #26031F;
  --background-color-cards-main-two: #DBD71C;
  --background-color-card-heading-one: #8C006E;
  --background-color-card-heading-two: #DBD71C;
  --color-card-heading-one: #FFFBEB;
  --color-card-heading-two: #26031F;
  --background-color-topbar-nav-buttons: #8C006E;
  --text-color-topbar-nav-button-main: #E47BCD;
  --border-color-topbar-nav-button-active: #FFFBEB;
  --border-color-topbar-nav-button-hover: #FFBAF0;
  --text-color-topbar-nav-button-hover: #FFFBEB;
  --active-text-color-main: #FFFEFA;
  --hover-color-main: #FFEDF4;
  --hover-text-color-main: #000000;
  --border-color-footer: #FFFBEB;
  --text-color-footer: #FFFBEB;
  /* --hover-color-nav-buttons: #8C006E; */


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