//https://stackoverflow.com/questions/13936865/jquery-save-checkbox-state-on-click-in-cookie
$(document).ready(function () {


  // read the current/previous setting
  $("input.switch-input[type=checkbox]").each(function () {
    //get name of input
    var name = $(this).attr('name');
    if ($.cookie(name) && $.cookie(name) == "true") {
      $(this).prop('checked', $.cookie(name));
      $("body").addClass(name);


      //If ToggleTTS_click is checked
      if ($('[id="ToggleTTS_click"]').is(':checked')) {
        $("body").addClass("TTS_click_enabled");

      }

      //If ToggleSeizure is checked add name value to html, not body
      if ($('[id="ToggleSeizure"]').is(':checked')) {
        $("html").addClass(name);
        $("body").removeClass(name);

      }

      //If ToggleReadingMask is checked
      if ($('[id="ToggleReadingMask"]').is(':checked')) {
        $("body").addClass(name);
        $("body").addClass("ReadingMask_ON");
        $("#top_mask").fadeIn('slow')
        $("#bottom_mask").fadeIn('slow')
      }

      //If ToggleReadingGuide is checked
      if ($('[id="ToggleReadingGuide"]').is(':checked')) {
        $("body").addClass(name);
        //$("body").addClass("ReadingMask_ON");
        //$("#top_mask").css("display", "block");
        //$("#bottom_mask").css("display", "block");
      }

      //If ToggleTextMagnifier is checked
      if ($('[id="ToggleTextMagnifier"]').is(':checked')) {
        $("body").addClass(name);
        $("body").addClass("TextMagnifier");
        $('[id="ToggleZoom"]').prop('checked', false);
        $('#text_magnify').attr('style', 'display: block!important');
        $('p, a, :header, span, button, td').hover(
          function (e) {

            //do the mouseenter things here...
            //Gets text inside element tag and copies into #text_magnify div
            var TextMagnify = $(this).text();
            $("#text_magnify").text(TextMagnify);
            //$("body").addClass("TextMagnifier");
            $('#text_magnify').fadeIn('quick')
            /*$("#text_magnify").css({
              "display": "block",
              "opacity": "1"});
              */
            //If #text_magnify is empty, hide
            if (TextMagnify === '') {
              $('#text_magnify').attr('style', 'display: none!important');

            }

            if ($('#text_magnify').is(':empty')) {

              //$("body").removeClass("TextMagnifier");
              $('#text_magnify').attr('style', 'display: none!important');

              // $('#text_magnify').css({
              //"opacity": "0"});
            }

          },
          function (e) {
            //do the mouseleave things here...

            $('#text_magnify').attr('style', 'display: none!important');


            //$("body").removeClass("TextMagnifier");
            // $("#text_magnify").css({
            //   "display": "none",
            //   "opacity": "0"
            // });



          }

        );//end of hover
        $(window).scroll(function () {
          $('#text_magnify').attr('style', 'display: none!important');

        });

      }// if not checked
      else {
        $("body").removeClass("TextMagnifier");
        $('#text_magnify').attr('style', 'display: none!important');
      }
    }// end of if

  });//end of each
  // event management
  $("input.switch-input[type=checkbox]").change(function () {
    var name = $(this).attr("name");
    $.cookie(name, $(this).prop('checked'), { path: '/', })
  });
});

// Toggle Text Magnifier
$(function () {
  $('[id="ToggleTextMagnifier"]').change(function () {

    if ($(this).is(':checked')) {

      $("body").addClass("TextMagnifier");
      $('#text_magnify').attr('style', 'display: none!important');
      $('p, a, :header, span, button, td').hover(
        function (e) {
          console.log('show text')
          //do the mouseenter things here...
          //Gets text inside element tag and copies into #text_magnify div

          var TextMagnify = $(this).text();
          $("#text_magnify").text(TextMagnify);
          //$("body").addClass("TextMagnifier");
          $('#text_magnify').fadeIn(100)
          /*
          $("#text_magnify").css({
            "display": "block",
            "opacity": "1"});
            */

          //If #text_magnify is empty, hide
          if ($('#text_magnify').is(':empty')) {
            console.log('empty')
            //$('#text_magnify').css({
            //"opacity": "0"});
            //$("body").removeClass("TextMagnifier");
            $('#text_magnify').attr('style', 'display: none!important');
            //   $('body').click(function() {
            //     $('#text_magnify').attr('style', 'display: none!important');
            //  });
          }
        },
        function (e) {
          console.log('empty')
          //do the mouseleave things here...
          $('#text_magnify').attr('style', 'display: none!important');

          //$("body").removeClass("TextMagnifier");
          $("body").not('p, a, :header, span, button, td').on("click", function () {
            $('#text_magnify').attr('style', 'display: none!important');
          });
        }
      ); //end of hover

      //$('[id="ToggleZoom"]').prop('checked',false);
    } else {

      $("body").removeClass("TextMagnifier");
      $('p, a, :header, span, button, td').hover(
        function (e) {
          //do the mouseleave things here...

          $('#text_magnify').attr('style', 'display: none!important');
          /*$("#text_magnify").css({
            "display": "none",
            "opacity": "0"});
            */
        });
    } //end of else
  }); //end of change
}); // end of function