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
            setAccessToken()
            setIdToken()
            this.$router.replace('/')
            this.getProfile()
        },
        methods: {
            getProfile () {
                this.$store.dispatch('getProfile')
            }
        }
    }
</script>
