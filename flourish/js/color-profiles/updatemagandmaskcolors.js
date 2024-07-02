// text/img magnify, reading mask/guide need to change colors when background colors change
const changeMagAndMaskColor = (colorInput) => {
  let magColorNum = 1
  let color = '#000000'

  if (colorInput === 'white') {
    magColorNum = 4
    color = '#FFFFFF'
  } else if (colorInput === 'black') {
    magColorNum = 1
    color = '#000000'
  }

  if (!$.cookie('text-magnify-color-swatch')
    || $.cookie('text-magnify-color-swatch') === 'text-mag-color-1'
    || $.cookie('text-magnify-color-swatch') === 'text-mag-color-4') {
    document.querySelector(`#text-mag-color-${magColorNum}`).click()
  }
  if (!$.cookie('img-magnify-color-swatch')
    || $.cookie('img-magnify-color-swatch') === 'img-mag-color-1'
    || $.cookie('img-magnify-color-swatch') === 'img-mag-color-4') {
    document.querySelector(`#img-mag-color-${magColorNum}`).click()
  }
  if (!$.cookie('readingMaskColor')
    || $.cookie('readingMaskColor') === '#ffffff'
    || $.cookie('readingMaskColor') === '#000000') {
    triggerEventFunc('#mask_color', color)
    triggerEventFunc('#reading-mask-opacity', '.66')
  }
  if (!$.cookie('readingGuideColor')
    || $.cookie('readingGuideColor') === '#ffffff'
    || $.cookie('readingGuideColor') === '#000000') {
    triggerEventFunc('#guide_color', color)
  }
}