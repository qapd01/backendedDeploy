const dotenv = require('dotenv')

const { default: mongoose } = require('mongoose');

require('../src/libs/firebase.js')

const express = require('express');

const activityRouter = require('../src/api/activities/activities.route');
const userRouter = require('../src/api/users/users.route');
const sum = require('../src/api/aggregates/aggregates.route')
const authMiddleware = require('../src/middleware/authentication')
const cors = require('cors')


const app = express();


const admin = require("firebase-admin")
const config = require('../config.js');
// const PORT = 8080;

if (config.isVercel) {
    app.use(async (req, res, next) => {
        await mongoose.connect(config.mongodb.uri);
        return next();
    });
    const serviceAccount = JSON.parse(
        process.env.GOOGLE_APPLICATION_CREDENTIALS
    );

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),

    });
}




dotenv.config()
app.use(cors())
app.use(express.json());

app.use('/api/v1/activities',
    authMiddleware,
    activityRouter);
app.use('/api/v1/users', authMiddleware, userRouter);
app.use('/api/v1/aggregates',
    authMiddleware,
    sum);

// const serviceAccount = JSON.parse(
//     process.env.GOOGLE_APPLICATION_CREDENTIALS
// );



// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),

// })


module.exports = app;