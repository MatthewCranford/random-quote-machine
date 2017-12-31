$(document).ready(function(){

  var quote = "";
  var author = "";

  // Allows initial text on page load to fade in
  function fadeInText() {
    $("#quote-text, #quote-icon, #quote-author").css({
      "opacity": "1",
    });
  }

  // Return a random color
  function generateRandomColor() {
    var colors = [  "#d15151", "#8e2a31", //reds
                    "#b187bc", "#6f3d7c", //purples
                    "#9085e5", "#453b93", //blues
                    "#67bfbd", "#0d9ba3", //teals
                    "#76cc80", "#3d9957", //greens
                    "#dbce6b",            //yellows
                    "#f2af5e",            //oranges
    ];
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Display a random color scheme for page
  function randomColorScheme() {
    var randomColor = generateRandomColor();
  $("html, body, #quote-button").css({
    "background-color": randomColor,
    "border-color": randomColor,  
  });
  $("#quote-box, #quote-author, #tweet-button").css({
    "color": randomColor,
  });
}

  // Display a random quote
  function randomQuote() {
    var url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
    
    $.getJSON(url, function(json) {
      
      // Check for empty author string
      if (json.quoteAuthor === "") {
        return randomQuote();
      }
      else {
        author = json.quoteAuthor;
        quote = json.quoteText;
      $("#quote-text").html(quote);
      $("#quote-author").html("- " + author);
      }
    });
  }
  
  // Display random color scheme and quote on click event
  $("#quote-button").click(function(){

    // Set transition to none to avoid conflict with fadeOut
    $("#quote-text, #quote-icon, #quote-author").css({
      "transition": "none",
    });

    // Fades text; use promise method to avoid multiple calls for each selector in fadeOut
    $("#quote-icon, #quote-text, #quote-author").fadeOut(800, function() {  
    }).promise().done(function() {
      randomQuote();
      randomColorScheme();
      $("#quote-icon, #quote-text, #quote-author").fadeIn(1200);
    });
  });

  // Open new window with a tweet of quote and author
  $("#tweet-button").click(function(){
    $("#tweet").attr("href", "https://twitter.com/intent/tweet?hashtags=quotes&text=" + '"' + quote + '"' + " - " + author );
  });


  // Initial page load
  randomQuote();
  randomColorScheme();
  fadeInText();
});