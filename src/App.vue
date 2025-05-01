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

      @font-face {
        font-family: 'Handjet';
        src: url('/fonts/Handjet.ttf') format('opentype');
        font-weight: normal;
        font-style: normal;
        }

        :root {
          --base-gap: 18rem; /* Base gap size */
        }
        
      body {
        font-family: 'Inter', sans-serif;
        font-size: 16px; /* 1rem = 16px */
        background: white;
        height: 100vh;
        margin: 0;
        background-color: #f9f9f9;
          }

       /* Increase root font size for larger screens */
       @media (min-width: 600px) {
          html {
            font-size: 12px; /* 1rem = 12px */
          }
        }

        /* Increase root font size for larger screens */
        @media (min-width: 768px) {
          html {
            font-size: 18px; /* 1rem = 18px */
          }
        }

        /* Further increase root font size for very large screens */
        @media (min-width: 1200px) {
          html {
            font-size: 20px; /* 1rem = 20px */
          }
        }

        h2 {
          font-size: 1rem; 
          font-weight: normal; 
        }

</style>