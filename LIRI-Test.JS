require("dotenv").config();
// hooking into my keys javascrpt 
var keys = require("./keys.js");
var command = process.argv[2]; //For the switch statement
switch(command){
case 'spotify-this-song':
    // looking in the keys.js for the spotify key
        var spotify = new Spotify(keys.spotify);
        // tells you that it has the key 
        console.log('Spotify');
        spotify
          .search({ type: 'track', query: 'Hard Times' })
        //   promise that should return 
          .then(function (response) {
            console.group(response.tracks.items[0].name);
            console.log('song name: '+response.tracks.items[0].name);
            console.log('Album Name: ' + response.tracks.items[0].album.name);
            console.log('Artist Name: ' + response.tracks.items[0].artists[0].name);
            console.log('Preview Link: ' + response.tracks.items[0].artists[0].external_urls.spotify);
            console.groupEnd();
          })
          .catch(function (err) {
            console.log(err);
          });
        break;
    case'concertThis':
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < response.data.length; i++) {
            // Saves datetime response into a variable
            var datetime = response.data[i].datetime; 
            var dateArr = datetime.split('T'); 

            var concertResults = 
                "--------------------------------------------------------------------" +
                    "Venue Name: " + response.data[i].venue.name + 
                    "Venue Location: " + response.data[i].venue.city +
                    "Date of the Event: " + moment(dateArr[0], "MM-DD-YYYY"); 
            console.log(concertResults);
        }
    })
    .catch(function (error) {
        console.log(error);
    });}