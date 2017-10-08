<template>
    <div>
        <app-nav></app-nav>
        <h2>Dashboard</h2>
        <p>Yay you made it!</p>
    </div>
</template>

<script>
    import AppNav from './AppNav'
    import { isLoggedIn } from '../utils/auth'

    export default {
        name: 'dashboard',
        components: {
            AppNav
        },
        methods: {
            isLoggedIn () {
                return isLoggedIn()
            }
        }
    }

</script>
