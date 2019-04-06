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
                        {{$t('501st-costumes')}}:
                    </h2>
                    <div v-for="costume in myDgCostumes" v-bind:key="costume.costumeId">
                        <img v-bind:src="costume.thumbnail" alt="">
                        <h5 class="card-title">{{costume.costumeName}}</h5>
                    </div>
                </div>
                <div>
                    <h2 class="mt-3">
                        {{$t('extra-costumes')}}:
                    </h2>
                    <div v-for="costume in profile['https://iris.501st.nl/user_metadata'].costumes" v-bind:key="costume.name">
                        {{costume.name}}
                    </div>
                </div>
                <div>
                    <h2 class="mt-3">
                        {{$t('groups')}}:
                    </h2>
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
import { getDgCostumes } from '../utils/costume-api'

export default {
    name: 'profile',
    computed: {
        myDgCostumes () {
            const legionId = this.$store.state.profile['https://iris.501st.nl/user_metadata'].legion_id
            if (this.dgcostumes && this.dgcostumes.unit && this.dgcostumes) {
                const user = this.dgcostumes.unit.members.find((member) => {
                    return member.legionId.toString() === legionId
                })
                return user.costumes
            }
            return false
        },
        profile () {
            return this.$store.state.profile
        },
        enhancedPicture () {
            return this.$store.state.profile['https://iris.501st.nl/legion_thumbnail'] || this.$store.state.profile.picture
        },
        locale: {
            get () {
                if (this.$store.state.profile.locale) {
                    return this.$store.state.profile.locale
                } else {
                    return 'nl-NL'
                }
            },
            set (value) {
                this.$i18n.locale = value
                this.$store.commit('setLocale', value)
            }
        }
    },
    mounted () {
        this.getDgCostumes()
    },
    components: {
        AppNav
    },
    data () {
        return {
            dgcostumes: [],
            breadcrumbs: [{
                text: 'Home',
                to: '/'
            }, {
                text: 'Profile',
                active: true
            }],
            languageOptions: [
                { text: 'English', value: 'en-EN' },
                { text: 'Nederlands', value: 'nl-NL' },
                { text: 'Duits', value: 'de-DE' }
            ]
        }
    },
    methods: {
        isLoggedIn () {
            return isLoggedIn()
        },
        getDgCostumes () {
            getDgCostumes().then((costumes) => {
                this.dgcostumes = costumes
            })
        }
    }
}
</script>
