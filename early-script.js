






window.onload = function () {

    var reloading = sessionStorage.getItem("reloading");
    var reloadingOnKey = sessionStorage.getItem("reloadingOnKey");
    var reloadingOnKeyModal = sessionStorage.getItem("reloadingOnKeyModal");

    if (reloading) {
        sessionStorage.removeItem("reloading");
        displayModal()
    }
    if (reloadingOnKeyModal) {
        sessionStorage.removeItem("reloadingOnKeyModal");
        displayModal()
    }
    if (reloadingOnKey) {
        sessionStorage.removeItem("reloadingOnKey");

    }
}

function resetAdaWidget() {
    removeAllCookies()
    sessionStorage.setItem("reloading", "true");
    $("body").fadeOut()
    setTimeout(() => {
        document.location.reload();
    }, 200);

}



