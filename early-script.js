function deleteCookies() {
    var Cookies = document.cookie.split(';');

    // set 1 Jan, 1970 expiry for every cookies
    for (var i = 0; i < Cookies.length; i++)
        document.cookie = Cookies[i] + "=;expires=" + new Date(0).toUTCString();
    // showCookies();
}




window.onload = function () {

    var reloading = sessionStorage.getItem("reloading");
    var reloadingOnKey = sessionStorage.getItem("reloadingOnKey");
    var reloadingOnKeyModal = sessionStorage.getItem("reloadingOnKeyModal");

    if (reloading) {
        sessionStorage.removeItem("reloading");
      $("#ADA_widget").fadeIn('fast')
    }
    if (reloadingOnKeyModal) {
        sessionStorage.removeItem("reloadingOnKeyModal");
      $("#ADA_widget").fadeIn('fast')
    }
    if (reloadingOnKey) {
        sessionStorage.removeItem("reloadingOnKey");
    }
}

function resetAdaWidget() {
    deleteCookies()
    sessionStorage.setItem("reloading", "true");
    $("body").fadeOut()
    setTimeout(() => {
        document.location.reload();
    }, 200);

}



