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
  /* font-size: 10px !important; */
  /* font-size: clamp(10px, var(--dynamic-font-size, 0.9vw), 16px)  !important; */
  font-size: clamp(10px, 0.9vw, 16px) !important;

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

  --background-color: #FFFEFA;
  --primary-color: #000000;
  --secondary-color: #DBF2FD;
  --navigation-buttons-border-color: #A9D0F5;
  --hover-color: #FD5733;
  --hover-text-color: #FFFFFF;
  --shadow: #000000;


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
}
</style>