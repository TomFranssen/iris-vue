import { isLoggedIn, getProfile } from '../utils/auth'

export default {
    state: {
        profile: {
            'email': '',
            'email_verified': undefined,
            'family_name': '',
            'gender': '',
            'given_name': '',
            '501st/legion_id': 0,
            'legion_link': '',
            'legion_thumbnail': '',
            'locale': '',
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
        getProfile ({commit}) {
            if (isLoggedIn()) {
                getProfile().then((profile) => {
                    commit('setProfile', profile)
                })
            }
        }
    }
}
