// JavaScript Document
$(document).ready(function () {
$("#DefaultBG_option").addClass("active");
});
//FOR BACKGROUND COLOR CHANGE -- ADDS ACTIVE CLASS TO LI WHEN CLICKED
//https://stackoverflow.com/questions/3972944/jquery-removeclass-on-parent-sibling-child
$(function() {
  $('.bg_form .form-check ul li').click( function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
});

$(document).ready(function () {
	// Cookie for Dark Contrast
    // Check (onLoad) if FM_DarkContrastCookie is there and set the class to body if it is
	// If FM_DarkContrastCookie is set remove FM_DesaturatedBackgroundCookie and related classes
	// Add active class to li
    if ($.cookie('FM_DarkContrastCookie') == "yes") {
		$("#DarkContrast_option").addClass("active");
        $("body").addClass("highcontrast");
		$('body').removeClass('desaturated');
		$('body').removeClass('inverted');
		$("#DefaultBG_option").removeClass("active");
		$.cookie('FM_DesaturatedBackgroundCookie') == "no";
		$.cookie('FM_DesaturatedBackgroundCookie') == "undefined";
		$.cookie("FM_DesaturatedBackgroundCookie", null, {
                path: '/'
            });
		$.cookie('FM_InvertBackgroundCookie') == "no";
		$.cookie('FM_InvertBackgroundCookie') == "undefined";
		$.cookie("FM_InvertBackgroundCookie", null, {
                path: '/'
            });
    }


    // When 'a.DarkContrastBackground' is clicked remove FM_DesaturatedBackgroundCookie and set FM_DarkContrastCookie
    $("a.DarkContrastBackground").click(function () {
			$.cookie("FM_DesaturatedBackgroundCookie", null, {
                path: '/'
            });		
			$.cookie("FM_InvertBackgroundCookie", null, {
                path: '/'
            });	
        if ($.cookie('FM_DarkContrastCookie') == "undefined" || $.cookie('FM_DarkContrastCookie') == "no") {
            $.cookie('FM_DarkContrastCookie', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("highcontrast");
			$('body').removeClass('desaturated');
			$('body').removeClass('inverted');

        } else {
            $.cookie('FM_DarkContrastCookie', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("highcontrast");
			$('body').removeClass('desaturated');
			$('body').removeClass('inverted');
        }
    });
	
	//When 'a.defaultBackground' is clicked, removes 'desaturated' and 'highcontrast' and erases FM_DesaturatedBackgroundCookie and FM_DarkContrastCookie
    $("a.defaultBackground").click(function () {
        $('body').removeClass('highcontrast');
		$('body').removeClass('desaturated');
		$('body').removeClass('inverted');
        if ($.cookie('FM_DarkContrastCookie') == "yes") {
            $.cookie("FM_DarkContrastCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('FM_DesaturatedBackgroundCookie') == "yes") {
            $.cookie("FM_DesaturatedBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('FM_InvertBackgroundCookie') == "yes") {
            $.cookie("FM_InvertBackgroundCookie", null, {
                path: '/'
            });
        }
    });
});


$(document).ready(function () {
	// Cookie for Desaturated
    // Check (onLoad) if FM_DesaturatedBackgroundCookie is there and set the class to body if it is
	// If FM_DesaturatedBackgroundCookie is set remove FM_DarkContrastCookie and related classes
	// Add active class to li	
    if ($.cookie('FM_DesaturatedBackgroundCookie') == "yes") {
		$("#DesaturateBackgroundoption").addClass("active");
        $("body").addClass("desaturated");
		$('body').removeClass('highcontrast');
		$('body').removeClass('inverted');
		$("#DefaultBG_option").removeClass("active");
		$.cookie('FM_DarkContrastCookie') == "no";
		$.cookie('FM_DarkContrastCookie') == "undefined";
		$.cookie("FM_DarkContrastCookie", null, {
                path: '/'
            });
		$.cookie('FM_InvertBackgroundCookie') == "no";
		$.cookie('FM_InvertBackgroundCookie') == "undefined";
		$.cookie("FM_InvertBackgroundCookie", null, {
                path: '/'
            });
    }

    // When 'a.DesaturateBackground' is clicked remove FM_DarkContrastCookie and set FM_DesaturatedBackgroundCookie
	// When input is clicked save cookie for 30days
    $("a.DesaturateBackground").click(function () {		
		$.cookie("FM_DarkContrastCookie", null, {
                path: '/'
            });
			$.cookie("FM_InvertBackgroundCookie", null, {
                path: '/'
            });	
						
        if ($.cookie('FM_DesaturatedBackgroundCookie') == "undefined" || $.cookie('FM_DesaturatedBackgroundCookie') == "no") {
            $.cookie('FM_DesaturatedBackgroundCookie', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("desaturated");
			$('body').removeClass('highcontrast');
			$('body').removeClass('inverted');

        } else {
            $.cookie('FM_DesaturatedBackgroundCookie', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("desaturated");
			$('body').removeClass('highcontrast');
			$('body').removeClass('inverted');
        }
    });
	
	//When 'a.defaultBackground' is clicked, removes 'desaturated' and 'highcontrast' and erases FM_DesaturatedBackgroundCookie and FM_DarkContrastCookie
    $("a.defaultBackground").click(function () {
        $('body').removeClass('desaturated');
		$('body').removeClass('highcontrast');
		$('body').removeClass('inverted');
        if ($.cookie('FM_DesaturatedBackgroundCookie') == "yes") {
            $.cookie("FM_DesaturatedBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('FM_DarkContrastCookie') == "yes") {
            $.cookie("FM_DarkContrastCookie", null, {
                path: '/'
            });
        }		
        if ($.cookie('FM_InvertBackgroundCookie') == "yes") {
            $.cookie("FM_InvertBackgroundCookie", null, {
                path: '/'
            });
        }
    });
});



$(document).ready(function () {
	// Cookie for Invert
    // Check (onLoad) if FM_DesaturatedBackgroundCookie is there and set the class to body if it is
	// If FM_DesaturatedBackgroundCookie is set remove FM_DarkContrastCookie and related classes
	// Add active class to li	
    if ($.cookie('FM_InvertBackgroundCookie') == "yes") {
		$("#InvertBackgroundoption").addClass("active");
        $("body").addClass("inverted");
		$('body').removeClass('highcontrast');
		$('body').removeClass('desaturated');
		$("#DefaultBG_option").removeClass("active");
		$.cookie('FM_DarkContrastCookie') == "no";
		$.cookie('FM_DarkContrastCookie') == "undefined";
		$.cookie("FM_DarkContrastCookie", null, {
                path: '/'
            });
		$.cookie('FM_DesaturatedBackgroundCookie') == "no";
		$.cookie('FM_DesaturatedBackgroundCookie') == "undefined";
		$.cookie("FM_DesaturatedBackgroundCookie", null, {
                path: '/'
            });
    }

    // When 'a.DesaturateBackground' is clicked remove FM_DarkContrastCookie and set FM_DesaturatedBackgroundCookie
	// When input is clicked save cookie for 30days
    $("a.InvertBackground").click(function () {		
		$.cookie("FM_DarkContrastCookie", null, {
                path: '/'
            });
		$.cookie("FM_DesaturatedBackgroundCookie", null, {
                path: '/'
            });			
        if ($.cookie('FM_InvertBackgroundCookie') == "undefined" || $.cookie('FM_InvertBackgroundCookie') == "no") {
            $.cookie('FM_InvertBackgroundCookie', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("inverted");
			$('body').removeClass('highcontrast');
			$('body').removeClass('desaturated');

        } else {
            $.cookie('FM_InvertBackgroundCookie', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("inverted");
			$('body').removeClass('highcontrast');
			$('body').removeClass('desaturated');
        }
    });
	
	//When 'a.defaultBackground' is clicked, removes 'desaturated' and 'highcontrast' and erases FM_DesaturatedBackgroundCookie and FM_DarkContrastCookie
    $("a.defaultBackground").click(function () {
        $('body').removeClass('inverted');
		$('body').removeClass('highcontrast');
		$('body').removeClass('desaturated');
        if ($.cookie('FM_InvertBackgroundCookie') == "yes") {
            $.cookie("FM_InvertBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('FM_DesaturatedBackgroundCookie') == "yes") {
            $.cookie("FM_DesaturatedBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('FM_DarkContrastCookie') == "yes") {
            $.cookie("FM_DarkContrastCookie", null, {
                path: '/'
            });
        }		
    });
});


$(document).ready(function () {
$("#FS_Default").addClass("active");
});
//FOR FONT SIZE CHANGE -- ADDS ACTIVE CLASS TO LI WHEN CLICKED
//https://stackoverflow.com/questions/3972944/jquery-removeclass-on-parent-sibling-child
$(function() {
  $('.fontsize_form .form-check ul li').click( function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
});

$(document).ready(function () {
	// Cookie for FontSizeMedium
    // Check (onLoad) if FM_FontSizeCookie is there and set the class to body if it is
	// Add active class to li
    if ($.cookie('FM_FontSizeCookie') == "yes") {
		$("#FS_Medium").addClass("active");
        $("body").addClass("fontSizeMedium");
		$("#FS_Default").removeClass("active");
    }


    // When 'a.FontSizeMedium' is clicked remove FM_DesaturatedBackgroundCookie and set FM_FontSizeCookie
	// When input is clicked save cookie for 30days
    $("a.FontSizeMedium").click(function () {	
        if ($.cookie('FM_FontSizeCookie') == "undefined" || $.cookie('FM_FontSizeCookie') == "no") {
            $.cookie('FM_FontSizeCookie', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("fontSizeMedium");

        } else {
            $.cookie('FM_FontSizeCookie', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("fontSizeMedium");
        }
    });
	
	//When 'a.FontSizeDefault' is clicked, removes 'fontSizeMedium' and erases FM_FontSizeCookie
    $("a.FontSizeDefault").click(function () {
        $('body').removeClass('fontSizeMedium');
        if ($.cookie('FM_FontSizeCookie') == "yes") {
            $.cookie("FM_FontSizeCookie", null, {
                path: '/'
            });
        }
    });
});


  /////COOKIE SETTING FOR FONT TYPE
$(document).ready(function () {
$("#FT_Default").addClass("active");
});
//FOR FONT TYPE CHANGE -- ADDS ACTIVE CLASS TO LI WHEN CLICKED
//https://stackoverflow.com/questions/3972944/jquery-removeclass-on-parent-sibling-child
$(function() {
  $('.font_type_form .form-check ul li').click( function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
});

$(document).ready(function () {
	// Cookie for FM_FontTypeCookie
    // Check (onLoad) if FM_FontTypeCookie is there and set the class to body if it is
	// Add active class to li
    if ($.cookie('FM_FontTypeCookie') == "yes") {
		$("#FT_Dyslexic").addClass("active");
        $("body").addClass("DyslexicFont");
		$("#FT_Default").removeClass("active");
    }

// When input is clicked save cookie for 30days
    $("a.FontTypeDyslexic").click(function () {	
        if ($.cookie('FM_FontTypeCookie') == "undefined" || $.cookie('FM_FontTypeCookie') == "no") {
            $.cookie('FM_FontTypeCookie', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("DyslexicFont");

        } else {
            $.cookie('FM_FontTypeCookie', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("DyslexicFont");
        }
    });
	
	//When 'a.FontTypeDefault' is clicked, removes 'DyslexicFont' and erases FM_FontTypeCookie
    $("a.FontTypeDefault").click(function () {
        $('body').removeClass('DyslexicFont');
        if ($.cookie('FM_FontTypeCookie') == "yes") {
            $.cookie("FM_FontTypeCookie", null, {
                path: '/'
            });
        }
    });
});




$(document).ready(function () {
$("#Cur_Default").addClass("active");
});
//FOR CursorSwap -- ADDS ACTIVE CLASS TO LI WHEN CLICKED
//https://stackoverflow.com/questions/3972944/jquery-removeclass-on-parent-sibling-child
$(function() {
  $('.cursorSwap_form .form-check ul li').click( function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
});



// Cookie for CursorSwap
$(document).ready(function () {
    // Check (onLoad) if FM_CursorSwapCookie is there and set the class to body if it is
	// Add active class to li
    if ($.cookie('FM_CursorSwapCookie') == "yes") {
		$("#Cur_Enlarge").addClass("active");
        $("body").addClass("CursorSwap");
		$("#Cur_Default").removeClass("active");
		$('body').removeClass('CursorGuide');
		$.cookie('FM_CursorReadingGuideCookie') == "no";
		$.cookie('FM_CursorReadingGuideCookie') == "undefined";
		$.cookie("FM_CursorReadingGuideCookie", null, {
                path: '/'
            });
    }


	// When input is clicked save cookie for 30days
    $("a.CursorEnlarge").click(function () {	
			$.cookie("FM_CursorReadingGuideCookie", null, {
                path: '/'
            });	
        if ($.cookie('FM_CursorSwapCookie') == "undefined" || $.cookie('FM_CursorSwapCookie') == "no") {
            $.cookie('FM_CursorSwapCookie', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("CursorSwap");
			$('body').removeClass('CursorGuide');

        } else {
            $.cookie('FM_CursorSwapCookie', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("CursorSwap");
			$('body').removeClass('CursorGuide');
        }
    });
	
	//When 'a.CursorDefault' is clicked, removes 'CursorSwap' and erases FM_CursorSwapCookie
    $("a.CursorDefault").click(function () {
        $('body').removeClass('CursorSwap');
		$('body').removeClass('CursorGuide');
        if ($.cookie('FM_CursorSwapCookie') == "yes") {
            $.cookie("FM_CursorSwapCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('FM_CursorReadingGuideCookie') == "yes") {
            $.cookie("FM_CursorReadingGuideCookie", null, {
                path: '/'
            });
        }
    });
});


// Cookie for Reading Guide and CursorSwap
// Div with the id of 'tail' can be found in header, line 844
$(document).ready(function () {
    // Check (onLoad) if FM_CursorReadingGuideCookie is there and set the class to body if it is
	// Add active class to li
    if ($.cookie('FM_CursorReadingGuideCookie') == "yes") {
		$("#Cur_ReadingGuide").addClass("active");
        $("body").addClass("CursorGuide");
		$("#Cur_Default").removeClass("active");
		$('body').removeClass('CursorSwap');
		$.cookie('FM_CursorSwapCookie') == "no";
		$.cookie('FM_CursorSwapCookie') == "undefined";
		$.cookie("FM_CursorSwapCookie", null, {
                path: '/'
            });
    }


	// When input is clicked save cookie for 30days
    $("a.CursorReadingGuide").click(function () {	
			$.cookie("FM_CursorSwapCookie", null, {
                path: '/'
            });	
        if ($.cookie('FM_CursorReadingGuideCookie') == "undefined" || $.cookie('FM_CursorReadingGuideCookie') == "no") {
            $.cookie('FM_CursorReadingGuideCookie', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("CursorGuide");
			$('body').removeClass('CursorSwap');

        } else {
            $.cookie('FM_CursorReadingGuideCookie', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("CursorGuide");
			$('body').removeClass('CursorSwap');
        }
    });
	
	//When 'a.CursorDefault' is clicked, removes 'CursorSwap' and erases FM_CursorSwapCookie
    $("a.CursorDefault").click(function () {
        $('body').removeClass('CursorGuide');
		$('body').removeClass('CursorSwap');
        if ($.cookie('FM_CursorReadingGuideCookie') == "yes") {
            $.cookie("FM_CursorReadingGuideCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('FM_CursorSwapCookie') == "yes") {
            $.cookie("FM_CursorSwapCookie", null, {
                path: '/'
            });
        }
    });
});
$(document).bind('mousemove', function(e){
    $('#tail').css({
       left:  0,
       top:   e.pageY - 20
    });
});



// Cookie for Highlighting Links
$(document).ready(function () {
$("#Link_HighlightOFF").addClass("active");
});
//FOR Highlighting Links -- ADDS ACTIVE CLASS TO LI WHEN CLICKED
//https://stackoverflow.com/questions/3972944/jquery-removeclass-on-parent-sibling-child
$(function() {
  $('.HighlightLinks_form .form-check ul li').click( function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
});

$(document).ready(function () {
    // Check (onLoad) if FM_LinkHighlight is there and set the class to body if it is
	// Add active class to li
    if ($.cookie('FM_LinkHighlight') == "yes") {
		$("#Link_HighlightON").addClass("active");
        $("body").addClass("HighlightLinks");
		$("#Link_HighlightOFF").removeClass("active");
    }


	// When input is clicked save cookie for 30days
    $("a.HighlightON").click(function () {	
        if ($.cookie('FM_LinkHighlight') == "undefined" || $.cookie('FM_LinkHighlight') == "no") {
            $.cookie('FM_LinkHighlight', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("HighlightLinks");

        } else {
            $.cookie('FM_LinkHighlight', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("HighlightLinks");
        }
    });
	
	//When 'a.HighlightOFF' is clicked, removes 'HighlightLinks' and erases FM_LinkHighlight
    $("a.HighlightOFF").click(function () {
        $('body').removeClass('HighlightLinks');
        if ($.cookie('FM_LinkHighlight') == "yes") {
            $.cookie("FM_LinkHighlight", null, {
                path: '/'
            });
        }
    });
});