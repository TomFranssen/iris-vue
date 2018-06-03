<template>
    <div>
        Welcome to IRIS
        <p>
            <b-button @click="handleLogout()">{{$t('log-out')}}</b-button>
        </p>
    </div>
</template>
<script>
import { setIdToken, setAccessToken, getIdToken, getAccessToken, logout } from '../utils/auth'

export default {
    name: 'Callback',
    created () {
        const redirectUrl = localStorage.getItem('redirectUrl')
        setAccessToken()
        setIdToken()
        this.getProfile()

        if (redirectUrl && getIdToken && getAccessToken) {
            this.$router.replace(redirectUrl)
        } else {
            this.$router.replace('/')
        }
    },
    methods: {
        getProfile () {
            this.$store.dispatch('getProfile')
        },
        handleLogout () {
            logout()
            this.$router.push('/')
        }
    }
}
</script>
