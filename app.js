require('dotenv').config();

const express = require('express');
const {
    application
} = require('./config');
const Route = require('./src/routes/Routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/', Route);

app.listen(application.port || 3000, () => {
    console.log('Running on ' + (application.port || 3000));
    console.log(application.baseUrl || 'http://localhost:3000');
});