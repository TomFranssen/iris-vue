'use strict';
//import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: String,
    startDate: {
        type: Date,
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
    gatherTime: {
        type: String,
        required: true
    },
    eventDates:[{
        type: Date,
        required: true
    }],
    eventCoordinator: String,
    addressInformation: {
        street: String,
        postcode: String,
        houseNumber: String,
        city: {
            type: String,
            required: true
        }
    },
    forumUrl: String,
    websiteUrl: String,
    facilities: {
        publiclyAccessible: Boolean,
        guestsAllowed: Boolean,
        dressingroomAvailable: Boolean,
        travelRestitution: Boolean,
        parking: Boolean,
        lunch: Boolean,
        drinks: Boolean
    },
    canRegisterGuests: Boolean
});

//export our module to use in server.js
module.exports = mongoose.model('Event', EventSchema);
