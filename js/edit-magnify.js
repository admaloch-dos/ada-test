// var delay = function (elem, callback) {

//     elem.onmouseover = function() {
//         // Set timeout to be a timer which will invoke callback after 1s
//         timeout = setTimeout(callback, 1000);
//     };

//     elem.onmouseout = function() {
//         // Clear any timers set to timeout
//         clearTimeout(timeout);
//     }
// };

const textMagnifyPresets = document.querySelectorAll('.text-magnify-color-swatch')
textMagnifyPresets.forEach(preset => {
var timeout= null
    preset.addEventListener('mouseenter', () => {
        let color = $(preset).css("background-color");
        let backGroundColor = $(preset).css("border-color");
        $('.text-magnifier-preview').css({ 'color': color, 'background-color': backGroundColor, 'border-color': color });
         timeout = setTimeout(() => {
            $('.text-magnifier-preview').show()
        }, 300);

    })
    preset.addEventListener('mouseleave', () => {
        $('.text-magnifier-preview').hide()
        clearTimeout(timeout)
    })
    preset.addEventListener('click', () => {
        $('.text-magnifier-preview').hide()
        magnifyScheme.color = $(preset).css("background-color");
        magnifyScheme.backGroundColor = $(preset).css("border-color");
        // console.log('color is', color, 'background is', backGroundColor)
        document.querySelectorAll('.text-magnify-color-swatch').forEach(items => {
            items.classList.remove('active')
        })
        preset.classList.add('active')

    })

})

// edit size
const textMagSizeInput = document.querySelector('.text-magnify-size-input')
textMagSizeInput.addEventListener('change', () => {
    console.log('size value is', textMagSizeInput.value)
    let updatedPxSize = `${textMagSizeInput.value}px`
    magnifyScheme.size = updatedPxSize;

})