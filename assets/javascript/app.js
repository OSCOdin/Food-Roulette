// on click restaurant name populates container along with map image from google api
$(document).on('click', '#spin', function (e) {
    // append list of restaurants from yelp to restaurantOptions array

    $('#restaurantPick').prepend('<h1>"YOU ARE EATING HERE: " + <span id="restaurantPick">Picked Restaurant</span></h1>');
    $('#details').prepend('<h3>Address / Rating / other info</h3>');
    $('#map').prepend('<img src="smiley.gif" alt="Smiley face" height="42" width="42">');
});

// yelp API
var zipCode = $('#user-input').val();
const apiKey =
    'gMIHJxXUTxTdI3_v6Rnzo7uD3wZQcQ4sYrppHS3xRRGQM7iRvtaCPunKOB1auZmzlxJG2cvpmhPNc2WPRaxux6DYqUKT15Cxu_U5pF9bsOe--uerTHBNZ-x3LvXYW3Yx';
const yelpUrl = 'https://api.yelp.com/v3/businesses/search?location=${zipCode}';
const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';
$.ajax({
    url: proxyUrl + yelpUrl,
    headers: {
        authorization: 'Bearer ' + apiKey
    }
    drawRouletteWheel();
})
    .done(response => {
        console.log(response);
          // Constructing HTML containing the artist information
      var artistName = $("<h1>").text(response.name);
      var artistURL = $("<a>").attr("href", response.url).append(artistName);
      var artistImage = $("<img>").attr("src", response.thumb_url);
      var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
      var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
      var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

      // Empty the contents of the artist-div, append the new artist content
      $("#artist-div").empty();
      $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);

    })
    .catch(error => {
        console.error(error);

    });


// Google API
// var zipCode = $('#user-input').val();
// const apiKey =
//     'gMIHJxXUTxTdI3_v6Rnzo7uD3wZQcQ4sYrppHS3xRRGQM7iRvtaCPunKOB1auZmzlxJG2cvpmhPNc2WPRaxux6DYqUKT15Cxu_U5pF9bsOe--uerTHBNZ-x3LvXYW3Yx';
// const yelpUrl = 'https://api.yelp.com/v3/businesses/search?location=${zipCode}';
// const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';
// $.ajax({
//     url: proxyUrl + yelpUrl,
//     headers: {
//         authorization: 'Bearer ' + apiKey
//     }
// })
//     .done(response => {
//         console.log(response);

//     })
//     .catch(error => {
//         console.error(error);

//     });

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAJcW9C5QN4CxpvOSaUjzfiXqC0zzb07Gs",
    authDomain: "foodroulette-2ed40.firebaseapp.com",
    databaseURL: "https://foodroulette-2ed40.firebaseio.com",
    projectId: "foodroulette-2ed40",
    storageBucket: "",
    messagingSenderId: "619984592173"
  };
  firebase.initializeApp(config);

var dataRef = firebase.database();

// Capture Button Click
$("#add-user").on("click", function (event) {
    event.preventDefault();

    var name = $("#name-input").val().trim();
    var zip = $("#zip-input").val().trim();
    // var cuisine = $("#cuisine-input").val().trim();

    // Code for the push
    dataRef.ref().push({

        name: name,
        zip: zip,
        cuisine: cuisine,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

dataRef.ref().on("child_added", function (childSnapshot) {

    // log variables
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().zip);
    console.log(childSnapshot.val().cuisine);

    $("#full-user-list").append("<div class='well'><span class='user-name'> " +
        childSnapshot.val().name +
        " </span><span class='user-zip'> " + childSnapshot.val().zip +
        " </span><span class='user-cuisine'> " + childSnapshot.val().cuisine +
        " </span></div>");

    // Clear forms
    $("#name-input").val("");
    $("#zip-input").val("");
    // $("#cuisine-input").val("");

    // incorrect user input formatting
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function (snapshot) {
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#zip-display").text(snapshot.val().zip);
    $("#cuisine-display").text(snapshot.val().cuisine);
});

var yelpList = [];
var restaurantOptions = [];
var restaurantPick;
var rollStarted = false;

function resetRoll() {
    rollStarted = false;

    restaurantOptionIndex = Math.floor(Math.random() * (yelpList.length));

    for (var i = 0; i < possibleNames[currentNameIndex].length; i++) {

    }
    // document.getElementById.......

    // updateDisplay();
};