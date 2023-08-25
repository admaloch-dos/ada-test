// text and image magnifier COLOR control
const textMagColorControls = (colors, preview, cssObj) => {
    const colorPresets = document.querySelectorAll(colors)
    colorPresets.forEach(preset => {

        preset.addEventListener('mouseenter', () => {
            let color = $(preset).css("background-color");
            let backGroundColor = $(preset).css("border-color");
            $(preview).css({ 'color': color, 'background-color': backGroundColor, 'border-color': color });
            timeout = setTimeout(() => {
                $(preview).show()
            }, 300);
        })
        preset.addEventListener('mouseleave', () => {
            $(preview).hide()
            clearTimeout(timeout)
        })
        preset.addEventListener('click', () => {

            $(preview).hide()
            cssObj.color = $(preset).css("background-color");
            cssObj.backGroundColor = $(preset).css("border-color");
            // console.log('color is', color, 'background is', backGroundColor)
            colorPresets.forEach(items => {
                items.classList.remove('active')
            })
            preset.classList.add('active')
            $.cookie(colors.slice(1), preset.id, { path: '/' })

        })
    })
}

const restoreMagColorDefault = (type, colors, cssObj) => {
    const colorPresets = document.querySelectorAll(colors)
    colorPresets.forEach(items => {
        items.classList.remove('active')
    })
    let newId = null
    if ($.cookie('DarkContrastBackgroundCookie') == "yes" || $.cookie('InvertBackgroundCookie') == "yes") {
        newId = `#${type}-mag-color-4`
        cssObj.color = '#363636';
        cssObj.backGroundColor = '#ffffff';
    } else {
        newId = `#${type}-mag-color-1`
        cssObj.color = 'rgb(255,255,255)';
        cssObj.backGroundColor = 'rgb(54,54,54)';
    }
    document.querySelector(newId).classList.add('active')
    $.cookie(colors.slice(1), newId.slice(1), { path: '/' })

}

// text and image mag SIZE control
const textMagSizeControls = (input, cssObj) => {
    const textMagSizeInput = document.querySelector(input)
    textMagSizeInput.addEventListener('change', () => {
        let updatedPxSize = `${textMagSizeInput.value}px`
        cssObj.size = updatedPxSize;
        $.cookie(input.slice(1), updatedPxSize, { path: '/' })

    })
}






const restoreDefaultMagnify = (type, colors, sizeInput, cssObj) => {
    restoreMagColorDefault(type, colors, cssObj)
    cssObj.size = '22px'
    $(sizeInput).val(22).change();
    $.cookie(sizeInput.slice(1), '22px', { path: '/' })
    console.log('size restore default input', sizeInput)
}


restoreDefaultTextMagSettings = () => {
    restoreDefaultMagnify('text', '.text-magnify-color-swatch', '.text-magnify-size-input', textMagObj)
}
restoreDefaultImageSettings = () => {
    restoreDefaultMagnify('img', '.img-magnify-color-swatch', '.img-magnify-size-input', imgMagObj)
}

// text magnifier
textMagColorControls('.text-magnify-color-swatch', '.text-magnifier-preview', textMagObj)
textMagSizeControls('.text-magnify-size-input', textMagObj)

//img description
textMagColorControls('.img-magnify-color-swatch', '.img-magnifier-preview', imgMagObj)
textMagSizeControls('.img-magnify-size-input', imgMagObj)

// cookies

if ($.cookie("text-magnify-color-swatch")) {
    let cookieVal = $.cookie("text-magnify-color-swatch")
    let cookieIdVal = `#${cookieVal}`
    textMagObj.color = $(cookieIdVal).css("background-color");
    textMagObj.backGroundColor = $(cookieIdVal).css("border-color");
}

// func to handle cookies for text and img size and color
const magnifyCookieHandler = (type, cookie, obj) => {
    if ($.cookie(cookie.slice(1))) {
        let cookieVal = $.cookie(cookie.slice(1))
        if (type === 'size') {
            obj.size = cookieVal
            $(cookie).val(parseInt(cookieVal)).change();
        } else {
            const colorPresets = document.querySelectorAll(cookie)
            colorPresets.forEach(items => {
                items.classList.remove('active')
            })
            let cookieIdVal = `#${cookieVal}`
            document.querySelector(cookieIdVal).classList.add('active')
            obj.color = $(cookieIdVal).css("background-color");
            obj.backGroundColor = $(cookieIdVal).css("border-color");
        }
    }
}

magnifyCookieHandler('size', '.text-magnify-size-input', textMagObj)
magnifyCookieHandler('size', '.img-magnify-size-input', imgMagObj)
magnifyCookieHandler('color', '.text-magnify-color-swatch', textMagObj)
magnifyCookieHandler('color', '.img-magnify-color-swatch', imgMagObj)














