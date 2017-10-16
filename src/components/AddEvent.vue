<template>
    <div class="add-event">
        <form action="#">
            <h1>Add event</h1>
            <b-row class="form-row">
                <b-col sm="2"><label for="name">Name:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-validate="'required'" name="name" v-model.trim="name" id="name" size="sm" type="text"></b-form-input>
                    <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
                </b-col>
            </b-row>

            <b-row>
                <b-col sm="2">
                    Event for
                </b-col>
                <b-col sm="10">
                    <div id='example-3'>
                        <input v-validate="'required'" name="allegiances" type="checkbox" id="dutch-garrison" value="Dutch Garrison" v-model="allegiances">
                        <label for="dutch-garrison">Dutch Garrison</label>
                        <input v-validate="'required'" type="checkbox" name="allegiances"  id="dune-sea-base" value="Dune Sea Base" v-model="allegiances">
                        <label for="dune-sea-base">Dune Sea Base</label>
                        <p class="text-danger" v-if="errors.has('allegiances')">{{ errors.first('allegiances') }}</p>
                    </div>
                </b-col>
            </b-row>
            <div v-for="(eventDate, index) in eventDates">
                <b-row class="form-row">
                    <b-col sm="2"><label><strong>Day {{ index + 1 }}</strong></label></b-col>
                </b-row>
                <b-row class="form-row">
                    <b-col sm="2"><label>Date</label></b-col>
                    <b-col sm="10">
                        <datepicker v-validate="'required'" v-bind:name="'eventdate-' + index" v-model="eventDate.date"></datepicker>
                        <p class="text-danger" v-if="errors.has('eventdate-' + index)">{{ errors.first('eventdate-' + index) }}</p>
                    </b-col>
                </b-row>
                <b-row class="form-row">
                    <b-col sm="2"><label>Available spots</label></b-col>
                    <b-col sm="10">
                        <b-form-input v-validate="'required'" v-model="eventDate.availableSpots" v-bind:name="'eventdate-availablespots-' + index" id="available-spots" size="sm" type="number"></b-form-input>
                        <p class="text-danger" v-if="errors.has('eventdate-availablespots-' + index)">{{ errors.first('eventdate-availablespots-' + index) }}</p>
                    </b-col>
                </b-row>
                <b-row class="form-row">
                    <b-col sm="2"></b-col>
                    <b-col sm="10">
                        <b-form-checkbox v-validate="'required'" id="open"
                                         v-model="eventDate.open"
                                         value="1"
                                         unchecked-value="0">
                            Open for registration
                        </b-form-checkbox>
                    </b-col>
                </b-row>
                <b-row class="form-row">
                    <b-col sm="2"></b-col>
                    <b-col sm="10">
                        <button v-if="canDeleteDate(index)" type="button" v-on:click="removeDate(index)">Remove day</button>
                    </b-col>
                </b-row>
            </div>
            <div v-if="canAddDate()">
                <b-row class="form-row">
                    <b-col sm="2"></b-col>
                    <b-col sm="10">
                        <button type="button" v-on:click="addDate">Add day</button>
                    </b-col>
                </b-row>
            </div>
            <b-row class="form-row">
                <b-col sm="2"><label for="gather-time">Gather time:</label></b-col>
                <b-col sm="10">
                    <vue-timepicker v-validate="'required'" name="gather-time" :minute-interval="5" id="gather-time" v-model="gatherTime"></vue-timepicker>
                    <p class="text-danger" v-if="errors.has('gather-time')">{{ errors.first('gather-time') }}</p>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="start-time">Start time:</label></b-col>
                <b-col sm="10">
                    <vue-timepicker v-validate="'required'" name="start-time" :minute-interval="5" id="start-time" v-model="startTime"></vue-timepicker>
                    <p class="text-danger" v-if="errors.has('start-time')">{{ errors.first('start-time') }}</p>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="end-time">End time:</label></b-col>
                <b-col sm="10">
                    <vue-timepicker v-validate="'required'" name="end-time" :minute-interval="5" id="end-time" v-model="endTime"></vue-timepicker>
                    <p class="text-danger" v-if="errors.has('end-time')">{{ errors.first('end-time') }}</p>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="max-signup-date">Max signup date:</label></b-col>
                <b-col sm="10">
                    <datepicker v-validate="'required'" name="max-signup-date" id="max-signup-date" v-model="maxSignupDate"></datepicker>
                    <p class="text-danger" v-if="errors.has('max-signup-date')">{{ errors.first('max-signup-date') }}</p>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="event-coordinator">Event coördinator:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-validate="'required'" v-model.trim="eventCoordinator" name="event-coordinator" id="event-coordinator" size="sm" type="text"></b-form-input>
                    <p class="text-danger" v-if="errors.has('event-coordinator')">{{ errors.first('event-coordinator') }}</p>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="street">Street:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-validate="'required'" v-model.trim="street" id="name" size="sm" type="text"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="postcode">Postcode:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-validate="'required'" v-model.trim="postcode" id="name" size="sm" type="text"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="housenumber">Housenumber:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-validate="'required'" v-model.trim="houseNumber" id="name" size="sm" type="text"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="city">City:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-validate="'required'" v-model.trim="city" id="name" size="sm" type="text"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="forum-url">Forum URL:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-validate="'required|url'" name="forum-url" v-model.trim="forumUrl" id="forum-url" size="sm" type="url"></b-form-input>
                    <p class="text-danger" v-if="errors.has('forum-url')">{{ errors.first('forum-url') }}</p>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="facebook-event">Facebook event:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-validate="'required|url'" v-model.trim="facebookEvent" id="facebook-event" size="sm" type="url"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="website-url">Website URL:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-validate="'required|url'" v-model.trim="websiteUrl" id="website-url" size="sm" type="url"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="publicly-accessible"></label></b-col>
                <b-col sm="10">
                    <b-form-checkbox id="publicly-accessible"
                                     v-model="publiclyAccessible"
                                     value="1"
                                     unchecked-value="0">
                        Publicly accessible
                    </b-form-checkbox>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="dressingroom-available"></label></b-col>
                <b-col sm="10">
                    <b-form-checkbox id="dressingroom-available"
                                     v-model="dressingroomAvailable"
                                     value="1"
                                     unchecked-value="0">
                        Dressingroom available
                    </b-form-checkbox>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="travel-restitution"></label></b-col>
                <b-col sm="10">
                    <b-form-checkbox id="travel-restitution"
                                     v-model="travelRestitution"
                                     value="1"
                                     unchecked-value="0">
                        Travel restitution
                    </b-form-checkbox>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="parking"></label></b-col>
                <b-col sm="10">
                    <b-form-checkbox id="parking"
                                     v-model="parking"
                                     value="1"
                                     unchecked-value="0">
                        Parking available
                    </b-form-checkbox>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="lunch"></label></b-col>
                <b-col sm="10">
                    <b-form-checkbox id="lunch"
                                     v-model="lunch"
                                     value="1"
                                     unchecked-value="0">
                        Lunch available
                    </b-form-checkbox>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="drinks"></label></b-col>
                <b-col sm="10">
                    <b-form-checkbox id="drinks"
                                     v-model="drinks"
                                     value="1"
                                     unchecked-value="0">
                        Drinks available
                    </b-form-checkbox>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="can-register-guests"></label></b-col>
                <b-col sm="10">
                    <b-form-checkbox id="can-register-guests"
                                     v-model="canRegisterGuests"
                                     value="1"
                                     unchecked-value="0">
                        Can register guests
                    </b-form-checkbox>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"></b-col>
                <b-col sm="10">
                    <b-button v-on:click="saveEvent" size="lg" variant="primary">
                        Save event
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

const MAX_EVENTS = 10

export default {
    components: {
        Datepicker,
        VueTimepicker
    },
    methods: {
        canAddDate: function () {
            return this.eventDates.length < MAX_EVENTS
        },
        canDeleteDate: function (index) {
            return index >= 1
        },
        addDate: function () {
            this.eventDates.push({
                date: '',
                availableSpots: '',
                open: ''
            })
        },
        removeDate: function (index) {
            console.log(index)
            this.$delete(this.eventDates, index)
        },
        saveEvent: function () {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    if (confirm('Do you want to add this event?')) {
                        Axios.post('http://localhost:3333/api/private/events', this.$data)
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
                    return
                }
                alert('Please correctly fill in all the fields.')
                this.$el.querySelector('[data-vv-id=' + this.$validator.errors.items[0].id + ']').scrollIntoView()
            })
        }
    },
    name: 'addEvent',
    data () {
//        return {
//            name: undefined,
//            eventDates: [{
//                date: '',
//                availableSpots: '',
//                open: ''
//            }],
//            gatherTime: {
//                HH: undefined,
//                mm: undefined
//            },
//            startTime: {
//                HH: undefined,
//                mm: undefined
//            },
//            endTime: {
//                HH: undefined,
//                mm: undefined
//            },
//            maxSignupDate: undefined,
//            eventCoordinator: '',
//            street: undefined,
//            postcode: undefined,
//            houseNumber: undefined,
//            city: undefined,
//            forumUrl: undefined,
//            facebookEvent: undefined,
//            websiteUrl: undefined,
//            publiclyAccessible: undefined,
//            guestsAllowed: undefined,
//            dressingroomAvailable: undefined,
//            travelRestitution: undefined,
//            parking: undefined,
//            lunch: undefined,
//            drinks: undefined,
//            canRegisterGuests: undefined
//        }
        return {
            name: 'Star Wars Reads day',
            allegiances: ['Dutch Garrison', 'Dune Sea Base'],
            eventDates: [{
                date: '2017-10-03T19:24:00.000Z',
                availableSpots: 25,
                open: 1
            }, {
                date: '2017-10-04T19:24:00.000Z',
                availableSpots: 15,
                open: 1
            }],
            gatherTime: {
                HH: '08',
                mm: '05'
            },
            startTime: {
                HH: '09',
                mm: '05'
            },
            endTime: {
                HH: '20',
                mm: '05'
            },
            maxSignupDate: '2017-10-01T19:24:00.000Z',
            eventCoordinator: 'Richard',
            street: 'Molenstraat',
            postcode: '5611XJ',
            houseNumber: '448',
            city: 'Eindhoven',
            forumUrl: 'https://forum.501st.nl',
            facebookEvent: 'https://www.facebook.nl',
            websiteUrl: 'https://www.501st.nl',
            publiclyAccessible: 1,
            guestsAllowed: 0,
            dressingroomAvailable: 1,
            travelRestitution: 0,
            parking: 1,
            lunch: 1,
            drinks: 0,
            canRegisterGuests: 0
        }
    }

}
</script>

<style>
    .form-row {
        margin-bottom: 10px;
    }
</style>
