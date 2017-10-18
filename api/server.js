'use strict'

const express = require('express')
const app = express()
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const jwtAuthz = require('express-jwt-authz')
const cors = require('cors')
const bodyParser = require('body-parser')
const Event = require('./model/events')
const mongoose = require('mongoose')
require('dotenv').config()

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
    throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
    res.setHeader('Cache-Control', 'no-cache')
    next()
})

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://iris:${process.env.DB_PASSWORD}@ds133044.mlab.com:33044/iris`, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
})

const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
})

// const checkScopes = jwtAuthz(['create:dgevent'])

let checkScopes = function (req) {
    console.log('this is: ',req.user['http://iris.501st.nl/claims/permissions'])
    return jwtAuthz(['create:dgevent']);
}


app.get('/api/private/events', authCheck, (req, res) => {
    Event.find(function (err, events) {
        if (err) {
            res.send(err)
        }
        res.json(events)
    })
})

app.put('/api/private/event/signup', authCheck, checkScopes, (req, res) => {
    console.log(req.user)
    // console.log(guard.check(['user:read']))

    // Event.findById(req.params.todoId, (err, todo) => {
    //     // Handle any possible database errors
    //     if (err) {
    //         res.status(500).send(err)
    //     } else {
    //         // Update each attribute with any possible attribute that may have been submitted in the body of the request
    //         // If that attribute isn't in the request body, default back to whatever it was before.
    //         todo.title = req.body.title || todo.title
    //         todo.description = req.body.description || todo.description
    //         todo.price = req.body.price || todo.price
    //         todo.completed = req.body.completed || todo.completed
    //
    //         // Save the updated document back to the database
    //         todo.save((err, todo) => {
    //             if (err) {
    //                 res.status(500).send(err)
    //             }
    //             res.status(200).send(todo)
    //         })
    //     }
    // })
})

app.listen(3333)
console.log('Listening on localhost:3333')
