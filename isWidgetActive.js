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
    updateCookies.isHighlighted = isCookieActive($.cookie("HighlightHover"), 'false')
    updateCookies.isOutlined = isCookieActive($.cookie("HighlightLinks"), 'false')
    updateCookies.isTextMag = isCookieActive($.cookie("TextMagnifier"), 'false')
    updateCookies.isImgMag = isCookieActive($.cookie("ImageDescription"), 'false')
    updateCookies.isFontBig = isCookieActive($.cookie("FontSizeCookie"), 'null')
    updateCookies.isCursorBig = isCookieActive($.cookie("CursorEnlargeCookie"), 'null')
    updateCookies.isFontChanged = isCookieActive($.cookie("FM_FontTypeCookie"), 'null')
    updateCookies.isLineHeightChanged = isCookieActive($.cookie("LinpageHeightVal"), 'inherit')
    updateCookies.isWordSpaceChanged = isCookieActive($.cookie("WordSpaceVal"), 'inherit')
    updateCookies.isLetterSpaceChanged = isCookieActive($.cookie("LetterSpaceVal"), 'inherit')
    updateCookies.isLowSat = isCookieActive($.cookie("LowSaturationBackgroundCookie"), 'null')
    updateCookies.isHighSat = isCookieActive($.cookie("HighSaturationBackgroundCookie"), 'null')
    updateCookies.isInverted = isCookieActive($.cookie("InvertBackgroundCookie"), 'null')
    updateCookies.isDesaturated = isCookieActive($.cookie("DesaturatedBackgroundCookie"), 'null')
    updateCookies.isDarkContrast = isCookieActive($.cookie("DarkContrastBackgroundCookie"), 'null')
    updateCookies.isTextChanged = isCookieActive($.cookie("TextColorCookie"), 'false')
    updateCookies.isBackColorChanged = isCookieActive($.cookie("BackgroundColorCookie"), 'false')
    updateCookies.isLinkColorChanged = isCookieActive($.cookie("LinkColorCookie"), 'false')
    updateCookies.isSeizureSafe = isCookieActive($.cookie("SeizureSafe"), 'false')
    updateCookies.isReadingMask = isCookieActive($.cookie("ReadingMask"), 'false')
    updateCookies.isReadingGuide = isCookieActive($.cookie("CursorGuide"), 'false')
    updateCookies.isSpeech = isCookieActive($.cookie("TTS_click_enabled"), 'false')
    updateCookies.isBaskervilleFont = isCookieActive($.cookie("BaskervilleFontCookie"), 'null')
    updateCookies.isDyslexicFont = isCookieActive($.cookie("DyslexicFontCookie"), 'null')
    return updateCookies
}

widgetItemObj = areCookiesSet()

// check if widget items eval to true if so  fade in helper box
const checkIfWidgetActive = () => {
    if (Object.values(widgetItemObj).indexOf(true) > -1) {
        isWidgetActive = true

        $('#widget-controls').fadeIn()
        $('#ADA_check_icon').fadeIn()
        $('#toggle-ada-list, #reset-ada').fadeIn()

        $('#ADA_icon').css("margin-left", "5px");


    } else {
        isWidgetActive = false

        $('#widget-controls').fadeOut()
        $('#ADA_check_icon').fadeOut()
        $('#toggle-ada-list, #reset-ada').fadeOut()
       $('#ADA_icon').css("margin-left", "20px") 


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
        listItem.innerHTML = `<p>${text} <i class="fa fa-close close-item-icon" aria-hidden="true"></i></p>`
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
    checkIfWidgetActive()
    console.log(widgetItemObj)
}



const closeItemHandler = (closeItems) => {
    closeItems.forEach(item => {
        // item.addEventListener('mouseenter', () => {
        //     item.getElementsByTagName('i')[0].classList.remove('d-none')
        // })
        // item.addEventListener('mouseleave', () => {
        //     item.getElementsByTagName('i')[0].classList.add('d-none')
        // })
        item.addEventListener('click', (e) => {
            // e.stopPropagation()
            let colorPreArr = ['DarkContrastBackground', 'DesaturateBackground', 'InvertBackground', 'HighSaturationBackground', 'LowSaturationBackground']
            for (let i = 0; i < colorPreArr.length; i++) {
                if (item.classList.contains(colorPreArr[i])) {
                    colorPresetToDefault()
                }
            }

            item.classList.contains('ToggleHighlightLinks') && $('#ToggleHighlightLinks').prop('checked', false).trigger('change')
            item.classList.contains('ToggleReadingMask') && $('#ToggleReadingMask').prop('checked', false).trigger('change')
            item.classList.contains('ToggleTTS_click') && $('#ToggleTTS_click').prop('checked', false).trigger('change')
            item.classList.contains('ToggleImageDescription') && $('#ToggleImageDescription').prop('checked', false).trigger('change')

            if (item.classList.contains('ToggleHighlightHover')) {
                $('#ToggleHighlightHover').prop('checked', false).trigger('change')
                widgetItemObj.isHighlighted = false
            }

            if (item.classList.contains('ToggleSeizure')) {
                $('#ToggleSeizure').prop('checked', false).trigger('change')
                widgetItemObj.isSeizureSafe = false
            }

            if (item.classList.contains('ToggleTextMagnifier')) {
                $('#ToggleTextMagnifier').prop('checked', false).trigger('change')
                widgetItemObj.isTextMag = false
            }

            if (item.classList.contains('ToggleReadingGuide')) {
                $('#ToggleReadingGuide').prop('checked', false).trigger('change')
                widgetItemObj.isReadingGuide = false
            }

            if (item.classList.contains('FontSizeMedium')) {
                restoreDefaultOnClick('fontSizeMedium', 'FontSizeCookie', widgetItemObj.isFontBig, ['FontSizeMedium'], '#ADA_widget #FS_Default')
                widgetItemObj.isFontBig = false
            }

            if (item.classList.contains('Cursor_Enlarge_option')) {
                restoreDefaultOnClick('Cursor_Enlarge', 'CursorEnlargeCookie', widgetItemObj.isCursorBig, ['Cursor_Enlarge_option'], '#ADA_widget #Cur_Default')
                widgetItemObj.isCursorBig = false
            }
            item.classList.contains('ColorPicker') && resetBackgroundClicker()
            item.classList.contains('letter_spacing') && restoreSpacingDefault('#letter_spacing', ['letter_spacing'])
            item.classList.contains('word_spacing') && restoreSpacingDefault('#word_spacing', ['word_spacing'])
            item.classList.contains('line_height') && restoreSpacingDefault('#line_height', ['line_height'])

            if (item.classList.contains('FontTypeDyslexic')) {
                restoreDefaultOnClick('DyslexicFont', 'DyslexicFontCookie', widgetItemObj.isDyslexicFont, ['FontTypeDyslexic', 'FontTypeBaskerville'], '#ADA_widget #FT_Default')
                $.cookie('FM_FontTypeCookie', null, { path: '/' });
                widgetItemObj.isDyslexicFont = false
                widgetItemObj.isFontChanged = false
            }
            if (item.classList.contains('FontTypeBaskerville')) {
                restoreDefaultOnClick('BaskervilleFont', 'BaskervilleFontCookie', widgetItemObj.isBaskervilleFont, ['FontTypeDyslexic', 'FontTypeBaskerville'], '#ADA_widget #FT_Default')
                $.cookie('FM_FontTypeCookie', null, { path: '/' });
                widgetItemObj.isBaskervilleFont = false
                widgetItemObj.isFontChanged = false
            }

        })
    })


}


const addWidgetControlsOnLoad = () => {
    widgetItemObj.isHighlighted && addWidgetControls('ToggleHighlightHover', 'Highlight on hover')
    widgetItemObj.isOutlined && addWidgetControls('ToggleHighlightLinks', 'Highlight all links')
    widgetItemObj.isTextMag && addWidgetControls('ToggleTextMagnifier', 'Magnify text')
    widgetItemObj.isImgMag && addWidgetControls('ToggleImageDescription', 'Image description')
    widgetItemObj.isSeizureSafe && addWidgetControls('ToggleSeizure', 'Seizure safe')
    widgetItemObj.isReadingMask && addWidgetControls('ToggleReadingMask', 'Reading mask')
    widgetItemObj.isReadingGuide && addWidgetControls('ToggleReadingGuide', 'Reading guide')
    widgetItemObj.isSpeech && addWidgetControls('ToggleTTS_click', 'Text to speech')
    widgetItemObj.isLetterSpaceChanged && addWidgetControls('letter_spacing', 'Letter spacing')
    widgetItemObj.isWordSpaceChanged && addWidgetControls('word_spacing', 'Word spacing')
    widgetItemObj.isLineHeightChanged && addWidgetControls('line_height', 'Line height')
    if (widgetItemObj.isBackColorChanged || widgetItemObj.isTextChanged || widgetItemObj.isLinkColorChanged) {
        addWidgetControls('ColorPicker', 'Custom colors')
    }
    widgetItemObj.isDarkContrast && addWidgetControls('DarkContrastBackground', 'Dark contrast preset')
    widgetItemObj.isDesaturated && addWidgetControls('DesaturateBackground', 'Desaturate preset')
    widgetItemObj.isHighSat && addWidgetControls('HighSaturationBackground', 'High saturation')
    widgetItemObj.isLowSat && addWidgetControls('LowSaturationBackground', 'Low saturation')
    widgetItemObj.isInverted && addWidgetControls('InvertBackground', 'Inverted preset')
    widgetItemObj.isFontBig && addWidgetControls('FontSizeMedium', 'Change font size')
    widgetItemObj.isDyslexicFont && addWidgetControls('FontTypeDyslexic', 'Open-dyslexic font')
    widgetItemObj.isBaskervilleFont && addWidgetControls('FontTypeBaskerville', 'Libre-baskerville font')
    widgetItemObj.isCursorBig && addWidgetControls('Cursor_Enlarge_option', 'Change cursor')


}
addWidgetControlsOnLoad()


