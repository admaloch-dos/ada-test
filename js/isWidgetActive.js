
// check if widget items eval to true if so  fade in helper box
const checkIfWidgetActive = () => {
    if (Object.values(widgetItemObj).indexOf(true) > -1) {
        isWidgetActive = true

        $('#ADA_check_icon').fadeIn()
        $('#toggle-ada-list, #reset-ada').fadeIn()


    } else {
        isWidgetActive = false

        $('#ADA_check_icon').fadeOut()
        $('#toggle-ada-list, #reset-ada, #item-delete-container').fadeOut()
        $("#toggle-ada-list").removeClass("fa-toggle-on");
        $("#toggle-ada-list").addClass("fa-toggle-off");


    }
    // console.log('isWidgetActive just ran and it is currently', isWidgetActive)
}
checkIfWidgetActive()

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
    // console.log('isWidgetActive = ', isWidgetActive)
    // console.log('widgetItemObj = ', widgetItemObj)

}

const removeWidgetControls = (itemArr) => {
    itemArr.forEach(item => {
        $(`li.${item}`).fadeOut()
        setTimeout(() => {
            $(`li.${item}`).remove();
        }, 300);
    });
    checkIfWidgetActive()
    // console.log('isWidgetActive = ', isWidgetActive)
    // console.log('widgetItemObj = ', widgetItemObj)
}

const closeItemHandler = (closeItems) => {
    closeItems.forEach(item => {
        item.addEventListener('click', (e) => {

            item.classList.contains('ToggleHighlightHover') && $('#ToggleHighlightHover').prop('checked', false).trigger('change')
            item.classList.contains('ToggleHighlightLinks') && $('#ToggleHighlightLinks').prop('checked', false).trigger('change')
            item.classList.contains('ToggleTextMagnifier') && $('#ToggleTextMagnifier').prop('checked', false).trigger('change')
            item.classList.contains('ToggleImageDescription') && $('#ToggleImageDescription').prop('checked', false).trigger('change')
            item.classList.contains('ToggleSeizure') && $('#ToggleSeizure').prop('checked', false).trigger('change')
            item.classList.contains('ToggleReadingMask') && $('#ToggleReadingMask').prop('checked', false).trigger('change')
            item.classList.contains('ToggleReadingGuide') && $('#ToggleReadingGuide').prop('checked', false).trigger('change')
            item.classList.contains('ToggleTTS_click') && $('#ToggleTTS_click').prop('checked', false).trigger('change')
            item.classList.contains('FontSizeMedium') && restoreDefaultFontSize()
            item.classList.contains('ColorPicker') && resetColorPicker()
            item.classList.contains('letter_spacing') && restoreSpacingDefault('#letter_spacing', ['letter_spacing'])
            item.classList.contains('word_spacing') && restoreSpacingDefault('#word_spacing', ['word_spacing'])
            item.classList.contains('line_height') && restoreSpacingDefault('#line_height', ['line_height'])
            item.classList.contains('Cursor_Enlarge_option') && restoreDefaultCursorSize()
            let colorPreArr = ['DarkContrastBackground', 'DesaturateBackground', 'InvertBackground', 'HighSaturationBackground', 'LowSaturationBackground']
            for (let i = 0; i < colorPreArr.length; i++) {
                if (item.classList.contains(colorPreArr[i])) {
                    colorPresetToDefault()
                }
            }
            if (item.classList.contains('FontTypeDyslexic') || item.classList.contains('FontTypeBaskerville')) {
                restoreDefaultFontType()
            }
        })
    })

}

const addWidgetControlsOnLoad = () => {
    widgetItemObj.isHighlighted && addWidgetControls('ToggleHighlightHover', 'Highlight on hover')
    widgetItemObj.isOutlined && addWidgetControls('ToggleHighlightLinks', 'Highlight all links')



    widgetItemObj.isImgMag && addWidgetControls('ToggleImageDescription', 'Image description')
    widgetItemObj.isSeizureSafe && addWidgetControls('ToggleSeizure', 'Seizure safe')
    widgetItemObj.isReadingMask && addWidgetControls('ToggleReadingMask', 'Reading mask')
    widgetItemObj.isReadingGuide && addWidgetControls('ToggleReadingGuide', 'Reading guide')
    widgetItemObj.isSpeech && addWidgetControls('ToggleTTS_click', 'Text to speech')
    widgetItemObj.isLetterSpaceChanged && addWidgetControls('letter_spacing', 'Letter spacing')
    widgetItemObj.isWordSpaceChanged && addWidgetControls('word_spacing', 'Word spacing')
    widgetItemObj.isLineHeightChanged && addWidgetControls('line_height', 'Line height')
    if (widgetItemObj.isBackColorChanged || widgetItemObj.isTextColorChanged || widgetItemObj.isLinkColorChanged) {
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
    widgetItemObj.isTextMag && addWidgetControls('ToggleTextMagnifier', 'Magnify text')
}
addWidgetControlsOnLoad()