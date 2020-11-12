import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {auth} from './firebase'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)


auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch('detectarUsuario', {uid: user.uid, email: user.email})
  } else {
    store.dispatch('detectarUsuario', '')
  }
  
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})

