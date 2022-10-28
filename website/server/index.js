// Setup empty JS object to act as endpoint for all routes
let cityData = {};
let weatherData = {};
let picturesData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static(path.resolve(__dirname + "../../dist")));

// app.get("/", (req, res) => {
//     res.sendFile('index.html', { root: 'dist' })
// })

app.get("/all", function sendData(req, res) {
    res.send(cityData);
})

app.get("/allWeather", function sendWeather(req, res) {
    res.send(weatherData);
})

app.get("/allPictures", function sendPictures(req, res) {
    res.send(picturesData);
})


app.post("/addWeather", (req, res) => {
    weatherData['temp'] = req.body.temp;
    weatherData['datetime'] = req.body.datetime;
    res.send(weatherData);
})

app.post("/addPicture", (req, res) => {
    picturesData['pic'] = req.body.pic;
    res.send(picturesData);
})

module.exports = app;