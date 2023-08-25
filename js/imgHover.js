

if ($.cookie('ImageDescription') == "true") {
  $('#ToggleImageDescription').prop('checked', false).trigger('change')
  setTimeout(() => {
    $('#ToggleImageDescription').prop('checked', true).trigger('change')
  }, 500);



}


let imgMagObj = {
  color: 'rgb(255,255,255)',
  backGroundColor: 'rgb(54,54,54)',
  size: '22px',
}


const imgMagFunc = () => {
  if ($('[id="ToggleImageDescription"]').is(':checked')) {
    $('#edit-img-magnify').css("display", "flex").hide().fadeIn();
    $('.img-mag-preview-container').css("display", "flex").hide().fadeIn();
    $('#ImageDescription_magnify').attr('style', 'opacity: 1!important');
    $('#ImageDescription_magnify').attr('style', 'display: none!important');
    $("body").addClass("ImageDescription");
    $('img[alt], .feature .img[alt], i.fa[alt]').hover(
      function (e) {
        //do the mouseenter things here...
        console.log('img mask hover over')
        var ImageDescription = $(this).attr("alt");
        $("#ImageDescription_magnify").text(ImageDescription);
        $('#ImageDescription_magnify').show()

        $('#ImageDescription_magnify').css({ 'color': imgMagObj.color, 'background-color': imgMagObj.backGroundColor, 'font-size': imgMagObj.size });

        //If #text_magnify is empty, hide
        if ($('#ImageDescription_magnify').is(':empty') || ImageDescription === '') {
          $('#ImageDescription_magnify').attr('style', 'display: none!important');
        }
      },
      function (e) {
        //do the mouseleave things here...
        $('#ImageDescription_magnify').attr('style', 'display: none!important');
      }
    );
    $(window).scroll(function () {
      $('#ImageDescription_magnify').attr('style', 'display: none!important');
    });
    addWidgetControls('ToggleImageDescription', 'Image description')
    widgetItemObj.isImgMag = true
  } else {
    $('#edit-img-magnify').fadeOut()
    $('.img-mag-preview-container').fadeOut()
    $("body").removeClass("ImageDescription");
    $('img[alt], .feature .img[alt], i.fa[alt]').hover(
      function (e) {
        //do the mouseleave things here...
        $('#ImageDescription_magnify').attr('style', 'display: none!important');
      });
    removeWidgetControls(['ToggleImageDescription'])
    widgetItemObj.isImgMag = false
  } //end of else
  checkIfWidgetActive()
}




// Toggle Image Description
$(function () {
  $('[id="ToggleImageDescription"]').change(function () {
    imgMagFunc()
  }); //end of change
}); // end of function

// cookie imgDescription
if ($.cookie('ImageDescription') == "true") {
  $('#ToggleImageDescription').prop('checked', true).trigger('change')

}

////////////image description magnify///////////////////
$(document).on('mousemove', function (e) {
  $('#ImageDescription_magnify').css({
    left: e.pageX,
    top: e.pageY
  });
});

