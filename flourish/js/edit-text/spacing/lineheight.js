//line height
$(document).ready(function () {

  let selectedVal3 = $.cookie("LinpageHeightVal");
   if (selectedVal3) {
     $("#line_height").val(selectedVal3);
     $("#line_height").prop("selected", true);
     $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div').css("line-height", selectedVal3); //Selects everything inside body except flourish modal and header
     $(".Footer").css("line-height", selectedVal3);
   }
   $("#line_height").on("change", function () {
    let selection3 = $(this).val();
     $(selection3).prop("selected", true);
     $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div').css("line-height", selection3); //Selects everything inside body except flourish modal and header
     $(".Footer").css("line-height", selection3);
     $.cookie("LinpageHeightVal", selection3, { expires: 30 })
     widgetItemObj.isLineHeightChanged = selection3 === 'inherit' ? false : true
     checkIfWidgetActive()
     selection3 === 'inherit' ? removeWidgetControls(['line_height']) : addWidgetControls('line_height', 'Line height')

   });
});