
// reset modal ----------------------------->
const resetflourishModal = () => {
  const hasTrueValues = Object.values(widgetItemObj).some(val => val === true)
  if (!hasTrueValues) return;

  const { isHighlighted, isOutlined, isTextMag, isImgMag, isFontBig, isFontChanged, isCursorBig, isLineHeightChanged, isWordSpaceChanged, isLetterSpaceChanged, isDarkContrast, isDesaturated, isInverted, isHighSat, isLowSat, isTextColorChanged, isBackColorChanged, isLinkColorChanged, isPhotoSens, isReadingMask, isReadingGuide, isSpeech, isDyslexicFont, isBaskervilleFont, isTranslated
  } = widgetItemObj;

  const isBodyColorChanged = isTextColorChanged || isBackColorChanged || isLinkColorChanged
  const isPresetColorChanged = isDarkContrast || isDesaturated || isInverted || isHighSat || isLowSat

  if (isTextMag) {
    isTextMag && $('#ToggleTextMagnifier').prop('checked', false).trigger('change')
    restoreDefaultMagnify('text', '.text-magnify-color-swatch', '.text-magnify-size-input', textMagObj, '.text-magnifier-preview')
  }
  if (isImgMag) {
    isImgMag && $('#ToggleImageDescription').prop('checked', false).trigger('change')
    restoreDefaultMagnify('img', '.img-magnify-color-swatch', '.img-magnify-size-input', imgMagObj, '.img-magnifier-preview')
  }
  if (isReadingMask) {
    isReadingMask && $('#ToggleReadingMask').prop('checked', false).trigger('change')
    restoreDefaultMaskSettings()
  }
  if (isReadingGuide) {
    isReadingGuide && $('#ToggleReadingGuide').prop('checked', false).trigger('change')
    restoreDefaultguideSettings()
  }
  isHighlighted && $('#ToggleHighlightHover').prop('checked', false).trigger('change')
  isOutlined && $('#ToggleHighlightLinks').prop('checked', false).trigger('change')
  isPhotoSens && $('#TogglePhotoFilter').prop('checked', false).trigger('change')
  isSpeech && $('#ToggleTTS_click').prop('checked', false).trigger('change')
  isFontBig && restoreDefaultFontSize()
  isFontChanged && restoreDefaultFontType()
  isCursorBig && restoreDefaultCursorSize()
  isLetterSpaceChanged && restoreSpacingDefault('#letter_spacing', ['letter_spacing'])
  isWordSpaceChanged && restoreSpacingDefault('#word_spacing', ['word_spacing'])
  isLineHeightChanged && restoreSpacingDefault('#line_height', ['line_height'])
  isPresetColorChanged && colorPresetToDefault()
  isBodyColorChanged && resetColorPicker()

  isTranslated && dismissGoogleTranslate()

  removeAllCookies()

  //  $(".audio_state").hide()
}

let resetIcon = document.getElementById('reset-flourish')
resetIcon.addEventListener('click', () => {
  resetflourishModal()
})

//   {
//     "isHighlighted": false,
//     "isOutlined": false,
//     "isTextMag": false,
//     "isImgMag": false,
//     "isFontBig": false,
//     "isFontChanged": false,
//     "isCursorBig": false,
//     "isLineHeightChanged": false,
//     "isWordSpaceChanged": false,
//     "isLetterSpaceChanged": false,
//     "isDarkContrast": false,
//     "isDesaturated": false,
//     "isInverted": false,
//     "isHighSat": false,
//     "isLowSat": false,
//     "isTextColorChanged": false,
//     "isBackColorChanged": false,
//     "isLinkColorChanged": false,
//     "isPhotoSens": false,
//     "isReadingMask": false,
//     "isReadingGuide": false,
//     "isSpeech": false,
//     "isDyslexicFont": false,
//     "isBaskervilleFont": false,
//     "isTranslated": false
// }