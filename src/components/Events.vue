<template>
    <div>
        <template>
            <h1>All events</h1>
            <b-table striped hover :items="events"></b-table>
        </template>
    </div>
</template>

<script>
    import moment from 'moment'
    import { isLoggedIn } from '../utils/auth'
    import { getPrivateEvents } from '../utils/events-api'

    export default {
        name: 'events',
        methods: {
            moment: function () {
                return moment()
            },
            isLoggedIn () {
                return isLoggedIn()
            },
            getPrivateEvents () {
                getPrivateEvents().then((events) => {
                    this.events = events
                })
            }
        },
        data () {
            return {
                events: []
            }
        },

        mounted () {
            this.getPrivateEvents()
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: block;
        margin: 0 10px;
    }

    a {
        color: #35495E;
    }
</style>
