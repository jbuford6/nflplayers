var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var app = express();
var clientPath = path.join(__dirname, '..', 'client');
var jsonPath = path.join(__dirname, 'data.json');


app.route('/api/chirps')
    .get(function(req, res) {
        res.sendFile(jsonPath);
    })