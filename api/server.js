'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const Event = require('./model/events');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://iris:${process.env.DB_PASSWORD}@ds133044.mlab.com:33044/iris`, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
});

const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://501st.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://iris.501st.nl',
    issuer: 'https://501st.eu.auth0.com/',
    algorithms: ['RS256']
});

app.get('/api/private/events', authCheck, (req,res) => {
    Event.find(function (err, events) {
        if (err) {
            res.send(err);
        }
        res.json(events)
    })
})

app.post('/api/private/events', (req, res) => {
    var event = new Event(req.body)

    event.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.json({message: 'Event successfully added!'});
    });
})

app.listen(3333);
console.log('Listening on localhost:3333');
