const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
var MeaningCloud = require('meaning-cloud');
const { response } = require('express');
const fetch = require('node-fetch');

let baseURL= 'https://api.meaningcloud.com/sentiment-2.1?key=';
const lang = 'en';

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}
// Updated MeaningCloud API credential settings 
console.log(`Your API key is ${process.env.API_KEY}`);
var meaning = MeaningCloud({
    key: process.env.API_KEY,
    endpoints: {
        sentiment_analysis : '/sentiment-2.0'
    }
  });

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {

    res.sendFile( path.join(__dirname, '../client/views', 'index.html'))
})
app.post('/sentiment', function (req, res) {
    console.log(req.body)
    let url = req.body.url;
    fetch (baseURL+process.env.API_KEY+'&lang='+lang+'&url='+url)
    .then(response => response.json())
    .then(function(data) {
        console.log(data.score_tag)
        console.log(data)
        let sentiment= data.score_tag
        

        res.send(JSON.stringify({data:sentiment}))
        })
    


    

    // res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
