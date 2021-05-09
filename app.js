require('dotenv').config();

const express = require('express');
const { application } = require('./config');
const Route = require('./src/routes/Routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/', Route);

app.listen(application.port, () => {
    console.log('Running on ' + application.port);
    console.log(application.baseUrl);
});

//npm run startDev