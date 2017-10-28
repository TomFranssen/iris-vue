import { isLoggedIn, getProfile } from '../utils/auth'

export default {
    state: {
        profile: {
            'email': '',
            'email_verified': false,
            'family_name': '',
            'gender': '',
            'given_name': '',
            '501st/legion_id': 0,
            'https://iris.501st.nl/legion_link': '',
            'https://iris.501st.nl/legion_thumbnail': '',
            'locale': '',
            'name': '',
            'nickname': '',
            'picture': '',
            'sub': '',
            'updated_at': ''
        }
    },
    mutations: {
        setProfile (state, profile) {
            state.profile = profile
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
