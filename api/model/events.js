'use strict';
//import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: String,
    eventDates:[{
        date: {
            type: Date,
            required: true
        },
        availableSpots: {
            type: Number
        },
        listClosed: Boolean
    }],
    gatherTime: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    maxSignupDate: {
        type: Date,
        required: true
    },
    eventCoordinator: String,
    street: String,
    postcode: String,
    houseNumber: String,
    city: {
        type: String,
        required: true
    },
    forumUrl: String,
    facebookEvent: String,
    websiteUrl: String,
    publiclyAccessible: Boolean,
    guestsAllowed: Boolean,
    dressingroomAvailable: Boolean,
    travelRestitution: Boolean,
    parking: Boolean,
    lunch: Boolean,
    drinks: Boolean,
    canRegisterGuests: Boolean,
    maxSpotsAvailable: Number
});

//export our module to use in server.js
module.exports = mongoose.model('Event', EventSchema);
