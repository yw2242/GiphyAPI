$(document).ready(function() {

    // create an array for the categories
    var animals = ["Cat", "Bird", "Dog", "Fish", "Rabbit", "Monkey", "Panda", "Lion", "Bear", "Crab"];

    function renderButton(animals) {
        var $btn = $("<button>");
            .addClass("animalBtn")
            .attr("data-name", animals);
            .text(animals);

        $("header").append($btn);
    }





    // generic function for capturing the movie name from the data-attribute

    $(document).on("click", ".animalBtn", function() {
        // api key
        var queryURL = "" + animals + "AhUbAzJjmfaOu1O0URVc7zrzPrzncMo3";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            $("#giphy").text(JSON.stringify(response));
        });
    })


    // Here we grab the text from the input box



}