<template>
    <div id="app">
        <app-nav></app-nav>
        <template v-if="$route.matched.length">
            <div class="container-fluid">
                <router-view></router-view>
            </div>
        </template>
    </div>
</template>

<script>
    import AppNav from './components/AppNav'
    import { isLoggedIn, login, logout } from './utils/auth'

    export default {
        name: 'app',
        components: {
            AppNav
        },
        created () {
            this.getProfile()
        },
        methods: {
            handleLogin () {
                login()
            },
            handleLogout () {
                logout()
            },
            isLoggedIn () {
                return isLoggedIn()
            },
            getProfile () {
                this.$store.dispatch('getProfile')
            }
        }
    }
</script>

<style>
</style>
