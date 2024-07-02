// if ($.cookie('googtrans')) {
//     setTimeout(() => {
//         console.log($.cookie('googtrans'))
//         const cookieLangVal = $.cookie('googtrans')
//         const filteredVal = cookieLangVal.replace("/en/", "");
//         const currLanguageItem = worldLanguageData.filter(lang => lang.LanguageCodeGoogleTrans === filteredVal)[0]
//         const currLanguageText = currLanguageItem.LanguageEnglish
//         console.log(currLanguageText)
//         widgetItemObj.isTranslated = true
//         addWidgetControls('google-translate', `Translated to ${currLanguageText}`)
//     }, 3000);
// }

function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: "en" }, "google_translate_element");
    // add event listener to change url param on language selection change
    let langSelector = document.querySelector(".goog-te-combo");
    langSelector.addEventListener("change", function () {
        let lang = langSelector.value;
        var newurl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?lang=" +
            lang;
        window.history.pushState({ path: newurl }, "", newurl);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    (function () {
        // Cookie.erase("googtrans");
        var googleTranslateScript = document.createElement("script");
        googleTranslateScript.type = "text/javascript";
        googleTranslateScript.async = true;
        googleTranslateScript.src =
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        (
            document.getElementsByTagName("head")[0] ||
            document.getElementsByTagName("body")[0]).
            appendChild(googleTranslateScript);
    })();
});

//triggers select to change lang
const triggerTranslateSelect = (googTransCode) => {
    const selectElement = document.querySelector('.goog-te-combo');
    selectElement.value = googTransCode;
    selectElement.dispatchEvent(new Event('change'));
    setCurrLangBubble(googTransCode)
}

const widgetDataHandler = () => {
    removeWidgetControls(['google-translate'])
    widgetItemObj.isTranslated = true
    addWidgetControls('google-translate', `Translated to ${currLanguageItem.LanguageEnglish}`)
}

//in the main modal - current language icon and text
const setCurrLangBubble = (googTransCode) => {

    const currLanguageItem = worldLanguageData.filter(lang => lang.LanguageCodeGoogleTrans === googTransCode)[0]
    const currLangIcon = document.querySelector('#curr-language-icon')
    const currLangText = document.querySelector('#curr-language-text')
    currLangIcon.src = `./flourish/img/language/${currLanguageItem.FlorishIconfilename}`;
    currLangText.innerText = currLanguageItem.LanguageAutonym;
}

// translate language section ------------------->
const dismissGoogleTranslate = () => {
    triggerTranslateSelect('en')
    removeWidgetControls(['google-translate'])
    widgetItemObj.isTranslated = false
    $.removeCookie('googtrans');
    checkIfWidgetActive()
}

const changeSiteLanguage = (googTransCode) => {
    if (googTransCode !== 'en') {
        const currLanguageItem = worldLanguageData.filter(lang => lang.LanguageCodeGoogleTrans === googTransCode)[0]
        removeWidgetControls(['google-translate'])
        addWidgetControls('google-translate', `Translated to ${currLanguageItem.LanguageEnglish}`)
        widgetItemObj.isTranslated = true
        triggerTranslateSelect(googTransCode)
    } else {
        dismissGoogleTranslate()
    }
    checkIfWidgetActive()
}
// btns have a google translate code set as their id... if the language isn't supported there won't be a code and it will have the language + 'language-btn' added as id instead

const translateNotSupported = (item) => {
    if (item.id.includes('language-btn')) {
        $(function () {
            $('.flourish-popover').popover({
                container: '#flourish_widget'
            })
        })
        item.classList.add('disable', 'flourish-popover')
        if (!item.classList.contains('search-list-item')) {
            item.setAttribute("data-container", '#flourish_widget');
            item.setAttribute("data-trigger", 'hover');
            item.setAttribute("data-toggle", 'popover');
            item.setAttribute("data-placement", 'top');
            item.setAttribute("data-content", 'Language not currently supported');
        }
    }
}


const russianStyleLangs = ['az', 'be', 'bg', 'kk', 'ky', 'mk', 'mn', 'sr', 'tg', 'tt', 'uk']
const hindiStyleLanguages = ['bho', 'doi', 'gom', 'mai', 'mr', 'ne', 'sa']
const indonesianStyleLanguages = ['jv', 'su']

const langBtnClickHandler = () => {
    document.querySelectorAll('.lang-translate-selector').forEach(btn => {
        btn.addEventListener('click', () => {
            const googTransLangId = btn.id
            changeSiteLanguage(googTransLangId)
            let voiceList = speechSynthesis.getVoices();
            voiceList.forEach(voiceItem => {
                const slicedId = voiceItem.lang.split("-")[0];
                if (voiceItem.lang === googTransLangId || slicedId === googTransLangId) {
                    triggerEventFunc('#voice', voiceItem.name)
                }
            })
            russianStyleLangs.forEach(lang => {
                if (googTransLangId === lang) {
                    triggerEventFunc('#voice', 'Google русский')
                }
            })
            hindiStyleLanguages.forEach(lang => {
                if (googTransLangId === lang) {
                    triggerEventFunc('#voice', 'Google हिन्दी')
                }
            })
            indonesianStyleLanguages.forEach(lang => {
                if (googTransLangId === lang) {
                    triggerEventFunc('#voice', 'Google Bahasa Indonesia')
                }
            })
            resetMaskOnTranslate()
            translateNotSupported(btn)
        })
    })
}







