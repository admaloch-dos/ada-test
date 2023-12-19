
// Toggle Text-to-Speech click
$(function () {
  $('[id="ToggleTTS_click"]').change(function () {
    if ($(this).is(':checked')) {
      toggleSpeechOn()
      createSpeechItems()
      speechItemHandler()
    } else {
      toggleSpeechOff()
    }
    checkIfWidgetActive()
  });
});

const toggleSpeechOn = () => {
  $(".audio_state").hide()
  $("body").addClass("TTS_click_enabled");
  $(".audio_state").fadeIn(600)
  $("#speech-settings").removeClass("disable");
  $('#reset-voice-settings').fadeIn()
  addWidgetControls('ToggleTTS_click', 'Text to speech')
  widgetItemObj.isSpeech = true
}

const toggleSpeechOff = () => {
  $("#speech-settings").addClass("disable");
  $('#reset-voice-settings').fadeOut()
  $(".audio_state").fadeOut(500)
  setTimeout(() => {
    $("body").removeClass("TTS_click_enabled");
    $.cookie('TTS_click_enabled', 'false');
    removeAudioState()
  }, 500);
  removeWidgetControls(['ToggleTTS_click'])
  widgetItemObj.isSpeech = false
}



// reset all speech players to default volume icon
const resetSpeech = () => {
  synth.cancel();
  $(".trigger-audio").each(function (index) {
    if ($(this).hasClass('play-pause')) {
      $(this).addClass('inactive-item')
      $(this).removeClass('audio-paused audio-playing curr-active-item')
      $(this).addClass('audio-inactive ')
      $(this).children('.trigger-audio-icon').eq(0).attr("src", "./flourish/img/trigger-audio.svg");
    } else {
      $(this).addClass('d-none')
    }
  });
}

const createSpeechItems = () => {
  addAudioPlayers()
  addAudioPlayerContainer()
  removeParagraphLinks()
}

const addAudioPlayers = () => {
  $('p, h1, h2, h3, h4, h5, h6, button, td, th, label, strong, a, li, span').not("#language-btn-modal-header *").each(function () {
    const itemDisplay = window.getComputedStyle(this, null).display
    const itemOpacity = window.getComputedStyle(this, null).opacity
    const currTextItem = $(this).text()
    const itemType = this.nodeName

    if (currTextItem && currTextItem.replaceAll(/\s/g, '') !== '' && itemDisplay !== 'none' && itemOpacity !== '0') {
      if (itemType === 'SPAN' || itemType === 'LI') {
        if (!this.firstElementChild) {
          $('<div class="audio_state">\
            <button class="trigger-audio play-pause inactive-item audio-inactive" title="Trigger audio"><img alt="Text-to-speech icon"  class="trigger-audio-icon" src="./flourish/img/trigger-audio.svg" alt="trigger speech"></button>\<button class="trigger-audio reset-audio-btn d-none" title="Cancel"><img  src="./flourish/img/reset.png" alt="Reset text-to-speech icon"></button>\</div>').insertAfter(this);
        }
      } else {
        $('<div class="audio_state">\
      <button class="trigger-audio play-pause inactive-item audio-inactive" title="Trigger audio"><img alt="Text-to-speech icon"  class="trigger-audio-icon" src="./flourish/img/trigger-audio.svg" alt="trigger speech"></button>\<button class="trigger-audio reset-audio-btn d-none" title="Cancel"><img  src="./flourish/img/reset.png" alt="Reset text-to-speech icon"></button>\</div>').insertAfter(this);
      }
    }
  })
}

const addAudioPlayerContainer = () => {
  $('div.audio_state').each(function () {
    $(this)
      .prev()
      .addBack()
      .wrapAll('<section class="TTS_content"></section>');
  });
}

const removeParagraphLinks = () => {
  document.querySelectorAll('p').forEach(item => {
    item.querySelectorAll('a').forEach((link, i) => {
      if (link) {
        let ttsParent = link.closest('.TTS_content')
        if (ttsParent) {
          let audioItem = ttsParent.querySelector('.audio_state')
          if (audioItem) {
            audioItem.style.display = 'none'
          }
        }
      }
    })
  })
}

/***** handler for speech items -- the speech btn and the play/pause/reset all have trigger audio class.. tehse conditionals test whcih one is which *****/
const speechItemHandler = () => {
  let speechInterval
  $('div.audio_state .trigger-audio').each(function (index) {
    $(this).click(function (e) {
      clearInterval(speechInterval)
      if ($(this).hasClass('play-pause')) {
        if (!$(this).hasClass('curr-active-item') && !$(this).hasClass('reset-audio-btn')) {
          console.log('item activated and auto played. press pause to pause audio')
          resetSpeech()
          $(this).children('.trigger-audio-icon').eq(0).attr("src", "./flourish/img/pause.png");
          $(this).addClass('curr-active-item')
          $(this).removeClass('inactive-item')
          $(this).closest('.audio_state').children('.reset-audio-btn').eq(0).removeClass('d-none')
        }
        if ($(this).hasClass('audio-playing')) {
          console.log('pressed pause button -- press play to continue')
          // console.log(synth)
          $(this).removeClass('audio-inactive audio-playing')
          $(this).addClass('audio-paused')
          $(this).children('.trigger-audio-icon').eq(0).attr("src", "./flourish/img/play.png");
          synth.pause()
          speechInterval = setInterval(() => {

              console.log('15 sec pause hack just ran')
              speechSynthesis.resume();
              speechSynthesis.pause()


          }, 14000);

        } else if ($(this).hasClass('audio-inactive')) {
          console.log('pressed play btn.. audio was inactive and will now play from the beginning. press pause to pause')
          $(this).children('.trigger-audio-icon').eq(0).attr("src", "./flourish/img/pause.png");
          $(this).removeClass('audio-inactive audio-paused')
          $(this).addClass('audio-playing')
          synth.cancel();
          ssu.text = $(this).parent("div.audio_state").prev("p, h1, h2, h3, h4, h5, h6, button, span, td, th, label, a, strong, li").text();
          ssu.volume = parseFloat(volumeInput.value / 10);
          ssu.rate = parseFloat(rateInput.value / 5);
          ssu.pitch = parseFloat(pitchInput.value / 5 + .01);
          if (voiceSelect.value) {
            ssu.voice = speechSynthesis.getVoices().filter(function (voice) {
              synth.cancel();
              $(this).removeClass('audio-paused audio-playing')
              $(this).addClass('audio-inactive ')
              return voice.name == voiceSelect.value;
            })[0];
          }
          $(this).addClass('audio-playing')
          synth.speak(ssu);

          speechInterval = setInterval(() => {
            if (!speechSynthesis.speaking) {
              clearInterval(speechInterval);
            } else {
              console.log('15 sec play hack just ran')
              speechSynthesis.pause();
              speechSynthesis.resume();
            }
          }, 14000);
          ssu.addEventListener("end", (event) => {
            console.log('audio ended and is now reset. Press play to start from the beginning')
            synth.cancel();
            if ($(this).hasClass('curr-active-item')) {
              $(this).removeClass('audio-paused audio-playing')
              $(this).addClass('audio-inactive ')
              $(this).children('.trigger-audio-icon').eq(0).attr("src", "./flourish/img/play.png");
            }
          });

        } else if ($(this).hasClass('audio-paused')) {
          console.log('play btn pressed to resume active audio. press pause to pause')
          console.log(synth)

          $(this).children('.trigger-audio-icon').eq(0).attr("src", "./flourish/img/pause.png");
          $(this).removeClass('audio-inactive audio-paused')
          $(this).addClass('audio-playing')
          synth.resume()

        }
      } else {
        console.log('reset btn clicked. Click play to restart from the beginning')
        synth.cancel()
        $(this).siblings('.play-pause').removeClass('audio-paused audio-playing')
        $(this).siblings('.play-pause').addClass('audio-inactive')
        $(this).siblings('.play-pause').children('.trigger-audio-icon').eq(0).attr("src", "./flourish/img/play.png");
      }
      e.stopPropagation()
      // fixBug2(this)
      // fixSpeechBug(this)



    });
  });
}

const fixSpeechBug = (input) => {
  let r = setInterval(() => {
    if (!synth.speaking || $(input).hasClass('audio-paused')) {
      clearInterval(r);

    } else if (synth.speaking || !$(input).hasClass('audio-paused')) {
      synth.pause();
      synth.resume();
    }
  }, 14000);
}


const fixBug2 = (input) => {
  let timer
  ssu.onstart = () => {
    // detection is up to you for this article as
    // this is an own huge topic for itself
    const currOS = getOS()
    if (currOS !== 'Android') {
      resumeInfinity(ssu)
    }
  }

  const clear = () => { clearTimeout(timer) }

  ssu.onerror = clear
  ssu.onend = clear

  const resumeInfinity = (target) => {
    if ($(input).hasClass('audio-paused')) {
      console.log('it is paused')
      return clear()
    }
    else {
      // if (!target && timer) { return clear() }

      synth.pause()
      synth.resume()

      timer = setTimeout(function () {
        resumeInfinity(target)
      }, 5000)
    }

    // prevent memory-leak in case ssu is deleted, while this is ongoing

  }
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

document.querySelectorAll('.lang-filter').forEach(item => {
  item.addEventListener('click', () => {
    resetTextToSpeech()
  })
})

document.querySelector('#flourish-more-languages-btn').addEventListener('click', () => {
  resetTextToSpeech()
})

const speechCookieHandler = () => {
  if ($.cookie('TTS_click_enabled') === 'true') {
    triggerSpeechToggle('true')
  }
}

const triggerSpeechToggle = (value) => {
  const e = new Event("change");
  const element = document.querySelector("#ToggleTTS_click")
  element.value = value;
  element.dispatchEvent(e);
  $("#speech-settings").removeClass("disable");
}

const resetTextToSpeech = () => {
  if (document.body.classList.contains('TTS_click_enabled')) {
    $('#ToggleTTS_click').prop('checked', false).trigger('change')
    setTimeout(() => {
      $('#ToggleTTS_click').prop('checked', true).trigger('change')
    }, 600)
  }
}

setTimeout(() => {
  speechCookieHandler()
}, 300)
