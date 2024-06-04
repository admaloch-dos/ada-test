const resetCurrActiveItem = () => {
    const currActiveItem = document.querySelector('.curr-active-item');
    if (currActiveItem) {
        $('.curr-active-item').children('.trigger-audio-icon').first().html(initAudioIcon);
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
        console.log('full reset clicked')
        $('#ToggleTTS_click').prop('checked', false).trigger('change')
        setTimeout(() => {
            $('#ToggleTTS_click').prop('checked', true).trigger('change')
        }, 600)
    }
}