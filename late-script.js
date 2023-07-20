const reloadStorageFunc = () => {
    if (sessionStorage.reloadModalOpen) {
        const adaWidget = document.querySelector('#ADA_widget')

        displayModal()
        if (sessionStorage.modalScrollPosition) {
            $(".modal_body").scrollTop(sessionStorage.getItem("modalScrollPosition"));
        }
    }
    sessionStorage.removeItem("modalScrollPosition");
    sessionStorage.removeItem("reloadModalOpen");
    sessionStorage.removeItem("reloadModalClosed");
}

window.onload = function () {
    if (sessionStorage.getItem("mainScrollPosition") !== "0") {
        const scrollPosition = sessionStorage.getItem("mainScrollPosition")
        $("html, body").scrollTop(scrollPosition);
        sessionStorage.removeItem("mainScrollPosition")
        setTimeout(() => reloadStorageFunc(), 500);
    } else {
        reloadStorageFunc()
    }
}