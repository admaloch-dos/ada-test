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
            path: '/'
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
            $.cookie('FontSizeCookie', 'yes', { path: '/' });
            $("body").addClass("fontSizeMedium");

        } else {
            $.cookie('FontSizeCookie', 'yes', { path: '/' });
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
