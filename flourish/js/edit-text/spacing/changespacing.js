
// letter spacing word spacing line height section --------------------->
const setSpacingCss = (value, css) => {
  $("body p").not('#flourish_widget, #flourish_widget *, i, div').css(css, value); //Selects everything inside body except flourish modal and
  $(".Footer").css(css, value);
}

const selectChangeHandler = (icon, iconClass, itemId) => {
  if (icon.classList.contains(iconClass)) {
    if (icon.classList.contains('plus-icon')) {
      $(itemId).next().prop('selected', true).trigger('change');
    }
    if (icon.classList.contains('minus-icon')) {
      $(itemId).prev().prop('selected', true).trigger('change');
    }
  }
}

document.querySelectorAll('.spacing-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    selectChangeHandler(icon, 'letter-spacing-icon', '#letter_spacing option:selected')
    selectChangeHandler(icon, 'word-spacing-icon', '#word_spacing option:selected')
    selectChangeHandler(icon, 'line-height-icon', '#line_height option:selected')
  })
})

const restoreSpacingDefault = (itemId, removeItemArr) => {
  $(itemId).prop("selectedIndex", 0).trigger('change');
  checkIfWidgetActive()
  removeWidgetControls(removeItemArr)
}

