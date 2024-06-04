// letter spacing
$(document).ready(function () {
    var selectedVal = $.cookie("LetterSpaceVal");
    if (selectedVal) {
        $("#letter_spacing").val(selectedVal);
        $("#letter_spacing").prop("selected", true);
        $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div, .close-active-text').css("letter-spacing", selectedVal); //Selects everything inside body except flourish modal and header
        $(".Footer").css("letter-spacing", selectedVal);
        // changeIndent(selectedVal, '10px', '#LetterSpacing_option select'close-active-text, '6.5px')
    }
    $("#letter_spacing").on("change", function () {
        var selection1 = $(this).val();

        $(selection1).prop("selected", true);
        $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div, .close-active-text').css("letter-spacing", selection1); //Selects everything inside body except flourish modal and header
        $(".Footer").css("letter-spacing", selection1);
        $.cookie("LetterSpaceVal", selection1, { expires: 30 })
        // changeIndent(selection1, '10px', '#LetterSpacing_option select', '6.5px')
        widgetItemObj.isLetterSpaceChanged = selection1 === 'inherit' ? false : true
        selection1 === 'inherit' ? removeWidgetControls(['letter_spacing']) : addWidgetControls('letter_spacing', 'Letter spacing')
        checkIfWidgetActive()
    });
});