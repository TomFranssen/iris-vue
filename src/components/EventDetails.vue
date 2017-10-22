<template>
    <div>
        <template>
            <div class="date-square float-left">
                <div class="month">
                    {{ getFirstDate() | shortMonthDate }}
                </div>
                <div class="day">
                    {{ getLastDate() | shortDayNumber }}
                </div>
            </div>
            <h1>
                {{event.name}}
                <div>
                    <small class="text-muted" v-for="allegiance in event.allegiances">
                        {{allegiance}}
                    </small>
                </div>
            </h1>
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            {{ getFirstDate() | humanreadableDate }}
            till
            {{ getLastDate() | humanreadableDate }}
            <span class="text-muted">
                ({{ getFirstDate() | fromNowDate }})
            </span>
            <div class="times">
                <div>
                    Gather time: {{event.gatherTime[0].HH}}:{{event.gatherTime[0].mm}}
                </div>
                <div>
                    Start time: {{event.startTime[0].HH}}:{{event.startTime[0].mm}}
                </div>
                <div>
                    End time: {{event.endTime[0].HH}}:{{event.endTime[0].mm}}
                </div>
            </div>
            <address>
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                {{event.street}} {{event.houseNumber}}, {{event.postcode}}, {{event.city}}
                <a class="btn-toggle-map" v-on:click.prevent="toggleMap()" href="#">
                    <span v-if="isMapVisible">
                        hide map
                    </span>
                    <span v-if="!isMapVisible">
                        show map
                    </span>
                </a>
                <div class="map" v-if="isMapVisible">
                    <a target="_blank" class="card" v-bind:href="getGoogleMapsDirectionsUrl()">
                        <img class="img-fluid card-img-top" v-bind:src="getGoogleMapsStaticImageUrl()" alt="">
                        <div class="card-body">
                            <a href="#" class="btn btn-primary">Open in Google Maps <i class="fa fa-external-link" aria-hidden="true"></i></a>
                        </div>
                    </a>
                </div>
            </address>

            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">Details</h2>
                    <div class="card-text">
                        <p>
                            {{event.description}}
                        </p>
                    </div>
                    <ul class="fa-ul">
                        <li>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check-circle': event.publiclyAccessible, 'fa-times-circle': !event.publiclyAccessible }"></i>
                            Publicly accessible
                        </li>
                        <li>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check-circle': event.guestsAllowed, 'fa-times-circle': !event.guestsAllowed }"></i>
                            Guests allowed
                        </li>
                        <li>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check-circle': event.dressingroomAvailable, 'fa-times-circle': !event.dressingroomAvailable }"></i>
                            Dressingroom available
                        </li>
                        <li>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check-circle': event.travelRestitution, 'fa-times-circle': !event.travelRestitution }"></i>
                            Travel restitution
                        </li>
                        <li>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check-circle': event.parking, 'fa-times-circle': !event.parking }"></i>
                            Parking
                        </li>
                        <li>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check-circle': event.lunch, 'fa-times-circle': !event.lunch }"></i>
                            Lunch
                        </li>
                        <li>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check-circle': event.drinks, 'fa-times-circle': !event.drinks }"></i>
                            Drinks
                        </li>
                        <li>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check-circle': event.canRegisterGuests, 'fa-times-circle': !event.canRegisterGuests }"></i>
                            Guests allowed
                        </li>
                    </ul>
                    <a v-bind:href="event.websiteUrl" class="card-link">Website: {{event.websiteUrl}}</a>
                </div>
            </div>



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
            shortMonthDate: function (date) {
                return moment(date).format('MMM')
            },
            shortDayNumber: function (date) {
                return moment(date).format('d')
            },
            humanreadableDate: function (date) {
                return moment(date).format('MMMM Do')
            },
            fromNowDate: function (date) {
                return moment(date, 'YYYYMMDD').fromNow()
            }
        },
        props: ['id'],
        methods: {
            toggleMap: function () {
                this.isMapVisible = !this.isMapVisible
            },
            getGoogleMapsDirectionsUrl () {
                const event = this.$data.event
                return `https://www.google.com/maps/search/?api=1&query=${event.street}+${event.houseNumber}+${event.postcode}+${event.city}`
            },
            getGoogleMapsStaticImageUrl () {
                const event = this.$data.event
                return `https://maps.googleapis.com/maps/api/staticmap?center=${event.street}+${event.houseNumber}+${event.postcode}+${event.city}&zoom=13&size=600x200&maptype=roadmap&markers=${event.street}+${event.houseNumber}+${event.postcode}+${event.city}&key=AIzaSyAYazeF-nhbaP3tkZTqsoipY7JOfXb7qAM`
            },
            getFirstDate: function () {
                return this.$data.event.eventDates[0].date
            },
            getLastDate: function () {
                const eventDates = this.$data.event.eventDates
                return eventDates[eventDates.length - 1].date
            },
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
                isMapVisible: false,
                event: {
                    name: '',
                    description: '',
                    eventDates: [
                        {
                            date: '2017-10-03T19:24:00.000Z',
                            availableSpots: 25,
                            open: 1
                        }
                    ],
                    gatherTime: [
                        {
                            HH: '',
                            mm: ''
                        }
                    ],
                    startTime: [
                        {
                            HH: '',
                            mm: ''
                        }
                    ],
                    endTime: [
                        {
                            HH: '',
                            mm: ''
                        }
                    ],
                    forumUrl: '',
                    facebookEvent: '',
                    websiteUrl: '',
                    publiclyAccessible: true,
                    guestsAllowed: true,
                    dressingroomAvailable: true,
                    travelRestitution: true,
                    parking: true,
                    lunch: true,
                    drinks: true,
                    canRegisterGuests: true
                }
            }
        },

        mounted () {
            this.getPrivateEvents()
        }

    }
</script>

