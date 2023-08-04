let isWidgetActive = false

const isCookieActive = (input, value) => {
    if (input && input !== value) {
        return true
    } else {
        return false
    }
}



const areCookiesSet = () => {
    let updateCookies = widgetItemObj
    updateCookies.highlightCookie = isCookieActive($.cookie("HighlightHover"), 'false')
    updateCookies.outlineCookie = isCookieActive($.cookie("HighlightLinks"), 'false')
    updateCookies.textMagCookie = isCookieActive($.cookie("TextMagnifier"), 'false')
    updateCookies.imgCookie = isCookieActive($.cookie("ImageDescription"), 'false')
    updateCookies.fontSizeCookie = isCookieActive($.cookie("FontSizeCookie"), 'null')
    updateCookies.cursorCookie = isCookieActive($.cookie("CursorEnlargeCookie"), 'null')
    updateCookies.fontTypeCookie = isCookieActive($.cookie("FM_FontTypeCookie"), 'null')
    updateCookies.lineHeightCookie = isCookieActive($.cookie("LinpageHeightVal"), 'inherit')
    updateCookies.wordSpaceCookie = isCookieActive($.cookie("WordSpaceVal"), 'inherit')
    updateCookies.letterSpaceCookie = isCookieActive($.cookie("LetterSpaceVal"), 'inherit')
    updateCookies.lowSatCookie = isCookieActive($.cookie("LowSaturationBackgroundCookie"), 'null')
    updateCookies.highSatCookie = isCookieActive($.cookie("HighSaturationBackgroundCookie"), 'null')
    updateCookies.invertCookie = isCookieActive($.cookie("InvertBackgroundCookie"), 'null')
    updateCookies.desatCookie = isCookieActive($.cookie("DesaturatedBackgroundCookie"), 'null')
    updateCookies.darkSatCookie = isCookieActive($.cookie("DarkContrastBackgroundCookie"), 'null')
    updateCookies.textColorCookie = isCookieActive($.cookie("TextColorCookie"), 'false')
    updateCookies.backColorCookie = isCookieActive($.cookie("BackgroundColorCookie"), 'false')
    updateCookies.linkColorCookie = isCookieActive($.cookie("LinkColorCookie"), 'false')
    updateCookies.seizureCookie = isCookieActive($.cookie("SeizureSafe"), 'false')
    updateCookies.readingMaskCookie = isCookieActive($.cookie("ReadingMask"), 'false')
    updateCookies.cursorGuideCookie = isCookieActive($.cookie("CursorGuide"), 'false')
    updateCookies.speechCookie = isCookieActive($.cookie("TTS_click_enabled"), 'false')
    updateCookies.baskervilleFont = isCookieActive($.cookie("BaskervilleFontCookie"), 'null')
    updateCookies.dyslexicFont = isCookieActive($.cookie("DyslexicFontCookie"), 'null')
    return updateCookies
}

widgetItemObj = areCookiesSet()

// check if widget items eval to true if so  fade in helper box
const checkIfWidgetActive = () => {
    if (Object.values(widgetItemObj).indexOf(true) > -1) {
        isWidgetActive = true
        $('#widget-controls').fadeIn()

    } else {
        isWidgetActive = false

        $('#widget-controls').fadeOut()
    }

}
checkIfWidgetActive()

// // add controls to widget on change for each item
// const addWidgetControls = (item, text) => {
//     const widgetList = document.querySelector('#widget-list')
//     const currItem = document.querySelector(`.${item}`)
//     if (currItem) {
//         $(currItem).fadeOut()
//         setTimeout(() => {
//             $(currItem).remove();
//         }, 450);

//         console.log('item removed')
//     } else {
//         console.log('item added')
//         const listItem = document.createElement('li')
//         listItem.classList.add(item, 'fade-in')
//         listItem.innerHTML = `<i class="fa fa-close close-item"></i> ${text}`
//         widgetList.append(listItem)
//     }
// }
// add controls to widget on change for each item

const addWidgetControls = (item, text) => {
    const widgetList = document.querySelector('#widget-list')
    if (!document.querySelector(`li.${item}`)) {

        const listItem = document.createElement('li')
        listItem.classList.add(item, 'fade-in', 'close-list-items')
        listItem.innerHTML = `<i class="fa fa-close close-item"></i> ${text}`
        widgetList.append(listItem)
    }
    let closeItems = document.querySelectorAll('.close-list-items')
    closeItemHandler(closeItems)
}


const removeWidgetControls = (itemArr) => {

    itemArr.forEach(item => {
        $(`li.${item}`).fadeOut()
        setTimeout(() => {
            $(`li.${item}`).remove();
        }, 300);
    });

}



const closeItemHandler = (closeItems) => {
    closeItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // e.stopPropagation()
            let colorPreArr = ['DarkContrastBackground', 'DesaturateBackground', 'InvertBackground', 'HighSaturationBackground', 'LowSaturationBackground']
            for (let i = 0; i < colorPreArr.length; i++) {
                if (item.classList.contains(colorPreArr[i])) {
                    colorPresetToDefault()
                }
            }
            const itemArr = ['ToggleHighlightHover', 'ToggleHighlightLinks', 'ToggleTextMagnifier', 'ToggleImageDescription', 'ToggleSeizure', 'ToggleReadingMask', 'ToggleReadingGuide', 'ToggleTTS_click']
            // turnItemOff(item, 'ToggleHighlightHover', '#ToggleHighlightHover')
            for (let i = 0; i < itemArr.length; i++) {
                if (item.classList.contains(itemArr[i])) {
                    $(`#${itemArr[i]}`).prop('checked', false).trigger('change')
                }
            }
            item.classList.contains('FontSizeMedium') && restoreDefaultOnClick('fontSizeMedium', 'FontSizeCookie', widgetItemObj.fontSizeCookie, ['FontSizeMedium'], '#ADA_widget #FS_Default')
            item.classList.contains('Cursor_Enlarge_option') && restoreDefaultOnClick('Cursor_Enlarge', 'CursorEnlargeCookie', widgetItemObj.cursorCookie, ['Cursor_Enlarge_option'], '#ADA_widget #Cur_Default')
            item.classList.contains('ColorPicker') && resetBackgroundClicker()
            item.classList.contains('letter_spacing') && restoreSpacingDefault('#letter_spacing', ['letter_spacing'])
            item.classList.contains('word_spacing') && restoreSpacingDefault('#word_spacing', ['word_spacing'])
            item.classList.contains('line_height') && restoreSpacingDefault('#line_height', ['line_height'])

            if (item.classList.contains('FontTypeDyslexic')) {
                restoreDefaultOnClick('DyslexicFont', 'DyslexicFontCookie', widgetItemObj.dyslexicFont, ['FontTypeDyslexic', 'FontTypeBaskerville'], '#ADA_widget #FT_Default')
                $.cookie('FM_FontTypeCookie', null, { path: '/' });
            }
            if (item.classList.contains('FontTypeBaskerville')) {
                restoreDefaultOnClick('BaskervilleFont', 'BaskervilleFontCookie', widgetItemObj.baskervilleFont, ['FontTypeDyslexic', 'FontTypeBaskerville'], '#ADA_widget #FT_Default')
                $.cookie('FM_FontTypeCookie', null, { path: '/' });
            }

        })
    })
    console.log(widgetItemObj)
    console.log('is widget active', isWidgetActive)
}


const addWidgetControlsOnLoad = () => {
    widgetItemObj.highlightCookie && addWidgetControls('ToggleHighlightHover', 'Highlight on hover')
    widgetItemObj.outlineCookie && addWidgetControls('ToggleHighlightLinks', 'Highlight all links')
    widgetItemObj.textMagCookie && addWidgetControls('ToggleTextMagnifier', 'Magnify text')
    widgetItemObj.imgCookie && addWidgetControls('ToggleImageDescription', 'Image description')
    widgetItemObj.seizureCookie && addWidgetControls('ToggleSeizure', 'Seizure safe')
    widgetItemObj.readingMaskCookie && addWidgetControls('ToggleReadingMask', 'Reading mask')
    widgetItemObj.cursorGuideCookie && addWidgetControls('ToggleReadingGuide', 'Reading guide')
    widgetItemObj.speechCookie && addWidgetControls('ToggleTTS_click', 'Text to speech')
    widgetItemObj.letterSpaceCookie && addWidgetControls('letter_spacing', 'Letter spacing')
    widgetItemObj.wordSpaceCookie && addWidgetControls('word_spacing', 'Word spacing')
    widgetItemObj.lineHeightCookie && addWidgetControls('line_height', 'Line height')
    if (widgetItemObj.backColorCookie || widgetItemObj.textColorCookie || widgetItemObj.linkColorCookie) {
        addWidgetControls('ColorPicker', 'Custom colors')
    }
    widgetItemObj.darkSatCookie && addWidgetControls('DarkContrastBackground', 'Dark contrast preset')
    widgetItemObj.desatCookie && addWidgetControls('DesaturateBackground', 'Desaturate preset')
    widgetItemObj.highSatCookie && addWidgetControls('HighSaturationBackground', 'High saturation')
    widgetItemObj.lowSatCookie && addWidgetControls('LowSaturationBackground', 'Low saturation')
    widgetItemObj.invertCookie && addWidgetControls('InvertBackground', 'Inverted preset')
    widgetItemObj.fontSizeCookie && addWidgetControls('FontSizeMedium', 'Change font size')
    widgetItemObj.dyslexicFont && addWidgetControls('FontTypeDyslexic', 'Open-dyslexic font')
    widgetItemObj.baskervilleFont && addWidgetControls('FontTypeBaskerville', 'Libre-baskerville font')
    widgetItemObj.cursorCookie && addWidgetControls('Cursor_Enlarge_option', 'Change cursor')


}
addWidgetControlsOnLoad()



