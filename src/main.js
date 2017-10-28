// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VuexStore from './vuex/store'

require('./scss/styles.scss')
require('../node_modules/font-awesome/scss/font-awesome.scss')

const config = {
    fieldsBagName: 'formFields',
    delay: 1000,
    locale: 'en',
    dictionary: null,
    strict: true,
    classes: false,
    aria: true
}

Vue.config.productionTip = false
Vue.use(VeeValidate, config)
Vue.use(BootstrapVue)
Vue.use(Vuex)

const store = new Vuex.Store(VuexStore)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})

