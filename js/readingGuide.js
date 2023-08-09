
$(document).ready(function () {


  // read the current/previous setting
  $("input.switch-input[type=checkbox]").each(function () {
    //get name of input
    var name = $(this).attr('name');
    if ($.cookie(name) && $.cookie(name) == "true") {
      $(this).prop('checked', $.cookie(name));
      $("body").addClass(name);
      //If ToggleTTS_click is checked


      //If ToggleReadingGuide is checked
      if ($('[id="ToggleReadingGuide"]').is(':checked')) {
        $("body").addClass(name);
      }

    }// end of if
  });//end of each
  // event management
  $("input.switch-input[type=checkbox]").change(function () {
    var name = $(this).attr("name");
    $.cookie(name, $(this).prop('checked'), { path: '/', })
  });
});

// Toggle Reading Guide
$(function () {
  $('[id="ToggleReadingGuide"]').change(function () {
    if ($(this).is(':checked')) {
      $("#tail").hide()
      $("body").addClass("CursorGuide");
      $("#tail").fadeIn(500)
      addWidgetControls('ToggleReadingGuide', 'Reading guide')
      widgetItemObj.isReadingGuide = true
    } else {
      $("#tail").fadeOut(500)
      setTimeout(() => {
        $("body").removeClass('CursorGuide');
      }, 500);
      removeWidgetControls(['ToggleReadingGuide'])
      widgetItemObj.isReadingGuide = false
    }


    checkIfWidgetActive()
  });
});


