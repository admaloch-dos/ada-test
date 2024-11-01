//triggers select to change lang
const triggerTranslateSelect = (googTransCode) => {
    const selectElement = document.querySelector('.goog-te-combo');
    selectElement.value = googTransCode;
    selectElement.dispatchEvent(new Event('change'));
}

//in the main modal - current language icon and text
const setCurrLangBubble = (googTransCode) => {
    const currLanguageItem = worldLanguageData.filter(lang => lang.LanguageCodeGoogleTrans === googTransCode)[0]
    const currLangIcon = document.querySelector('#curr-language-icon')//from curr lang in main modal
    const currLangText = document.querySelector('#curr-language-text')
    const translateIcon = document.querySelector('#translate-icon')//from main page
    currLangIcon.src = `./flourish/img/language/${currLanguageItem.FlorishIconfilename}`;
    translateIcon.src = `./flourish/img/language/${currLanguageItem.FlorishIconfilename}`;
    currLangText.innerText = currLanguageItem.LanguageAutonym;
}

// translate language section ------------------->
const dismissGoogleTranslate = () => {
    // console.log('dismiss google trans ran')
    triggerTranslateSelect('en')
    setCurrLangBubble('en')
    removeWidgetControls(['google-translate'])
    widgetItemObj.isTranslated = false
    $.removeCookie('googtrans');
    checkIfWidgetActive()
}

const changeSiteLanguage = (googTransCode) => {
    if (googTransCode && googTransCode !== 'en') {
        triggerTranslateSelect(googTransCode)
    } else {
        dismissGoogleTranslate()
    }
}

const handleSiteLangChanges = (googTransCode) => {
    const currLanguageItem = worldLanguageData.filter(lang => lang.LanguageCodeGoogleTrans === googTransCode)[0]
    removeWidgetControls(['google-translate'])
    addWidgetControls('google-translate', `Google translate: ${currLanguageItem.LanguageEnglish}`)
    widgetItemObj.isTranslated = true
    setCurrLangBubble(googTransCode)
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
const langBtnClickHandler = () => {
    const langTransBtns = document.querySelectorAll('.lang-translate-selector')
    langTransBtns.forEach(btn => {
        translateNotSupported(btn)
        btn.addEventListener('click', () => {
            if (btn.classList.contains('disable')) return
            let currLang = document.querySelector(".goog-te-combo").value;
            if (!currLang) currLang = 'en'

            if (currLang !== btn.id) {
                changeSiteLanguage(btn.id)
                let newLang = document.querySelector(".goog-te-combo").value;
                // console.log('btn id', btn.id, 'new lang', newLang)
                if (newLang && currLang !== newLang) {
                    // console.log('Curr:', currLang, '-', 'New:', newLang)
                    handleSiteLangChanges(btn.id)
                    handleTranslateSpeechVoiceSelect(btn.id)
                    translateNotSupported(btn)
                    closeLangModal(btn)
                    resetMaskOnTranslate()
                }
            }
        })
    })
}

const handleTranslateSpeechVoiceSelect = (googTransLangId) => {
    //search for a compatible voice/accent on site translate
    let voiceList = speechSynthesis.getVoices();
    for (const voiceItem of voiceList) {
        const slicedId = voiceItem.lang.split("-")[0];
        if (voiceItem.lang === googTransLangId || slicedId === googTransLangId) {
            triggerEventFunc('#voice', voiceItem.name);
            return;
        }
    }

    //if no direct connection found - search for closest compatibility
    const similarLanguageArr = [
        ['az', 'be', 'bg', 'kk', 'ky', 'mk', 'mn', 'sr', 'tg', 'tt', 'uk'],
        ['bho', 'doi', 'gom', 'mai', 'mr', 'ne', 'sa'],
        ['jv']
    ]
    const compatibleAccents = ['Google русский', 'Google हिन्दी', 'Google Bahasa Indonesia']
    for (let i = 0; i < similarLanguageArr.length; i++) {
        const compatibleAccent = compatibleAccents[i]
        for (let j = 0; j < similarLanguageArr[i].length; j++) {
            if (googTransLangId === similarLanguageArr[i][j]) {
                similarLanguageArr[i][j]
                console.log('curr', similarLanguageArr[i][j], 'compatible accent', compatibleAccent)
                triggerEventFunc('#voice', compatibleAccent)
                return;
            }
        }
    }
    triggerEventFunc('#voice', 'Google US English')
}

const resetLangModalSettings = () => {
    const defaultFilterBtn = document.querySelector('#all-languages-filter')
    defaultFilterBtn.click()
    const langModalSearchInput = document.querySelector('#search-lang-modal')
    langModalSearchInput.value = ''
}

const closeLangModal = (btn) => {
    if (!btn.classList.contains('disable') &&
        !btn.classList.contains('audio_state'
        )) {
        $('#all-languages-modal').modal('hide')
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }
}

