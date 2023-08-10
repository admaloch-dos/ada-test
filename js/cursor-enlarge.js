$(document).ready(function () {
  $("#ADA_widget #Cur_Default").addClass("active");
});

$(function () {
  $('.cursorSwap_form .form-check ul li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
});

const restoreDefaultCursorSize = () => {
  $('body').removeClass('Cursor_Enlarge');
  $('#Cur_Default').addClass('active').siblings().removeClass('active');
  if ($.cookie('CursorEnlargeCookie') == "yes") {
    $.cookie("CursorEnlargeCookie", null, {
      path: '/'
    });
  }
  removeWidgetControls(['Cursor_Enlarge_option'])
  widgetItemObj.isCursorBig = false
  checkIfWidgetActive()
}



// Cookie for CursorEnlarge
$(document).ready(function () {
  // Check (onLoad) if CursorEnlargeCookie is there and set the class to body if it is
  // Add active class to li
  if ($.cookie('CursorEnlargeCookie') == "yes") {
    $("#ADA_widget #Cur_Enlarge").addClass("active").siblings().removeClass('active');
    $("body").addClass("Cursor_Enlarge");
    // $("#ADA_widget #Cur_Default").removeClass("active");
  }

  // When input is clicked save cookie for 30days
  $("#ADA_widget a.Cursor_Enlarge_option").click(function () {
    if ($.cookie('CursorEnlargeCookie') == "undefined" || $.cookie('CursorEnlargeCookie') == "no") {
      $.cookie('CursorEnlargeCookie', 'yes', { path: '/' });
      $("body").addClass("Cursor_Enlarge");
    } else {
      $.cookie('CursorEnlargeCookie', 'yes', { path: '/' });
      $("body").addClass("Cursor_Enlarge");
      addWidgetControls('Cursor_Enlarge_option', 'Change cursor')
    }
    widgetItemObj.isCursorBig = true
    checkIfWidgetActive()
  });



  //When 'a.Cursor_Default' is clicked, removes 'CursorEnlarge' and erases CursorEnlargeCookie
  $("#ADA_widget a.Cursor_Default").click(function () {
    restoreDefaultCursorSize()
  });

});

