const modalSwitchButton = document.querySelector('.switch-handle')

//FOR FONT SIZE CHANGE -- ADDS ACTIVE CLASS TO LI WHEN CLICKED
//https://stackoverflow.com/questions/3972944/jquery-removeclass-on-parent-sibling-child
$(function () {
    $('#ADA_widget .fontsize_form .form-check ul li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
});

$(document).ready(function () {
    // Cookie for FontSizeMedium
    // Check (onLoad) if FontSizeCookie is there and set the class to body if it is
    // Add active class to li
    if ($.cookie('FontSizeCookie') == "yes") {

        $("#ADA_widget #FS_Medium").addClass("active");
        $("body").addClass("fontSizeMedium");
        $("#ADA_widget #FS_Default").removeClass("active");
    }


    // When 'a.FontSizeMedium' is clicked remove DesaturatedBackgroundCookie and set FontSizeCookie
    // When input is clicked save cookie for 30days
    $("#ADA_widget a.FontSizeMedium").click(function () {

        if ($.cookie('FontSizeCookie') == "undefined" || $.cookie('FontSizeCookie') == "no") {
            $.cookie('FontSizeCookie', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("fontSizeMedium");

        } else {
            $.cookie('FontSizeCookie', 'yes', {
                expires: 30,
                path: '/'
            });
            $("body").addClass("fontSizeMedium");
        }
    });

    //When 'a.FontSizeDefault' is clicked, removes 'fontSizeMedium' and erases FontSizeCookie
    $("#ADA_widget a.FontSizeDefault").click(function () {
        $('body').removeClass('fontSizeMedium');
        if ($.cookie('FontSizeCookie') == "yes") {
            $.cookie("FontSizeCookie", null, {
                path: '/'
            });
        }
    });
});