const express = require("express");
const bodyParser = require("body-parser");
const mkdirp = require('mkdirp');
const path = require('path');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const request = require('request');
var app = express();


var db = require("./database/database");
var config = require("./config/config");


var musicRouter = require("./routes/musicRouter");
app.use(bodyParser({limit: '50mb'}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

//Music block
app.use("/music", musicRouter);

// app.post("/upload",  upload.array(),function(req, res) {
// 	console.log(req);
//         res.send(req.files);
//     });
// base.checkValid();

//connect mongodb
db.connect(config.mongoserver, function(err) {
    if (err) {
        return console.log(err);
    }
    app.listen(8000, function() {
        console.log("Server on port 8000");
    });
});