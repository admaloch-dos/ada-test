
// translateOnLoad()

const dismissGoogleTranslate = () => {
    removeWidgetControls(['google-translate'])
    widgetItemObj.isTranslated = false
    $.removeCookie('translateLanguage');
    checkIfWidgetActive()
    console.log('dismiss translate just ran')
    // find `iframe` element with GoogleTranslate select and buttons
    var iframe = document.getElementsByClassName('goog-te-banner-frame')[0]
        || document.getElementById(':1.container');
    if (!iframe) return;

    // search all buttons from the retrieved iframe
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var restore_el = innerDoc.getElementsByTagName("button");

    // fire `click` event on the `restore` button, that `Shows the origin`
    for (var i = 0; i < restore_el.length; i++) {
        if (restore_el[i].id.indexOf("restore") >= 0) {
            restore_el[i].click();
            return;
        }
    }

}



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

function triggerChange(element) {
    let changeEvent = new Event('change');
    element.dispatchEvent(changeEvent);
}

const translateWidgetControls = (selectVal, currLanguage) => {

    if (selectVal !== 'en') {
        const translateWidgetItem = document.querySelector('.google-translate')

        if (translateWidgetItem) {
            translateWidgetItem.innerText = `Translated to ${currLanguage}`
        } else {
            addWidgetControls('google-translate', `Translated to ${currLanguage}`)
            widgetItemObj.isTranslated = true
        }
        $.cookie("translateLanguage", currLanguage, { path: '/' });

    } else {
        dismissGoogleTranslate()
    }
    checkIfWidgetActive()
}

isElementLoaded('.goog-te-combo').then((selector) => {
    if (selector) {
        handleTranslateCookieLoad()
        selector.addEventListener("change", (event) => {
            const selectVal = event.target.value
            const currLanguage = selector.options[selector.selectedIndex].text

            translateWidgetControls(selectVal, currLanguage)
        });
        document.querySelectorAll('.ada-language-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // const currBtnClicked = btn.id
                let newSelectVal = btn.id
                let newSiteLanguage = btn.innerText
                selector.value = newSelectVal
                triggerChange(selector);

                // translateWidgetControls(newSelectVal, newSiteLanguage)
                // console.log(newSiteLanguage)
            })
        })
    } else {
        console.log('this failed')
    }
});


