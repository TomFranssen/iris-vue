<template>
    <b-navbar toggleable="sm" variant="primary">
        <b-nav-toggle target="nav_collapse"></b-nav-toggle>
        <b-navbar-brand to="/">IRIS</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-nav is-nav-bar>
                <b-nav-item v-show="isLoggedIn()" to="events">Events</b-nav-item>
                <b-nav-item v-show="isLoggedIn()" to="add-event">Add Event</b-nav-item>
            </b-nav>
            <b-nav is-nav-bar class="ml-auto">
                <b-nav v-show="!isLoggedIn()" is-nav-bar right>
                    <b-nav-item @click="handleLogin()">Log In</b-nav-item>
                </b-nav>
                <b-nav-item-dropdown v-show="isLoggedIn()" right>
                    <template slot="button-content">
                        Hello
                        {{profile.given_name}}
                        <img v-bind:src="profile['https://iris.501st.nl/legion_thumbnail']" width="30" alt="">
                    </template>
                    <b-dropdown-item to="profile">Profile</b-dropdown-item>
                    <b-dropdown-item v-show="isLoggedIn()" @click="handleLogout()">Signout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    import { isLoggedIn, login, logout } from '../utils/auth'

    export default {
        name: 'app-nav',
        computed: {
            profile () {
                return this.$store.state.profile
            }
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
