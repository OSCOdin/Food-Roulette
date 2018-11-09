var restaurantUrl = [];
var restaurantOptions = [];
var restaurantCoord = [];
var latitude1 = 0;
var longitude1 = 0;
var text;

//setting global variables to change later
var pos = "";
var lat1 = 0;
var lon1 = 0;
var map, infoWindow;

// // function to create map

function setCords(locationObject) {
    latitude1 = locationObject.latitude;
    longitude1 = locationObject.longitude;
}

function initMap() {
    console.log("random")
    var resturantLocation = {
        lat: latitude1,
        lng: longitude1
    }
    // actual map being created
    var map = new google.maps.Map(
        document.getElementById('map'), {
            center: resturantLocation, //AP: Center the map around the selected resturant rather than the other location
            zoom: 15, //AP: Updated zoom level so the map appears a bit closer; the higher this number, the closer is the map
        });
    // creating markers for map
    var marker1 = new google.maps.Marker({
        position: resturantLocation,
        map: map,
        title: 'Your chosen resturant' //AP: Text appears when marker is hovered
    })
    // setting position of map
    console.log("test")
    console.log(resturantLocation)
    marker1.setMap(map);
}
var location1 = null;

function YelpCall() {
    //event to ask for user location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            //getting location for google maps
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            // getting location for yelp
            lat1 = position.coords.latitude;
            lon1 = position.coords.longitude;
            console.log(lat1, lon1)

            //yelp api
            const apiKey =
                'gMIHJxXUTxTdI3_v6Rnzo7uD3wZQcQ4sYrppHS3xRRGQM7iRvtaCPunKOB1auZmzlxJG2cvpmhPNc2WPRaxux6DYqUKT15Cxu_U5pF9bsOe--uerTHBNZ-x3LvXYW3Yx';
            const yelpUrl = 'https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=' +
                lat1 + '&longitude=' + lon1 + '&limit=9';
            const proxyUrl = 'https://shielded-hamlet-43668.herokuapp.com/';
            $.ajax({
                    async: false,
                    url: proxyUrl + yelpUrl,
                    method: 'GET',
                    headers: {
                        authorization: 'Bearer ' + apiKey
                    }
                }).then(function (response) {
                    console.log(response);
                    for (let i = 0; i < response.businesses.length; i++) {
                        restaurantOptions.push(response.businesses[i].name);
                        restaurantCoord.push(response.businesses[i].coordinates);
                        restaurantUrl.push(response.businesses[i].url);
                        console.log(restaurantCoord)
                        drawRouletteWheel()

                    }
                })
                .catch(error => {
                    console.error(error);
                });
            //event handlers for location error
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
    console.log(lat1, lon1)
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
console.log(lat1, lon1)
//calls yelp api to start function
YelpCall();
