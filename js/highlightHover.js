// Toggle Highlight Hover
$(function () {
  $('[id="ToggleHighlightHover"]').change(function () {
    let isHighlightHover = false
    if ($(this).is(':checked')) {
      $("body").addClass("HighlightHover");
      addWidgetControls('ToggleHighlightHover', 'Highlight on hover')
    } else {
      $("body").removeClass("HighlightHover");
      removeWidgetControls(['ToggleHighlightHover'])
      console.log('toggle highlight control')
    }

    widgetItemObj.isHighlighted = !widgetItemObj.isHighlighted

    checkIfWidgetActive()
  });

});