
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
    // console.log(this.value)
    checkIfWidgetActive()
  });
});





const toggleSpeechOn = () => {
  $(".audio_state").hide()
  $("body").addClass("TTS_click_enabled");
  $(".audio_state").fadeIn(600)
  $("#speech-settings").removeClass("disable");
  $('#reset-voice-settings').fadeIn()
  // $("#speech-settings").removeClass("disable-settings");
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

  $('p, h1, h2, h3, h4, h5, h6, a, button, span, td, th').not("#language-btn-modal-header *").each(function () {
    const currTextItem = $(this).text()
    if (currTextItem.replaceAll(/\s/g, '') !== '') {
      console.log(currTextItem)
      $('<div class="audio_state">\
      <button class="trigger-audio play-pause inactive-item audio-inactive" title="Trigger audio"><img alt="Text-to-speech icon"  class="trigger-audio-icon" src="./flourish/img/trigger-audio.svg" alt="trigger speech"></button>\<button class="trigger-audio reset-audio-btn d-none" title="Cancel"><img  src="./flourish/img/reset.png" alt="Reset text-to-speech icon"></button>\</div>').insertAfter(this);
    }
  });
  $('div.audio_state').each(function () {
    $(this)
      .prev()
      .addBack()
      .wrapAll('<section class="TTS_content"></section>');
  });
}

/***** handler for speech items -- the speech btn and the play/pause/reset all have trigger audio class.. tehse conditionals test whcih one is which *****/
const speechItemHandler = () => {
  $('div.audio_state .trigger-audio').each(function (index) {
    const text =
      $(this).click(function (e) {
        if ($(this).hasClass('play-pause')) {
          if (!$(this).hasClass('curr-active-item') && !$(this).hasClass('reset-audio-btn')) {
            console.log('if it itsnt curently active')
            resetSpeech()
            $(this).children('.trigger-audio-icon').eq(0).attr("src", "./flourish/img/pause.png");
            $(this).addClass('curr-active-item')
            $(this).removeClass('inactive-item')
            $(this).closest('.audio_state').children('.reset-audio-btn').eq(0).removeClass('d-none')
          }
          if ($(this).hasClass('audio-playing')) {
            console.log('if it has audio playing class')
            $(this).removeClass('audio-inactive audio-playing')
            $(this).addClass('audio-paused')
            $(this).children('.trigger-audio-icon').eq(0).attr("src", "./flourish/img/play.png");
            synth.pause()
          } else if ($(this).hasClass('audio-inactive')) {
            console.log('if it has audio inactive ')
            $(this).children('.trigger-audio-icon').eq(0).attr("src", "./flourish/img/pause.png");
            $(this).removeClass('audio-inactive audio-paused')
            $(this).addClass('audio-playing')
            synth.cancel();
            ssu.text = $(this).parent("div.audio_state").prev("p, h1, h2, h3, h4, h5, h6, a, button, span, td, th, li").text();
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
            ssu.addEventListener("end", (event) => {
              synth.cancel();
              if ($(this).hasClass('curr-active-item')) {
                $(this).removeClass('audio-paused audio-playing')
                $(this).addClass('audio-inactive ')
                $(this).children('.trigger-audio-icon').eq(0).attr("src", "./flourish/img/play.png");
              }
            });
          } else if ($(this).hasClass('audio-paused')) {
            console.log('if it has audio paused ran')
            $(this).children('.trigger-audio-icon').eq(0).attr("src", "./flourish/img/pause.png");
            $(this).removeClass('audio-inactive audio-paused')
            $(this).addClass('audio-playing')
            synth.resume()
          }
        } else {
          synth.cancel()
          $(this).siblings('.play-pause').removeClass('audio-paused audio-playing')
          $(this).siblings('.play-pause').addClass('audio-inactive')
          $(this).siblings('.play-pause').children('.trigger-audio-icon').eq(0).attr("src", "./flourish/img/play.png");
        }
        e.stopPropagation()
      });
  });
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







// $(document).ready(function () {

//   $("input.switch-input[type=checkbox]").each(function () {
//     //get name of input
//     var name = $(this).attr('name');
//     if ($.cookie(name) && $.cookie(name) == "true") {
//       $(this).prop('checked', $.cookie(name));
//       $("body").addClass(name);

//       //If ToggleTTS_click is checked
//       if ($('[id="ToggleTTS_click"]').is(':checked')) {
//         $("body").addClass("TTS_click_enabled");
//       }


//     }// end of if
//   });//end of each
//   // event management
//   $("input.switch-input[type=checkbox]").change(function () {
//     var name = $(this).attr("name");
//     $.cookie(name, $(this).prop('checked'), { expires: 30, })
//   });
// });



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
    keyTogglerFunc('#ToggleTTS_click')
    setTimeout(() => {
      keyTogglerFunc('#ToggleTTS_click')
    }, 600)
  }


}

setTimeout(() => {
  speechCookieHandler()
}, 300)
