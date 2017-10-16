'use strict'

const express = require('express')
const app = express()
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const cors = require('cors')
const bodyParser = require('body-parser')
const Event = require('./model/events')
const mongoose = require('mongoose')
const guard = require('express-jwt-permissions')()

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
        jwksUri: 'https://501st.eu.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://iris.501st.nl',
    issuer: 'https://501st.eu.auth0.com/',
    algorithms: ['RS256']
})

// authorization check
function authorizationCheck(req, res, next) {
    console.log(req)

    if (!req.user.admin) {
        return res.sendStatus(401);
    } else {
        // move to the next middleware, cause it's ok
        next();
    }
}

app.get('/api/private/events', authCheck, (req,res) => {
    Event.find(function (err, events) {
        if (err) {
            res.send(err)
        }
        res.json(events)
    })
})

app.put('/api/private/event/signup', authCheck, authorizationCheck, (req, res) => {
    console.log(req)
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
