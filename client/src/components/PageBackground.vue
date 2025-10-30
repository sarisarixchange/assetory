  
  <script>
  export default {
    name: 'PageBackground',
    props: {
      theme: {
        type: String,
        default: 'default'
      },
      backgrounds: {
      type: Object,
      required: true // must provide a theme-to-image map
    },
      top: { type: String, default: '0' },
      left: { type: String, default: '0' },
      width: { type: String, default: '100%' },
      height: { type: String, default: 'auto' },
      backgroundSize: {type: String, default: 'contain'},
      backgroundPosition: {type: String, default: 'left'},
      transform: {type: String, default: 'none'},
      


    },

    computed: {
        imageUrl() {
      return this.backgrounds[this.theme] || this.backgrounds['default']
    },

    computedStyle() {
       return {
        position: 'absolute',
        top: this.top,
        left: this.left,
        width: this.width,
        height: this.height,
        transform: this.transform,
        zIndex: -1,
        backgroundImage: `url('${this.imageUrl}')`,
        backgroundSize: this.backgroundSize,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: this.backgroundPosition,
        pointerEvents: 'none', 
        // backgroundColor: 'red'
      }
      }
    }
  }
  </script>
  
  

  <template>
    <div class="page-background-image" :style="computedStyle"></div>
  </template>