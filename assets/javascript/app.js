// on click restaurant name populates container along with map image from google api
$(document).on('click', '#submit', function (e) {
    $('#restaurantPicked').append('<h1>YOU ARE EATING HERE: <span id="restaurantPick"></span></h1>');
    $('#restaurantPicked').append('<h3></h3>');
    $('#restaurantPicked').append('<h3></h3>');
    $('#map').prepend('<img src="smiley.gif" alt="Smiley face" height="42" width="42">');
});

// yelp API
var zipCode = $('#user-input').val();
// const apiKey =
//     'gMIHJxXUTxTdI3_v6Rnzo7uD3wZQcQ4sYrppHS3xRRGQM7iRvtaCPunKOB1auZmzlxJG2cvpmhPNc2WPRaxux6DYqUKT15Cxu_U5pF9bsOe--uerTHBNZ-x3LvXYW3Yx';
const yelpUrl = 'https://api.yelp.com/v3/businesses/search?location=${zipCode}';
const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';
$.ajax({
    url: proxyUrl + yelpUrl,
    headers: {
        authorization: 'Bearer ' + apiKey
    }
})
    .done(response => {
        console.log(response);

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

// Initialize Firebase / Need to create a new database to store user name and data
var config = {
    // apiKey: "AIzaSyCs3K5zwuOuS0odq89IpPLC7HnXTOcDqgI",
    authDomain: "recent-user-with-all-use-e8e76.firebaseapp.com",
    databaseURL: "https://recent-user-with-all-use-e8e76.firebaseio.com",
    projectId: "recent-user-with-all-use-e8e76",
    storageBucket: ""
};

firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial Values
var name = "";
var zip = "";
// var cuisine = [“pizza”, “chinese”, “italian”, “mexican”, “thai”, “burgers”, “diners”, “latin”, “bbq”, “pubs”, “american”, “tradamerican”, “newamerican”, “indian”, “breakfast”, “breakfast_brunch”, “steakhouse”];

// Capture Button Click
$("#add-user").on("click", function (event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    zip = $("#zip-input").val().trim();
    cuisine = $("#cuisine-input").val().trim();

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

    // incorrect formatting input
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