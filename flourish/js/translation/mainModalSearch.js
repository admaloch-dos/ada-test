if (hasTouchScreen) {
    $("#flourish-search-input").click(function () {
        document.getElementById("flourish-language-search").scrollIntoView();
    });
}

// search languages input handler (main widget not modal)
//creates dropdown of options based off of language code, language english, and language in it's own script
const langKeySearchHandler = () => {
    const langSearchInput = document.getElementById('flourish-search-input')
    let searchTerm = (langSearchInput.value).trim();
    let filteredLangResults = searchTerm.length < 1 ? [] : genFilteredLangResults(searchTerm)
    if (filteredLangResults.length > 0) {
        langSearchInput.classList.remove('invalid-search')
        $('#search-list').fadeIn()
        genSearchBtns(filteredLangResults)
        document.getElementById('flourish-search-input').classList.remove('invalid-search')
    } else {
        $('#search-list').hide()
        searchTerm.length > 1
            ? langSearchInput.classList.add('invalid-search')
            : langSearchInput.classList.remove('invalid-search')
    }
    document.querySelectorAll('.search-list-item').forEach(item => {
        translateNotSupported(item)
        let currLang = document.querySelector(".goog-te-combo").value;
        item.addEventListener('click', () => {
            let newLang = document.querySelector(".goog-te-combo").value;
            if (!item.classList.contains('disable') &&
                newLang &&
                currLang !== newLang) {
                    console.log(currLang, newLang)
                $('.search-list').hide()
                langSearchInput.value = ''
            }
        })
    })
}

$('.modal_content').click(function (event) {
    if (!$(event.target).closest('#search-list').length && !$(event.target).is('#search-list')) {
        $('#search-list').hide()
    }
});

// populate the dropdown search list in the main search (not modal)
//normal btnClickItems like other btns
const genSearchBtns = (arr) => {
    const searchList = document.getElementById('search-list')
    searchList.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        const searchListItem = document.createElement('div')
        searchListItem.classList.add('search-list-item-container', 'notranslate')
        let divId = arr[i].LanguageCodeGoogleTrans ? arr[i].LanguageCodeGoogleTrans : `${arr[i].LanguageEnglish}-language-btn`
        searchListItem.innerHTML = `
      <div id="${divId}" class="search-list-item lang-translate-selector">
          <div class="search-item-thumbnail">
              <img src="./flourish/img/language/${arr[i].FlorishIconfilename}" alt="${arr[i].LanguageEnglish}-${arr[i].LanguageAutonym} Language icon">
          </div>
          <div class="search-item-info">
              <p>${arr[i].LanguageAutonym}</p>
          </div>
      </div>
    `
        searchList.append(searchListItem)
    }
    langBtnClickHandler()
}