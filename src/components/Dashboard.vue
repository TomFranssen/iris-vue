<template>
    <div>
        <h2>Dashboard</h2>
        <p>Yay you made it!</p>

        {{isLoggedIn()}}
        <div v-show="isLoggedIn()">
            <pre>
                {{profile}}
            </pre>
        </div>


    </div>
</template>

<script>
    import AppNav from './AppNav'
    import { isLoggedIn, getProfile } from '../utils/auth'

    export default {
        name: 'dashboard',
        components: {
            AppNav
        },
        methods: {
            isLoggedIn () {
                return isLoggedIn()
            },
            getProfile () {
                if (this.isLoggedIn()) {
                    getProfile().then((profile) => {
                        this.profile = profile
                    })
                }
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
