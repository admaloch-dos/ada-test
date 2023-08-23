
// Toggle Seizure
$(function () {
  $('[id="ToggleSeizure"]').change(function () {
    if ($(this).is(':checked')) {
      $("html").addClass("SeizureSafe");
      addWidgetControls('ToggleSeizure', 'Photosensitivity filter')
      widgetItemObj.isSeizureSafe = true
      if (!widgetItemObj.isLowSat) {
        $("html").addClass("lowsaturation");
      }
    } else {
      $("html").removeClass("SeizureSafe");
      $("body").removeClass("SeizureSafe");
      removeWidgetControls(['ToggleSeizure'])
      widgetItemObj.isSeizureSafe = false
      if (!widgetItemObj.isLowSat) {
        $("html").removeClass("lowsaturation");
      }
    }
    checkIfWidgetActive()
  });
});


if ($.cookie('SeizureSafe') == "true") {
  $('#ToggleSeizure').prop('checked', true).trigger('change')
  if (!widgetItemObj.isLowSat) {
    $("html").addClass("lowsaturation");
  }
}