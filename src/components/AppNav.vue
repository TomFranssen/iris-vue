<template>
    <b-navbar toggleable="md" variant="primary">
        <b-nav-toggle target="nav_collapse"></b-nav-toggle>
        <b-navbar-brand href="#">IRIS</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-nav is-nav-bar>
                <b-nav-item v-show="isLoggedIn()" href="/events">Events</b-nav-item>
                <b-nav-item v-show="isLoggedIn()" href="/add-event">Add Event</b-nav-item>
            </b-nav>
            <b-nav is-nav-bar class="ml-auto">
                <b-nav v-show="!isLoggedIn()" is-nav-bar right>
                    <b-nav-item @click="handleLogin()">Log In</b-nav-item>
                </b-nav>
                <b-nav-item-dropdown v-show="isLoggedIn()" right>
                    <template slot="button-content">
                        Hello
                        {{profile.given_name}}
                        <img v-bind:src="profile.picture" width="30" height="30" alt="">
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#" v-show="isLoggedIn()" @click="handleLogout()">Signout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-nav>
        </b-collapse>
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
                getProfile().then((profile) => {
                    this.profile = profile
                })
            },
            isLoggedIn () {
                return isLoggedIn()
            }
        },
        mounted () {
            this.getProfile()
        },
        data () {
            return {
                profile: ''
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
