<template>
    <div class="add-event">
        <form action="">
            <h1>Add event</h1>
            <b-row class="form-row">
                <b-col sm="2"><label for="name">Name:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-model="name" id="name" size="sm" type="text"></b-form-input>
                </b-col>
            </b-row>
            <div v-for="(eventDate, index) in eventDates">
                <b-row class="form-row">
                    <b-col sm="2"><label>Day {{ index + 1 }}</label></b-col>
                    <b-col sm="10">
                        <datepicker v-model="eventDates[index].date"></datepicker>
                        <b-form-input v-model="eventDates[index].availableSpots" id="name" size="sm" type="number"></b-form-input>
                        <b-form-checkbox id="event-closed"
                                         v-model="eventDates[index].listClosed"
                                         value="1"
                                         unchecked-value="0">
                            List closed
                        </b-form-checkbox>
                        <button v-if="canDeleteDate(index)" type="button" :click="removeDate(index)">Remove day</button>
                    </b-col>
                </b-row>
            </div>
            <div v-if="canAddDate()">
                <b-row class="form-row">
                    <b-col sm="2"></b-col>
                    <b-col sm="10">
                        <button type="button" :click="addDate">Add day</button>
                    </b-col>
                </b-row>
            </div>
            <b-row class="form-row">
                <b-col sm="2"><label for="gather-time">Gather time:</label></b-col>
                <b-col sm="10">
                    <vue-timepicker :minute-interval="5" id="gather-time" v-model="gatherTime"></vue-timepicker>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="start-time">Start time:</label></b-col>
                <b-col sm="10">
                    <vue-timepicker :minute-interval="5" id="start-time" v-model="startTime"></vue-timepicker>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="end-time">End time:</label></b-col>
                <b-col sm="10">
                    <vue-timepicker :minute-interval="5" id="end-time" v-model="endTime"></vue-timepicker>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="max-signup-date">Max signup date:</label></b-col>
                <b-col sm="10">
                    <datepicker id="max-signup-date" v-model="maxSignupDate"></datepicker>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="event-coordinator">Event coördinator:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-model="eventCoordinator" id="event-coordinator" size="sm" type="text"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="street">Street:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-model="street" id="name" size="sm" type="text"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="postcode">Postcode:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-model="postcode" id="name" size="sm" type="text"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="housenumber">Housenumber:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-model="houseNumber" id="name" size="sm" type="text"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="city">City:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-model="city" id="name" size="sm" type="text"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="forum-url">Forum URL:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-model="forumUrl" id="forum-url" size="sm" type="text"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="facebook-event">Facebook event:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-model="forumUrl" id="facebook-event" size="sm" type="text"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="form-row">
                <b-col sm="2"><label for="website-url">Website URL:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-model="websiteUrl" id="website-url" size="sm" type="text"></b-form-input>
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
                    <b-button size="lg" variant="primary">
                        Save event
                    </b-button>
                </b-col>
            </b-row>
        </form>
    </div>
</template>


<script>

import Datepicker from 'vuejs-datepicker'
import VueTimepicker from 'vue2-timepicker'

export default {
    components: {
        Datepicker,
        VueTimepicker
    },
    methods: {
        canAddDate: function () {
            return this.eventDates.length < 10
        },
        canDeleteDate: function (index) {
            return index >= 1
        },
        addDate: function () {
            this.eventDates.push({
                date: '',
                availableSpots: '',
                listClosed: ''
            })
        },
        removeDate: function (index) {
            console.log(index)
            this.$delete(this.eventDates, index)
        }
    },
    name: 'addEvent',
    data () {
        return {
            'name': undefined,
            'startDate': undefined,
            'startTime': {
                HH: undefined,
                mm: undefined
            },
            'endTime': {
                HH: undefined,
                mm: undefined
            },
            maxSignupDate: undefined,
            gatherTime: undefined,
            eventDates: [{
                date: '',
                availableSpots: '',
                listClosed: ''
            }],
            eventCoordinator: '',
            street: undefined,
            postcode: undefined,
            houseNumber: undefined,
            city: undefined,
            forumUrl: undefined,
            facebookEvent: undefined,
            websiteUrl: undefined,
            publiclyAccessible: undefined,
            guestsAllowed: undefined,
            dressingroomAvailable: undefined,
            travelRestitution: undefined,
            parking: undefined,
            lunch: undefined,
            drinks: undefined,
            canRegisterGuests: undefined
        }
    }

}
</script>

<style>
    .form-row {
        margin-bottom: 10px;
    }
</style>
