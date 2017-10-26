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
    import { isLoggedIn, getProfile } from '../utils/auth'

    export default {
        name: 'profile',
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
