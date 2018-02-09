<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
        <div class="clearfix mb-4">
            <div class="date-square float-left">
                <div class="month" v-if="getFirstDate()">
                    {{ getFirstDate() | moment('MMM') }}
                </div>
                <div class="day" v-if="getLastDate()">
                    {{ getLastDate() | moment('D') }}
                </div>
            </div>
            <router-link class="btn btn-primary float-right" v-bind:to="'/event/' + event._id + '/edit'">
                {{$t('edit-event')}}
            </router-link>
            <h1>
                {{event.name}}
                <div>
                    <small class="text-muted" v-for="allegiance in event.allegiances">
                        {{allegiance}}
                    </small>
                </div>
            </h1>
        </div>
        <b-row class="mb-3">
            <b-col md="5">
                <h2>{{$t('basic-info')}}</h2>

                <i class="fa fa-calendar" aria-hidden="true"></i>
                <span v-if="getFirstDate()">
                    {{ getFirstDate() | moment('DD MMMM YYYY') }}
                </span>
                <span v-if="event.eventDates.length > 1">
                    {{$t('till')}}
                    {{ getLastDate() | moment('DD MMMM YYYY') }}
                </span>
                <div class="text-muted" v-if="event.maxSignupDate">
                    {{$t('signup-until')}}
                    {{event.maxSignupDate | moment('DD MMMM')}}
                </div>
                <div class="times">
                    <div>
                        <i class="fa fa-clock-o" aria-hidden="true"></i>
                        {{$t('from')}} {{event.startTime[0].HH}}:{{event.startTime[0].mm}}
                        {{$t('untill')}}
                        {{event.endTime[0].HH}}:{{event.endTime[0].mm}}
                        <div class="text-muted text-lowercase">
                            {{event.gatherTime[0].HH}}:{{event.gatherTime[0].mm}} {{$t('gather-time')}}
                        </div>
                    </div>
                </div>
                <address>
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    {{event.street}} {{event.houseNumber}}, {{event.postcode}}, {{event.city}}
                    <div class="map">
                        <div class="card">
                            <a target="_blank" v-bind:href="getGoogleMapsDirectionsUrl()">
                                <img class="img-fluid card-img-top" v-bind:src="getGoogleMapsStaticImageUrl()" alt="">
                            </a>
                            <div class="card-body">
                                <a v-bind:href="getGoogleMapsDirectionsUrl()" target="_blank" class="btn btn-primary btn-block">
                                    {{$t('open-in-google-maps')}}
                                    <i class="fa fa-external-link" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </address>
            </b-col>
            <b-col md="3">
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
                            <i class="fa-li fa" v-bind:class="{ 'fa-check': event.parkingRestitution, 'fa-times': !event.parkingRestitution }"></i>
                            {{$t('parking-restitution')}}
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
                </div>
            </b-col>
            <b-col md="4">
                <h2>{{$t('more-info')}}</h2>
                <div>
                    {{$t('website')}}:
                    <a v-bind:href="event.websiteUrl" target="_blank" class="card-link">
                        {{event.websiteUrl}}
                    </a>
                    <i class="fa fa-external-link" aria-hidden="true"></i>
                </div>
                <div>
                    {{$t('forum-url')}}:
                    <a v-bind:href="event.forumUrl" target="_blank" class="card-link">
                        {{event.forumUrl}}
                    </a>
                    <i class="fa fa-external-link" aria-hidden="true"></i>
                </div>
                <div>
                    {{$t('facebook')}}:
                    <a v-bind:href="event.facebookEvent" target="_blank" class="card-link">
                        {{event.facebookEvent}}
                    </a>
                    <i class="fa fa-external-link" aria-hidden="true"></i>
                </div>
            </b-col>
        </b-row>

        <div class="mb-3" v-for="(eventDate, index) in event.eventDates">
            <b-row>
                <b-col md="12">
                    <h2>
                        <div class="text-capitalize">
                            {{eventDate.date | humanreadableDate}}
                        </div>
                        <small class="text-muted" v-if="signupPossible(eventDate)">
                            {{getSpotsLeft(eventDate)}} {{$t('spots-left')}}
                        </small>
                    </h2>

                    <div v-if="isSignedUp(eventDate)">
                        <add-to-calendar
                            v-bind:title="event.name"
                            v-bind:location="event.street + ' ' + event.houseNumber + ' ' + event.postcode + ' ' + event.city"
                            v-bind:start="getEventStartTimeForCalendar(eventDate.date)"
                            v-bind:end="getEventEndTimeForCalendar(eventDate.date)"
                            v-bind:details="event.description"
                            inline-template
                        >
                            <div>
                                <div>
                                    <google-calendar id="google-calendar">
                                        <i class="fa fa-google"></i>
                                        {{$t('add-to-google-calendar')}}
                                    </google-calendar>
                                </div>
                                <div>
                                    <microsoft-calendar id="microsoft-calendar">
                                        <i class="fa fa-windows"></i>
                                        {{$t('add-to-microsoft-calendar')}}
                                    </microsoft-calendar>
                                </div>
                            </div>
                        </add-to-calendar>
                    </div>

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
                        styleClass="table table-bordered condensed table-signed-up-users"
                    >
                        <template slot="table-row-before" scope="props">
                            <td class="text-center avatar">
                                <img v-bind:src="props.row.avatar" v-if="props.row.avatar" alt="">
                            </td>
                        </template>
                        <template slot="table-row-after" scope="props">
                            <td width="50px">
                                <b-btn v-if="props.row.userId === profile.sub" v-b-modal="'sign-out-modal-' + index">{{$t('sign-out')}}</b-btn>
                                <b-modal v-bind:ref="'sign-out-modal' + index" v-bind:id="'sign-out-modal-' + index"  v-bind:title="$t('sign-out')">
                                    <p>{{$t('sign-out-agreement')}}</p>
                                    <div slot="modal-footer" class="w-100">
                                        <b-btn size="sm" class="float-right" variant="primary" v-on:click="signOut(props, index)">
                                            {{$t('sign-out')}}
                                        </b-btn>
                                    </div>
                                </b-modal>
                            </td>
                        </template>
                    </vue-good-table>
                    <div class="mt-2" v-if="eventDate.cancelledUsers.length > 0">
                        {{$t('sign-outs')}}:
                        <span class="add-comma-after" v-for="(cancelledUser, index) in eventDate.cancelledUsers">
                            <span v-if="cancelledUser.username">
                                {{cancelledUser.username}}
                            </span>
                        </span>
                    </div>

                    <div class="mt-2" v-if="eventDate.guests && eventDate.guests.length > 0">
                        {{$t('guests')}}:
                        <span class="add-comma-after" v-for="(guest, index) in eventDate.guests">{{guest}}</span>
                    </div>

                    <div v-if="!isSignedUp(eventDate)">
                        <b-alert show variant="warning" v-if="!signupPossible(eventDate)">
                            {{$t('sign-up-not-possible')}}
                        </b-alert>
                        <div class="row" v-if="signupPossible(eventDate)">
                            <div class="col mt-3">
                                <b-button v-b-modal="'choose-costume-' + index" size="lg" variant="primary">
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                    {{$t('sign-up')}}
                                </b-button>

                                <b-modal v-bind:ref="'modal' + index" v-bind:id="'choose-costume-' + index" v-bind:title="$t('sign-up')" v-on:k="signUp(index)">
                                    <b-row class="form-row">
                                        <b-col sm="5">{{$t('date')}}:</b-col>
                                        <b-col sm="7">
                                            <p>
                                                {{eventDate.date | humanreadableDate}}
                                            </p>
                                        </b-col>
                                    </b-row>
                                    <b-row class="form-row">
                                        <b-col sm="5">
                                            <label v-bind:for="'selected-costume-' + index" >
                                                {{$t('choose-your-costume')}}:
                                            </label>
                                        </b-col>
                                        <b-col sm="7">
                                            <form action="#" v-on:submit.stop.prevent="handleSubmit">
                                                <b-form-select
                                                    v-bind:id="'selected-costume-' + index"
                                                    v-bind:name="'selected-costume-' + index"
                                                    v-validate="'required'"
                                                    v-model="selectedCostume"
                                                    :options="profileCostumes"
                                                    class="mb-3"
                                                >
                                                    <template slot="first">
                                                        <option :value="null" disabled>{{$t('choose-your-costume')}}</option>
                                                    </template>
                                                </b-form-select>
                                                <p class="text-danger" v-if="errors.has('selected-costume-' + index)">
                                                    {{ errors.first('selected-costume-' + index) }}
                                                </p>
                                            </form>
                                        </b-col>
                                    </b-row>
                                    <div>
                                        {{$t('sign-up-agreement')}}
                                    </div>
                                    <div slot="modal-footer" class="w-100">
                                        <b-btn size="sm" class="float-right" variant="primary" v-on:click="signUp(index)">
                                            {{$t('sign-up')}}
                                        </b-btn>
                                    </div>
                                </b-modal>
                            </div>
                        </div>
                    </div>
                    <hr>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    import moment from 'moment'
    import { isLoggedIn } from '../utils/auth'
    import { getPrivateEvents } from '../utils/events-api'
    import EventForm from './EventForm.vue'

    moment.locale('nl')

    export default {
        name: 'event-details',
        components: {
            EventForm
        },
        filters: {
            humanreadableDate: function (date) {
                return moment(date).format('dddd D MMMM YYYY')
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
            getEventStartTimeForCalendar (date) {
                if (date) {
                    const dateForCalendar = moment(date).set(
                        {
                            hour: parseInt(this.$data.event.gatherTime[0].HH),
                            minute: parseInt(this.$data.event.gatherTime[0].mm)
                        }
                    )
                    return dateForCalendar.toDate()
                }
            },
            getEventEndTimeForCalendar (date) {
                if (date) {
                    var eventDate = new Date(date)
                    eventDate.setHours(this.$data.event.endTime[0].HH + 1)
                    eventDate.setMinutes(this.$data.event.endTime[0].mm)

                    return eventDate
                }
            },
            formatDateForRow (rowObject) {
                return moment(rowObject.signUpDate).format('D-M-YYYY h:mm')
            },
            isSignedUp: function (eventDate) {
                for (let user of eventDate.signedUpUsers) {
                    if (user.userId === this.$store.state.profile.sub) {
                        return true
                    }
                }
                return false
            },
            signupPossible: function (eventDate) {
                const eventDateMoment = moment(eventDate.date)
                const isInPast = moment().diff(eventDateMoment, 'day') > 7

                for (let user of eventDate.cancelledUsers) {
                    if (user.userId === this.$store.state.profile.sub) {
                        return false
                    }
                }

                if (!eventDate.open) {
                    return false
                }

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
            showModal () {
                this.$refs.myModalRef.show()
            },
            hideModal (index) {
                this.$refs[`modal${index}`][0].hide()
            },
            hideSignOutModal (index) {
                this.$refs[`sign-out-modal${index}`][0].hide()
            },
            signUp (index) {
                const that = this
                const signUpData = {
                    eventId: this.$data.event._id,
                    eventDatesIndex: index,
                    costume: this.$data.selectedCostume,
                    username: this.$store.state.profile['https://iris.501st.nl/user_metadata'].username,
                    avatar: this.$store.state.profile['https://iris.501st.nl/legion_thumbnail'],
                    userId: this.$store.state.profile.sub
                }

                this.$validator.validateAll().then((result) => {
                    if (result) {
                        Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
                        Axios.put(`${process.env.API_URL}/api/private/event/signup`, signUpData)
                            .then(function (response) {
                                if (response.data.success) {
                                    that.hideModal(index)
                                    that.showSuccessSignup({
                                        message: that.$t('sign-up-success')
                                    })
                                    that.getPrivateEvents()
                                } else {
                                    that.$router.push('events')
                                }
                            })
                            .catch(function (error) {
                                console.log(error)
                            })
                        return
                    }
                })
            },
            signOut: function (props, eventDataIndex) {
                const that = this
                const signOutData = {
                    eventId: this.$data.event._id,
                    eventDateIndex: eventDataIndex,
                    userId: props.row.userId,
                    indexToMoveToCancelled: props.index
                }
                Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
                Axios.post(`${process.env.API_URL}/api/private/event/signout`, signOutData)
                    .then(function () {
                        that.hideSignOutModal(eventDataIndex)
                        that.getPrivateEvents()
                    })
            }
        },
        data () {
            return {
                breadcrumbs: [{
                    text: 'Home',
                    to: '/'
                }, {
                    text: this.$t('events'),
                    to: '/events'
                }, {
                    text: this.$t('details'),
                    active: true
                }],
                selectedCostume: null,
                event: {
                    name: '',
                    description: '',
                    eventDates: [
                        {
                            date: '',
                            availableSpots: 0,
                            open: true,
                            signedUpUsers: [],
                            cancelledUsers: []
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
                    dressingroomAvailable: true,
                    travelRestitution: true,
                    parking: true,
                    lunch: true,
                    drinks: true,
                    canRegisterGuests: true
                },
                columns: [
                    {
                        label: ''
                    },
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
        notifications: {
            showSuccessSignup: {
                type: 'success',
                title: 'Signed up',
                message: 'Success!'
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
