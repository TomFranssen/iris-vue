// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import VuexStore from './vuex/store'
import translations from './i18n/i18n'
import VueI18n from 'vue-i18n'
import VueGoodTable from 'vue-good-table'
import VueInstant from 'vue-instant'
import VueNotifications from 'vue-notifications'
import Noty from 'noty'
import 'noty/lib/noty.css'
import 'vue-instant/dist/vue-instant.css'
import './registerServiceWorker'
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
Vue.use(require('vue-moment'))

function toast ({title, message, type, timeout, cb}) {
    if (type === VueNotifications.types.warn) type = 'warning'
    timeout = 6000
    return new Noty({text: message, timeout, type}).show()
}

const options = {
    success: toast,
    error: toast,
    info: toast,
    warn: toast
}

Vue.use(VueNotifications, options)

const store = new Vuex.Store(VuexStore)

const i18n = new VueI18n({
    locale: 'nl-NL',
    messages: translations
})

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
