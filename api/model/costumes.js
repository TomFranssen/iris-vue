'use strict';
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CostumeSchema = new Schema({
    name: String
})

module.exports = mongoose.model('Costume', CostumeSchema)
