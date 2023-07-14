
const storeMainScrollPosition = () => {
    var mainScrollPosition = $("html, body").scrollTop();
    sessionStorage.setItem("mainScrollPosition", mainScrollPosition);
}

function resetAdaModal() {
    console.log('reset done and stored scroll')
    removeAllCookies()
    storeMainScrollPosition()
    const adaWidget = document.querySelector('#ADA_widget')
    if (adaWidget.style.display === 'flex') {
        sessionStorage.setItem("reloadModalOpen", "true");
    } else {
        sessionStorage.setItem("reloadModalClosed", "true");
    }
    $("body").fadeOut()
    setTimeout(() => {
        document.location.reload();
    }, 200);

}


const displayModal = () => {
    const overlay = document.querySelector('#ADA_widget')
    if (overlay.style.display !== "flex") {
        $("#ADA_widget").css('opacity', '0');
        $("#ADA_widget").css("display", "flex")
        $("#ADA_widget").fadeTo(0, 1);
        $(".modal_content").fadeToggle(0);
        document.body.classList.add("prevent-body-overflow");
        $(".modal_body").scrollTop(0);
    } else {
        $("#ADA_widget").fadeTo(400, 0);
        $(".modal_content").fadeToggle(400);
        setTimeout(() => {
            $("#ADA_widget").css("display", "none")
            document.body.classList.remove("prevent-body-overflow");
        }, 800);

    }
}

const reloadStorageFunc = () => {
    if (sessionStorage.reloadModalOpen) {
        sessionStorage.removeItem("reloadModalOpen");
        displayModal()
        if (sessionStorage.modalScrollPosition) {
            $(".modal_body").scrollTop(sessionStorage.getItem("modalScrollPosition"));
        }
    } else {
        sessionStorage.removeItem("reloadModalClosed");
    }
    sessionStorage.removeItem("modalScrollPosition");
}

window.onload = function () {
    if (sessionStorage.mainScrollPosition) {
        $("html, body").scrollTop(sessionStorage.getItem("mainScrollPosition"));
        sessionStorage.removeItem("mainScrollPosition");
        setTimeout(() => reloadStorageFunc(), 400);
    } else {
        reloadStorageFunc()
    }
}




