function googleTranslateElementInit() {
  try {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      layout: google.translate.TranslateElement
    }, 'google_translate_element');
  } catch (error) {
    console.log(error)
  }

}

// $(function () {
//   $('[data-toggle="popover"]').popover()
// })

$(function () {
  $('.ada-popover').popover({
    container: '#ADA_widget'
  })
})


//https://stackoverflow.com/a/36282225/10792033
//Change text of dropdown on Google Translate


// $(document).ready(function () {
//   $('#google_translate_element').bind('DOMNodeInserted', function (event) {
//     $('.goog-te-menu-value span:first').html('Translate Site');
//   });
// });


let isWidgetActive = false

const cookiesArr = ['translateLanguage', 'text-magnify-color-swatch', 'reading-mask-reload', 'text-magnify-size-input', 'img-magnify-size-input', 'img-magnify-color-swatch', 'text-magnify-color-swatch', '.img-magnify-color-swatch', 'edit-reading-guide', 'edit-reading-mask', 'TTS_click_enabled', 'googtrans', 'readingMaskVal', 'BackgroundColorCookie', 'TextColorCookie', 'LinkColorCookie', 'TextMagnifier', 'HighlightLinks', 'ImageDescription', 'HighlightHover', 'FontSizeCookie', 'BaskervilleFontCookie', 'DyslexicFontCookie', 'FM_FontTypeCookie', 'CursorEnlargeCookie', 'DarkContrastBackgroundCookie', 'LowSaturationBackgroundCookie', 'InvertBackgroundCookie', 'HighSaturationBackgroundCookie', 'DesaturatedBackgroundCookie', 'DesaturatedBackgroundCookie', 'InvertBackgroundCookie', 'DarkContrastBackgroundCookie', 'SeizureSafe', 'ReadingMask', 'CursorGuide', 'TTS_click_enabled', 'LinpageHeightVal', 'WordSpaceVal', 'LetterSpaceVal', 'speechPitch', 'speechRate', 'speechVol', 'voiceCookie']

// booleans used to determine if widget is still active
let widgetItemObj = {
  isHighlighted: false,
  isOutlined: false,
  isTextMag: false,
  isImgMag: false,
  isFontBig: false,
  isFontChanged: false,
  isCursorBig: false,
  isLineHeightChanged: false,
  isWordSpaceChanged: false,
  isLetterSpaceChanged: false,

  isDarkContrast: false,
  isDesaturated: false,
  isInverted: false,
  isHighSat: false,
  isLowSat: false,

  isTextColorChanged: false,
  isBackColorChanged: false,
  isLinkColorChanged: false,
  isSeizureSafe: false,
  isReadingMask: false,
  isReadingGuide: false,
  isSpeech: false,
  isDyslexicFont: false,
  isBaskervilleFont: false,
  isTranslated: false,
}

// functino to reset all cookies
const removeAllCookies = () => {
  for (let i = 0; i < cookiesArr.length; i++) {
    $.removeCookie(cookiesArr[i]);
  }
}

const isCookieActive = (input, value) => {
  if (input && input !== value) {
    return true
  } else {
    return false
  }
}


const displayModal = () => {
  const overlay = document.querySelector('#ADA_widget')
  if (overlay.style.display !== "flex") {
    $("#ada-triggers").fadeOut(700);
    $("#ADA_widget").css('opacity', '0');
    $("#ADA_widget").css("display", "flex")
    $("#ADA_widget").fadeTo(0, 1);
    $(".modal_content").fadeToggle(0);
    // document.body.classList.add("prevent-body-overflow");

    $(".modal_body").scrollTop(0);

    document.body.style.overflow = "hidden"; // ADD THIS LINE
    document.body.style.height = "100%"; // ADD THIS LINE
    document.body.style.paddingRight = "5px"; // ADD THIS LINE




    // $('body').css("overflow", "hidden");
    // $('body').css("overflow", "hidden");
  } else {
    $("#ADA_widget").fadeTo(400, 0);
    $(".modal_content").fadeToggle(400);

    setTimeout(() => {
      document.body.style.overflow = "auto"; // ADD THIS LINE
      document.body.style.height = "auto"; // ADD THIS LINE
      document.body.style.paddingRight = "0"; // ADD THIS LINE
      $("#ADA_widget").css("display", "none")
      // document.body.classList.remove("prevent-body-overflow");
      $("#ada-triggers").fadeIn();
      // $('body').css("overflow", "auto");

    }, 800);
  }
}

// store scroll positions for forced pageload/cookie removal
const storeMainScrollPosition = () => {
  var mainScrollPosition = $("html, body").scrollTop();
  localStorage.setItem("mainScrollPosition", mainScrollPosition);

}

const storeModalScrollPosition = () => {
  var modalScrollPosition = $(".modal_body").scrollTop();
  localStorage.setItem("modalScrollPosition", modalScrollPosition);
}

const modalDisplayOpenOrClose = () => {
  const adaWidget = document.querySelector('#ADA_widget')
  if (adaWidget.style.display === 'flex') {
    localStorage.setItem("reloadModalOpen", "true");
  } else {
    localStorage.setItem("reloadModalClosed", "true");
  }
}

const forceReload = () => {
  $("body").fadeOut()
  setTimeout(() => {
    document.location.reload();
  }, 200);
}

const selectChangeHandler = (icon, iconClass, itemId) => {
  if (icon.classList.contains(iconClass)) {
    if (icon.classList.contains('plus-icon')) {
      $(itemId).next().prop('selected', true).trigger('change');
    }
    if (icon.classList.contains('minus-icon')) {
      $(itemId).prev().prop('selected', true).trigger('change');
    }

  }
}


// it looks awkward when select is at 10 so this fixes that
const changeIndent = (value, amount, select, indentAmt) => {
  if (value !== amount) {
    $(select).css({ "text-indent": indentAmt });
  } else {
    $(select).css({ "text-indent": "0px" });
  }
}


// change color picker
const changeColorPicker = (color, cssSelector, hexSelector, inputSelector,) => {
  $(inputSelector).val(color).trigger('change')
  $(cssSelector).css({ "background-color": color })
  $(hexSelector).text(color);

}

//   to grab elements that are loaded asynchronously ex. google translate
const isElementLoaded = async selector => {
  while (document.querySelector(selector) === null) {
    await new Promise(resolve => requestAnimationFrame(resolve))
  }
  return document.querySelector(selector);
};







//FOR BACKGROUND COLOR CHANGE -- ADDS ACTIVE CLASS TO LI WHEN CLICKED
//https://stackoverflow.com/questions/3972944/jquery-removeclass-on-parent-sibling-child
$(function () {
  $('#ADA_widget .bg_form .form-check ul li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
});

$(function () {
  $('[data-toggle="popover"]').popover()
})

// JavaScript Document
$(document).ready(function () {
  $("#ADA_widget #DefaultBG_option").addClass("active");
}); // end of doc ready



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

// toggleIcon.addEventListener('click', () => {

//   $("#toggle-list-info").hide()

// })

const removeDeleteContainer = () => {
  $("#toggle-ada-list").removeClass("fa-toggle-on");
  $("#toggle-ada-list").addClass("fa-toggle-off");
  $("#item-delete-container").fadeOut()
  $.removeCookie('deleteContainerActive');
}


// widget list icon listeners
let toggleWidgetList = document.getElementById('toggle-ada-list')
toggleWidgetList.addEventListener('click', () => {
  if (toggleWidgetList.classList.contains('fa-toggle-on')) {
    removeDeleteContainer()
  } else {
    $("#toggle-ada-list").removeClass("fa-toggle-off");
    $("#toggle-ada-list").addClass("fa-toggle-on");
    $("#item-delete-container").fadeIn()
    $.cookie("deleteContainerActive", 'true', { expires: 30 });
    setTimeout(() => {
      $("#toggle-list-info").hide()
    }, 100)
  }
})

if ($.cookie("deleteContainerActive")) {

  $("#toggle-ada-list").removeClass("fa-toggle-off");
  $("#toggle-ada-list").addClass("fa-toggle-on");
  $("#item-delete-container").fadeIn()
}

// // item delete container - close on scroll
setTimeout(() => {
  document.addEventListener("scroll", (event) => {

    if (toggleWidgetList.classList.contains('fa-toggle-on')) {
      removeDeleteContainer()
    }
  });
}, 500)


// item delete container - close on offscreen click
$('body').click(function (event) {
  if (toggleWidgetList.classList.contains('fa-toggle-on')) {
    if (!$(event.target).closest('.item-delete-container-remove').length && !$(event.target).is('.item-delete-container-remove')) {
      removeDeleteContainer()
    }
  }

});







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


// function to remove background color cookies and reload page
const resetColorPicker = () => {
  let bgColor = cache.bgColor.value
  let textColor = cache.textColor.value
  let linkColor = cache.linkColor.value
  if (bgColor !== "#ffffff" || textColor !== "#000000" || linkColor !== "#3863ff") {
    $.removeCookie('BackgroundColorCookie');
    $.removeCookie('TextColorCookie');
    $.removeCookie('LinkColorCookie');
    //alert("Cookie Removed!");
    storeModalScrollPosition()
    storeMainScrollPosition()
    if (document.querySelector('#ADA_widget').style.display === 'flex') {
      localStorage.setItem("reloadModalOpen", "true");
    }
    removeWidgetControls(['ColorPicker'])
    forceReload()

  }
}
//////////////////////////////////////////////////////////////////////////////// Color Picker ////////////////////////////////////////////////////////////////////////
let config = {
  regTextContrast: 5,
  largeTextContrast: 3,
  linkContrast: 3
}

let cache = {};



//https://www.jquery-az.com/how-to-create-read-and-remove-jquery-cookies-with-3-demos/
$("#remove_cookie").click(function () {
  resetColorPicker()

});

const setupCache = () => {
  cache.bgColor = document.querySelector('#background_color');
  cache.textColor = document.querySelector('#text_color');
  cache.linkColor = document.querySelector('#link_color');
  cache.inputs = document.querySelectorAll('input.color_swatch');
  //cache.result = document.querySelector('.result_Contrast');
  cache.BgtoText = document.querySelector('#textBackRatioContainer');
  cache.BgtoLink = document.querySelector('#linkBackRatioContainer');
  cache.TexttoLink = document.querySelector('#linkTextRatioContainer');
  cache.contrastValues = document.querySelector('.contrast_values');
}


// https://gist.github.com/jfsiii/5641126
const getLuminance = (r, g, b) => {
  const RsRGB = r / 255;
  const GsRGB = g / 255;
  const BsRGB = b / 255;

  var R = (RsRGB <= 0.03928) ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
  var G = (GsRGB <= 0.03928) ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
  var B = (BsRGB <= 0.03928) ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4);

  // For the sRGB colorspace, the relative luminance of a color is defined as:
  var L = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  return L;
};

const calculateContrast = (L1, L2) => {
  const contrast = (L1 + 0.05) / (L2 + 0.05)
  return parseFloat(contrast.toFixed(2));
};

// https://gist.github.com/Arahnoid/9923989
const hexToRGB = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const takeTwoColors = (c1, c2) => {
  const c1l = getLuminance(c1.r, c1.g, c1.b);
  const c2l = getLuminance(c2.r, c2.g, c2.b);

  if (c1l > c2l) {
    return calculateContrast(c1l, c2l);
  } else {
    return calculateContrast(c2l, c1l);
  }
};



const onInputChange = (e) => {
  widgetItemObj.isTextChanged = true
  widgetItemObj.isBackColorChanged = true
  widgetItemObj.isLinkColorChanged = true
  addWidgetControls('ColorPicker', 'Custom colors')
  checkIfWidgetActive()
  if ($('body').hasClass('highcontrast') || $('body').hasClass('inverted') || $('body').hasClass('desaturated')) {
    $("body").removeClass("highcontrast inverted desaturated")
    $.removeCookie('InvertBackgroundCookie');
    $.removeCookie('InvertBackgroundCookie');
    $.removeCookie('DarkContrastBackgroundCookie');
    $.removeCookie('DarkContrastBackgroundCookie');
    $.removeCookie('DesaturatedBackgroundCookie');
    $.removeCookie('DesaturatedBackgroundCookie');
    $("#DefaultBG_option").addClass('active').siblings().removeClass('active');
    removeWidgetControls(['DarkContrastBackground', 'DesaturateBackground', 'InvertBackground'])
    // makeColorPresetsFalse([widgetItemObj.isDarkContrast, widgetItemObj.isDesaturated, widgetItemObj.isInverted, widgetItemObj.isHighSat, widgetItemObj.isLowSat])
    widgetItemObj.isDarkContrast = false
    widgetItemObj.isDesaturated = false
    widgetItemObj.isInverted = false

  } else {

  }


  const value = e.target.value;


  //Hide defaultContainer on input change
  $("#defaultContainer").hide();



  // setting defaults if not yet supplied by the user
  if (!cache.bgColor.value) {
    cache.bgColor.value = '#ffffff';
  }

  if (!cache.textColor.value) {
    cache.textColor.value = '#212529';
  }

  if (!cache.linkColor.value) {
    cache.linkColor.value = '#3863FF';
  }


  // TODO: handle RGB / hex values
  const bgColor = hexToRGB(cache.bgColor.value);
  const textColor = hexToRGB(cache.textColor.value);
  const linkColor = hexToRGB(cache.linkColor.value);

  //Switch selectors to #view, .Footer
  $('body *').not('#ADA_widget, #ADA_widget *, .modal_content *').css('color', cache.textColor.value);
  $('.SearchForm .input-group .input-group-append #submit_search').css('color', cache.textColor.value);
  $('#footerFeat_container, .Footer').css('color', cache.textColor.value);

  $('body').not('[class="ada_modal_test"]').css('background-color', cache.bgColor.value);
  $('#Scroll_btn').attr('style', 'background-color: ' + cache.bgColor.value + '!important');
  $('#navContainer, #navContainer #main_navbar .dropdown-menu.backdrop_hover, #navContainer #main_navbar .dropdown-menu > .dropdown-submenu.firstLevel').attr('style', 'background-color: ' + cache.bgColor.value + '!important');
  $('#footerFeat_container, .Footer').css('background-color', cache.bgColor.value);
  $('#menudropdown .card-body').css('background-color', cache.bgColor.value);

  $('body a').not("#ADA_widget a").attr('style', 'color: ' + cache.linkColor.value + '!important');



  const bgTextContrast = takeTwoColors(bgColor, textColor);
  const bgLinkContrast = takeTwoColors(bgColor, linkColor);
  const textLinkContrast = takeTwoColors(textColor, linkColor);



  let resultMsg = ``;


  if (bgTextContrast >= 4.5) {
    $(cache.BgtoText).attr('class', 'pass').text('Pass');
  } else if (bgTextContrast <= 4.5) {
    $(cache.BgtoText).attr('class', 'fail').text('Fail');
  }
  if (bgLinkContrast >= 4.5) {
    $(cache.BgtoLink).attr('class', 'pass').text('Pass');
  } else if (bgLinkContrast <= 4.5) {
    $(cache.BgtoLink).attr('class', 'fail').text('Fail');
  }
  if (textLinkContrast >= 3) {
    $(cache.TexttoLink).attr('class', 'pass').text('Pass');
  } else if (textLinkContrast <= 3) {
    $(cache.TexttoLink).attr('class', 'fail').text('Fail');
  }


  const bgTextcontrastValues = `Text to background contrast: ${bgTextContrast}`;
  const bgLinkCcontrastValues = `Link to background contrast: ${bgLinkContrast}`;
  const textLinkcontrastValues = `Link to text contrast: ${textLinkContrast}`;

  cache.BgtoText.innerHTML = bgTextcontrastValues;
  cache.BgtoLink.innerHTML = bgLinkCcontrastValues;
  cache.TexttoLink.innerHTML = textLinkcontrastValues;


};

const addEventListeners = () => {
  cache.bgColor.addEventListener('change', onInputChange);
  cache.textColor.addEventListener('change', onInputChange);
  cache.linkColor.addEventListener('change', onInputChange);
};


const initAdaListeners = () => {
  setupCache();
  addEventListeners();
}
initAdaListeners();






const resetColors = (color, bgColor, linkColor) => {

  $('body').css('background-color', bgColor);
  $('#navContainer, #navContainer #main_navbar .dropdown-menu.backdrop_hover, #navContainer  #main_navbar .dropdown-menu > .dropdown-submenu.firstLevel').attr('style', 'background-color: ' + bgColor + '!important');
  $('#Scroll_btn').attr('style', 'background-color: ' + bgColor + '!important');
  $('#footerFeat_container, .Footer').css('background-color', bgColor);
  $('#menudropdown .card-body').css('background-color', bgColor);
  var hexBackgroundColor = $('body').cssAsHex('background-color');
  $("#bg_hexVal").html(hexBackgroundColor);
  $.cookie.raw = true; //to bypass the default cookie value which is encoded/decoded when writing/reading
  $.cookie('BackgroundColorCookie', bgColor, { expires: 30 });

  $('body *').not('#ADA_widget, #ADA_widget *').css('color', color);
  $('.SearchForm .input-group .input-group-append #submit_search').css('color', color);
  $('#footerFeat_container, .Footer').css('color', color);
  var hexTextColor = $('body *').cssAsHex('color');
  $("#txt_hexVal").html(hexTextColor);
  $.cookie.raw = true;
  $.cookie('TextColorCookie', color, { expires: 30 });

  $('body a').not("#ADA_widget a").attr('style', 'color: ' + linkColor + '!important');
  var hexLinkColor = $('body a').cssAsHex('color');
  $("#link_hexVal").html(hexLinkColor);
  $.cookie.raw = true;
  $.cookie('LinkColorCookie', linkColor,);
}


///////////////////////////////////////////////////////////////////// NOTE: Switch selectors to #view, .Footer
///////////////////////////////////////////////////////////////////// NOTE: Switch selectors to #view, .Footer
$(document).ready(function () {

  //https://stackoverflow.com/a/43384649/10792033
  // RGB TO HEX
  $.fn.cssAsHex = function (colorProp) {

    var hexDigits = '0123456789abcdef';

    function hex(x) {
      return isNaN(x) ? '00' : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    };

    // Convert RGB color to Hex format
    function rgb2hex(rgb) {
      var rgbRegex = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      return '#' + hex(rgbRegex[1]) + hex(rgbRegex[2]) + hex(rgbRegex[3]);
    };

    return rgb2hex(this.css(colorProp));
  };



  //BackgroundColorCookie
  $('#background_color').on("change", function () {
    $('body *').not('#ada-widget-main *').css('background', 'none');
    var background_color = $('body').css('background-color');
    $('body, body *').not('a, #ADA_widget, #ADA_widget *, #ada-triggers, #ada-triggers *, .translate-language-span, .audio_state *').css('background-color', background_color);
    $('#navContainer, #navContainer #main_navbar .dropdown-menu.backdrop_hover, #navContainer  #main_navbar .dropdown-menu > .dropdown-submenu.firstLevel').attr('style', 'background-color: ' + background_color + '!important');
    $('#Scroll_btn').attr('style', 'background-color: ' + background_color + '!important');
    $('#footerFeat_container, .Footer').css('background-color', background_color);
    $('#menudropdown .card-body').css('background-color', background_color);
    var hexBackgroundColor = $('body').cssAsHex('background-color');
    $("#bg_hexVal").html(hexBackgroundColor);

    $.cookie.raw = true; //to bypass the default cookie value which is encoded/decoded when writing/reading
    $.cookie('BackgroundColorCookie', background_color, { expires: 30 });

  });
  if ($.cookie('BackgroundColorCookie') != undefined) {
    $('body *').not('#ada-widget-main *').css('background', 'none');
    $('body, body *').not('a, #ADA_widget, #ADA_widget *, #ada-triggers, #ada-triggers *, .translate-language-span, .audio_state *').css('background-color', $.cookie('BackgroundColorCookie'));
    $('#navContainer, #navContainer #main_navbar .dropdown-menu.backdrop_hover, #navContainer  #main_navbar .dropdown-menu > .dropdown-submenu.firstLevel').attr('style', 'background-color: ' + $.cookie('BackgroundColorCookie') + '!important');
    $('#Scroll_btn').attr('style', 'background-color: ' + $.cookie('BackgroundColorCookie') + '!important');
    $('#footerFeat_container, .Footer').css('background-color', $.cookie('BackgroundColorCookie'));
    $('#menudropdown .card-body').css('background-color', $.cookie('BackgroundColorCookie'));

    var hexBackgroundColor = $('body').cssAsHex('background-color');
    $('#background_color').attr('value', hexBackgroundColor);
    $("#bg_hexVal").html(hexBackgroundColor);


    $.cookie.raw = true;
  }


  //TextColorCookie
  $('#text_color').on("change", function () {
    var text_color = $('body *').css('color');
    $('p, h1, h2, h3, h4, h5, h6, span').not('#ADA_widget, #ADA_widget *, #ada-triggers, #ada-triggers *, #toggle-ada-list-container, #ADA_trigger, .audio_state button, .modal_content, .modal_content *, #ContrastRatingModal, i, .translate-language-span').css('color', text_color);
    $('#ADA_widget h2, #ADA_widget h3, #ADA_widget label, .hexVal, .translate-language-span, .ada-contact-info-p, .headings, .ada-setting-title').css('color', 'black');
    $('.translate-language-span:hover').css('background-color', 'white');
    $('.SearchForm .input-group .input-group-append #submit_search').css('color', text_color);
    $('#footerFeat_container, .Footer').css('color', text_color);
    var hexTextColor = $('body *').cssAsHex('color');
    $("#txt_hexVal").html(hexTextColor);

    $.cookie.raw = true;
    $.cookie('TextColorCookie', text_color, { expires: 30 });
  });
  if ($.cookie('TextColorCookie') != undefined) {
    $('p, h1, h2, h3, h4, h5, h6, span').not('#ADA_widget, #ADA_widget *, #ada-triggers, #ada-triggers *, #toggle-ada-list-container, #ADA_trigger, .audio_state button, .modal_content, .modal_content *, #ContrastRatingModal, i, .translate-language-span').css('color', $.cookie('TextColorCookie'));
    $('#ADA_widget h2, #ADA_widget h3, #ADA_widget label, .hexVal, .translate-language-span, .ada-setting-title').css('color', 'black');
    $('.SearchForm .input-group .input-group-append #submit_search').css('color', $.cookie('TextColorCookie'));
    $('#footerFeat_container, .Footer').css('color', $.cookie('TextColorCookie'));

    var hexTextColor = $('body *').cssAsHex('color');
    $('#text_color').attr('value', hexTextColor);
    $("#txt_hexVal").html(hexTextColor);


    $.cookie.raw = true;
  }


  //LinkColorCookie
  $('#link_color').on("change", function () {
    var link_color = $('body a').css('color');
    $('body a').not('#ADA_widget, #ADA_widget *, #ada-triggers, #ada-triggers *, .HighlightLinks *, .HighlightHover *, .translate-language-span').attr('style', 'color: ' + link_color + '!important').addClass('ada-link-opacity');;
    var hexLinkColor = $('body a').cssAsHex('color');
    $("#link_hexVal").html(hexLinkColor);

    $.cookie.raw = true;
    $.cookie('LinkColorCookie', link_color, { expires: 30 });
  });
  if ($.cookie('LinkColorCookie') != undefined) {
    $('body a').not('#ADA_widget, #ADA_widget *, #ada-triggers, #ada-triggers *, .HighlightLinks *, .HighlightHover *, .translate-language-span').attr('style', 'color: ' + $.cookie('LinkColorCookie') + '!important').addClass('ada-link-opacity');;

    var hexLinkColor = $('body a').cssAsHex('color');
    $('#link_color').attr('value', hexLinkColor);
    $("#link_hexVal").html(hexLinkColor);

    $.cookie.raw = true;
  }






}); //end doc ready

$(document).ready(function () {
  $("#ADA_widget #FS_Default").addClass("active");
});

$(function () {
  $('.fontsize_form .form-check ul li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
});

const restoreDefaultFontSize = () => {
  $('body').removeClass('fontSizeMedium');
  $("#FS_Default").addClass('active').siblings().removeClass('active');
  if ($.cookie('FontSizeCookie') == "yes") {
    $.cookie("FontSizeCookie", null, {
      expires: 30
    });
  }
  removeWidgetControls(['FontSizeMedium'])
  widgetItemObj.isFontBig = false
  checkIfWidgetActive()
}

$(document).ready(function () {
  if ($.cookie('FontSizeCookie') == "yes") {
    $("#ADA_widget #FS_Medium").addClass("active");
    $("body").addClass("fontSizeMedium");
    $("#ADA_widget #FS_Default").removeClass("active");
  }
  $("#ADA_widget a.FontSizeMedium").click(function () {
    if ($.cookie('FontSizeCookie') == "undefined" || $.cookie('FontSizeCookie') == "no") {
      $.cookie('FontSizeCookie', 'yes', { expires: 30 });
      $("body").addClass("fontSizeMedium");

    } else {
      $.cookie('FontSizeCookie', 'yes', { expires: 30 });
      $("body").addClass("fontSizeMedium");
    }
    addWidgetControls('FontSizeMedium', 'Change font size')
    widgetItemObj.isFontBig = true
    checkIfWidgetActive()
  });
  //When 'a.FontSizeDefault' is clicked, removes 'fontSizeMedium' and erases FontSizeCookie
  $("#ADA_widget a.FontSizeDefault").click(function () {
    restoreDefaultFontSize()
  });
});

/////COOKIE SETTING FOR FONT TYPE
$(document).ready(function () {
  $("#ADA_widget #FT_Default").addClass("active");
});


/////COOKIE SETTING FOR FONT TYPE
$(document).ready(function () {
  $("#FT_Default").addClass("active");
});
//FOR FONT TYPE CHANGE -- ADDS ACTIVE CLASS TO LI WHEN CLICKED
//https://stackoverflow.com/questions/3972944/jquery-removeclass-on-parent-sibling-child
$(function () {
  $('.font_type_form .form-check ul li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
});



const restoreDefaultFontType = () => {
  $('body').removeClass('DyslexicFont');
  $('body').removeClass('BaskervilleFont');
  $('#FT_Default').addClass('active').siblings().removeClass('active');
  if ($.cookie('BaskervilleFontCookie') == "yes") {
    $.cookie("BaskervilleFontCookie", null, { expires: 30 });

  }
  if ($.cookie('DyslexicFontCookie') == "yes") {
    $.cookie("DyslexicFontCookie", null, { expires: 30 });
  }
  widgetItemObj.isDyslexicFont = false
  widgetItemObj.isBaskervilleFont = false
  removeWidgetControls(['FontTypeDyslexic', 'FontTypeBaskerville'])

  checkIfWidgetActive()
}


$(document).ready(function () {
  // Cookie for DyslexicFontCookie
  // Check (onLoad) if DyslexicFontCookie is there and set the class to body if it is
  // Add active class to li
  if ($.cookie('DyslexicFontCookie') == "yes") {
    $("#ADA_widget #FT_Dyslexic").addClass("active");
    $("body").addClass("DyslexicFont");
    $('body').removeClass('BaskervilleFont');
    $("#ADA_widget #FT_Default").removeClass("active");
    $("#ADA_widget #FT_Baskerville").removeClass("active");
    $.cookie('BaskervilleFontCookie') == "no";
    $.cookie('BaskervilleFontCookie') == "undefined";
    $.cookie("BaskervilleFontCookie", null, {
      expires: 30
    });

  }

  // When input is clicked save cookie for 30days
  $("#ADA_widget a.FontTypeDyslexic").click(function () {
    $.cookie("BaskervilleFontCookie", null, {
      expires: 30
    });
    if ($.cookie('DyslexicFontCookie') == "undefined" || $.cookie('DyslexicFontCookie') == "no") {
      $.cookie('DyslexicFontCookie', 'yes', { expires: 30 });
      $("body").addClass("DyslexicFont");
      $('body').removeClass('BaskervilleFont');

    } else {
      $.cookie('DyslexicFontCookie', 'yes', { expires: 30 });
      $("body").addClass("DyslexicFont");
      $('body').removeClass('BaskervilleFont');

    }
    addWidgetControls('FontTypeDyslexic', 'Open-dyslexic font')
    removeWidgetControls(['FontTypeBaskerville'])
    widgetItemObj.isBaskervilleFont = false
    widgetItemObj.isDyslexicFont = true
    checkIfWidgetActive()

  });



});

$(document).ready(function () {
  // Cookie for BaskervilleFontCookie
  // Check (onLoad) if BaskervilleFontCookie is there and set the class to body if it is
  // Add active class to li
  if ($.cookie('BaskervilleFontCookie') == "yes") {
    $("#ADA_widget #FT_Baskerville").addClass("active");
    $("body").addClass("BaskervilleFont");
    $("#ADA_widget #FT_Default").removeClass("active");
    $("#ADA_widget #FT_Dyslexic").removeClass("active");
    $('body').removeClass('DyslexicFont');
    $.cookie('DyslexicFontCookie') == "no";
    $.cookie('DyslexicFontCookie') == "undefined";
    $.cookie("DyslexicFontCookie", null, { expires: 30 });

  }

  // When input is clicked save cookie for 30days
  $("#ADA_widget a.FontTypeBaskerville").click(function () {
    $.cookie("DyslexicFontCookie", null, {
      expires: 30
    });
    if ($.cookie('BaskervilleFontCookie') == "undefined" || $.cookie('BaskervilleFontCookie') == "no") {
      $.cookie('BaskervilleFontCookie', 'yes', { expires: 30 });
      $("body").addClass("BaskervilleFont");
      $('body').removeClass('DyslexicFont');

    } else {
      $.cookie('BaskervilleFontCookie', 'yes', { expires: 30 });
      $("body").addClass("BaskervilleFont");
      $('body').removeClass('DyslexicFont');

    }
    addWidgetControls('FontTypeBaskerville', 'Libre-baskerville font')
    removeWidgetControls(['FontTypeDyslexic'])
    widgetItemObj.isBaskervilleFont = true
    widgetItemObj.isDyslexicFont = false
    checkIfWidgetActive()


  });





  //When 'a.FontTypeDefault' is clicked, removes 'DyslexicFont' and erases FontTypeCookie
  $("#ADA_widget a.FontTypeDefault").click(function () {
    restoreDefaultFontType()
  });
});

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
      expires: 30
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
      $.cookie('CursorEnlargeCookie', 'yes', { expires: 30 });
      $("body").addClass("Cursor_Enlarge");
    } else {
      $.cookie('CursorEnlargeCookie', 'yes', { expires: 30 });
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

// color contrast modal
$(document).ready(function () {
  $("#OpenContrastModal").click(function () {
    $('#ContrastRatingModal').toggleClass("toast_close");
  });

  $(".CloseContrastModal").click(function () {
    $('#ContrastRatingModal').addClass("toast_close");
  });
});

const contrastInfoPopup = document.querySelector('#wcagDropdown')
const contrastModalInfoBtn = document.querySelector('#ada-contrast-info-toggle')
document.querySelector('#ada-contrast-info-toggle').addEventListener('click', () => {
  if (contrastInfoPopup.classList.contains('d-none')) {

    $("#wcagDropdown").removeClass("d-none")

  } else {
    $("#wcagDropdown").addClass("d-none")
  }
})

// color contrast modal and popup - close when clicked off screen
$('body').click(function (event) {
  if (!$(event.target).closest('.wcag-modal-remove-selector').length && !$(event.target).is('.wcag-modal-remove-selector')) {
    $("#ContrastRatingModal").addClass("toast_close")
  }
  if (!$(event.target).closest('.wcag-popup-info-remove-selector').length && !$(event.target).is('.wcag-popup-info-remove-selector')) {
    $("#wcagDropdown").addClass("d-none")
  }
});

// color contrast modal and popup - close on scroll
$('.modal_body').on("scroll", function () {
  $("#ContrastRatingModal").addClass("toast_close")
  $("#wcagDropdown").addClass("d-none")
});



// change css properties for letter/word spacing/lineheight
const setSpacingCss = (value, css) => {
  $("body p").not('#ADA_widget, #ADA_widget *, i, div').css(css, value); //Selects everything inside body except ada modal and header
  $(".Footer").css(css, value);
}



document.querySelectorAll('.spacing-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    selectChangeHandler(icon, 'letter-spacing-icon', '#letter_spacing option:selected')
    selectChangeHandler(icon, 'word-spacing-icon', '#word_spacing option:selected')
    selectChangeHandler(icon, 'line-height-icon', '#line_height option:selected')
  })
})



// full restore to default settings
const restoreSpacingDefault = (itemId, removeItemArr) => {
  // $(itemId).val($(`${itemId} option:first`).val()).triggerChange()
  $(itemId).prop("selectedIndex", 0).trigger('change');
  checkIfWidgetActive()
  removeWidgetControls(removeItemArr)
}


$(document).ready(function () {
  // Letter Spacing
  var selectedVal = $.cookie("LetterSpaceVal");
  if (selectedVal) {
    $("#letter_spacing").val(selectedVal);
    $("#letter_spacing").prop("selected", true);
    $("body p").not('#ADA_widget, #ADA_widget *, i, div').css("letter-spacing", selectedVal); //Selects everything inside body except ada modal and header
    $(".Footer").css("letter-spacing", selectedVal);
    changeIndent(selectedVal, '10px', '#LetterSpacing_option select', '6.5px')
  }
  $("#letter_spacing").on("change", function () {
    var selection1 = $(this).val();

    $(selection1).prop("selected", true);
    $("body p").not('#ADA_widget, #ADA_widget *, i, div').css("letter-spacing", selection1); //Selects everything inside body except ada modal and header
    $(".Footer").css("letter-spacing", selection1);
    $.cookie("LetterSpaceVal", selection1, { expires: 30 })
    changeIndent(selection1, '10px', '#LetterSpacing_option select', '6.5px')

    widgetItemObj.isLetterSpaceChanged = selection1 === 'inherit' ? false : true
    selection1 === 'inherit' ? removeWidgetControls(['letter_spacing']) : addWidgetControls('letter_spacing', 'Letter spacing')


    checkIfWidgetActive()
  });

  //Word Spacing
  var selectedVal2 = $.cookie("WordSpaceVal");
  if (selectedVal2) {
    $("#word_spacing").val(selectedVal2);
    $("#word_spacing").prop("selected", true);
    $("body p").not('#ADA_widget, #ADA_widget *, i, div').css("word-spacing", selectedVal2); //Selects everything inside body except ada modal and header
    changeIndent(selectedVal2, '10px', '#WordSpacing_option select', '6.5px')
  }
  $("#word_spacing").on("change", function () {
    var selection2 = $(this).val();
    $(selection2).prop("selected", true);
    $("body p").not('#ADA_widget, #ADA_widget *, i, div').css("#word_spacing", selection2); //Selects everything inside body except ada modal and header
    $(".Footer").css("#word_spacing", selection2);
    $.cookie("WordSpaceVal", selection2, { expires: 30 })
    changeIndent(selection2, '10px', '#WordSpacing_option select', '6.5px')
    widgetItemObj.isWordSpaceChanged = selection2 === 'inherit' ? false : true
    selection2 === 'inherit' ? removeWidgetControls(['word_spacing']) : addWidgetControls('word_spacing', 'Word spacing')
    checkIfWidgetActive()

  });

  //Line Height
  var selectedVal3 = $.cookie("LinpageHeightVal");
  if (selectedVal3) {
    $("#line_height").val(selectedVal3);
    $("#line_height").prop("selected", true);
    $("body p").not('#ADA_widget, #ADA_widget *, i, div').css("line-height", selectedVal3); //Selects everything inside body except ada modal and header
    $(".Footer").css("line-height", selectedVal3);

    changeIndent(selectedVal3, '3.3', '#LineHeight_option select', '6.5px')
  }
  $("#line_height").on("change", function () {
    var selection3 = $(this).val();
    $(selection3).prop("selected", true);
    $("body p").not('#ADA_widget, #ADA_widget *, i, div').css("line-height", selection3); //Selects everything inside body except ada modal and header
    $(".Footer").css("line-height", selection3);
    $.cookie("LinpageHeightVal", selection3, { expires: 30 })

    changeIndent(selection3, '3.3', '#LineHeight_option select', '6.5px')

    widgetItemObj.isLineHeightChanged = selection3 === 'inherit' ? false : true
    checkIfWidgetActive()
    selection3 === 'inherit' ? removeWidgetControls(['line_height']) : addWidgetControls('line_height', 'Line height')

  });
});

$(document).ready(function () {
  ////////////////// Page Structure ///////////////////
  // !-- -- -- -- -- --Footer-- -- -- -- -- - >
  var output2 = "";
  $('.navbar.Footer nav.affiliates li a, .navbar.Footer nav.additional_Links a').each(function () {
    var source2 = $(this).attr("href");
    var text2 = $(this).text();
    output2 += '<option value="' + source2 + '">' + text2 + '</option>';
    $("#select_page #footer_group").html(output2);
  });

  //////////// Change Letter Spacing ///////////////////
  $("#letter_spacing").on('change', function () {
    var getLetterSpace = $(this).val();
    $("body *").not('#ADA_widget, #ADA_widget *, i, div').css("letter-spacing", getLetterSpace); //Selects everything inside body except ada modal and header
    $(".Footer").css("letter-spacing", getLetterSpace);
  });

  //////////// Change Word Spacing ///////////////////
  $("#word_spacing").on('change', function () {
    var getWordSpace = $(this).val();
    $("body *").not('#ADA_widget, #ADA_widget *, i, div').css("word-spacing", getWordSpace); //Selects everything inside body except ada modal and header
    $(".Footer").css("word-spacing", getWordSpace);
  });

}); //end of doc ready


if ($.cookie('TextMagnifier') == "true") {
  $('#ToggleTextMagnifier').prop('checked', false).trigger('change')

  $('#ToggleTextMagnifier').prop('checked', true).trigger('change')

}




let textMagObj = {
  color: 'rgb(255,255,255)',
  backGroundColor: 'rgb(54,54,54)',
  size: '22px',
}







let textMagY = 65;
document.addEventListener('scroll', () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  const adaModal = document.querySelector('#ADA_widget')
  if (adaModal.style.display !== 'flex') {
    if (window.scrollY >= scrollableHeight - 1) { // at bottom of page
      textMagY = 150
    } else if (window.scrollY === 0) { // at top of page
      textMagY = -0
    } else {
      textMagY = 65
    }
  }
})

//////////// Text Magnify ///////////////////
$(document).on('mousemove', function (e) {
  const textMagnify = document.querySelector('#text_magnify')
  $('#text_magnify').css({
    left: e.pageX + 15,
    top: e.pageY - textMagY
  });
});

const hoverTextFunc = () => {
  //If ToggleTextMagnifier is checked
  if ($('[id="ToggleTextMagnifier"]').is(':checked')) {
    $('#edit-text-magnify').css("display", "flex").hide().fadeIn();
    $('.text-mag-preview-container').css("display", "flex").hide().fadeIn();
    var timeout = null;
    clearTimeout(timeout)
    $('#text_magnify').attr('style', 'opacity: 1!important');
    $('#text_magnify').attr('style', 'display: none!important');
    $("body").addClass("TextMagnifier");
    $('[id="ToggleZoom"]').prop('checked', false);

    // $('#text_magnify').attr('style', 'display: block!important');
    $('p, a, :header, span, button, td').not('#ada-triggers, #ada-triggers ul, #ada-triggers ul li, #ada-triggers *, #reset-text-magnify-btn, #reset-img-magnify-btn').hover(
      function (e) {
        var TextMagnify = $(this).text();





        $("#text_magnify").text(TextMagnify);
        $('#text_magnify').css({ 'color': textMagObj.color, 'background-color': textMagObj.backGroundColor, 'font-size': textMagObj.size });

        timeout = setTimeout(() => {
          $('#text_magnify').show()
        }, 500);
        if ($('#text_magnify').is(':empty') || TextMagnify === '') {
          $('#text_magnify').attr('style', 'display: none!important');
          clearTimeout(timeout)
        }
      },
      function (e) {
        //do the mouseleave things here...

        $('#text_magnify').attr('style', 'display: none!important');
        clearTimeout(timeout)
      }
    );//end of hover
    $(window).scroll(function () {
      $('#text_magnify').attr('style', 'display: none!important');
      clearTimeout(timeout)
    });
    addWidgetControls('ToggleTextMagnifier', 'Text magnify')

    widgetItemObj.isTextMag = true
  }// if not checked

  else {
    $('#edit-text-magnify').fadeOut()
    $('.text-mag-preview-container').fadeOut()
    $("body").removeClass("TextMagnifier");
    $('#text_magnify').attr('style', 'display: none!important');
    clearTimeout(timeout)
    removeWidgetControls(['ToggleTextMagnifier'])
    widgetItemObj.isTextMag = false
  }
  checkIfWidgetActive()
}



// Toggle Text Magnifier
$(function () {
  $('[id="ToggleTextMagnifier"]').change(function () {
    hoverTextFunc()
  }); //end of change
}); // end of function



$(document).ready(function () {
  // read the current/previous setting
  $("input.switch-input[type=checkbox]").each(function () {
    //get name of input
    var name = $(this).attr('name');
    if ($.cookie(name) && $.cookie(name) == "true") {
      $(this).prop('checked', $.cookie(name));
      $("body").addClass(name);
      //If ToggleTextMagnifier is checked
      hoverTextFunc()
    }// end of if
  });//end of each
  // event management
  $("input.switch-input[type=checkbox]").change(function () {
    var name = $(this).attr("name");
    $.cookie(name, $(this).prop('checked'), { expires: 30, })
  });
});


if ($.cookie('ImageDescription') == "true") {
  $('#ToggleImageDescription').prop('checked', false).trigger('change')
  setTimeout(() => {
    $('#ToggleImageDescription').prop('checked', true).trigger('change')
  }, 500);
}


let imgMagObj = {
  color: 'rgb(255,255,255)',
  backGroundColor: 'rgb(54,54,54)',
  size: '22px!important',
}


const imgMagFunc = () => {
  if ($('[id="ToggleImageDescription"]').is(':checked')) {

    $('#edit-img-magnify').css("display", "flex").hide().fadeIn();
    $('.img-mag-preview-container').css("display", "flex").hide().fadeIn();
    $('#ImageDescription_magnify').attr('style', 'opacity: 1!important');
    $('#ImageDescription_magnify').attr('style', 'display: none!important');
    $("body").addClass("ImageDescription");
    $('img[alt], .feature .img[alt], i.fa[alt]').hover(
      function (e) {
        //do the mouseenter things here...

        var ImageDescription = $(this).attr("alt");
        $("#ImageDescription_magnify").text(ImageDescription);
        $('#ImageDescription_magnify').show()

        $('#ImageDescription_magnify').css({ 'color': imgMagObj.color, 'background-color': imgMagObj.backGroundColor, 'font-size': imgMagObj.size });

        //If #text_magnify is empty, hide
        if ($('#ImageDescription_magnify').is(':empty') || ImageDescription === '') {
          $('#ImageDescription_magnify').attr('style', 'display: none!important');
        }
      },
      function (e) {
        //do the mouseleave things here...
        $('#ImageDescription_magnify').attr('style', 'display: none!important');
      }
    );
    $(window).scroll(function () {
      $('#ImageDescription_magnify').attr('style', 'display: none!important');
    });
    addWidgetControls('ToggleImageDescription', 'Image description')
    widgetItemObj.isImgMag = true
  } else {

    $('#edit-img-magnify').fadeOut()
    $('.img-mag-preview-container').fadeOut()
    $("body").removeClass("ImageDescription");
    $('img[alt], .feature .img[alt], i.fa[alt]').hover(
      function (e) {
        //do the mouseleave things here...
        $('#ImageDescription_magnify').attr('style', 'display: none!important');
      });
    removeWidgetControls(['ToggleImageDescription'])
    widgetItemObj.isImgMag = false
  } //end of else
  checkIfWidgetActive()
}

// Toggle Image Description
$(function () {
  $('[id="ToggleImageDescription"]').change(function () {
    imgMagFunc()
  }); //end of change
}); // end of function

// cookie imgDescription
if ($.cookie('ImageDescription') == "true") {
  $('#ToggleImageDescription').prop('checked', true).trigger('change')
}

////////////image description magnify///////////////////
$(document).on('mousemove', function (e) {
  $('#ImageDescription_magnify').css({
    left: e.pageX + 10,
    top: e.pageY - 65
  });
});

// text and image magnifier COLOR control
const textMagColorControls = (colors, preview, cssObj) => {
  const colorPresets = document.querySelectorAll(colors)
  colorPresets.forEach(preset => {
    preset.addEventListener('mouseenter', () => {
      let hoverColor = $(preset).css("background-color");
      let hoverBackGroundColor = $(preset).css("border-color");
      $(preview).css({ 'color': hoverColor, 'background-color': hoverBackGroundColor, 'border-color': hoverColor });
    })
    preset.addEventListener('mouseleave', () => {
      $(preview).css({ 'color': cssObj.color, 'background-color': cssObj.backGroundColor, 'border-color': cssObj.color });
    })
    preset.addEventListener('click', () => {
      cssObj.color = $(preset).css("background-color");
      cssObj.backGroundColor = $(preset).css("border-color");

      colorPresets.forEach(items => {
        items.classList.remove('active')
      })
      preset.classList.add('active')
      $(preview).css({ 'color': cssObj.color, 'background-color': cssObj.backGroundColor, 'border-color': cssObj.color });
      $.cookie(colors.slice(1), preset.id, { expires: 30 })
    })
  })
}

const restoreMagColorDefault = (type, colors, cssObj, preview) => {
  const colorPresets = document.querySelectorAll(colors)
  colorPresets.forEach(items => {
    items.classList.remove('active')
  })
  let newId = null
  if ($.cookie('DarkContrastBackgroundCookie') == "yes" || $.cookie('InvertBackgroundCookie') == "yes") {
    newId = `#${type}-mag-color-4`
    cssObj.color = '#363636';
    cssObj.backGroundColor = '#ffffff';
  } else {
    newId = `#${type}-mag-color-1`
    cssObj.color = 'rgb(255,255,255)';
    cssObj.backGroundColor = 'rgb(54,54,54)';
  }
  $(preview).css({ 'color': cssObj.color, 'background-color': cssObj.backGroundColor, 'border-color': cssObj.color });
  document.querySelector(newId).classList.add('active')
  $.cookie(colors.slice(1), newId.slice(1), { expires: 30 })
}

// text and image mag SIZE control
const textMagSizeControls = (input, preview, cssObj) => {
  const textMagSizeInput = document.querySelector(input)
  textMagSizeInput.addEventListener('change', () => {
    let updatedPxSize = `${textMagSizeInput.value}px`
    cssObj.size = updatedPxSize;
    $.cookie(input.slice(1), updatedPxSize, { expires: 30 })
    $(preview).css("fontSize", updatedPxSize);
  })
}

const restoreDefaultMagnify = (type, colors, sizeInput, cssObj, preview) => {
  restoreMagColorDefault(type, colors, cssObj, preview)
  cssObj.size = '22px'
  $(sizeInput).val(22).change();
  $.cookie(sizeInput.slice(1), '22px', { expires: 30 })

  $(preview).css({ 'font-size': cssObj.size });
}

// func to handle cookies for text and img size and color
const magnifyCookieHandler = (type, cookie, preview, obj) => {
  if ($.cookie(cookie.slice(1))) {
    let cookieVal = $.cookie(cookie.slice(1))
    if (type === 'size') {
      obj.size = cookieVal
      $(cookie).val(parseInt(cookieVal)).change();
      $(preview).css("fontSize", obj.size);
    } else {
      const colorPresets = document.querySelectorAll(cookie)
      colorPresets.forEach(items => {
        items.classList.remove('active')
      })
      let cookieIdVal = `#${cookieVal}`
      document.querySelector(cookieIdVal).classList.add('active')
      obj.color = $(cookieIdVal).css("background-color");
      obj.backGroundColor = $(cookieIdVal).css("border-color");
      $(preview).css({ 'color': obj.color, 'background-color': obj.backGroundColor, 'border-color': obj.color });
    }
  }
}

// text magnify settings
textMagColorControls('.text-magnify-color-swatch', '.text-magnifier-preview', textMagObj)
textMagSizeControls('.text-magnify-size-input', '.text-magnifier-preview', textMagObj)
magnifyCookieHandler('size', '.text-magnify-size-input', '.text-magnifier-preview', textMagObj)
magnifyCookieHandler('color', '.text-magnify-color-swatch', '.text-magnifier-preview', textMagObj)
restoreDefaultTextMagSettings = () => {

  restoreDefaultMagnify('text', '.text-magnify-color-swatch', '.text-magnify-size-input', textMagObj, '.text-magnifier-preview')
}



//img description settings
textMagColorControls('.img-magnify-color-swatch', '.img-magnifier-preview', imgMagObj)
textMagSizeControls('.img-magnify-size-input', '.img-magnifier-preview', imgMagObj)
magnifyCookieHandler('size', '.img-magnify-size-input', '.img-magnifier-preview', imgMagObj)
magnifyCookieHandler('color', '.img-magnify-color-swatch', '.img-magnifier-preview', imgMagObj)
restoreDefaultImageSettings = () => {
  restoreDefaultMagnify('img', '.img-magnify-color-swatch', '.img-magnify-size-input', imgMagObj, '.img-magnifier-preview')
}



//fix bugs caused by reading mask creating an infinite scroll
const preventPageScroll = () => {
  var top = 0
  var pageHeight = document.documentElement.scrollHeight;
  var bottom = top + pageHeight - $(window).height();
  $(document).on("scroll", function (e) {
    var windowScrollTop = $(window).scrollTop();
    if (windowScrollTop < top) {
      $(document).scrollTop(top);
    }
    else if (windowScrollTop > bottom) {
      $(document).scrollTop(bottom);
    }
    else {
      return;
    }
  });
}

// function to create the mask
const createMaskFunc = () => {
  widgetItemObj.isReadingMask = true
  // $("body").addClass("ReadingMask_ON");
  // $("#top_mask").fadeIn('slow')
  // $("#bottom_mask").fadeIn('slow')
  // addWidgetControls('ToggleReadingMask', 'Reading mask')
  storeModalScrollPosition()
  modalDisplayOpenOrClose()
  forceReload()
}

// function to run when page resized
const resizeMaskFunc = () => {
  if (document.body.classList.contains('ReadingMask_ON')) {
    $("#top_mask").fadeOut()
    $("#bottom_mask").fadeOut()
    setTimeout(() => {
      storeModalScrollPosition()
      modalDisplayOpenOrClose()
      forceReload()
      // createMaskFunc()
    }, 500);
  }
}

// on page load
// reload on page resize if reading mask is active
var resizeId;
window.addEventListener("resize", (event) => {
  $.cookie("reading-mask-reload", true, { expires: 30 });
  clearTimeout(resizeId);
  resizeId = setTimeout(resizeMaskFunc, 500);
});




// Toggle Reading Mask
$(function () {
  $('[id="ToggleReadingMask"]').change(function () {
    if ($(this).is(':checked')) {
      $("#edit-reading-mask").css("display", "flex").hide().fadeIn()
      $.cookie("edit-reading-mask", true, { expires: 30 });
      widgetItemObj.isReadingMask = true
      storeModalScrollPosition()
      modalDisplayOpenOrClose()
      forceReload()
      // $('body').css({"height": "6px", "margin-top": "110px"});

    } else {

      $("body").removeClass("ReadingMask_ON");
      $("body").removeClass("ReadingMask ");
      $("#top_mask").fadeOut()
      $("#bottom_mask").fadeOut()
      $("#edit-reading-mask").fadeOut()
      $.cookie("edit-reading-mask", false, { expires: 30 });
      removeWidgetControls(['ToggleReadingMask'])
      widgetItemObj.isReadingMask = false
    }
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
      //If ToggleReadingMask is checked
      if ($('[id="ToggleReadingMask"]').is(':checked')) {
        $("body").addClass(name);
        $("body").addClass("ReadingMask_ON");
        $("#top_mask").fadeIn('slow')
        $("#bottom_mask").fadeIn('slow')
      }
    }// end of if
  });//end of each
  // event management
  $("input.switch-input[type=checkbox]").change(function () {
    var name = $(this).attr("name");
    $.cookie(name, $(this).prop('checked'), { expires: 30, })
  });
});


//**************mask settings*******************
// *************change opacity*******************
var opacityCookie = $.cookie("readingMaskOpacity");
if (opacityCookie) {
  $("#reading-mask-opacity").val(opacityCookie);
  $(".reading-mask").css({ "opacity": opacityCookie })
}

let indentAmount = '6px'

document.querySelectorAll('.opacity-icons').forEach(icon => {
  icon.addEventListener('click', () => {
    selectChangeHandler(icon, 'opacity-icons', '#reading-mask-opacity option:selected')
    let newVal = $('#reading-mask-opacity').val();
    $(".reading-mask").css({ "opacity": newVal })
    $.cookie("readingMaskOpacity", newVal, { expires: 30 })
    // changeIndent(maskOpacityInput.value, '1', '#ReadingMask_option select', indentAmount)
  })
})

const maskOpacityInput = document.getElementById('reading-mask-opacity')
maskOpacityInput.addEventListener('change', () => {

  $(".reading-mask").css({ "opacity": maskOpacityInput.value })
  $.cookie("readingMaskOpacity", maskOpacityInput.value, { expires: 30 })

  // changeIndent(maskOpacityInput.value, '1', '#ReadingMask_option select', indentAmount)
})



// **********************change mask size*****************
let currHeight = window.innerHeight


let initialYVal = 130
let yVal = initialYVal + currHeight


//*************set from cookie */
var maskSizeCookieVal = $.cookie("readingMaskHeight");
if (maskSizeCookieVal) {
  $("#mask-size-input").val(maskSizeCookieVal);
  yVal = parseInt(maskSizeCookieVal) + parseInt(currHeight)

}


const maskSizeInputRange = document.getElementById('mask-size-input')
maskSizeInputRange.addEventListener('change', () => {

  let sizeInputVal = maskSizeInputRange.value
  const calcHeight = parseInt(sizeInputVal) + parseInt(currHeight)
  yVal = calcHeight

  $.cookie("readingMaskHeight", sizeInputVal, { expires: 30 })

})

$(document).bind('mousemove', function (e) {

  $('#top_mask').css({
    top: e.pageY - yVal
  });
  $('#bottom_mask').css({
    top: e.pageY + 10
  });
});

var maskColorCookieVal = $.cookie("readingMaskColor");
if (maskColorCookieVal) {
  changeColorPicker(maskColorCookieVal, '.reading-mask', '#mask_hexVal', "#mask_color")
}


// change mask color
const maskColorChangeInput = document.getElementById('mask_color')
maskColorChangeInput.addEventListener('change', () => {
  changeColorPicker(maskColorChangeInput.value, '.reading-mask', '#mask_hexVal')
  $.cookie("readingMaskColor", maskColorChangeInput.value, { expires: 30 })
})

//reset cookies
const resetMaskSettingsCookies = () => {
  $.removeCookie('readingMaskOpacity');
  $.removeCookie('readingMaskHeight');
  $.removeCookie('readingMaskColor');
}

// restore default
const restoreDefaultMaskSettings = () => {
  let defaultColor = '#363636'
  let defaultOpacity = '.5'
  if ($.cookie("InvertBackgroundCookie") === 'yes' || $.cookie("DarkContrastBackgroundCookie") === 'yes') {
    defaultColor = '#ffffff'
    defaultOpacity = '.7'
  }

  changeColorPicker(defaultColor, '.reading-mask', '#mask_hexVal', "#mask_color")
  $('#reading-mask-opacity').val(defaultOpacity);
  $(".reading-mask").css({ "opacity": defaultOpacity })


  yVal = initialYVal + currHeight
  let restoredVal = yVal + ''
  $("#mask-size-input").val(130);
  resetMaskSettingsCookies()
}


// pageload/cookies etc
if ($.cookie("edit-reading-mask") === 'true') {
  $("#edit-reading-mask").css("display", "flex").hide().fadeIn()
}

let reloadCookie = $.cookie("reading-mask-reload")
if (!reloadCookie) {
  $.cookie("reading-mask-reload", true, { expires: 30 });
}


setTimeout(() => {
  if (document.body.classList.contains('ReadingMask_ON')) {

    $('.reading-mask').fadeIn()
    preventPageScroll()
    $.cookie("reading-mask-reload", false, { expires: 30 });
  }
}, 300);


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
    $.cookie(name, $(this).prop('checked'), { expires: 30, })
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
      $.cookie("edit-reading-guide", true, { expires: 30 });
      $("#tail").hide()
      $("body").addClass("CursorGuide");
      $("#tail").fadeIn(500)
      addWidgetControls('ToggleReadingGuide', 'Reading guide')
      widgetItemObj.isReadingGuide = true
    } else {

      $("#edit-reading-guide").fadeOut()
      $.cookie("edit-reading-guide", false, { expires: 30 });
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
  $.cookie("readingGuideHeight", guideYVal, { expires: 30 })
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
  $.cookie("readingGuideColor", guideColorChangeInput.value, { expires: 30 })
})

//reset cookies
const resetGuideSettingsCookies = () => {
  $.removeCookie('readingGuideHeight');
  $.removeCookie('readingGuideColor');
}

// restore default
const restoreDefaultguideSettings = () => {
  let defaultColor = '#363636'
  if ($.cookie("InvertBackgroundCookie") === 'yes' || $.cookie("DarkContrastBackgroundCookie") === 'yes') {
    defaultColor = '#ffffff'
  }
  changeColorPicker(defaultColor, '#tail', '#guide_hexVal', "#guide_color")
  guideYVal = 8
  $("#guide-size-input").val(guideYVal)
  $("#tail").css({ "height": guideYVal });
  resetGuideSettingsCookies()
}


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

// Toggle Highlight Hover
$(function () {
  $('[id="ToggleHighlightHover"]').change(function () {
    if ($(this).is(':checked')) {
      $("body").addClass("HighlightHover");
      addWidgetControls('ToggleHighlightHover', 'Highlight on hover')
      widgetItemObj.isHighlighted = true
    } else {
      $("body").removeClass("HighlightHover");
      removeWidgetControls(['ToggleHighlightHover'])
      widgetItemObj.isHighlighted = false
    }
    checkIfWidgetActive()
  });
});

// Toggle Highlight Links
$(function () {
  $('[id="ToggleHighlightLinks"]').change(function () {
    if ($(this).is(':checked')) {
      $("body").addClass("HighlightLinks");
      addWidgetControls('ToggleHighlightLinks', 'Highlight all links')
      widgetItemObj.isOutlined = true
    } else {
      $("body").removeClass("HighlightLinks");
      removeWidgetControls(['ToggleHighlightLinks'])
      widgetItemObj.isOutlined = false
    }
    checkIfWidgetActive()
  });
});



$(document).ready(function () {
  /////////////////////////////////////////////////////////  TEXT TO SPEECH - with on click //////////////////////////////////////////////////////////////
  //Hides TTS on Android Devices
  function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent.match(/Android/i)) {
      //return 'Android';
      $('#TTS_option').hide();
    }
  }

  const resetSpeech = () => {
    $('.curr-active-item').removeClass('curr-active-item')
    $('.play').removeClass('audio-playing audio-paused')
    $('.play').addClass('audio-inactive')
    // $('.play').find('.fa').removeClass('fa-pause')
    // $('.play').find('.fa').addClass('fa-play ')
    $('.play').find('.toggle-audio').attr("src","/flourish/img/play.png").removeClass('pr-1').addClass('pr-0');
    synth.cancel();
  }

  var speechVol = $.cookie("speechVolCookie");
  var speechRate = $.cookie("speechRateCookie");
  var speechPitch = $.cookie("speechPitchCookie");

  const getCookieVal = (cookie) => {
    let value = 5
    if ($.cookie(cookie)) {
      value = $.cookie(cookie)
    }
    return value
  }
  let volValue = getCookieVal(speechVol)

  const updateSpeechCookies = (item, value) => {
    resetSpeech()
    $.cookie(item, value, { expires: 30 })
  }

  getMobileOperatingSystem();
  // roundSlider.js -- https://roundsliderui.com/
  $("#volume").roundSlider({
    sliderType: "min-range",
    radius: 60,
    showTooltip: true,
    width: 10,
    value: volValue.speechVol ? volValue.speechVol : 5,
    step: 1,
    handleSize: 0,
    max: 10,
    min: 0,
    handleShape: "square",
    circleShape: "half-top",
    change: function (e) {
      updateSpeechCookies('speechVol', e.value)
    }
  });


  $("#rate").roundSlider({
    sliderType: "min-range",
    radius: 60,
    showTooltip: true,
    width: 10,
    value: volValue.speechRate ? volValue.speechRate : 5,
    step: 1,
    handleSize: 0,
    max: 10,
    min: 0,
    handleShape: "square",
    circleShape: "half-top",
    change: function (e) {
      updateSpeechCookies('speechRate', e.value)
    }
  });

  $("#pitch").roundSlider({
    sliderType: "min-range",
    radius: 60,
    showTooltip: true,
    width: 10,
    value: volValue.speechPitch ? volValue.speechPitch : 5,
    step: 1,
    handleSize: 0,
    max: 10,
    min: 0,
    handleShape: "square",
    circleShape: "half-top",
    change: function (e) {
      updateSpeechCookies('speechPitch', e.value)
    }
  });


  const resetVoiceSettings = () => {
    $("#volume").roundSlider({
      value: 5
    });
    $("#rate").roundSlider({
      value: 5
    });
    $("#pitch").roundSlider({
      value: 5
    });
  }

  const speechIcon = document.querySelectorAll('.speech-icon')
  speechIcon.forEach(icon => {
    icon.addEventListener('click', () => {
      let currValId = null;
      let currCookie = null;
      if (icon.classList.contains('speech-volume')) {
        currValId = '#volume'
        currCookie = 'speechVol'
      } else if (icon.classList.contains('speech-rate')) {
        currValId = '#rate'
        currCookie = 'speechRate'
      } else {
        currValId = '#pitch'
        currCookie = 'speechPitch'
      }
      let currRoundSlideValue = $(currValId).roundSlider("option", "value")
      if (icon.classList.contains('speech-plus-icon')) {
        $(currValId).roundSlider({ value: currRoundSlideValue + 1 });
        $.cookie(currCookie, currRoundSlideValue + 1, { expires: 30 })
      } else {
        $(currValId).roundSlider({ value: currRoundSlideValue - 1 });
        $.cookie(currCookie, currRoundSlideValue - 1, { expires: 30 })
      }
      resetSpeech()
    })
  })


  const fullVoiceReset = () => {
    $.removeCookie('voiceCookie');
    resetVoiceSettings()
    resetSpeech()
    resetVoiceDefault()

  }




  const resetVoiceBtn = document.querySelector('#reset-voice-btn')
  resetVoiceBtn.addEventListener('click', () => {
    fullVoiceReset()
  })

  $("#volume input").addClass("volume_selector");
  $("#rate input").addClass("rate_selector");
  $("#pitch input").addClass("pitch_selector");
  $("<span class='headings'>Volume</span>").appendTo("#volume");
  $("<span class='headings'>Rate</span>").appendTo("#rate");
  $("<span class='headings'>Pitch</span>").appendTo("#pitch");

  let ssu;
  let voices;
  var synth = window.speechSynthesis;
  var voiceSelect = document.getElementById('voice');
  var volumeInput = document.querySelector('.volume_selector');
  var rateInput = document.querySelector('.rate_selector');
  var pitchInput = document.querySelector('.pitch_selector');

  // Fetch the list of voices and populate the voice options.
  function loadVoices() {
    // Fetch the available voices.

    var voiceList = speechSynthesis.getVoices();


    // Loop through each of the voices.
    voiceList.forEach(function (voice, i) {
      // if (i !== 0 && i !== 2 && i !== 4 && i !== 5 && i !== 6) return;

      if (voice.name !== 'Google US English' && voice.name !== "Microsoft David - English (United States)" && voice.name !== 'Microsoft Zira - English (United States)' && voice.name !== 'Google UK English Male' && voice.name !== 'Google UK English Female') {
        return
      }

      //Returns Microsoft Mark, Microsoft Zira & Google US English
      // Create a new option element.
      var option = document.createElement('option');
      // Set the options value and text.
      option.value = voice.name;
      option.innerHTML = voice.name;
      // Add the option to the voice selector.
      voiceSelect.appendChild(option);
    });
  }

  // Execute loadVoices.
  loadVoices();

  // document.addEventListener("DOMContentLoaded", function () {
  //     let selectElement = document.querySelector(".goog-te-combo");
  //     selectElement.addEventListener('change', (event) => {
  //         loadVoices()
  //     })
  // });








  // Chrome loads voices asynchronously.
  synth.onvoiceschanged = function (e) {
    loadVoices();
  };

  $(document).ready(function () {
    initSpeechSynthesis();
  });

  $("#voice").on("change", function (e) {
    resetSpeech()
    let currVoice = $('#voice').find(":selected").text();
    var voiceCookie = $.cookie("speechVoiceCookie");
    $.cookie("voiceCookie", currVoice, { expires: 30 })
  });

  const resetVoiceDefault = () => {
    if ($("#voice option[value='Google US English']").length > 0) {
      return $("#voice").val('Google US English');
    } else {
      return $("#voice").val($("#voice option:first").val());
    }
  }



  setTimeout(() => {
    if ($.cookie("voiceCookie")) {
      let cookieValue = $.cookie("voiceCookie")
      $("#voice").val(cookieValue)
    } else {
      resetVoiceDefault()
    }
  }, 500);

  $('<div class="audio_state">\
  <button class="play audio-inactive btn " title="Play"><img class="toggle-audio" src="/flourish/img/play.png" alt="toggle speech icon"></button>\
  <button class="stop btn " title="Cancel"><img class="mr-1" src="/flourish/img/reset.png" alt="reset audio icon"> Reset</button>\
  </div>').insertAfter("p");

  //https://stackoverflow.com/a/30361156/10792033
  //Wrapping groups of adjacent siblings
  $('div.audio_state').each(function () {
    $(this)
      .prev()
      .addBack()
      .wrapAll('<section class="TTS_content"></section>');
  });


  /***** ON Play CLICK *****/
  $('div.audio_state .play').each(function (index) {
    $(this).click(function () {
      if (!$(this).hasClass('curr-active-item')) {
        resetSpeech()
        $(this).addClass('curr-active-item')
      }
      // $(this).find('.fa').removeClass('fa-pause')
      // $(this).find('.fa').addClass('fa-play ')
      $(this).find('.toggle-audio').attr("src","/flourish/img/play.png").removeClass('pr-1').addClass('pr-0');
      if ($(this).hasClass('audio-playing')) {
        $(this).removeClass('audio-inactive audio-playing')
        $(this).addClass('audio-paused')
        synth.pause()
      } else {
        // $(this).find('.fa').removeClass('fa-play');
        // $(this).find('.fa').addClass('fa-pause');
        $(this).find('.toggle-audio').attr("src","/flourish/img/pause.png").removeClass('pr-0').addClass('pr-1');
        if ($(this).hasClass('audio-inactive')) {
          $('.play').removeClass('audio-inactive audio-paused')
          synth.cancel();
          ssu.text = $(this).parent("div.audio_state").prev("p").text();
          ssu.volume = parseFloat(volumeInput.value / 10);
          ssu.rate = parseFloat(rateInput.value / 5);
          ssu.pitch = parseFloat(pitchInput.value / 5 + .01);
          if (voiceSelect.value) {
            ssu.voice = speechSynthesis.getVoices().filter(function (voice) {
              return voice.name == voiceSelect.value;
            })[0];
          }
          $(this).addClass('audio-playing')
          synth.speak(ssu);
          ssu.addEventListener("end", (event) => {
            resetSpeech()
          });
        } else if ($(this).hasClass('audio-paused')) {

          $(this).removeClass('audio-inactive audio-paused')
          $(this).addClass('audio-playing')
          synth.resume()
        }
      }
    });
  });

  //Global Cancels Speech on reset button
  $(".stop").on("click", function () {
    resetSpeech()
  });

  $("#ADA_trigger").click(function () {

    resetSpeech()
  });

  // Cancels all utterances if the user leaves the site.
  window.onbeforeunload = function (e) {
    resetSpeech()
  };

  function initSpeechSynthesis() {
    if (!('speechSynthesis' in window)) {
      alert("Sorry, your browser doesn't support text to speech!");
      return;
    }
    ssu = new SpeechSynthesisUtterance();
    ssu.lang = 'en-US';
  };


  document.querySelector('#ADA_reset').addEventListener('click', () => {
    fullVoiceReset()
    loadVoices()
  })
  document.querySelector('#reset-ada').addEventListener('click', () => {
    fullVoiceReset()
    loadVoices()
  })


}); //end of doc ready

if ($.cookie('TTS_click_enabled') == "true") {
  $("#speech-settings").removeClass("disable");
}

// Toggle Text-to-Speech click
$(function () {
  $('[id="ToggleTTS_click"]').change(function () {
    if ($(this).is(':checked')) {
      $(".audio_state").hide()
      $("body").addClass("TTS_click_enabled");
      $(".audio_state").fadeIn(600)
      $("#speech-settings").removeClass("disable");
      // $("#speech-settings").removeClass("disable-settings");
      if ($('#ToggleReadingMask').is(':checked')) {
        storeModalScrollPosition()
        modalDisplayOpenOrClose()
        forceReload()
      }
      if ($.cookie('ReadingMask')) {
        if ($.cookie('ReadingMask') === 'false') {
          $.removeCookie('ReadingMask');
          storeModalScrollPosition()
          modalDisplayOpenOrClose()
          forceReload()
        }
      }
      addWidgetControls('ToggleTTS_click', 'Text to speech')
      widgetItemObj.isSpeech = true
    } else {
      $("#speech-settings").addClass("disable");
      if ($.cookie('ReadingMask')) {
        if ($.cookie('ReadingMask') === 'true') {

          storeModalScrollPosition()
          modalDisplayOpenOrClose()
          forceReload()

        }
        $.cookie("reading-mask-reload", true, { expires: 30 });
      }
      // $("#speech-settings").addClass("disable-settings");
      $(".audio_state").fadeOut(500)
      setTimeout(() => {
        $("body").removeClass("TTS_click_enabled");
        $.cookie('TTS_click_enabled', 'false');
      }, 500);
      removeWidgetControls(['ToggleTTS_click'])
      widgetItemObj.isSpeech = false
    }
    $.cookie("reading-mask-reload", true, { expires: 30 });
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

      //If ToggleTTS_click is checked
      if ($('[id="ToggleTTS_click"]').is(':checked')) {
        $("body").addClass("TTS_click_enabled");
      }


    }// end of if
  });//end of each
  // event management
  $("input.switch-input[type=checkbox]").change(function () {
    var name = $(this).attr("name");
    $.cookie(name, $(this).prop('checked'), { expires: 30, })
  });
});

// tons of unnecessary duplicated code -- should be refactored to be shorter

const makeColorPresetsFalse = (presetArr) => {
  for (let i = 0; i < presetArr.length; i++) {
    presetArr[i] = false
  }
}

const maskColorPresetChangeHandler = (color, ifWhite) => {
  if (!$.cookie('readingMaskColor')) {
    changeColorPicker(color, '.reading-mask', '#mask_hexVal', "#mask_color")
    let defaultOpacity = '.5'
    if (ifWhite) {

      defaultOpacity = '.7'
    }
    $('#reading-mask-opacity').val(defaultOpacity);
    $(".reading-mask").css({ "opacity": defaultOpacity })
  }

  if (!$.cookie('readingGuideColor')) {
    changeColorPicker(color, '#tail', '#guide_hexVal', "#guide_color")
  }
}

//   cache.textColor.value = "#212529";
//   cache.linkColor.value = "#3863FF";)

const colorPresetToDefault = () => {
  maskColorPresetChangeHandler('#363636')

  $('body').removeClass('inverted');
  $('body').removeClass('highcontrast');
  $('body').removeClass('desaturated');
  $("html").removeClass("highsaturation");
  $("html").removeClass("lowsaturation");
  if ($.cookie('InvertBackgroundCookie') == "yes") {
    $.cookie("InvertBackgroundCookie", null, {
      expires: 30
    });
  }
  if ($.cookie('DesaturatedBackgroundCookie') == "yes") {
    $.cookie("DesaturatedBackgroundCookie", null, {
      expires: 30
    });
  }
  if ($.cookie('DarkContrastBackgroundCookie') == "yes") {
    $.cookie("DarkContrastBackgroundCookie", null, {
      expires: 30
    });
  }
  if ($.cookie('HighSaturationBackgroundCookie') == "yes") {
    $.cookie("HighSaturationBackgroundCookie", null, {
      expires: 30
    });
  }
  if ($.cookie('LowSaturationBackgroundCookie') == "yes") {
    $.cookie("LowSaturationBackgroundCookie", null, {
      expires: 30
    });
  }
  $("#DefaultBG_option").addClass('active').siblings().removeClass('active');
  removeWidgetControls(['DarkContrastBackground', 'DesaturateBackground', 'HighSaturationBackground', 'LowSaturationBackground', 'InvertBackground'])
  // makeColorPresetsFalse([widgetItemObj.isDarkContrast, widgetItemObj.isDesaturated, widgetItemObj.isInverted, widgetItemObj.isHighSat, widgetItemObj.isLowSat])

  widgetItemObj.isDarkContrast = false
  widgetItemObj.isDesaturated = false
  widgetItemObj.isInverted = false
  widgetItemObj.isHighSat = false
  widgetItemObj.isLowSat = false
  if (!$.cookie('text-magnify-color-swatch') || $.cookie('text-magnify-color-swatch') === "text-mag-color-4") {
    restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
    restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')
  }
  checkIfWidgetActive()
}

$(document).ready(function () {
  //When 'a.defaultBackground' is clicked, removes other background cookies and their related classes
  $("#ADA_widget a.defaultBackground").click(function () {
    colorPresetToDefault()
  });
}); // end of doc ready




$(document).ready(function () {
  // Cookie for Dark Contrast
  // Check (onLoad) if DarkContrastBackgroundCookie is there and set the class to body if it is
  // If DarkContrastBackgroundCookie is set remove other background cookies and their related classes
  // Add active class to li
  if ($.cookie('DarkContrastBackgroundCookie') == "yes") {
    maskColorPresetChangeHandler('#ffffff', true)

    $("#ADA_widget #DarkContrastBG_option").addClass("active");
    $("body").addClass("highcontrast");
    $('body').removeClass('desaturated');
    $('body').removeClass('inverted');
    $("html").removeClass("highsaturation");
    $("html").removeClass("lowsaturation");
    $("#ADA_widget #DefaultBG_option").removeClass("active");
    $.cookie('DesaturatedBackgroundCookie') == "no";
    $.cookie('DesaturatedBackgroundCookie') == "undefined";
    $.cookie("DesaturatedBackgroundCookie", null, {
      expires: 30
    });
    $.cookie('InvertBackgroundCookie') == "no";
    $.cookie('InvertBackgroundCookie') == "undefined";
    $.cookie("InvertBackgroundCookie", null, {
      expires: 30
    });
    $.cookie('HighSaturationBackgroundCookie') == "no";
    $.cookie('HighSaturationBackgroundCookie') == "undefined";
    $.cookie("HighSaturationBackgroundCookie", null, {
      expires: 30
    });
    $.cookie('LowSaturationBackgroundCookie') == "no";
    $.cookie('LowSaturationBackgroundCookie') == "undefined";
    $.cookie("LowSaturationBackgroundCookie", null, {
      expires: 30
    });
    if (!$.cookie('text-magnify-color-swatch') || $.cookie('text-magnify-color-swatch') === "text-mag-color-1") {

      restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
      restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')
    }

  }



  // When 'a.DarkContrastBackground' is clicked remove other background cookies
  $("#ADA_widget a.DarkContrastBackground").click(function () {

    maskColorPresetChangeHandler('#ffffff', true)




    resetColorPicker()
    $.cookie("DesaturatedBackgroundCookie", null, {
      expires: 30
    });
    $.cookie("InvertBackgroundCookie", null, {
      expires: 30
    });
    $.cookie("HighSaturationBackgroundCookie", null, {
      expires: 30
    });
    $.cookie("LowSaturationBackgroundCookie", null, {
      expires: 30
    });
    if ($.cookie('DarkContrastBackgroundCookie') == "undefined" || $.cookie('DarkContrastBackgroundCookie') == "no") {
      $.cookie('DarkContrastBackgroundCookie', 'yes', { expires: 30 });
      $("body").addClass("highcontrast");
      $('body').removeClass('desaturated');
      $('body').removeClass('inverted');
      $("html").removeClass("highsaturation");
      $("html").removeClass("lowsaturation");

    } else {
      $.cookie('DarkContrastBackgroundCookie', 'yes', { expires: 30 });
      $("body").addClass("highcontrast");
      $('body').removeClass('desaturated');
      $('body').removeClass('inverted');
      $("html").removeClass("highsaturation");
      $("html").removeClass("lowsaturation");

    }
    addWidgetControls('DarkContrastBackground', 'Dark contrast preset')
    removeWidgetControls(['DesaturateBackground', 'HighSaturationBackground', 'LowSaturationBackground', 'InvertBackground'])
    makeColorPresetsFalse([widgetItemObj.isDesaturated, widgetItemObj.isInverted, widgetItemObj.isHighSat, widgetItemObj.isLowSat])
    widgetItemObj.isDarkContrast = true
    if (!$.cookie('text-magnify-color-swatch') || $.cookie('text-magnify-color-swatch') === "text-mag-color-1") {

      restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
      restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')
    }
    checkIfWidgetActive()

  });

}); // end of doc ready





$(document).ready(function () {
  // Cookie for Desaturated
  // Check (onLoad) if DesaturatedBackgroundCookie is there and set the class to body if it is
  // If DesaturatedBackgroundCookie is set remove other background cookies and their related classes
  // Add active class to li
  if ($.cookie('DesaturatedBackgroundCookie') == "yes") {
    maskColorPresetChangeHandler('#363636')

    $("#ADA_widget #DesaturateBG_option").addClass("active");
    $("body").addClass("desaturated");
    $('body').removeClass('highcontrast');
    $('body').removeClass('inverted');
    $("html").removeClass("highsaturation");
    $("html").removeClass("lowsaturation");
    $("#ADA_widget #DefaultBG_option").removeClass("active");
    $.cookie('DarkContrastBackgroundCookie') == "no";
    $.cookie('DarkContrastBackgroundCookie') == "undefined";
    $.cookie("DarkContrastBackgroundCookie", null, {
      expires: 30
    });
    $.cookie('InvertBackgroundCookie') == "no";
    $.cookie('InvertBackgroundCookie') == "undefined";
    $.cookie("InvertBackgroundCookie", null, {
      expires: 30
    });
    $.cookie('HighSaturationBackgroundCookie') == "no";
    $.cookie('HighSaturationBackgroundCookie') == "undefined";
    $.cookie("HighSaturationBackgroundCookie", null, {
      expires: 30
    });
    $.cookie('LowSaturationBackgroundCookie') == "no";
    $.cookie('LowSaturationBackgroundCookie') == "undefined";
    $.cookie("LowSaturationBackgroundCookie", null, {
      expires: 30
    });
    // restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
    // restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')
  }

  // When 'a.DesaturateBackground' is clicked remove other background cookies
  // When input is clicked save cookie for 30days
  $("#ADA_widget a.DesaturateBackground").click(function () {
    maskColorPresetChangeHandler('#363636')


    resetColorPicker()
    $.cookie("DarkContrastBackgroundCookie", null, {
      expires: 30
    });
    $.cookie("InvertBackgroundCookie", null, {
      expires: 30
    });
    $.cookie("HighSaturationBackgroundCookie", null, {
      expires: 30
    });
    $.cookie("LowSaturationBackgroundCookie", null, {
      expires: 30
    });
    if ($.cookie('DesaturatedBackgroundCookie') == "undefined" || $.cookie('DesaturatedBackgroundCookie') == "no") {
      $.cookie('DesaturatedBackgroundCookie', 'yes', { expires: 30 });
      $("body").addClass("desaturated");
      $('body').removeClass('highcontrast');
      $('body').removeClass('inverted');
      $("html").removeClass("highsaturation");
      $("html").removeClass("lowsaturation");

    } else {
      $.cookie('DesaturatedBackgroundCookie', 'yes', { expires: 30 });
      $("body").addClass("desaturated");
      $('body').removeClass('highcontrast');
      $('body').removeClass('inverted');
      $("html").removeClass("highsaturation");
      $("html").removeClass("lowsaturation");


    }
    addWidgetControls('DesaturateBackground', 'Desaturate preset')
    removeWidgetControls(['DarkContrastBackground', 'HighSaturationBackground', 'LowSaturationBackground', 'InvertBackground'])
    makeColorPresetsFalse([widgetItemObj.isDarkContrast, widgetItemObj.isInverted, widgetItemObj.isHighSat, widgetItemObj.isLowSat])
    widgetItemObj.isDesaturated = true
    checkIfWidgetActive()
    // restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
    // restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')

  });


});




$(document).ready(function () {
  // Cookie for HighSaturation
  // Check (onLoad) if HighSaturationBackgroundCookie is there and set the class to body if it is
  // If DesaturatedBackgroundCookie is set remove other background cookies and their related classes
  // Add active class to li
  if ($.cookie('HighSaturationBackgroundCookie') == "yes") {
    maskColorPresetChangeHandler('#363636')


    $("#ADA_widget #HighSaturationBG_option").addClass("active");
    $("html").addClass("highsaturation");
    $('body').removeClass('highcontrast');
    $('body').removeClass('inverted');
    $('body').removeClass('desaturated');
    $("html").removeClass("lowsaturation");
    $("#ADA_widget #DefaultBG_option").removeClass("active");
    $.cookie('DarkContrastBackgroundCookie') == "no";
    $.cookie('DarkContrastBackgroundCookie') == "undefined";
    $.cookie("DarkContrastBackgroundCookie", null, {
      expires: 30
    });
    $.cookie('InvertBackgroundCookie') == "no";
    $.cookie('InvertBackgroundCookie') == "undefined";
    $.cookie("InvertBackgroundCookie", null, {
      expires: 30
    });
    $.cookie('DesaturatedBackgroundCookie') == "no";
    $.cookie('DesaturatedBackgroundCookie') == "undefined";
    $.cookie("DesaturatedBackgroundCookie", null, {
      expires: 30
    });
    // restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
    // restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')
  }

  // When 'a.HighSaturationBackground' is clicked remove other background cookies and their related classes
  // When input is clicked save cookie for 30days
  $("#ADA_widget a.HighSaturationBackground").click(function () {
    maskColorPresetChangeHandler('#363636')


    $.cookie("DesaturatedBackgroundCookie", null, {
      expires: 30
    });
    $.cookie("InvertBackgroundCookie", null, {
      expires: 30
    });
    $.cookie("DarkContrastBackgroundCookie", null, {
      expires: 30
    });
    $.cookie("LowSaturationBackgroundCookie", null, {
      expires: 30
    });

    if ($.cookie('HighSaturationBackgroundCookie') == "undefined" || $.cookie('HighSaturationBackgroundCookie') == "no") {
      $.cookie('HighSaturationBackgroundCookie', 'yes', { expires: 30 });
      $("html").addClass("highsaturation");
      $("body").removeClass("desaturated");
      $('body').removeClass('highcontrast');
      $('body').removeClass('inverted');
      $("html").removeClass("lowsaturation");

    } else {
      $.cookie('HighSaturationBackgroundCookie', 'yes', { expires: 30 });
      $("html").addClass("highsaturation");
      $("body").removeClass("desaturated");
      $('body').removeClass('highcontrast');
      $('body').removeClass('inverted');
      $("html").removeClass("lowsaturation");


    }
    addWidgetControls('HighSaturationBackground', 'High saturation')
    removeWidgetControls(['DarkContrastBackground', 'DesaturateBackground', 'LowSaturationBackground', 'InvertBackground'])
    makeColorPresetsFalse([widgetItemObj.isDarkContrast, widgetItemObj.isDesaturated, widgetItemObj.isInverted, widgetItemObj.isLowSat])
    widgetItemObj.isHighSat = true
    checkIfWidgetActive()
    // restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
    // restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')
  });


});


$(document).ready(function () {
  // Cookie for LowSaturation
  // Check (onLoad) if LowSaturationBackgroundCookie is there and set the class to body if it is
  // If DesaturatedBackgroundCookie is set remove other background cookies and their related classes
  // Add active class to li
  if ($.cookie('LowSaturationBackgroundCookie') == "yes") {
    maskColorPresetChangeHandler('#363636')


    $("#ADA_widget #LowSaturationBG_option").addClass("active");
    $("html").addClass("lowsaturation");
    $("html").removeClass("highsaturation");
    $('body').removeClass('highcontrast');
    $('body').removeClass('inverted');
    $('body').removeClass('desaturated');
    $("#ADA_widget #DefaultBG_option").removeClass("active");
    $.cookie('DarkContrastBackgroundCookie') == "no";
    $.cookie('DarkContrastBackgroundCookie') == "undefined";
    $.cookie("DarkContrastBackgroundCookie", null, {
      expires: 30
    });
    $.cookie('InvertBackgroundCookie') == "no";
    $.cookie('InvertBackgroundCookie') == "undefined";
    $.cookie("InvertBackgroundCookie", null, {
      expires: 30
    });
    $.cookie('DesaturatedBackgroundCookie') == "no";
    $.cookie('DesaturatedBackgroundCookie') == "undefined";
    $.cookie("DesaturatedBackgroundCookie", null, {
      expires: 30
    });
    $.cookie('HighSaturationBackgroundCookie') == "no";
    $.cookie('HighSaturationBackgroundCookie') == "undefined";
    $.cookie("HighSaturationBackgroundCookie", null, {
      expires: 30
    });
    // restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
    // restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')
  }

  // When 'a.HighSaturationBackground' is clicked remove other background cookies and their related classes
  // When input is clicked save cookie for 30days
  $("#ADA_widget a.LowSaturationBackground").click(function () {
    maskColorPresetChangeHandler('#363636')

    $.cookie("DesaturatedBackgroundCookie", null, {
      expires: 30
    });
    $.cookie("InvertBackgroundCookie", null, {
      expires: 30
    });
    $.cookie("DarkContrastBackgroundCookie", null, {
      expires: 30
    });
    $.cookie("HighSaturationBackgroundCookie", null, {
      expires: 30
    });

    if ($.cookie('LowSaturationBackgroundCookie') == "undefined" || $.cookie('LowSaturationBackgroundCookie') == "no") {
      $.cookie('LowSaturationBackgroundCookie', 'yes', { expires: 30 });
      $("html").addClass("lowsaturation");
      $("html").removeClass("highsaturation");
      $("body").removeClass("desaturated");
      $('body').removeClass('highcontrast');
      $('body').removeClass('inverted');

    } else {
      $.cookie('LowSaturationBackgroundCookie', 'yes', { expires: 30 });
      $("html").addClass("lowsaturation");
      $("html").removeClass("highsaturation");
      $("body").removeClass("desaturated");
      $('body').removeClass('highcontrast');
      $('body').removeClass('inverted');


    }
    addWidgetControls('LowSaturationBackground', 'Low saturation')
    removeWidgetControls(['DarkContrastBackground', 'DesaturateBackground', 'HighSaturationBackground', 'InvertBackground'])
    makeColorPresetsFalse([widgetItemObj.isDarkContrast, widgetItemObj.isDesaturated, widgetItemObj.isInverted, widgetItemObj.isHighSat])
    widgetItemObj.isLowSat = true

    $("#LowSaturationBG_option").addClass('active').siblings().removeClass('active');
    checkIfWidgetActive()
    // restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
    // restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')
  });


});




$(document).ready(function () {
  // Cookie for Invert
  // Check (onLoad) if DesaturatedBackgroundCookie is there and set the class to body if it is
  // If DesaturatedBackgroundCookie is set removes other background cookies and their related classes
  // Add active class to li
  if ($.cookie('InvertBackgroundCookie') == "yes") {
    maskColorPresetChangeHandler('#ffffff', true)


    $("#ADA_widget #InvertBG_option").addClass("active");
    $("body").addClass("inverted");
    $('body').removeClass('highcontrast');
    $('body').removeClass('desaturated');
    $("html").removeClass("highsaturation");
    $("html").removeClass("lowsaturation");

    $("#ADA_widget #DefaultBG_option").removeClass("active");
    $.cookie('DarkContrastBackgroundCookie') == "no";
    $.cookie('DarkContrastBackgroundCookie') == "undefined";
    $.cookie("DarkContrastBackgroundCookie", null, {
      expires: 30
    });
    $.cookie('DesaturatedBackgroundCookie') == "no";
    $.cookie('DesaturatedBackgroundCookie') == "undefined";
    $.cookie("DesaturatedBackgroundCookie", null, {
      expires: 30
    });
    $.cookie('HighSaturationBackgroundCookie') == "no";
    $.cookie('HighSaturationBackgroundCookie') == "undefined";
    $.cookie("HighSaturationBackgroundCookie", null, {
      expires: 30
    });
    $.cookie('LowSaturationBackgroundCookie') == "no";
    $.cookie('LowSaturationBackgroundCookie') == "undefined";
    $.cookie("LowSaturationBackgroundCookie", null, {
      expires: 30
    });
    if (!$.cookie('text-magnify-color-swatch') || $.cookie('text-magnify-color-swatch') === "text-mag-color-1") {

      restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
      restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')
    }
  }

  // When 'a.DesaturateBackground' is clicked remove other background cookies and their related classes
  // When input is clicked save cookie for 30days
  $("#ADA_widget a.InvertBackground").click(function () {
    maskColorPresetChangeHandler('#ffffff', true)


    resetColorPicker()
    $.cookie("DarkContrastBackgroundCookie", null, {
      expires: 30
    });
    $.cookie("DesaturatedBackgroundCookie", null, {
      expires: 30
    });
    $.cookie("HighSaturationBackgroundCookie", null, {
      expires: 30
    });
    $.cookie("LowSaturationBackgroundCookie", null, {
      expires: 30
    });
    if ($.cookie('InvertBackgroundCookie') == "undefined" || $.cookie('InvertBackgroundCookie') == "no") {
      $.cookie('InvertBackgroundCookie', 'yes', { expires: 30 });
      $("body").addClass("inverted");
      $('body').removeClass('highcontrast');
      $('body').removeClass('desaturated');
      $("html").removeClass("highsaturation");
      $("html").removeClass("lowsaturation");

    } else {
      $.cookie('InvertBackgroundCookie', 'yes', { expires: 30 });
      $("body").addClass("inverted");
      $('body').removeClass('highcontrast');
      $('body').removeClass('desaturated');
      $("html").removeClass("highsaturation");
      $("html").removeClass("lowsaturation");


    }
    addWidgetControls('InvertBackground', 'Inverted preset')
    removeWidgetControls(['DarkContrastBackground', 'DesaturateBackground', 'HighSaturationBackground', 'LowSaturationBackground'])
    makeColorPresetsFalse([widgetItemObj.isDarkContrast, widgetItemObj.isDesaturated, widgetItemObj.isHighSat, widgetItemObj.isLowSat])
    widgetItemObj.isInverted = true
    checkIfWidgetActive()
    if (!$.cookie('text-magnify-color-swatch') || $.cookie('text-magnify-color-swatch') === "text-mag-color-1") {

      restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
      restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')
    }
  });




});

// func to toggle certain items with kiey commands
const keyTogglerFunc = (itemId) => {
  if ($(itemId).is(':checked')) {
    $(itemId).prop('checked', false).trigger('change');
  } else {
    $(itemId).prop('checked', true).trigger('change');
  }
}



// toggle toggle-based items can be toggled with key commands - and reset and open modal
//shift + 1-8
document.addEventListener('keydown', (event) => {
  var name = event.key;
  if (name === 'Shift') return
  if (event.shiftKey) {
    name === "!" && keyTogglerFunc('#ToggleHighlightHover')
    name === "@" && keyTogglerFunc('#ToggleHighlightLinks')
    name === "#" && keyTogglerFunc('#ToggleTextMagnifier')
    name === "$" && keyTogglerFunc('#ToggleImageDescription')
    name === '%' && keyTogglerFunc('#ToggleSeizure')
    name === "^" && keyTogglerFunc('#ToggleReadingMask')
    name === '&' && keyTogglerFunc('#ToggleReadingGuide')
    name === '*' && keyTogglerFunc('#ToggleTTS_click')
    name === 'Q' && resetAdaModal()
    name === 'A' && displayModal()
  } else {
    return;
  }
}, false);


// check if widget items eval to true if so  fade in helper box
const checkIfWidgetActive = () => {
  if (Object.values(widgetItemObj).indexOf(true) > -1) {
    isWidgetActive = true
    $('#ADA_check_icon').fadeIn()
    $('#toggle-ada-list, #reset-ada').fadeIn()
  } else {
    isWidgetActive = false
    $('#ADA_check_icon').fadeOut()
    $('#toggle-ada-list, #reset-ada, #item-delete-container').fadeOut()
    $("#toggle-ada-list").removeClass("fa-toggle-on");
    $("#toggle-ada-list").addClass("fa-toggle-off");
    $.removeCookie('deleteContainerActive');
  }

}
checkIfWidgetActive()

const addWidgetControls = (item, text) => {
  const widgetList = document.querySelector('#widget-list')
  if (!document.querySelector(`li.${item}`)) {
    const listItem = document.createElement('li')
    listItem.classList.add(item, 'fade-in', 'close-list-items')
    listItem.innerHTML = `<i class="fa fa-close close-item"></i> ${text}`
    widgetList.append(listItem)
  }
  let closeItems = document.querySelectorAll('.close-list-items')
  closeItemHandler(closeItems)
}

const removeWidgetControls = (itemArr) => {
  itemArr.forEach(item => {
    $(`li.${item}`).fadeOut()
    setTimeout(() => {
      $(`li.${item}`).remove();
    }, 300);
  });
  checkIfWidgetActive()
}

const closeItemHandler = (closeItems) => {
  closeItems.forEach(item => {
    item.addEventListener('click', (e) => {
      item.classList.contains('ToggleHighlightHover') && $('#ToggleHighlightHover').prop('checked', false).trigger('change')
      item.classList.contains('ToggleHighlightLinks') && $('#ToggleHighlightLinks').prop('checked', false).trigger('change')
      item.classList.contains('ToggleTextMagnifier') && $('#ToggleTextMagnifier').prop('checked', false).trigger('change')
      item.classList.contains('ToggleImageDescription') && $('#ToggleImageDescription').prop('checked', false).trigger('change')
      item.classList.contains('ToggleSeizure') && $('#ToggleSeizure').prop('checked', false).trigger('change')
      item.classList.contains('ToggleReadingMask') && $('#ToggleReadingMask').prop('checked', false).trigger('change')
      item.classList.contains('ToggleReadingGuide') && $('#ToggleReadingGuide').prop('checked', false).trigger('change')
      item.classList.contains('ToggleTTS_click') && $('#ToggleTTS_click').prop('checked', false).trigger('change')
      item.classList.contains('ColorPicker') && resetColorPicker()
      item.classList.contains('letter_spacing') && restoreSpacingDefault('#letter_spacing', ['letter_spacing'])
      item.classList.contains('word_spacing') && restoreSpacingDefault('#word_spacing', ['word_spacing'])
      item.classList.contains('line_height') && restoreSpacingDefault('#line_height', ['line_height'])
      item.classList.contains('Cursor_Enlarge_option') && restoreDefaultCursorSize()
      item.classList.contains('FontSizeMedium') && restoreDefaultFontSize()
      if (item.classList.contains('google-translate')) {
        dismissGoogleTranslate()
      }
      // item.classList.contains('google-translate') && restoreDefaultFontSize()
      let colorPreArr = ['DarkContrastBackground', 'DesaturateBackground', 'InvertBackground', 'HighSaturationBackground', 'LowSaturationBackground']
      for (let i = 0; i < colorPreArr.length; i++) {
        if (item.classList.contains(colorPreArr[i])) {
          colorPresetToDefault()
        }
      }
      if (item.classList.contains('FontTypeDyslexic') || item.classList.contains('FontTypeBaskerville')) {
        restoreDefaultFontType()
      }
      checkIfWidgetActive()
    })
  })
}

const addWidgetControlsOnLoad = () => {
  widgetItemObj.isHighlighted && addWidgetControls('ToggleHighlightHover', 'Highlight on hover')
  widgetItemObj.isOutlined && addWidgetControls('ToggleHighlightLinks', 'Highlight all links')
  widgetItemObj.isTextMag && addWidgetControls('ToggleTextMagnifier', 'Magnify text')
  widgetItemObj.isImgMag && addWidgetControls('ToggleImageDescription', 'Image description')
  widgetItemObj.isSeizureSafe && addWidgetControls('ToggleSeizure', 'Photosensitivity filter')
  widgetItemObj.isReadingMask && addWidgetControls('ToggleReadingMask', 'Reading mask')
  widgetItemObj.isReadingGuide && addWidgetControls('ToggleReadingGuide', 'Reading guide')
  widgetItemObj.isSpeech && addWidgetControls('ToggleTTS_click', 'Text to speech')
  widgetItemObj.isLetterSpaceChanged && addWidgetControls('letter_spacing', 'Letter spacing')
  widgetItemObj.isWordSpaceChanged && addWidgetControls('word_spacing', 'Word spacing')
  widgetItemObj.isLineHeightChanged && addWidgetControls('line_height', 'Line height')
  if (widgetItemObj.isBackColorChanged || widgetItemObj.isTextChanged || widgetItemObj.isLinkColorChanged) {
    addWidgetControls('ColorPicker', 'Custom colors')
  }
  widgetItemObj.isDarkContrast && addWidgetControls('DarkContrastBackground', 'Dark contrast preset')
  widgetItemObj.isDesaturated && addWidgetControls('DesaturateBackground', 'Desaturate preset')
  widgetItemObj.isHighSat && addWidgetControls('HighSaturationBackground', 'High saturation')
  widgetItemObj.isLowSat && addWidgetControls('LowSaturationBackground', 'Low saturation')
  widgetItemObj.isInverted && addWidgetControls('InvertBackground', 'Inverted preset')
  widgetItemObj.isFontBig && addWidgetControls('FontSizeMedium', 'Change font size')
  widgetItemObj.isDyslexicFont && addWidgetControls('FontTypeDyslexic', 'Open-dyslexic font')
  widgetItemObj.isBaskervilleFont && addWidgetControls('FontTypeBaskerville', 'Libre-baskerville font')
  widgetItemObj.isCursorBig && addWidgetControls('Cursor_Enlarge_option', 'Change cursor')
}
addWidgetControlsOnLoad()


// translateOnLoad()

const dismissGoogleTranslate = () => {

  removeWidgetControls(['google-translate'])
  widgetItemObj.isTranslated = false
  $.removeCookie('translateLanguage');
  checkIfWidgetActive()

  // find `iframe` element with GoogleTranslate select and buttons
  var iframe = document.getElementsByClassName('goog-te-banner-frame')[0]
    || document.getElementById(':1.container');
  if (!iframe) return;

  // search all buttons from the retrieved iframe
  var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
  var restore_el = innerDoc.getElementsByTagName("button");

  // fire `click` event on the `restore` button, that `Shows the origin`
  for (var i = 0; i < restore_el.length; i++) {
    if (restore_el[i].id.indexOf("restore") >= 0) {
      restore_el[i].click();
      return;
    }
  }

}











const resetAdaModal = () => {

  $('#ToggleHighlightHover').prop('checked', false).trigger('change')
  $('#ToggleHighlightLinks').prop('checked', false).trigger('change')
  $('#ToggleTextMagnifier').prop('checked', false).trigger('change')
  $('#ToggleImageDescription').prop('checked', false).trigger('change')
  $('#ToggleSeizure').prop('checked', false).trigger('change')
  $('#ToggleReadingMask').prop('checked', false).trigger('change')
  $('#ToggleReadingGuide').prop('checked', false).trigger('change')
  $('#ToggleTTS_click').prop('checked', false).trigger('change')
  restoreDefaultFontSize()
  restoreDefaultFontType()
  restoreDefaultCursorSize()
  restoreSpacingDefault('#letter_spacing', ['letter_spacing'])
  restoreSpacingDefault('#word_spacing', ['word_spacing'])
  restoreSpacingDefault('#line_height', ['line_height'])
  colorPresetToDefault()
  if (widgetItemObj.isBackColorChanged || widgetItemObj.isTextColorChanged || widgetItemObj.isLinkColorChanged) {
    resetColorPicker()
  }
  restoreDefaultMaskSettings()
  restoreDefaultguideSettings()
  dismissGoogleTranslate()
  restoreDefaultMagnify('text', '.text-magnify-color-swatch', '.text-magnify-size-input', textMagObj, '.text-magnifier-preview')
  restoreDefaultMagnify('img', '.img-magnify-color-swatch', '.img-magnify-size-input', imgMagObj, '.img-magnifier-preview')

  restoreDefaultMagnify('text', '.text-magnify-color-swatch', '#text-magnify-size-input', textMagObj)
  restoreDefaultMagnify('img', '.img-magnify-color-swatch', '#img-magnify-size-input', imgMagObj)
  removeAllCookies()
  $.cookie("reading-mask-reload", false, { expires: 30 });
  // restoreGoogleTransDefault()
  setCurrLang('en')
}

let resetIcon = document.getElementById('reset-ada')
resetIcon.addEventListener('click', () => {
  resetAdaModal()
})


// on load -- session Storage - grab page or widget position or open widget etc
const reloadStorageFunc = () => {
  if (localStorage.reloadModalOpen) {
    const adaWidget = document.querySelector('#ADA_widget')
    displayModal()
    if (localStorage.modalScrollPosition) {
      $(".modal_body").scrollTop(localStorage.getItem("modalScrollPosition"));
    }
  }
  localStorage.removeItem("modalScrollPosition");
  localStorage.removeItem("reloadModalOpen");
  localStorage.removeItem("reloadModalClosed");
}
window.onload = function () {
  if (localStorage.getItem("mainScrollPosition") !== "0") {
    const scrollPosition = localStorage.getItem("mainScrollPosition")
    $("html, body").scrollTop(scrollPosition);
    localStorage.removeItem("mainScrollPosition")
    setTimeout(() => reloadStorageFunc(), 500);
  } else {
    reloadStorageFunc()
  }
}

