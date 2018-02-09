<template>
    <div>
        <h1>
            {{$t('welcome')}}
        </h1>
        {{rows}}
        <div v-show="!isLoggedIn()">
            <p>
                {{$t('welcome-text-verify')}}
            </p>
            <b-button @click="handleLogin()">{{$t('log-in-sign-up')}}</b-button>
        </div>
        <div v-show="isLoggedIn()">
            <b-alert show variant="danger" v-if="$store.state.profile.email_verified === false">
                {{$t('verify-email-text')}}
            </b-alert>
            <b-alert show variant="danger" v-if="!this.$store.getters.isMember">
                {{$t('verify-member')}}
            </b-alert>
            <p v-if="this.$store.getters.isMember">
                {{$t('welcome-text')}}
            </p>
            <b-button @click="handleLogout()">{{$t('log-out')}}</b-button>
        </div>
    </div>
</template>
<script>
    import { isLoggedIn, login } from '../utils/auth'
    import { getPrivateSignedUpEvents } from '../utils/events-api'

    export default {
        name: 'Home',
        methods: {
            handleLogin () {
                login()
            },
            isLoggedIn () {
                return isLoggedIn()
            },
            getPrivateSignedUpEvents () {
                getPrivateSignedUpEvents().then((events) => {
                    this.rows = events
                })
            }
        },
        data () {
            return {
                rows: []
            }
        },
        mounted () {
            this.getPrivateSignedUpEvents()
        }
    }
</script>
