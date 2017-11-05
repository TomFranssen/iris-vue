<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"/>
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
            {{getLegionId(user)}}
        </div>
        <div>
            <img v-bind:src="getLegionThumbnail(user)" alt="">
        </div>
        <div>

        </div>
    </div>
</template>

<script>
    import { getPrivateUser } from '../utils/users-api'

    export default {
        name: 'user-details',
        props: ['id'],
        methods: {
            getLegionId: function (user) {
                if (user.user_metadata && user.user_metadata.legion_id) {
                    return user.user_metadata.legion_id
                }
                return ''
            },
            getLegionThumbnail: function (user) {
                if (user.user_metadata && user.user_metadata.legion_thumbnail) {
                    return user.user_metadata.legion_thumbnail
                }
                return ''
            },
            getPrivateUser () {
                const userId = this.$route.params.user_id
                getPrivateUser(userId).then((user) => {
                    this.user = user
                })
            }
        },
        data () {
            return {
                breadcrumbs: [{
                    text: 'Home',
                    to: '/'
                }, {
                    text: 'Users',
                    to: '/users'
                }, {
                    text: 'User details',
                    active: true
                }],
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

