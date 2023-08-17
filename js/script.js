//FOR BACKGROUND COLOR CHANGE -- ADDS ACTIVE CLASS TO LI WHEN CLICKED
//https://stackoverflow.com/questions/3972944/jquery-removeclass-on-parent-sibling-child
$(function () {
  $('#ADA_widget .bg_form .form-check ul li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
});

// JavaScript Document
$(document).ready(function () {
  $("#ADA_widget #DefaultBG_option").addClass("active");
}); // end of doc ready

// eevent listeners for hover/click for icon that toggles item submenu
const toggleIcon = document.querySelector('#toggle-ada-list')
var timeout = null;
toggleIcon.addEventListener('mouseenter', () => {
  if (toggleIcon.classList.contains('fa-toggle-off')) {
    timeout = setTimeout(() => {
      $("#toggle-list-info").show()
    }, 300);
  }
})

toggleIcon.addEventListener('mouseleave', () => {
  $("#toggle-list-info").hide()
  clearTimeout(timeout)
})

toggleIcon.addEventListener('click', () => {
  if (toggleIcon.classList.contains('fa-toggle-off')) {
    $("#toggle-list-info").hide()
  }
})

$(document).keydown(function (e) {
  if (e.shiftKey && e.which == 72) { // Shift + h
    window.location.replace("https://www.floridamemory.com/");
  }
  if (e.shiftKey && e.which == 82) { // Shift + r
    window.location.replace("https://www.floridamemory.com/discover/audio/radio/");
  }
});

// Get the modal
var ADA_widget = document.getElementById("ADA_widget");

// Get the button that opens the ADA_widget
var OpenADA_widget = document.getElementById("ADA_icon");

// Get the <span> element that closes the ADA_widget
var CloseADA_widget = document.getElementsByClassName("ADA_close")[0];

// When the user clicks the button, open the ADA_widget
OpenADA_widget.onclick = function () {
  displayModal()
}

// When the user clicks on <span> (x), close the ADA_widget
CloseADA_widget.onclick = function () {
  displayModal()
}

// When the user clicks anywhere outside of the ADA_widget, close it
window.onclick = function (event) {
  if (event.target == ADA_widget) {
    // ADA_widget.style.display = "none";
    displayModal()
  }
}



// widget list icon listeners
let toggleWidgetList = document.getElementById('toggle-ada-list')
toggleWidgetList.addEventListener('click', () => {
  if (toggleWidgetList.classList.contains('fa-toggle-on')) {
    $("#toggle-ada-list").removeClass("fa-toggle-on");
    $("#toggle-ada-list").addClass("fa-toggle-off");
    $("#item-delete-container").fadeOut()
  } else {
    $("#toggle-ada-list").removeClass("fa-toggle-off");
    $("#toggle-ada-list").addClass("fa-toggle-on");
    $("#item-delete-container").fadeIn()
  }
})




const areCookiesSet = () => {
  let updateCookies = widgetItemObj
  updateCookies.isHighlighted = isCookieActive($.cookie("HighlightHover"), 'false')
  updateCookies.isOutlined = isCookieActive($.cookie("HighlightLinks"), 'false')
  updateCookies.isTextMag = isCookieActive($.cookie("TextMagnifier"), 'false')
  updateCookies.isImgMag = isCookieActive($.cookie("ImageDescription"), 'false')
  updateCookies.isFontBig = isCookieActive($.cookie("FontSizeCookie"), 'null')
  updateCookies.isCursorBig = isCookieActive($.cookie("CursorEnlargeCookie"), 'null')
  updateCookies.isFontChanged = isCookieActive($.cookie("FM_FontTypeCookie"), 'null')
  updateCookies.isLineHeightChanged = isCookieActive($.cookie("LinpageHeightVal"), 'inherit')
  updateCookies.isWordSpaceChanged = isCookieActive($.cookie("WordSpaceVal"), 'inherit')
  updateCookies.isLetterSpaceChanged = isCookieActive($.cookie("LetterSpaceVal"), 'inherit')
  updateCookies.isLowSat = isCookieActive($.cookie("LowSaturationBackgroundCookie"), 'null')
  updateCookies.isHighSat = isCookieActive($.cookie("HighSaturationBackgroundCookie"), 'null')
  updateCookies.isInverted = isCookieActive($.cookie("InvertBackgroundCookie"), 'null')
  updateCookies.isDesaturated = isCookieActive($.cookie("DesaturatedBackgroundCookie"), 'null')
  updateCookies.isDarkContrast = isCookieActive($.cookie("DarkContrastBackgroundCookie"), 'null')
  updateCookies.isTextColorChanged = isCookieActive($.cookie("TextColorCookie"), 'false')
  updateCookies.isBackColorChanged = isCookieActive($.cookie("BackgroundColorCookie"), 'false')
  updateCookies.isLinkColorChanged = isCookieActive($.cookie("LinkColorCookie"), 'false')
  updateCookies.isSeizureSafe = isCookieActive($.cookie("SeizureSafe"), 'false')
  updateCookies.isReadingMask = isCookieActive($.cookie("ReadingMask"), 'false')
  updateCookies.isReadingGuide = isCookieActive($.cookie("CursorGuide"), 'false')
  updateCookies.isSpeech = isCookieActive($.cookie("TTS_click_enabled"), 'false')
  updateCookies.isBaskervilleFont = isCookieActive($.cookie("BaskervilleFontCookie"), 'null')
  updateCookies.isDyslexicFont = isCookieActive($.cookie("DyslexicFontCookie"), 'null')
  return updateCookies
}

widgetItemObj = areCookiesSet()

$(document).on("scroll", function (e) {
  storeMainScrollPosition()
});