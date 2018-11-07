var name;
var zip;

// take user name and zip and pull restaurants from yelp api and fill wheel
$(document).on('click', '#submit', function (e) {
    // append list of restaurants from yelp to restaurantOptions array

    // Populate greeting section with spin button
    $('#greeting').append("Hello " + name + "." + " Click here to find out where you're eating: " + '<input type="button" value="Spin!" id="spin" />');

});

// on click restaurant name populates container along with map image from google api
// $(document).on('click', '#spin', function (e) {

//     $('#map').prepend('<img src="smiley.gif" alt="Smiley face" height="42" width="42">');
// });

// Empty restaurant picked / greeting / wheel
// $('#details').val("");
// $('#greeting').val("");
// $('#canvas').val("");

// yelp API
// functino yelpCall() {
    const apiKey =
        'gMIHJxXUTxTdI3_v6Rnzo7uD3wZQcQ4sYrppHS3xRRGQM7iRvtaCPunKOB1auZmzlxJG2cvpmhPNc2WPRaxux6DYqUKT15Cxu_U5pF9bsOe--uerTHBNZ-x3LvXYW3Yx';
    const yelpUrl = 'https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=40.0580608&longitude=-75.5802112&distance=16093.4&limit=10';
    const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';
    $.ajax({
        url: proxyUrl + yelpUrl,
        method: 'GET',
        headers: {
            authorization: 'Bearer ' + apiKey
        }
    }).then(function (response) {

        for (let i = 0; i < response.businesses.length; i++) {

            restaurantOptions.push(response.businesses[i].name);
            restaurantCoord.push(Response.coordinates);
            console.log(response)
        }
        drawRouletteWheel();
    })

        .catch(error => {
            console.error(error);

        });

// }

var yelpList = [];
// Google API

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDYq6U-Ef_3VqToxXHZPLY8xnQMff_2HIk",
    authDomain: "ravenous-roulette.firebaseapp.com",
    databaseURL: "https://ravenous-roulette.firebaseio.com",
    projectId: "ravenous-roulette",
    storageBucket: "ravenous-roulette.appspot.com",
    messagingSenderId: "172735416002"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

// Capture Button Click
$("#submit").on("click", function (event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    zip = $("#zip-input").val().trim();

    // Code for the push
    dataRef.ref().push({

        name: name,
        zip: zip,
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
        " </span></div>");

    // Clear forms
    $("#name-input").val("");
    $("#zip-input").val("");

    // incorrect user input formatting
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function (snapshot) {
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#zip-display").text(snapshot.val().zip);
});