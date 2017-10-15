<template>
    <div>
        <template>
            {{ this.$route.params }}
            <pre>
                {{ events }}
            </pre>
        </template>
    </div>
</template>

<script>
    import moment from 'moment'
    import { isLoggedIn } from '../utils/auth'
    import { getPrivateEvents } from '../utils/events-api'

    export default {
        name: 'events',
        filters: {
            moment: function (date) {
                return moment(date).format('dddd MMMM Do YYYY')
            }
        },
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
                events: [
                    {
                        name: 'Loading events',
                        eventDates: [
                            {
                                date: '2017-10-03T19:24:00.000Z',
                                availableSpots: 25,
                                open: 1
                            }
                        ]
                    }
                ]
            }
        },

        mounted () {
            this.getPrivateEvents()
        }

    }
</script>

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
