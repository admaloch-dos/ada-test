function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    layout: google.translate.TranslateElement
  }, 'google_translate_element');
}


//https://stackoverflow.com/a/36282225/10792033
//Change text of dropdown on Google Translate


$(document).ready(function () {
  $('#google_translate_element').bind('DOMNodeInserted', function (event) {
    $('.goog-te-menu-value span:first').html('Translate Site');
  });
});








// selection1 === 'inherit' ? removeWidgetControls(['letter_spacing']) : addWidgetControls('letter_spacing', 'Letter spacing')


// $(".goog-te-combo").on("change", function () {
//   var currentVal = $(this).val();
//   console.log(currentVal)
// });



