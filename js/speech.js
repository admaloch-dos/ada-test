

$(document).ready(function () {
    /////////////////////////////////////////////////////////  TEXT TO SPEECH - with on click //////////////////////////////////////////////////////////////
    //Hides TTS on Android Devices
    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (userAgent.match(/Android/i)) {
            //return 'Android';
            $('#TTS_option').hide();
        }
    }

    const resetSpeech = () => {
        $('.curr-active-item').removeClass('curr-active-item')
        $('.play').removeClass('audio-playing audio-paused')
        $('.play').addClass('audio-inactive')
        $('.play').find('.fa').removeClass('fa-pause')
        $('.play').find('.fa').addClass('fa-play ')
        synth.cancel();
    }

    var speechVol = $.cookie("speechVolCookie");
    var speechRate = $.cookie("speechRateCookie");
    var speechPitch = $.cookie("speechPitchCookie");

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
        $.cookie(item, value, { path: '/' })
    }

    getMobileOperatingSystem();
    // roundSlider.js -- https://roundsliderui.com/
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
                $.cookie(currCookie, currRoundSlideValue + 1, { path: '/' })
            } else {
                $(currValId).roundSlider({ value: currRoundSlideValue - 1 });
                $.cookie(currCookie, currRoundSlideValue - 1, { path: '/' })
            }
            resetSpeech()
        })
    })


    const fullVoiceReset = () => {
        $.removeCookie('voiceCookie');
        resetVoiceSettings()
        resetSpeech()
        resetVoiceDefault()

    }




    const resetVoiceBtn = document.querySelector('#reset-voice-btn')
    resetVoiceBtn.addEventListener('click', () => {
        fullVoiceReset()
    })

    $("#volume input").addClass("volume_selector");
    $("#rate input").addClass("rate_selector");
    $("#pitch input").addClass("pitch_selector");
    $("<span class='headings'>Volume</span>").appendTo("#volume");
    $("<span class='headings'>Rate</span>").appendTo("#rate");
    $("<span class='headings'>Pitch</span>").appendTo("#pitch");

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
            if (i !== 0 && i !== 2 && i !== 4 && i !== 5 && i !== 6) return;
            //Returns Microsoft Mark, Microsoft Zira & Google US English
            // Create a new option element.
            var option = document.createElement('option');
            // Set the options value and text.
            option.value = voice.name;
            option.innerHTML = voice.name;
            // Add the option to the voice selector.
            voiceSelect.appendChild(option);
        });
    }

    // Execute loadVoices.
    loadVoices();

    // document.addEventListener("DOMContentLoaded", function () {
    //     let selectElement = document.querySelector(".goog-te-combo");
    //     selectElement.addEventListener('change', (event) => {
    //         loadVoices()
    //     })
    // });








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
        $.cookie("voiceCookie", currVoice, { path: '/' })
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

    $('<div class="audio_state">\
    <button class="play audio-inactive btn " title="Play"><i class="fa fa-play" aria-hidden="true"></i></button>\
    <button class="stop btn " title="Cancel"><i class="fa fa-refresh" aria-hidden="true"></i> Reset</button>\
    </div>').insertAfter("p");

    //https://stackoverflow.com/a/30361156/10792033
    //Wrapping groups of adjacent siblings
    $('div.audio_state').each(function () {
        $(this)
            .prev()
            .addBack()
            .wrapAll('<section class="TTS_content"></section>');
    });


    /***** ON Play CLICK *****/
    $('div.audio_state .play').each(function (index) {
        $(this).click(function () {
            if (!$(this).hasClass('curr-active-item')) {
                resetSpeech()
                $(this).addClass('curr-active-item')
            }
            $(this).find('.fa').removeClass('fa-pause')
            $(this).find('.fa').addClass('fa-play ')
            if ($(this).hasClass('audio-playing')) {
                $(this).removeClass('audio-inactive audio-playing')
                $(this).addClass('audio-paused')
                synth.pause()
            } else {
                $(this).find('.fa').removeClass('fa-play');
                $(this).find('.fa').addClass('fa-pause');
                if ($(this).hasClass('audio-inactive')) {
                    $('.play').removeClass('audio-inactive audio-paused')
                    synth.cancel();
                    ssu.text = $(this).parent("div.audio_state").prev("p").text();
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

    //Global Cancels Speech on reset button
    $(".stop").on("click", function () {
        resetSpeech()
    });

    $("#ADA_trigger").click(function () {

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


    document.querySelector('#ADA_reset').addEventListener('click', () => {
        fullVoiceReset()
        loadVoices()
    })
    document.querySelector('#reset-ada').addEventListener('click', () => {
        fullVoiceReset()
        loadVoices()
    })


}); //end of doc ready

if ($.cookie('TTS_click_enabled') == "true") {
    $("#speech-settings").removeClass("disable");
}

// Toggle Text-to-Speech click
$(function () {
    $('[id="ToggleTTS_click"]').change(function () {
        if ($(this).is(':checked')) {
            $(".audio_state").hide()
            $("body").addClass("TTS_click_enabled");
            $(".audio_state").fadeIn(600)
            $("#speech-settings").removeClass("disable");
            // $("#speech-settings").removeClass("disable-settings");
            if ($('#ToggleReadingMask').is(':checked')) {
                storeModalScrollPosition()
                modalDisplayOpenOrClose()
                forceReload()
            }
            if ($.cookie('ReadingMask')) {
                if ($.cookie('ReadingMask') === 'false') {
                    $.removeCookie('ReadingMask');
                    storeModalScrollPosition()
                    modalDisplayOpenOrClose()
                    forceReload()
                }
            }
            addWidgetControls('ToggleTTS_click', 'Text to speech')
            widgetItemObj.isSpeech = true
        } else {
            $("#speech-settings").addClass("disable");
            if ($.cookie('ReadingMask')) {
                if ($.cookie('ReadingMask') === 'true') {

                    storeModalScrollPosition()
                    modalDisplayOpenOrClose()
                    forceReload()

                }
                $.cookie("reading-mask-reload", true, { path: '/' });
            }
            // $("#speech-settings").addClass("disable-settings");
            $(".audio_state").fadeOut(500)
            setTimeout(() => {
                $("body").removeClass("TTS_click_enabled");
                $.cookie('TTS_click_enabled', 'false');
            }, 500);
            removeWidgetControls(['ToggleTTS_click'])
            widgetItemObj.isSpeech = false
        }
        $.cookie("reading-mask-reload", true, { path: '/' });
        checkIfWidgetActive()
    });
});


$(document).ready(function () {


    // read the current/previous setting
    $("input.switch-input[type=checkbox]").each(function () {
        //get name of input
        var name = $(this).attr('name');
        if ($.cookie(name) && $.cookie(name) == "true") {
            $(this).prop('checked', $.cookie(name));
            $("body").addClass(name);

            //If ToggleTTS_click is checked
            if ($('[id="ToggleTTS_click"]').is(':checked')) {
                $("body").addClass("TTS_click_enabled");
            }


        }// end of if
    });//end of each
    // event management
    $("input.switch-input[type=checkbox]").change(function () {
        var name = $(this).attr("name");
        $.cookie(name, $(this).prop('checked'), { path: '/', })
    });
});

