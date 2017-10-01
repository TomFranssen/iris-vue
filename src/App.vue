<template>
    <div id="app">
        <b-navbar toggleable="md" type="dark" variant="info">
            <b-nav-toggle target="nav_collapse"></b-nav-toggle>

            <b-navbar-brand href="#">IRIS</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">

                <b-nav is-nav-bar>
                    <b-nav-item v-if="!loggedIn" href="/login">Login</b-nav-item>
                    <b-nav-item v-if="loggedIn" href="/logout">Logout</b-nav-item>
                    <b-nav-item href="/events">Events</b-nav-item>
                    <b-nav-item href="/add-event">Add event</b-nav-item>
                </b-nav>

                <!-- Right aligned nav items -->
                <b-nav is-nav-bar class="ml-auto">

                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>

                    <b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown right>
                        <!-- Using button-content slot -->
                        <template slot="button-content">
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Signout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-nav>

            </b-collapse>
        </b-navbar>
        <template v-if="$route.matched.length">
            <div class="container-fluid">
                <router-view></router-view>
            </div>
        </template>
        <template v-else>
            <p>You are logged {{ loggedIn ? 'in' : 'out' }}</p>
        </template>
    </div>
</template>

<script>
    import auth from './auth'
    export default {
        data () {
            return {
                loggedIn: auth.loggedIn()
            }
        },
        created () {
            auth.onChange = loggedIn => {
                this.loggedIn = loggedIn
            }
        }
    }
</script>

<style>
    html, body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: #2c3e50;
    }
</style>
