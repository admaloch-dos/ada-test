
$(document).ready(function () {
    $("#OpenContrastModal").click(function () {
        $('#ContrastRatingModal').toggleClass("toast_close");
    });

    $(".CloseContrastModal").click(function () {
        $('#ContrastRatingModal').addClass("toast_close");
    });
});


const contrastInfoPopup = document.querySelector('#wcagDropdown')
const contrastModalInfoBtn = document.querySelector('#ada-contrast-info-toggle')
document.querySelector('#ada-contrast-info-toggle').addEventListener('click', () => {
    if (contrastInfoPopup.classList.contains('d-none')) {

        $("#wcagDropdown").removeClass("d-none")

    } else {
        $("#wcagDropdown").addClass("d-none")
    }

})


// color contrast modal and popup - close when clicked off screen
$('body').click(function (event) {
    if (!$(event.target).closest('.wcag-modal-remove-selector').length && !$(event.target).is('.wcag-modal-remove-selector')) {
        $("#ContrastRatingModal").addClass("toast_close")
    }
    if (!$(event.target).closest('.wcag-popup-info-remove-selector').length && !$(event.target).is('.wcag-popup-info-remove-selector')) {
        $("#wcagDropdown").addClass("d-none")
    }
});

// color contrast modal and popup - close on scroll


$('.modal_body').on("scroll", function () {
    $("#ContrastRatingModal").addClass("toast_close")
    $("#wcagDropdown").addClass("d-none")
});


