// Toggle Image Description
$(function () {
  $('[id="ToggleImageDescription"]').change(function () {
    if ($(this).is(':checked')) {
      
      $("body").addClass("ImageDescription");
      $('img[alt], .feature .img[alt], i.fa[alt]').hover(
        function (e) {
          //do the mouseenter things here...
          var ImageDescription = $(this).attr("alt");
          $("#ImageDescription_magnify").text(ImageDescription);
          $('#ImageDescription_magnify').attr('style', 'display: block!important');
          $('#ImageDescription_magnify').attr('style', 'opacity: 1!important');
          //If #text_magnify is empty, hide
          if ($('#ImageDescription_magnify').is(':empty')) {
            $('#ImageDescription_magnify').attr('style', 'display: none!important');
            $('#ImageDescription_magnify').attr('style', 'opacity: 0!important');
          }
        },
        function (e) {
          //do the mouseleave things here...
          $('#ImageDescription_magnify').attr('style', 'display: none!important');
          $('#ImageDescription_magnify').attr('style', 'opacity: 0!important');
        }
      );
      addWidgetControls('ToggleImageDescription', 'Image description')
      widgetItemObj.isImgMag = true
    } else {
      $("body").removeClass("ImageDescription");
      $('img[alt], .feature .img[alt], i.fa[alt]').hover(
        function (e) {
          //do the mouseleave things here...
          $('#ImageDescription_magnify').attr('style', 'display: none!important');
          $('#ImageDescription_magnify').attr('style', 'opacity: 0!important');
        });
      removeWidgetControls(['ToggleImageDescription'])
      widgetItemObj.isImgMag = false
    } //end of else


    checkIfWidgetActive()
  }); //end of change
}); // end of function

////////////image description magnify///////////////////
$(document).on('mousemove', function (e) {
  $('#ImageDescription_magnify').css({
    left: e.pageX,
    top: e.pageY
  });
});