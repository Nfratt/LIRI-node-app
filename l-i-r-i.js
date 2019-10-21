
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
        concertThis(value);
        break;
    case "spotify-this-song":
        spotifySong(value)
        break;
    case "movie-This":
        movieThis(value);
        break;
    case "Ju-Dee-do-the-thing":
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
                "-----------------------------------" +
                    " Venue Name: " + response.data[i].venue.name + 
                    " Venue Location: " + response.data[i].venue.city +
                    " Date of the Event: " + moment(datearr[0], "MM-DD-YYYY"); 
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
        for (var i = 0; i < response.tracks.items.length; i++) {
            var spotifyResults = 
                "--------------------------------------------------------------------" +
                    " Artist(s): " + response.tracks.items[i].artists[0].name +
                    " Album Name: " + response.tracks.items[i].album.name +
                    " Song Name: " + response.tracks.items[i].name +
                    " Preview Link: " + response.tracks.items[i].preview_url;
            console.log(spotifyResults);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

function movieThis(value) {
    // if blank file search this 
    if(!value){
        value = "Lord of the Rings";
    }
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    // promise 
    .then(function(response) {
            var movieResults = 
                "--------------------------------------------------------------------" +
                    " Movie Title: " + response.data.Title + 
                    " Year of Release: " + response.data.Year +
                    " IMDB Rating: " + response.data.imdbRating +
                    " Rotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                    " Country Produced: " + response.data.Country +
                    " Language: " + response.data.Language +
                    " Actors/Actresses: " + response.data.Actors;
                    " Plot: " + response.data.Plot +
            console.log(movieResults);
    })
    .catch(function (error) {
        console.log(error);
    });
    
}

function doTheThing() {
// error recording 
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        spotifySong(dataArr[1]);
    })
}
