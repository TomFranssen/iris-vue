'use strict'

const express = require('express')
const app = express()
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const guard = require('express-jwt-permissions')({
    permissionsProperty: 'http://iris.501st.nl/claims/permissions'
})
const cors = require('cors')
const bodyParser = require('body-parser')
const Event = require('./model/events')
const mongoose = require('mongoose')
require('dotenv').config()

const ManagementClient = require('auth0').ManagementClient;
const managementClientInstance = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: 'zG8vKejPzQd5wXuEsueG5Zw9E4SHHJbK',
    clientSecret: 'tTG3GbuF4gghPyIxb2RTWWb2Jrci2P96vUCw-U__IMpT_Vw3MPsiR6w9H5uPra4r',
    scope: 'read:users update:users'
});

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

app.get('/api/private/events', authCheck, (req, res) => {
    Event.find(function (err, events) {
        if (err) {
            res.send(err)
        }
        res.json(events)
    })
})

app.get('/api/private/users', (req, res) => {
    managementClientInstance.getUsers(function (err, users) {
        if (err) {
            console.log(err);
        }
        res.json(users);
    })
})

app.get('/api/private/user', (req, res) => {
    const userId = req.headers.userid.replace('-', '|')
    managementClientInstance.getUser(userId, function (err, users) {
        if (err) {
            console.log(err);
        }
        res.json(users);
    })
})

app.post('/api/private/events', (req, res) => {
    let event = new Event(req.body)

    event.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.json({message: 'Event successfully added!'});
    });
})

app.put('/api/private/event/signup', authCheck, guard.check('signup:dgevent'), (req, res) => {
    Event.findOne({'_id': req.body.id}, function (err, event) {

        // console.log(req)
        const signUp = {
            signUpDate: new Date(),
            username: 'Tom',
            costume: 'Bla',
            userId: req.user.sub
        }
        event.eventDates[req.body.eventDatesIndex].signedUpUsers.push(signUp);
        event.save()
    })
})

app.listen(3333)
console.log('Listening on localhost:3333')
