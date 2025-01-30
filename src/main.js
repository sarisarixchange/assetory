import { createApp } from 'vue'
import App from './App.vue'

import HomeMenu from './components/HomeMenu.vue'
import XYZGraph from './components/XYZGraph.vue'
import ConnectorsRight from './components/ConnectorsRight.vue'
import Frame26 from './components/Frame26.vue'
import HomeComplete from './components/HomeComplete.vue'

const app = createApp(App)
// app.component('home-menu', HomeMenu)
// app.component('xyz-graph', XYZGraph)
// app.component('connectors-right', ConnectorsRight)
// app.component('frame-twentysix', Frame26)
app.component('home-complete', HomeComplete)

app.mount('#app')