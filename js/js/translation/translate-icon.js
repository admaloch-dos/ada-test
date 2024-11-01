const translateIcon = document.querySelector('#translate-icon')

translateIcon.addEventListener('click', () => {
    displayModal()
    $('.modal_body #language-options').get(0).scrollIntoView({ behavior: "auto", block: "start" });
    // setTimeout(() => {
    //         document.querySelector('#flourish-more-languages-btn').click()
    // }, 500);
})