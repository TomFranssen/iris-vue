<template>
    <div>
        <h2>Dashboard</h2>
        <p>Yay you made it!</p>

        {{isLoggedIn()}}
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
