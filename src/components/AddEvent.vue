<template>
    <div class="add-event">
        <form action="">
            <h1>Add event</h1>
            <b-row>
                <b-col sm="2"><label for="name">Name:</label></b-col>
                <b-col sm="10">
                    <b-form-input v-model="name" id="name" size="sm" type="text"></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="2"><label for="start-date">Start Date:</label></b-col>
                <b-col sm="10">
                    <datepicker id="start-date" v-model="startDate"></datepicker>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="2"><label for="start-time">Start Time:</label></b-col>
                <b-col sm="10">
                    <vue-timepicker :minute-interval="5" id="start-time" v-model="startTime"></vue-timepicker>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="2"><label for="end-time">End Time:</label></b-col>
                <b-col sm="10">
                    <vue-timepicker :minute-interval="5" id="end-time" v-model="endTime"></vue-timepicker>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="2"><label for="max-signup-date">Max signup date:</label></b-col>
                <b-col sm="10">
                    <datepicker id="max-signup-date" v-model="maxSignupDate"></datepicker>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="2"><label for="gather-time">Gather Time:</label></b-col>
                <b-col sm="10">
                    <vue-timepicker :minute-interval="5" id="gather-time" v-model="gatherTime"></vue-timepicker>
                </b-col>
            </b-row>

            <div>
                <h2>Dates:</h2>
            </div>
            <div v-for="(eventDate, index) in eventDates">
                <b-row>
                    <b-col sm="2"><label>Date {{ index + 1 }}</label></b-col>
                    <b-col sm="10">
                        <datepicker v-model="eventDates[index]"></datepicker>
                        <button type="button" v-on:click="removeDate(index)">Remove date</button>
                    </b-col>
                </b-row>
            </div>
            <div v-if="canAddDate()">
                <button type="button" v-on:click="addDate">Add date</button>
            </div>
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
            console.log(this.eventDates)
            return this.eventDates.length < 10
        },
        addDate: function () {
            this.eventDates.push('')
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
            eventDates: []
        }
    }

}

</script>
