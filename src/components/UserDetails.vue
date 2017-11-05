<template>
    <div>
        <h1>User details</h1>
        <div>
            {{user.name}}
        </div>
        <div>
            {{user.email}}
        </div>
        <div>
            <img v-bind:src="user.picture" alt="">
        </div>
        <div>
            {{user.user_metadata.legion_id}}
        </div>
        <div>
            <img v-bind:src="user.user_metadata.legion_thumbnail" alt="">
        </div>
        <div>
            {{user.user_metadata.legion_link}}
        </div>
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
                user: {
                    user_metadata: {}
                }
            }
        },
        mounted () {
            this.getPrivateUser()
        }
    }
</script>

