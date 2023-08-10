let textMagY = 120;
document.addEventListener('scroll', () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  const adaModal = document.querySelector('#ADA_widget')
  if (adaModal.style.display !== 'flex') {
    if (window.scrollY >= scrollableHeight - 1) { // at bottom of page
      textMagY = 180
    } else if (window.scrollY === 0) { // at top of page
      textMagY = 20
    } else {
      textMagY = 120
    }
  }
})

//////////// Text Magnify ///////////////////
$(document).on('mousemove', function (e) {
  const textMagnify = document.querySelector('#text_magnify')
  $('#text_magnify').css({
    left: e.pageX + 10,
    top: e.pageY - textMagY
  });
});

const hoverTextFunc = () => {
  //If ToggleTextMagnifier is checked
  if ($('[id="ToggleTextMagnifier"]').is(':checked')) {
    var timeout = null;
    clearTimeout(timeout)

    $("body").addClass("TextMagnifier");
    $('[id="ToggleZoom"]').prop('checked', false);
    // $('#text_magnify').attr('style', 'display: block!important');
    $('p, a, :header, span, button, td').not('#ada-triggers, #ada-triggers ul, #ada-triggers ul li, #ada-triggers *').hover(
      function (e) {
        var TextMagnify = $(this).text();
        $("#text_magnify").text(TextMagnify);
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
        console.log("mouse off")
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
    $("body").removeClass("TextMagnifier");
    $('#text_magnify').attr('style', 'display: none!important');
    clearTimeout(timeout)
    removeWidgetControls(['ToggleTextMagnifier'])
      widgetItemObj.isTextMag = false
  }
  checkIfWidgetActive()
}

$(document).ready(function () {
  $("input.switch-input[type=checkbox]").each(function () {
    var name = $(this).attr('name');
    if ($.cookie(name) && $.cookie(name) == "true") {
      $(this).prop('checked', $.cookie(name));
      $("body").addClass(name);
      hoverTextFunc()
    }
  });
  $("input.switch-input[type=checkbox]").change(function () {
    var name = $(this).attr("name");
    $.cookie(name, $(this).prop('checked'), { path: '/', })
  });
});

// Toggle Text Magnifier
$(function () {
  $('[id="ToggleTextMagnifier"]').change(function () {
   hoverTextFunc()
  }); //end of change
}); // end of function



