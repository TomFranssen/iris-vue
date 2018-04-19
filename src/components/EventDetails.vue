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
            <div class="button-group float-right">
                <router-link v-if="$store.getters.isGec" class="float-right ml-3 btn btn-primary" v-bind:to="'/event/' + event._id + '/edit'">
                    <i class="fa fa-edit" aria-hidden="true"></i> {{$t('edit-event')}}
                </router-link>
                <b-btn v-if="$store.getters.isGec" class="float-right" variant="primary" v-on:click="emailEvent">
                    <i class="fa fa-envelope" aria-hidden="true"></i> {{$t('send-notification')}}
                </b-btn>
            </div>
            <h1>
                {{event.name}}
                <div>
                    <small class="text-muted" v-for="allegiance in event.allegiances" v-bind:key="allegiance">
                        {{allegiance}}
                    </small>
                </div>
            </h1>
        </div>
        <div>
            <p>{{event.description}}</p>
        </div>
        <b-row class="mb-3 mail-content">
            <b-col md="12" lg="5">
                <h2>{{$t('basic-info')}}</h2>
                <i class="fa fa-calendar" aria-hidden="true"></i>
                <span class="sr-only">
                    {{$t('date')}}
                </span>
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
                <div class="times mt-2" style="margin-bottom: 10px;">
                    <div>
                        <i class="fa fa-clock-o" aria-hidden="true"></i>
                        {{$t('from')}} {{event.startTime}}
                        {{$t('untill')}}
                        {{event.endTime}}
                        <div class="text-muted">
                            {{$t('gather-time')}} {{event.gatherTime}}
                        </div>
                    </div>
                </div>
                <address>
                    <div class="map">
                        <div class="card">
                            <a v-bind:href="getGoogleMapsDirectionsUrl()">
                                <img class="img-fluid card-img-top" v-bind:src="getGoogleMapsStaticImageUrl()" alt="">
                            </a>
                            <div class="card-body">
                                <div class="mb-2">
                                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                                    {{event.street}} {{event.houseNumber}}, {{event.postcode}}, {{event.city}}
                                </div>
                                <a v-bind:href="getGoogleMapsDirectionsUrl()" class="btn btn-primary btn-block">
                                    {{$t('open-in-google-maps')}}
                                    <i class="fa fa-external-link" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </address>
            </b-col>

            <b-col md="6" lg="3">
                <div>
                    <h2>{{$t('details')}}</h2>
                    <ul class="fa-ul" style="list-style: none; padding: 0;">
                        <li>
                            <span v-if="event.publiclyAccessible" class="fa-li fa fa-check"><span class="sr-only">✅</span></span>
                            <span v-else class="fa-li fa fa-times"><span class="sr-only">❌</span></span>
                            {{$t('publicly-accessible')}}
                        </li>
                        <li>
                            <span v-if="event.dressingroomAvailable" class="fa-li fa fa-check"><span class="sr-only">✅</span></span>
                            <span v-else class="fa-li fa fa-times"><span class="sr-only">❌</span></span>
                            {{$t('dressingroom-available')}}
                        </li>
                        <li>
                            <span v-if="event.travelRestitution" class="fa-li fa fa-check"><span class="sr-only">✅</span></span>
                            <span v-else class="fa-li fa fa-times"><span class="sr-only">❌</span></span>
                            {{$t('travel-restitution')}}
                        </li>
                        <li>
                            <span v-if="event.parking" class="fa-li fa fa-check"><span class="sr-only">✅</span></span>
                            <span v-else class="fa-li fa fa-times"><span class="sr-only">❌</span></span>
                            {{$t('parking-available')}}
                        </li>
                        <li>
                            <span v-if="event.parkingRestitution" class="fa-li fa fa-check"><span class="sr-only">✅</span></span>
                            <span v-else class="fa-li fa fa-times"><span class="sr-only">❌</span></span>
                            {{$t('parking-restitution')}}
                        </li>
                        <li>
                            <span v-if="event.food" class="fa-li fa fa-check"><span class="sr-only">✅</span></span>
                            <span v-else class="fa-li fa fa-times"><span class="sr-only">❌</span></span>
                            {{$t('food-available')}}
                        </li>
                        <li>
                            <span v-if="event.drinks" class="fa-li fa fa-check"><span class="sr-only">✅</span></span>
                            <span v-else class="fa-li fa fa-times"><span class="sr-only">❌</span></span>
                            <i class="fa-li fa" v-bind:class="{ 'fa-check': event.drinks, 'fa-times': !event.drinks }"></i>
                            {{$t('drinks-available')}}
                        </li>
                    </ul>
                    <h2>{{$t('rules')}}</h2>
                    <ul class="fa-ul" style="list-style: none; padding: 0;">
                        <li>
                            <span v-if="event.canRegisterGuests" class="fa-li fa fa-check"><span class="sr-only">✅</span></span>
                            <span v-else class="fa-li fa fa-times"><span class="sr-only">❌</span></span>
                            {{$t('guests-allowed')}}
                        </li>
                        <li>
                            <span v-if="event.blastersAllowed" class="fa-li fa fa-check"><span class="sr-only">✅</span></span>
                            <span v-else class="fa-li fa fa-times"><span class="sr-only">❌</span></span>
                            {{$t('blasters-allowed')}}
                        </li>
                    </ul>
                </div>
            </b-col>
            <b-col md="6" lg="4">
                <h2>{{$t('more-info')}}</h2>
                <div v-if="event.websiteUrl">
                    <a v-bind:href="event.websiteUrl" class="card-link">
                        {{event.websiteUrl}}
                    </a>
                    <i class="fa fa-external-link" aria-hidden="true"></i>
                </div>
                <div v-if="event.forumUrl">
                    <a v-bind:href="event.forumUrl" class="card-link">
                        {{$t('view-event-on-forum')}}
                    </a>
                    <i class="fa fa-external-link" aria-hidden="true"></i>
                </div>
                <div v-if="event.facebookEvent">
                    <a v-bind:href="event.facebookEvent" class="card-link">
                        {{$t('view-event-on-facebook')}}
                    </a>
                    <i class="fa fa-external-link" aria-hidden="true"></i>
                </div>
                <div v-if="event._id && $store.getters.isGec">
                    <h2 class="mt-3">{{$t('embed-in-forum')}}</h2>
                    <b-input-group>
                        <b-form-input readonly v-model="'[iris=' + event._id + '][/iris]'"></b-form-input>
                        <b-input-group-append>
                            <b-btn
                                v-clipboard:copy="'[iris=' + event._id + '][/iris]'"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onCopyError"
                            >{{$t('copy')}}</b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </div>

            </b-col>
        </b-row>
        <div class="jumbotron mb-3" v-for="(eventDate, index) in event.eventDates" v-bind:key="index">
            <b-row>
                <b-col md="12">
                    <div class="clearfix">
                        <h2 class="float-sm-leftt">
                            <div class="text-capitalize jumbotron-heading">
                                {{eventDate.date | humanreadableDate}}
                            </div>
                            <small class="text-muted" v-if="signupPossible(eventDate)">
                                {{getSpotsLeft(eventDate)}} {{$t('spots-left')}}
                            </small>
                        </h2>
                        <div v-if="isSignedUp(eventDate)">
                            <div class="signed-up-text">
                                <i class="fa fa-check" aria-hidden="true"></i>
                                {{$t('you-are-singed-up')}}
                            </div>
                            <add-to-calendar
                                v-bind:name="event.name"
                                v-bind:description="event.description"
                                v-bind:start-date="getEventStartTimeForCalendar(eventDate)"
                                v-bind:end-date="getEventEndTimeForCalendar(eventDate)"
                                v-bind:location="event.street + ' ' + event.houseNumber + ', ' + event.postcode + ', ' + event.city"
                            ></add-to-calendar>
                        </div>
                    </div>
                    <p v-if="!hasSignedUpUsers(eventDate) && signupPossible(eventDate)">
                        {{$t('no-users-signed-up-want-to-be-the-first')}}
                    </p>
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
                        styleClass="vgt-table condensed text-nowrap table-signed-up-users"
                    >
                        <template slot="table-row" slot-scope="props">
                            <div v-if="props.column.field === 'avatar'">
                                <img v-bind:src="props.row.avatar" width="50" />
                            </div>
                            <div v-if="props.column.field === 'username'">
                                {{props.row.username}}
                            </div>
                            <div v-if="props.column.field === 'date'">
                                {{props.row.signUpDate | moment("dddd D-M-YYYY hh:mm")}}
                            </div>
                            <div v-if="props.column.field === 'costume'">
                                {{props.row.costume}}
                            </div>
                            <div v-if="props.column.field === 'sign-out'">
                                <b-btn class="float-right" v-if="props.row.userId === profile.sub" v-b-modal="'sign-out-modal-' + index + '-' + props.row.originalIndex">{{$t('sign-out')}}</b-btn>
                                <b-modal v-bind:ref="'sign-out-modal' + index + '-' + props.row.originalIndex" v-bind:id="'sign-out-modal-' + index + '-' + props.row.originalIndex"  v-bind:title="$t('sign-out')">
                                    <p>{{$t('sign-out-agreement')}}</p>
                                    <b-row class="form-row">
                                        <b-col sm="3"><label for="name">{{$t('signout-reason')}}:</label></b-col>
                                        <b-col sm="9">
                                            <b-form-textarea
                                                name="signout-reason"
                                                v-model="props.row.signoutReason"
                                                id="name"
                                                size="sm"
                                                :rows="4"
                                                :max-rows="4"
                                                maxlength="150"
                                                :placeholder="$t('signout-reason-placeholder')"
                                            >
                                            </b-form-textarea>
                                            <p class="text-danger" v-if="errors.has('signout-reason')">{{ errors.first('signout-reason') }}</p>
                                        </b-col>
                                    </b-row>

                                    <div slot="modal-footer" class="w-100">
                                        <b-btn size="sm" class="float-right" variant="primary" v-on:click="signOut(props, index, props.row.originalIndex)">
                                            {{$t('sign-out')}}
                                        </b-btn>
                                    </div>
                                </b-modal>
                            </div>
                        </template>
                    </vue-good-table>
                    <div class="mt-2" v-if="eventDate.cancelledUsers.length > 0">
                        {{$t('sign-outs')}}:
                        <span class="add-comma-after" v-for="cancelledUser in eventDate.cancelledUsers" v-bind:key="cancelledUser.username">
                            <span v-if="cancelledUser.username">{{cancelledUser.username}}</span>
                        </span>
                    </div>

                    <div v-if="!isSignedUp(eventDate)">
                        <b-alert show variant="warning" v-if="!signupPossible(eventDate)">
                            {{$t('sign-up-not-possible')}}:
                            {{eventDate.notPossibleReason}}
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
                                            <form action="#" v-if="profileCostumes">
                                                <b-form-select
                                                    v-bind:id="'selected-costume-' + index"
                                                    v-bind:name="'selected-costume-' + index"
                                                    v-validate="'required'"
                                                    v-model="selectedCostume"
                                                    v-bind:options="profileCostumes"
                                                    class="mb-3"
                                                >
                                                    <template slot="first">
                                                        <option :value="null" disabled>{{$t('choose-your-costume')}}</option>
                                                    </template>
                                                </b-form-select>
                                                <p class="text-danger" v-if="errors.has('selected-costume-' + index)">
                                                    {{ $t(errors.first('selected-costume-' + index)) }}
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
                    <div v-if="event.canRegisterGuests">
                        <div class="mt-2" v-if="eventDate.guests && eventDate.guests.length > 0">
                            {{$t('guests')}}:
                            <span class="add-comma-after" v-for="guest in eventDate.guests" v-bind:key="guest">{{guest}}</span>
                        </div>
                        <b-button v-b-modal="'add-guest-' + index" size="sm mt-2">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                            {{$t('add-guest')}}
                        </b-button>

                        <b-modal v-bind:ref="'modal-guest-' + index" v-bind:id="'add-guest-' + index" v-bind:title="$t('add-guest')">
                            <b-row class="form-row">
                                <b-col sm="5">
                                    <label v-bind:for="'add-guest-name' + index" >
                                        {{$t('name')}}:
                                    </label>
                                </b-col>
                                <b-col sm="7">
                                    <form action="#">
                                        <b-form-input
                                            name="'add-guest-name' + index"
                                            v-model.trim="eventDate.addGuestName"
                                            id="'add-guest-name' + index"
                                            size="sm"
                                            type="text"
                                        >
                                        </b-form-input>
                                    </form>
                                </b-col>
                            </b-row>
                            <div slot="modal-footer" class="w-100">
                                <b-btn size="sm" class="float-right" variant="primary" v-on:click="signUpGuest(index, eventDate.addGuestName)">
                                    {{$t('add-guest')}}
                                </b-btn>
                            </div>
                        </b-modal>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import Axios from 'axios'
import moment from 'moment'
import { isLoggedIn } from '../utils/auth'
import { getPrivateEvent } from '../utils/events-api'
import EventForm from './EventForm.vue'
import AddToCalendar from './AddToCalendar.vue'
Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

moment.locale('nl')

export default {
    name: 'event-details',
    components: {
        EventForm,
        AddToCalendar
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
            let costumeOptions = [
                {
                    text: 'Handler',
                    value: 'Handler'
                },
                {
                    text: 'Stand Duty',
                    value: 'Stand Duty'
                }
            ]
            if (this.$store.state.profile['https://iris.501st.nl/user_metadata'] !== undefined) {
                for (let costume of this.$store.state.profile['https://iris.501st.nl/user_metadata'].costumes) {
                    costumeOptions.unshift({
                        text: costume.name,
                        value: costume.name
                    })
                }
            }
            return costumeOptions
        }
    },
    methods: {
        onCopy: function (e) {
            alert(this.$t('copied-text') + e.text)
        },
        onCopyError: function (e) {
            alert(this.$t('copied-failed-text'))
        },
        getEventStartTimeForCalendar (date) {
            if (date && this.$data.event && this.$data.event.gatherTime) {
                const computedDate = (date.date.substring(0, 11) + this.$data.event.gatherTime + '00').replace(/-/g, '').replace(/:/g, '')
                return computedDate
            }
        },
        getEventEndTimeForCalendar (date) {
            if (date && this.$data.event && this.$data.event.endTime) {
                const computedDate = (date.date.substring(0, 11) + this.$data.event.endTime + '00').replace(/-/g, '').replace(/:/g, '')
                return computedDate
            }
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
                    eventDate.notPossibleReason = this.$t('reason-again')
                    return false
                }
            }

            if (!eventDate.open) {
                eventDate.notPossibleReason = this.$t('reason-not-open')
                return false
            }

            if (eventDate.availableSpots <= eventDate.signedUpUsers.length) {
                eventDate.notPossibleReason = this.$t('reason-no-spots-left')
                return false
            }

            if (isInPast) {
                eventDate.notPossibleReason = this.$t('reason-in-the-past')
                return false
            }

            return true
        },
        getProgressBarWidth: function (eventDate) {
            if (eventDate.signedUpUsers) {
                return Math.round(((eventDate.signedUpUsers.length + eventDate.guests.length) / eventDate.availableSpots) * 100)
            }
        },
        getSpotsLeft: function (eventDate) {
            if (eventDate.signedUpUsers) {
                return (eventDate.availableSpots - eventDate.signedUpUsers.length - eventDate.guests.length)
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
        getPrivateEvent () {
            getPrivateEvent(this.$route.params.id).then((event) => {
                this.event = event
            })
        },
        showModal () {
            this.$refs.myModalRef.show()
        },
        hideSignUpModal (index) {
            this.$refs[`modal${index}`][0].hide()
        },
        hideSignUpModalGuest (index) {
            this.$refs[`modal-guest-${index}`][0].hide()
        },
        hideSignOutModal (index, modalIndex) {
            if (this.$refs[`sign-out-modal${index}-${modalIndex}`][0]) {
                this.$refs[`sign-out-modal${index}-${modalIndex}`][0].hide()
            }
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
            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

            this.$validator.validateAll().then((result) => {
                if (result) {
                    Axios.put(`${process.env.VUE_APP_API_URL}/api/private/event/signup`, signUpData)
                        .then(function (response) {
                            if (response.data.success) {
                                that.hideSignUpModal(index)
                                that.showSuccessSignup({
                                    message: that.$t('sign-up-success')
                                })
                                that.getPrivateEvent()
                            } else {
                                that.$router.push('events')
                            }
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                } else {
                    alert('Please correctly fill in all the fields')
                }
            })
        },
        signUpGuest: function (index, guestName) {
            const that = this
            const signUpData = {
                eventId: this.$data.event._id,
                eventDatesIndex: index,
                guestName
            }

            if (signUpData && signUpData.guestName) {
                Axios.put(`${process.env.VUE_APP_API_URL}/api/private/event/signupguest`, signUpData)
                    .then(function (response) {
                        that.hideSignUpModalGuest(index)
                        that.showSuccessSignup({
                            message: that.$t('sign-up-success')
                        })
                        that.getPrivateEvent()
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
        },
        signOut: function (props, eventDataIndex, modalIndex) {
            const that = this
            const signOutData = {
                eventId: this.$data.event._id,
                eventDateIndex: eventDataIndex,
                userId: props.row.userId,
                indexToMoveToCancelled: props.index,
                signoutReason: props.row.signoutReason ? props.row.signoutReason : this.$t('no-reason-speficied')
            }
            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
            Axios.post(`${process.env.VUE_APP_API_URL}/api/private/event/signout`, signOutData)
                .then(function () {
                    that.hideSignOutModal(eventDataIndex, modalIndex)
                    that.getPrivateEvent()
                })
        },
        emailEvent () {
            var that = this
            if (confirm(that.$t('email-sure'))) {
                Axios.post(`${process.env.VUE_APP_API_URL}/api/private/email`, {
                    id: that.$data.event._id,
                    html: document.querySelectorAll('.mail-content')[0].innerHTML
                })
                    .then(function (response) {
                        if (response.status === 200) {
                            that.showSuccessSignup({
                                message: that.$t('mail-success')
                            })
                        } else {
                            alert(response.data.message)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
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
                gatherTime: '',
                startTime: '',
                endTime: '',
                forumUrl: '',
                facebookEvent: '',
                websiteUrl: '',
                publiclyAccessible: true,
                dressingroomAvailable: true,
                travelRestitution: true,
                parkingRestitution: true,
                parking: true,
                food: true,
                drinks: true,
                canRegisterGuests: true,
                isArchived: false,
                blastersAllowed: true
            },
            columns: [
                {
                    label: '',
                    field: 'avatar'
                },
                {
                    label: this.$t('name'),
                    field: 'username'
                },
                {
                    label: this.$t('signup-date'),
                    field: 'date'
                },
                {
                    label: this.$t('costume'),
                    field: 'costume'
                },
                {
                    label: '',
                    field: 'sign-out'
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
        },
        showSuccessEmail: {
            type: 'success',
            title: 'E-mailed',
            message: 'Success!'
        }
    },
    mounted () {
        console.log(this.$route.params.id)
        if (this.$route.params.id && this.$route.params.id !== 'undefined') {
            this.getPrivateEvent()
        } else {
            alert('No event ID found')
            this.$router.push('/events/')
        }
    }
}
</script>
<style scoped>
    .alert {
        margin-top: 1rem;
    }
</style>
