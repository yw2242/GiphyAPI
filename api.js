$(document).ready(function() {

    // create an array for the categories
    var animals = ["Cat", "Bird", "Dog", "Fish", "Rabbit", "Monkey", "Panda", "Lion", "Bear"];

    // Function for displaying movie data
    function renderButtons() {

      // Deleting the movie buttons prior to adding new movie buttons
      // (this is necessary otherwise we will have repeat buttons)
      $("header").empty();

      // Looping through the array of movies
      for (var i = 0; i < animals.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-animal", animals[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(animals[i]);
        // Adding the button to the HTML
        $("header").append(a);
      }
    }

    // This function handles events where one button is clicked
    $("#submit").on("click", function(event) {
      // event.preventDefault() prevents the form from trying to submit itself.
      // We're using a form so that the user can hit enter instead of clicking the button if they want
      event.preventDefault();

      // This line will grab the text from the input box
      var text = $("#input").val().trim();
      // The movie from the textbox is then added to our array
      animals.push(text);

      // calling renderButtons which handles the processing of our movie array
      renderButtons();
    });

    // Calling the renderButtons function at least once to display the initial list of movies
    renderButtons();






    // generic function for capturing the movie name from the data-attribute

    $("button").on("click", function() {
        // var data = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animals + "&api_key=AhUbAzJjmfaOu1O0URVc7zrzPrzncMo3&limit=5";
        console.log(queryURL);

        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
            console.log(response);
  
            for (var j = 0; j < results.length; j++) {
              var gifDiv = $("<div>");

              var rating = results[j].rating;

              var p = $("<p>").text("Rating: " + rating);
  
      
              var animalImage = $("<img>");
              animalImage.attr("src", results[j].images.fixed_height.url);
  
              gifDiv.prepend(p);
              gifDiv.prepend(animalImage);
  
              $("#giphy").prepend(gifDiv);
            }
          });
      });


      $(animalImage).on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });



});