<template>
    <div>
        Welcome to IRIS
    </div>
</template>
<script>
    import { setIdToken, setAccessToken } from '../utils/auth'

    export default {
        name: '',
        mounted () {
            this.$nextTick(() => {
                setAccessToken()
                setIdToken()
                this.$router.push('events')
            })
        }
    }
</script>
