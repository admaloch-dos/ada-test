let textMagY = 120;
document.addEventListener('scroll', () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  const adaModal = document.querySelector('#ADA_widget')
  if (adaModal.style.display !== 'flex') {
    if (window.scrollY >= scrollableHeight - 1) { // at bottom of page
      textMagY = 180
    } else if (window.scrollY === 0) { // at top of page
      textMagY = 20
    } else {
      textMagY = 120
    }
  }
})



//////////// Text Magnify ///////////////////
$(document).on('mousemove', function (e) {
  const textMagnify = document.querySelector('#text_magnify')

    $('#text_magnify').css({
      left: e.pageX + 10,
      top: e.pageY - textMagY
    });


});