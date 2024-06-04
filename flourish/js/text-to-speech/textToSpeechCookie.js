const speechCookieHandler = () => {
    const screenReaderAria = document.createElement('div')
    screenReaderAria.id = 'ttsInstructions'
    screenReaderAria.setAttribute('aria-live', 'assertive')
    if ($.cookie('TTS_click_enabled') === 'true') {
      triggerSpeechToggle('true')
      screenReaderAria.innerText = 'Text-to-Speech feature is currently active. Press Shift + 8 to disable it.';
    } else {
      screenReaderAria.innerText = 'Text-to-Speech feature is not currently active. Press Shift + 8 to enable it';
    }
    document.body.prepend(screenReaderAria)
  }

  setTimeout(() => {
    speechCookieHandler()
  }, 300)