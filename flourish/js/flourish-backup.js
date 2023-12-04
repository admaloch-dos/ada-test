$(function () {
    $('[data-toggle="popover"]').popover()
  })

  // change classes for icon size based on innerwidth
  const setFlourishIconPlacement = () => {
    const flourishMain = document.querySelector('#flourish-widget-main')
    if (window.innerWidth < 500) {
      flourishMain.classList.remove('trigger-medium', 'trigger-large', 'trigger-left')
      flourishMain.classList.add('trigger-small', 'trigger-left')
    } else if (window.innerWidth > 500 && window.innerWidth < 1200) {
      flourishMain.classList.remove('trigger-small', 'trigger-large', 'trigger-right')
      flourishMain.classList.add('trigger-medium', 'trigger-left')
    } else if (window.innerWidth > 1200) {
      flourishMain.classList.remove('trigger-small', 'trigger-medium', 'trigger-right')
      flourishMain.classList.add('trigger-large', 'trigger-left')
    }
  }
  setFlourishIconPlacement()

  const changePopoverPlacement = () => {
    const flourishMain = document.querySelector('#flourish-widget-main')
    if (flourishMain.classList.contains('trigger-left')) {
      $('#toggle-flourish-list').data('placement', 'right');
    } else {
      $('#toggle-flourish-list').data('placement', 'left');
    }
  }
  changePopoverPlacement()

  window.addEventListener("resize", () => {
    setFlourishIconPlacement()
    changePopoverPlacement()
  });

  // func to determine if its desktop or touchscreen
  var hasTouchScreen = false;
  if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
  } else {
    var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
      hasTouchScreen = !!mQ.matches;
    } else if ('orientation' in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      var UA = navigator.userAgent;
      hasTouchScreen = (
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
      );
    }
  }

  // data to determine if widget is still active / widget active items
  let isWidgetActive = false
  const cookiesArr = ['TTS_click_enabled', 'DarkContrastBackground', 'DesaturateBackground', 'InvertBackground', 'HighSaturationBackground',
    'LowSaturationBackground', 'AEC', '1P_JAR', 'NID', 'DV', 'translateLanguage', 'text-magnify-color-swatch', 'text-magnify-size-input', 'img-magnify-size-input', 'img-magnify-color-swatch', 'text-magnify-color-swatch', '.img-magnify-color-swatch', 'edit-reading-guide', 'edit-reading-mask', 'TTS_click_enabled', 'googtrans', 'readingMaskVal', 'BackgroundColorCookie', 'TextColorCookie', 'LinkColorCookie', 'TextMagnifier', 'HighlightLinks', 'ImageDescription', 'HighlightHover', 'FontSizeCookie', 'FT_Baskerville', 'FT_Dyslexic', 'CursorEnlargeCookie', 'PhotoSens', 'ReadingMask', 'CursorGuide', 'TTS_click_enabled', 'LinpageHeightVal', 'WordSpaceVal', 'LetterSpaceVal', 'speechPitch', 'speechRate', 'speechVol', 'voiceCookie']
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
    'isDarkContrast': false,
    'isDesaturated': false,
    'isInverted': false,
    'isHighSat': false,
    'isLowSat': false,
    isTextColorChanged: false,
    isBackColorChanged: false,
    isLinkColorChanged: false,
    isPhotoSens: false,
    isReadingMask: false,
    isReadingGuide: false,
    isSpeech: false,
    isDyslexicFont: false,
    isBaskervilleFont: false,
    isTranslated: false,
  }

  // function to reset all cookies
  const removeAllCookies = () => {
    for (let i = 0; i < cookiesArr.length; i++) {
      $.removeCookie(cookiesArr[i]);
    }
  }


  // reset widgetItemObj on cookie load
  const isCookieActive = (input, value) => {
    if (input && input !== value) {
      return true
    } else {
      return false
    }
  }

  const areCookiesSet = () => {
    let updateCookies = widgetItemObj
    updateCookies.isHighlighted = isCookieActive($.cookie("HighlightHover"), 'false')
    updateCookies.isOutlined = isCookieActive($.cookie("HighlightLinks"), 'false')
    updateCookies.isTextMag = isCookieActive($.cookie("TextMagnifier"), 'false')
    updateCookies.isImgMag = isCookieActive($.cookie("ImageDescription"), 'false')
    updateCookies.isFontBig = isCookieActive($.cookie("FontSizeCookie"), 'null')
    updateCookies.isCursorBig = isCookieActive($.cookie("CursorEnlargeCookie"), 'null')
    updateCookies.isLineHeightChanged = isCookieActive($.cookie("LinpageHeightVal"), 'inherit')
    updateCookies.isWordSpaceChanged = isCookieActive($.cookie("WordSpaceVal"), 'inherit')
    updateCookies.isLetterSpaceChanged = isCookieActive($.cookie("LetterSpaceVal"), 'inherit')
    updateCookies.isLowSat = isCookieActive($.cookie("LowSaturationBackgroundCookie"), 'null')
    updateCookies.isHighSat = isCookieActive($.cookie("HighSaturationBackgroundCookie"), 'null')
    updateCookies.isInverted = isCookieActive($.cookie("InvertBackground"), 'null')
    updateCookies.isDesaturated = isCookieActive($.cookie("DesaturatedBackground"), 'null')
    updateCookies.isDarkContrast = isCookieActive($.cookie("DarkContrastBackground"), 'null')
    updateCookies.isTextColorChanged = isCookieActive($.cookie("TextColorCookie"), 'false')
    updateCookies.isBackColorChanged = isCookieActive($.cookie("BackgroundColorCookie"), 'false')
    updateCookies.isLinkColorChanged = isCookieActive($.cookie("LinkColorCookie"), 'false')
    updateCookies.isPhotoSens = isCookieActive($.cookie("PhotoSens"), 'false')
    updateCookies.isReadingMask = isCookieActive($.cookie("ReadingMask"), 'false')
    updateCookies.isReadingGuide = isCookieActive($.cookie("CursorGuide"), 'false')
    updateCookies.isSpeech = isCookieActive($.cookie("TTS_click_enabled"), 'false')
    updateCookies.isBaskervilleFont = isCookieActive($.cookie("BaskervilleFontCookie"), 'null')
    updateCookies.isDyslexicFont = isCookieActive($.cookie("DyslexicFontCookie"), 'null')
    return updateCookies
  }
  widgetItemObj = areCookiesSet()



  // check if widget items eval to true if so  fade in helper box
  const checkIfWidgetActive = () => {
    if (Object.values(widgetItemObj).indexOf(true) > -1) {
      isWidgetActive = true
      $('#flourish_check_icon').fadeIn()
      $('#toggle-flourish-list, #reset-flourish').fadeIn()
    } else {
      isWidgetActive = false
      $('#flourish_check_icon').fadeOut()
      $('#toggle-flourish-list, #reset-flourish, #item-delete-container').fadeOut()
      $("#toggle-flourish-list").removeClass("fa-toggle-on");
      $("#toggle-flourish-list").addClass("fa-toggle-off");
      $.removeCookie('deleteContainerActive');
    }
  }
  checkIfWidgetActive()

  // active item add/delete section -------------->
  const addWidgetControls = (item, text) => {
    const widgetList = document.querySelector('#widget-list')
    if (!document.querySelector(`li.${item}`)) {
      const listItem = document.createElement('li')
      listItem.classList.add(item, 'fade-in', 'close-list-items')
      listItem.innerHTML = `<svg class="close-active-item" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
    </svg> <span class="close-active-text">${text}</span> `
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
        item.classList.contains('TogglePhotoFilter') && $('#TogglePhotoFilter').prop('checked', false).trigger('change')
        item.classList.contains('ToggleReadingMask') && $('#ToggleReadingMask').prop('checked', false).trigger('change')
        item.classList.contains('ToggleReadingGuide') && $('#ToggleReadingGuide').prop('checked', false).trigger('change')
        item.classList.contains('ToggleTTS_click') && $('#ToggleTTS_click').prop('checked', false).trigger('change')
        item.classList.contains('ColorPicker') && resetColorPicker()
        item.classList.contains('letter_spacing') && restoreSpacingDefault('#letter_spacing', ['letter_spacing'])
        item.classList.contains('word_spacing') && restoreSpacingDefault('#word_spacing', ['word_spacing'])
        item.classList.contains('line_height') && restoreSpacingDefault('#line_height', ['line_height'])
        item.classList.contains('Cursor_Enlarge_option') && restoreDefaultCursorSize()
        item.classList.contains('FontSizeMedium') && restoreDefaultFontSize()
        item.classList.contains('google-translate') && dismissGoogleTranslate()
        item.classList.contains('FT_Dyslexic') && restoreDefaultFontType()
        item.classList.contains('FT_Baskerville') && restoreDefaultFontType()
        let colorPreArr = ['DarkContrastBackground', 'DesaturateBackground', 'InvertBackground', 'HighSaturationBackground', 'LowSaturationBackground']
        for (let i = 0; i < colorPreArr.length; i++) {
          if (item.classList.contains(colorPreArr[i])) {
            colorPresetToDefault()
          }
        }
        checkIfWidgetActive()
        console.log(widgetItemObj)
        console.log(isWidgetActive)
        if (isWidgetActive) {
          $('#toggle-flourish-list, #reset-flourish').show()
        }
      })
    })
  }

  const addWidgetControlsOnLoad = () => {
    widgetItemObj.isHighlighted && addWidgetControls('ToggleHighlightHover', 'Highlight on hover')
    widgetItemObj.isOutlined && addWidgetControls('ToggleHighlightLinks', 'Highlight all links')
    widgetItemObj.isTextMag && addWidgetControls('ToggleTextMagnifier', 'Magnify text')
    widgetItemObj.isImgMag && addWidgetControls('ToggleImageDescription', 'Image description')
    widgetItemObj.isPhotoSens && addWidgetControls('TogglePhotoFilter', 'Photosensitivity filter')
    widgetItemObj.isReadingMask && addWidgetControls('ToggleReadingMask', 'Reading mask')
    widgetItemObj.isReadingGuide && addWidgetControls('ToggleReadingGuide', 'Reading guide')
    widgetItemObj.isSpeech && addWidgetControls('ToggleTTS_click', 'Text to speech')
    widgetItemObj.isLetterSpaceChanged && addWidgetControls('letter_spacing', 'Letter spacing')
    widgetItemObj.isWordSpaceChanged && addWidgetControls('word_spacing', 'Word spacing')
    widgetItemObj.isLineHeightChanged && addWidgetControls('line_height', 'Line height')
    if (widgetItemObj.isBackColorChanged || widgetItemObj.isTextColorChanged || widgetItemObj.isLinkColorChanged) {
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

  // func to display and close modal
  const displayModal = () => {
    const overlay = document.querySelector('#flourish_widget')
    if (overlay.style.display !== "flex") {
      $("#flourish-triggers").fadeOut(700);
      $("#flourish_widget").css('opacity', '0');
      $("#flourish_widget").css("display", "flex")
      $("#flourish_widget").fadeTo(0, 1);
      $(".modal_content").fadeToggle(0);
      $(".modal_body").scrollTop(0);
      document.body.classList.add("prevent-body-overflow");
    } else {
      $("#flourish_widget").fadeTo(400, 0);
      $(".modal_content").fadeToggle(400);
      setTimeout(() => {
        document.body.classList.remove("prevent-body-overflow");
        $("#flourish_widget").css("display", "none")
        $("#flourish-triggers").fadeIn();
      }, 500);
    }
  }

  let flourish_widget = document.getElementById("flourish_widget");
  let Openflourish_widget = document.getElementById("flourish_icon");
  let Closeflourish_widget = document.getElementsByClassName("flourish_close")[0];
  Openflourish_widget.onclick = function () {
    displayModal()
  }

  Closeflourish_widget.onclick = function () {
    displayModal()
  }

  window.onclick = function (event) {
    if (event.target == flourish_widget) {
      // flourish_widget.style.display = "none";
      displayModal()
    }
  }

  // active item sub menu ---------------------------->
  const addDeleteContainer = () => {
    $("#toggle-flourish-list").attr("src", "./flourish/img/toggle-on.svg");
    $("#toggle-flourish-list").removeClass('hide-active-list')
    $("#toggle-flourish-list").addClass('show-active-list')
    $("#item-delete-container").fadeIn()
    $.cookie("deleteContainerActive", 'true', { expires: 30 });
  }

  const removeDeleteContainer = () => {
    $("#toggle-flourish-list").attr("src", "./flourish/img/toggle-off.svg");
    $("#toggle-flourish-list").removeClass('show-active-list')
    $("#toggle-flourish-list").addClass('hide-active-list')
    $("#item-delete-container").fadeOut()
    $('.flourish-popover-item').popover('hide');
    $.removeCookie('deleteContainerActive');
  }

  // active item list listener
  let toggleWidgetList = document.getElementById('toggle-flourish-list')
  toggleWidgetList.addEventListener('click', () => {
    if (toggleWidgetList.classList.contains('show-active-list')) {
      removeDeleteContainer()
    } else {
      addDeleteContainer()
    }
  })

  if ($.cookie("deleteContainerActive")) {
    addDeleteContainer()
  }

  // close hover popover on click
  document.querySelectorAll('.flourish-popover-item').forEach(item => {
    item.addEventListener('click', () => {
      $('.flourish-popover-item').popover('hide');
    })
  })

  //close on scroll
  document.addEventListener("scroll", (event) => {
    if (toggleWidgetList.classList.contains('show-active-list')) {
      removeDeleteContainer()
    }
  });

  // item delete container - close on offscreen click
  $('body').click(function (event) {
    if (toggleWidgetList.classList.contains('show-active-list')) {
      if (!$(event.target).closest('.item-delete-container-remove').length && !$(event.target).is('.item-delete-container-remove')) {
        removeDeleteContainer()
      }
    }
  });

  // adjust colors section ---------------------------------------------->
  const resetColorInputs = (colorInput, hexInput, hexValue) => {
    const colorItem = document.querySelector(colorInput)
    colorItem.value = hexValue
    colorItem.dispatchEvent(new Event('change'));
    $(hexInput).html(hexValue);
  }

  const restoreDefaultColorPicker = () => {
    resetColorInputs('#background_color', '#bg_hexVal', defaultBgColor)
    resetColorInputs('#text_color', '#txt_hexVal', defaultTextColor)
    resetColorInputs('#link_color', '#link_hexVal', defaultLinkColor)
  }

  const deactivatePresets = () => {
    $('#ColorAdjust_option').removeClass('disable-colors')
    $('#DarkContrastBG_option').addClass('disable-colors')
    $('#DesaturateBG_option').addClass('disable-colors')
    $('#InvertBG_option').addClass('disable-colors')
  }

  const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    .slice(1).map(n => parseInt(n, 10)
      .toString(16).padStart(2, '0')).join('')}`

  const defaultLink = document.querySelector("a");
  let defaultBgColor = rgb2hex(window.getComputedStyle(document.body, null).getPropertyValue('background-color'));
  let defaultTextColor = rgb2hex(window.getComputedStyle(document.body, null).getPropertyValue('color'));
  let defaultLinkColor = rgb2hex(window.getComputedStyle(defaultLink, null).getPropertyValue('color'));
  restoreDefaultColorPicker()

  let config = {
    regTextContrast: 5,
    largeTextContrast: 3,
    linkContrast: 3
  }

  let cache = {};
  $("#reset-color-picker").click(function () {
    resetColorPicker()
  });

  const setupCache = () => {
    cache.bgColor = document.querySelector('#background_color');
    cache.textColor = document.querySelector('#text_color');
    cache.linkColor = document.querySelector('#link_color');
    cache.inputs = document.querySelectorAll('input.color_swatch');
    cache.BgtoText = document.querySelector('#textBackRatioContainer');
    cache.BgtoLink = document.querySelector('#linkBackRatioContainer');
    cache.TexttoLink = document.querySelector('#linkTextRatioContainer');
    cache.contrastValues = document.querySelector('.contrast_values');
  }

  const getLuminance = (r, g, b) => {
    const RsRGB = r / 255;
    const GsRGB = g / 255;
    const BsRGB = b / 255;
    var R = (RsRGB <= 0.03928) ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    var G = (GsRGB <= 0.03928) ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    var B = (BsRGB <= 0.03928) ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    var L = 0.2126 * R + 0.7152 * G + 0.0722 * B;
    return L;
  };

  const calculateContrast = (L1, L2) => {
    const contrast = (L1 + 0.05) / (L2 + 0.05)
    return parseFloat(contrast.toFixed(2));
  };

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
    widgetItemObj.isTextColorChanged = true
    widgetItemObj.isBackColorChanged = true
    widgetItemObj.isLinkColorChanged = true
    addWidgetControls('ColorPicker', 'Custom colors')
    checkIfWidgetActive()
    if ($('body').hasClass('highcontrast') || $('body').hasClass('inverted') || $('body').hasClass('desaturated')) {
      $("body").removeClass("highcontrast inverted desaturated")
      $.removeCookie('InvertBackground');
      $.removeCookie('DarkContrastBackground');
      $.removeCookie('DesaturateBackground');
      $("#DefaultBG_option").addClass('active').siblings().removeClass('active');
      removeWidgetControls(['DarkContrastBackground', 'DesaturateBackground', 'InvertBackground'])
      widgetItemObj.isDarkContrast = false
      widgetItemObj.isDesaturated = false
      widgetItemObj.isInverted = false
    }
    const value = e.target.value;
    $("#defaultContainer").hide();
    if (!cache.bgColor.value) {
      cache.bgColor.value = defaultBgColor;
    }
    if (!cache.textColor.value) {
      cache.textColor.value = defaultTextColor;
    }
    if (!cache.linkColor.value) {
      cache.linkColor.value = defaultLinkColor;
    }
    const bgColor = hexToRGB(cache.bgColor.value);
    const textColor = hexToRGB(cache.textColor.value);
    const linkColor = hexToRGB(cache.linkColor.value);

    //Switch selectors to #view, .Footer
    $('body *').not('#flourish_widget, #flourish_widget *, .modal_content *').css('color', cache.textColor.value);
    $('.SearchForm .input-group .input-group-append #submit_search').css('color', cache.textColor.value);
    $('#footerFeat_container, .Footer').css('color', cache.textColor.value);

    $('body').not('[class="flourish_modal_test"]').css('background-color', cache.bgColor.value);
    $('#Scroll_btn').attr('style', 'background-color: ' + cache.bgColor.value);
    $('#navContainer, #navContainer #main_navbar .dropdown-menu.backdrop_hover, #navContainer #main_navbar .dropdown-menu > .dropdown-submenu.firstLevel').attr('style', 'background-color: ' + cache.bgColor.value);
    $('#footerFeat_container, .Footer').css('background-color', cache.bgColor.value);
    $('#menudropdown .card-body').css('background-color', cache.bgColor.value);

    $('body a').not("#flourish_widget a").attr('style', 'color: ' + cache.linkColor.value);
    // $( "a" ).each(function( ) {
    //   $(this).hover(function() {
    //     $(this).css("color",cache.linkColor)
    //   });
    // });

    const bgTextContrast = takeTwoColors(bgColor, textColor);
    const bgLinkContrast = takeTwoColors(bgColor, linkColor);
    const textLinkContrast = takeTwoColors(textColor, linkColor);

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

    passFailStyle(cache.BgtoText, '#text-contrast')
    passFailStyle(cache.BgtoLink, '#link-contrast')
    passFailStyle(cache.TexttoLink, '#link-text-contrast')

    $('#text-text').css({ 'color': cache.textColor.value, 'background-color': cache.bgColor.value });
    $('#link-text').css({ 'color': cache.linkColor.value, 'background-color': cache.bgColor.value });
    $('.link-text-text').css('background-color', cache.bgColor.value);
    $('.both-text').css({ 'color': cache.textColor.value });
    $('.both-link').css({ 'color': cache.linkColor.value });

    if (cache.textColor.value === defaultTextColor && cache.linkColor.value === defaultLinkColor && cache.bgColor.value === defaultBgColor) {
      $('.contrast-section-container ').fadeOut('slow')
      $('#reset-color-picker').fadeOut('slow')
    } else {
      $('.contrast-section-container ').fadeIn('slow')
      $('#reset-color-picker').css({ 'display': 'flex' }).hide().fadeIn()
    }
  };

  const passFailStyle = (classItem, changeItem) => {
    classItem.classList.contains('pass')
      ? $(changeItem).css('background-color', 'green').text("Pass")
      : $(changeItem).css('background-color', 'red').text("Fail")
  }

  const addEventListeners = () => {
    cache.bgColor.addEventListener('change', onInputChange);
    cache.textColor.addEventListener('change', onInputChange);
    cache.linkColor.addEventListener('change', onInputChange);
  };

  const initflourishListeners = () => {
    setupCache();
    addEventListeners();
  }
  initflourishListeners();

  const resetColorPicker = () => {
    if (widgetItemObj.isTextColorChanged, widgetItemObj.isBackColorChanged, widgetItemObj.isLinkColorChanged) {
      resetColorInputs('#background_color', '#bg_hexVal', defaultBgColor)
      resetColorInputs('#text_color', '#txt_hexVal', defaultTextColor)
      resetColorInputs('#link_color', '#link_hexVal', defaultLinkColor)
      $('body').not('#flourish-widget-main, #flourish-widget-main *').attr('style', 'background: ' + '' + '!important');
      $('body').not('#flourish-widget-main, #flourish-widget-main *').attr('style', 'background-color:' + '' + '!important');
      $('body *').not('a, #flourish-widget-main, #flourish-widget-main *').attr('style', 'color: ' + '' + '!important');
      $('a').not('#flourish-widget-main, #flourish-widget-main *').attr('style', 'color: ' + '' + '!important');
      $.removeCookie('BackgroundColorCookie');
      $.removeCookie('TextColorCookie');
      $.removeCookie('LinkColorCookie');
      removeWidgetControls(['ColorPicker'])
      widgetItemObj.isTextColorChanged = false
      widgetItemObj.isBackColorChanged = false
      widgetItemObj.isLinkColorChanged = false
      checkIfWidgetActive()
      $('#color-scheme-presets').removeClass('disable-colors')
      $('#DarkContrastBG_option').removeClass('disable-colors')
      $('#DesaturateBG_option').removeClass('disable-colors')
      $('#InvertBG_option').removeClass('disable-colors')
      // $('#extra-links').fadeOut()
      // $('.preset-container').css('margin-top', '1.3rem');
      resetCustomPresets()

    }
  }

  $(document).ready(function () {
    $.fn.cssAsHex = function (colorProp) {
      var hexDigits = '0123456789abcdef';
      function hex(x) {
        return isNaN(x) ? '00' : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
      };
      function rgb2hex(rgb) {
        var rgbRegex = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return '#' + hex(rgbRegex[1]) + hex(rgbRegex[2]) + hex(rgbRegex[3]);
      };
      return rgb2hex(this.css(colorProp));
    };

    //BackgroundColor
    $('#background_color').on("change", function () {
      $('body *').not('#flourish-widget-main *').css('background-color', 'none');
      var background_color = $(this).val()
      // $('body').not('a, #flourish_widget, #flourish_widget *, #flourish-triggers, #flourish-triggers *, .translate-language-span, .audio_state *').css('background', background_color, '!important')
      $('body, body *').not('#flourish-widget-main, #flourish-widget-main *').not('.dropdown-menu, .dropdown-menu *').css('background-color', background_color)
      $('#navContainer, #navContainer #main_navbar .dropdown-menu.backdrop_hover, #navContainer  #main_navbar .dropdown-menu > .dropdown-submenu.firstLevel').css('background-color', background_color)
      $('#Scroll_btn').css('background-color', background_color)
      $('#menuTitle').css('background-color', background_color + '!important')
      $('#footerFeat_container, .Footer').css('background-color', background_color);
      $('#menudropdown .card-body').css('background-color', background_color);
      var hexBackgroundColor = $('body').cssAsHex('background-color');
      $("#bg_hexVal").html(hexBackgroundColor);
      $.cookie.raw = true; //to bypass the default cookie value which is encoded/decoded when writing/reading
      $.cookie('BackgroundColorCookie', hexBackgroundColor, { expires: 30 });
      deactivatePresets()
    });
    if ($.cookie('BackgroundColorCookie') != undefined) {
      setCookieColors('BackgroundColorCookie', '#background_color', "#bg_hexVal")
    }

    //TextColor
    $('#text_color').on("change", function () {
      var text_color = $(this).val()
      $('body *').not('#flourish-widget-main, #flourish-widget-main *, a, i').css('color', text_color);
      $('#search-container').css('border', `solid 1px ${text_color}`);
      $('#flourish_widget h2, #flourish_widget h3, #flourish_widget label, .hexVal, .translate-language-span, .flourish-contact-info-p, .headings, .flourish-setting-title, .filter-header, .lang-filter, .flourish-language-btn, .flourish-accordion-header').css('color', 'black');
      $('.translate-language-span:hover').css('background-color', 'white');
      $('.SearchForm .input-group .input-group-append #submit_search').css('color', text_color);
      $('#footerFeat_container, .Footer').css({ 'color': text_color, 'border-top': `1px solid ${text_color}` });
      $('#menudropdown .card-body').css('border', `1px solid ${text_color}`);




      var hexTextColor = $('body *').cssAsHex('color');
      console.log(hexTextColor)
      $("#txt_hexVal").html(hexTextColor);
      $.cookie.raw = true;
      $.cookie('TextColorCookie', hexTextColor, { expires: 30 });
      deactivatePresets()
    });
    if ($.cookie('TextColorCookie') != undefined) {
      setCookieColors('TextColorCookie', '#text_color', "#txt_hexVal")
    }

    //LinkColor
    $('#link_color').on("change", function () {
      var link_color = $('body a').css('color');
      $('body a, body i').not('#flourish_widget, #flourish_widget *, #flourish-triggers, #flourish-triggers *, .HighlightLinks *, .HighlightHover *, .translate-language-span').css('color', link_color).addClass('flourish-link-style');
      var hexLinkColor = $('body a').cssAsHex('color');
      $("#link_hexVal").html(hexLinkColor);
      $.cookie.raw = true;
      $.cookie('LinkColorCookie', hexLinkColor, { expires: 30 });
    });

    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.backgroundColor = link_color;
        link.style.opacity = .7;
      })
      link.addEventListener('mouseleave', () => {
        link.style.opacity = 1;
      })
    })


    if ($.cookie('LinkColorCookie') != undefined) {
      setCookieColors('LinkColorCookie', '#link_color', "#link_hexVal")
    }
  });

  const setCookieColors = (cookie, input, hex) => {
    const hexValue = $.cookie(cookie)
    const colorInput = document.querySelector(input)
    colorInput.value = hexValue
    colorInput.dispatchEvent(new Event('change'));
    $(hex).html(hexValue);
    $.cookie.raw = true;
  }

  // change font size section ------------------------->
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

  // website color presets ---------------------------->



  const colorPresetObj = [
    // {
    //   id: 'color-preset-1',
    //   bgColor: '#FFFFFF',
    //   textColor: '#000000',
    //   linkColor: ['#3863FF', '#C20000', '#996900', '#727A00', '#278321', '#7C57E0', '#A648A8']
    // },

    {
      id: 'color-preset-1',
      bgColor: '#072664',
      textColor: '#FFFFFF',
      linkColor: ['#F06666', '#9D980B', '#E07800', '#009DE0', '#D06CD0', '#1FAC0C', '#F24AE4']
    },
    {
      id: 'color-preset-2',
      bgColor: '#FEE543',
      textColor: '#000000',
      linkColor: ['#3A4BE4', '#B62F2F', '#00750E', '#A133A3', '#944F00']
    },
    {
      id: 'color-preset-3',
      bgColor: '#002E18',
      textColor: '#FFFFFF',
      linkColor: ['#578FFF', '#FF5757', '#00A88C', '#999400', '#C966FF', '#00A80B', '#FF3DCB']
    },

    {
      id: 'color-preset-4',
      bgColor: '#D9D3D3',
      textColor: '#000000',
      linkColor: ['#AD007F', '#225D91', '#426426', '#8F4500', '#7532C8', '#B21515',]
    },
    {
      id: 'color-preset-5',
      bgColor: '#1A1A1A',
      textColor: '#FF2929',
      linkColor: ['#F1E0FF', '#F3F4A9', '#A5F8EA', '#FFE6CC', '#BEF4BE', '#FFE0F8']
    },
    {
      id: 'color-preset-6',
      bgColor: '#CCF8FF',
      textColor: '#000000',
      linkColor: ['#C70092', '#0C7A00', '#D51515', '#0B69BC', '#886211', '#B300D6']
    },



    {
      id: 'color-preset-7',
      bgColor: '#F9CA94',
      textColor: '#000000',
      linkColor: ['#2B54B6', '#6B2BE3', '#1D6808', '#9C159E', '#066555', '#A81F5A']
    },



    {
      id: 'color-preset-8',
      bgColor: '#44064C',
      textColor: '#FFFFFF',
      linkColor: ['#999400', '#15A512', '#FF5252', '#00A398', '#FA00E5', '#8288E3']
    },

    {
      id: 'color-preset-9',
      bgColor: '#E3CCFF',
      textColor: '#000000',
      linkColor: ['#AD0088', '#1B691B', '#8B00D6', '#2D57B9', '#B31414', '#2A6365']
    },
    {
      id: 'color-preset-10',
      bgColor: '#37EBDC',
      textColor: '#000000',
      linkColor: ['#9C3A3A', '#A503A0']
    },
    {
      id: 'color-preset-11',
      bgColor: '#CAFFC2',
      textColor: '#000000',
      linkColor: ['#4054E7', '#D11515', '#C313B4',]
    },


    {
      id: 'color-preset-12',
      bgColor: '#591212',
      textColor: '#FFFFFF',
      linkColor: ['#009DE0', '#E07800', '#1FAC0C', '#9D980B', '#F24AE4']
    },



    // {
    //   id: 'color-preset-12',
    //   bgColor: '#FFC7DF',
    //   textColor: '#000000',
    //   linkColor: ['#BD0000', '#006B20', '#8C14CC', '#854D00', '#066564', '#A71186']
    // },






  ]

  // swithc between custom and presets btn
  const colorSectionBtns = document.querySelectorAll('.color-section-btn')
  colorSectionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (!btn.classList.contains('active')) {
        colorSectionBtns.forEach((item) => { item.classList.remove('active') })
        btn.classList.add('active')
      }
      if (btn.id === 'custom-color-btn') {
        $('#preset-schemes').hide()
        $('#custom-schemes').fadeIn()
      } else {
        $('#custom-schemes').hide()
        $('#preset-schemes').fadeIn()
      }
    })
  })


  const colorPresetItems = document.querySelectorAll('.main-color-presets')

  colorPresetItems.forEach((item, i) => {
    item.style.backgroundColor = colorPresetObj[i].linkColor[0]
    item.style.border = `${colorPresetObj[i].textColor} solid 5px`
    item.style.boxShadow = `0 0 0 4px ${colorPresetObj[i].bgColor}, 0 0 0 5px rgba(0, 0, 0, .2)`
    item.addEventListener('click', () => {
      $.cookie('main-color-preset', colorPresetObj[i].id, { expires: 30 });
      $.removeCookie('alt-link');
      colorPresetItems.forEach((item) => { item.classList.remove('active') })
      $(item).addClass('active').siblings().removeClass('active');
      triggerEventFunc("#background_color", colorPresetObj[i].bgColor)
      triggerEventFunc("#text_color", colorPresetObj[i].textColor)
      $("#txt_hexVal").html(colorPresetObj[i].textColor);
      triggerEventFunc("#link_color", colorPresetObj[i].linkColor[0])
      const linkArr = createLinks(i)
      createLinkColorOptions(linkArr)
      handleLinkColorOptions()
      invertFlourishToggle(item)
    })
  })

  const createLinks = (indexInput) => {

    const linkArr = colorPresetObj[indexInput].linkColor
    $.cookie('alt-link', linkArr[0], { expires: 30 });
    return linkArr
  }

  const createLinkColorOptions = (linkArr) => {
    const linkContainer = document.querySelector('#alt-link-colors')
    linkContainer.innerHTML = ''
    for (let j = 0; j < linkArr.length; j++) {
      const newLinkColor = document.createElement('div')
      newLinkColor.style.backgroundColor = linkArr[j]
      newLinkColor.classList.add('alt-link-color')
      newLinkColor.id = linkArr[j]
      linkContainer.append(newLinkColor)
    }
  }

  const handleLinkColorOptions = () => {
    const linkColors = document.querySelectorAll('.alt-link-color')
    linkColors[0].classList.add('active')
    linkColors.forEach(linkColor => {
      linkColor.addEventListener('click', () => {
        triggerEventFunc("#link_color", linkColor.id)
        linkColors.forEach((colorItem) => { colorItem.classList.remove('active') })
        $(linkColor).addClass('active').siblings().removeClass('active');
        $.cookie('alt-link', linkColor.id, { expires: 30 });
      })
    })
  }
  const invertFlourishToggle = (item) => {
    const toggle = document.querySelector('#toggle-flourish-list')
    if (item.id === 'color-preset-1' || item.id === 'color-preset-3' || item.id === 'color-preset-5' || item.id === 'color-preset-8' || item.id === 'color-preset-12') {
      toggle.classList.add('invert-toggle')
    } else {
      toggle.classList.remove('invert-toggle')
    }
  }
  setTimeout(() => {
    let linkColor = null
    if ($.cookie('alt-link')) {
      linkColor = $.cookie('alt-link')
      document.getElementById('preset-color-btn').click();
    }
    if ($.cookie('main-color-preset')) {
      const presetId = $.cookie('main-color-preset')
      document.getElementById(presetId).click();
      if (linkColor) {
        document.getElementById(linkColor).click();
      }
    }
    else {

      handleLinkColorOptions()
      if (linkColor) {
        console.log('link color', linkColor)
        document.getElementById(linkColor).click();
      }
    }
  }, 500)



  const triggerEventFunc = (input, value) => {
    const e = new Event("change");
    const element = document.querySelector(input)
    element.value = value;
    element.dispatchEvent(e);
  }

  const resetCustomPresets = () => {
    $.removeCookie('main-color-preset');
    $.removeCookie('alt-link');
    const defaultLinkColors = ['#3863FF', '#E60000', '#996900', '#727A00', '#278321', '#7C57E0', '#A648A8']
    createLinkColorOptions(defaultLinkColors)
    handleLinkColorOptions()
    colorPresetItems.forEach((item) => { item.classList.remove('active') })
    document.querySelectorAll('.alt-link-color').forEach((colorItem) => { colorItem.classList.remove('active') })
  }

  // change font ----------------------------->
  const fontTypeArr = [
    {
      id: 'FT_Baskerville',
      activeItemText: 'Libre-baskerville font',
      activeItemObj: 'isBaskervilleFont',
      class_: 'BaskervilleFont',
    },
    {
      id: 'FT_Dyslexic',
      activeItemText: 'Open-dyslexic font',
      activeItemObj: 'isDyslexicFont',
      class_: 'DyslexicFont',
    }
  ]



  const fontTypeOptions = document.querySelectorAll('.font-type-option')

  fontTypeOptions.forEach(font => {
    font.addEventListener('click', () => {
      fontTypeHandler(font.id)
    })
  })

  const restoreDefaultFontType = () => {

    for (let i = 0; i < fontTypeArr.length; i++) {
      const { id, class_, activeItemObj } = fontTypeArr[i]
      widgetItemObj[activeItemObj] = false
      $.removeCookie(id);
      removeWidgetControls([id])
      $('body').removeClass(class_);
    }
    widgetItemObj.isFontChanged = false
    $('#FT_Default').addClass('active').siblings().removeClass('active');
  }

  const fontTypeHandler = (currItemId) => {
    const currItemTag = `#${currItemId}`
    $(currItemTag).addClass('active').siblings().removeClass('active');
    if (currItemId === 'FT_Default') {
      restoreDefaultFontType()
    } else {
      widgetItemObj.isFontChanged = true
      for (let i = 0; i < fontTypeArr.length; i++) {
        const { id, class_, activeItemObj, activeItemText } = fontTypeArr[i]
        if (id === currItemId) {
          $('body').addClass(class_);
          widgetItemObj[activeItemObj] = true

          $.cookie(id, true, { expires: 30 });
          addWidgetControls(id, activeItemText)
        } else {
          widgetItemObj[activeItemObj] = false
          $.removeCookie(id);
          removeWidgetControls([id])
          $('body').removeClass(class_);
        }
      }
    }
    $.removeCookie('FM_FontTypeCookie');
    checkIfWidgetActive()
  }

  for (let i = 0; i < fontTypeArr.length; i++) {
    if ($.cookie(fontTypeArr[i].id) == "true") {
      console.log('it does exist')
      fontTypeHandler(fontTypeArr[i].id)
      setTimeout(() => {
        $("#FT_Default").removeClass('active')
      }, 300)
    }
  }

  // change cursor size section ----------------------------->
  const increaseCursorSize = () => {
    $('#Cur_Enlarge').addClass('active').siblings().removeClass('active');
    $("body").addClass("Cursor_Enlarge");
    addWidgetControls('Cursor_Enlarge_option', 'Increase cursor size')
    widgetItemObj.isCursorBig = true
    $.cookie('CursorEnlargeCookie', true, { expires: 30 });
    checkIfWidgetActive()
  }

  const restoreDefaultCursorSize = () => {
    $('body').removeClass('Cursor_Enlarge');
    $('#Cur_Default').addClass('active').siblings().removeClass('active');
    $.removeCookie('CursorEnlargeCookie');
    removeWidgetControls(['Cursor_Enlarge_option'])
    widgetItemObj.isCursorBig = false
    checkIfWidgetActive()
  }

  $(document).ready(function () {
    if ($.cookie('CursorEnlargeCookie') == 'true') {
      increaseCursorSize()
    }
    $("#Cur_Enlarge").click(function () {
      increaseCursorSize()
    });
    $("#Cur_Default").click(function () {
      restoreDefaultCursorSize()
    });
  });

  // letter spacing word spacing line height section --------------------->
  const setSpacingCss = (value, css) => {
    $("body p").not('#flourish_widget, #flourish_widget *, i, div').css(css, value); //Selects everything inside body except flourish modal and
    $(".Footer").css(css, value);
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

  document.querySelectorAll('.spacing-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      selectChangeHandler(icon, 'letter-spacing-icon', '#letter_spacing option:selected')
      selectChangeHandler(icon, 'word-spacing-icon', '#word_spacing option:selected')
      selectChangeHandler(icon, 'line-height-icon', '#line_height option:selected')
    })
  })

  const restoreSpacingDefault = (itemId, removeItemArr) => {
    $(itemId).prop("selectedIndex", 0).trigger('change');
    checkIfWidgetActive()
    removeWidgetControls(removeItemArr)
  }
  // letter spacing
  $(document).ready(function () {
    var selectedVal = $.cookie("LetterSpaceVal");
    if (selectedVal) {
      $("#letter_spacing").val(selectedVal);
      $("#letter_spacing").prop("selected", true);
      $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div, .close-active-text').css("letter-spacing", selectedVal); //Selects everything inside body except flourish modal and header
      $(".Footer").css("letter-spacing", selectedVal);
      // changeIndent(selectedVal, '10px', '#LetterSpacing_option select'close-active-text, '6.5px')
    }
    $("#letter_spacing").on("change", function () {
      var selection1 = $(this).val();

      $(selection1).prop("selected", true);
      $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div, .close-active-text').css("letter-spacing", selection1); //Selects everything inside body except flourish modal and header
      $(".Footer").css("letter-spacing", selection1);
      $.cookie("LetterSpaceVal", selection1, { expires: 30 })
      // changeIndent(selection1, '10px', '#LetterSpacing_option select', '6.5px')
      widgetItemObj.isLetterSpaceChanged = selection1 === 'inherit' ? false : true
      selection1 === 'inherit' ? removeWidgetControls(['letter_spacing']) : addWidgetControls('letter_spacing', 'Letter spacing')
      checkIfWidgetActive()
    });

    //Word Spacing
    var selectedVal2 = $.cookie("WordSpaceVal");
    if (selectedVal2) {
      $("#word_spacing").val(selectedVal2);
      $("#word_spacing").prop("selected", true);
      $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div').css("word-spacing", selectedVal2); //Selects everything inside body except flourish modal and header
      // changeIndent(selectedVal2, '10px', '#WordSpacing_option select', '6.5px')
    }
    $("#word_spacing").on("change", function () {
      var selection2 = $(this).val();
      $(selection2).prop("selected", true);
      $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div').css("#word_spacing", selection2); //Selects everything inside body except flourish modal and header
      $(".Footer").css("#word_spacing", selection2);
      $.cookie("WordSpaceVal", selection2, { expires: 30 })
      // changeIndent(selection2, '10px', '#WordSpacing_option select', '6.5px')
      widgetItemObj.isWordSpaceChanged = selection2 === 'inherit' ? false : true
      selection2 === 'inherit' ? removeWidgetControls(['word_spacing']) : addWidgetControls('word_spacing', 'Word spacing')
      checkIfWidgetActive()

    });

    //Line Height
    var selectedVal3 = $.cookie("LinpageHeightVal");
    if (selectedVal3) {
      $("#line_height").val(selectedVal3);
      $("#line_height").prop("selected", true);
      $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div').css("line-height", selectedVal3); //Selects everything inside body except flourish modal and header
      $(".Footer").css("line-height", selectedVal3);
    }
    $("#line_height").on("change", function () {
      var selection3 = $(this).val();
      $(selection3).prop("selected", true);
      $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div').css("line-height", selection3); //Selects everything inside body except flourish modal and header
      $(".Footer").css("line-height", selection3);
      $.cookie("LinpageHeightVal", selection3, { expires: 30 })
      widgetItemObj.isLineHeightChanged = selection3 === 'inherit' ? false : true
      checkIfWidgetActive()
      selection3 === 'inherit' ? removeWidgetControls(['line_height']) : addWidgetControls('line_height', 'Line height')

    });
  });
  //  old footer code
  $(document).ready(function () {
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
      $("body *").not('#flourish_widget, #flourish_widget *, i, div').css("letter-spacing", getLetterSpace); //Selects everything inside body except flourish modal and header
      $(".Footer").css("letter-spacing", getLetterSpace);
    });

    //////////// Change Word Spacing ///////////////////
    $("#word_spacing").on('change', function () {
      var getWordSpace = $(this).val();
      $("body *").not('#flourish_widget, #flourish_widget *, i, div').css("word-spacing", getWordSpace); //Selects everything inside body except flourish modal and header
      $(".Footer").css("word-spacing", getWordSpace);
    });
  }); //end of doc ready




  // text magnify section ----------------------------------->
  let textMagObj = {
    color: 'rgb(255,255,255)',
    backGroundColor: 'rgb(54,54,54)',
    size: '22px',
  }

  if ($.cookie('TextMagnifier') == "true") {
    $('#ToggleTextMagnifier').prop('checked', false).trigger('change')
    setTimeout(() => {
      $('#ToggleTextMagnifier').prop('checked', true).trigger('change')
      $('#reset-text-magnify-btn').css("display", "flex").hide().fadeIn('slow');
    }, 500)
  }

  let textMagY = 65
  window.onmousemove = function (e) {
    if (e.pageY >= $(document).height() - 120) {
      textMagY = 250
    } else if (e.pageY < 100) {
      textMagY = -0
    }
    else {
      textMagY = 65
    }
  }

  $(document).on('mousemove', function (e) {
    let textMagX = 15
    if (e.pageX > window.innerWidth / 1.3) {
      textMagX = -300
    }
    $('#text_magnify').css({
      left: e.pageX + textMagX,
      top: e.pageY - textMagY
    });
  });

  const hoverTextFunc = () => {
    if ($('#ToggleTextMagnifier').is(':checked')) {
      $('#reset-text-magnify-btn').css("display", "flex").hide().fadeIn('slow');
      $('#edit-text-magnify').css("display", "flex").hide().fadeIn();
      $('.text-mag-preview-container').css("display", "flex").hide().fadeIn();
      $("body").addClass("TextMagnifier");
      $('#ToggleZoom').prop('checked', false);
      let textTimer;
      let textMagnify
      $("p, a, :header, span, button, td, li").not('#flourish-triggers, #flourish-triggers ul, #flourish-triggers ul li, #flourish-triggers *, #reset-text-magnify-btn, #reset-img-magnify-btn').on("mouseenter", function () {
        clearTimeout(textTimer)
        textMagnify = $(this).text();
        if (textMagnify.length > 1000) {
          $('#text_magnify').css({ 'max-width': '1000px' });
        } else {
          $('#text_magnify').css({ 'max-width': '500px' });
        }
        textTimer = setTimeout(function () {
          if (textMagnify.replaceAll(/\s/g, '') !== '') {
            $("#text_magnify").text(textMagnify);
            $('#text_magnify').css({ 'color': textMagObj.color, 'background-color': textMagObj.backGroundColor, 'font-size': textMagObj.size });
            if (document.body.classList.contains('TextMagnifier')) {
              $('#text_magnify').show()
            }
          }
        }, 300);
      }).on("mouseleave", function () {
        textMagnify = ''
        $('#text_magnify').hide()
      });
      addWidgetControls('ToggleTextMagnifier', 'Text magnify')
      widgetItemObj.isTextMag = true
    } else {
      $('#reset-text-magnify-btn').fadeOut()
      $('#edit-text-magnify').fadeOut()
      $('.text-mag-preview-container').fadeOut()
      $("body").removeClass("TextMagnifier");
      $('#text_magnify').fadeOut()
      removeWidgetControls(['ToggleTextMagnifier'])
      widgetItemObj.isTextMag = false
    }
    checkIfWidgetActive()
  }

  $(window).scroll(function () {
    $('#text_magnify').fadeOut('fast')
  });

  $(function () {
    $('#ToggleTextMagnifier').change(function () {
      hoverTextFunc()
    });
  });


  // image description ------------------------------>
  let imgMagObj = {
    color: 'rgb(255,255,255)',
    backGroundColor: 'rgb(54,54,54)',
    size: '22px!important',
  }

  if ($.cookie('ImageDescription') == "true") {
    $('#ToggleImageDescription').prop('checked', false).trigger('change')
    setTimeout(() => {
      $('#ToggleImageDescription').prop('checked', true).trigger('change')
      $('#reset-img-magnify-btn').css("display", "flex").hide().fadeIn('slow');
    }, 500);
  }

  $(document).on('mousemove', function (e) {
    let imgMagY = 65
    let imgMagX = 15
    if (e.pageY >= $(document).height() - 120) {
      imgMagY = 100
    } else if (e.pageY < 100) {
      imgMagY = -0
    }
    else {
      imgMagY = 65
    }
    if (e.pageX > window.innerWidth / 1.3) {
      imgMagX = -200
    }
    $('#ImageDescription_magnify').css({
      left: e.pageX + imgMagX,
      top: e.pageY - imgMagY
    });
  });


  const imgMagFunc = () => {
    if ($('#ToggleImageDescription').is(':checked')) {
      $('#reset-img-magnify-btn').css("display", "flex").hide().fadeIn('slow');
      $('#edit-img-magnify').css("display", "flex").hide().fadeIn();
      $('.img-mag-preview-container').css("display", "flex").hide().fadeIn();
      $("body").addClass("ImageDescription");
      addWidgetControls('ToggleImageDescription', 'Image description')
      widgetItemObj.isImgMag = true
      let imgTimer;
      let imgAltMagnify = ''
      $('svg[alt], img[alt], i.fa[alt]').not('#toggle-flourish-list').on("mouseenter", function () {
        clearTimeout(imgTimer)
        let imgHideId = $(this).attr("data-id");
        imgAltMagnify = $(this).attr("alt");
        imgTimer = setTimeout(function () {
          if (imgAltMagnify.replaceAll(/\s/g, '') !== '') {
            $("#ImageDescription_magnify").text(imgAltMagnify);
            $('#ImageDescription_magnify').css({ 'color': imgMagObj.color, 'background-color': imgMagObj.backGroundColor, 'font-size': imgMagObj.size });
            if (document.body.classList.contains('ImageDescription') && imgHideId !== 'hide-img-hover') {
              $('#ImageDescription_magnify').show()
            }
          }
        }, 300);
      }).on("mouseleave", function () {
        imgAltMagnify = ''
        $('#ImageDescription_magnify').hide()
      });
    } else {
      $('#reset-img-magnify-btn').fadeOut()
      $('#edit-img-magnify').fadeOut()
      $('.img-mag-preview-container').fadeOut()
      $("body").removeClass("ImageDescription");
      $('#ImageDescription_magnify').fadeOut()
      removeWidgetControls(['ToggleImageDescription'])
      widgetItemObj.isImgMag = false
    }
    checkIfWidgetActive()
  }

  $(function () {
    $('#ToggleImageDescription').change(function () {
      imgMagFunc()
    });
  });

  $(window).scroll(function () {
    $('#ImageDescription_magnify').fadeOut('fast')
  });

  // text magnifier and image magnifier settings section------------------->
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
    if (document.body.classList.contains('highcontrast') || document.body.classList.contains('inverted')) {
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



  // reading mask section -------------------------------------->

  setTimeout(() => {
    turnOffItemsOnMobile()
  }, 200)

  let maxPageHeight = document.body.scrollHeight
  var resizeId;
  window.addEventListener("resize", () => {
    if (hasTouchScreen || window.innerWidth < 650) {
      turnOffItemsOnMobile()
    } else if (window.innerWidth > 650) {
      $(".reading-mask").fadeOut('fast')
      clearTimeout(resizeId);
      resizeId = setTimeout(resetMaskOnWidthChange, 400);
    }
    hideItemsonTouchScreen()
    // getRidOfReadingAssistance()
  });

  const resetMaskOnWidthChange = () => {
    if (document.body.classList.contains('ReadingMask_ON')) {
      maxPageHeight = document.body.scrollHeight
      $(".reading-mask").fadeIn()
    }
  }

  const hideItemsonTouchScreen = () => {
    if (window.innerWidth < 992 || hasTouchScreen) {
      $('#text-reading-assistance').addClass('d-none')
    } else {
      $('#text-reading-assistance').removeClass('d-none')
    }
  }
  hideItemsonTouchScreen()

  const turnOffItemsOnMobile = () => {
    if (hasTouchScreen || window.innerWidth < 650) {
      if ($('#ToggleReadingMask').is(':checked')) {
        $('#ToggleReadingMask').prop('checked', false).trigger('change');
      }
      if ($('#ToggleReadingGuide').is(':checked')) {
        $('#ToggleReadingGuide').prop('checked', false).trigger('change');
      }
      document.body.classList.remove('CursorGuide')
      $("#top_mask").fadeOut()
      $("#bottom_mask").fadeOut()
      $.removeCookie('readingMaskWidth');
      $.removeCookie('edit-reading-mask');
      $.removeCookie('CursorGuide');
      if ($.cookie("ReadingMask")) {
        document.body.classList.remove('ReadingMask_ON')
        $.removeCookie('ReadingMask');
      }
    }
  }
  $.removeCookie('readingMaskWidth');

  $(function () {
    $('[id="ToggleReadingMask"]').change(function () {
      if ($(this).is(':checked')) {
        showReadingMask()
      } else {
        hideReadingMask()
      }
      checkIfWidgetActive()
    });
  });

  const showReadingMask = () => {
    $.cookie("readingMaskWidth", window.innerWidth, { expires: 1 });
    $('#reset-mask-btn').css("display", "flex").hide().fadeIn('slow');
    $("#edit-reading-mask").css("display", "flex").hide().fadeIn()
    $.cookie("edit-reading-mask", true, { expires: 30 });
    $.cookie("ReadingMask", true, { expires: 30 });
    widgetItemObj.isReadingMask = true
    $("body").addClass("ReadingMask_ON");
    addWidgetControls('ToggleReadingMask', 'Reading mask')
    maxPageHeight = document.body.scrollHeight
    $(".reading-mask").fadeIn()
  }

  const hideReadingMask = () => {
    $("body").removeClass("ReadingMask_ON");
    $("body").removeClass("ReadingMask ");
    $("#edit-reading-mask").fadeOut()
    $.cookie("edit-reading-mask", false, { expires: 30 });
    $.removeCookie('ReadingMask');
    removeWidgetControls(['ToggleReadingMask'])
    widgetItemObj.isReadingMask = false
    $('#reset-mask-btn').css("display", "none")
    $(".reading-mask").fadeOut()
  }

  const resetMaskOnTranslate = () => {
    if (document.body.classList.contains('ReadingMask_ON')) {
      $('.reading-mask').fadeOut()
      maxPageHeight = document.body.scrollHeight
      setTimeout(() => $('.reading-mask').fadeIn(), 2500)
    }
  }

  setTimeout(() => {
    if ($.cookie('ReadingMask') === 'true') {
      maxPageHeight = document.body.scrollHeight
      showReadingMask()
    } else {
      $('#reset-mask-btn').css("display", "none")
    }
  }, 500)

  var opacityCookie = $.cookie("readingMaskOpacity");
  if (opacityCookie) {
    $("#reading-mask-opacity").val(opacityCookie);
    $(".reading-mask").css({ "opacity": opacityCookie })
  }

  document.querySelectorAll('.opacity-icons').forEach(icon => {
    icon.addEventListener('click', () => {
      selectChangeHandler(icon, 'opacity-icons', '#reading-mask-opacity option:selected')
      let newVal = $('#reading-mask-opacity').val();
      $(".reading-mask").css({ "opacity": newVal })
      $.cookie("readingMaskOpacity", newVal, { expires: 30 })
    })
  })

  const maskOpacityInput = document.getElementById('reading-mask-opacity')
  maskOpacityInput.addEventListener('change', () => {
    $(".reading-mask").css({ "opacity": maskOpacityInput.value })
    $.cookie("readingMaskOpacity", maskOpacityInput.value, { expires: 30 })
  })

  // change mask size*****************>
  let defaultMaskVal = 60
  let maskValue = defaultMaskVal

  var maskSizeCookieVal = $.cookie("readingMaskHeight");
  if (maskSizeCookieVal) {
    console.log(maskSizeCookieVal)
    $("#mask-size-input").val(maskSizeCookieVal);
    maskValue = maskSizeCookieVal
  }

  const maskSizeInputRange = document.getElementById('mask-size-input')
  maskSizeInputRange.addEventListener('change', () => {
    let sizeInputVal = maskSizeInputRange.value
    maskValue = sizeInputVal
    $.cookie("readingMaskHeight", maskValue, { expires: 30 })
  })

  $(window).scroll(function (e) {
    maxPageHeight = document.body.scrollHeight
  });

  document.body.addEventListener('mousemove', (e) => {
    maxPageHeight = document.body.scrollHeight
    const bottomOverlayHeight = maxPageHeight - e.pageY
    const topOverlayHeight = maxPageHeight - bottomOverlayHeight - maskValue
    $('#bottom_mask').css({ top: e.pageY, height: bottomOverlayHeight + 'px' });
    $('#top_mask').css({ top: 0 - maskValue, height: topOverlayHeight + 'px' });
  })

  const changeColorPicker = (color, cssSelector, hexSelector, inputSelector,) => {
    $(inputSelector).val(color).trigger('change')
    $(cssSelector).css({ "background-color": color })
    $(hexSelector).text(color);
  }

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

  const resetMaskSettingsCookies = () => {
    $.removeCookie('readingMaskOpacity');
    $.removeCookie('readingMaskHeight');
    $.removeCookie('readingMaskColor');
  }

  const restoreDefaultMaskSettings = () => {
    let defaultColor = '#363636'
    let defaultOpacity = '.5'
    if ($.cookie("InvertBackground") === 'yes' || $.cookie("DarkContrastBackground") === 'yes') {
      defaultColor = '#ffffff'
      defaultOpacity = '.7'
    }
    changeColorPicker(defaultColor, '.reading-mask', '#mask_hexVal', "#mask_color")
    const e = new Event("change");
    const element = document.querySelector("#reading-mask-opacity")
    element.value = defaultOpacity;
    element.dispatchEvent(e);
    $("#mask-size-input").val(defaultMaskVal);
    maskValue = defaultMaskVal
    resetMaskSettingsCookies()
  }

  if ($.cookie("edit-reading-mask") === 'true') {
    $("#edit-reading-mask").css("display", "flex").hide().fadeIn()
  }

  if ($.cookie('ReadingMask')) {
    $('#reset-mask-btn').css("display", "flex").hide().fadeIn('slow');
  }

  setTimeout(() => {
    if (document.body.classList.contains('ReadingMask_ON')) {
      $('.reading-mask').fadeIn()
    }
  }, 100);

  // reading guide section --------------------->
  $(document).ready(function () {
    $("input.switch-input[type=checkbox]").each(function () {
      var name = $(this).attr('name');
      if ($.cookie(name) && $.cookie(name) == "true") {
        $(this).prop('checked', $.cookie(name));
        $("body").addClass(name);
        if ($('[id="ToggleReadingGuide"]').is(':checked')) {
          $("body").addClass(name);
        }
      }
    });
    $("input.switch-input[type=checkbox]").change(function () {
      var name = $(this).attr("name");
      $.cookie(name, $(this).prop('checked'), { expires: 30, })
    });
  });

  if ($.cookie("edit-reading-guide") === 'true') {
    $("#edit-reading-guide").css("display", "flex").hide().fadeIn()
    $('#reset-guide-btn').css("display", "flex").hide().fadeIn('slow');
  }

  $(function () {
    $('[id="ToggleReadingGuide"]').change(function () {
      if ($(this).is(':checked')) {
        $('#reset-guide-btn').css("display", "flex").hide().fadeIn('slow');
        $("#edit-reading-guide").css("display", "flex").hide().fadeIn()
        $.cookie("edit-reading-guide", true, { expires: 30 });
        $("#tail").hide()
        $("body").addClass("CursorGuide");
        $("#tail").fadeIn(500)
        addWidgetControls('ToggleReadingGuide', 'Reading guide')
        widgetItemObj.isReadingGuide = true
      } else {
        $('#reset-guide-btn').fadeOut()
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

  // //////////// Reading guide size
  // change guide size
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
    if ($.cookie("InvertBackground") === 'yes' || $.cookie("DarkContrastBackground") === 'yes') {
      defaultColor = '#ffffff'
    }
    changeColorPicker(defaultColor, '#tail', '#guide_hexVal', "#guide_color")
    guideYVal = 8
    $("#guide-size-input").val(guideYVal)
    $("#tail").css({ "height": guideYVal });
    resetGuideSettingsCookies()
  }

  // photosensitivity filter section --------------------->
  $(function () {
    $('[id="TogglePhotoFilter"]').change(function () {
      if ($(this).is(':checked')) {
        $("html").addClass("PhotoSens");
        addWidgetControls('TogglePhotoFilter', 'Photosensitivity filter')
        widgetItemObj.isPhotoSens = true
        if (!widgetItemObj.isLowSat) {
          $("html").addClass("lowsaturation");
        }
      } else {
        $("html").removeClass("PhotoSens");
        $("body").removeClass("PhotoSens");
        removeWidgetControls(['TogglePhotoFilter'])
        widgetItemObj.isPhotoSens = false
        if (!widgetItemObj.isLowSat) {
          $("html").removeClass("lowsaturation");
        }
      }
      checkIfWidgetActive()
    });
  });

  if ($.cookie('PhotoSens') == "true") {
    $('#TogglePhotoFilter').prop('checked', true).trigger('change')
    if (!widgetItemObj.isLowSat) {
      $("html").addClass("lowsaturation");
    }
  }

  // highlight on hover section ------------------------>
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

  // outline all links section ------------------------>
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


  // text to speech section --------------------------------->
  $(document).ready(function () {
    const resetSpeech = () => {
      $('.curr-active-item').removeClass('curr-active-item')
      $('.play').removeClass('audio-playing audio-paused')
      $('.play').addClass('audio-inactive')
      $('.play').find('.toggle-audio').attr("src", "./flourish/img/play.png").removeClass('pr-1').addClass('pr-0');
      synth.cancel();
    }
    var speechVol = $.cookie("speechVolCookie");
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
    // round slider settings
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
      $.removeCookie('speechPitch');
      $.removeCookie('speechRate');
      $.removeCookie('speechVol');
      $(".audio_state").hide()
      resetVoiceSettings()
      resetSpeech()
      resetVoiceDefault()
    }

    document.querySelector('#reset-voice-btn').addEventListener('click', () => {
      fullVoiceReset()
    })

    $("#volume input").addClass("volume_selector");
    $("#rate input").addClass("rate_selector");
    $("#pitch input").addClass("pitch_selector");
    $("<span class='headings'>Volume</span>").appendTo("#volume");
    $("<span class='headings'>Rate</span>").appendTo("#rate");
    $("<span class='headings'>Pitch</span>").appendTo("#pitch");
    let ssu;
    var synth = window.speechSynthesis;
    var voiceSelect = document.getElementById('voice');
    var volumeInput = document.querySelector('.volume_selector');
    var rateInput = document.querySelector('.rate_selector');
    var pitchInput = document.querySelector('.pitch_selector');

    function loadVoices() {
      if (document.querySelector('#voice').length === 0) {
        var voiceList = speechSynthesis.getVoices();
        if (voiceList.length > 1) {
          voiceList.forEach(function (voice, i) {
            if (voice.name !== 'Google US English' &&
              voice.name !== 'Google UK English Male' &&
              voice.name !== 'Microsoft David - English (United States)' &&
              voice.name !== 'English United States' &&
              voice.name !== 'Daniel' &&
              voice.name !== 'Samantha' &&
              voice.name !== 'Microsoft Jenny Online (Natural) - English (United States)' &&
              voice.name !== 'Microsoft Steffan Online (Natural) - English (United States)' &&
              voice.name !== 'English (USA,DEFAULT)') {
              return
            }
            var option = document.createElement('option');
            option.value = voice.name;
            option.innerHTML = voice.name;
            voiceSelect.appendChild(option);
          });
          if (document.querySelector('#voice').length < 1) {
            voiceList.forEach(function (voice, i) {
              var option = document.createElement('option');
              option.value = voice.name;
              option.innerHTML = voice.name;
              voiceSelect.appendChild(option);
            });
          }
        } else {
          $('#voice-settings-header').hide()
        }
      }
    }

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

    // click to create speech
    const htmlClickToSpeechFunc = (htmlElem) => {
      document.querySelectorAll(htmlElem).forEach(item => {
        item.addEventListener('click', () => {
          resetSpeech()
          removeElt()
          createAudioPlayer(item)
          playAudioHandler(htmlElem)
          $(".stop").on("click", function () {
            resetSpeech()
          });
        })
      })
    }

    // let speechTimer
    // const htmlClickToSpeechFunc = (htmlElem) => {

    //   document.querySelectorAll(htmlElem).forEach(item => {

    //     item.addEventListener('mouseenter', () => {
    //       clearTimeout(speechTimer)
    //       speechTimer = setTimeout(() => {
    //         resetSpeech()
    //         removeElt()
    //         createAudioPlayer(item)
    //         playAudioHandler(htmlElem)
    //         $(".stop").on("click", function () {
    //           resetSpeech()
    //         });
    //       }, 500)
    //     })
    //     item.addEventListener('mouseleave', () => {
    //       clearTimeout(speechTimer)
    //     })
    //   })
    // }

    const htmlClickArr = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label']
    $('#ToggleTTS_click').change(function () {
      if ($('#ToggleTTS_click').is(':checked')) {
        $(".audio_state").show()
        $("body").addClass("TTS_click_enabled");
        $("#speech-settings").removeClass("disable");
        $('#reset-voice-settings').fadeIn()
        addWidgetControls('ToggleTTS_click', 'Text to speech')
        widgetItemObj.isSpeech = true
        for (let i = 0; i < htmlClickArr.length; i++) {
          htmlClickToSpeechFunc(htmlClickArr[i])
        }
      } else {
        $("#speech-settings").addClass("disable");
        $('#reset-voice-settings').fadeOut()
        $(".audio_state").hide()
        setTimeout(() => {
          $("body").removeClass("TTS_click_enabled");
          $.cookie('TTS_click_enabled', 'false');
        }, 500);
        removeWidgetControls(['ToggleTTS_click'])
        widgetItemObj.isSpeech = false
      }
      checkIfWidgetActive()
    })

    if ($.cookie('TTS_click_enabled') == "true") {
      $("#speech-settings").removeClass("disable");
      $('#ToggleTTS_click').prop('checked', false).trigger('change')
      setTimeout(() => {
        $('#ToggleTTS_click').prop('checked', true).trigger('change')
      }, 500)
    }

    const createAudioPlayer = (item) => {
      if (document.body.classList.contains('TTS_click_enabled')) {
        const audioState = document.createElement('div')
        audioState.classList.add('audio_state')
        audioState.style.opacity = 0
        setTimeout(() => {
          audioState.style.opacity = 1
        }, 100)
        audioState.innerHTML = `
        <button class="play btn audio-inactive" title="toggle-audio">
          <img class="toggle-audio" src="./flourish/img/play.png" alt="toggle speech icon">
        </button>
        <button class="stop btn " title="Restart audio">
          <img class="mr-1" src="./flourish/img/reset.png" alt="reset audio icon">
          Reset
        </button>
        `
        item.parentNode.insertBefore(audioState, item.nextSibling);
      }
    }

    function removeElt() {
      var elements = document.getElementsByClassName("audio_state");
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    }
    /***** ON Play CLICK *****/
    const playAudioHandler = (htmlElem) => {
      $('div.audio_state .play').each(function (index) {
        $(this).click(function () {
          if (!$(this).hasClass('curr-active-item')) {
            resetSpeech()
            $(this).addClass('curr-active-item')
          }
          $(this).find('.toggle-audio').attr("src", "./flourish/img/play.png").removeClass('pr-1').addClass('pr-0');
          if ($(this).hasClass('audio-playing')) {
            $(this).removeClass('audio-inactive audio-playing')
            $(this).addClass('audio-paused')
            synth.pause()
          } else {
            $(this).find('.toggle-audio').attr("src", "./flourish/img/pause.png").removeClass('pr-0').addClass('pr-1');
            if ($(this).hasClass('audio-inactive')) {
              $('.play').removeClass('audio-inactive audio-paused')
              synth.cancel();
              ssu.text = $(this).parent("div.audio_state").prev(htmlElem).text();
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
    }

    $("#Flourish_trigger").click(function () {
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

    document.querySelector('#flourish_reset').addEventListener('click', () => {
      fullVoiceReset()
    })
    document.querySelector('#reset-flourish').addEventListener('click', () => {
      fullVoiceReset()
    })
  }); //end of doc ready


  // key commands section ------------------------------------->
  const keyTogglerFunc = (itemId) => {
    if ($(itemId).is(':checked')) {
      $(itemId).prop('checked', false).trigger('change');
    } else {
      $(itemId).prop('checked', true).trigger('change');
    }
  }

  document.addEventListener('keydown', (event) => {
    var name = event.key;
    if (name === 'Shift') return
    if (event.shiftKey) {
      name === "!" && keyTogglerFunc('#ToggleHighlightHover')
      name === "@" && keyTogglerFunc('#ToggleHighlightLinks')
      name === "#" && keyTogglerFunc('#ToggleTextMagnifier')
      name === "$" && keyTogglerFunc('#ToggleImageDescription')
      name === '%' && keyTogglerFunc('#TogglePhotoFilter')
      name === "^" && keyTogglerFunc('#ToggleReadingMask')
      name === '&' && keyTogglerFunc('#ToggleReadingGuide')
      name === '*' && keyTogglerFunc('#ToggleTTS_click')
      name === 'Q' && resetflourishModal()
      name === 'A' && displayModal()
    } else {
      return;
    }
  }, false);


  // website color presets section ---------------------------------->
  const colorSchemeArr = [
    {
      id: 'DarkContrastBackground',
      class_: 'highcontrast',
      location: 'body',
      maskColor: '#ffffff',
      colorPickerReset: true,
      activeItemText: 'Dark contrast preset',
      activeItemObj: 'isDarkContrast',
    },
    {
      id: 'DesaturateBackground',
      class_: 'desaturated',
      location: 'body',
      maskColor: '#363636',
      colorPickerReset: true,
      activeItemText: 'Desaturate preset',
      activeItemObj: 'isDesaturated',
    },
    {
      id: 'InvertBackground',
      class_: 'inverted',
      location: 'body',
      maskColor: '#ffffff',
      colorPickerReset: true,
      activeItemText: 'Inverted preset',
      activeItemObj: 'isInverted',
    },
    {
      id: 'HighSaturationBackground',
      class_: 'highsaturation',
      location: 'html',
      maskColor: '#363636',
      colorPickerReset: false,
      activeItemText: 'High saturation',
      activeItemObj: 'isHighSat',
    },
    {
      id: 'LowSaturationBackground',
      class_: 'lowsaturation',
      location: 'html',
      maskColor: '#363636',
      colorPickerReset: false,
      activeItemText: 'Low saturation',
      activeItemObj: 'isLowSat',
    },
  ]

  const makeColorPresetsFalse = (presetArr) => {
    for (let i = 0; i < presetArr.length; i++) {
      presetArr[i] = false
    }
  }


  const maskColorPresetChangeHandler = (color) => {
    if (!$.cookie('readingMaskColor')) {
      changeColorPicker(color, '.reading-mask', '#mask_hexVal', "#mask_color")
      let defaultOpacity = '.5'
      if (color === '#ffffff') {
        defaultOpacity = '.7'
      }
      $('#reading-mask-opacity').val(defaultOpacity);
      $(".reading-mask").css({ "opacity": defaultOpacity })
    }
    if (!$.cookie('readingGuideColor')) {
      changeColorPicker(color, '#tail', '#guide_hexVal', "#guide_color")
    }
  }

  const disableColorPicker = () => {
    $('#DarkContrastBG_option').removeClass('disable-colors')
    $('#DesaturateBG_option').removeClass('disable-colors')
    $('#InvertBG_option').removeClass('disable-colors')
    $('#ColorAdjust_option').addClass('disable-colors')
  }
  const enableColorPicker = () => {
    $('#ColorAdjust_option').removeClass('disable-colors')
  }

  const changeTextMagColors = () => {
    const textColor = $.cookie('text-magnify-color-swatch')
    const imgColor = $.cookie('img-magnify-color-swatch')
    console.log(textColor)
    console.log(imgColor)
    restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
    restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')

  }

  const colorPresetToDefault = () => {
    maskColorPresetChangeHandler('#363636')
    $('#ColorAdjust_option').removeClass('disable-colors')
    restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
    restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')
    for (let i = 0; i < colorSchemeArr.length; i++) {
      const { id, class_, location, activeItemObj } = colorSchemeArr[i]
      widgetItemObj[activeItemObj] = false
      $.removeCookie(id);
      removeWidgetControls([id])
      $(location).removeClass(class_);
      $("#DefaultBG_option").addClass('active').siblings().removeClass('active');
    }
  }

  const colorPresetHandler = (currItemId) => {
    const currItemTag = `#${currItemId}`
    $(currItemTag).parent().addClass('active').siblings().removeClass('active');
    if (currItemId === 'defaultBackground') {
      colorPresetToDefault()
    } else {
      for (let i = 0; i < colorSchemeArr.length; i++) {
        const { id, class_, location, activeItemText, activeItemObj, maskColor, colorPickerReset } = colorSchemeArr[i]
        if (id === currItemId) {
          if (colorPickerReset) {
            resetColorPicker()
            disableColorPicker()
          } else {
            enableColorPicker()
          }
          widgetItemObj[activeItemObj] = true
          $.cookie(id, 'yes', { expires: 30 });
          addWidgetControls(id, activeItemText)
          $(location).addClass(class_);
          maskColorPresetChangeHandler(maskColor)
          restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
          restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')
        } else {
          widgetItemObj[activeItemObj] = false
          $.removeCookie(id);
          removeWidgetControls([id])
          $(location).removeClass(class_);
        }
        checkIfWidgetActive()
      }
    }

  }

  for (let i = 0; i < colorSchemeArr.length; i++) {
    if ($.cookie(colorSchemeArr[i].id) == "yes") {
      colorPresetHandler(colorSchemeArr[i].id)
      setTimeout(() => {
        $("#DefaultBG_option").removeClass('active')
      }, 300)

    }
  }

  const colorPresetOptions = document.querySelectorAll('.backgroundOptions')
  colorPresetOptions.forEach(preset => {
    preset.addEventListener('click', () => {
      colorPresetHandler(preset.id)
    })
  })



  // reset modal ----------------------------->
  const resetflourishModal = () => {
    $('#ToggleHighlightHover').prop('checked', false).trigger('change')
    $('#ToggleHighlightLinks').prop('checked', false).trigger('change')
    $('#ToggleTextMagnifier').prop('checked', false).trigger('change')
    $('#ToggleImageDescription').prop('checked', false).trigger('change')
    $('#TogglePhotoFilter').prop('checked', false).trigger('change')
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
    resetColorPicker()
    restoreDefaultMaskSettings()
    restoreDefaultguideSettings()
    dismissGoogleTranslate()
    restoreDefaultMagnify('text', '.text-magnify-color-swatch', '.text-magnify-size-input', textMagObj, '.text-magnifier-preview')
    restoreDefaultMagnify('img', '.img-magnify-color-swatch', '.img-magnify-size-input', imgMagObj, '.img-magnifier-preview')
    removeAllCookies()
    setCurrLang('en')
    setTimeout(() => $(".audio_state").hide(), 500)
  }

  let resetIcon = document.getElementById('reset-flourish')
  resetIcon.addEventListener('click', () => {
    resetflourishModal()
  })


