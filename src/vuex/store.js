import { isLoggedIn, getProfile } from '../utils/auth'

export default {
    state: {
        profile: {
            'email': '',
            'email_verified': true,
            'family_name': '',
            'gender': '',
            'given_name': '',
            '501st/legion_id': 0,
            'legion_link': '',
            'legion_thumbnail': '',
            'locale': 'nl',
            'name': '',
            'nickname': '',
            'picture': '',
            'sub': '',
            'updated_at': '',
            'https://iris.501st.nl/user_metadata': {
                username: ''
            }
        }
    },
    mutations: {
        setProfile (state, profile) {
            state.profile = profile
        },
        setLocale (state, locale) {
            state.profile.locale = locale
        }
    },
    actions: {
        getProfile ({ commit }) {
            if (isLoggedIn()) {
                getProfile().then((profile) => {
                    commit('setProfile', profile)
                }).catch(function (e) {
                    console.log(e)
                })
            }
        }
    },
    getters: {
        isMember: state => {
            if (
                state &&
                state.profile &&
                state.profile['https://iris.501st.nl/app_metadata'] &&
                state.profile['https://iris.501st.nl/app_metadata'].authorization &&
                state.profile['https://iris.501st.nl/app_metadata'].authorization.groups
            ) {
                return state.profile['https://iris.501st.nl/app_metadata'].authorization.groups.indexOf('Dutch Garrison') >= 0 || state.profile['https://iris.501st.nl/app_metadata'].authorization.groups.indexOf('Dune Sea Base') >= 0
            }
        },
        isDgMember: state => {
            if (
                state &&
                state.profile &&
                state.profile['https://iris.501st.nl/app_metadata'] &&
                state.profile['https://iris.501st.nl/app_metadata'].authorization &&
                state.profile['https://iris.501st.nl/app_metadata'].authorization.groups
            ) {
                return state.profile['https://iris.501st.nl/app_metadata'].authorization.groups.indexOf('Dutch Garrison') >= 0
            }
        },
        isDsbMember: state => {
            if (
                state &&
                state.profile &&
                state.profile['https://iris.501st.nl/app_metadata'] &&
                state.profile['https://iris.501st.nl/app_metadata'].authorization &&
                state.profile['https://iris.501st.nl/app_metadata'].authorization.groups
            ) {
                return state.profile['https://iris.501st.nl/app_metadata'].authorization.groups.indexOf('Dune Sea Base') >= 0
            }
        },
        isDgGec: state => {
            if (
                state &&
                state.profile &&
                state.profile['https://iris.501st.nl/app_metadata'] &&
                state.profile['https://iris.501st.nl/app_metadata'].authorization &&
                state.profile['https://iris.501st.nl/app_metadata'].authorization.groups
            ) {
                return state.profile['https://iris.501st.nl/app_metadata'].authorization.groups.indexOf('Dutch Garrison GEC') >= 0
            }
        },
        isDsbGec: state => {
            if (
                state &&
                state.profile &&
                state.profile['https://iris.501st.nl/app_metadata'] &&
                state.profile['https://iris.501st.nl/app_metadata'].authorization &&
                state.profile['https://iris.501st.nl/app_metadata'].authorization.groups
            ) {
                return state.profile['https://iris.501st.nl/app_metadata'].authorization.groups.indexOf('Dune Sea Base GEC') >= 0
            }
        },
        hasCostume: state => {
            if (
                state &&
                state.profile &&
                state.profile['https://iris.501st.nl/user_metadata'] &&
                state.profile['https://iris.501st.nl/user_metadata'].costumes
            ) {
                return state.profile['https://iris.501st.nl/user_metadata'].costumes.length > 0
            }
        },
        isGwm: state => {
            if (
                state &&
                state.profile &&
                state.profile['https://iris.501st.nl/app_metadata'] &&
                state.profile['https://iris.501st.nl/app_metadata'].authorization &&
                state.profile['https://iris.501st.nl/app_metadata'].authorization.groups
            ) {
                return state.profile['https://iris.501st.nl/app_metadata'].authorization.groups.indexOf('Dutch Garrison GWM') >= 0
            }
        },
        username: state => {
            if (
                state &&
                state.profile &&
                state.profile['https://iris.501st.nl/user_metadata'] &&
                state.profile['https://iris.501st.nl/user_metadata'].username
            ) {
                return state.profile['https://iris.501st.nl/user_metadata'].username
            }
        }
    }
}
