//Max-Brands API CodeBase
//ProjectName : Max-Brands
//Version : 1.0.0

//include all the packages necessary
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from 'morgan';
import glob from 'glob';

//include the files 
import settings from './settings';
import connectToMongoDb from './config/database.config';
import apiRouters from './router';
import http from 'http';
const fileUpload = require('express-fileupload');
const path = require("path");
let config = require('./config/' + settings.environment + '.config');
var mkdirp = require('mkdirp');

//set the port
const port = settings.port;

const app = express();

const server = http.createServer(app)

connectToMongoDb();

app.use(cors());
app.use(bodyParser.json({
    extended: true,
    limit: '500mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '500mb'
}));
app.use(fileUpload());

app.use('/static', express.static(config.default.media.local_file_path))
app.use('/image', express.static(__dirname))

app.use(express.static(path.join(__dirname, 'dist')));

apiRouters.forEach(function (apiRoute) {
    app.use('/api', apiRoute);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


server.listen(port, () => {
    console.log(`Server started on port : ${port}`);
});