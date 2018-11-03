 // $yelp_styleguide.templates.lib.business.passports.render_photo_box(BusinessPresenter, size)
 var zipCode = $('#user-input').val();
 const apiKey =
     'gMIHJxXUTxTdI3_v6Rnzo7uD3wZQcQ4sYrppHS3xRRGQM7iRvtaCPunKOB1auZmzlxJG2cvpmhPNc2WPRaxux6DYqUKT15Cxu_U5pF9bsOe--uerTHBNZ-x3LvXYW3Yx';
 const yelpUrl =
     'https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=40.0580608&longitude=-75.5802112&limit=50';
 // const yelpUrl = 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=${zipCode}';
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
 

 // foodOptions = ["pizza", "chinese", "italian", "mexican", "thai", "burgers", "diners", "latin", "bbq", "pubs", "american", "tradamerican", "newamerican", "indian", "breakfast", "breakfast_brunch", "steakhouse"]
 // restaurantsSearch(restaurant, callback) {
 //     return this.get('restaurants', restaurant, callback);
 // }