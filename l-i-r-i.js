
require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api'); //Using the Spotify api and getting the key from keys.js
var spotify = new Spotify(keys.spotify);

var moment = require('moment'); //Both required to use moment for node
moment().format();

var axios = require('axios'); //To get the information from the APIs for movie and concert-this

var fs = require('fs'); //To read the random.txt file for the do-what-it-says function

var command = process.argv[2]; //for switch case 
var value = process.argv[3]; // info for functions (comes after node l-i-r-i.js)
// practiceing switch case 
switch (command) {
    // function name here
    case "concert-this":
        // 
        concertThis(value);
        break;
    case "spotify-this-song":
        spotifySong(value)
        break;
    case "movies ":
        movie(value);
        break;
    case "Ju-dee do the thing":
        // avatar LOK reference
        doTheThing(value);
        break;
};
// function for concert
function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < response.data.length; i++) {

            var datetime = response.data[i].datetime; //date and time var 
            var datearr = datetime.split(','); // splitting and seperated datetime

            var concertResults = 
                "--------------------------------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(datearr[0], "MM-DD-YYYY"); 
                    // MMDDYYYY format 
            console.log(concertResults);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
        

}

function spotifySong(value) {
    // if no input search Hard Times
    if(!value){
        value = "Hard Times";
    }
    spotify
    // after reading spotify docs had to add .search type 
    .search({ type: 'track', query: value })
    .then(function(response) {
        for (var i = 0; i < 5; i++) {
            var spotifyResults = 
                "--------------------------------------------------------------------" +
                    "\nArtist(s): " + response.tracks.items[i].artists[0].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;
            console.log(spotifyResults);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

function movie(value) {
    // if blank file search this 
    if(!value){
        value = "Lord of the Rings";
    }
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    // promise 
    .then(function(response) {
            var movieResults = 
                "--------------------------------------------------------------------" +
                    "\nMovie Title: " + response.data.Title + 
                    "\nYear of Release: " + response.data.Year +
                    "\nIMDB Rating: " + response.data.imdbRating +
                    "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                    "\nCountry Produced: " + response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nPlot: " + response.data.Plot +
                    "\nActors/Actresses: " + response.data.Actors;
            console.log(movieResults);
    })
    .catch(function (error) {
        console.log(error);
    });
    
}

function doTheThing(value) {
// error recording 
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        spotifySong(dataArr[0], dataArr[1]);
    })
}
