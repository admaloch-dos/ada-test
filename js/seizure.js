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

const lowSatActive = document.querySelector('.lowsaturation')

// Toggle Seizure
$(function () {
  $('[id="ToggleSeizure"]').change(function () {
    // let currActive = $('.bg_form > li.active')
    let prevActiveString = ''

    if ($(this).is(':checked')) {
      let prevActiveId = document.querySelector('.bg_form li.active').id
      prevActiveString = `#${prevActiveId}`
      console.log(prevActiveString)
      $(this).next(".switch-label").attr("data-state", "Toggled On");
      $("html").addClass("SeizureSafe");
      addWidgetControls('ToggleSeizure', 'Seizure safe')
      widgetItemObj.isSeizureSafe = true

      if (widgetItemObj.isHighSat || !widgetItemObj.isDarkContrast && !widgetItemObj.isDesaturated && !widgetItemObj.isInverted && !widgetItemObj.isLowSat && !widgetItemObj.isHighSat) {
        console.log('high sat is checked')
        triggerLowSaturation()
      }
    } else {
      $("html").removeClass("SeizureSafe");
      removeWidgetControls(['ToggleSeizure'])
      widgetItemObj.isSeizureSafe = false
      if (widgetItemObj.isLowSat) {
        colorPresetToDefault()
        $(prevActiveString).addClass('active').siblings().removeClass('active');
      }

    }
    checkIfWidgetActive()
    console.log(widgetItemObj)
  });
});


