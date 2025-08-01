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
          font-size: clamp(10px, var(--dynamic-font-size, 0.8vw), 16px)  !important;
        }

        body {
        font-family: 'Inter', sans-serif;
        background: white;
        height: 100vh;
        margin: 0;
        background-color: #f9f9f9;
          }

      /* @font-face {
        font-family: 'Handjet';
        src: url('/fonts/Handjet.ttf') format('opentype');
        font-weight: normal;
        font-style: normal;
        } */

      :root {
      --base-gap: 16rem; /* Base gap size */
      /* font sizes according to Figma desing for 1440 screens that scales to other screens*/
       /* Equivalent to 12px  --font-xs: 0.833vw; */
       /* Equivalent to 14px --font-small: 0.972vw; */
       /* Equivalent to 16px   --font-base: 1.11vw;  */
      /* --font-18px: 1.25vw;  Equivalent to 20px  */
      /* --font-medium: 1.389vw;  Equivalent to 24px  */
      /* --font-24px: 1.667vw;  */
       /* Equivalent to 32px --font-xl: 2.222vw; */
       /* Equivalent to 48px    --font-48px: 3.333vw; */
       /* Equivalent to 128px   --font-mega: 8.889vw; */

      
  --font-xs: clamp(6px, 0.833vw, 16px);       /* pref 14px */
  --font-small: clamp(10px, 0.972vw, 18px);    /* pref 16px */
  --font-base: clamp(12px, 1.11vw, 20px);      /* pref ~18px */
  --font-18px: clamp(16px, 1.25vw, 22px);      /* pref 20px */
  --font-20px: clamp(16px, 1.25vw, 22px);      /* pref 20px */

  --font-medium: clamp(18px, 1.389vw, 26px);   /* pref 24px */
  --font-24px: clamp(20px, 1.667vw, 34px);     /* pref 32px */
  --font-xl: clamp(32px, 2.222vw, 56px);       /* pref 48px */
  --font-48px: clamp(40px, 3.333vw, 96px);     /* pref 48px */
  --font-mega: clamp(80px, 8.889vw, 160px);    /* pref 128px */



      --primary-color: #D400A6; /* Main pink color */
      --secondary-color: #FFEDF4; /* Light pink background */
      --navigation-buttons-border-color:#F1AFDD;
      --hover-color: #A80084; /* Darker pink for hover states */
      --hover-text-color: #FFFFFF;
      --shadow: #F1AFDD; /* Shadow color */


      --primary-color-left-box: #E7EB17;
      --secondary-color-left-box: #FCFCCE;
      --text-color-left-box: #D400A6; /* Secondary text color */
      --hover-color-left-box: #E7EB17; 
      --hover-text-color-left-box:#D400A6;
      }
      
   

</style>