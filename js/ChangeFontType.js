/////COOKIE SETTING FOR FONT TYPE
$(document).ready(function () {
  $("#ADA_widget #FT_Default").addClass("active");
});
//FOR FONT TYPE CHANGE -- ADDS ACTIVE CLASS TO LI WHEN CLICKED
//https://stackoverflow.com/questions/3972944/jquery-removeclass-on-parent-sibling-child
// $(function () {
//   $('#ADA_widget .font_type_form .form-check ul li').click(function () {
//     $(this).addClass('active').siblings().removeClass('active');
//   });
// });




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
      path: '/'
    });

  }

  // When input is clicked save cookie for 30days
  $("#ADA_widget a.FontTypeDyslexic").click(function () {
    $.cookie("BaskervilleFontCookie", null, {
      path: '/'
    });
    if ($.cookie('DyslexicFontCookie') == "undefined" || $.cookie('DyslexicFontCookie') == "no") {
      $.cookie('DyslexicFontCookie', 'yes', { path: '/' });
      $("body").addClass("DyslexicFont");
      $('body').removeClass('BaskervilleFont');

    } else {
      $.cookie('DyslexicFontCookie', 'yes', { path: '/' });
      $("body").addClass("DyslexicFont");
      $('body').removeClass('BaskervilleFont');
      addWidgetControls('FontTypeDyslexic', 'Open-dyslexic font')
      removeWidgetControls(['FontTypeBaskerville'])
    }

    widgetItemObj.isFontChanged = true
    checkIfWidgetActive()

  });

  //When 'a.FontTypeDefault' is clicked, removes 'DyslexicFont' and erases FontTypeCookie
  $("#ADA_widget a.FontTypeDefault").click(function () {
    $('body').removeClass('DyslexicFont');
    $('body').removeClass('BaskervilleFont');
    if ($.cookie('DyslexicFontCookie') == "yes") {
      $.cookie("DyslexicFontCookie", null, { path: '/' });
    }
    if ($.cookie('BaskervilleFontCookie') == "yes") {
      $.cookie("BaskervilleFontCookie", null, { path: '/' });
    }
    widgetItemObj.isFontChanged = false
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
    $.cookie("DyslexicFontCookie", null, { path: '/' });

  }

  // When input is clicked save cookie for 30days
  $("#ADA_widget a.FontTypeBaskerville").click(function () {
    $.cookie("DyslexicFontCookie", null, {
      path: '/'
    });
    if ($.cookie('BaskervilleFontCookie') == "undefined" || $.cookie('BaskervilleFontCookie') == "no") {
      $.cookie('BaskervilleFontCookie', 'yes', { path: '/' });
      $("body").addClass("BaskervilleFont");
      $('body').removeClass('DyslexicFont');

    } else {
      $.cookie('BaskervilleFontCookie', 'yes', { path: '/' });
      $("body").addClass("BaskervilleFont");
      $('body').removeClass('DyslexicFont');
      addWidgetControls('FontTypeBaskerville', 'Libre-baskerville font')
      removeWidgetControls(['FontTypeDyslexic'])
    }
    $.cookie('FM_FontTypeCookie', 'yes', { path: '/' });

    widgetItemObj.isFontChanged = true
    checkIfWidgetActive()


  });



  //When 'a.FontTypeDefault' is clicked, removes 'DyslexicFont' and erases FontTypeCookie
  $("#ADA_widget a.FontTypeDefault").click(function () {
    // $('body').removeClass('DyslexicFont');
    // $('body').removeClass('BaskervilleFont');
    // if ($.cookie('BaskervilleFontCookie') == "yes") {
    //   $.cookie("BaskervilleFontCookie", null, { path: '/' });

    // }
    // if ($.cookie('DyslexicFontCookie') == "yes") {
    //   $.cookie("DyslexicFontCookie", null, { path: '/' });
    // }
    // removeWidgetControls(['FontTypeDyslexic', 'FontTypeBaskerville'])
    // checkIfWidgetActive()
    restoreDefaultOnClick('DyslexicFont', 'DyslexicFontCookie', widgetItemObj.dyslexicFont, ['FontTypeDyslexic', 'FontTypeBaskerville'], '#ADA_widget #FT_Default')
    restoreDefaultOnClick('BaskervilleFont', 'BaskervilleFontCookie', widgetItemObj.isBaskervilleFont, ['FontTypeDyslexic', 'FontTypeBaskerville'], '#ADA_widget #FT_Default')
    widgetItemObj.isDyslexicFont = false
    widgetItemObj.isBaskervilleFont = false
  });
});

