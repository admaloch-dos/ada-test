






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

const createMaskFunc = () => {
  widgetItemObj.isReadingMask = true
  // window.scrollTo(0, 0);

  $("body").addClass("ReadingMask_ON");
  $("#top_mask").fadeIn('slow')
  $("#bottom_mask").fadeIn('slow')
  addWidgetControls('ToggleReadingMask', 'Reading mask')
  storeModalScrollPosition()
  modalDisplayOpenOrClose()
  if ($.cookie("reading-mask-reload") === 'true') {
    $.cookie("reading-mask-reload", false, { path: '/' });

    forceReload()
  }


}




// function to run when page resized
const resizeMaskFunc = () => {
  if (document.body.classList.contains('ReadingMask_ON')) {
    // $("#top_mask").fadeOut()
    // $("#bottom_mask").fadeOut()
    setTimeout(() => {
      storeModalScrollPosition()
      modalDisplayOpenOrClose()
      forceReload()
      // createMaskFunc()
    }, 500);
    // location.reload()
  }
}

// on page load


setTimeout(() => {
  if (document.body.classList.contains('ReadingMask_ON')) {
    preventPageScroll()
    $.cookie("reading-mask-reload", false, { path: '/' });
  }
}, 300);




// reload on page resize if reading mask is active
var resizeId;
window.addEventListener("resize", (event) => {
  $.cookie("reading-mask-reload", true, { path: '/' });
  clearTimeout(resizeId);
  resizeId = setTimeout(resizeMaskFunc, 500);
});

if ($.cookie("edit-reading-mask") === 'true') {
  $("#edit-reading-mask").css("display", "flex").hide().fadeIn()
}



let reloadCookie = $.cookie("reading-mask-reload")
if (!reloadCookie) {
  $.cookie("reading-mask-reload", true, { path: '/' });
}

// Toggle Reading Mask
$(function () {
  $('[id="ToggleReadingMask"]').change(function () {
    if ($(this).is(':checked')) {

      const scrollPosition = document.documentElement.scrollTop
      $("#edit-reading-mask").css("display", "flex").hide().fadeIn()
      $.cookie("edit-reading-mask", true, { path: '/' });

      createMaskFunc()

    } else {
      $("body").removeClass("ReadingMask_ON");
      $("body").removeClass("ReadingMask ");
      $("#top_mask").fadeOut()
      $("#bottom_mask").fadeOut()
      $("#edit-reading-mask").fadeOut()
      $.cookie("edit-reading-mask", false, { path: '/' });
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
    $.cookie(name, $(this).prop('checked'), { path: '/', })
  });
});


//mask settings
// change opacity
// use arrows

var opacityCookie = $.cookie("readingMaskOpacity");
if (opacityCookie) {
  $("#reading-mask-opacity").val(opacityCookie);
  $(".reading-mask").css({ "opacity": opacityCookie })
}

let indentAmount = '3px'



window.addEventListener('resize', function (event) {
  if (window.innerWidth > 1200) {
    indentAmount = '6px'
  } else {
    indentAmount = '3px'
  }


}, true);





document.querySelectorAll('.opacity-icons').forEach(icon => {
  icon.addEventListener('click', () => {
    selectChangeHandler(icon, 'opacity-icons', '#reading-mask-opacity option:selected')
    let newVal = $('#reading-mask-opacity').val();
    $(".reading-mask").css({ "opacity": newVal })
    $.cookie("readingMaskOpacity", newVal, { path: '/' })
    changeIndent(maskOpacityInput.value, '1', '#ReadingMask_option select', indentAmount)
  })
})

const maskOpacityInput = document.getElementById('reading-mask-opacity')
maskOpacityInput.addEventListener('change', () => {

  $(".reading-mask").css({ "opacity": maskOpacityInput.value })
  $.cookie("readingMaskOpacity", maskOpacityInput.value, { path: '/' })

  changeIndent(maskOpacityInput.value, '1', '#ReadingMask_option select', indentAmount)
})



// change mask size
let yVal = 1280

var maskSizeCookieVal = $.cookie("readingMaskHeight");
if (maskSizeCookieVal) {
  $("#mask-size-input").val(maskSizeCookieVal);
  yVal = maskSizeCookieVal
}


const maskSizeInputRange = document.getElementById('mask-size-input')
maskSizeInputRange.addEventListener('change', () => {
  let newSizeVal = maskSizeInputRange.value
  yVal = newSizeVal
  $.cookie("readingMaskHeight", newSizeVal, { path: '/' })

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
  $.cookie("readingMaskColor", maskColorChangeInput.value, { path: '/' })
})

//reset cookies
const resetMaskSettingsCookies = () => {
  $.removeCookie('readingMaskOpacity');
  $.removeCookie('readingMaskHeight');
  $.removeCookie('readingMaskColor');
}

// restore default
const restoreDefaultMaskSettings = () => {

  if (widgetItemObj.isDarkContrast || widgetItemObj.isInverted) {
    changeColorPicker('#FFFFFF', '.reading-mask', '#mask_hexVal', "#mask_color")
    $('#reading-mask-opacity').val('.7');
    $(".reading-mask").css({ "opacity": '.7' })
  } else {
    changeColorPicker('#363636', '.reading-mask', '#mask_hexVal', "#mask_color")
    $('#reading-mask-opacity').val('.5');
    $(".reading-mask").css({ "opacity": '.5' })
  }

  yVal = 1270
  $("#mask-size-input").val(1270);
  resetMaskSettingsCookies()
}

