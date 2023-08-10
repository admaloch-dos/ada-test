

// Toggle Reading Mask
$(function () {
  $('[id="ToggleReadingMask"]').change(function () {
    if ($(this).is(':checked')) {
      $("body").addClass("ReadingMask_ON");
      $("#top_mask").fadeIn()
      $("#bottom_mask").fadeIn()
      addWidgetControls('ToggleReadingMask', 'Reading mask')
      widgetItemObj.isReadingMask = true
    } else {
      $("body").removeClass("ReadingMask_ON");
      $("#top_mask").fadeOut()
      $("#bottom_mask").fadeOut()
      removeWidgetControls(['ToggleReadingMask'])
      widgetItemObj.isReadingMask = false
    }

    checkIfWidgetActive()
  });
});


//////////// Reading Mask ///////////////////
$(document).bind('mousemove', function (e) {
  $('#tail').css({
    left: 0,
    top: e.pageY - 20
  });
});

$(document).bind('mousemove', function (e) {
  // console.log(e.pageY)
  $('#top_mask').css({
    top: e.pageY - 1300
  });
  $('#bottom_mask').css({
    top: e.pageY + 20
  });
});


//fix bugs caused by reading mask
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

//prevent page scroll past footer
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

// reload on page resize if reading mask is active
window.addEventListener("resize", (event) => {
  if (document.body.classList.contains('ReadingMask_ON')) {
    setTimeout(() => {
      location.reload()
    }, 500);
  } else {
    return;
  }
});

setTimeout(() => {
  if (document.body.classList.contains('ReadingMask_ON')) {
    setTimeout(() => {
      window.scrollTo(0, 0);

    }, 100);
    setTimeout(() => {
      preventPageScroll()

    }, 500);

  }
}, 100);

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

