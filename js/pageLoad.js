// on load -- session Storage - grab page or widget position or open widget etc
const reloadStorageFunc = () => {
    if (localStorage.reloadModalOpen) {
        const adaWidget = document.querySelector('#ADA_widget')

        displayModal()
        if (localStorage.modalScrollPosition) {
            $(".modal_body").scrollTop(localStorage.getItem("modalScrollPosition"));
        }
    }
    localStorage.removeItem("modalScrollPosition");
    localStorage.removeItem("reloadModalOpen");
    localStorage.removeItem("reloadModalClosed");
}

window.onload = function () {
    if (localStorage.getItem("mainScrollPosition") !== "0") {
        const scrollPosition = localStorage.getItem("mainScrollPosition")
        $("html, body").scrollTop(scrollPosition);
        localStorage.removeItem("mainScrollPosition")
        setTimeout(() => reloadStorageFunc(), 500);
    } else {
        reloadStorageFunc()
    }
}



