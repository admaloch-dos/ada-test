const getCurrState = () => {
    const stateDataAttribute = (document.getElementById('flourish-widget-main').dataset.state)
    return stateDataAttribute
        ? stateDataAttribute.charAt(0).toUpperCase() + stateDataAttribute.slice(1)
        : "United States"
}

// grab state arr of common langs and iterate over full data set
//combine lang code - eng lang - and lang in its own lang.. filter out duplicates then return
const genCurrStateFullData = () => {
    let currState = getCurrState().trim().toLowerCase().replace(' ', '')
    let currStateLangCodes = usStatesLanguagesData.filter(usState => usState.state.trim().toLowerCase().replace(' ', '') === currState && usState)[0].languages
    let filterExtraCodes = currStateLangCodes.slice(0, 12);
    let fullStateArrData = worldLanguageData.filter(item => filterExtraCodes.includes(item.LanguageCode))
    fullStateArrData.sort(function (a, b) {
        return filterExtraCodes.indexOf(a.LanguageCode) - filterExtraCodes.indexOf(b.LanguageCode);
    });
    return fullStateArrData;
}

// func takes in arr and destination and generates valid lang btns
const genLanguageBtns = (arr, destination) => {
    for (let i = 0; i < arr.length; i++) {
        const langBtnContainer = document.createElement('div')
        langBtnContainer.classList.add('flourish-language-btn-container', "col-6", "col-sm-4", "col-lg-3")
        let divId = arr[i].LanguageCodeGoogleTrans ? arr[i].LanguageCodeGoogleTrans : `${arr[i].LanguageEnglish}-language-btn`
        langBtnContainer.innerHTML = `
      <div id="${divId}" class="flourish-language-btn lang-translate-selector">
          <img class="language-icons" src="./flourish/img/language/${arr[i].FlorishIconfilename}"
              alt="${arr[i].LanguageEnglish}-${arr[i].LanguageAutonym} Language icon">
              <span class="translate-language-span notranslate">${arr[i].LanguageAutonym}</span>
      </div>
      `
        destination.append(langBtnContainer)
    }
    const flourishLangSearchBtn = document.getElementById('flourish-language-search')
    flourishLangSearchBtn.parentNode.appendChild(flourishLangSearchBtn)
    // langBtnClickHandler()

}



const stateBtnIconContainer = document.getElementById('flourish-language-presets')

genLanguageBtns(genCurrStateFullData(), stateBtnIconContainer)



// document.querySelectorAll('.lang-translate-selector').forEach(item => translateNotSupported(item))


