<template>
    <div>
        <template>
            <pre>
                {{ event }}
            </pre>

                <ul>
                    <li v-for="(eventDate, index) in event.eventDates">
                        Sign up for {{eventDate}} {{index}}
                        <b-button v-on:click="signupForEvent(index)" size="lg" variant="primary">
                            Sign up for event
                        </b-button>
                    </li>
                </ul>
        </template>
    </div>
</template>

<script>
    import Axios from 'axios'
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
        props: ['id'],
        methods: {
            moment: function () {
                return moment()
            },
            isLoggedIn () {
                return isLoggedIn()
            },
            getPrivateEvents () {
                var id = this.id
                getPrivateEvents().then((events) => {
                    var vueComponent = this

                    events.filter(function (event) {
                        if (event._id === id) {
                            vueComponent.event = event
                        }
                    })
                })
            },
            signupForEvent (index) {
                const signUpData = {
                    id: this.$data.event._id,
                    eventDatesIndex: index
                }

                console.log(this.$data)

                Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
                Axios.put('http://localhost:3333/api/private/event/signup', signUpData)
                    .then(function (response) {
                        if (response.data.message) {
                            alert(response.data.message)
                        } else {
                            this.$router.push('events')
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
        },
        data () {
            return {
                event: {
                    name: 'Loading events',
                    eventDates: [
                        {
                            date: '2017-10-03T19:24:00.000Z',
                            availableSpots: 25,
                            open: 1
                        }
                    ]
                }
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
