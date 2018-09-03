
//global vars

const movie=["looks like someone has a case of the Monday's","Damn it feels good to be a gangster", "flare button", "Jump to Conclusions Map game "];
    console.log(movie);
   

    //**reminder #index0-button  #index1-button  #index2-button  #index3-button is already created in the html**
    //$("#index0-button").on("click", fuction(){ call ajax such see Cat Button})
function renderButtons(){
    //remember to call this empty() fuction BEFORE the for loop so the buttons 
    //do not stack from a prior rendering of the below for loop
    $("#index_i").empty();
    //know I will need a loop
    for(var i=0;i< movie.length; i++){
    var index_i = $("<button>");
        //calling the class text index_i to run through the movie array
        index_i.text(movie[i]);
        //setting class to movie buttons
        index_i.attr("class", "movieButtons");
        //var is now stored in the renderButton grabbing from a data value is better than text
        index_i.attr("data-phrase", movie[i]);
       
        //this is the index_i for the
        $("#index_i").append(index_i);
        
        //====adding the ratings here see ln 59 & 72 for an alternative attempt =====
            
        var rating = $("<p>").text("rating " + movie[i].rating);
             //currently loging object:object
            console.log("this should be the individualized rating: " + rating);
            //tested, the ratings are indeed beings withing the paramiters of R
            //the &ratings=R is not functioning... tested with it and without...
            //same gifs came up with and without it...trying to get rating of each 
            //individual gif
             $("movies").append(rating);
       //=============================================================================
    }
    
    //==========not sure why I had this div being emptied but it was throwing an error so I commented it out=======
 // $(div).empty();
    //==============================================================================================================
}

$(document).on("click", ".movieButtons", function(){

    var officeSpace = $(this).attr("data-phrase")
         //added limit to 10 gifs and rating limited up to R to the URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ officeSpace + "&apiKey=iN6BUxJhH6HZCWIAFBGNbMiNRKqhIjhQ&limit=10&ratings=g";
    $(".index_images").empty();

// ajax call
$.ajax({
    url:queryURL,
    method: "GET"
}).then(function(response){
    console.log(response.data[0].images.fixed_width_small);
    for(var i=0; i < 10; i++){ 
    var rating = $("<p>"); //just messing to see if this will call to ln 72
    var images = $("<img>");
        images.attr("class", "buttonsPreGen");
        //is the default 
        images.attr("src", response.data[i].images.fixed_width_still.url);
        //setting the still and animated stages, and still being the loaded state until clicked
        images.attr("data-still", response.data[i].images.fixed_width_still.url);
        images.attr("data-animate", response.data[i].images.fixed_width_downsampled.url);
        images.attr("data-state", "still");
       

    //=======trying to add the data rating to the images===============
      
        rating.attr("data-rating", response.data[i].rating.url);
         console.log("this should be the rating <p> element info: " + rating); //logging object:object still
    //================================================================
        //appending the iamges to the page
        $(".index_images").append(images);
    }
   });
})
//movie var buttons will be added here, and data state info from moving to still
$(document).on("click", ".buttonsPreGen", function(){
console.log(this);
  
    //know this style of if else was used on the static and animated portion of the pausing gif solution
    var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

})

//added by user click
$("#addMovieRef").on("click", function() {
    event.preventDefault();
    var movies = $("#MovieRefInput").val().trim();
    movie.push(movies);
    renderButtons();
    return;
 })
renderButtons();
