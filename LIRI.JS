require("dotenv.env.txt").config();
var keys = require("./keys.js");
// case 'spotify-this-song':
        var spotify = new Spotify(keys.spotify);
        console.log('Spotify');
        spotify
          .search({ type: 'track', query: 'All the Small Things' })
          .then(function (response) {
            console.group(response.tracks.items[0].name);
            console.log('Artist Name: ' + response.tracks.items[0].artists[0].name);
            console.log('Album Name: ' + response.tracks.items[0].album.name);
            console.log('Preview Link: ' + response.tracks.items[0].artists[0].external_urls.spotify);
            console.groupEnd();
          })
          .catch(function (err) {
            console.log(err);
          });
        // break;