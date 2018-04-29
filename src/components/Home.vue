<template>
    <div>
        <div v-show="!isLoggedIn()">
            <h1>
                {{$t('welcome')}}
            </h1>
            <p>
                {{$t('welcome-text-verify')}}
            </p>
            <b-button @click="handleLogin()">{{$t('log-in-sign-up')}}</b-button>
        </div>
        <div v-show="isLoggedIn()">
            <h1>
                {{$t('welcome')}}
            </h1>
            <p>
                {{$t('welcome-text')}}
            </p>
            <router-link class="btn btn-secondary" v-bind:to="'/events'">
                {{$t('view-events')}}
            </router-link>
        </div>
    </div>
</template>
<script>
import { isLoggedIn, login, logout } from '../utils/auth'

export default {
    name: 'Home',
    methods: {
        handleLogin () {
            login()
        },
        handleLogout () {
            logout()
        },
        isLoggedIn () {
            return isLoggedIn()
        }
    },
    mounted () {
        if (this.$route.query.redirect) {
            localStorage.setItem('redirectUrl', this.$route.query.redirect)
        }
    }
}
</script>
