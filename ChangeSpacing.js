// grab initial value of value of letterspacing/wordspacing/line height values
const setIniti = (input, cookie) => {
    $.cookie(cookie)
        ? input.innerText = parseInt($.cookie(cookie))
        : input.innerText = 2
}

const letterSpacingVal = document.getElementById('letter-spacing-num')
const wordSpacingVal = document.getElementById('word-spacing-num')
const lineHeightVal = document.getElementById('line-height-num')

setIniti(letterSpacingVal, "LetterSpaceVal")
setIniti(wordSpacingVal, "WordSpaceVal")
setIniti(lineHeightVal, "LinpageHeightVal")

// change css properties for letter/word spacing/lineheight
const setSpacingCss = (value, css) => {
    console.log('this ran')
    $("#view p").not('#ADA_widget, #ADA_widget *').css(css, value); //Selects everything inside #view except ada modal and header
    $(".Footer").css(css, value);
}

// set initial height if stored in cookies
const setSpacingFromCookies = (cookie, css, alter) => {
    if ($.cookie(cookie)) {
        let cookieValue = null
        if (alter) {
             cookieValue = $.cookie(cookie) * alter
        } else {
             cookieValue = $.cookie(cookie)
        }
        let pxCookieValue = `${cookieValue}px`

        setSpacingCss(pxCookieValue, css)
    }
}

setSpacingFromCookies("LetterSpaceVal", "letter-spacing")
setSpacingFromCookies("WordSpaceVal", "word-spacing")
setSpacingFromCookies("LinpageHeightVal", "line-height", 12)

let currLetterSpacingValue = parseInt(letterSpacingVal.innerText)
let currWordSpacingValue = parseInt(wordSpacingVal.innerText)
let currLineHeightValue = parseInt(lineHeightVal.innerText)

const spacingIcon = document.querySelectorAll('.spacing-icon')
spacingIcon.forEach(icon => {
    icon.addEventListener('click', () => {
        if (icon.classList.contains('letter-spacing-icon')) {
            if (icon.classList.contains('plus-icon')) currLetterSpacingValue !== 10 ? currLetterSpacingValue += 1 : currLetterSpacingValue
            if (icon.classList.contains('minus-icon')) currLetterSpacingValue !== 1 ? currLetterSpacingValue -= 1 : currLetterSpacingValue
            letterSpacingVal.innerText = currLetterSpacingValue
            let cssLetterSpaceVal = `${currLetterSpacingValue}px`
            setSpacingCss(cssLetterSpaceVal, "letter-spacing")
            $.cookie("LetterSpaceVal", currLetterSpacingValue, { path: '/' })
        } else if (icon.classList.contains('word-spacing-icon')) {
            console.log('word spacing')
            if (icon.classList.contains('plus-icon')) currWordSpacingValue !== 10 ? currWordSpacingValue += 1 : currWordSpacingValue
            if (icon.classList.contains('minus-icon')) currWordSpacingValue !== 1 ? currWordSpacingValue -= 1 : currWordSpacingValue
            wordSpacingVal.innerText = currWordSpacingValue
            let cssWordSpaceVal = `${currWordSpacingValue}px`
            setSpacingCss(cssWordSpaceVal, "word-spacing")
            $.cookie("WordSpaceVal", currWordSpacingValue, { path: '/' })
        } else {
            if (icon.classList.contains('plus-icon')) currLineHeightValue !== 5 ? currLineHeightValue += 1 : currLineHeightValue
            if (icon.classList.contains('minus-icon')) currLineHeightValue !== 1 ? currLineHeightValue -= 1 : currLineHeightValue
            lineHeightVal.innerText = currLineHeightValue
            let convertedCssVal = currLineHeightValue * 12
            let cssLineHeightVal = `${convertedCssVal}px`
            setSpacingCss(cssLineHeightVal, "line-height")
            $.cookie("LinpageHeightVal", lineHeightVal.innerText, { path: '/' })

        }
    })
})




// $(document).ready(function () {
//     // Letter Spacing
//     var selectedVal = $.cookie("LetterSpaceVal");
//     if (selectedVal) {
//         $("#letter_spacing").val(selectedVal);
//         $("#letter_spacing").prop("selected", true);
//         $("#view p").not('#ADA_widget, #ADA_widget *').css("letter-spacing", selectedVal); //Selects everything inside #view except ada modal and header
//         $(".Footer").css("letter-spacing", selectedVal);
//     }
//     // $("#letter_spacing").on("change", function () {
//     //     var selection1 = $(this).val();
//     //     $(selection1).prop("selected", true);
//     //     $("#view p").not('#ADA_widget, #ADA_widget *').css("letter-spacing", selection1); //Selects everything inside #view except ada modal and header
//     //     $(".Footer").css("letter-spacing", selection1);
//     //     $.cookie("LetterSpaceVal", selection1, { path: '/' })
//     // });

//     //Word Spacing
//     var selectedVal2 = $.cookie("WordSpaceVal");
//     if (selectedVal2) {
//         $("#word_spacing").val(selectedVal2);
//         $("#word_spacing").prop("selected", true);
//         $("#view p").not('#ADA_widget, #ADA_widget *').css("word-spacing", selectedVal2); //Selects everything inside #view except ada modal and header
//     }
//     $("#word_spacing").on("change", function () {
//         var selection2 = $(this).val();
//         $(selection2).prop("selected", true);
//         $("#view p").not('#ADA_widget, #ADA_widget *').css("#word_spacing", selection2); //Selects everything inside #view except ada modal and header
//         $(".Footer").css("#word_spacing", selection2);
//         $.cookie("WordSpaceVal", selection2, { path: '/' })
//     });

//     //Line Height
//     var selectedVal3 = $.cookie("LinpageHeightVal");
//     if (selectedVal3) {
//         $("#line_height").val(selectedVal3);
//         $("#line_height").prop("selected", true);
//         $("#view p").not('#ADA_widget, #ADA_widget *').css("line-height", selectedVal3); //Selects everything inside #view except ada modal and header
//         $(".Footer").css("line-height", selectedVal3);
//     }
//     $("#line_height").on("change", function () {
//         var selection3 = $(this).val();
//         $(selection3).prop("selected", true);
//         $("#view p").not('#ADA_widget, #ADA_widget *').css("line-height", selection3); //Selects everything inside #view except ada modal and header
//         $(".Footer").css("line-height", selection3);
//         $.cookie("LinpageHeightVal", selection3, { path: '/' })
//     });
// });

// $(document).ready(function () {
//     ////////////////// Page Structure ///////////////////
//     // !-- -- -- -- -- --Footer-- -- -- -- -- - >
//     var output2 = "";
//     $('.navbar.Footer nav.affiliates li a, .navbar.Footer nav.additional_Links a').each(function () {
//         var source2 = $(this).attr("href");
//         var text2 = $(this).text();
//         output2 += '<option value="' + source2 + '">' + text2 + '</option>';
//         $("#select_page #footer_group").html(output2);
//     });

//     //////////// Change Letter Spacing ///////////////////
//     $("#letter_spacing").on('change', function () {
//         var getLetterSpace = $(this).val();
//         $("#view *").not('#ADA_widget, #ADA_widget *').css("letter-spacing", getLetterSpace); //Selects everything inside #view except ada modal and header
//         $(".Footer").css("letter-spacing", getLetterSpace);
//     });

//     //////////// Change Word Spacing ///////////////////
//     $("#word_spacing").on('change', function () {
//         var getWordSpace = $(this).val();
//         $("#view *").not('#ADA_widget, #ADA_widget *').css("word-spacing", getWordSpace); //Selects everything inside #view except ada modal and header
//         $(".Footer").css("word-spacing", getWordSpace);
//     });

// }); //end of doc ready





