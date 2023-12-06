
// text to speech section --------------------------------->
$(document).ready(function () {
    const resetSpeech = () => {
      $('.curr-active-item').removeClass('curr-active-item')
      $('.play').removeClass('audio-playing audio-paused')
      $('.play').addClass('audio-inactive')
      $('.play').find('.toggle-audio').attr("src", "./flourish/img/play.png").removeClass('pr-1').addClass('pr-0');
      synth.cancel();
    }
    var speechVol = $.cookie("speechVolCookie");
    const getCookieVal = (cookie) => {
      let value = 5
      if ($.cookie(cookie)) {
        value = $.cookie(cookie)
      }
      return value
    }
    let volValue = getCookieVal(speechVol)

    const updateSpeechCookies = (item, value) => {
      resetSpeech()
      $.cookie(item, value, { expires: 30 })
    }
    // round slider settings
    $("#volume").roundSlider({
      sliderType: "min-range",
      radius: 60,
      showTooltip: true,
      width: 10,
      value: volValue.speechVol ? volValue.speechVol : 5,
      step: 1,
      handleSize: 0,
      max: 10,
      min: 0,
      handleShape: "square",
      circleShape: "half-top",
      change: function (e) {
        updateSpeechCookies('speechVol', e.value)
      }
    });

    $("#rate").roundSlider({
      sliderType: "min-range",
      radius: 60,
      showTooltip: true,
      width: 10,
      value: volValue.speechRate ? volValue.speechRate : 5,
      step: 1,
      handleSize: 0,
      max: 10,
      min: 0,
      handleShape: "square",
      circleShape: "half-top",
      change: function (e) {
        updateSpeechCookies('speechRate', e.value)
      }
    });

    $("#pitch").roundSlider({
      sliderType: "min-range",
      radius: 60,
      showTooltip: true,
      width: 10,
      value: volValue.speechPitch ? volValue.speechPitch : 5,
      step: 1,
      handleSize: 0,
      max: 10,
      min: 0,
      handleShape: "square",
      circleShape: "half-top",
      change: function (e) {
        updateSpeechCookies('speechPitch', e.value)
      }
    });

    const resetVoiceSettings = () => {
      $("#volume").roundSlider({
        value: 5
      });
      $("#rate").roundSlider({
        value: 5
      });
      $("#pitch").roundSlider({
        value: 5
      });
    }

    const speechIcon = document.querySelectorAll('.speech-icon')
    speechIcon.forEach(icon => {
      icon.addEventListener('click', () => {
        let currValId = null;
        let currCookie = null;
        if (icon.classList.contains('speech-volume')) {
          currValId = '#volume'
          currCookie = 'speechVol'
        } else if (icon.classList.contains('speech-rate')) {
          currValId = '#rate'
          currCookie = 'speechRate'
        } else {
          currValId = '#pitch'
          currCookie = 'speechPitch'
        }
        let currRoundSlideValue = $(currValId).roundSlider("option", "value")
        if (icon.classList.contains('speech-plus-icon')) {
          $(currValId).roundSlider({ value: currRoundSlideValue + 1 });
          $.cookie(currCookie, currRoundSlideValue + 1, { expires: 30 })
        } else {
          $(currValId).roundSlider({ value: currRoundSlideValue - 1 });
          $.cookie(currCookie, currRoundSlideValue - 1, { expires: 30 })
        }
        resetSpeech()
      })
    })

    const fullVoiceReset = () => {
      $.removeCookie('voiceCookie');
      $.removeCookie('speechPitch');
      $.removeCookie('speechRate');
      $.removeCookie('speechVol');
      $(".audio_state").hide()
      resetVoiceSettings()
      resetSpeech()
      resetVoiceDefault()
    }

    document.querySelector('#reset-voice-btn').addEventListener('click', () => {
      fullVoiceReset()
    })

    $("#volume input").addClass("volume_selector");
    $("#rate input").addClass("rate_selector");
    $("#pitch input").addClass("pitch_selector");
    $("<span class='headings'>Volume</span>").appendTo("#volume");
    $("<span class='headings'>Rate</span>").appendTo("#rate");
    $("<span class='headings'>Pitch</span>").appendTo("#pitch");
    let ssu;
    var synth = window.speechSynthesis;
    var voiceSelect = document.getElementById('voice');
    var volumeInput = document.querySelector('.volume_selector');
    var rateInput = document.querySelector('.rate_selector');
    var pitchInput = document.querySelector('.pitch_selector');

    function loadVoices() {
      if (document.querySelector('#voice').length === 0) {
        var voiceList = speechSynthesis.getVoices();
        if (voiceList.length > 1) {
          voiceList.forEach(function (voice, i) {
            if (voice.name !== 'Google US English' &&
              voice.name !== 'Google UK English Male' &&
              voice.name !== 'Microsoft David - English (United States)' &&
              voice.name !== 'English United States' &&
              voice.name !== 'Daniel' &&
              voice.name !== 'Samantha' &&
              voice.name !== 'Microsoft Jenny Online (Natural) - English (United States)' &&
              voice.name !== 'Microsoft Steffan Online (Natural) - English (United States)' &&
              voice.name !== 'English (USA,DEFAULT)') {
              return
            }
            var option = document.createElement('option');
            option.value = voice.name;
            option.innerHTML = voice.name;
            voiceSelect.appendChild(option);
          });
          if (document.querySelector('#voice').length < 1) {
            voiceList.forEach(function (voice, i) {
              var option = document.createElement('option');
              option.value = voice.name;
              option.innerHTML = voice.name;
              voiceSelect.appendChild(option);
            });
          }
        } else {
          $('#voice-settings-header').hide()
        }
      }
    }

    synth.onvoiceschanged = function (e) {
      loadVoices();
    };

    $(document).ready(function () {
      initSpeechSynthesis();
    });

    $("#voice").on("change", function (e) {
      resetSpeech()
      let currVoice = $('#voice').find(":selected").text();
      var voiceCookie = $.cookie("speechVoiceCookie");
      $.cookie("voiceCookie", currVoice, { expires: 30 })
    });

    const resetVoiceDefault = () => {
      if ($("#voice option[value='Google US English']").length > 0) {
        return $("#voice").val('Google US English');
      } else {
        return $("#voice").val($("#voice option:first").val());
      }
    }

    setTimeout(() => {
      if ($.cookie("voiceCookie")) {
        let cookieValue = $.cookie("voiceCookie")
        $("#voice").val(cookieValue)
      } else {
        resetVoiceDefault()
      }
    }, 500);

    // click to create speech
    const htmlClickToSpeechFunc = (htmlElem) => {
      document.querySelectorAll(htmlElem).forEach(item => {
        item.addEventListener('click', () => {
          resetSpeech()
          removeElt()
          createAudioPlayer(item)
          playAudioHandler(htmlElem)
          $(".stop").on("click", function () {
            resetSpeech()
          });
        })
      })
    }

    // let speechTimer
    // const htmlClickToSpeechFunc = (htmlElem) => {

    //   document.querySelectorAll(htmlElem).forEach(item => {

    //     item.addEventListener('mouseenter', () => {
    //       clearTimeout(speechTimer)
    //       speechTimer = setTimeout(() => {
    //         resetSpeech()
    //         removeElt()
    //         createAudioPlayer(item)
    //         playAudioHandler(htmlElem)
    //         $(".stop").on("click", function () {
    //           resetSpeech()
    //         });
    //       }, 500)
    //     })
    //     item.addEventListener('mouseleave', () => {
    //       clearTimeout(speechTimer)
    //     })
    //   })
    // }

    const htmlClickArr = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label']
    $('#ToggleTTS_click').change(function () {
      if ($('#ToggleTTS_click').is(':checked')) {
        $(".audio_state").show()
        $("body").addClass("TTS_click_enabled");
        $("#speech-settings").removeClass("disable");
        $('#reset-voice-settings').css({ 'display': 'flex' }).hide().fadeIn()
        addWidgetControls('ToggleTTS_click', 'Text to speech')
        widgetItemObj.isSpeech = true
        for (let i = 0; i < htmlClickArr.length; i++) {
          htmlClickToSpeechFunc(htmlClickArr[i])
        }
      } else {
        $("#speech-settings").addClass("disable");
        $('#reset-voice-settings').fadeOut()
        $(".audio_state").hide()
        setTimeout(() => {
          $("body").removeClass("TTS_click_enabled");
          $.cookie('TTS_click_enabled', 'false');
        }, 500);
        removeWidgetControls(['ToggleTTS_click'])
        widgetItemObj.isSpeech = false
      }
      checkIfWidgetActive()
    })

    if ($.cookie('TTS_click_enabled') == "true") {
      $("#speech-settings").removeClass("disable");
      $('#ToggleTTS_click').prop('checked', false).trigger('change')
      setTimeout(() => {
        $('#ToggleTTS_click').prop('checked', true).trigger('change')
      }, 500)
    }

    const createAudioPlayer = (item) => {
      if (document.body.classList.contains('TTS_click_enabled')) {
        const audioState = document.createElement('div')
        audioState.classList.add('audio_state')
        audioState.style.opacity = 0
        setTimeout(() => {
          audioState.style.opacity = 1
        }, 100)
        audioState.innerHTML = `
        <button class="play btn audio-inactive" title="toggle-audio">
          <img class="toggle-audio" src="./flourish/img/play.png" alt="toggle speech icon">
        </button>
        <button class="stop btn " title="Restart audio">
          <img class="mr-1" src="./flourish/img/reset.png" alt="reset audio icon">
          Reset
        </button>
        `
        item.parentNode.insertBefore(audioState, item.nextSibling);
      }
    }

    function removeElt() {
      var elements = document.getElementsByClassName("audio_state");
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    }
    /***** ON Play CLICK *****/
    const playAudioHandler = (htmlElem) => {
      $('div.audio_state .play').each(function (index) {
        $(this).click(function () {
          if (!$(this).hasClass('curr-active-item')) {
            resetSpeech()
            $(this).addClass('curr-active-item')
          }
          $(this).find('.toggle-audio').attr("src", "./flourish/img/play.png").removeClass('pr-1').addClass('pr-0');
          if ($(this).hasClass('audio-playing')) {
            $(this).removeClass('audio-inactive audio-playing')
            $(this).addClass('audio-paused')
            synth.pause()
          } else {
            $(this).find('.toggle-audio').attr("src", "./flourish/img/pause.png").removeClass('pr-0').addClass('pr-1');
            if ($(this).hasClass('audio-inactive')) {
              $('.play').removeClass('audio-inactive audio-paused')
              synth.cancel();
              ssu.text = $(this).parent("div.audio_state").prev(htmlElem).text();
              ssu.volume = parseFloat(volumeInput.value / 10);
              ssu.rate = parseFloat(rateInput.value / 5);
              ssu.pitch = parseFloat(pitchInput.value / 5 + .01);
              if (voiceSelect.value) {
                ssu.voice = speechSynthesis.getVoices().filter(function (voice) {
                  return voice.name == voiceSelect.value;
                })[0];
              }
              $(this).addClass('audio-playing')
              synth.speak(ssu);
              ssu.addEventListener("end", (event) => {
                resetSpeech()
              });
            } else if ($(this).hasClass('audio-paused')) {
              $(this).removeClass('audio-inactive audio-paused')
              $(this).addClass('audio-playing')
              synth.resume()
            }
          }
        });
      });
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
    })
    document.querySelector('#reset-flourish').addEventListener('click', () => {
      fullVoiceReset()
    })
  }); //end of doc ready