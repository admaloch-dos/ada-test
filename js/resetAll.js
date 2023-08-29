const resetAdaModal = () => {

    $('#ToggleHighlightHover').prop('checked', false).trigger('change')
    $('#ToggleHighlightLinks').prop('checked', false).trigger('change')
    $('#ToggleTextMagnifier').prop('checked', false).trigger('change')
    $('#ToggleImageDescription').prop('checked', false).trigger('change')
    $('#ToggleSeizure').prop('checked', false).trigger('change')
    $('#ToggleReadingMask').prop('checked', false).trigger('change')
    $('#ToggleReadingGuide').prop('checked', false).trigger('change')
    $('#ToggleTTS_click').prop('checked', false).trigger('change')
    restoreDefaultFontSize()
    restoreDefaultFontType()
    restoreDefaultCursorSize()
    restoreSpacingDefault('#letter_spacing', ['letter_spacing'])
    restoreSpacingDefault('#word_spacing', ['word_spacing'])
    restoreSpacingDefault('#line_height', ['line_height'])
    colorPresetToDefault()
    if (widgetItemObj.isBackColorChanged || widgetItemObj.isTextColorChanged || widgetItemObj.isLinkColorChanged) {
        resetColorPicker()
    }
    restoreDefaultMaskSettings()
    restoreDefaultguideSettings()
    dismissGoogleTranslate()


    restoreDefaultMagnify('text', '.text-magnify-color-swatch', '#text-magnify-size-input', textMagObj)
    restoreDefaultMagnify('img', '.img-magnify-color-swatch', '#img-magnify-size-input', imgMagObj)
    removeAllCookies()
    $.cookie("reading-mask-reload", false, { path: '/' });
    // restoreGoogleTransDefault()
}

let resetIcon = document.getElementById('reset-ada')
resetIcon.addEventListener('click', () => {
    resetAdaModal()
})