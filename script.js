$(document).keydown(function (e) {
  if (e.shiftKey && e.which == 72) { // Shift + h
    window.location.replace("https://www.floridamemory.com/");
  }
  if (e.shiftKey && e.which == 82) { // Shift + r
    window.location.replace("https://www.floridamemory.com/discover/audio/radio/");
  }
});

// $(document).ready(function () {
//   //Letter Spacing
//   var selectedVal = $.cookie("LetterSpaceVal");
//   if (selectedVal) {
//     $("#letter_spacing").val(selectedVal);
//     $("#letter_spacing").prop("selected", true);
//     $("#view p").not('#ADA_widget, #ADA_widget *').css("letter-spacing", selectedVal); //Selects everything inside #view except ada modal and header
//     $(".Footer").css("letter-spacing", selectedVal);
//   }
//   $("#letter_spacing").on("change", function () {
//     var selection1 = $(this).val();
//     $(selection1).prop("selected", true);
//     $("#view p").not('#ADA_widget, #ADA_widget *').css("letter-spacing", selection1); //Selects everything inside #view except ada modal and header
//     $(".Footer").css("letter-spacing", selection1);
//     $.cookie("LetterSpaceVal", selection1, { path: '/' })
//   });

//   //Word Spacing
//   var selectedVal2 = $.cookie("WordSpaceVal");
//   if (selectedVal2) {
//     $("#word_spacing").val(selectedVal2);
//     $("#word_spacing").prop("selected", true);
//     $("#view p").not('#ADA_widget, #ADA_widget *').css("word-spacing", selectedVal2); //Selects everything inside #view except ada modal and header
//   }
//   $("#word_spacing").on("change", function () {
//     var selection2 = $(this).val();
//     $(selection2).prop("selected", true);
//     $("#view p").not('#ADA_widget, #ADA_widget *').css("#word_spacing", selection2); //Selects everything inside #view except ada modal and header
//     $(".Footer").css("#word_spacing", selection2);
//     $.cookie("WordSpaceVal", selection2, { path: '/' })
//   });

//   //Line Height
//   var selectedVal3 = $.cookie("LinpageHeightVal");
//   if (selectedVal3) {
//     $("#line_height").val(selectedVal3);
//     $("#line_height").prop("selected", true);
//     $("#view p").not('#ADA_widget, #ADA_widget *').css("line-height", selectedVal3); //Selects everything inside #view except ada modal and header
//     $(".Footer").css("line-height", selectedVal3);
//   }
//   $("#line_height").on("change", function () {
//     var selection3 = $(this).val();
//     $(selection3).prop("selected", true);
//     $("#view p").not('#ADA_widget, #ADA_widget *').css("line-height", selection3); //Selects everything inside #view except ada modal and header
//     $(".Footer").css("line-height", selection3);
//     $.cookie("LinpageHeightVal", selection3, { path: '/' })
//   });
// });



$(document).ready(function () {
  $("#ADA_widget #Cur_Default").addClass("active");
});

//FOR Cursor_Enlarge -- ADDS ACTIVE CLASS TO LI WHEN CLICKED
//https://stackoverflow.com/questions/3972944/jquery-removeclass-on-parent-sibling-child
$(function () {
  $('#ADA_widget .cursorSwap_form .form-check ul li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
});

// Cookie for CursorEnlarge
$(document).ready(function () {
  // Check (onLoad) if CursorEnlargeCookie is there and set the class to body if it is
  // Add active class to li
  if ($.cookie('CursorEnlargeCookie') == "yes") {
    $("#ADA_widget #Cur_Enlarge").addClass("active");
    $("body").addClass("Cursor_Enlarge");
    $("#ADA_widget #Cur_Default").removeClass("active");
  }

  // When input is clicked save cookie for 30days
  $("#ADA_widget a.Cursor_Enlarge_option").click(function () {
    if ($.cookie('CursorEnlargeCookie') == "undefined" || $.cookie('CursorEnlargeCookie') == "no") {
      $.cookie('CursorEnlargeCookie', 'yes', { path: '/' });
      $("body").addClass("Cursor_Enlarge");
    } else {
      $.cookie('CursorEnlargeCookie', 'yes', { path: '/' });
      $("body").addClass("Cursor_Enlarge");
    }
  });

  //When 'a.Cursor_Default' is clicked, removes 'CursorEnlarge' and erases CursorEnlargeCookie
  $("#ADA_widget a.Cursor_Default").click(function () {
    $('body').removeClass('Cursor_Enlarge');
    if ($.cookie('CursorEnlargeCookie') == "yes") {
      $.cookie("CursorEnlargeCookie", null, {
        path: '/'
      });
    }
  });
});



$(document).bind('mousemove', function (e) {
  $('#tail').css({
    left: 0,
    top: e.pageY - 20
  });
});

// JavaScript Document
$(document).ready(function () {
  $("#ADA_widget #DefaultBG_option").addClass("active");
}); // end of doc ready

//FOR BACKGROUND COLOR CHANGE -- ADDS ACTIVE CLASS TO LI WHEN CLICKED
//https://stackoverflow.com/questions/3972944/jquery-removeclass-on-parent-sibling-child
$(function () {
  $('#ADA_widget .bg_form .form-check ul li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
});

// Toggle Seizure
$(function () {
  $('[id="ToggleSeizure"]').change(function () {
    if ($(this).is(':checked')) {
      $(this).next(".switch-label").attr("data-state", "Toggled On");
      $("html").addClass("SeizureSafe");
    } else {
      $("html").removeClass("SeizureSafe");
    }
  });
});

// Toggle Reading Mask
$(function () {
  $('[id="ToggleReadingMask"]').change(function () {
    if ($(this).is(':checked')) {
      $("body").addClass("ReadingMask_ON");
      $("#top_mask").fadeIn()
      $("#bottom_mask").fadeIn()
    } else {
      $("body").removeClass("ReadingMask_ON");
      $("#top_mask").fadeOut()
      $("#bottom_mask").fadeOut()
    }
  });
});

// Toggle Reading Guide
$(function () {
  $('[id="ToggleReadingGuide"]').change(function () {
    if ($(this).is(':checked')) {
      $("#tail").hide()
      $("body").addClass("CursorGuide");
      $("#tail").fadeIn(500)
    } else {
      $("#tail").fadeOut(500)
      setTimeout(() => {
        $("body").removeClass("CursorGuide");
      }, 500);
    }
  });
});

// Toggle Highlight Hover
$(function () {
  $('[id="ToggleHighlightHover"]').change(function () {
    if ($(this).is(':checked')) {
      $("body").addClass("HighlightHover");
    } else {
      $("body").removeClass("HighlightHover");
    }
  });
});

// Toggle Highlight Links
$(function () {
  $('[id="ToggleHighlightLinks"]').change(function () {
    if ($(this).is(':checked')) {
      $("body").addClass("HighlightLinks");
    } else {
      $("body").removeClass("HighlightLinks");
    }
  });
});

// Toggle Image Description
$(function () {
  $('[id="ToggleImageDescription"]').change(function () {
    if ($(this).is(':checked')) {
      $("body").addClass("ImageDescription");
      $('img[alt], .feature .img[alt], i.fa[alt]').hover(
        function (e) {
          //do the mouseenter things here...
          var ImageDescription = $(this).attr("alt");
          $("#ImageDescription_magnify").text(ImageDescription);
          $('#ImageDescription_magnify').attr('style', 'display: block!important');
          $('#ImageDescription_magnify').attr('style', 'opacity: 1!important');
          //If #text_magnify is empty, hide
          if ($('#ImageDescription_magnify').is(':empty')) {
            $('#ImageDescription_magnify').attr('style', 'display: none!important');
            $('#ImageDescription_magnify').attr('style', 'opacity: 0!important');
          }
        },
        function (e) {
          //do the mouseleave things here...
          $('#ImageDescription_magnify').attr('style', 'display: none!important');
          $('#ImageDescription_magnify').attr('style', 'opacity: 0!important');
        }
      );
    } else {
      $("body").removeClass("ImageDescription");
      $('img[alt], .feature .img[alt], i.fa[alt]').hover(
        function (e) {
          //do the mouseleave things here...
          $('#ImageDescription_magnify').attr('style', 'display: none!important');
          $('#ImageDescription_magnify').attr('style', 'opacity: 0!important');
        });
    } //end of else
  }); //end of change
}); // end of function

// Toggle Text-to-Speech click
$(function () {
  $('[id="ToggleTTS_click"]').change(function () {
    if ($(this).is(':checked')) {
      $(".audio_state").hide()
      $("body").addClass("TTS_click_enabled");
      $(".audio_state").fadeIn(600)
      if ($('#ToggleReadingMask').is(':checked')) {
        storeModalScrollPosition()
        modalDisplayOpenOrClose()
        forceReload()
      }

    } else {
      $(".audio_state").fadeOut(500)
      setTimeout(() => {
        $("body").removeClass("TTS_click_enabled");
        $.cookie('TTS_click_enabled', 'false');
      }, 500);
    }
  });
});







$(document).ready(function () {
  $("#keydownTip").click(function () {
    $('#tooltip_template').toggleClass("toast_close");
  });
});

// Get the modal

var ADA_widget = document.getElementById("ADA_widget");

// Get the button that opens the ADA_widget
var OpenADA_widget = document.getElementById("ADA_trigger");

// Get the <span> element that closes the ADA_widget
var CloseADA_widget = document.getElementsByClassName("ADA_close")[0];

// When the user clicks the button, open the ADA_widget
OpenADA_widget.onclick = function () {
  displayModal()
}

// When the user clicks on <span> (x), close the ADA_widget
CloseADA_widget.onclick = function () {
  // ADA_widget.style.display = "none";
  displayModal()




  // $("body").css("overflow", "auto");
}

// When the user clicks anywhere outside of the ADA_widget, close it
window.onclick = function (event) {
  if (event.target == ADA_widget) {
    // ADA_widget.style.display = "none";
    displayModal()


    // $("body").css("overflow", "auto");
    // $(".modal-backdrop").css("display", "none");
    // $("#keyboard_shortcuts").css("display", "none");
  }
}

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

window.addEventListener("resize", (event) => {
  if (document.body.classList.contains('ReadingMask_ON')) {
    setTimeout(() => {
      location.reload()
    }, 500);
  } else {
    return;
  }
});

//prevent page scroll if checked
$(function () {
  $('#ToggleReadingMask').change(function () {
    if ($('#ToggleReadingMask').is(':checked')) {
      window.scrollTo(0, 0);
      preventPageScroll()
      if ($('#ToggleTTS_click').is(':checked')) {
        storeModalScrollPosition()
        modalDisplayOpenOrClose()
        forceReload()
      }
    } else {
      return;
    }
  });
});

//////////// Reading Mask ///////////////////
//More focus & fewer distractions
$(document).bind('mousemove', function (e) {

  // console.log(e.pageY)
  $('#top_mask').css({
    top: e.pageY - 1300
  });

  $('#bottom_mask').css({
    top: e.pageY + 20
  });
});


////////////image description magnify///////////////////
$(document).on('mousemove', function (e) {
  $('#ImageDescription_magnify').css({
    left: e.pageX,
    top: e.pageY
  });
});


const keyTogglerFunc = (itemId, itemClass) => {
  if ($(itemId).is(':checked')) {
    $(itemId).prop('checked', false).trigger('change');
  } else {
    $(itemId).prop('checked', true).trigger('change');
  }
}



// toggle reading mask on ctrl + m
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


setTimeout(() => {
  if (document.body.classList.contains('ReadingMask_ON')) {
    setTimeout(() => {
      window.scrollTo(0, 0);
      console.log('scrolled to top')
    }, 100);
    setTimeout(() => {
      preventPageScroll()
      console.log('prevented scroll on page load')
    }, 500);

  }
}, 100);

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

if (hasTouchScreen) {
  console.log('this is a touch screen')
} else {
  console.log('this is a desktop')
}