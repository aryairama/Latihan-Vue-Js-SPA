import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './plugins/helper'
import VueProgressBar from 'vue-progressbar'

const options = {
  color: '#00cc55',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.config.productionTip = false
Vue.use(VueProgressBar, options)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  // components: {
  //   'App' : App
  // },
  // template: `
  // <div class="container">
  //   <App></App>
  // </div>`
}).$mount('#app')