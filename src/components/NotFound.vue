<template>
    <div>
        <h1>
            {{$t('not-found')}}
        </h1>
        <img width="100%" src="https://media.giphy.com/media/3ornka9rAaKRA2Rkac/giphy.gif" alt="">
    </div>
</template>
<script>
import { isLoggedIn, login } from '../utils/auth'

export default {
    name: 'Home',
    methods: {
        handleLogin () {
            login()
        },
        isLoggedIn () {
            return isLoggedIn()
        }
    }
}
</script>
