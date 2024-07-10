//Word Spacing
$(document).ready(function () {
    let selectedVal2 = $.cookie("WordSpaceVal");
    if (selectedVal2) {
        $("#word_spacing").val(selectedVal2);
        $("#word_spacing").prop("selected", true);
        $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div').css("word-spacing", selectedVal2); //Selects everything inside body except flourish modal and header
        // changeIndent(selectedVal2, '10px', '#WordSpacing_option select', '6.5px')
    }
    $("#word_spacing").on("change", function () {
        let selection2 = $(this).val();
        $(selection2).prop("selected", true);
        $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div').css("word-spacing", selection2); //Selects everything inside body except flourish modal and header
        $(".Footer").css("#word_spacing", selection2);
        $.cookie("WordSpaceVal", selection2, { expires: 30 })
        // changeIndent(selection2, '10px', '#WordSpacing_option select', '6.5px')
        widgetItemObj.isWordSpaceChanged = selection2 === 'inherit' ? false : true
        selection2 === 'inherit' ? removeWidgetControls(['word_spacing']) : addWidgetControls('word_spacing', 'Word spacing')
        checkIfWidgetActive()

    });
});