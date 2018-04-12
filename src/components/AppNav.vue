<template>
    <b-navbar toggleable="sm" variant="primary">
        <div class="container">
            <b-nav-toggle target="nav_collapse"></b-nav-toggle>
            <b-navbar-brand to="/"><img class="logo" src="../assets/iris-small.svg" alt="IRIS" />I.R.I.S</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item v-show="isLoggedIn() && $store.getters.isMember" to="/events">{{$t('events')}}</b-nav-item>
                    <b-nav-item v-show="isLoggedIn() && $store.getters.isMember && $store.getters.isGec" to="/users">{{$t('users')}}</b-nav-item>
                    <b-nav-item v-show="isLoggedIn() && $store.getters.isMember && $store.getters.isGec" to="/users-501st">{{$t('users-501st')}}</b-nav-item>
                    <b-nav-item v-show="isLoggedIn() && $store.getters.isMember && $store.getters.isGwm" to="/costumes">{{$t('costumes')}}</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-navbar-nav v-show="!isLoggedIn()" right>
                        <b-nav-item @click="handleLogin()">{{$t('log-in')}}</b-nav-item>
                    </b-navbar-nav>
                    <b-nav-item-dropdown v-show="isLoggedIn()" right>
                        <template slot="button-content">
                            <span v-if="$store.getters.username">
                                {{$store.getters.username}}
                            </span>
                            <span v-else>
                                {{$t('account')}}
                            </span>
                            <img v-bind:src="profile['https://iris.501st.nl/legion_thumbnail']" width="30" alt="">
                        </template>
                        <b-dropdown-item to="/profile">{{$t('profile')}}</b-dropdown-item>
                        <b-dropdown-item target="_blank" v-show="isLoggedIn() && $store.getters.isGwm" href="https://manage.auth0.com/">
                            {{$t('manage-users')}} <i class="fa fa-external-link" aria-hidden="true"></i>
                        </b-dropdown-item>
                        <b-dropdown-item target="_blank" v-show="isLoggedIn() && $store.getters.isGwm" href="https://dashboard.heroku.com">
                            {{$t('manage-api')}} <i class="fa fa-external-link" aria-hidden="true"></i>
                        </b-dropdown-item>
                        <b-dropdown-item target="_blank" v-show="isLoggedIn() && $store.getters.isGwm" href="https://mlab.com/">
                            {{$t('manage-database')}} <i class="fa fa-external-link" aria-hidden="true"></i>
                        </b-dropdown-item>
                        <b-dropdown-item v-show="isLoggedIn()" @click="handleLogout()">{{$t('logout')}}</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </div>
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
