//////////////////////////////////////////////////////////////////////////////// Color Picker ////////////////////////////////////////////////////////////////////////
let config = {
    regTextContrast: 5,
    largeTextContrast: 3,
    linkContrast: 3
}

let cache = {};



//https://www.jquery-az.com/how-to-create-read-and-remove-jquery-cookies-with-3-demos/
$("#remove_cookie").click(function () {
    resetBackgroundClicker()

});

const setupCache = () => {
    cache.bgColor = document.querySelector('#background_color');
    cache.textColor = document.querySelector('#text_color');
    cache.linkColor = document.querySelector('#link_color');
    cache.inputs = document.querySelectorAll('input.color_swatch');
    //cache.result = document.querySelector('.result_Contrast');
    cache.BgtoText = document.querySelector('#textBackRatioContainer');
    cache.BgtoLink = document.querySelector('#linkBackRatioContainer');
    cache.TexttoLink = document.querySelector('#linkTextRatioContainer');
    cache.contrastValues = document.querySelector('.contrast_values');
}


// https://gist.github.com/jfsiii/5641126
const getLuminance = (r, g, b) => {
    const RsRGB = r / 255;
    const GsRGB = g / 255;
    const BsRGB = b / 255;

    var R = (RsRGB <= 0.03928) ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    var G = (GsRGB <= 0.03928) ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    var B = (BsRGB <= 0.03928) ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4);

    // For the sRGB colorspace, the relative luminance of a color is defined as:
    var L = 0.2126 * R + 0.7152 * G + 0.0722 * B;

    return L;
};

const calculateContrast = (L1, L2) => {
    const contrast = (L1 + 0.05) / (L2 + 0.05)
    return parseFloat(contrast.toFixed(2));
};

// https://gist.github.com/Arahnoid/9923989
const hexToRGB = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const takeTwoColors = (c1, c2) => {
    const c1l = getLuminance(c1.r, c1.g, c1.b);
    const c2l = getLuminance(c2.r, c2.g, c2.b);

    if (c1l > c2l) {
        return calculateContrast(c1l, c2l);
    } else {
        return calculateContrast(c2l, c1l);
    }
};



const onInputChange = (e) => {
    widgetItemObj.isTextChanged = true
    widgetItemObj.isBackColorChanged = true
    widgetItemObj.isLinkColorChanged = true
    addWidgetControls('ColorPicker', 'Custom colors')

    checkIfWidgetActive()

    if ($('body').hasClass('highcontrast') || $('body').hasClass('inverted') || $('body').hasClass('desaturated')) {
        $("body").removeClass("highcontrast inverted desaturated")
        $.removeCookie('InvertBackgroundCookie');
        $.removeCookie('InvertBackgroundCookie');
        $.removeCookie('DarkContrastBackgroundCookie');
        $.removeCookie('DarkContrastBackgroundCookie');
        $.removeCookie('DesaturatedBackgroundCookie');
        $.removeCookie('DesaturatedBackgroundCookie');

        $("#DefaultBG_option").addClass('active').siblings().removeClass('active');
        removeWidgetControls(['DarkContrastBackground', 'DesaturateBackground', 'InvertBackground'])
        // makeColorPresetsFalse([widgetItemObj.isDarkContrast, widgetItemObj.isDesaturated, widgetItemObj.isInverted, widgetItemObj.isHighSat, widgetItemObj.isLowSat])

        widgetItemObj.isDarkContrast = false
        widgetItemObj.isDesaturated = false
        widgetItemObj.isInverted = false

    } else {
        console.log('it does not have it')
    }


    const value = e.target.value;
    // console.log(value);

    //Hide defaultContainer on input change
    $("#defaultContainer").hide();



    // setting defaults if not yet supplied by the user
    if (!cache.bgColor.value) {
        cache.bgColor.value = '#ffffff';
    }

    if (!cache.textColor.value) {
        cache.textColor.value = '#212529';
    }

    if (!cache.linkColor.value) {
        cache.linkColor.value = '#3863FF';
    }


    // TODO: handle RGB / hex values
    const bgColor = hexToRGB(cache.bgColor.value);
    const textColor = hexToRGB(cache.textColor.value);
    const linkColor = hexToRGB(cache.linkColor.value);

    //Switch selectors to #view, .Footer
    $('#view *').not('#ADA_widget, #ADA_widget *').css('color', cache.textColor.value);
    $('.SearchForm .input-group .input-group-append #submit_search').css('color', cache.textColor.value);
    $('#footerFeat_container, .Footer').css('color', cache.textColor.value);

    $('body').not('[class="ada_modal_test"]').css('background-color', cache.bgColor.value);
    $('#Scroll_btn').attr('style', 'background-color: ' + cache.bgColor.value + '!important');
    $('#navContainer, #navContainer #main_navbar .dropdown-menu.backdrop_hover, #navContainer #main_navbar .dropdown-menu > .dropdown-submenu.firstLevel').attr('style', 'background-color: ' + cache.bgColor.value + '!important');
    $('#footerFeat_container, .Footer').css('background-color', cache.bgColor.value);
    $('#menudropdown .card-body').css('background-color', cache.bgColor.value);

    $('body a').not("#ADA_widget a").attr('style', 'color: ' + cache.linkColor.value + '!important');



    const bgTextContrast = takeTwoColors(bgColor, textColor);
    const bgLinkContrast = takeTwoColors(bgColor, linkColor);
    const textLinkContrast = takeTwoColors(textColor, linkColor);



    let resultMsg = ``;
    // console.log();
    if (
        (bgTextContrast >= 4.5) && (bgLinkContrast >= 4.5) && (textLinkContrast >= config.linkContrast)
    ) {
        //resultMsg = `✅ w00t! all good!`;
        $(cache.BgtoText).attr('class', 'pass').text('Pass');
        $(cache.BgtoLink).attr('class', 'pass').text('Pass');
        $(cache.TexttoLink).attr('class', 'pass').text('Pass');
    } else if (
        (bgTextContrast >= 4.5) && (bgLinkContrast >= 4.5) && (textLinkContrast < 3.1)
    ) {
        //resultMsg = `Your link and text colors have enough contrast from the background, but not each other`;
        $(cache.TexttoLink).attr('class', 'fail').text('Fail');
        $(cache.BgtoText).attr('class', 'fail').text('Fail');
        $(cache.BgtoLink).attr('class', 'pass').text('Pass');
    } else if (
        (bgTextContrast < 4.5) && (bgLinkContrast >= 4.5)
    ) {
        //resultMsg = `Your text color doesn't have enough contrast with the background. You should fix that before worrying about the link color.`;
        $(cache.BgtoText).attr('class', 'fail').text('Fail');
        $(cache.BgtoLink).attr('class', 'pass').text('Pass');
        $(cache.TexttoLink).attr('class', 'pass').text('Pass');
    } else if (
        (bgTextContrast < 4.5) && (bgLinkContrast < 4.5)
    ) {
        //resultMsg = `Both your text and link colors don't have enough contrast with the background.`;
        $(cache.TexttoLink).attr('class', 'fail').text('Fail');
        $(cache.BgtoText).attr('class', 'fail').text('Fail');
        $(cache.BgtoLink).attr('class', 'pass').text('Pass');
    } else if (
        (bgTextContrast >= 4.5) && (bgLinkContrast < 4.5)
    ) {
        //resultMsg = `Your link color doesn't have enough contrast with the background. You should fix that before worrying about the link color's contrast with the text.`;
        $(cache.BgtoLink).attr('class', 'fail').text('Fail');
        $(cache.BgtoText).attr('class', 'pass').text('Pass');
        $(cache.TexttoLink).attr('class', 'pass').text('Pass');
    }

    //Prints resultMsg to p.result_Contrast
    //cache.result.textContent = resultMsg;

    const bgTextcontrastValues = `Background to Text Contrast: ${bgTextContrast}`;
    const bgLinkCcontrastValues = `Background to Link Contrast: ${bgLinkContrast}`;
    const textLinkcontrastValues = `Text to Link Contrast: ${textLinkContrast}`;

    cache.BgtoText.innerHTML = bgTextcontrastValues;
    cache.BgtoLink.innerHTML = bgLinkCcontrastValues;
    cache.TexttoLink.innerHTML = textLinkcontrastValues;





};

const addEventListeners = () => {
    cache.bgColor.addEventListener('change', onInputChange);
    cache.textColor.addEventListener('change', onInputChange);
    cache.linkColor.addEventListener('change', onInputChange);
};


const init = () => {
    setupCache();
    addEventListeners();
}
init();
// $("#ADA_reset").click(function () {
//   cache.bgColor.value = "#ffffff";
//   cache.textColor.value = "#212529";
//   cache.linkColor.value = "#3863FF";
// });





const resetColors = (color, bgColor, linkColor) => {

    $('body').css('background-color', bgColor);
    $('#navContainer, #navContainer #main_navbar .dropdown-menu.backdrop_hover, #navContainer  #main_navbar .dropdown-menu > .dropdown-submenu.firstLevel').attr('style', 'background-color: ' + bgColor + '!important');
    $('#Scroll_btn').attr('style', 'background-color: ' + bgColor + '!important');
    $('#footerFeat_container, .Footer').css('background-color', bgColor);
    $('#menudropdown .card-body').css('background-color', bgColor);
    var hexBackgroundColor = $('body').cssAsHex('background-color');
    $("#bg_hexVal").html(hexBackgroundColor);
    $.cookie.raw = true; //to bypass the default cookie value which is encoded/decoded when writing/reading
    $.cookie('BackgroundColorCookie', bgColor);

    $('#view *').not('#ADA_widget, #ADA_widget *').css('color', color);
    $('.SearchForm .input-group .input-group-append #submit_search').css('color', color);
    $('#footerFeat_container, .Footer').css('color', color);
    var hexTextColor = $('#view *').cssAsHex('color');
    $("#txt_hexVal").html(hexTextColor);
    $.cookie.raw = true;
    $.cookie('TextColorCookie', color);

    $('body a').not("#ADA_widget a").attr('style', 'color: ' + linkColor + '!important');
    var hexLinkColor = $('body a').cssAsHex('color');
    $("#link_hexVal").html(hexLinkColor);
    $.cookie.raw = true;
    $.cookie('LinkColorCookie', linkColor);
}


///////////////////////////////////////////////////////////////////// NOTE: Switch selectors to #view, .Footer
///////////////////////////////////////////////////////////////////// NOTE: Switch selectors to #view, .Footer
$(document).ready(function () {

    //https://stackoverflow.com/a/43384649/10792033
    // RGB TO HEX
    $.fn.cssAsHex = function (colorProp) {

        var hexDigits = '0123456789abcdef';

        function hex(x) {
            return isNaN(x) ? '00' : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
        };

        // Convert RGB color to Hex format
        function rgb2hex(rgb) {
            var rgbRegex = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            return '#' + hex(rgbRegex[1]) + hex(rgbRegex[2]) + hex(rgbRegex[3]);
        };

        return rgb2hex(this.css(colorProp));
    };



    //BackgroundColorCookie
    $('#background_color').on("change", function () {
        var background_color = $('body').css('background-color');
        $('body').css('background-color', background_color);
        $('#navContainer, #navContainer #main_navbar .dropdown-menu.backdrop_hover, #navContainer  #main_navbar .dropdown-menu > .dropdown-submenu.firstLevel').attr('style', 'background-color: ' + background_color + '!important');
        $('#Scroll_btn').attr('style', 'background-color: ' + background_color + '!important');
        $('#footerFeat_container, .Footer').css('background-color', background_color);
        $('#menudropdown .card-body').css('background-color', background_color);
        var hexBackgroundColor = $('body').cssAsHex('background-color');
        $("#bg_hexVal").html(hexBackgroundColor);

        $.cookie.raw = true; //to bypass the default cookie value which is encoded/decoded when writing/reading
        $.cookie('BackgroundColorCookie', background_color);
    });
    if ($.cookie('BackgroundColorCookie') != undefined) {
        $('body').css('background-color', $.cookie('BackgroundColorCookie'));
        $('#navContainer, #navContainer #main_navbar .dropdown-menu.backdrop_hover, #navContainer  #main_navbar .dropdown-menu > .dropdown-submenu.firstLevel').attr('style', 'background-color: ' + $.cookie('BackgroundColorCookie') + '!important');
        $('#Scroll_btn').attr('style', 'background-color: ' + $.cookie('BackgroundColorCookie') + '!important');
        $('#footerFeat_container, .Footer').css('background-color', $.cookie('BackgroundColorCookie'));
        $('#menudropdown .card-body').css('background-color', $.cookie('BackgroundColorCookie'));

        var hexBackgroundColor = $('body').cssAsHex('background-color');
        $('#background_color').attr('value', hexBackgroundColor);
        $("#bg_hexVal").html(hexBackgroundColor);


        $.cookie.raw = true;
    }


    //TextColorCookie
    $('#text_color').on("change", function () {
        var text_color = $('#view *').css('color');
        $('#view *').not('#ADA_widget, #ADA_widget *').css('color', text_color);
        $('.SearchForm .input-group .input-group-append #submit_search').css('color', text_color);
        $('#footerFeat_container, .Footer').css('color', text_color);
        var hexTextColor = $('#view *').cssAsHex('color');
        $("#txt_hexVal").html(hexTextColor);

        $.cookie.raw = true;
        $.cookie('TextColorCookie', text_color);
    });
    if ($.cookie('TextColorCookie') != undefined) {
        $('#view *').not('#ADA_widget, #ADA_widget *').css('color', $.cookie('TextColorCookie'));
        $('.SearchForm .input-group .input-group-append #submit_search').css('color', $.cookie('TextColorCookie'));
        $('#footerFeat_container, .Footer').css('color', $.cookie('TextColorCookie'));

        var hexTextColor = $('#view *').cssAsHex('color');
        $('#text_color').attr('value', hexTextColor);
        $("#txt_hexVal").html(hexTextColor);


        $.cookie.raw = true;
    }


    //LinkColorCookie
    $('#link_color').on("change", function () {
        var link_color = $('body a').css('color');
        $('body a').not("#ADA_widget a").attr('style', 'color: ' + link_color + '!important');
        var hexLinkColor = $('body a').cssAsHex('color');
        $("#link_hexVal").html(hexLinkColor);

        $.cookie.raw = true;
        $.cookie('LinkColorCookie', link_color);
    });
    if ($.cookie('LinkColorCookie') != undefined) {
        $('body a').not("#ADA_widget a").attr('style', 'color: ' + $.cookie('LinkColorCookie') + '!important');

        var hexLinkColor = $('body a').cssAsHex('color');
        $('#link_color').attr('value', hexLinkColor);
        $("#link_hexVal").html(hexLinkColor);

        $.cookie.raw = true;
    }






}); //end doc ready