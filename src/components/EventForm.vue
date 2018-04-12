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
                            <b-form-input
                                v-validate="'required'"
                                name="gather-time"
                                v-model="event.gatherTime"
                                id="gather-time"
                                size="sm"
                                type="time"
                                placeholder="22:15"
                            >
                            </b-form-input>
                            <p class="text-danger" v-if="errors.has('gather-time')">{{ errors.first('gather-time') }}</p>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="start-time">{{$t('start-time')}}:</label></b-col>
                        <b-col sm="9">
                            <b-form-input
                                v-validate="'required'"
                                name="start-time"
                                v-model="event.startTime"
                                id="start-time"
                                size="sm"
                                type="time"
                                placeholder="22:15"
                            >
                            </b-form-input>
                            <p class="text-danger" v-if="errors.has('start-time')">{{ errors.first('start-time') }}</p>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="end-time">{{$t('end-time')}}:</label></b-col>
                        <b-col sm="9">
                            <b-form-input
                                v-validate="'required'"
                                name="end-time"
                                v-model="event.endTime"
                                id="end-time"
                                size="sm"
                                type="time"
                                placeholder="22:15"
                            >
                            </b-form-input>
                            <p class="text-danger" v-if="errors.has('end-time')">{{ errors.first('end-time') }}</p>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="max-signup-date">{{$t('max-signup-time')}}:</label></b-col>
                        <b-col sm="9">
                            <b-form-input
                                v-validate="'required'"
                                name="max-signup-date"
                                v-model="computedMaxSignupDate"
                                id="max-signup-date"
                                size="sm"
                                type="date"
                                placeholder="2018-12-31"
                            >
                            </b-form-input>
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
                    <h2 class="mt-3 mt-sm-3 mt-md-0">{{$t('location')}}</h2>
                    <b-row class="form-row">
                        <b-col sm="3"><label for="street">{{$t('street')}}:</label></b-col>
                        <b-col sm="9">
                            <b-form-input v-validate="'required'" name="street" v-model.trim="event.street" id="street" size="sm" type="text"></b-form-input>
                            <p class="text-danger" v-if="errors.has('street')">{{ errors.first('street') }}</p>
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
                        <b-col sm="3"><label for="postcode">{{$t('postcode')}}:</label></b-col>
                        <b-col sm="9">
                            <b-form-input v-validate="'required'" name="postcode" v-model.trim="event.postcode" id="postcode" size="sm" type="text"></b-form-input>
                            <p class="text-danger" v-if="errors.has('postcode')">{{ errors.first('postcode') }}</p>
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
                </b-col>
                <b-col>
                    <h2 class="mt-3 mt-sm-3 mt-md-0">{{$t('more-info')}}</h2>
                    <b-row class="form-row">
                        <b-col>
                            <b-checkbox
                                id="publicly-accessible"
                                v-model="event.publiclyAccessible"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('publicly-accessible')}}
                            </b-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col>
                            <b-checkbox
                                id="dressingroom-available"
                                v-model="event.dressingroomAvailable"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('dressingroom-available')}}
                            </b-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col>
                            <b-checkbox
                                id="travel-restitution"
                                v-model="event.travelRestitution"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('travel-restitution')}}
                            </b-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col>
                            <b-checkbox
                                id="parking"
                                v-model="event.parking"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('parking-available')}}
                            </b-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col>
                            <b-checkbox
                                id="parking-restitution"
                                v-model="event.parkingRestitution"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('parking-restitution')}}
                            </b-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col>
                            <b-checkbox
                                id="food"
                                v-model="event.food"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('food-available')}}
                            </b-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col>
                            <b-checkbox
                                id="drinks"
                                v-model="event.drinks"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('drinks-available')}}
                            </b-checkbox>
                        </b-col>
                    </b-row>
                    <h2 class="mt-3 mt-sm-3 mt-md-0">{{$t('rules')}}</h2>
                    <b-row class="form-row">
                        <b-col>
                            <b-checkbox
                                id="can-register-guests"
                                v-model="event.canRegisterGuests"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('guests-allowed')}}
                            </b-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="form-row">
                        <b-col>
                            <b-checkbox
                                id="blasters-allowed"
                                v-model="event.blastersAllowed"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('blasters-allowed')}}
                            </b-checkbox>
                        </b-col>
                    </b-row>
                    <h2 class="mt-3 mt-sm-3 mt-md-0">{{$t('end-info')}}</h2>
                    <b-row class="form-row">
                        <b-col>
                            <b-checkbox
                                id="is-archived"
                                v-model="event.isArchived"
                                value="true"
                                unchecked-value="false"
                            >
                                {{$t('is-archived')}}
                            </b-checkbox>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg>
                    <h2 class="mt-3 mt-sm-3 mt-md-0">{{$t('days')}}</h2>
                    <div v-for="(eventDate, index) in event.eventDates" v-bind:key="index">
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
                                    <input
                                        v-validate="'required'"
                                        v-bind:name="'eventdate-' + index"
                                        v-bind:value="eventDate.date | dateToString"
                                        v-on:input="eventDate.date = $event.target.value + 'T00:00:00.000Z'"
                                        v-bind:id="'event-day-date-' + index"
                                        class="form-control form-control-sm"
                                        type="date"
                                        placeholder="2018-12-31"
                                    />
                                    <p class="text-danger" v-if="errors.has('eventdate-' + index)">{{ errors.first('eventdate-' + index) }}</p>
                                </b-col>
                            </b-row>
                            <b-row class="form-row">
                                <b-col sm="3"><label>{{$t('available-spots')}}</label></b-col>
                                <b-col sm="9">
                                    <b-form-input v-validate="'required'" v-model.number="eventDate.availableSpots" v-bind:name="'eventdate-availablespots-' + index" id="available-spots" size="sm" type="number"></b-form-input>
                                    <p class="text-danger" v-if="errors.has('eventdate-availablespots-' + index)">{{ errors.first('eventdate-availablespots-' + index) }}</p>
                                </b-col>
                            </b-row>
                            <b-row class="form-row">
                                <b-col>
                                    <b-checkbox
                                        v-validate="'required'" id="open"
                                        v-model="eventDate.open"
                                        value="true"
                                        unchecked-value="false"
                                    >
                                        {{$t('open-for-registration')}}
                                    </b-checkbox>
                                </b-col>
                            </b-row>
                            <b-row class="form-row mt-4">
                                <b-col sm="3">{{$t('signups')}}</b-col>
                                <b-col sm="9">
                                    <div v-if="eventDate.signedUpUsers.length === 0">
                                        {{$t('no-signups')}}
                                    </div>
                                    <b-button class="mr-2 mb-2" v-for="(user, signupIndex) in eventDate.signedUpUsers" variant="outline-primary" v-bind:key="user.username" v-on:click="removeSignedUpUser(index, signupIndex)">
                                        {{user.username}}
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </b-button>
                                </b-col>
                            </b-row>

                            <b-row class="form-row mt-4" v-if="getFilteredRows(eventDate.signedUpUsers).length > 0">
                                <b-col md="3">
                                </b-col>
                                <b-col md="9">
                                    <div>
                                        <b-btn v-b-toggle="'collapse-'" class="m-1">{{$t('add-more-signups')}}</b-btn>
                                        <b-collapse v-bind:id="'collapse-'">
                                            <template>
                                                <vue-good-table
                                                    :columns="columns"
                                                    :rows="getFilteredRows(eventDate.signedUpUsers)"
                                                    styleClass="table mt-3 align-middle text-nowrap condensed table-bordered table-striped"
                                                >
                                                    <template slot="table-row" slot-scope="props">
                                                        <td width="50" style="padding: 0;">
                                                            <div v-if="props.row.user_metadata && props.row.user_metadata.legion_thumbnail">
                                                                <img v-bind:src="props.row.user_metadata.legion_thumbnail" width="50" />
                                                            </div>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div v-if="props.row.user_metadata && props.row.user_metadata.username">
                                                                {{props.row.user_metadata.username}}
                                                            </div>
                                                        </td>
                                                        <td class="align-middle">
                                                            <div v-if="props.row.user_metadata && props.row.user_metadata.costumes">
                                                                <select v-model="props.row.selectedCostume">
                                                                    <option disabled value="undefined">{{$t('choose-your-costume')}}</option>
                                                                    <option v-for="costume in props.row.user_metadata.costumes" v-bind:key="costume.name" v-bind:value="costume.name">
                                                                        {{costume.name}}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td class="align-middle text-right">
                                                            <b-button v-on:click="signUpUserToEvent(eventDate.signedUpUsers, props.row, props.row.selectedCostume)" variant="secondary"><i aria-hidden="true" class="fa fa-plus"></i> {{$t('sign-up')}}
                                                            </b-button>
                                                        </td>
                                                    </template>
                                                </vue-good-table>
                                            </template>
                                        </b-collapse>
                                    </div>
                                </b-col>
                            </b-row>

                            <b-row class="form-row mt-4">
                                <b-col sm="3">{{$t('sign-outs')}}</b-col>
                                <b-col sm="9">
                                    <div v-if="eventDate.cancelledUsers.length === 0">
                                        {{$t('no-cancelled-users')}}
                                    </div>
                                    <div v-for="(user, cancelledIndex) in eventDate.cancelledUsers" v-bind:key="user.username">
                                        <b-button class="mr-2 mb-2" variant="outline-primary" v-bind:key="user.username" v-on:click="removeCancelledUser(index, cancelledIndex)">
                                            {{user.username}}
                                            <i class="fa fa-trash" aria-hidden="true"></i>
                                        </b-button>
                                        <span>{{$t('signout-reason')}}: {{user.signoutReason}}</span>
                                    </div>
                                </b-col>
                            </b-row>
                            <b-row class="form-row mt-4">
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
                                            <b-button variant="secondary"  v-on:click="addGuest(index, eventDate.addGuestData)"><i aria-hidden="true" class="fa fa-plus"></i> {{$t('add-guest')}}
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
                        {{$t('save-event')}}
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
import { getPrivateUsers } from '../utils/users-api'
const MAX_DAYS = 20
Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

export default {
    data () {
        return {
            columns: [
                {
                    label: '',
                    tdClass: 'text-right',
                    field: 'picture'
                },
                {
                    label: this.$t('name'),
                    tdClass: 'text-right',
                    field: 'user_metadata.username',
                    filterable: true
                },
                {
                    label: '',
                    tdClass: 'text-right',
                    field: 'add-user'
                },
                {
                    label: '',
                    tdClass: 'text-right',
                    field: 'add-user-button'
                }
            ],
            rows: []
        }
    },
    name: 'EventForm',
    props: ['event', 'edit'],
    computed: {
        computedMaxSignupDate: {
            get: function (test) {
                if (this.event.maxSignupDate) {
                    return this.event.maxSignupDate.substring(0, 10)
                }
            },
            set: function (newValue) {
                this.event.maxSignupDate = newValue + 'T00:00:00.000Z'
            }
        }
    },
    filters: {
        dateToString (date) {
            return date.toString().substr(0, 10)
        }
    },
    methods: {
        getFilteredRows (signedUpUsers) {
            function isAlreadySignedUp (value) {
                if (value && value.user_metadata && value.user_metadata.username) {
                    for (const user of signedUpUsers) {
                        if (user.username === value.user_metadata.username) {
                            return false
                        }
                    }
                    return true
                }
            }
            var filtered = this.rows.filter(isAlreadySignedUp)

            return filtered
        },
        getPrivateUsers () {
            getPrivateUsers().then((users) => {
                this.rows = users
            })
        },
        canAddDate: function () {
            return this.event.eventDates.length < MAX_DAYS
        },
        canDeleteDate: function (index) {
            return index >= 1
        },
        addGuest: function (eventDateIndex, guest) {
            if (guest) {
                this.event.eventDates[eventDateIndex].guests.push(guest)
            }
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
        signUpUserToEvent: function (signedUpUsers, user, selectedCostume) {
            if (selectedCostume) {
                const signUpData = {
                    signUpDate: new Date(),
                    username: user.user_metadata.username,
                    costume: selectedCostume,
                    avatar: user.user_metadata.legion_thumbnail,
                    userId: user.user_id
                }
                signedUpUsers.push(signUpData)
            } else {
                alert(this.$t('choose-your-costume'))
            }
        },
        removeCancelledUser: function (eventDateIndex, cancelledUserIndex) {
            this.event.eventDates[eventDateIndex].cancelledUsers.splice(cancelledUserIndex, 1)
        },
        saveEvent: function () {
            const self = this
            let promiseEvent
            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
            this.$validator.validateAll().then((result) => {
                if (result) {
                    if (confirm(self.$t('do-you-want-to-save-event'))) {
                        if (this.edit) {
                            promiseEvent = Axios.put(`${process.env.VUE_APP_API_URL}/api/private/event`, this.event)
                        } else {
                            promiseEvent = Axios.post(`${process.env.VUE_APP_API_URL}/api/private/event`, this.event)
                        }

                        promiseEvent
                            .then(function (response) {
                                alert(self.$t('event-saved'))
                                if (response.data.message) {
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
    },
    mounted () {
        this.getPrivateUsers()
    }
}
</script>
