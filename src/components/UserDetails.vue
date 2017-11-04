<template>
    <div>
        <template>
            {{user}}
        </template>
    </div>
</template>

<script>
    import { getPrivateUser } from '../utils/users-api'

    export default {
        name: 'user-details',
        props: ['id'],
        methods: {
            getPrivateUser () {
                const userId = this.$route.params.user_id
                getPrivateUser(userId).then((user) => {
                    this.user = user
                })
            }
        },
        data () {
            return {
                user: {}
            }
        },
        mounted () {
            this.getPrivateUser()
        }
    }
</script>

