
  // init speech synthesis
  let ssu;
  let voices;
  var synth = window.speechSynthesis;
  var voiceSelect = document.getElementById('voice');
  var volumeInput = document.querySelector('.volume_selector');
  var rateInput = document.querySelector('.rate_selector');
  var pitchInput = document.querySelector('.pitch_selector');

  // Fetch the list of voices and populate the voice options.
  function loadVoices() {
    // Fetch the available voices.
    var voiceList = speechSynthesis.getVoices();
    // Loop through each of the voices.
    voiceList.forEach(function (voice, i) {
      // if (!hasTouchScreen) {
      //   if (voice.name !== 'Google US English' && voice.name !== "Microsoft David - English (United States)" && voice.name !== 'Microsoft Zira - English (United States)' && voice.name !== 'Google UK English Male' && voice.name !== 'Google UK English Female') {
      //     return
      //   }
      // }
      // Create a new option element.
      var option = document.createElement('option');
      option.value = voice.name;
      option.innerHTML = voice.name;
      voiceSelect.appendChild(option);
    });
  }

  // Execute loadVoices.
  loadVoices();

  // Chrome loads voices asynchronously.
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