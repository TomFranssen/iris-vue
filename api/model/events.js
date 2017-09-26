'use strict';
//import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.

const EventSchema = new Schema({
    name: String,
    eventDates:[{
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    }],
    eventCoordinator: String,
    addressInformation: {
        address: String,
        city: {
            type: String,
            required: true
        }
    },
    website: String,
    facilities: {
        publiclyAccessible: Boolean,
        guestsAllowed: Boolean,
        dressingroomAvailable: Boolean,
        travelRestitution: Boolean,
        parking: Boolean,
        lunch: Boolean,
        drinks: Boolean
    }
});

//export our module to use in server.js
module.exports = mongoose.model('Event', EventSchema);
