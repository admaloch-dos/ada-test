
// translateOnLoad()


const handleTranslateCookieLoad = () => {
    if ($.cookie('googtrans') && $.cookie('googtrans') !== '/en/en') {
        if ($.cookie('translateLanguage')) {
            const currLanguage = $.cookie('translateLanguage')
            widgetItemObj.isTranslated = true
            addWidgetControls('google-translate', `Translated to ${currLanguage}`)
        }
        checkIfWidgetActive()
    }
}




isElementLoaded('.goog-te-combo').then((selector) => {
    if (selector) {
        handleTranslateCookieLoad()
        console.log(selector)
        let selectElement = document.querySelector(".goog-te-combo");
        selectElement.addEventListener("change", (event) => {
            const selectVal = event.target.value
            const currLanguage = selectElement.options[selectElement.selectedIndex].text

            if (selectVal !== 'en') {

                addWidgetControls('google-translate', `Translated to ${currLanguage}`)
                widgetItemObj.isTranslated = true
                $.cookie("translateLanguage", currLanguage, { path: '/' });
            } else {

                removeWidgetControls(['google-translate'])
                widgetItemObj.isTranslated = false
                $.removeCookie('translateLanguage');
            }

            checkIfWidgetActive()

        });

    } else {
        console.log('this failed')
    }

});


