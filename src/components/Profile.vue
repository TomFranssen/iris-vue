<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"/>
        <h1>{{ $t("info") }}</h1>
        <div v-show="isLoggedIn()">
            <b-alert show variant="danger" v-if="$store.state.profile.email_verified === false">
                {{$t('verify-email-text')}}
            </b-alert>
            <div class="text-center">
                <div>
                    <img v-bind:src="enhancedPicture" alt="" class="img-fluid">
                </div>
                <h2 class="mt-3">
                    {{$store.getters.username}}
                </h2>
                <div>
                    {{profile.email}}
                </div>
                <div>
                    {{$t('501st-legion-id')}}:
                    <a v-bind:href="profile['https://iris.501st.nl/legion_link']">
                        {{profile['https://iris.501st.nl/user_metadata'].legion_id}}
                    </a>
                </div>
                <div>
                    <h2 class="mt-3">
                        {{$t('costumes')}}:
                    </h2>
                    <div v-for="costume in profile['https://iris.501st.nl/user_metadata'].costumes">
                        {{costume.name}}
                    </div>
                </div>
                <div>
                    <h2 class="mt-3">
                        {{$t('groups')}}:
                    </h2>
                    <div v-for="group in profile['https://iris.501st.nl/app_metadata'].authorization.groups">
                        {{group}}
                    </div>
                </div>
                <div>
                    <h2 class="mt-3">{{ $t("change-language") }}</h2>
                    <b-form-radio-group id="change-language" v-model="locale" :options="languageOptions" name="language">
                    </b-form-radio-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AppNav from './AppNav'
    import { isLoggedIn } from '../utils/auth'

    export default {
        name: 'profile',
        computed: {
            profile () {
                return this.$store.state.profile
            },
            enhancedPicture () {
                return this.$store.state.profile['https://iris.501st.nl/legion_thumbnail'] || this.$store.state.profile.picture
            },
            locale: {
                get () {
                    return this.$store.state.profile.locale
                },
                set (value) {
                    this.$i18n.locale = value
                    this.$store.commit('setLocale', value)
                }
            }
        },
        components: {
            AppNav
        },
        data () {
            return {
                breadcrumbs: [{
                    text: 'Home',
                    to: '/'
                }, {
                    text: 'Profile',
                    active: true
                }],
                languageOptions: [
                    { text: 'English', value: 'en' },
                    { text: 'Nederlands', value: 'nl' },
                    { text: 'Duits', value: 'de' }
                ]
            }
        },
        methods: {
            isLoggedIn () {
                return isLoggedIn()
            }
        }
    }
</script>