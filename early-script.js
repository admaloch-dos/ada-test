// functino to reset all cookies
const removeAllCookies = () => {
    $.removeCookie('BackgroundColorCookie');
    $.removeCookie('TextColorCookie');
    $.removeCookie('LinkColorCookie');
    $.removeCookie('TextMagnifier');
    $.removeCookie('HighlightLinks');
    $.removeCookie('ImageDescription');
    $.removeCookie('HighlightHover');
    $.removeCookie('FontSizeCookie');

    $.removeCookie('BaskervilleFontCookie');
    $.removeCookie('DyslexicFontCookie');
    $.removeCookie('FM_FontTypeCookie');
    $.removeCookie('CursorEnlargeCookie');
    $.removeCookie('DarkContrastBackgroundCookie');
    $.removeCookie('LowSaturationBackgroundCookie');
    $.removeCookie('InvertBackgroundCookie');
    $.removeCookie('HighSaturationBackgroundCookie');
    $.removeCookie('DesaturatedBackgroundCookie');
    $.removeCookie('DesaturatedBackgroundCookie');
    $.removeCookie('InvertBackgroundCookie');
    $.removeCookie('DarkContrastBackgroundCookie');
    $.removeCookie('SeizureSafe');
    $.removeCookie('ReadingMask');
    $.removeCookie('CursorGuide');
    $.removeCookie('TTS_click_enabled');
    $.removeCookie('LinpageHeightVal');
    $.removeCookie('WordSpaceVal');
    $.removeCookie('LetterSpaceVal');
    $.removeCookie('speechPitch');
    $.removeCookie('speechRate');
    $.removeCookie('speechVol');
    $.removeCookie('voiceCookie');
}

let widgetItemObj = {
    isHighlighted: false,
    isOutlined: false,
    isTextMag: false,
    isImgMag: false,
    isFontBig: false,
    isFontChanged: false,
    isCursorBig: false,
    isLineHeightChanged: false,
    isWordSpaceChanged: false,
    isLetterSpaceChanged: false,

    isDarkContrast: false,
    isDesaturated: false,
    isInverted: false,
    isHighSat: false,
    isLowSat: false,


    isTextChanged: false,
    isBackColorChanged: false,
    isLinkColorChanged: false,

    isSeizureSafe: false,
    isReadingMask: false,
    isReadingGuide: false,
    isSpeech: false,
    isDyslexicFont: false,
    isBaskervilleFont: false
}






const storeMainScrollPosition = () => {
    var mainScrollPosition = $("html, body").scrollTop();
    sessionStorage.setItem("mainScrollPosition", mainScrollPosition);
}

const storeModalScrollPosition = () => {
    var modalScrollPosition = $(".modal_body").scrollTop();
    sessionStorage.setItem("modalScrollPosition", modalScrollPosition);
}

const modalDisplayOpenOrClose = () => {
    const adaWidget = document.querySelector('#ADA_widget')
    if (adaWidget.style.display === 'flex') {
        sessionStorage.setItem("reloadModalOpen", "true");
    } else {
        sessionStorage.setItem("reloadModalClosed", "true");
    }
}

const forceReload = () => {

    $("body").fadeOut()
    setTimeout(() => {
        document.location.reload();
    }, 200);
}

// function to remove background color cookies and reload page
const resetBackgroundClicker = () => {
    let bgColor = cache.bgColor.value
    let textColor = cache.textColor.value
    let linkColor = cache.linkColor.value
    if (bgColor !== "#ffffff" || textColor !== "#212529" || linkColor !== "#3863ff") {
        $.removeCookie('BackgroundColorCookie');
        $.removeCookie('TextColorCookie');
        $.removeCookie('LinkColorCookie');
        //alert("Cookie Removed!");
        storeModalScrollPosition()
        storeMainScrollPosition()
        if (document.querySelector('#ADA_widget').style.display === 'flex') {
            sessionStorage.setItem("reloadModalOpen", "true");
        }
        forceReload()
        removeWidgetControls(['ColorPicker'])
    }
}

// complete reset- all cookies removed and refresh - runs on reset button and shift-q
function resetAdaModal() {
    console.log('reset done and stored scroll')
    removeAllCookies()

    if (document.querySelector('#ADA_widget').style.display === 'flex') {
        sessionStorage.setItem("reloadModalOpen", "true");
    }
    storeMainScrollPosition()
    forceReload()
}




const displayModal = () => {
    const overlay = document.querySelector('#ADA_widget')
    if (overlay.style.display !== "flex") {
        $("#ada-triggers").fadeOut(700);
        $("#ADA_widget").css('opacity', '0');
        $("#ADA_widget").css("display", "flex")
        $("#ADA_widget").fadeTo(0, 1);
        $(".modal_content").fadeToggle(0);
        document.body.classList.add("prevent-body-overflow");
        $(".modal_body").scrollTop(0);
        $('body').css("overflow", "hidden");
    } else {

        $("#ADA_widget").fadeTo(400, 0);
        $(".modal_content").fadeToggle(400);
        setTimeout(() => {
            $("#ADA_widget").css("display", "none")
            document.body.classList.remove("prevent-body-overflow");
            $("#ada-triggers").fadeIn();
            $('body').css("overflow", "auto");
        }, 800);


    }
}









