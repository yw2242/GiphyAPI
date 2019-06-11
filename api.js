$(document).ready(function() {

    onload = document.getElementById("input").value=""

    // create an array for the categories
    var animals = ["cat", "bird", "dog", "fish", "rabbit", "monkey", "panda", "lion", "bear"];


    function displayAnimals() {
        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=AhUbAzJjmfaOu1O0URVc7zrzPrzncMo3&q=" + animal + "&limit=10&offset=0";
        console.log(queryURL);

        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
            console.log(response);
  
            for (var j = 0; j < animals.length; j++) {
             
                var gifDiv = $("<div>");
                var animate = response.data[j].images.fixed_height.url;
                var static = response.data[j].images.fixed_height_still.url;
                var pic = $("<img>");
            
            
                pic.attr("src", static);
                pic.addClass("move");
                pic.attr("data-state", "still");
                pic.attr("data-still", static);
                pic.attr("data-animate", animate);
          

              var rating = results[j].rating;

              var p = $("<p>").text("Rating: " + rating);
  
      
            //   var animalImage = $("<img>");
            //   animalImage.attr("src", results[j].images.fixed_height.url);
  
              gifDiv.prepend(p);
              gifDiv.prepend(pic);
  
              $("#giphy").prepend(gifDiv);
            }
          });
        }



    // Function for displaying giphy data
    function renderButtons() {

      // Deleting the movie buttons prior to adding new buttons
      // (this is necessary otherwise we will have repeat buttons)
      $("header").empty();

      // Looping through the array of animals
      for (var i = 0; i < animals.length; i++) {

        // Then dynamicaly generating buttons for each animal in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        a.addClass("animalBtn");
        // Adding a data-attribute with a value of the animal at index i
        a.attr("data-animal", animals[i]);
        // Providing the button's text with a value of the animal at index i
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

      // calling renderButtons which handles the processing of the animals array
      renderButtons();
    });

    // Calling the renderButtons function at least once to display the initial list of animals
    renderButtons();

    $(document).on("click", ".animalBtn", displayAnimals);


    $(document).on("click", ".move", animation);


    function animation() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }

        }


});