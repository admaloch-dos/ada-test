
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

if ($.cookie("edit-reading-guide") === 'true') {
  $("#edit-reading-guide").css("display", "flex").hide().fadeIn()
}

// Toggle Reading Guide
$(function () {
  $('[id="ToggleReadingGuide"]').change(function () {
    if ($(this).is(':checked')) {
      $("#edit-reading-guide").css("display", "flex").hide().fadeIn()
      $.cookie("edit-reading-guide", true, { path: '/' });
      $("#tail").hide()
      $("body").addClass("CursorGuide");
      $("#tail").fadeIn(500)
      addWidgetControls('ToggleReadingGuide', 'Reading guide')
      widgetItemObj.isReadingGuide = true
    } else {
      $("#edit-reading-guide").fadeOut()
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

// //////////// Reading Mask size ///////////////////
// change mask size
let guideYVal = 8

var guideSizeCookieVal = $.cookie("readingGuideHeight");
if (guideSizeCookieVal) {
  guideYVal = guideSizeCookieVal
  $("#guide-size-input").val(guideYVal).change()
  $("#tail").css({ "height": guideYVal });
}

const guideSizeInputRange = document.getElementById('guide-size-input')
guideSizeInputRange.addEventListener('change', () => {
  guideYVal = guideSizeInputRange.value
  $.cookie("readingGuideHeight", guideYVal, { path: '/' })
  $("#tail").css({ "height": guideYVal });
})

$(document).bind('mousemove', function (e) {
  $('#tail').css({
    left: 0,
    top: e.pageY - (parseInt(guideYVal) + 12)
  });
});



var guideColorCookieVal = $.cookie("readingGuideColor");
if (guideColorCookieVal) {
  changeColorPicker(guideColorCookieVal, '#tail', '#guide_hexVal', "#guide_color")
}

// change guide color
const guideColorChangeInput = document.getElementById('guide_color')
guideColorChangeInput.addEventListener('change', () => {
  changeColorPicker(guideColorChangeInput.value, '#tail', '#guide_hexVal')
  $.cookie("readingGuideColor", guideColorChangeInput.value, { path: '/' })
})

//reset cookies
const resetGuideSettingsCookies = () => {
  $.removeCookie('readingGuideHeight');
  $.removeCookie('readingGuideColor');
}

// restore default
const restoreDefaultguideSettings = () => {
  changeColorPicker('#363636', '#tail', '#guide_hexVal', "#guide_color")
  guideYVal = 8
  $("#guide-size-input").val(guideYVal)
  $("#tail").css({ "height": guideYVal });
  resetGuideSettingsCookies()
}



