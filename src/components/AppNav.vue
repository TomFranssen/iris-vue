<template>
    <b-navbar toggleable="md" type="dark" variant="info">
        <b-nav-toggle target="nav_collapse"></b-nav-toggle>
        <b-navbar-brand href="#">IRIS</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-nav is-nav-bar>
                <b-nav-item v-show="isLoggedIn()" href="/events">Events</b-nav-item>
                <b-nav-item v-show="isLoggedIn()" href="/add-event">Add Event</b-nav-item>
            </b-nav>
            <b-nav is-nav-bar class="ml-auto">
                <b-nav is-nav-bar right>
                    <b-nav-item v-show="isLoggedIn()" @click="handleLogout()">Log out</b-nav-item>
                    <b-nav-item v-show="!isLoggedIn()" @click="handleLogin()">Log In</b-nav-item>
                </b-nav>
            </b-nav>
        </b-collapse>
            <a href="#" v-on:click="getProfile">GET PROFILE!!</a>
    </b-navbar>
</template>

<script>
    import { isLoggedIn, login, logout, getProfile } from '../utils/auth'

    export default {
        name: 'app-nav',
        methods: {
            handleLogin () {
                login()
            },
            handleLogout () {
                logout()
            },
            getProfile () {
                getProfile()
            },
            isLoggedIn () {
                return isLoggedIn()
            }
        }
    }
</script>

<style scoped>
    .navbar-right { margin-right: 0px !important}

    .log {
        margin: 5px 10px 0 0
    }
</style>
