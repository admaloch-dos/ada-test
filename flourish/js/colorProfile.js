
// website color profile section ---------------------------------->
const colorSchemeArr = [
    {
      id: 'DarkContrastBackground',
      class_: 'highcontrast',
      location: 'body',
      maskColor: '#ffffff',
      colorPickerReset: true,
      activeItemText: 'Dark contrast preset',
      activeItemObj: 'isDarkContrast',
    },
    {
      id: 'DesaturateBackground',
      class_: 'desaturated',
      location: 'body',
      maskColor: '#363636',
      colorPickerReset: true,
      activeItemText: 'Desaturate preset',
      activeItemObj: 'isDesaturated',
    },
    {
      id: 'InvertBackground',
      class_: 'inverted',
      location: 'body',
      maskColor: '#ffffff',
      colorPickerReset: true,
      activeItemText: 'Inverted preset',
      activeItemObj: 'isInverted',
    },
    {
      id: 'HighSaturationBackground',
      class_: 'highsaturation',
      location: 'html',
      maskColor: '#363636',
      colorPickerReset: false,
      activeItemText: 'High saturation',
      activeItemObj: 'isHighSat',
    },
    {
      id: 'LowSaturationBackground',
      class_: 'lowsaturation',
      location: 'html',
      maskColor: '#363636',
      colorPickerReset: false,
      activeItemText: 'Low saturation',
      activeItemObj: 'isLowSat',
    },
  ]

  const makeColorPresetsFalse = (presetArr) => {
    for (let i = 0; i < presetArr.length; i++) {
      presetArr[i] = false
    }
  }


  const maskColorPresetChangeHandler = (color) => {
    if (!$.cookie('readingMaskColor')) {
      changeColorPicker(color, '.reading-mask', '#mask_hexVal', "#mask_color")
      let defaultOpacity = '.5'
      if (color === '#ffffff') {
        defaultOpacity = '.7'
      }
      $('#reading-mask-opacity').val(defaultOpacity);
      $(".reading-mask").css({ "opacity": defaultOpacity })
    }
    if (!$.cookie('readingGuideColor')) {
      changeColorPicker(color, '#tail', '#guide_hexVal', "#guide_color")
    }
  }

  const disableColorPicker = () => {
    $('#DarkContrastBG_option').removeClass('disable-colors')
    $('#DesaturateBG_option').removeClass('disable-colors')
    $('#InvertBG_option').removeClass('disable-colors')
    $('#ColorAdjust_option').addClass('disable-colors')
  }
  const enableColorPicker = () => {
    $('#ColorAdjust_option').removeClass('disable-colors')
  }

  const changeTextMagColors = () => {
    const textColor = $.cookie('text-magnify-color-swatch')
    const imgColor = $.cookie('img-magnify-color-swatch')
    restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
    restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')

  }

  const colorPresetToDefault = () => {
    maskColorPresetChangeHandler('#363636')
    $('#ColorAdjust_option').removeClass('disable-colors')
    restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
    restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')
    for (let i = 0; i < colorSchemeArr.length; i++) {
      const { id, class_, location, activeItemObj } = colorSchemeArr[i]
      widgetItemObj[activeItemObj] = false
      $.removeCookie(id);
      removeWidgetControls([id])
      $(location).removeClass(class_);
      $("#DefaultBG_option").addClass('active').siblings().removeClass('active');
    }
  }

  const colorPresetHandler = (currItemId) => {
    const currItemTag = `#${currItemId}`
    $(currItemTag).parent().addClass('active').siblings().removeClass('active');
    if (currItemId === 'defaultBackground') {
      colorPresetToDefault()
    } else {
      for (let i = 0; i < colorSchemeArr.length; i++) {
        const { id, class_, location, activeItemText, activeItemObj, maskColor, colorPickerReset } = colorSchemeArr[i]
        if (id === currItemId) {
          if (colorPickerReset) {
            resetColorPicker()
            disableColorPicker()
          } else {
            enableColorPicker()
          }
          widgetItemObj[activeItemObj] = true
          $.cookie(id, 'yes', { expires: 30 });
          addWidgetControls(id, activeItemText)
          $(location).addClass(class_);
          maskColorPresetChangeHandler(maskColor)
          restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
          restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')
        } else {
          widgetItemObj[activeItemObj] = false
          $.removeCookie(id);
          removeWidgetControls([id])
          $(location).removeClass(class_);
        }
        checkIfWidgetActive()
      }
    }

  }

  for (let i = 0; i < colorSchemeArr.length; i++) {
    if ($.cookie(colorSchemeArr[i].id) == "yes") {
      colorPresetHandler(colorSchemeArr[i].id)
      setTimeout(() => {
        $("#DefaultBG_option").removeClass('active')
      }, 300)

    }
  }

  const colorPresetOptions = document.querySelectorAll('.backgroundOptions')
  colorPresetOptions.forEach(preset => {
    preset.addEventListener('click', () => {
      colorPresetHandler(preset.id)
    })
  })