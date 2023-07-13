


//   cache.textColor.value = "#212529";
//   cache.linkColor.value = "#3863FF";)



const resetBackgroundClicker = () => {
    let bgColor = cache.bgColor.value
    let textColor = cache.textColor.value
    let linkColor = cache.linkColor.value
    if (bgColor !== "#ffffff" || textColor !== "#212529" || linkColor !== "#3863ff") {
        $.removeCookie('BackgroundColorCookie');
        $.removeCookie('TextColorCookie');
        $.removeCookie('LinkColorCookie');
        //alert("Cookie Removed!");


        sessionStorage.setItem("reloading", "true");
        $("body").fadeOut()
        setTimeout(() => {
            document.location.reload();
        }, 200);
    }
}


$(document).ready(function () {
    // Cookie for Dark Contrast
    // Check (onLoad) if DarkContrastBackgroundCookie is there and set the class to body if it is
    // If DarkContrastBackgroundCookie is set remove other background cookies and their related classes
    // Add active class to li
    if ($.cookie('DarkContrastBackgroundCookie') == "yes") {

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
            path: '/'
        });
        $.cookie('InvertBackgroundCookie') == "no";
        $.cookie('InvertBackgroundCookie') == "undefined";
        $.cookie("InvertBackgroundCookie", null, {
            path: '/'
        });
        $.cookie('HighSaturationBackgroundCookie') == "no";
        $.cookie('HighSaturationBackgroundCookie') == "undefined";
        $.cookie("HighSaturationBackgroundCookie", null, {
            path: '/'
        });
        $.cookie('LowSaturationBackgroundCookie') == "no";
        $.cookie('LowSaturationBackgroundCookie') == "undefined";
        $.cookie("LowSaturationBackgroundCookie", null, {
            path: '/'
        });
    }


    // When 'a.DarkContrastBackground' is clicked remove other background cookies
    $("#ADA_widget a.DarkContrastBackground").click(function () {


        resetBackgroundClicker()
        $.cookie("DesaturatedBackgroundCookie", null, {
            path: '/'
        });
        $.cookie("InvertBackgroundCookie", null, {
            path: '/'
        });
        $.cookie("HighSaturationBackgroundCookie", null, {
            path: '/'
        });
        $.cookie("LowSaturationBackgroundCookie", null, {
            path: '/'
        });
        if ($.cookie('DarkContrastBackgroundCookie') == "undefined" || $.cookie('DarkContrastBackgroundCookie') == "no") {
            $.cookie('DarkContrastBackgroundCookie', 'yes', { path: '/' });
            $("body").addClass("highcontrast");
            $('body').removeClass('desaturated');
            $('body').removeClass('inverted');
            $("html").removeClass("highsaturation");
            $("html").removeClass("lowsaturation");

        } else {
            $.cookie('DarkContrastBackgroundCookie', 'yes', { path: '/' });
            $("body").addClass("highcontrast");
            $('body').removeClass('desaturated');
            $('body').removeClass('inverted');
            $("html").removeClass("highsaturation");
            $("html").removeClass("lowsaturation");
        }
    });

    //When 'a.defaultBackground' is clicked, removes other background cookies and their related classes
    $("#ADA_widget a.defaultBackground").click(function () {
        $('body').removeClass('highcontrast');
        $('body').removeClass('desaturated');
        $('body').removeClass('inverted');
        $("html").removeClass("highsaturation");
        $("html").removeClass("lowsaturation");
        if ($.cookie('DarkContrastBackgroundCookie') == "yes") {
            $.cookie("DarkContrastBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('DesaturatedBackgroundCookie') == "yes") {
            $.cookie("DesaturatedBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('InvertBackgroundCookie') == "yes") {
            $.cookie("InvertBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('HighSaturationBackgroundCookie') == "yes") {
            $.cookie("HighSaturationBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('LowSaturationBackgroundCookie') == "yes") {
            $.cookie("LowSaturationBackgroundCookie", null, {
                path: '/'
            });
        }
    });
}); // end of doc ready





$(document).ready(function () {
    // Cookie for Desaturated
    // Check (onLoad) if DesaturatedBackgroundCookie is there and set the class to body if it is
    // If DesaturatedBackgroundCookie is set remove other background cookies and their related classes
    // Add active class to li
    if ($.cookie('DesaturatedBackgroundCookie') == "yes") {
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
            path: '/'
        });
        $.cookie('InvertBackgroundCookie') == "no";
        $.cookie('InvertBackgroundCookie') == "undefined";
        $.cookie("InvertBackgroundCookie", null, {
            path: '/'
        });
        $.cookie('HighSaturationBackgroundCookie') == "no";
        $.cookie('HighSaturationBackgroundCookie') == "undefined";
        $.cookie("HighSaturationBackgroundCookie", null, {
            path: '/'
        });
        $.cookie('LowSaturationBackgroundCookie') == "no";
        $.cookie('LowSaturationBackgroundCookie') == "undefined";
        $.cookie("LowSaturationBackgroundCookie", null, {
            path: '/'
        });
    }

    // When 'a.DesaturateBackground' is clicked remove other background cookies
    // When input is clicked save cookie for 30days
    $("#ADA_widget a.DesaturateBackground").click(function () {
        resetBackgroundClicker()
        $.cookie("DarkContrastBackgroundCookie", null, {
            path: '/'
        });
        $.cookie("InvertBackgroundCookie", null, {
            path: '/'
        });
        $.cookie("HighSaturationBackgroundCookie", null, {
            path: '/'
        });
        $.cookie("LowSaturationBackgroundCookie", null, {
            path: '/'
        });
        if ($.cookie('DesaturatedBackgroundCookie') == "undefined" || $.cookie('DesaturatedBackgroundCookie') == "no") {
            $.cookie('DesaturatedBackgroundCookie', 'yes', { path: '/' });
            $("body").addClass("desaturated");
            $('body').removeClass('highcontrast');
            $('body').removeClass('inverted');
            $("html").removeClass("highsaturation");
            $("html").removeClass("lowsaturation");

        } else {
            $.cookie('DesaturatedBackgroundCookie', 'yes', { path: '/' });
            $("body").addClass("desaturated");
            $('body').removeClass('highcontrast');
            $('body').removeClass('inverted');
            $("html").removeClass("highsaturation");
            $("html").removeClass("lowsaturation");
        }
    });

    //When 'a.defaultBackground' is clicked, removes other background cookies and their related classes
    $("#ADA_widget a.defaultBackground").click(function () {
        $('body').removeClass('desaturated');
        $('body').removeClass('highcontrast');
        $('body').removeClass('inverted');
        $("html").removeClass("highsaturation");
        $("html").removeClass("lowsaturation");
        if ($.cookie('DesaturatedBackgroundCookie') == "yes") {
            $.cookie("DesaturatedBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('DarkContrastBackgroundCookie') == "yes") {
            $.cookie("DarkContrastBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('InvertBackgroundCookie') == "yes") {
            $.cookie("InvertBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('HighSaturationBackgroundCookie') == "yes") {
            $.cookie("HighSaturationBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('LowSaturationBackgroundCookie') == "yes") {
            $.cookie("LowSaturationBackgroundCookie", null, {
                path: '/'
            });
        }
    });
});




$(document).ready(function () {
    // Cookie for HighSaturation
    // Check (onLoad) if HighSaturationBackgroundCookie is there and set the class to body if it is
    // If DesaturatedBackgroundCookie is set remove other background cookies and their related classes
    // Add active class to li
    if ($.cookie('HighSaturationBackgroundCookie') == "yes") {
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
            path: '/'
        });
        $.cookie('InvertBackgroundCookie') == "no";
        $.cookie('InvertBackgroundCookie') == "undefined";
        $.cookie("InvertBackgroundCookie", null, {
            path: '/'
        });
        $.cookie('DesaturatedBackgroundCookie') == "no";
        $.cookie('DesaturatedBackgroundCookie') == "undefined";
        $.cookie("DesaturatedBackgroundCookie", null, {
            path: '/'
        });
    }

    // When 'a.HighSaturationBackground' is clicked remove other background cookies and their related classes
    // When input is clicked save cookie for 30days
    $("#ADA_widget a.HighSaturationBackground").click(function () {
        $.cookie("DesaturatedBackgroundCookie", null, {
            path: '/'
        });
        $.cookie("InvertBackgroundCookie", null, {
            path: '/'
        });
        $.cookie("DarkContrastBackgroundCookie", null, {
            path: '/'
        });
        $.cookie("LowSaturationBackgroundCookie", null, {
            path: '/'
        });

        if ($.cookie('HighSaturationBackgroundCookie') == "undefined" || $.cookie('HighSaturationBackgroundCookie') == "no") {
            $.cookie('HighSaturationBackgroundCookie', 'yes', { path: '/' });
            $("html").addClass("highsaturation");
            $("body").removeClass("desaturated");
            $('body').removeClass('highcontrast');
            $('body').removeClass('inverted');
            $("html").removeClass("lowsaturation");

        } else {
            $.cookie('HighSaturationBackgroundCookie', 'yes', { path: '/' });
            $("html").addClass("highsaturation");
            $("body").removeClass("desaturated");
            $('body').removeClass('highcontrast');
            $('body').removeClass('inverted');
            $("html").removeClass("lowsaturation");
        }
    });

    //When 'a.defaultBackground' is clicked, removes other background cookies and their related classes
    $("#ADA_widget a.defaultBackground").click(function () {
        $("html").removeClass("highsaturation");
        $('body').removeClass('desaturated');
        $('body').removeClass('highcontrast');
        $('body').removeClass('inverted');
        $("html").removeClass("lowsaturation");
        if ($.cookie('HighSaturationBackgroundCookie') == "yes") {
            $.cookie("HighSaturationBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('DarkContrastBackgroundCookie') == "yes") {
            $.cookie("DarkContrastBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('InvertBackgroundCookie') == "yes") {
            $.cookie("InvertBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('DesaturatedBackgroundCookie') == "yes") {
            $.cookie("DesaturatedBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('LowSaturationBackgroundCookie') == "yes") {
            $.cookie("LowSaturationBackgroundCookie", null, {
                path: '/'
            });
        }
    });
});




$(document).ready(function () {
    // Cookie for LowSaturation
    // Check (onLoad) if LowSaturationBackgroundCookie is there and set the class to body if it is
    // If DesaturatedBackgroundCookie is set remove other background cookies and their related classes
    // Add active class to li
    if ($.cookie('LowSaturationBackgroundCookie') == "yes") {
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
            path: '/'
        });
        $.cookie('InvertBackgroundCookie') == "no";
        $.cookie('InvertBackgroundCookie') == "undefined";
        $.cookie("InvertBackgroundCookie", null, {
            path: '/'
        });
        $.cookie('DesaturatedBackgroundCookie') == "no";
        $.cookie('DesaturatedBackgroundCookie') == "undefined";
        $.cookie("DesaturatedBackgroundCookie", null, {
            path: '/'
        });
        $.cookie('HighSaturationBackgroundCookie') == "no";
        $.cookie('HighSaturationBackgroundCookie') == "undefined";
        $.cookie("HighSaturationBackgroundCookie", null, {
            path: '/'
        });
    }

    // When 'a.HighSaturationBackground' is clicked remove other background cookies and their related classes
    // When input is clicked save cookie for 30days
    $("#ADA_widget a.LowSaturationBackground").click(function () {
        $.cookie("DesaturatedBackgroundCookie", null, {
            path: '/'
        });
        $.cookie("InvertBackgroundCookie", null, {
            path: '/'
        });
        $.cookie("DarkContrastBackgroundCookie", null, {
            path: '/'
        });
        $.cookie("HighSaturationBackgroundCookie", null, {
            path: '/'
        });

        if ($.cookie('LowSaturationBackgroundCookie') == "undefined" || $.cookie('LowSaturationBackgroundCookie') == "no") {
            $.cookie('LowSaturationBackgroundCookie', 'yes', { path: '/' });
            $("html").addClass("lowsaturation");
            $("html").removeClass("highsaturation");
            $("body").removeClass("desaturated");
            $('body').removeClass('highcontrast');
            $('body').removeClass('inverted');

        } else {
            $.cookie('LowSaturationBackgroundCookie', 'yes', { path: '/' });
            $("html").addClass("lowsaturation");
            $("html").removeClass("highsaturation");
            $("body").removeClass("desaturated");
            $('body').removeClass('highcontrast');
            $('body').removeClass('inverted');
        }
    });

    //When 'a.defaultBackground' is clicked, removes other background cookies and their related classes
    $("#ADA_widget a.defaultBackground").click(function () {
        $("html").removeClass("lowsaturation");
        $("html").removeClass("highsaturation");
        $('body').removeClass('desaturated');
        $('body').removeClass('highcontrast');
        $('body').removeClass('inverted');
        if ($.cookie('LowSaturationBackgroundCookie') == "yes") {
            $.cookie("LowSaturationBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('DarkContrastBackgroundCookie') == "yes") {
            $.cookie("DarkContrastBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('InvertBackgroundCookie') == "yes") {
            $.cookie("InvertBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('DesaturatedBackgroundCookie') == "yes") {
            $.cookie("DesaturatedBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('HighSaturationBackgroundCookie') == "yes") {
            $.cookie("HighSaturationBackgroundCookie", null, {
                path: '/'
            });
        }
    });
});




$(document).ready(function () {
    // Cookie for Invert
    // Check (onLoad) if DesaturatedBackgroundCookie is there and set the class to body if it is
    // If DesaturatedBackgroundCookie is set removes other background cookies and their related classes
    // Add active class to li
    if ($.cookie('InvertBackgroundCookie') == "yes") {
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
            path: '/'
        });
        $.cookie('DesaturatedBackgroundCookie') == "no";
        $.cookie('DesaturatedBackgroundCookie') == "undefined";
        $.cookie("DesaturatedBackgroundCookie", null, {
            path: '/'
        });
        $.cookie('HighSaturationBackgroundCookie') == "no";
        $.cookie('HighSaturationBackgroundCookie') == "undefined";
        $.cookie("HighSaturationBackgroundCookie", null, {
            path: '/'
        });
        $.cookie('LowSaturationBackgroundCookie') == "no";
        $.cookie('LowSaturationBackgroundCookie') == "undefined";
        $.cookie("LowSaturationBackgroundCookie", null, {
            path: '/'
        });
    }

    // When 'a.DesaturateBackground' is clicked remove other background cookies and their related classes
    // When input is clicked save cookie for 30days
    $("#ADA_widget a.InvertBackground").click(function () {
        resetBackgroundClicker()
        $.cookie("DarkContrastBackgroundCookie", null, {
            path: '/'
        });
        $.cookie("DesaturatedBackgroundCookie", null, {
            path: '/'
        });
        $.cookie("HighSaturationBackgroundCookie", null, {
            path: '/'
        });
        $.cookie("LowSaturationBackgroundCookie", null, {
            path: '/'
        });
        if ($.cookie('InvertBackgroundCookie') == "undefined" || $.cookie('InvertBackgroundCookie') == "no") {
            $.cookie('InvertBackgroundCookie', 'yes', { path: '/' });
            $("body").addClass("inverted");
            $('body').removeClass('highcontrast');
            $('body').removeClass('desaturated');
            $("html").removeClass("highsaturation");
            $("html").removeClass("lowsaturation");

        } else {
            $.cookie('InvertBackgroundCookie', 'yes', { path: '/' });
            $("body").addClass("inverted");
            $('body').removeClass('highcontrast');
            $('body').removeClass('desaturated');
            $("html").removeClass("highsaturation");
            $("html").removeClass("lowsaturation");
        }
    });

    //When 'a.defaultBackground' is clicked, removes other background cookies and their related classes
    $("#ADA_widget a.defaultBackground").click(function () {
        $('body').removeClass('inverted');
        $('body').removeClass('highcontrast');
        $('body').removeClass('desaturated');
        $("html").removeClass("highsaturation");
        $("html").removeClass("lowsaturation");
        if ($.cookie('InvertBackgroundCookie') == "yes") {
            $.cookie("InvertBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('DesaturatedBackgroundCookie') == "yes") {
            $.cookie("DesaturatedBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('DarkContrastBackgroundCookie') == "yes") {
            $.cookie("DarkContrastBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('HighSaturationBackgroundCookie') == "yes") {
            $.cookie("HighSaturationBackgroundCookie", null, {
                path: '/'
            });
        }
        if ($.cookie('LowSaturationBackgroundCookie') == "yes") {
            $.cookie("LowSaturationBackgroundCookie", null, {
                path: '/'
            });
        }
    });
});