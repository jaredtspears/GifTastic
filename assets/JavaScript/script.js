
//global vars

//url is working added officespace after the q=. should remove this for something like:
//"https://api.giphy.com/v1/gifs/search?q=" + MovieRefInput + "&apiKey=iN6BUxJhH6HZCWIAFBGNbMiNRKqhIjhQ"
var queryURL = "https://api.giphy.com/v1/gifs/search?q=OfficeSpace&apiKey=iN6BUxJhH6HZCWIAFBGNbMiNRKqhIjhQ"

//making a variable for the data name to be entered into the queryURL
var officeSpace = $(this).attr("data-name");//should maybe add in the MovieRefInput from line 22

// ajax call
$.ajax({
    url:queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
});

//main game function
$("#addMovieRef").on("click", function() {
    event.preventDefault();
    var movie = $("#MovieRefInput").val().trim();
    movie.push(movie);
    renderButtons();
    return;
 })