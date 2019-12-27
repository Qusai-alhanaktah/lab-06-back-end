'use strict';
const express = require('express');

const server = express();
require('dotenv').config();

const cors = require('cors');
server.use(cors());

const PORT = process.env.PORT || 3500;

server.listen(PORT, () => {
    console.log('its work');
})

server.get('/', (request, response) => {
    response.status(200).send('Okay its found');
});
// ///////////////////////////
server.get('/location', (request, response) => {
    const locationData = require('./data/geo.json')
    const location = new Location(locationData)
    response.status(200).send(location)
})
// //////////////////////
server.get('/weather', (request, response) => {
    const weatherData = require('./data/darksky.json');
    for (let i = 0; i < weatherData.daily.data.length; i++) {
        let date = new Date(weatherData.daily.data[i].time * 1000).toDateString();
        let forecast = weatherData.daily.data[i].summary;
        new Weather(forecast, date);
    }
    response.status(200).send(Weather.all);
})
// ///////////////////////////
server.use('*', (request, response) => {
    response.status(404).send('its not found ')
});
// //////////////////////////////////
server.use((error, request, response) => {
    response.status(500).send("Sorry, something went wrong");
});

// consturtor function location
function Location(data) {
    this.formatted_query = data[0].display_name;
    this.latitude = data[0].lat
    this.longitude = data[0].lon

}
// consturtor function weather
function Weather(forecast, date) {
    this.forecast = forecast;
    this.time = date;
    Weather.all.push(this);
    console.log(Weather.all);
}
Weather.all = []