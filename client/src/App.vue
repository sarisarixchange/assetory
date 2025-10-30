<template>
  <router-view />
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
  font-size: calc(clamp(10px, 0.9vw, 16px) * var(--font-scale));
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
  --background-color: #FFFEFA;
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
  --homepage-left-card-button-border-color: #000000;
  
}
</style>