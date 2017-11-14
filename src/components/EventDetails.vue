<template>
    <div>
        <div>
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
        </div>
        <b-row>
            <b-col cols="4">
                <h2>{{$t('basic-info')}}</h2>
                <i class="fa fa-clock-o" aria-hidden="true"></i>
                {{ getFirstDate() | humanreadableDate }}
                {{$t('till')}}
                {{ getLastDate() | humanreadableDate }}
                <span class="text-muted">
                    ({{ getFirstDate() | fromNowDate }})
                </span>
                <div class="times">
                    <div>
                        <div>
                            {{$t('gather-time')}} {{event.gatherTime[0].HH}}:{{event.gatherTime[0].mm}}
                        </div>
                        {{$t('from')}} {{event.startTime[0].HH}}:{{event.startTime[0].mm}} {{$t('untill')}} {{event.endTime[0].HH}}:{{event.endTime[0].mm}}
                    </div>
                </div>
                <address>
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    {{event.street}} {{event.houseNumber}}, {{event.postcode}}, {{event.city}}
                    <div class="map">
                        <a target="_blank" class="card" v-bind:href="getGoogleMapsDirectionsUrl()">
                            <img class="img-fluid card-img-top" v-bind:src="getGoogleMapsStaticImageUrl()" alt="">
                            <div class="card-body">
                                <a v-bind:href="getGoogleMapsDirectionsUrl()" target="_blank" class="btn btn-primary">
                                    {{$t('open-in-google-maps')}}
                                    <i class="fa fa-external-link" aria-hidden="true"></i>
                                </a>
                            </div>
                        </a>
                    </div>
                </address>
            </b-col>
            <b-col>
                <div>
                    <h2>{{$t('details')}}</h2>
                    <div>
                        <p>
                            {{event.description}}
                        </p>
                    </div>
                    <ul class="fa-ul">
                        <li>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check': event.publiclyAccessible, 'fa-times': !event.publiclyAccessible }"></i>
                            {{$t('publicly-accessible')}}
                        </li>
                        <li>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check': event.guestsAllowed, 'fa-times': !event.guestsAllowed }"></i>
                            {{$t('guests-allowed')}}
                        </li>
                        <li>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check': event.dressingroomAvailable, 'fa-times': !event.dressingroomAvailable }"></i>
                            {{$t('dressingroom-available')}}
                        </li>
                        <li>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check': event.travelRestitution, 'fa-times': !event.travelRestitution }"></i>
                            {{$t('travel-restitution')}}
                        </li>
                        <li>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check': event.parking, 'fa-times': !event.parking }"></i>
                            {{$t('parking-available')}}
                        </li>
                        <li>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check': event.lunch, 'fa-times': !event.lunch }"></i>
                            {{$t('lunch-available')}}
                        </li>
                        <li>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check': event.drinks, 'fa-times': !event.drinks }"></i>
                            {{$t('drinks-available')}}
                        </li>
                        <li>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check': event.canRegisterGuests, 'fa-times': !event.canRegisterGuests }"></i>
                            {{$t('guests-allowed')}}
                        </li>
                    </ul>
                    <a v-bind:href="event.websiteUrl" target="_blank" class="card-link">{{$t('website')}}: {{event.websiteUrl}}</a> <i class="fa fa-external-link" aria-hidden="true"></i>
                </div>
            </b-col>
            <b-col cols="5">
                <div class="mb-3" v-for="(eventDate, index) in event.eventDates">
                    <h2>
                        {{$t('signups-for')}} {{eventDate.date | humanreadableDate}}
                        <small class="col text-muted" v-if="signupPossible(eventDate)">
                            {{getSpotsLeft(eventDate)}} {{$t('spots-left')}}
                        </small>
                    </h2>

                    <div v-if="!hasSignedUpUsers(eventDate) && signupPossible(eventDate)" class="alert alert-secondary" role="alert">
                        {{$t('no-users-signed-up-want-to-be-the-first')}}
                    </div>
                    <div class="progress" v-if="hasSignedUpUsers(eventDate)">
                        <div
                            class="progress-bar progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            v-bind:style="{ width: getProgressBarWidth(eventDate) + '%'}"
                        >{{getProgressBarWidth(eventDate)}}%</div>
                    </div>

                    <vue-good-table
                        v-if="eventDate.signedUpUsers.length > 0"
                        v-bind:columns="columns"
                        v-bind:rows="eventDate.signedUpUsers"
                        sortable="true"
                        styleClass="table table-bordered condensed"
                    >
                        <template slot="table-row-after" scope="props">
                            <td width="50px">
                                <button class="btn btn-secondary btn-block btn-sm" v-on:click="signOut(props)">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                    {{$t('sign-out')}}
                                </button>
                            </td>
                        </template>
                    </vue-good-table>

                    <b-alert show variant="warning" v-if="!signupPossible(eventDate)">
                        {{$t('sign-up-not-possible')}}
                    </b-alert>
                    <div class="row" v-if="signupPossible(eventDate)">
                        <div class="col mt-3">
                            <b-button v-b-modal="'choose-costume-' + index" size="lg" variant="primary">
                                {{$t('sign-up')}}
                            </b-button>

                            <b-modal v-bind:id="'choose-costume-' + index" title="Sign up for event" v-on:k="signupForEvent(index)">
                                <p>Are you sure you want to sign up for this event? Be sure to check your agenda before you sign up.</p>
                                <b-row class="form-row">
                                    <b-col sm="5">{{$t('date')}}:</b-col>
                                    <b-col sm="7">
                                        <p>
                                            {{eventDate.date | humanreadableDate}}
                                        </p>
                                    </b-col>
                                </b-row>
                                <b-row class="form-row">
                                    <b-col sm="5"><label for="select-costume">{{$t('choose-your-costume')}}:</label></b-col>
                                    <b-col sm="7">
                                        <form action="#" v-on:submit.stop.prevent="handleSubmit">
                                            <b-form-select id="select-costume" v-bind:name="'selected-costume-' + index"  v-validate="'required'" v-model="selectedCostume" :options="profileCostumes" class="mb-3">
                                                <template slot="first">
                                                    <option :value="null" disabled>Please select a costume</option>
                                                </template>
                                            </b-form-select>
                                            <p class="text-danger" v-if="errors.has('selected-costume-' + index)">{{ errors.first('eventdate-availablespots-' + index) }}</p>
                                        </form>
                                    </b-col>
                                </b-row>
                                <div slot="modal-footer" class="w-100">
                                    <b-btn size="sm" class="float-right" variant="primary" v-on:click="signupForEvent(index)">
                                        Sign Up
                                    </b-btn>
                                </div>
                            </b-modal>
                        </div>
                    </div>
                    <hr>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import Axios from 'axios'
    import moment from 'moment'
    import { isLoggedIn } from '../utils/auth'
    import { getPrivateEvents } from '../utils/events-api'

    moment.locale('nl')

    export default {
        name: 'event-details',
        filters: {
            shortMonthDate: function (date) {
                return moment(date).format('MMM')
            },
            shortDayNumber: function (date) {
                return moment(date).format('d')
            },
            humanreadableDate: function (date) {
                return moment(date).format('MMMM Do YYYY')
            },
            fromNowDate: function (date) {
                return moment(date, 'YYYYMMDD').fromNow()
            }
        },
        props: ['id'],
        computed: {
            profile () {
                return this.$store.state.profile
            },
            profileCostumes () {
                let costumeOptions = []
                if (this.$store.state.profile['https://iris.501st.nl/user_metadata'] !== undefined) {
                    for (let costume of this.$store.state.profile['https://iris.501st.nl/user_metadata'].costumes) {
                        costumeOptions.push({
                            text: costume.name,
                            value: costume.name
                        })
                    }
                }
                return costumeOptions
            }
        },
        methods: {

            signOut: function (props) {
//                console.log(props)
            },
            formatDateForRow (rowObject) {
                return moment(rowObject.signUpDate).format('D-M-YYYY h:mm')
            },
            signupPossible: function (eventDate) {
                const eventDateMoment = moment(eventDate.date)
                const isInPast = moment().diff(eventDateMoment, 'day') > 7

                console.log(eventDate.availableSpots)

                if (eventDate.availableSpots <= eventDate.signedUpUsers.length) {
                    return false
                }

                if (isInPast) {
                    return false
                }
                return true
            },
            getProgressBarWidth: function (eventDate) {
                if (eventDate.signedUpUsers) {
                    return Math.round((eventDate.signedUpUsers.length / eventDate.availableSpots) * 100)
                }
            },
            getSpotsLeft: function (eventDate) {
                if (eventDate.signedUpUsers) {
                    return (eventDate.availableSpots - eventDate.signedUpUsers.length)
                }
            },
            hasSignedUpUsers: function (eventDate) {
                if (eventDate && eventDate.signedUpUsers) {
                    if (eventDate.signedUpUsers.length > 0) {
                        return true
                    }
                }
                return false
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
                const id = this.$route.params.id
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
                console.log(this.$store.state.profile['https://iris.501st.nl/user_metadata'].username)

                const signUpData = {
                    id: this.$data.event._id,
                    eventDatesIndex: index,
                    costume: this.$data.selectedCostume,
                    username: this.$store.state.profile['https://iris.501st.nl/user_metadata'].username
                }

                this.$validator.validateAll().then((result) => {
                    if (result) {
                        Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
                        Axios.put(`${process.env.API_URL}/api/private/event/signup`, signUpData)
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
                        return
                    }
                    alert('Please choose your costume.')
                })
            }
        },
        data () {
            return {
                selectedCostume: null,
                event: {
                    name: '',
                    description: '',
                    eventDates: [
                        {
                            date: '',
                            availableSpots: 0,
                            open: 0,
                            signedUpUsers: []
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
                },
                columns: [
                    {
                        label: this.$t('name'),
                        field: 'username',
                        tdClass: 'text-left'
                    },
                    {
                        label: this.$t('signup-date'),
                        field: this.formatDateForRow,
                        tdClass: 'text-right'
                    },
                    {
                        label: this.$t('costume'),
                        field: 'costume',
                        tdClass: 'text-right'
                    },
                    {
                        label: '',
                        tdClass: 'text-right'
                    }
                ],
                rows: []
            }
        },
        mounted () {
            this.getPrivateEvents()
        }
    }
</script>
<style scoped>
    .alert {
        margin-top: 1rem;
    }
</style>
