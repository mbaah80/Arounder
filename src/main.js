import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Toasted from 'vue-toasted'
import { VueEditor } from 'vue2-editor'
import Vue2Filters from 'vue2-filters'
import VueFirestore from 'vue-firestore'
import {fb} from './firebase';

Vue.use(Vue2Filters);

Vue.use(VueEditor)
Vue.use(Toasted,{
  iconPack:'fontawesome'
})
Vue.use(firebase)
Vue.use(VueFirestore,{
  key:'id',
  enumerable: true
})
Vue.use(VueFirestore);
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

let app = '';

fb.auth().onAuthStateChanged((user)=>{
  if(!app)
  {
    new Vue({
    router,
    store,
    render: function (h) { return h(App) }
  }).$mount('#app')
 }
})
