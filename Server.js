var express = require('express');
var app = express()

const route = require('./Route/route')


app.use('/',route)

app.listen(8080);

// Configuring the database
const dbConfig = require('./Config/DataBase.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});