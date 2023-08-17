






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


// //prevent page scroll past footer
// $(function () {
//   $('#ToggleReadingMask').change(function () {
//     if ($('#ToggleReadingMask').is(':checked')) {
//       window.scrollTo(0, 0);
//       preventPageScroll()
//       if ($('#ToggleTTS_click').is(':checked')) {
//         storeModalScrollPosition()
//         modalDisplayOpenOrClose()
//         forceReload()
//       }
//     } else {
//       return;
//     }
//   });
// });




const createMaskFunc = (scrollPosition) => {
  // window.scrollTo(0, 0);
  $("html, body").animate({ scrollTop: 0 });
  preventPageScroll()
  let timeout = 0
  if (scrollPosition) {
    setTimeout(() => {
      $("html, body").animate({ scrollTop: scrollPosition });
    }, 500);
    timeout = 1200
  }
  setTimeout(() => {
    $("body").addClass("ReadingMask_ON");
    $("#top_mask").fadeIn('slow')
    $("#bottom_mask").fadeIn('slow')
    addWidgetControls('ToggleReadingMask', 'Reading mask')
    widgetItemObj.isReadingMask = true
  }, timeout);
  console.log('create mask func ran')
}


// function to run when page resized
const resizeMaskFunc = () => {
  if (document.body.classList.contains('ReadingMask_ON')) {
    $("#top_mask").fadeOut()
    $("#bottom_mask").fadeOut()
    setTimeout(() => {
      const scrollPosition = document.documentElement.scrollTop
      createMaskFunc(scrollPosition)
    }, 500);
    // location.reload()
  }
}

// on page load


// setTimeout(() => {
//   if (document.body.classList.contains('ReadingMask_ON')) {
//     $("#top_mask").hide()
//     $("#bottom_mask").hide()
//     let cookiePos = sessionStorage.getItem("mainScrollPosition");

//     console.log('main scroll position is', cookiePos)

//     // createMaskFunc()

//   }
// }, 500);




// reload on page resize if reading mask is active
var resizeId;
window.addEventListener("resize", (event) => {
  clearTimeout(resizeId);
  resizeId = setTimeout(resizeMaskFunc, 500);
});

// Toggle Reading Mask
$(function () {
  $('[id="ToggleReadingMask"]').change(function () {
    if ($(this).is(':checked')) {
      const scrollPosition = document.documentElement.scrollTop
      $("#edit-reading-mask").css("display", "flex").hide().fadeIn()
      createMaskFunc(scrollPosition)

      if ($('#ToggleTTS_click').is(':checked')) {
        storeModalScrollPosition()
        storeMainScrollPosition()
        modalDisplayOpenOrClose()
        forceReload()
      }
    } else {
      $("body").removeClass("ReadingMask_ON");
      $("#top_mask").fadeOut()
      $("#bottom_mask").fadeOut()
      $("#edit-reading-mask").fadeOut()
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

document.querySelectorAll('.opacity-icons').forEach(icon => {
  icon.addEventListener('click', () => {
    selectChangeHandler(icon, 'opacity-icons', '#reading-mask-opacity option:selected')
    let newVal = $('#reading-mask-opacity').val();
    $(".reading-mask").css({ "opacity": newVal })
    $.cookie("readingMaskOpacity", newVal, { path: '/' })
    changeIndent(maskOpacityInput.value, '1', '#ReadingMask_option select', '5px')
  })
})

const maskOpacityInput = document.getElementById('reading-mask-opacity')
maskOpacityInput.addEventListener('change', () => {
  console.log(maskOpacityInput.value)
  $(".reading-mask").css({ "opacity": maskOpacityInput.value })
  $.cookie("readingMaskOpacity", maskOpacityInput.value, { path: '/' })

  changeIndent(maskOpacityInput.value, '1', '#ReadingMask_option select', '5px')
})

//////////// Reading Mask ///////////////////
$(document).bind('mousemove', function (e) {
  $('#tail').css({
    left: 0,
    top: e.pageY - 20
  });
});

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
  console.log('size changed: value is ', maskSizeInputRange.value)
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
  $("#mask_color").val(maskColorCookieVal);
  $('.reading-mask').css({ "background": maskColorCookieVal })
  document.querySelector('#mask_hexVal').innerText = maskColorCookieVal
}


// change mask color
const maskColorChangeInput = document.getElementById('mask_color')
maskColorChangeInput.addEventListener('change', () => {
  $('.reading-mask').css({ "background": maskColorChangeInput.value })
  document.querySelector('#mask_hexVal').innerText = maskColorChangeInput.value
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
  $('#reading-mask-opacity').val('.5');
  $(".reading-mask").css({ "opacity": '.5' })
  $("#mask_color").val('#363636');
  $('.reading-mask').css({ "background": '#363636' })
  document.querySelector('#mask_hexVal').innerText = '#363636'
  yVal = 1270
  $("#mask-size-input").val(1270);
  resetMaskSettingsCookies()
}

// const disableMaskSettings = () =>{
//   document.getElementById('reading-mask-opacity')
// }