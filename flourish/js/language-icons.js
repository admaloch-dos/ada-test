

const dismissGoogleTranslate = () => {

    removeWidgetControls(['google-translate'])
    widgetItemObj.isTranslated = false
    $.removeCookie('translateLanguage');
    $.removeCookie('googTransCode');
    checkIfWidgetActive()

    // find `iframe` element with GoogleTranslate select and buttons
    var iframe = document.getElementsByClassName('goog-te-banner-frame')[0]
        || document.getElementById(':1.container');
    if (!iframe) return;

    // search all buttons from the retrieved iframe
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var restore_el = innerDoc.getElementsByTagName("button");

    // fire `click` event on the `restore` button, that `Shows the origin`
    for (var i = 0; i < restore_el.length; i++) {
        if (restore_el[i].id.indexOf("restore") >= 0) {
            restore_el[i].click();
            return;
        }
    }

}

function googleTranslateElementInit() {
    setTimeout(() => {
        let isTranslateSuccessful = false
        try {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                layout: google.translate.TranslateElement

            }, 'google_translate_element');
            console.log('translate successfule')
            isTranslateSuccessful = true
        } catch {
            console.log('translate failed')
        }
        console.log('Google translate', isTranslateSuccessful)
        if (!isTranslateSuccessful) {
            $('.language-section-content').hide()
            $('#translate-failed-message').hide()
        }

    }, 1000)
}

const handleTranslateCookieLoad = () => {

    if ($.cookie('googtrans') && $.cookie('googtrans') !== '/en/en') {
        const googleTransCode = $.cookie('googtrans').slice(4)
        setCurrLang(googleTransCode)

        // console.log('trans code', googleTransCode)
        if ($.cookie('translateLanguage')) {
            const currLanguage = $.cookie('translateLanguage')
            widgetItemObj.isTranslated = true

            addWidgetControls('google-translate', `Translated to ${currLanguage}`)


            $('#tail').addClass('transform-tail')
        }
        checkIfWidgetActive()
    }
}

function triggerChange(element) {
    let changeEvent = new Event('change');
    element.dispatchEvent(changeEvent);
}

const translateWidgetControls = (selectVal, currLanguage) => {

    if (selectVal !== 'en') {

        if (selectVal !== 'en') {

            addWidgetControls('google-translate', `Translated to ${currLanguage}`)
            widgetItemObj.isTranslated = true



            // setTimeout(()=> document.body.style.top = '0px',5000)

            $.cookie("translateLanguage", currLanguage, { expires: 30 });

        }
    } else {

        dismissGoogleTranslate()
    }
    checkIfWidgetActive()

}

const translatePageHandler = (selector) => {

    if (selector) {

        handleTranslateCookieLoad()
        selector.addEventListener("change", (event) => {
            $('#tail').addClass('transform-tail')
            const selectVal = event.target.value
            const currLanguage = selector.options[selector.selectedIndex].text
            translateWidgetControls(selectVal, currLanguage)
        });
        document.querySelectorAll('.lang-translate-selector').forEach(btn => {
            btn.addEventListener('click', () => {
                let newSelectVal = btn.id
                selector.value = newSelectVal
                triggerChange(selector);
                // console.log(newSelectVal)
                setCurrLang(newSelectVal)

            })
        })
    } else {
        // console.log('it failed')
    }

}

//   to grab elements that are loaded asynchronously ex. google translate
const isElementLoaded = async selector => {
    while (document.querySelector(selector) === null) {
        await new Promise(resolve => requestAnimationFrame(resolve))
    }
    return document.querySelector(selector);
};



isElementLoaded('.goog-te-combo').then((selector) => translatePageHandler(selector));

let usState = 'florida'



// currstate select
const statesSelect = document.querySelector('#us-states')

for (let i = 0; i < usStatesLanguagesData.length; i++) {
    // console.log(usStatesLanguagesData[i].state)
    const newOption = document.createElement('option')
    newOption.innerText = usStatesLanguagesData[i].state
    newOption.value = usStatesLanguagesData[i].state
    statesSelect.append(newOption)
}



// get curr state if defind in html
const getCurrState = () => {
    const stateDataAttribute = (document.getElementById('flourish-widget-main').dataset.state)
    return stateDataAttribute
        ? stateDataAttribute.charAt(0).toUpperCase() + stateDataAttribute.slice(1)
        : "United States"
}

// grab state arr of common langs and iterate over full data set
//combine lang code - eng lang - and lang in its own lang.. filter out duplicates then return
const genCurrStateFullData = () => {
    // let currState = getCurrState().trim().toLowerCase().replace(' ', '')

    let currState = usState.trim().toLowerCase().replace(' ', '')

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
    // let timeout = null;
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
    // document.querySelectorAll('.flourish-language-btn-container')
    // $('#no-results-error')
    const flourishLangSearchBtn = document.getElementById('flourish-language-search')
    // console.log(flourishLangSearchBtn)
    flourishLangSearchBtn.parentNode.appendChild(flourishLangSearchBtn)

}

const stateBtnIconContainer = document.getElementById('flourish-language-presets')
// const allLangModalBody = document.getElementById('flourish-all-language-presets')


statesSelect.addEventListener('change', (e) => {

    usState = e.target.value

    stateBtnIconContainer.innerHTML = ''
    genLanguageBtns(genCurrStateFullData(), stateBtnIconContainer)
    isElementLoaded('.goog-te-combo').then((selector) => translatePageHandler(selector));
    document.querySelectorAll('.search-list-item').forEach(item => {
        translateNotSupported(item)
        item.addEventListener('click', () => {
            if (!item.classList.contains('disable')) {
                $('.search-list').hide()
                langSearchInput.value = ''
            }

        })
    })

})




// gen main widget presets based on state in html
genLanguageBtns(genCurrStateFullData(), stateBtnIconContainer)
//add buttons to the modal with all language options

// btns have a google translate code set as their id... if the language isn't supported there won't be a code and it will have the language + 'language-btn' added as id instead
const translateNotSupported = (item) => {
    if (item.id.includes('language-btn')) {
        $(function () {
            $('.flourish-popover').popover({
                container: '#flourish_widget'
            })
        })
        // console.log('translate not supported ran')
        item.classList.add('disable', 'flourish-popover')
        if (!item.classList.contains('search-list-item')) {
            item.setAttribute("data-container", '#flourish_widget');
            item.setAttribute("data-trigger", 'hover');
            item.setAttribute("data-toggle", 'popover');
            item.setAttribute("data-placement", 'top');
            item.setAttribute("data-content", 'Language not currently supported');
        }
    }
}

document.querySelectorAll('.lang-translate-selector').forEach(item => translateNotSupported(item))

// set curr language item item -- when lang btn pressed
const setCurrLang = (googTranslateCode) => {
    const currLangIcon = document.querySelector('#curr-language-icon')
    const currLangText = document.querySelector('#curr-language-text')
    let currItem = worldLanguageData.filter(item => item.LanguageCodeGoogleTrans === googTranslateCode)[0]
    currLangIcon.src = `./flourish/img/language/${currItem.FlorishIconfilename}`;
    currLangText.innerText = currItem.LanguageAutonym;
}


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
    // event.preventDefault();

    // console.log('filteredLangResults length', filteredLangResults.length)
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
    isElementLoaded('.goog-te-combo').then((selector) => translatePageHandler(selector));
    document.querySelectorAll('.search-list-item').forEach(item => {
        translateNotSupported(item)
        item.addEventListener('click', () => {
            if (!item.classList.contains('disable')) {
                $('.search-list').hide()
                langSearchInput.value = ''
            }

        })
    })

}

// remove searchList on click
$('.modal_content').click(function (event) {
    if (!$(event.target).closest('#search-list').length && !$(event.target).is('#search-list')) {
        $('#search-list').hide()
    }
});

// populate the dropdown search list in the main search (not modal)
const genSearchBtns = (arr) => {
    // console.log('gen search btns ran')
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
}

let filterParam = 'All'
document.querySelectorAll('.lang-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!btn.classList.contains('active')) {
            $("#all-languages-modal-body").scrollTop(0)
            document.querySelectorAll('.lang-filter').forEach(item => item.classList.remove('active'))
            btn.classList.add('active')
            const modalSearchInput = document.getElementById('search-lang-modal')
            modalSearchInput.value = ''
            filterParam = btn.dataset.info
            if (filterParam === 'ContinentAndRegion') {
                setGeoLocationResults(worldLanguageData)
                languageBtnHandler()
            } else if (filterParam === 'LanguageScriptAutonym') {
                setLanguageScriptResults(worldLanguageData)
                languageBtnHandler()
            } else {
                setDefaultModal()
            }
            $('#no-results-error').hide()
        }

    })
})

const languageBtnHandler = () => {
    document.querySelectorAll('.lang-translate-selector').forEach(item => {
        translateNotSupported(item)
        item.addEventListener('click', () => {
            if (!item.classList.contains('disable')) {
                $('#all-languages-modal').modal('hide')
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
            }

        })
    })
    isElementLoaded('.goog-te-combo').then((selector) => translatePageHandler(selector));
}

if (hasTouchScreen) {
    $("#search-lang-modal").click(function () {
        document.querySelector(".all-language-modal-search").scrollIntoView();
    });
}

// search input for language choose modal
const searchLangModalHandler = () => {

    const modalSearchInput = document.getElementById('search-lang-modal')
    let searchTerm = (modalSearchInput.value).trim();
    let filteredSearchArr = genFilteredLangResults(searchTerm)
    // console.log(filteredSearchArr)
    if (filterParam === 'All') {
        const allPresetsRow = document.getElementById('flourish-all-language-presets')
        allPresetsRow.innerHTML = ``
        genLanguageBtns(filteredSearchArr, allPresetsRow)
    } else if (filterParam === 'ContinentAndRegion') {
        setGeoLocationResults(filteredSearchArr)
        // searchTerm.length > 1 ? expandAllAccordionItems() : collapseAllAccordionItems()
    } else {
        setLanguageScriptResults(filteredSearchArr)
        // searchTerm.length > 1 ? expandAllAccordionItems() : collapseAllAccordionItems()
    }
    languageBtnHandler()
    if (filteredSearchArr.length === 0) {
        $('#no-results-error').css("display", "flex")
        // console.log('no results')
    } else {
        $('#no-results-error').hide()
        // console.log('there are results')
    }
}

// generate an array of results based on search input
const genFilteredLangResults = (searchInput) => {
    searchInput = searchInput.toLowerCase()
    if (searchInput.length > 0) {
        const englishResults = worldLanguageData.filter(x => x.LanguageEnglish.toLowerCase().includes(searchInput) && x)
        const codeResults = worldLanguageData.filter(x => x.LanguageCode.toLowerCase().includes(searchInput) && x)
        const antonymResults = worldLanguageData.filter(x => x.LanguageAutonym.toLowerCase().includes(searchInput) && x)
        const combinedResults = [...englishResults, ...codeResults, ...antonymResults]
        const filterDupes = removeDuplicates(combinedResults)
        return filterDupes
    } else {
        return worldLanguageData
    }
}

// func to remove duplicate results from an array
const removeDuplicates = (arr) => {
    return [...new Set(arr)];
}

const setDefaultModal = () => {
    const modalBody = document.getElementById('all-languages-modal-body')
    modalBody.innerHTML = ``
    const presetsRow = document.createElement('div')
    presetsRow.classList.add("row", "d-flex", "flex-wrap", "justify-content-center", "align-items-start")
    presetsRow.id = "flourish-all-language-presets"
    modalBody.append(presetsRow)
    genLanguageBtns(worldLanguageData, presetsRow)
    languageBtnHandler()

}
setDefaultModal()

const setGeoLocationResults = (arr) => {
    const sectionId = "geo-location-section"
    genAccordion(sectionId)

    const allContinentsList = removeDuplicates(arr.map(x => x.Continent).sort())
    // console.log(allContinentsList)
    for (let i = 0; i < allContinentsList.length; i++) {
        const currContinent = allContinentsList[i] ? allContinentsList[i] : "Worldwide"
        genAccordionItems(currContinent, document.querySelector('.flourish-accordion'), 'icons')
        const itemsInCurrContinentArr = arr.filter(x => x.Continent === allContinentsList[i] && x)
        const currContinentRegionsList = removeDuplicates(itemsInCurrContinentArr.map(x => x.ContinentAndRegion))
        for (let j = 0; j < currContinentRegionsList.length; j++) {
            const currRegion = currContinentRegionsList[j] ? currContinentRegionsList[j] : "Worldwide"
            let updatedArr = []
            updatedArr = currRegion === 'Worldwide'
                ? arr.filter(x => x.WorldwideUse && x)
                : itemsInCurrContinentArr.filter(x => x.ContinentAndRegion === currContinentRegionsList[j] && x)
            genAccordionPanels(currContinent, updatedArr, currRegion)
        }
    }
    keyInputAccordionHandler(allContinentsList.length)
    accordionCollapseFunc()
}


const setLanguageScriptResults = (arr) => {
    const sectionId = "lang-script-section"
    genAccordion(sectionId)
    const allLangScriptsList = removeDuplicates(arr.map(x => x.LanguageScriptAutonym).sort())
    for (let i = 0; i < allLangScriptsList.length; i++) {
        const currLangScript = allLangScriptsList[i]
        const itemsInCurrLangScriptArr = arr.filter(x => x.LanguageScriptAutonym === allLangScriptsList[i] && x)
        genAccordionItems(currLangScript, document.querySelector('.flourish-accordion'))
        genAccordionPanels(currLangScript, itemsInCurrLangScriptArr)
    }
    keyInputAccordionHandler(allLangScriptsList.length)
    accordionCollapseFunc()
}

const genAccordion = (sectionId) => {
    const modalBody = document.querySelector('#all-languages-modal-body')
    modalBody.innerHTML = ''
    const accordionContainer = document.createElement('section')
    accordionContainer.id = sectionId
    accordionContainer.classList.add('row', 'flourish-accordion')
    modalBody.append(accordionContainer)
}


const genAccordionItems = (currItem, destination, needsIcons) => {
    const formatCurrItem = currItem.trim().replace(/\s/g, '-').toLowerCase()
    const accordionRow = document.createElement('div')
    accordionRow.classList.add('flourish-accordion-item')
    accordionRow.id = `${formatCurrItem}-accordion`
    accordionRow.setAttribute("data-filter-id", currItem);
    const accordionBtn = document.createElement('div')
    accordionBtn.classList.add('flourish-accordion-header')
    // console.log(formatCurrItem)
    const header = document.createElement('h5')
    header.innerText = `${currItem}`
    const iconImg = `${formatCurrItem}.png`
    if (needsIcons) {
        const imgContainer = document.createElement('div')
        imgContainer.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'ml-2')
        imgContainer.innerHTML = `
      <img class="geo-location-icons" src="./flourish/img/${formatCurrItem}.png" alt="${formatCurrItem} icon">
      `
        imgContainer.append(header)
        accordionBtn.append(imgContainer)
    } else {
        header.classList.add('notranslate')
        accordionBtn.append(header)
    }
    const accordionPanel = document.createElement('div')
    accordionPanel.classList.add('flourish-accordion-content')
    accordionRow.append(accordionBtn, accordionPanel)
    destination.append(accordionRow)
}

const genAccordionPanels = (currItem, currItemArr, subItem) => {
    const newRow = document.createElement('div')
    newRow.classList.add('row', 'd-flex', 'flex-column', 'align-items-center', 'filter-row-style')
    if (subItem) {
        if (subItem !== 'Oceania' && subItem !== 'South America' && subItem !== 'North America' && subItem !== 'Worldwide') {
            newRow.innerHTML = `<h6>${subItem}</h6>`
        }
    }
    subItem && newRow.setAttribute("data-filter-id", `${subItem}`);
    const btnContainer = document.createElement('div')
    btnContainer.classList.add('row', 'd-flex', 'justify-content-center', 'accordion-btn-container')
    genLanguageBtns(currItemArr, btnContainer)
    newRow.append(btnContainer)
    document.querySelectorAll(`div[data-filter-id="${currItem}"]`)[0].querySelector('.flourish-accordion-content').append(newRow)

}





// accordion js
const accordionCollapseFunc = () => {
    $(document).ready(function () {
        $(".flourish-accordion-header").click(function () {

            $(this).toggleClass("active")
                .next(".flourish-accordion-content")
                .slideToggle()
                .parent()
                .siblings()
                .find(".flourish-accordion-content")
                .slideUp()
                .prev()
                .removeClass("active");
        });
    });
}




const keyInputAccordionHandler = (numResults) => {
    if (numResults < 3 && numResults > 0) {
        expandAllAccordionItems()
    } else {
        collapseAllAccordionItems()
    }
}

const expandAllAccordionItems = () => {
    $(".flourish-accordion-header").each(function () {
        $(this).addClass("active").next(".flourish-accordion-content").slideDown()
    });
}

const collapseAllAccordionItems = () => {
    $(".flourish-accordion-header").each(function () {
        $(this).removeClass('active').next(".flourish-accordion-content").slideUp()
    });
}



const resetLangueModal = () => {
    setDefaultModal()
    collapseAllAccordionItems()
    document.querySelectorAll('.lang-filter').forEach(item => item.classList.remove('active'))
    document.getElementById('all-languages-filter').classList.add('active')
    document.getElementById('search-lang-modal').value = ''
    document.getElementById('flourish-search-input').value = ''
    // document.getElementById('search-list').value = ''
    $('#search-list').fadeOut()

}

document.getElementById('flourish-more-languages-btn').addEventListener('click', () => {
    resetLangueModal()
})




// select








