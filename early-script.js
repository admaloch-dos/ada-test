
window.onload = function () {
    if (sessionStorage.reloadModalOpen) {
        sessionStorage.removeItem("reloadModalOpen");
        displayModal()
        if (sessionStorage.scrollPosition) {
            console.log('this should work')
            $(".modal_body").scrollTop(sessionStorage.getItem("scrollPosition"));
        }
    }
    if (sessionStorage.reloadModalClosed) {
        sessionStorage.removeItem("reloadModalClosed");
    }
    sessionStorage.removeItem("scrollPosition");

}

// for main reset button
function resetAdaWidget() {
    removeAllCookies()
    sessionStorage.setItem("reloadModalOpen", "true");
    $("body").fadeOut()
    setTimeout(() => {
        document.location.reload();
    }, 200);
}



