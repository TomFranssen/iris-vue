<template>
    <div>
        <form action="#">
            <h1 v-if="!edit">{{$t('add-event')}}</h1>
            <h1 v-if="edit">{{$t('edit-event')}}</h1>
            <b-row>
                <b-col lg>
                    <h2>{{$t('basic-info')}}</h2>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="name">{{$t('name')}}:</label></b-col>
                        <b-col sm="9">
                            <b-form-input
                                v-validate="'required'"
                                name="name"
                                v-model.trim="event.name"
                                id="name"
                                size="sm"
                                type="text"
                            >
                            </b-form-input>
                            <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
                        </b-col>
                    </b-row>

                    <b-row class="form-row">
                        <b-col sm="3">
                            <label for="description">{{$t('description')}}:</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-textarea
                                id="description"
                                v-model="event.description"
                                :rows="3"
                                :max-rows="6">
                            </b-form-textarea>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="gather-time">{{$t('gather-time')}}:</label></b-col>
                        <b-col sm="9">
                            <vue-timepicker
                                v-validate="'required'"
                                name="gather-time"
                                :minute-interval="5"
                                id="gather-time"
                                v-model="event.gatherTime[0]"
                            >
                            </vue-timepicker>
                            <p class="text-danger" v-if="errors.has('gather-time')">{{ errors.first('gather-time') }}</p>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="start-time">{{$t('start-time')}}:</label></b-col>
                        <b-col sm="9">
                            <vue-timepicker
                                v-validate="'required'"
                                name="start-time"
                                v-bind:minute-interval="5"
                                id="start-time"
                                v-model="event.startTime[0]"
                            >
                            </vue-timepicker>
                            <p class="text-danger" v-if="errors.has('start-time')">{{ errors.first('start-time') }}</p>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="end-time">{{$t('end-time')}}:</label></b-col>
                        <b-col sm="9">
                            <vue-timepicker
                                v-validate="'required'"
                                name="end-time"
                                v-bind:minute-interval="5"
                                id="end-time"
                                v-model="event.endTime[0]"
                            >
                            </vue-timepicker>
                            <p class="text-danger" v-if="errors.has('end-time')">{{ errors.first('end-time') }}</p>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="max-signup-date">{{$t('max-signup-time')}}:</label></b-col>
                        <b-col sm="9">
                            <datepicker v-validate="'required'" name="max-signup-date" id="max-signup-date" v-model="event.maxSignupDate"></datepicker>
                            <p class="text-danger" v-if="errors.has('max-signup-date')">{{ errors.first('max-signup-date') }}</p>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="event-coordinator">{{$t('event-coordinator')}}:</label></b-col>
                        <b-col sm="9">
                            <b-form-input v-validate="'required'" v-model.trim="event.eventCoordinator" name="event-coordinator" id="event-coordinator" size="sm" type="text"></b-form-input>
                            <p class="text-danger" v-if="errors.has('event-coordinator')">{{ errors.first('event-coordinator') }}</p>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col lg>
                    <h2>{{$t('location')}}</h2>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="street">{{$t('street')}}:</label></b-col>
                        <b-col sm="9">
                            <b-form-input v-validate="'required'" name="street" v-model.trim="event.street" id="street" size="sm" type="text"></b-form-input>
                            <p class="text-danger" v-if="errors.has('street')">{{ errors.first('street') }}</p>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="postcode">{{$t('postcode')}}:</label></b-col>
                        <b-col sm="9">
                            <b-form-input v-validate="'required'" name="postcode" v-model.trim="event.postcode" id="postcode" size="sm" type="text"></b-form-input>
                            <p class="text-danger" v-if="errors.has('postcode')">{{ errors.first('postcode') }}</p>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="housenumber">{{$t('housenumber')}}:</label></b-col>
                        <b-col sm="9">
                            <b-form-input v-validate="'required'" name="housenumber" v-model.trim="event.houseNumber" id="housenumber" size="sm" type="text"></b-form-input>
                            <p class="text-danger" v-if="errors.has('housenumber')">{{ errors.first('housenumber') }}</p>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="city">{{$t('city')}}:</label></b-col>
                        <b-col sm="9">
                            <b-form-input v-validate="'required'" name="city" v-model.trim="event.city" id="city" size="sm" type="text"></b-form-input>
                            <p class="text-danger" v-if="errors.has('city')">{{ errors.first('city') }}</p>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="forum-url">{{$t('forum-url')}}:</label></b-col>
                        <b-col sm="9">
                            <b-form-input v-validate="'url'" name="forum-url" v-model.trim="event.forumUrl" id="forum-url" size="sm" type="url"></b-form-input>
                            <p class="text-danger" v-if="errors.has('forum-url')">{{ errors.first('forum-url') }}</p>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="facebook-event">{{$t('facebook')}}:</label></b-col>
                        <b-col sm="9">
                            <b-form-input v-validate="'url'" name="facebook-event" v-model.trim="event.facebookEvent" id="facebook-event" size="sm" type="url"></b-form-input>
                            <p class="text-danger" v-if="errors.has('facebook-event')">{{ errors.first('facebook-event') }}</p>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="website-url">{{$t('website')}}:</label></b-col>
                        <b-col sm="9">
                            <b-form-input v-validate="'url'" name="website-url" v-model.trim="event.websiteUrl" id="website-url" size="sm" type="url"></b-form-input>
                            <p class="text-danger" v-if="errors.has('website-url')">{{ errors.first('website-url') }}</p>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col>
                            <b-form-checkbox
                                id="publicly-accessible"
                                v-model="event.publiclyAccessible"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('publicly-accessible')}}
                            </b-form-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col>
                            <b-form-checkbox
                                id="dressingroom-available"
                                v-model="event.dressingroomAvailable"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('dressingroom-available')}}
                            </b-form-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col>
                            <b-form-checkbox
                                id="travel-restitution"
                                v-model="event.travelRestitution"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('travel-restitution')}}
                            </b-form-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col>
                            <b-form-checkbox
                                id="parking"
                                v-model="event.parking"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('parking-available')}}
                            </b-form-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col>
                            <b-form-checkbox
                                id="parking-restitution"
                                v-model="event.parkingRestitution"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('parking-restitution')}}
                            </b-form-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col>
                            <b-form-checkbox
                                id="lunch"
                                v-model="event.lunch"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('lunch-available')}}
                            </b-form-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col>
                            <b-form-checkbox
                                id="drinks"
                                v-model="event.drinks"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('drinks-available')}}
                            </b-form-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col>
                            <b-form-checkbox
                                id="can-register-guests"
                                v-model="event.canRegisterGuests"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('guests-allowed')}}
                            </b-form-checkbox>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg>
                    <h2>{{$t('days')}}</h2>
                    <div v-for="(eventDate, index) in event.eventDates">
                        <b-card class="mb-3">
                            <b-row class="form-row">
                                <b-col sm="3"><label><strong>{{$t('day')}} {{ index + 1 }}</strong></label></b-col>
                                <b-col sm="9">
                                    <button
                                        class="pull-right btn btn-default"
                                        v-if="canDeleteDate(index)"
                                        type="button"
                                        v-on:click="removeDate(index)"
                                    >
                                        <i class="fa fa-times" aria-hidden="true"></i>
                                        {{$t('remove-day')}}
                                    </button>
                                </b-col>
                            </b-row>
                            <b-row class="form-row">
                                <b-col sm="3"><label>{{$t('date')}}</label></b-col>
                                <b-col sm="9">
                                    <datepicker v-validate="'required'" v-bind:name="'eventdate-' + index" v-model="eventDate.date"></datepicker>
                                    <p class="text-danger" v-if="errors.has('eventdate-' + index)">{{ errors.first('eventdate-' + index) }}</p>
                                </b-col>
                            </b-row>
                            <b-row class="form-row">
                                <b-col sm="3"><label>{{$t('available-spots')}}</label></b-col>
                                <b-col sm="9">
                                    <b-form-input v-validate="'required'" v-model="eventDate.availableSpots" v-bind:name="'eventdate-availablespots-' + index" id="available-spots" size="sm" type="number"></b-form-input>
                                    <p class="text-danger" v-if="errors.has('eventdate-availablespots-' + index)">{{ errors.first('eventdate-availablespots-' + index) }}</p>
                                </b-col>
                            </b-row>
                            <b-row class="form-row">
                                <b-col>
                                    <b-form-checkbox
                                        v-validate="'required'" id="open"
                                        v-model="eventDate.open"
                                        value="true"
                                        unchecked-value="false"
                                    >
                                        {{$t('open-for-registration')}}
                                    </b-form-checkbox>
                                </b-col>
                            </b-row>
                            <b-row class="form-row">
                                <b-col sm="3">{{$t('signups')}}</b-col>
                                <b-col sm="9">
                                    <div v-if="eventDate.signedUpUsers.length === 0">
                                        {{$t('no-signups')}}
                                    </div>
                                    <b-button class="mr-2" v-for="(user, signupIndex) in eventDate.signedUpUsers" variant="outline-primary" v-bind:key="user.username" v-on:click="removeSignedUpUser(index, signupIndex)">
                                        {{user.username}}
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </b-button>
                                </b-col>
                            </b-row>
                            <b-row class="form-row">
                                <b-col sm="3">{{$t('sign-outs')}}</b-col>
                                <b-col sm="9">
                                    <div v-if="eventDate.cancelledUsers.length === 0">
                                        {{$t('no-cancelled-users')}}
                                    </div>
                                    <b-button class="mr-2" v-for="(user, cancelledIndex) in eventDate.cancelledUsers" variant="outline-primary" v-bind:key="user.username" v-on:click="removeCancelledUser(index, cancelledIndex)">
                                        {{user.username}}
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </b-button>
                                </b-col>
                            </b-row>
                            <b-row class="form-row">
                                <b-col sm="3">{{$t('guests')}}</b-col>
                                <b-col sm="9">
                                    <div v-if="eventDate.guests.length === 0">
                                        {{$t('no-guests')}}
                                    </div>
                                    <b-button class="mr-2 mb-1" v-for="(guest, guestIndex) in eventDate.guests" variant="outline-primary" v-bind:key="guest" v-on:click="removeGuest(index, guestIndex)">
                                        {{guest}}
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </b-button>

                                    <b-row class="form-row mt-2">
                                        <b-col sm="9">
                                            <b-form-input
                                                name="add-guest"
                                                v-model.trim="eventDate.addGuestData"
                                                id="add-guest"
                                                size="sm"
                                                type="text"
                                            >
                                            </b-form-input>
                                        </b-col>
                                        <b-col sm="3">
                                            <b-button variant="outline-primary"  v-on:click="addGuest(index, eventDate.addGuestData)">
                                                {{$t('add-guest')}}
                                            </b-button>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </b-card>
                    </div>
                    <div v-if="canAddDate()" class="mt-3 text-right">
                        <button class="btn btn-primary" type="button" v-on:click="addDate">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                            {{$t('add-day')}}
                        </button>
                    </div>
                </b-col>
            </b-row>
            <b-row class="form-row mt-4 mb-5">
                <b-col>
                    <b-button v-if="edit" v-on:click="saveEvent" size="lg" variant="primary">
                        {{$t('edit-event')}}
                    </b-button>
                    <b-button v-if="!edit" v-on:click="saveEvent" size="lg" variant="primary">
                        {{$t('add-event')}}
                    </b-button>
                </b-col>
            </b-row>
        </form>
    </div>
</template>
<script>
    import Axios from 'axios'
    import Datepicker from 'vuejs-datepicker'
    import VueTimepicker from 'vue2-timepicker'
    const MAX_DAYS = 20
    export default {
        name: 'EventForm',
        props: ['event', 'edit'],
        components: {
            Datepicker,
            VueTimepicker
        },
        methods: {
            canAddDate: function () {
                return this.event.eventDates.length < MAX_DAYS
            },
            canDeleteDate: function (index) {
                return index >= 1
            },
            addGuest: function (eventDateIndex, guest) {
                this.event.eventDates[eventDateIndex].guests.push(guest)
            },
            removeGuest: function (eventDateIndex, guestIndex) {
                this.event.eventDates[eventDateIndex].guests.splice(guestIndex, 1)
            },
            addDate: function () {
                this.event.eventDates.push({
                    date: '',
                    availableSpots: '',
                    open: true,
                    signedUpUsers: [],
                    cancelledUsers: [],
                    guests: []
                })
            },
            removeDate: function (index) {
                this.$delete(this.event.eventDates, index)
            },
            removeSignedUpUser: function (eventDateIndex, signedUpUserIndex) {
                this.event.eventDates[eventDateIndex].signedUpUsers.splice(signedUpUserIndex, 1)
            },
            removeCancelledUser: function (eventDateIndex, cancelledUserIndex) {
                this.event.eventDates[eventDateIndex].cancelledUsers.splice(cancelledUserIndex, 1)
            },
            saveEvent: function () {
                const self = this
                let promiseEvent
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        if (confirm(self.$t('do-you-want-to-save-event'))) {
                            if (this.edit) {
                                promiseEvent = Axios.put(`${process.env.API_URL}/api/private/event`, this.event)
                            } else {
                                promiseEvent = Axios.post(`${process.env.API_URL}/api/private/event`, this.event)
                            }

                            promiseEvent
                                .then(function (response) {
                                    alert(self.$t('event-saved'))
                                    if (response.data.message) {
                                        alert(response.data.message)
                                        self.$router.push('events')
                                    } else {
                                        console.log(response)
                                    }
                                })
                                .catch(function (error) {
                                    console.log(error)
                                })
                        }
                        return
                    }
                    alert(self.$t('fill-in-all-fields'))
                    this.$el.querySelector('[data-vv-id=' + this.$validator.errors.items[0].id + ']').scrollIntoView()
                })
            }
        }
    }
</script>
