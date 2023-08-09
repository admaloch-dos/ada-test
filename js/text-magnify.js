let textMagY = 120;
document.addEventListener('scroll', () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  const adaModal = document.querySelector('#ADA_widget')
  if (adaModal.style.display !== 'flex') {
    if (window.scrollY >= scrollableHeight - 1) { // at bottom of page
      textMagY = 180
    } else if (window.scrollY === 0) { // at top of page
      textMagY = 20
    } else {
      textMagY = 120
    }
  }
})

//////////// Text Magnify ///////////////////
$(document).on('mousemove', function (e) {
  const textMagnify = document.querySelector('#text_magnify')
  $('#text_magnify').css({
    left: e.pageX + 10,
    top: e.pageY - textMagY
  });
});

// Toggle Text Magnifier
$(function () {
  $('[id="ToggleTextMagnifier"]').change(function () {
    if ($(this).is(':checked')) {
      $("body").addClass("TextMagnifier");
      $('#text_magnify').attr('style', 'display: none!important');
      $('p, a, :header, span, button, td').not('#ada-triggers, #ada-triggers ul, #ada-triggers ul li, #ada-triggers *').hover(
        function (e) {
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
          //do the mouseleave things here...
          $('#text_magnify').attr('style', 'display: none!important');
          //$("body").removeClass("TextMagnifier");
          $("body").not('p, a, :header, span, button, td').on("click", function () {
            $('#text_magnify').attr('style', 'display: none!important');
          });
        }
      ); //end of hover
      addWidgetControls('ToggleTextMagnifier', 'Text magnify')
      //$('[id="ToggleZoom"]').prop('checked',false);
    } else {
      $("body").removeClass("TextMagnifier");
      $('p, a, :header, span, button, td').not('#ada-triggers, #ada-triggers ul, #ada-triggers ul li, #ada-triggers *').hover(
        function (e) {
          //do the mouseleave things here...
          $('#text_magnify').attr('style', 'display: none!important');
          /*$("#text_magnify").css({
            "display": "none",
            "opacity": "0"});
            */
        });
      removeWidgetControls(['ToggleTextMagnifier'])
    } //end of else
    widgetItemObj.isTextMag = !widgetItemObj.isTextMag
    checkIfWidgetActive()
  }); //end of change
}); // end of function


$(document).ready(function () {


  // read the current/previous setting
  $("input.switch-input[type=checkbox]").each(function () {
    //get name of input
    var name = $(this).attr('name');
    if ($.cookie(name) && $.cookie(name) == "true") {
      $(this).prop('checked', $.cookie(name));
      $("body").addClass(name);

      //If ToggleTextMagnifier is checked
      if ($('[id="ToggleTextMagnifier"]').is(':checked')) {
        $("body").addClass(name);
        $("body").addClass("TextMagnifier");
        $('[id="ToggleZoom"]').prop('checked', false);
        $('#text_magnify').attr('style', 'display: block!important');
        $('p, a, :header, span, button, td').not('#ada-triggers, #ada-triggers ul, #ada-triggers ul li, #ada-triggers *').hover(
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

              $('#text_magnify').attr('style', 'display: none!important');
            }
          },
          function (e) {
            //do the mouseleave things here...
            $('#text_magnify').attr('style', 'display: none!important');
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

