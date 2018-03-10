<template>
    <b-navbar toggleable="sm" variant="primary">
        <div class="container">
            <b-nav-toggle target="nav_collapse"></b-nav-toggle>
            <b-navbar-brand to="/"><img class="logo" src="/static/img/iris-small.svg" alt="IRIS" />I.R.I.S</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse" v-if="this.$store.getters.isMember">
                <b-navbar-nav>
                    <b-nav-item v-show="isLoggedIn()" to="/events">{{$t('events')}}</b-nav-item>
                    <b-nav-item v-show="isLoggedIn()" to="/users">{{$t('users')}}</b-nav-item>
                    <b-nav-item v-show="isLoggedIn()" to="/users-501st">{{$t('users-501st')}}</b-nav-item>
                    <b-nav-item v-show="isLoggedIn()" to="/costumes">{{$t('costumes')}}</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-navbar-nav v-show="!isLoggedIn()" right>
                        <b-nav-item @click="handleLogin()">{{$t('log-in')}}</b-nav-item>
                    </b-navbar-nav>
                    <b-nav-item-dropdown v-show="isLoggedIn() && isMember()" right>
                        <template slot="button-content">
                            <span v-if="profile['https://iris.501st.nl/user_metadata'].username">
                                {{profile['https://iris.501st.nl/user_metadata'].username}}
                            </span>
                            <span v-else>
                                {{$t('account')}}
                            </span>
                            <img v-bind:src="profile['https://iris.501st.nl/legion_thumbnail']" width="30" alt="">
                        </template>
                        <b-dropdown-item to="/profile">{{$t('profile')}}</b-dropdown-item>
                        <b-dropdown-item v-show="isLoggedIn()" @click="handleLogout()">Signout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
    import { isLoggedIn, login, logout, isMember } from '../utils/auth'

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
            isMember () {
                return isMember()
            },
            getProfile () {
                this.$store.dispatch('getProfile')
            }
        }
    }
</script>
