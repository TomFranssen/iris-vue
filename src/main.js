// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VuexStore from './vuex/store'
import translations from './i18n/i18n'
import VueI18n from 'vue-i18n'
import VueGoodTable from 'vue-good-table'
import VueInstant from 'vue-instant'

import 'vue-instant/dist/vue-instant.css'
require('./scss/styles.scss')
require('../node_modules/font-awesome/scss/font-awesome.scss')

Vue.config.productionTip = false
Vue.use(VeeValidate, {
    fieldsBagName: 'formFields',
    delay: 1000,
    locale: 'en',
    dictionary: null,
    strict: true,
    classes: false,
    aria: true
})
Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueI18n)
Vue.use(VueGoodTable)
Vue.use(VueInstant)

const store = new Vuex.Store(VuexStore)

const i18n = new VueI18n({
    locale: 'nl',
    messages: translations
})

/* eslint-disable no-new */
new Vue({
    i18n,
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})

