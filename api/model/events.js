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
        open: Boolean
    }],
    gatherTime: [{
        HH: {
            type: String,
            required: true
        },
        mm: {
            type: String,
            required: true
        }
    }],
    startTime: [{
        HH: {
            type: String,
            required: true
        },
        mm: {
            type: String,
            required: true
        }
    }],
    endTime: [{
        HH: {
            type: String,
            required: true
        },
        mm: {
            type: String,
            required: true
        }
    }],
    maxSignupDate: String,
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
    canRegisterGuests: Boolean
});

//export our module to use in server.js
module.exports = mongoose.model('Event', EventSchema);
