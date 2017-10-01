// Tutorial: https://medium.com/@bryantheastronaut/react-getting-started-the-mern-stack-tutorial-feat-es6-de1a2886be50
// DB: https://mlab.com
// Site URL: http://localhost:3000/
// API url: http://localhost:3001/api/
// User auth: Okta

// Starten:
// API: DB_USERNAME='Welkom12345' node api/server.js
// Webserver: npm start

'use strict';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const router = express.Router();
const port = process.env.API_PORT || 3001;
const Event = require('./model/events');

// mongoose.connect('mongodb://iris:Welkom12345@ds133044.mlab.com:33044/iris');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://iris:${process.env.DB_USERNAME}@ds133044.mlab.com:33044/iris`, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

router.get('/', function (req, res) {
    res.json({message: 'API Initialized!'});
});

app.use('/api', router);

app.listen(port, function () {
    console.log(`api running on port ${port}`);
});

router.get('/', function (req, res) {
    res.json({message: 'API Initialized!'});
});

router.route('/events')
    .get(function (req, res) {
        Event.find(function (err, events) {
            if (err) {
                res.send(err);
            }
            res.json(events)
        });
    })
    .post(function (req, res) {
        var event = new Event();
        event.name = req.body.name;
        event.eventDates = eval(req.body.eventDates);
        event.addressInformation.city = req.body.city;

        event.save(function (err) {
            if (err) {
                return res.send(err);
            }
            res.json({message: 'Event successfully added!'});
        });
    });
