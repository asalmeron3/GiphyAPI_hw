  //-----------------Making of the Initial Buttons-------------------

  //the default topics for the buttons will be stored in an array
  var buttonsArray = ["bobs burgers", "archer", "tv show dexter","limitless", "sense8", "the last airbender", "doctor who", "firefly"];

  var numOfGifs = 10; //number of gif results per topic...for later use

  var sectionNum = 0; //I am making this variable called section number. I want to be able to track groups of 10 gifs. Once the GifSection has 20 gifs, I want to delete the previous 10 gifs but add the next 10

function MakeButtons(){
  //loop through the array of topics and create buttons for each one
  for (i = 0; i < buttonsArray.length; i++){
    //create & append a button to div "theButtonsAtTheTop" and add the class to each of the button and the data attribute that corresponds to the topic from the buttonsArray
    $(".theButtonsAtTop").append($("<button>").addClass("btn btn-default btn-primary topicToSearch").attr("data-name", buttonsArray[i]).text(buttonsArray[i]));
  }

}

MakeButtons();


//----------------------Making/Adding More Buttons------------------------

  //make a function that runs when the user clicks on the sumbit-button. THe function should take the input typed and push it to the buttonsArray AND also create a button to the buttonsAtTheTop div
  $("#clickToAddButton").on("click", function(event){
    $("#userGifSearch").empty();
    //prevent the submit button from clearing 
    event.preventDefault();
    $(".theButtonsAtTop").empty();
    //obtain & store the text that the user submitted
    var userInput = ($("#userGifSearch").val().trim()).toLowerCase();
    //check to make sure the input is not already a button in the array
    if(buttonsArray.indexOf(userInput) ==-1 && userInput!= ""){
      $(".theButtonsAtTop").empty();
      //add this text/string to the buttonsArray
      buttonsArray.push(userInput);
    }
    MakeButtons();
  })



//----------------------Use Ajax to get the Giphy API-----------------------

    // Make a variable to store you api key
    var apiKey = "56f6f3a6e79e4454ba6f3f22bef87372";


    //if the user types in some text for a new button, AND clicks on the button to submit, 
    $(document).on("click", ".topicToSearch", function(){

      var topic = $(this).attr("data-name");
      //make a variable to store the link to the giphy api AND appends the api Key to the link and the topic (the data-name) from the button clicked AND limit the results to 6
      var queryURL = "https://api.giphy.com/v1/gifs/search?&limit=" + numOfGifs + "&api_key=" + apiKey + "&q=" + topic;
      
      sectionNum++;


      //use the method "ajax" to search the api for the gifs we want to see
      $.ajax({
        url: queryURL,
        method: "GET" 
      }).done(function(gifResults) {
        
        for (j = 0; j < numOfGifs; j++){
          //create a div that will store the image and the text under the image. this div will also be stored in the "theLeftGifContainer" div
          var oneGifContainer = $("<div>");
          // for 3 images per row, the width of each div should be 4 (12 / 3 = 4) [12 because all parent divs in bootstrap are 12 columns wide]
            oneGifContainer.addClass("col-xs-4 col-sm-4 col-md-4 col-lg-4  gifBlock");
            oneGifContainer.attr("id", "Group-" + sectionNum);

          //create a small individual img tag for the static gif  . 
          var theImage = $("<img>")
            //Add the link to the static image (as the src)
            theImage.attr("src", gifResults.data[j].images.fixed_height_small_still.url);
            //, add a data attribute that contains the link to a still image,
            theImage.attr("dataIfStill",gifResults.data[j].images.fixed_height_small_still.url);
            // another for an animated image
            theImage.attr("dataIfAnimated",gifResults.data[j].images.fixed_height_small.url); 
            //data attribute that tells whether the image is currently animated or still
            theImage.attr("currently", "still");
            //, a class for entire div (useful for later when we want to click on div)
            theImage.addClass("gif");

          // Create a paragraph tag that will show/contain the gif's rating
          var theRating = $("<p>").text("Rating: " + gifResults.data[j].rating);

          //append the paragraph tag and the image to your OneGifContainer
          var theImgNtheRating = oneGifContainer.append(theImage).append(theRating);

          //append the single "OneGifContainer" to theLeftGifContainer (the left container hold all of our static gif; 3 per row)
          $(".theLeftGifContainer").prepend(theImgNtheRating);

          if (sectionNum >2){
            $("#Group-" + (sectionNum-1)).remove();
          }

        }
        
      });

    });




    //-----------------------Clicking on a Gif--------------------------
    
    //query the entire document for when the user clicks on a gif (with the class "gif")
    $(document).on("click",".gif", function(){

      //check the clicked on gif's attribute called "currently" and store that attribute in a variable (for comparing)
      var state = $(this).attr("currently");
        //if the attribute is "still"...
        if (state == "still"){
          //change the "src" to the animated link stored in the "dataIfAnimated" attibute
          $(this).attr("src", $(this).attr("dataIfAnimated"));
          //also change the "currently" attribute to animate (as it will now be animated)
          $(this).attr("currently", "animate");

        }
        //if the attribute is "animated...

        else if (state == "animate"){
          //revert the "src" back to a still image
          $(this).attr("src", $(this).attr("dataIfStill"));
          //revert the attribute named "currently", back to "still"
          $(this).attr("currently", "still");

        }

    })
