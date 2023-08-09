// func to toggle certain items with kiey commands
const keyTogglerFunc = (itemId) => {
    if ($(itemId).is(':checked')) {
      $(itemId).prop('checked', false).trigger('change');
    } else {
      $(itemId).prop('checked', true).trigger('change');
    }
  }



  // toggle toggle-based items can be toggled with key commands - and reset and open modal
  //shift + 1-8
  document.addEventListener('keydown', (event) => {
    var name = event.key;
    if (name === 'Shift') return
    if (event.shiftKey) {
      name === "!" && keyTogglerFunc('#ToggleHighlightHover')
      name === "@" && keyTogglerFunc('#ToggleHighlightLinks')
      name === "#" && keyTogglerFunc('#ToggleTextMagnifier')
      name === "$" && keyTogglerFunc('#ToggleImageDescription')
      name === '%' && keyTogglerFunc('#ToggleSeizure')
      name === "^" && keyTogglerFunc('#ToggleReadingMask')
      name === '&' && keyTogglerFunc('#ToggleReadingGuide')
      name === '*' && keyTogglerFunc('#ToggleTTS_click')
      name === 'Q' && resetAdaModal()
      name === 'A' && displayModal()

    } else {
      return;
    }
  }, false);