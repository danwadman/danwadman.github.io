  //Back to top button

  //Get the button
  var mybutton = document.getElementById("backtotop");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () { scrollFunction() };

  function scrollFunction() {
    if (document.body.scrollTop > 160 || document.documentElement.scrollTop > 160) {
      $( "#backtotop" ).addClass( "backtotopstyling" );
    } else {
      $( "#backtotop" ).removeClass( "backtotopstyling" );
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

