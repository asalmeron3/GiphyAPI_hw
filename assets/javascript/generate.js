  //-----------------Making of the Initial Buttons-------------------

  //the default topics for the buttons will be stored in an array
  var buttonsArray = ["bobs burgers", "archer", "tv show dexter","limitless", "sense8", "the last airbender", "doctor who", "firefly"];

  var numOfGifs = 10; //number of gif results per topic...for later use


function MakeButtons(){
  //loop through the array of topics and create buttons for each one
  for (i = 0; i < buttonsArray.length; i++){
    //create & append a button to div "theButtonsAtTheTop" and add the class to each of the button and the data attribute that corresponds to the topic from the buttonsArray
    $(".theButtonsAtTop").append($("<button>").addClass("topicToSearch").attr("data-name", buttonsArray[i]).text(buttonsArray[i]));
  }

}

MakeButtons();


//----------------------Making/Adding More Buttons------------------------

  //make a function that runs when the user clicks on the sumbit-button. THe function should take the input typed and push it to the buttonsArray AND also create a button to the buttonsAtTheTop div
  $("#clickToAddButton").on("click", function(event){
    event.preventDefault();
    $(".theButtonsAtTop").empty();
    //obtain & store the text that the user submitted
    var userInput = ($("#userGifSearch").val().trim()).toLowerCase();
    //check to make sure the input is not already a button
    if(buttonsArray.indexOf(userInput) ==-1 && userInput!= ""){
      $(".theButtonsAtTop").empty();
      //add this text/string to the buttonsArray
      buttonsArray.push(userInput);
    }
    MakeButtons();
  })




    // Make a variable to store you api key
    var apiKey = "56f6f3a6e79e4454ba6f3f22bef87372";


    //upon the user typing and submitting their search,
    $(document).on("click", ".topicToSearch", function(){

      var topic = $(this).attr("data-name");
      //make a variable to store the link to the giphy api AND appends the api Key to the link and the topic (the data-name) from the button clicked AND limit the results to 6
      // using httpS
      var queryURL = "https://api.giphy.com/v1/gifs/search?&limit=" + numOfGifs + "&api_key=" + apiKey + "&q=" + topic;

      //use the method ajax to search the api for the gifs we want to see
      $.ajax({
        url: queryURL,
        method: "GET" 
      }).done(function(gifResults) {
    
        for (j = 0; j < numOfGifs; j++){
          //create a small individual img tag for the static gif. Add the link to the static image (as the src), add a data attribute that contains the link to a still image, another for an animated image, a class, text that will show the gif's rating, and a data attribute that tells whether the image is currently animated or still
          var oneGifContainer = $("<div>");
            oneGifContainer.addClass("col-xs-4 col-sm-4 col-md-4 col-lg-4 gifBlock")

          var theImage = $("<img>")

            theImage.attr("src", gifResults.data[j].images.fixed_height_small_still.url);

            theImage.attr("dataIfStill",gifResults.data[j].images.fixed_height_small_still.url);

            theImage.attr("dataIfAnimated",gifResults.data[j].images.fixed_height_small.url); 

            theImage.attr("currently", "still");

            theImage.addClass("gif");

          var theRating = $("<p>").text("Rating: " + gifResults.data[j].rating);

          var theImgNtheRating = oneGifContainer.append(theImage).append(theRating);

          $(".theLeftGifContainer").prepend(theImgNtheRating);

        }


        
      });



    })

    $(document).on("click",".gif", function(){

      var state = $(this).attr("currently");

        if (state == "still"){
          $(this).attr("src", $(this).attr("dataIfAnimated"));
          $(this).attr("currently", "animate");

        }
        // and update the data-state attribute to 'animate'.
        else if (state == "animate"){
          $(this).attr("src", $(this).attr("dataIfStill"));
          $(this).attr("currently", "still");

        }

    })
