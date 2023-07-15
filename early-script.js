
const removeAllCookies = () => {
    $.removeCookie('BackgroundColorCookie');
    $.removeCookie('TextColorCookie');
    $.removeCookie('LinkColorCookie');
    $.removeCookie('TextMagnifier');
    $.removeCookie('HighlightLinks');
    $.removeCookie('ImageDescription');
    $.removeCookie('HighlightHover');
    $.removeCookie('FontSizeCookie');
    $.removeCookie('FM_FontSizeCookie');
    $.removeCookie('BaskervilleFontCookie');
    $.removeCookie('DyslexicFontCookie');
    $.removeCookie('FM_FontTypeCookie');
    $.removeCookie('CursorEnlargeCookie');
    $.removeCookie('DarkContrastBackgroundCookie');
    $.removeCookie('LowSaturationBackgroundCookie');
    $.removeCookie('InvertBackgroundCookie');
    $.removeCookie('HighSaturationBackgroundCookie');
    $.removeCookie('FM_DesaturatedBackgroundCookie');
    $.removeCookie('DesaturatedBackgroundCookie');
    $.removeCookie('FM_InvertBackgroundCookie');
    $.removeCookie('FM_DarkContrastCookie');
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

const storeMainScrollPosition = () => {
    var mainScrollPosition = $("html, body").scrollTop();
    sessionStorage.setItem("mainScrollPosition", mainScrollPosition);
}

const forceReload = () => {
    $("body").fadeOut()
    storeMainScrollPosition()
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
        var modalScrollPosition = $(".modal_body").scrollTop();
        sessionStorage.setItem("modalScrollPosition", modalScrollPosition);
        sessionStorage.setItem("reloadModalOpen", "true");
        forceReload()
    }
}

function resetAdaModal() {
    console.log('reset done and stored scroll')
    removeAllCookies()
    const adaWidget = document.querySelector('#ADA_widget')
    if (adaWidget.style.display === 'flex') {
        sessionStorage.setItem("reloadModalOpen", "true");
    } else {
        sessionStorage.setItem("reloadModalClosed", "true");
    }
    forceReload()
}




const displayModal = () => {
    const overlay = document.querySelector('#ADA_widget')
    if (overlay.style.display !== "flex") {


        $("#ADA_trigger").fadeOut(700);

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
            $("#ADA_trigger").fadeIn();
            $('body').css("overflow", "auto");
        }, 800);


    }
}

const reloadStorageFunc = () => {
    if (sessionStorage.reloadModalOpen) {
        sessionStorage.removeItem("reloadModalOpen");
        displayModal()
        if (sessionStorage.modalScrollPosition) {
            $(".modal_body").scrollTop(sessionStorage.getItem("modalScrollPosition"));
        }
    } else {
        sessionStorage.removeItem("reloadModalClosed");
    }
    sessionStorage.removeItem("modalScrollPosition");
}

window.onload = function () {
    if (sessionStorage.getItem("mainScrollPosition") !== "0") {
        const scrollPosition = sessionStorage.getItem("mainScrollPosition")
        $("html, body").scrollTop(scrollPosition);
        sessionStorage.removeItem("mainScrollPosition")
        setTimeout(() => reloadStorageFunc(), 500);

        console.log('it is not 0')
    } else {
        reloadStorageFunc()
        console.log('it is 0')
    }
}




