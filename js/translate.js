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





  function dismissGoogleTranslate() {

    // find `iframe` element with GoogleTranslate select and buttons
    var iframe = document.getElementsByClassName('goog-te-banner-frame')[0]
              || document.getElementById(':1.container');
    if (!iframe) return;

    // search all buttons from the retrieved iframe
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var restore_el = innerDoc.getElementsByTagName("button");

    // fire `click` event on the `restore` button, that `Shows the origin`
    for (var i = 0; i < restore_el.length; i++) {
        if (restore_el[i].id.indexOf("restore") >= 0) {
            restore_el[i].click();
            return;
        }
    }
}