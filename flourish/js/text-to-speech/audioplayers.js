// reset all speech players to default volume icon
const resetSpeech = () => {
    synth.cancel();
    $(".trigger-audio").each(function (index) {
        if ($(this).hasClass('play-pause')) {
            $(this).addClass('inactive-item')
            $(this).removeClass('audio-paused audio-playing curr-active-item')
            $(this).addClass('audio-inactive ')
            resetCurrActiveItem()
        } else {
            $(this).addClass('d-none')
        }
    });
}

//create audio players around text
const addAudioPlayers = (selectors) => {
    $(selectors).not("#language-btn-modal-header *").each(function () {
        const itemDisplay = window.getComputedStyle(this, null).display
        const itemOpacity = window.getComputedStyle(this, null).opacity
        const currTextItem = $(this).text()
        const itemType = this.nodeName

        if (currTextItem && currTextItem.replaceAll(/\s/g, '') !== ''
            && currTextItem.replaceAll(/\s/g, '') !== 'inherit'
            && currTextItem.replaceAll(/\s/g, '').length > 1
            && itemDisplay !== 'none'
            && itemOpacity !== '0'
            && this.id !== 'preset-color-btn'
            && this.id !== 'custom-color-btn'
            && !$(this).parent().hasClass('TTS_content')) {

            if (itemType === 'SPAN' || itemType === 'LI' || itemType === 'TD' || itemType === 'TH') {
                if (!this.firstElementChild) {
                    generateAudioPlayer(this)
                }
            } else if (itemType === 'SELECT') {
                if (this.value !== 'inherit') {
                    generateAudioPlayer(this)
                }
            } else if (itemType === 'A') {
                if (!this.closest('p')) {
                    generateAudioPlayer(this)
                }
            } else {
                generateAudioPlayer(this)
            }
        }
        if (this.classList.contains('hidden-span')) {
            generateAudioPlayer(this)
        }
    })
}

const generateAudioPlayer = (item) => {
    $(item).wrap('<section class="TTS_content"></section>');
    $(`<div class="audio_state">\
    <button class="trigger-audio play-pause inactive-item audio-inactive" title="Trigger audio">${initAudioIcon}</button>\
    <button class="trigger-audio reset-audio-btn d-none" title="Cancel">\
    ${resetAudioIcon}
    </button></div>`).insertAfter(item);
}

/***** handler for speech items -- the speech btn and the play/pause/reset all have trigger audio class.. tehse conditionals test whcih one is which *****/
let speechInterval
const speechItemHandler = () => {
    $('div.audio_state .trigger-audio').each(function (index) {
        $(this).unbind('click').click(function (e) {
            e.preventDefault()
            clearInterval(speechInterval)
            if ($(this).hasClass('play-pause')) {
                if (!$(this).hasClass('curr-active-item') && !$(this).hasClass('reset-audio-btn')) {
                    initAudioHandler(this)
                } if ($(this).hasClass('audio-inactive')) {
                    startAudioHandler(this)
                } else if ($(this).hasClass('audio-playing')) {
                    pauseAudioHandler(this)
                } else if ($(this).hasClass('audio-paused')) {
                    resumeAudioHandler(this)
                }
            } else {
                resetAudioHandler(this)
            }
            e.stopPropagation(this)
        });
    });
}



const initAudioHandler = (item) => {
    console.log('init audio ran')
    resetCurrActiveItem()
    resetSpeech()
    $(item).addClass('curr-active-item').removeClass('inactive-item')
    $(item).closest('.audio_state').children('.reset-audio-btn').first().removeClass('d-none')
}

const startAudioHandler = (item) => {
    console.log('start audio ran')
    synth.cancel();
    speechSynthesisParams(item)
    synth.speak(ssu);
    startAudioBtns(item)
    forceSpeechInterval()
    resetCompletedAudio(item)
}

//switch icons to pause icons while audio is playing
const startAudioBtns = (item) => {
    $(item).children('.trigger-audio-icon').first().html(pauseAudioIcon);
    $(item).removeClass('audio-inactive audio-paused').addClass('audio-playing')
}



const forceSpeechInterval = (item) => {
    // on chrome speechSynthesis has a bug where it stops playing if the passage is longer than 15 seconds
    const currOS = getOS()
    if (currOS !== 'Android') {
        speechInterval = setInterval(() => {
            if (!speechSynthesis.speaking) {
                clearInterval(speechInterval);
            } else {
                console.log('15 sec interval force continue - speech synthesis bug workaround')
                speechSynthesis.pause();
                speechSynthesis.resume();
            }
        }, 14000);
    }
}

const resetCompletedAudio = (item) => {
    ssu.addEventListener("end", (event) => {
        console.log('audio ended and is now reset. Press play to start from the beginning')
        synth.cancel();
        if ($(item).hasClass('curr-active-item')) {
            $(item).removeClass('audio-paused audio-playing')
            $(item).addClass('audio-inactive ')
            $(item).children('.trigger-audio-icon').first().html(playAudioIcon);
        }
    });
}

const resumeAudioHandler = (item) => {
    console.log('resume audio ran')
    startAudioBtns(item)
    synth.resume()
    forceSpeechInterval()
}

const pauseAudioHandler = (item) => {
    console.log('pause audio ran')
    $(item).removeClass('audio-inactive audio-playing')
    $(item).addClass('audio-paused')
    $(item).children('.trigger-audio-icon').first().html(playAudioIcon);
    synth.pause()
    const currOS = getOS()
    if (currOS !== 'Android') {
        speechInterval = setInterval(() => {
            console.log('15 sec pause - prevent breaking- speech synthesis bug workaround')
            speechSynthesis.resume();
            speechSynthesis.pause()
        }, 14000);
    }
}

const resetAudioHandler = (item) => {
    console.log('reset audio ran')
    synth.cancel()
    $(item).siblings('.play-pause').removeClass('audio-paused audio-playing').addClass('audio-inactive')
    $(item).siblings('.play-pause').children('.trigger-audio-icon').first().html(playAudioIcon);

}