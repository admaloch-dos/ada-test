// main toggle/setup for text to speech
// Toggle Text-to-Speech click
$(function () {
  $('[id="ToggleTTS_click"]').change(function () {
    if ($(this).is(':checked')) {
      toggleSpeechOn()
    } else {
      toggleSpeechOff()
    }
  });
});

let voiceSelectCurrVal = ''

const toggleSpeechOn = () => {
  $(".audio_state").hide()
  $("body").addClass("TTS_click_enabled");
  $(".audio_state").fadeIn(600)
  $("#speech-settings").removeClass("disable");
  $('#reset-voice-settings').fadeIn()
  addWidgetControls('ToggleTTS_click', 'Text to speech')
  widgetItemObj.isSpeech = true
  addAudioPlayers('p, :header, button, td, th, label, strong, a, li, span, select')
  speechItemHandler()
  checkIfWidgetActive()
  if (document.getElementById('ttsInstructions')) {
    document.getElementById('ttsInstructions').innerText = 'Text-to-Speech is active. Press Shift + 8 to toggle it back on.';
  }
}

const toggleSpeechOff = () => {
  $("#speech-settings").addClass("disable");
  $('#reset-voice-settings').fadeOut()
  $(".audio_state").hide()
  $("body").removeClass("TTS_click_enabled");
  $.cookie('TTS_click_enabled', 'false');
  removeAudioState()
  removeWidgetControls(['ToggleTTS_click'])
  widgetItemObj.isSpeech = false
  checkIfWidgetActive()
  document.getElementById('ttsInstructions').innerText = 'Text to speech is inactive. Press Shift + 8 to toggle it back on.';

}

const removeAudioState = () => {
  document.querySelectorAll('.audio_state').forEach(item => {
    item.remove()
  })
  document.querySelectorAll('.TTS_content').forEach(item => {
    $(item).contents().unwrap();
  })
}

$("#Flourish_trigger").click(function () {
  resetSpeech()
});

// Cancels all utterances if the user leaves the site.
window.onbeforeunload = function (e) {
  resetSpeech()
};

function initSpeechSynthesis() {
  if (!('speechSynthesis' in window)) {
    alert("Sorry, your browser doesn't support text to speech!");
    return;
  }
  ssu = new SpeechSynthesisUtterance();
  ssu.lang = 'en-US';
};

document.querySelector('#flourish_reset').addEventListener('click', () => {
  fullVoiceReset()
  loadVoices()
})
document.querySelector('#reset-flourish').addEventListener('click', () => {
  fullVoiceReset()
  loadVoices()
})

document.querySelector('#flourish-more-languages-btn').addEventListener('click', () => {
  languageModalSpeechHandler('#all-languages-modal-content .translate-language-span')
})

document.querySelectorAll('.lang-filter').forEach(item => {
  item.addEventListener('click', () => {
    languageModalSpeechHandler('#all-languages-modal-content .translate-language-span, #all-languages-modal-content h5, #all-languages-modal-content h6')
  })
})

const languageModalSpeechHandler = (selectors) => {
  setTimeout(() => {
    if (document.body.classList.contains('TTS_click_enabled')) {
      addAudioPlayers(selectors)
      speechItemHandler()
    }
  }, 200)
}

