'use strict';
const express = require('express');

const server = express();
require('dotenv').config();

const cors = require('cors');
 server.use(cors());

 const PORT = process.env.PORT || 3500;

 server.listen(PORT , ()=>{
     console.log('its work');
 })

server.get('/' , (request ,response) =>{
    response.status(200).send('Okay its found');
});
server.get('/location', (request, response)=>{
    const locationData = require('./data/geo.json')
    const location = new Location(locationData)
    response.status(200).send(location)
})

server.get('/weather' , (request , response)=>{
    const wheatherData = require('./data/darksky.json');
    const wheather = new Whather(wheatherData);
    response.status(200).send(wheather);
})




server.use('*' , (request , response) =>{
    response.status(404).send('its not found ')
});
server.use((error ,request , response) =>{
    response.status(500).send(error);
});


// {
//     "search_query": "seattle",
//     "formatted_query": "Seattle, WA, USA",
//     "latitude": "47.606210",
//     "longitude": "-122.332071"
//   }

// consturtor function location
function Location (data){
    this.formatted_query= data[0].display_name;
    this.latitude= data[0].lat
    this.longitude= data[0].lon
    
} 

function Whather (data){
this.forecast =data.daily.summary;
this.time =data.daily.data[0].time
// var date = new Date(data.daily.data[0].time * 1000);
//     console.log(date.toUTCString())
}
