const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// importing routes
const userRouter = require('../routes/userRouter');
// const buildingsRouter = require('./controller/buildingController');
// const bookingsRouter = require('./controller/bookingsController');
// const feedBackRouter = require('./controller/feedBackController');

function application(authenticationDB) {

    try {
        const app = express();
        app.use(bodyParser.json());
        app.use(cors());

        //middleware for setting the headers to request
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            );
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

            next();
        })

        app.get('/api/user', userRouter);
        // app.get('/api/booking', bookingsRouter);
        // app.get('/api/assetList', buildingsRouter);
        // app.get('/api/feedback', feedBackRouter);

        return app;

    } catch (error) {
        throw error;
    }
}

module.exports = application;

