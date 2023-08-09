// Toggle Seizure
$(function () {
  $('[id="ToggleSeizure"]').change(function () {
    if ($(this).is(':checked')) {
      $(this).next(".switch-label").attr("data-state", "Toggled On");
      $("html").addClass("SeizureSafe");
      addWidgetControls('ToggleSeizure', 'Seizure safe')
    } else {
      $("html").removeClass("SeizureSafe");
      removeWidgetControls(['ToggleSeizure'])
    }
    widgetItemObj.isSeizureSafe = !widgetItemObj.isSeizureSafe

    checkIfWidgetActive()
  });
});

$(document).ready(function () {


  // read the current/previous setting
  $("input.switch-input[type=checkbox]").each(function () {
    //get name of input
    var name = $(this).attr('name');
    if ($.cookie(name) && $.cookie(name) == "true") {
      $(this).prop('checked', $.cookie(name));
      $("body").addClass(name);

      //If ToggleSeizure is checked add name value to html, not body
      if ($('[id="ToggleSeizure"]').is(':checked')) {
        $("html").addClass(name);
        $("body").removeClass(name);
      }


    }// end of if
  });//end of each
  // event management
  $("input.switch-input[type=checkbox]").change(function () {
    var name = $(this).attr("name");
    $.cookie(name, $(this).prop('checked'), { path: '/', })
  });
});