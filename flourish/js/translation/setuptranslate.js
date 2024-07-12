function googleTranslateElementInit() {
    try {
        new google.translate.TranslateElement({ pageLanguage: "en" }, "google_translate_element");
        // add event listener to change url param on language selection change
        console.log('Google translate successfully initialized')
        let langSelector = document.querySelector(".goog-te-combo");
        langSelector.addEventListener("change", function () {
            let lang = langSelector.value;
            let newurl =
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                "?lang=" +
                lang;
            window.history.pushState({ path: newurl }, "", newurl);
        });
        handleGoogleTranslateCookie()
    } catch (error) {
        console.error("Google Translate failed to initialize", error);
        // Hide the language section content
        document.getElementById("language-section-content").style.display = "none";
        // Show the "translate failed" message section
        document.getElementById("translate-failed-message").style.display = "block";
    }
}

const handleGoogleTranslateCookie = () => {
    if ($.cookie('googtrans')) {
        const cookieLangVal = $.cookie('googtrans')
        const filteredVal = cookieLangVal.replace("/en/", "");
        document.querySelector('.goog-te-combo').value = filteredVal
        const currLanguageItem = worldLanguageData.filter(lang => lang.LanguageCodeGoogleTrans === filteredVal)[0]
        const currLanguageText = currLanguageItem.LanguageEnglish
        widgetItemObj.isTranslated = true
        addWidgetControls('google-translate', `Google translate: ${currLanguageText}`)
        setCurrLangBubble(filteredVal)
        checkIfWidgetActive()
    }
}

document.addEventListener("DOMContentLoaded", function () {
    (function () {
        let googleTranslateScript = document.createElement("script");
        googleTranslateScript.type = "text/javascript";
        googleTranslateScript.async = true;
        googleTranslateScript.src =
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        googleTranslateScript.onerror = function () {
            console.error("Error loading Google Translate script");
            // Hide the language section content
            document.getElementById("language-section-content").style.display = "none";
            // Show the "translate failed" message section
            document.getElementById("translate-failed-message").style.display = "block";
        };
        (document.getElementsByTagName("head")[0] ||
            document.getElementsByTagName("body")[0]).
            appendChild(googleTranslateScript);
    })();
});

