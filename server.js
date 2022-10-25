// Setup empty JS object to act as endpoint for all routes
cityData = {};
weatherData = {};
picturesData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));

app.get("/all", function sendData(req, res) {
    res.send(cityData);
})

app.get("/allWeather", function sendWeather(req, res) {
    res.send(weatherData);
})

app.get("allPictures", function sendPictures(req, res) {
    res.send(picturesData);
})

app.post("/add", (req, res) => {
    projectData['lat'] = req.body.lat;
    projectData['lng'] = req.body.lng;
    projectData['countryName'] = req.body.countryName
    res.send(projectData);
})

app.post("/addWeather", (req, res) => {
    weatherData['temp'] = req.body.temp;
    res.send(weatherData);
})

app.post("/addPicture", (req, res) => {
    picturesData['pic'] = req.body.pic;
    res.send(picturesData);
})

// Setup Server
app.listen(3000, () => {
    console.log("App listening on port 3000")
    console.log("Go to http://localhost:3000")
})

