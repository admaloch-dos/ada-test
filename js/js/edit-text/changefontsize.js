// / change font size section ------------------------->
const restoreDefaultFontSize = () => {
  $('body').removeClass('fontSizeMedium');
  $("#FS_Default").addClass('active').siblings().removeClass('active');
  $.removeCookie('FontSizeCookie');
  removeWidgetControls(['FontSizeMedium'])
  widgetItemObj.isFontBig = false
  checkIfWidgetActive()
}

const increaseFontSize = () => {
  $('#FS_Medium').addClass('active').siblings().removeClass('active');
  $("body").addClass("fontSizeMedium");
  addWidgetControls('FontSizeMedium', 'Change font size')
  widgetItemObj.isFontBig = true
  $.cookie('FontSizeCookie', true, { expires: 30 });
  checkIfWidgetActive()
}

$(document).ready(function () {
  if ($.cookie('FontSizeCookie') == 'true') {
    increaseFontSize()
  }
  $("#flourish_widget a.FontSizeMedium").click(function () {
    increaseFontSize()
  });
  $("#flourish_widget a.FontSizeDefault").click(function () {
    restoreDefaultFontSize()
  });
});