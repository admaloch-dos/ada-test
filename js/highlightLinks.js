
// Toggle Highlight Links
$(function () {
  $('[id="ToggleHighlightLinks"]').change(function () {
    if ($(this).is(':checked')) {
      $("body").addClass("HighlightLinks");
      addWidgetControls('ToggleHighlightLinks', 'Highlight all links')
    } else {
      $("body").removeClass("HighlightLinks");
      removeWidgetControls(['ToggleHighlightLinks'])
    }
    widgetItemObj.isOutlined = !widgetItemObj.isOutlined

    checkIfWidgetActive()
  });
});