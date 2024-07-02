//in popup language modal - 3 filter sections
let filterParam = 'All'
document.querySelectorAll('.lang-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log(btn)
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
            if (!item.classList.contains('disable') && !item.classList.contains('audio_state')) {
                $('#all-languages-modal').modal('hide')
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
            }
        })
    })



}

if (hasTouchScreen) {
    $("#search-lang-modal").click(function () {
        document.querySelector(".all-language-modal-search").scrollIntoView();
    });
}

//search for main
var modalSearchTimer;
const searchLangModalHandler = () => {
    const modalSearchInput = document.getElementById('search-lang-modal')
    let searchTerm = (modalSearchInput.value).trim();
    let filteredSearchArr = genFilteredLangResults(searchTerm)
    if (filterParam === 'All') {
        const allPresetsRow = document.getElementById('flourish-all-language-presets')
        allPresetsRow.innerHTML = ``
        genLanguageBtns(filteredSearchArr, allPresetsRow)
    } else if (filterParam === 'ContinentAndRegion') {
        setGeoLocationResults(filteredSearchArr)
    } else {
        setLanguageScriptResults(filteredSearchArr)
    }
    languageBtnHandler()
    if (filteredSearchArr.length === 0) {
        $('#no-results-error').css("display", "flex")
    } else {
        $('#no-results-error').hide()
        clearTimeout(modalSearchTimer);
        modalSearchTimer = setTimeout(() => resetTextToSpeech(), 500);
    }

}



// var timeoutId = 0;
// document.getElementById('search-lang-modal').addEventListener('input', function (evt) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(resetTextToSpeech, 600);
// })



$('#search-lang-modal').change(function () {
    console.log('this ran')
});

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
document.querySelector('#flourish-more-languages-btn').addEventListener('click', () =>{
   setDefaultModal()
   document.body.style.overflow = 'hidden';

})


const setGeoLocationResults = (arr) => {
    const sectionId = "geo-location-section"
    genAccordion(sectionId)
    const allContinentsList = removeDuplicates(arr.map(x => x.Continent).sort())
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