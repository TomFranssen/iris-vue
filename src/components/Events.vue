<template>
    <div>
        <template>
            <h1>All events</h1>

            <input type="checkbox" id="dutch-garrison" value="Dutch Garrison" v-model="filteredAllegiances">
            <label for="dutch-garrison">Dutch Garrison</label>

            <input type="checkbox" id="dune-sea-base" value="Dune Sea Base" v-model="filteredAllegiances">
            <label for="dune-sea-base">Dune Sea Base</label>



            {{filteredAllegiances}}

            <ul id="example-1">
                <li v-for="event in filteredEvents">
                    <div class="row">
                        <div class="col">
                            {{ event.name }}
                        </div>
                        <div>
                            {{ event.allegiances }}
                        </div>
                        <div class="col">
                            {{ event.eventDates[0].date | moment }}
                        </div>
                        <div class="col">
                            <router-link class="btn btn-primary" :to="'event/' + event._id">
                                View Details
                            </router-link>
                        </div>
                    </div>
                </li>
            </ul>
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
        computed: {
            filteredEvents: function () {
                const that = this
                let returnEvents = []

                function containsAny (source, target) {
                    var result = source.filter(function (item) { return target.indexOf(item) > -1 })
                    return (result.length > 0)
                }

                console.log(this.filteredAllegiances.length)
                if (this.filteredAllegiances.length === 0) {
                    return that.events
                }
                for (var i = 0; i < that.events.length; i++) {
//                    console.log(that.events[i].allegiances)
//                    console.log(containsAny(this.filteredAllegiances, that.events[i].allegiances))

                    if (containsAny(this.filteredAllegiances, that.events[i].allegiances)) {
                        console.log(that.events[i])

                        returnEvents.push(that.events[i])
                    }
                }

                return returnEvents
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
                filteredAllegiances: [],
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
</style>
