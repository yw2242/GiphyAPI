// create an array for the categories



// api key
var queryURL = "" + movie + "AhUbAzJjmfaOu1O0URVc7zrzPrzncMo3";

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#movie-view").text(JSON.stringify(response));
  });



// generic function for capturing the movie name from the data-attribute



// Here we grab the text from the input box
