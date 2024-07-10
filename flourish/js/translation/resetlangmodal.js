const resetLanguageModal = () => {
    // setDefaultModal()
    collapseAllAccordionItems()
    document.querySelector('#all-languages-filter').click()
    document.getElementById('search-lang-modal').value = ''
    document.getElementById('flourish-search-input').value = ''
    $('#search-list').fadeOut()
}

document.getElementById('flourish-more-languages-btn').addEventListener('click', () => {
    resetLanguageModal()
})

setTimeout(() => {
    langBtnClickHandler()
}, 500);

// document.addEventListener("DOMContentLoaded", langBtnClickHandler)
