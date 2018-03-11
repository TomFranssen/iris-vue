<template>
    <div>
        Welcome to IRIS
    </div>
</template>
<script>
    import { setIdToken, setAccessToken } from '../utils/auth'

    export default {
        name: 'Callback',
        created () {
            const redirectUrl = localStorage.getItem('redirectUrl')
            setAccessToken()
            setIdToken()

            if (redirectUrl) {
                this.$router.replace(redirectUrl)
            } else {
                this.$router.replace('/')
            }
            this.getProfile()
        },
        methods: {
            getProfile () {
                this.$store.dispatch('getProfile')
            }
        }
    }
</script>
