// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'

const config = {
    errorBagName: 'errors', // change if property conflicts.
    fieldsBagName: 'formFields',
    delay: 0,
    locale: 'en',
    dictionary: null,
    strict: true,
    classes: false,
    classNames: {
        touched: 'touched', // the control has been blurred
        untouched: 'untouched', // the control hasn't been blurred
        valid: 'valid', // model is valid
        invalid: 'invalid', // model is invalid
        pristine: 'pristine', // control has not been interacted with
        dirty: 'dirty' // control has been interacted with
    },
    events: 'input|blur',
    inject: true,
    validity: false,
    aria: true
}

Vue.config.productionTip = false
Vue.use(VeeValidate, config)
Vue.use(BootstrapVue)
Vue.use(Vuex)

Vue.directive('focus', {
    // When the bound element is inserted into the DOM...
    inserted: function (el) {
        // Focus the element
        el.focus()
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})

