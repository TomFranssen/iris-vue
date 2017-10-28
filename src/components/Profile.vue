<template>
    <div>
        <h2>Profile</h2>
        <div v-show="isLoggedIn()">
            <pre>
                {{profile}}
            </pre>
        </div>
    </div>
</template>

<script>
    import AppNav from './AppNav'
    import { isLoggedIn } from '../utils/auth'

    export default {
        name: 'profile',
        computed: {
            profile () {
                return this.$store.state.profile
            }
        },
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
