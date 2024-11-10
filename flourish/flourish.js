// code related to checking cookies/data/if widget is active or not
// data to determine if widget is still active / widget active items
let isWidgetActive = false
const cookiesArr = ['TTS_click_enabled', 'DarkContrastBackground', 'DesaturateBackground', 'InvertBackground', 'HighSaturationBackground',
  'LowSaturationBackground', 'AEC', '1P_JAR', 'NID', 'DV', 'translateLanguage', 'text-magnify-color-swatch', 'text-magnify-size-input', 'img-magnify-size-input', 'img-magnify-color-swatch', 'text-magnify-color-swatch', '.img-magnify-color-swatch', 'edit-reading-guide', 'edit-reading-mask', 'TTS_click_enabled', 'googtrans', 'readingMaskVal', 'BackgroundColorCookie', 'TextColorCookie', 'LinkColorCookie', 'TextMagnifier', 'HighlightLinks', 'ImageDescription', 'HighlightHover', 'FontSizeCookie', 'FT_Baskerville', 'FT_Dyslexic', 'CursorEnlargeCookie', 'PhotoSens', 'ReadingMask', 'CursorGuide', 'TTS_click_enabled', 'LinpageHeightVal', 'WordSpaceVal', 'LetterSpaceVal', 'speechPitch', 'speechRate', 'speechVol', 'voiceCookie']
let widgetItemObj = {
  isHighlighted: false,
  isOutlined: false,
  isTextMag: false,
  isImgMag: false,
  isFontBig: false,
  isFontChanged: false,
  isCursorBig: false,
  isLineHeightChanged: false,
  isWordSpaceChanged: false,
  isLetterSpaceChanged: false,
  'isDarkContrast': false,
  'isDesaturated': false,
  'isInverted': false,
  'isHighSat': false,
  'isLowSat': false,
  isTextColorChanged: false,
  isBackColorChanged: false,
  isLinkColorChanged: false,
  isPhotoSens: false,
  isReadingMask: false,
  isReadingGuide: false,
  isSpeech: false,
  isDyslexicFont: false,
  isBaskervilleFont: false,
  isTranslated: false,
}

// function to reset all cookies
const removeAllCookies = () => {
  for (let i = 0; i < cookiesArr.length; i++) {
    $.removeCookie(cookiesArr[i]);
  }
}

// reset widgetItemObj on cookie load
const isCookieActive = (input, value) => {
  if (input && input !== value) {
    return true
  } else {
    return false
  }
}

const areCookiesSet = () => {
  let updateCookies = widgetItemObj
  updateCookies.isHighlighted = isCookieActive($.cookie("HighlightHover"), 'false')
  updateCookies.isOutlined = isCookieActive($.cookie("HighlightLinks"), 'false')
  updateCookies.isTextMag = isCookieActive($.cookie("TextMagnifier"), 'false')
  updateCookies.isImgMag = isCookieActive($.cookie("ImageDescription"), 'false')
  updateCookies.isFontBig = isCookieActive($.cookie("FontSizeCookie"), 'null')
  updateCookies.isCursorBig = isCookieActive($.cookie("CursorEnlargeCookie"), 'null')
  updateCookies.isLineHeightChanged = isCookieActive($.cookie("LinpageHeightVal"), 'inherit')
  updateCookies.isWordSpaceChanged = isCookieActive($.cookie("WordSpaceVal"), 'inherit')
  updateCookies.isLetterSpaceChanged = isCookieActive($.cookie("LetterSpaceVal"), 'inherit')
  updateCookies.isLowSat = isCookieActive($.cookie("LowSaturationBackgroundCookie"), 'null')
  updateCookies.isHighSat = isCookieActive($.cookie("HighSaturationBackgroundCookie"), 'null')
  updateCookies.isInverted = isCookieActive($.cookie("InvertBackground"), 'null')
  updateCookies.isDesaturated = isCookieActive($.cookie("DesaturatedBackground"), 'null')
  updateCookies.isDarkContrast = isCookieActive($.cookie("DarkContrastBackground"), 'null')
  updateCookies.isTextColorChanged = isCookieActive($.cookie("TextColorCookie"), 'false')
  updateCookies.isBackColorChanged = isCookieActive($.cookie("BackgroundColorCookie"), 'false')
  updateCookies.isLinkColorChanged = isCookieActive($.cookie("LinkColorCookie"), 'false')
  updateCookies.isPhotoSens = isCookieActive($.cookie("PhotoSens"), 'false')
  updateCookies.isReadingMask = isCookieActive($.cookie("ReadingMask"), 'false')
  updateCookies.isReadingGuide = isCookieActive($.cookie("CursorGuide"), 'false')
  updateCookies.isSpeech = isCookieActive($.cookie("TTS_click_enabled"), 'false')
  updateCookies.isBaskervilleFont = isCookieActive($.cookie("BaskervilleFontCookie"), 'null')
  updateCookies.isDyslexicFont = isCookieActive($.cookie("DyslexicFontCookie"), 'null')
  return updateCookies
}
widgetItemObj = areCookiesSet()

// check if widget items eval to true if so  fade in helper box
const checkIfWidgetActive = () => {
  if (Object.values(widgetItemObj).indexOf(true) > -1) {
    isWidgetActive = true
    $('#flourish_check_icon').fadeIn()
    $('#toggle-flourish-list, #reset-flourish').fadeIn()
  } else {
    isWidgetActive = false
    $('#flourish_check_icon').fadeOut()
    $('#toggle-flourish-list, #reset-flourish, #item-delete-container').fadeOut()
    $("#toggle-flourish-list").removeClass("fa-toggle-on");
    $("#toggle-flourish-list").addClass("fa-toggle-off");
    $.removeCookie('deleteContainerActive');
  }
}
checkIfWidgetActive()


//insert html for flourish to dom
const createFlourish = () => {
  const flourishContainer = document.querySelector('#flourish-widget-main')
  flourishContainer.innerHTML = `
  <div aria-hidden="true" id="text_magnify"></div>
  <div aria-hidden="true" id="ImageDescription_magnify"></div>
  <div aria-hidden="true" id="tail"></div>
  <div aria-hidden="true" class="reading-mask" id="top_mask"></div>
  <div aria-hidden="true" class="reading-mask" id="bottom_mask"></div>

  <div class="mb-2" id="google_translate_element" title="Translate Florida Memory">
  </div>

  <section id="flourish-trigger-container">
    <div id="flourish-triggers" class="flourish-triggers item-delete-container-remove ">
        <a href="" class="d-none" data-info="Set link color for link-change in modal"></a>
        <section class=" d-flex flex-wrap flex-column " id="Flourish_trigger">
            <div id="toggle-flourish-list-container" role="click to show current flourish active features">
                <img id="toggle-flourish-list" src="./flourish/img/toggle-off.svg" aria-label="toggle icon to show flourish active features"
                    alt="toggle active item container icon"
                    class="item-delete-container-remove toggle-item-icon hide-active-list flourish-popover-item "
                    data-trigger="hover" data-toggle="popover-main" data-placement="top"
                    data-content="View active items">
            </div>
            <div class="toggle-icon-container">
                <?xml version="1.0" encoding="utf-8"?>
                <svg alt="Accessibility button" id="flourish_icon" data-id="hide-img-hover" fill="#000000"
                    aria-label="open flourish accessibility menu" viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z" />
                </svg>
                <svg alt="Accessibility menu active icon" id="flourish_check_icon" aria-label="is flourish active icon"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-check-circle-fill"
                    viewBox="0 0 16 16">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
            </div>
        </section>
        <section id="item-delete-container" class="item-delete-container-remove"
            role="show currently active flourish menu items" aria-hidden="true">
            <ul id="widget-list" class="list-unstyled mt-2 mb-2"></ul>
            <div id="item-delete-footer" class="d-flex justify-content-center align-items-center">
                <button id="reset-flourish" aria-label="click to reset flourish menu to default" class="w-100 reset-flourish">Reset menu &nbsp
                    <img aria-labelledby="reset-flourish"
                        class="img-fluid flourish-reset-icon " loading="lazy" src="./flourish/img/reset.png"
                        alt="Restore default settings icon" />
                </button>
            </div>
        </section>
    </div>
</section>
<!-- The Modal -->
<section id="flourish_widget" class="flourish_modal_background" aria-label="main flourish widget" aria-hidden="true">
    <!-- Modal content -->
    <main id="flourish-modal-content" class="modal_content">
        <div class="flourish-modal-container d-flex justify-content-center flex-column align-items-center" role="container for flourish modal content">
            <header class="modal_header">
                <img id="flourish-logo-icon" width="50" height="50" class="img-fluid flourish-icon-style mr-2 " loading="lazy"
                    src="./flourish/img/flourish-logo-square-sm-white-text.png" aria-label="flourish logo icon" alt="Flourish logo icon" />
                <div class="row flourish-header-row">
                    <div id="flourish-header-title"
                        class="col-12 col-md-6 d-flex flex-wrap align-items-center justify-content-center justify-content-md-start">
                        <h1 class="nowrap text-center" id="main-modal-title">Accessibility Menu</h1>
                    </div>
                    <div id="default-btn-container"
                        class="col-12 col-md-6 d-flex flex-wrap justify-content-center justify-content-md-end align-items-md-center">
                        <button onclick="resetflourishModal()" type="button"
                            class="btn mr-md-4 d-flex justify-content-center align-items-center" title="Reset Settings"
                            aria-label="Reset Settings" id="flourish_reset">
                            <img class="img-fluid flourish-reset-icon" aria-labelledby="flourish_reset"  loading="lazy" src="./flourish/img/reset.png"
                                alt="Restore default settings icon" />Restore default
                        </button>
                    </div>
                    <button id="close-flourish" type="button" class="btn btn-link flourish_close" aria-label="Close"
                        title="Close" role="button">
                        <img loading="lazy" src="./flourish/img/x.svg" alt="close-flourish-icon"
                            id="close-flourish-icon" class="close-icon " aria-labelledby="close-flourish">
                    </button>
                </div>
            </header><!-- modal_header -->
            <section class="modal_body" id="accessibility">
                <div id="modal-container-item" class="container-fluid">
                    <section id="navigation-section" class="flourish-section-container">
                        <header class="flourish-section-header">
                            <h2 class="d-inline">Navigation and Links</h2>
                        </header>
                        <section id="navigation-selects"
                            class="row justify-content-between align-items-center menu-selects flourish-sub-section">
                            <div class="col-12 col-lg-6 d-flex flex-wrap justify-content-center align-items-center "
                                id=" SiteMap_option" role="list of primary website links">
                                <form
                                    class="siteMap_form form-inline select-container  d-flex flex-wrap justify-content- flex-nowrap">
                                    <img class="img-fluid flourish-icon-style " loading="lazy" aria-label="site navigation icon"
                                        src="./flourish/img/sitemap.png" alt="Site map icon" />
                                    <select class="form-control" role="links to main website links" id="select_page" onchange="location = this.value;">
                                        <option class="text-center site-nav-select-title" selected disabled>Website
                                            Navigation</option>
                                        <option value="https://www.floridamemory.com/" style="font-weight:bold;">
                                            Homepage</option>
                                        <optgroup label="Discover" id="discover_group">
                                            <option value="https://www.floridamemory.com/discover/">Discover
                                            </option>
                                            <option value="https://www.floridamemory.com/discover/photographs/">
                                                Photographs</option>
                                            <option value="https://www.floridamemory.com/discover/historical_records/">
                                                Historical
                                                Records
                                            </option>
                                            <option value="https://www.floridamemory.com/discover/maps/">Maps
                                            </option>
                                            <option value="https://www.floridamemory.com/discover/audio/">Audio
                                            </option>
                                            <option value="https://www.floridamemory.com/discover/video/">Video
                                            </option>
                                        </optgroup>
                                        <optgroup label="Learn" id="learn_group">
                                            <option value="https://www.floridamemory.com/learn/">Learn</option>
                                            <option value="https://www.floridamemory.com/learn/about/">About
                                                Florida Memory</option>
                                            <option value="https://www.floridamemory.com/learn/classroom/">
                                                Classroom</option>
                                            <option value="https://www.floridamemory.com/learn/floridiana/">
                                                Floridiana Articles
                                            </option>
                                            <option value="https://www.floridamemory.com/learn/exhibits/">Exhbits
                                            </option>
                                            <option value="https://www.floridamemory.com/learn/research-tools/">
                                                Research Tools</option>
                                        </optgroup>
                                        <optgroup label="Share" id="share_group">
                                            <option value="https://www.floridamemory.com/share/">Share</option>
                                            <option value="https://www.floridamemory.com/share/connect/">Connect
                                                With Us</option>
                                            <option value="https://www.floridamemory.com/share/donate/">Donate
                                                Records</option>
                                            <option value="https://www.floridamemory.com/share/order-info/index.php">
                                                Order</option>
                                        </optgroup>
                                        <optgroup label="Footer" id="footer_group">
                                        </optgroup>
                                    </select>
                                </form><!-- orientationAdjustments_form -->
                            </div><!-- col-12 col-lg-4 -->
                            <div id="flourish-keyboard-shortcuts" role="Common keyboard shortcuts for mac and windows"
                                class=" col-6 d-none d-lg-flex flex-wrap justify-content-center flex-nowrap align-items-center">
                                <img id="keyboard-shortcuts-icon" class="img-fluid flourish-icon-style " loading="lazy" aria-label="keyboard shortcuts icon"
                                    src="./flourish/img/keyboard.png" alt="Keyboard shortcuts icon" />
                                <button class="btn btn-link ml-2" type="button" data-toggle="modal"
                                    data-target="#keyboard_shortcuts" aria-labelledby="keyboard-shortcuts-icon" id="keyboard_shortcutsBtn">Keyboard Shortcuts
                                </button>
                                <div class="modal fade" id="keyboard_shortcuts" tabindex="-1"
                                    aria-labelledby="keyboard_shortcuts" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                                        <div class="modal-content">
                                            <div class="modal_header  ">
                                                <button type="button" class="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <input class="form-control" id="myInput" type="text"
                                                    placeholder="Search..">
                                                <br>
                                                <div class="table-responsive">
                                                    <table class="table table-bordered">
                                                        <thead class="thead-dark">
                                                            <tr>
                                                                <th>Description</th>
                                                                <th>Windows</th>
                                                                <th>Mac OS</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="myTable">
                                                            <tr class="table-secondary">
                                                                <td style="height:25px;"><strong>Toggle widget
                                                                        items</strong></td>
                                                                <td style="height:25px;"></td>
                                                                <td style="height:25px;"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Open/Close Menu</td>
                                                                <td>Shift + A</td>
                                                                <td>Shift + A</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Reset menu</td>
                                                                <td>Shift + Q</td>
                                                                <td>Shift + Q</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Highlight links on Hover</td>
                                                                <td>Shift + 1</td>
                                                                <td>Shift + 1</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Highlight all links</td>
                                                                <td>Shift + 2</td>
                                                                <td>Shift + 2</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Text magnifier</td>
                                                                <td>Shift + 3</td>
                                                                <td>Shift + 3</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Show image description</td>
                                                                <td>Shift + 4</td>
                                                                <td>Shift + 4</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Photosensitivity filter</td>
                                                                <td>Shift + 5</td>
                                                                <td>Shift + 5</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Reading Mask</td>
                                                                <td>Shift + 6</td>
                                                                <td>Shift + 6</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Reading Guide</td>
                                                                <td>Shift + 7</td>
                                                                <td>Shift + 7</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Reading Guide</td>
                                                                <td>Shift + 7</td>
                                                                <td>Shift + 7</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Text to speech</td>
                                                                <td>Shift + 8</td>
                                                                <td>Shift + 8</td>
                                                            </tr>
                                                            <tr class="table-secondary">
                                                                <td style="height:25px;"><strong>Navigation</strong>
                                                                </td>
                                                                <td style="height:25px;"></td>
                                                                <td style="height:25px;"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Florida Memory homepage</td>
                                                                <td>Shift + H</td>
                                                                <td>Shift + H</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Scroll down a frame</td>
                                                                <td>Space or Page Down</td>
                                                                <td>Space or Fn + Down Arrow</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Scroll up a frame</td>
                                                                <td>Shift + Space or Page Up</td>
                                                                <td>Shift + Space or Fn + Up Arrow</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Go to bottom of the page</td>
                                                                <td>End</td>
                                                                <td>Cmd + Down Arrow</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Go to top of the page </td>
                                                                <td>Home</td>
                                                                <td>Cmd + Up Arrow</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Go back</td>
                                                                <td>Alt + Left Arrow or Backspace</td>
                                                                <td>Cmd + Left Arrow</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Go forward</td>
                                                                <td>Alt + Right Arrow or Shift + Backspace</td>
                                                                <td>Cmd + Right Arrow</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Refresh a webpage</td>
                                                                <td>F5</td>
                                                                <td>Cmd + R</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Refresh a webpage (no cache)</td>
                                                                <td>Ctrl + F5</td>
                                                                <td>Cmd + Shift + R</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Stop</td>
                                                                <td>Esc</td>
                                                                <td>Esc</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Toggle full-screen</td>
                                                                <td>F11</td>
                                                                <td>Cmd + Shift + F</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Zoom in</td>
                                                                <td>Ctrl + +</td>
                                                                <td>Cmd + +</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Zoom out</td>
                                                                <td>Ctrl + -</td>
                                                                <td>Cmd + -</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Zoom 100% (default)</td>
                                                                <td>Ctrl + 0</td>
                                                                <td>Cmd + 0</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Find text</td>
                                                                <td>Ctrl + F</td>
                                                                <td>Cmd + F </td>
                                                            </tr>
                                                            <tr>
                                                                <td>&nbsp;</td>
                                                                <td>&nbsp;</td>
                                                                <td>&nbsp;</td>
                                                            </tr>
                                                            <tr class="table-secondary">
                                                                <td style="height:25px;"><strong>Tab / Window
                                                                        Management</strong></td>
                                                                <td style="height:25px;"></td>
                                                                <td style="height:25px;"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Open a new tab</td>
                                                                <td>Ctrl + T</td>
                                                                <td>Cmd + T</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Close current tab</td>
                                                                <td>Ctrl + W</td>
                                                                <td>Cmd + W</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Close all tabs</td>
                                                                <td>Ctrl + Shift + W</td>
                                                                <td>Cmd + Q</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Close all tabs except the current tab</td>
                                                                <td>Ctrl + Alt + F4 </td>
                                                                <td>Cmd + Opt + W</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Go to next tab</td>
                                                                <td>Ctrl + Tab</td>
                                                                <td>Control + Tab or Cmd + Shift + Right Arrow</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Go to previous tab </td>
                                                                <td>Ctrl + Shift + Tab</td>
                                                                <td>Shift + Control + Tab or Cmd + Shift + Left
                                                                    Arrow</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Go to a specific tab number </td>
                                                                <td>Ctrl + 1-8</td>
                                                                <td>Cmd + 1-8 </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Go to the last tab</td>
                                                                <td>Ctrl + 9</td>
                                                                <td>Cmd + 9</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Reopen the last closed tab</td>
                                                                <td>Ctrl + Shift + T</td>
                                                                <td>Cmd + Shift + T </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Open a new window</td>
                                                                <td>Ctrl + N</td>
                                                                <td>Cmd + N</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Close current window</td>
                                                                <td>Alt + F4</td>
                                                                <td>Cmd + W</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Go to next window</td>
                                                                <td>Alt + Tab</td>
                                                                <td>Cmd + Tab</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Go to previous window </td>
                                                                <td>Alt + Shift + Tab</td>
                                                                <td>Cmd + Shift + Tab</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Reopen the last closed window</td>
                                                                <td>Ctrl + Shift + N</td>
                                                                <td>&nbsp;</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Open links in a new tab in the background</td>
                                                                <td>Ctrl + Click</td>
                                                                <td>Cmd + Click</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Open links in a new tab in the foreground</td>
                                                                <td>Ctrl + Shift + Click</td>
                                                                <td>Cmd + Shift + Click</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Print current webpage</td>
                                                                <td>Ctrl + P</td>
                                                                <td>Cmd + P</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Save current webpage</td>
                                                                <td>Ctrl + S</td>
                                                                <td>Cmd + S</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div><!--table-responsive-->
                                            </div><!-- modal body -->
                                        </div><!-- modal content -->
                                    </div><!-- modal dialog -->
                                </div><!--modal-->
                            </div><!-- col-12 col-lg-4 -->
                        </section><!-- row -->
                        <section id="link-emphasis" class="row flourish-sub-section">
                            <section id="HighlightHover_option"
                                class=" col-12 col-lg-6 d-none  d-lg-flex justify-content-center justify-content-lg-start ">
                                <div class="flourish_toggleContainer pb-0" id="HighlightHover">
                                    <div class="flourish_content">
                                        <div
                                            class="flourish-links-toggle-container justify-content-center justify-content-lg-start flex-wrap">
                                            <img class="img-fluid flourish-icon-style " loading="lazy"
                                                src="./flourish/img/highlight link.png" alt="Highlight on hover icon" />
                                            <h3
                                                class="type flourish_option_title text-wrap text-center text-sm-center text-lg-left ">
                                                Highlight
                                                on Hover
                                            </h3>
                                            <div class="flourish_toggle">
                                                <label class="switch" title="Toggle On/Off Highlight Hover">
                                                    <input type="checkbox" class="switch-input"
                                                        id="ToggleHighlightHover" name="HighlightHover">
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                            </div><!-- flourish_toggle -->
                                        </div>
                                        <div class="flourish-p-container ">
                                            <p class="description">Adds visual emphasis to all hyperlinks when
                                                hovering</p>
                                        </div>
                                    </div><!-- flourish_content -->
                                </div><!-- class="flourish_toggleContainer" id="HighlightHover" -->
                            </section><!-- col-12 col-md-6 -->
                            <section id="HighlightLinks_option"
                                class=" col-12 col-lg-6 d-flex flex-wrap justify-content-center justify-content-lg-start ">
                                <div class="flourish_toggleContainer pb-0" id="HighlightLinks">
                                    <div class="flourish_content text-center">
                                        <div
                                            class="flourish-links-toggle-container flex-wrap justify-content-center justify-content-lg-start ">
                                            <img class="img-fluid flourish-icon-style " loading="lazy"
                                                src="./flourish/img/highlight all links.png" alt="Outline links icon" />
                                            <h3
                                                class="type flourish_option_title text-wrap text-center text-sm-center text-lg-left ">
                                                Outline All
                                                Links
                                            </h3>
                                            <div id="highlight-toggle" class="flourish_toggle" aria-label="toggle highlight links">
                                                <label class="switch" aria-labelledby="highlight-toggle" title="Toggle On/Off Outline Links">
                                                    <input type="checkbox" class="switch-input" aria-labelledby="highlight-toggle"
                                                        id="ToggleHighlightLinks" name="HighlightLinks">
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                            </div><!-- flourish_toggle -->
                                        </div>
                                        <div
                                            class="flourish-p-container d-flex flex-wrap justify-content-center justify-content-md-start">
                                            <p class="description text-center text-lg-left">Adds visual emphasis to
                                                all
                                                hyperlinks</p>
                                        </div>
                                    </div><!-- flourish_content -->
                                </div><!-- class="flourish_toggleContainer" id="HighlightLinks" -->
                            </section><!-- col-12 col-md-6 -->
                        </section><!-- row -->
                    </section>
                    <section id="site-appearance-section" class="flourish-section-container">
                        <header class="flourish-section-header">
                            <h2 class="d-inline">Website Appearance</h2>
                        </header>
                        <section id="photo-filter" class="row flourish-sub-section">
                            <section
                                class="flourish-toggle-container col-12 ml-lg-2 d-flex flex-wrap justify-content-center justify-content-lg-start "
                                id="photosens_option">
                                <div class="flourish_toggleContainer pb-0" id="PhotoSens">
                                    <div class="flourish_content">
                                        <div
                                            class="d-flex flex-wrap justify-content-center justify-content-lg-start align-items-center">
                                            <img class="img-fluid flourish-icon-style " loading="lazy"
                                                src="./flourish/img/photo-sensitive.png"
                                                alt="Photosensitivity filter Icon" />
                                            <h3
                                                class="type flourish_option_title text-wrap text-center text-sm-center text-lg-left ">
                                                Photosensitivity Filter </h3>
                                            <div id="photofilter-toggle" class=" flourish_toggle" aria-label="toggle photo filter">
                                                <label class="switch" aria-labelledby="photofilter-toggle" title="Toggle On/Off Photosensitivity Filter"
                                                    aria-label="Toggle On/Off Photosensitivity Filter">
                                                    <input type="checkbox" class="switch-input" id="TogglePhotoFilter"
                                                        name="PhotoSens">
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                            </div><!-- flourish_toggle -->
                                        </div>
                                        <div
                                            class="flourish-p-container d-flex flex-wrap justify-content-center justify-content-lg-start">
                                            <p class="description text-center text-lg-left">Reduces color and
                                                removes flashes</p>
                                        </div>
                                    </div><!-- flourish_content -->
                                </div><!-- class="flourish_toggleContainer" id="PhotoSens" -->
                            </section><!-- col-12 col-lg-4 -->
                        </section>
                        <section id="color-schemes" class="row flourish-sub-section">
                            <div class="col-12 col-md-6  " id="color-scheme-presets">
                                <section class="bg_form " id="site-color-presets">
                                    <header
                                        class="section-title d-flex flex-wrap justify-content-center justify-content-lg-start align-items-center ">
                                        <img class="img-fluid flourish-icon-style " loading="lazy"
                                            src="./flourish/img/color-presets.png" alt="Website color presets icon" />
                                        <h3 class="flourish_option_title text-wrap text-center  ">Color
                                            Profiles
                                        </h3>
                                    </header>
                                    <div class="ml-lg-2 form-check  ">
                                        <ul aria-label="color profile options" id="color-profile-btns"
                                            class=" modal-btn-options w-100 d-flex flex-wrap justify-content-center justify-content-lg-start mb-0">
                                            <li id="DefaultBG_option" class="active">
                                                <a href="#!" id="defaultBackground"
                                                    class="backgroundOptions defaultBackground">
                                                    <div class="title">Default</div>
                                                </a>
                                            </li>
                                            <li id="DarkContrastBG_option" class="">
                                                <a href="#!" id="DarkContrastBackground"
                                                    class="backgroundOptions DarkContrastBackground">
                                                    <div class="title">Dark Contrast</div>
                                                </a>
                                            </li>
                                            <li id="DesaturateBG_option" class="">
                                                <a href="#!" id="DesaturateBackground"
                                                    class="backgroundOptions DesaturateBackground">
                                                    <div class="title">Desaturate</div>
                                                </a>
                                            </li>
                                            <br class="d-none d-md-block">
                                            <li id="InvertBG_option" class="">
                                                <a href="#!" id="InvertBackground"
                                                    class="backgroundOptions InvertBackground">
                                                    <div class="title">Invert</div>
                                                </a>
                                            </li>
                                            <li id="HighSaturationBG_option" class="">
                                                <a href="#!" id="HighSaturationBackground"
                                                    class="backgroundOptions HighSaturationBackground">
                                                    <div class="title">High Saturation</div>
                                                </a>
                                            </li>
                                            <li id="LowSaturationBG_option" class="">
                                                <a href="#!" id="LowSaturationBackground"
                                                    class="backgroundOptions LowSaturationBackground">
                                                    <div class="title">Low Saturation</div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div><!-- form check -->
                                </section><!-- bg_form -->
                            </div><!-- col-12 col-lg-4 Change Background Color-->
                            <div class="col-12 col-md-6 d-flex flex-wrap flex-column" id="ColorAdjust_option">
                                <div class="color_picker_form text-center">
                                    <div id="adjust-colors-title"
                                        class="mt-sm-1  section-title adjust-color-title  d-flex flex-wrap justify-content-center flex-column flex-sm-row justify-content-lg-start align-items-center">
                                        <header class="d-flex mb-1 mb-sm-0 justify-content-center align-items-center">
                                            <img class="img-fluid flourish-icon-style " loading="lazy"
                                                src="./flourish/img/adjust-color.png" alt="Adjust colors icon" />
                                            <h3 class="flourish_option_title text-wrap text-center">Adjust Colors
                                            </h3>
                                        </header>
                                        <div class="color-settings-btns d-flex justify-content-center">
                                            <button id="preset-color-btn"
                                                class="color-section-btn active" aria-label="show color presets">Presets</button>
                                            <button id="custom-color-btn" class="color-section-btn "aria-label="show custom color selectors">Custom</button>
                                            <span class="hidden-span" aria-hidden="true">Presets, Custom</span>
                                            <button data-container="#flourish_widget" data-trigger="hover"
                                                data-toggle="popover" data-placement="top" data-content="Reset colors"
                                                id="reset-color-picker"
                                                class="btn color-picker-btns  ml-2  justify-content-center align-items-center flourish-popover-item"
                                                role="button" type="button"><img data-id="hide-img-hover" class="img-fluid " loading="lazy"
                                                    src="./flourish/img/reset.png" alt="Reset img hover icon" />
                                            </button>
                                        </div>
                                    </div>
                                    <section id="custom-schemes" class="custom-color-schemes mt-2 mt-lg-3" role="custom color selection inputs">
                                        <div id="custom-color-pickers"
                                            class=" d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-lg-start align-items-center mb-1 mb-lg-0">
                                            <div>
                                                <div class="form-group " role="background color input">
                                                    <label class="flourish-setting-title " for="Background Color">
                                                        Background
                                                    </label>
                                                    <input type="color" form="" class="color_swatch custom-color-input"
                                                        id="background_color" title="Choose Background Color"
                                                        value="#ffffff">
                                                    <p class="hexVal" id="bg_hexVal">#ffffff</p>
                                                </div>
                                            </div>
                                            <div class="ml-1 mr-1">
                                                <div class="form-group "role="text color input">
                                                    <label class="flourish-setting-title " for="Text Color">
                                                        Text
                                                    </label>
                                                    <input type="color" class="color_swatch custom-color-input"
                                                        id="text_color" title="Choose Text Color" value="#000000">
                                                    <p class="hexVal" id="txt_hexVal">#000000</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="form-group" role="link color input">
                                                    <label class="flourish-setting-title " for="Link Color">
                                                        Links
                                                    </label>
                                                    <input type="color" class="color_swatch custom-color-input"
                                                        id="link_color" title="Choose Link Color" value="#3863FF">
                                                    <p class="hexVal" id="link_hexVal">#3863FF</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="contrast-section-container ">
                                            <div class="contrast-check-section d-flex flex-column align-items-center">
                                                <div class="contrast-checker mt- ">
                                                    <div id="link-text-text" class="contrast-text link-text-text">
                                                        <span id="both-text" class="both-text">Preview text color
                                                            and</span>&nbsp;<a id="both-link" class="both-link"
                                                            href="#">Link color</a>
                                                    </div>
                                                    &nbsp;
                                                    <button data-container="#flourish_widget" data-trigger="hover"
                                                        data-toggle="popover" data-placement="top" data-content="Both links and body text must have at least 4.5:1 contrast with the background (3:1 for
                    large
                    text) to meet WCAG 2 Level AA." type="button"
                                                        class=" flourish-popover-item btn color-picker-btns  wcag-modal-remove-selector d-flex justify-content-center align-items-cente"
                                                        id="OpenContrastModal" role="button"> <img
                                                            data-id="hide-img-hover" class="img-fluid " loading="lazy"
                                                            src="./flourish/img/question.png"
                                                            alt="Check contrast icon"></button>
                                                </div>
                                                <div class="contrast-checker  justify-content-start align-items-center">
                                                    <div class="contrast-text-info">Text to background</div>
                                                    &nbsp;
                                                    <div id="text-contrast" class="contrast-result">Pass</div>
                                                </div>
                                                <div class="contrast-checker ">
                                                    <div class="contrast-text-info">Link to background</div>
                                                    &nbsp;
                                                    <div id="link-contrast" class="contrast-result">Pass</div>
                                                </div>
                                                <div class="contrast-checker ">
                                                    <div class="contrast-text-info">Text to link</div>
                                                    &nbsp;
                                                    <div id="link-text-contrast" class="contrast-result">Pass</div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section id="preset-schemes" class="manual-color-schemes">
                                        <div class=" d-flex flex-md-nowrap justify-content-center align-items-center mb-1 mb-lg-0"
                                            id="manual-color-schemes">
                                            <div id="color-scheme-presets-main"
                                                class="d-flex justify-content-center flex-column align-items-center">
                                                <div class="contrast-checker mt-1 mt-lg-0">
                                                    <div id="link-text-text" class="contrast-text link-text-text">
                                                        <span id="both-text" class="both-text">Preview text color
                                                            and</span>&nbsp;<a id="both-link" class="both-link"
                                                            href="#">Link color</a>
                                                    </div>
                                                </div>
                                                <div id="extra-links" class="extra-links">
                                                    <div
                                                        class="d-flex justify-content-center align-items-center flex-column">
                                                        <p id="change-link-text" class="mb-0">Change link Color</p>
                                                        <div id="alt-link-colors" class="alt-link-colors d-flex">
                                                            <div class="alt-link-color active" id="#3863FF"
                                                                style="background-color: rgb(56, 99, 255);"></div>
                                                            <div class="alt-link-color" id="#E60000"
                                                                style="background-color: rgb(230, 0, 0);"></div>
                                                            <div class="alt-link-color" id="#996900"
                                                                style="background-color: rgb(153, 105, 0);"></div>
                                                            <div class="alt-link-color" id="#727A00"
                                                                style="background-color: rgb(114, 122, 0);"></div>
                                                            <div class="alt-link-color" id="#278321"
                                                                style="background-color: rgb(39, 131, 33);"></div>
                                                            <div class="alt-link-color" id="#7C57E0"
                                                                style="background-color: rgb(124, 87, 224);"></div>
                                                            <div class="alt-link-color" id="#A648A8"
                                                                style="background-color: rgb(166, 72, 168);"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    class="preset-container d-flex flex-column align-items-center justify-content-center">
                                                    <div id="color-presets-container"
                                                        class="d-flex flex-wrap justify-content-center color-preset-container">
                                                        <div class="color-preset-wrapper col-2">
                                                            <div id="color-preset-1" class="main-color-presets">
                                                            </div>
                                                        </div>
                                                        <div class="color-preset-wrapper col-2">
                                                            <div id="color-preset-2" class="main-color-presets">
                                                            </div>
                                                        </div>
                                                        <div class="color-preset-wrapper col-2">
                                                            <div id="color-preset-3" class="main-color-presets">
                                                            </div>
                                                        </div>
                                                        <div class="color-preset-wrapper col-2">
                                                            <div id="color-preset-4" class="main-color-presets">
                                                            </div>
                                                        </div>
                                                        <div class="color-preset-wrapper col-2">
                                                            <div id="color-preset-5" class="main-color-presets">
                                                            </div>
                                                        </div>
                                                        <div class="color-preset-wrapper col-2">
                                                            <div id="color-preset-6" class="main-color-presets">
                                                            </div>
                                                        </div>
                                                        <div class="color-preset-wrapper col-2">
                                                            <div id="color-preset-7" class="main-color-presets">
                                                            </div>
                                                        </div>
                                                        <div class="color-preset-wrapper col-2">
                                                            <div id="color-preset-8" class="main-color-presets">
                                                            </div>
                                                        </div>
                                                        <div class="color-preset-wrapper col-2">
                                                            <div id="color-preset-9" class="main-color-presets">
                                                            </div>
                                                        </div>
                                                        <div class="color-preset-wrapper col-2">
                                                            <div id="color-preset-10" class="main-color-presets">
                                                            </div>
                                                        </div>
                                                        <div class="color-preset-wrapper col-2">
                                                            <div id="color-preset-11" class="main-color-presets">
                                                            </div>
                                                        </div>
                                                        <div class="color-preset-wrapper col-2">
                                                            <div id="color-preset-12" class="main-color-presets">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <div class="toast wcag-modal-remove-selector d-none" id="ContrastRatingModal" aria-hidden="true" aria-label="modal">
                                    <div class="toast-header">
                                        <span aria-hidden="true">
                                            <img id="flourish-contrast-info-toggle"
                                                data-container="#ContrastRatingModal" data-trigger="hover"
                                                data-toggle="popover" data-placement="top" data-content="Both links and body text must have at least 4.5:1 contrast with the background (3:1 for
                    large
                    text) to meet WCAG 2 Level AA."
                                                class=" img-fluid flourish-icon-style wcag-popup-info-remove-selector flourish-popover flourish-popover-item"
                                                loading="lazy" src="./flourish/img/question.png"
                                                alt="Color picker icon" />
                                        </span>
                                        <div class="CloseContrastModal  " aria-label="Close Checker" role="button"
                                            type="button">
                                            <span aria-hidden="true"><svg
                                                    class="contrast-rating-modal close-flourish-icon"
                                                    xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                    fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                    <path
                                                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                </svg></span>
                                        </div>
                                    </div>
                                    <div class="toast-body">
                                        <div id="defaultContainer">
                                            <div class="pass">Text to background contrast: 21</div>
                                            <div class="pass">Link to background contrast: 4.77</div>
                                            <div class="pass">Link to text contrast: 4.39</div>
                                        </div><!--defaultContainer-->
                                        <div class="contrast_values">
                                            <div id="textBackRatioContainer"></div>
                                            <div id="linkBackRatioContainer"></div>
                                            <div id="linkTextRatioContainer"></div>
                                        </div><!--contrast-values-->
                                    </div><!-- toast-body -->
                                </div> <!-- toast -->
                            </div><!-- col-12 col-lg-5 -->
                        </section><!-- row -->
                    </section>
                    <section id="text-readbility-section" class="flourish-section-container ">
                        <header class="flourish-section-header">
                            <h2 class="d-inline">Text and Readability</h2>
                        </header>
                        <section class="row d-flex flex-wrap flex-column align-items-center flourish-sub-section"
                            id="language-options">
                            <h3 class="flourish_option_title text-wrap text-center"> <img
                                    class=" img-fluid flourish-icon-style " loading="lazy"
                                    src="./flourish/img/translate.png" alt="Translate languages icon" />Translate
                                Language:</h3>
                            <div id="flourish-translate-select"
                                class="flex-wrap justify-content-center align-items-center mb-4 d-none">
                            </div>
                            <div class="language-section-content flex-column align-items-center">
                                <div class="row d-flex flex-wrap justify-content-center align-items-center"
                                    id="curr-flourish-language">
                                    <div id="curr-flourish-language-btn"
                                        class="  d-flex justify-content-center align-items-center border">
                                        <span id="curr-language" class="mr-2">Current: </span>
                                        <img id="curr-language-icon" class=" language-icons" loading="lazy"
                                            src="./flourish/img/language/eng-min.png"
                                            alt="English-English language icon">
                                        <span id="curr-language-text" class="translate-language-span notranslate">
                                            English</span>
                                    </div>
                                </div>
                                <div class="row d-flex flex-wrap justify-content-center align-items-center"
                                    id="flourish-language-presets">
                                    <div id="flourish-language-search" class=" col-6 col-sm-4 col-lg-3">
                                        <div
                                            class="flourish-search-language-btn row d-flex justify-content-start flex-row  align-items-center no-wrap">
                                            <div id="flourish-more-languages-search" class="">
                                                <form onsubmit="return false;">
                                                    <input type="text" placeholder="Search languages" autocomplete="off"
                                                        name="query" id="flourish-search-input"
                                                        onkeyup="langKeySearchHandler()"
                                                        name="flourish-search-input"><br>
                                                    <div class="search-list" id="search-list">
                                                    </div>
                                                </form>
                                            </div>
                                            <div id="flourish-more-languages-btn"
                                                class="flourish-popover d-flex justify-content-center align-items-center"
                                                data-toggle="modal" data-target="#all-languages-modal">
                                                <svg class="flourish-popover flourish-popover-item"
                                                    data-container="#flourish_widget" data-trigger="hover"
                                                    data-toggle="popover" data-placement="top"
                                                    data-content="View all languages" id="flourish-more-icon"
                                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                                    <path
                                                        d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="translate-failed-message" aria-hidden="true">
                                <div class="failed-message-container ">
                                    <p class="text-center mb-0">Google translate isn't responding at the moment <br>
                                        Try checking your internet connection and refreshing
                                        the page.</p>
                                </div>
                            </div>
                            <div class="modal fade " id="all-languages-modal" tabindex="-1" role="modal for more languages"
                                aria-labelledby="all-languages-modal" aria-hidden="true">
                                <div id="lang-modal-container"
                                    class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                                    <div id="all-languages-modal-content" class="modal-content ">
                                        <div id="language-btn-modal-header" class="modal_header  ">
                                            <button id="close-language-modal" type="button" class="close "
                                                data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div
                                            class="row all-language-modal-header d-flex justify-content-center align-items-center mb-0">
                                            <h3>Choose Language</h3>
                                        </div>
                                        <div
                                            class="row all-language-modal-search d-flex justify-content-center align-items-center mt-3 mt-lg-3">
                                            <form onsubmit="return false;" role="search for more languages">
                                                <input type="text" placeholder="Search languages..." autocomplete="off"
                                                    name="query" id="search-lang-modal"
                                                    onkeyup="searchLangModalHandler()"><br>
                                            </form>
                                        </div>
                                        <div id="filter-lang-results"
                                            class="row d-flex  justify-content-center align-items-center mt-md-1 mb-md-4 mt-lg-3">
                                            <h4 class="mt-0 filter-header">Filter results:&nbsp</h4>
                                            <div class="filter-btn-container d-flex flex-row flex-sm-wrap">
                                                <section id="all-languages-filter" data-info="All" aria-label="search all langs"
                                                    class="lang-filter active d-flex justify-content-center align-items-center">
                                                    <img class="filter-icons " loading="lazy"
                                                        src="./flourish/img/all-langauges-inverted.png"
                                                        alt="all languages icon">
                                                    <span class="ml-2">All</span>
                                                </section>
                                                <section data-info="ContinentAndRegion" aria-label="filter by region"
                                                    class="lang-filter d-flex justify-content-center align-items-center">
                                                    <img class="filter-icons " loading="lazy"
                                                        src="./flourish/img/language-origin.png"
                                                        alt="all languages icon">
                                                    <span>Origin</span>
                                                </section>
                                                <section data-info="LanguageScriptAutonym" aria-label="filter by language script"
                                                    class="lang-filter d-flex justify-content-center align-items-center">
                                                    <img class="filter-icons " loading="lazy"
                                                        src="./flourish/img/translation-scripts.png"
                                                        alt="all languages icon">
                                                    <span class="ml-1">Script</span>
                                                </section>
                                            </div>
                                        </div>
                                        <div id="no-results-error" aria-hidden="true">
                                            <div>No results for that search. Try something else.</div>
                                        </div>
                                        <div id="all-languages-modal-body" class="modal-body">
                                        </div>
                                    </div><!-- modal content -->
                                </div><!-- modal dialog -->
                            </div><!--modal-->
                        </section>
                        <section id="Magnify_options" class="row flourish-sub-section">
                            <div
                                class=" col-6 d-none d-md-flex justify-content-start justify-content-sm-center justify-content-lg-start "
                                id="TextMagnifier_option">
                                <div class="flourish_toggleContainer" id="TextMagnifier">
                                    <div class="text-magnify-container pb-0">
                                        <div class="flourish_content">
                                            <div
                                                class="flourish-links-toggle-container justify-content-center justify-content-lg-start flex-wrap">
                                                <img class="img-fluid flourish-icon-style " loading="lazy"
                                                    src="./flourish/img/text-magnifier.png" alt="Text magnify icon" />
                                                <h3
                                                    class="type flourish_option_title text-wrap text-center text-sm-center text-lg-left ">
                                                    Text
                                                    Magnify
                                                </h3>
                                                <div id="toggle-text-magnifier" class="flourish_toggle" aria-label="turn on text magnifier">
                                                    <label class="switch" title="Toggle On/Off Text Magnifier">
                                                        <input type="checkbox" class="switch-input"
                                                            id="ToggleTextMagnifier" name="TextMagnifier">
                                                        <span class="switch-label" data-on="On" data-off="Off"></span>
                                                        <span class="switch-handle"></span>
                                                    </label>
                                                </div><!-- flourish_toggle -->
                                                <button onclick="restoreDefaultTextMagSettings()" aria-labelledby="toggle-text-magnifier"
                                                    id="reset-text-magnify-btn" class="flourish-reset-btn " role="
                        button" type="button" data-container="#flourish_widget" data-trigger="hover"
                                                    data-toggle="popover" data-placement="top"
                                                    data-content="Reset settings"><img data-id="hide-img-hover"
                                                        class="img-fluid flourish-reset-icon " loading="lazy"
                                                        src="./flourish/img/reset.png"
                                                        alt="Reset text magnify icon" /></button>
                                            </div>
                                            <p class="description text-sm-center text-lg-left">Displays text larger
                                                and in high-contrast
                                            </p>
                                        </div><!-- flourish_content -->
                                        <div id="edit-text-magnify" class=" edit-text-magnify " >
                                            <div class="edit-text-magnify-color" aria-label="change text magnify colors">
                                                <div class="text-magnify-color-title text-center">
                                                    <h4 class="mb-0 flourish-setting-title">Color Presets:</h4>
                                                </div>
                                                <div
                                                    class="d-flex flex-wrap justify-content-center text-mag-row1 text-presets">
                                                    <div id="text-mag-color-1"
                                                        class="active text-magnify-color-swatch magnify-color-presets light-text-background-default">
                                                    </div>
                                                    <div id="text-mag-color-2"
                                                        class="text-magnify-color-swatch magnify-color-presets ">
                                                    </div>
                                                    <div id="text-mag-color-3"
                                                        class="text-magnify-color-swatch magnify-color-presets ">
                                                    </div>
                                                </div>
                                                <div
                                                    class="d-flex flex-wrap justify-content-center text-mag-row2 text-presets">
                                                    <div id="text-mag-color-4"
                                                        class="text-magnify-color-swatch magnify-color-presets dark-text-background-default">
                                                    </div>
                                                    <div id="text-mag-color-5"
                                                        class="text-magnify-color-swatch magnify-color-presets ">
                                                    </div>
                                                    <div id="text-mag-color-6"
                                                        class="text-magnify-color-swatch magnify-color-presets ">
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="edit-mask-size d-flex flex-wrap flex-column justify-content-center align-items-center">
                                                <div id="edit-text-magnify-size "
                                                    class=" d-flex flex-wrap flex-column justify-content-center align-items-center">
                                                    <label for="customRange"
                                                        class="form-label mb-0 flourish-setting-title">Size:</label>
                                                    <input type="range" class="form-range text-magnify-size-input"
                                                        step="1" value="22" min="22" max="35"
                                                        id="text-magnify-size-input">
                                                    <span id="text-magnify-opacity"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-mag-preview-container magnify-preview">
                                            <div id="text-magnifier-preview" class="text-magnifier-preview">
                                                <p class="flourish-description-preview">Preview</p>
                                            </div>
                                        </div>
                                    </div>
                                </div><!-- class="flourish_toggleContainer" id="TextMagnifier" -->
                            </div><!-- col-12 col-md-6 -->
                            <section
                                class=" col-6 d-none d-md-flex justify-content-start justify-content-sm-center justify-content-lg-start "
                                id="ImageDescription_option">
                                <div class="flourish_toggleContainer pb-0" id="ImageDescription">
                                    <div class="flourish_content">
                                        <div
                                            class="flourish-links-toggle-container justify-content-center justify-content-lg-start flex-wrap">
                                            <img class="img-fluid flourish-icon-style " loading="lazy"
                                                src="./flourish/img/alt-text.png" alt="Image description icon" />
                                            <h3
                                                class="type flourish_option_title text-wrap text-center text-sm-center text-lg-left ">
                                                Image
                                                Description</h3>
                                            <div class="flourish_toggle" style="margin-left:6px;">
                                                <label class="switch" title="Toggle On/Off Image Description">
                                                    <input type="checkbox" class="switch-input"
                                                        id="ToggleImageDescription" name="ImageDescription">
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                            </div><!-- flourish_toggle -->
                                            <button onclick="restoreDefaultImageSettings()" id="reset-img-magnify-btn"
                                                class="  flourish-reset-btn" role="button" type="button"
                                                data-container="#flourish_widget" data-trigger="hover"
                                                data-toggle="popover" data-placement="top"
                                                data-content="Reset settings">
                                                <img data-id="hide-img-hover" class="img-fluid flourish-reset-icon "
                                                    loading="lazy" src="./flourish/img/reset.png"
                                                    alt="Reset icon" /></button>
                                        </div>
                                        <p class="description text-sm-center text-lg-left">Displays image
                                            information (alt tag) larger
                                            and in high-contrast</p>
                                        <div id="edit-img-magnify" class=" edit-img-magnify ">
                                            <div class="edit-img-magnify-color">
                                                <div class="img-magnify-color-title text-center">
                                                    <h4 class="mb-0 flourish-setting-title">Color Presets:</h4>
                                                </div>
                                                <div
                                                    class="d-flex flex-wrap justify-content-center text-mag-row1 img-presets">
                                                    <div id="img-mag-color-1"
                                                        class="active img-magnify-color-swatch magnify-color-presets light-img-background-default">
                                                    </div>
                                                    <div id="img-mag-color-2"
                                                        class="img-magnify-color-swatch magnify-color-presets ">
                                                    </div>
                                                    <div id="img-mag-color-3"
                                                        class="img-magnify-color-swatch magnify-color-presets ">
                                                    </div>
                                                </div>
                                                <div
                                                    class="d-flex flex-wrap justify-content-center text-mag-row2 img-presets">
                                                    <div id="img-mag-color-4"
                                                        class="img-magnify-color-swatch magnify-color-presets dark-img-background-default">
                                                    </div>
                                                    <div id="img-mag-color-5"
                                                        class="img-magnify-color-swatch magnify-color-presets ">
                                                    </div>
                                                    <div id="img-mag-color-6"
                                                        class="img-magnify-color-swatch magnify-color-presets ">
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="edit-mask-size d-flex flex-wrap flex-column justify-content-center align-items-center">
                                                <div id="edit-text-magnify-size "
                                                    class=" d-flex flex-wrap flex-column justify-content-center align-items-center">
                                                    <label for="customRange"
                                                        class="form-label mb-0 flourish-setting-title">Size:</label>
                                                    <input type="range" class="form-range img-magnify-size-input"
                                                        step="1" value="22" min="22" max="35"
                                                        id="img-magnify-size-input">
                                                    <span id="text-magnify-opacity"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="img-mag-preview-container magnify-preview">
                                            <div id="img-magnifier-preview" class="img-magnifier-preview">
                                                <p class="flourish-description-preview">Preview
                                                </p>
                                            </div>
                                        </div>
                                    </div><!-- flourish_content -->
                                </div><!-- class="flourish_toggleContainer" id="TextMagnifier" -->
                            </section><!-- col-12 col-lg-6 -->
                        </section><!-- row -->
                        <section class="row text-center flourish-sub-section" id="FontSize_option">
                            <section class="fontsize_form">
                                <div
                                    class="section-title  d-flex flex-wrap justify-content-center justify-content-lg-start align-items-center">
                                    <img class="img-fluid flourish-icon-style " loading="lazy"
                                        src="./flourish/img/font-sizet.png" alt="Change font size icon" />
                                    <h3 class="flourish_option_title text-wrap text-center text-center">Font
                                        Size</h3>
                                </div>
                                <div class="form-check">
                                    <ul class="modal-btn-options mb-0">
                                        <li id="FS_Default" class="active"><a href="#!"
                                                class="FontSizeOptions FontSizeDefault">
                                                <div class="title">Default</div>
                                            </a>
                                        </li>
                                        <li id="FS_Medium"><a href="#!" class="FontSizeOptions FontSizeMedium">
                                                <div class="title">Large</div>
                                            </a>
                                        </li>
                                    </ul>
                                </div><!-- form check -->
                            </section>
                            <section id="FontFamily_option">
                                <div class="font_type_form">
                                    <div
                                        class="section-title d-flex flex-wrap justify-content-center justify-content-lg-start align-items-center">
                                        <img class="img-fluid flourish-icon-style " loading="lazy"
                                            src="./flourish/img/font.png" alt="Change font family icon" />
                                        <h3 class="flourish_option_title text-wrap text-center text-lg-left">
                                            Font</h3>
                                    </div>
                                    <div class="form-check">
                                        <ul class="modal-btn-options mb-0">
                                            <li id="FT_Default" class="active font-type-option"><a href="#!"
                                                    class="FontTypeOptions FontTypeDefault">
                                                    <div class="title">Muli</div>
                                                </a>
                                            </li>
                                            <li id="FT_Dyslexic" class="font-type-option"><a href="#!"
                                                    class="FontTypeOptions FontTypeDyslexic">
                                                    <div class="title">Open-Dyslexic</div>
                                                </a>
                                            </li>
                                            <li id="FT_Baskerville" class="font-type-option"><a href="#!"
                                                    class="FontTypeOptions FontTypeBaskerville">
                                                    <div class="title libre-font">Libre Baskerville</div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div><!-- form check -->
                                </div>
                            </section><!--  col-lg-6 -->
                            <section class=" d-none d-lg-flex" id="Cursor_option">
                                <form class="cursorSwap_form">
                                    <div
                                        class="section-title d-flex flex-wrap justify-content-center justify-content-lg-start align-items-center">
                                        <img class="img-fluid flourish-icon-style " loading="lazy"
                                            src="./flourish/img/cursor.png" alt="Change cursor size icon" />
                                        <h3 class="flourish_option_title text-wrap text-center">Cursor Size
                                        </h3>
                                    </div>
                                    <div class="form-check">
                                        <ul class="modal-btn-options mb-0">
                                            <li id="Cur_Default" class="active"><a href="#!"
                                                    class="CursorOptions Cursor_Default">
                                                    <div class="title">Default</div>
                                                </a>
                                            </li>
                                            <li id="Cur_Enlarge"><a href="#!"
                                                    class="CursorOptions Cursor_Enlarge_option">
                                                    <div class="title">Large</div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div><!-- form check -->
                                </form>
                            </section><!-- col-12 col-lg-3 -->
                        </section><!-- row -->
                        <section id="text-selects"
                            class="row flourish-sub-section pt-2 d-flex justify-content-around align-items-center pb-md-3">
                            <section class=" text-center col-12 col-md-4" id="LetterSpacing_option">
                                <div class="form-group  delete-select-icon">
                                    <div class="form-group-heading">
                                        <div
                                            class="section-title d-flex flex-nowrap justify-content-center align-items-center">
                                            <img class="img-fluid flourish-icon-style " loading="lazy"
                                                src="./flourish/img/letter-spacing.png"
                                                alt="Change letter spacing icon" />
                                            <h3 class="flourish_option_title " for="exampleFormControlSelect1">
                                                Letter
                                                Spacing </h3>
                                        </div>
                                    </div>
                                    <div
                                        class="input-container d-flex flex-wrap justify-content-center align-items-center">
                                        <svg class="letter-spacing-icon spacing-icon button-icon minus-icon"
                                            aria-label="decrease letter spacing" xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" class="bi bi-dash"
                                            viewBox="0 0 16 16">
                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                        </svg>
                                        <select class="spacing-value " aria-label="text spacing options" name="letter_spacing" id="letter_spacing">
                                            <option selected value="inherit">2</option>
                                            <option value="3px">3</option>
                                            <option value="4px">4</option>
                                            <option value="5px">5</option>
                                            <option value="6px">6</option>
                                            <option value="7px">7</option>
                                            <option value="8px">8</option>
                                            <option value="9px">9</option>
                                        </select>
                                        <svg class="letter-spacing-icon spacing-icon button-icon plus-icon"
                                            aria-label="increase letter spacing" xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" class="bi bi-plus"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                        </svg>
                                    </div>
                                </div>
                            </section><!-- col-12 col-lg-4 -->
                            <section class=" text-center col-12 col-md-4" id="WordSpacing_option">
                                <div class="form-group ">
                                    <div class="form-group-heading ">
                                        <div
                                            class="section-title flex-nowrap d-flex  justify-content-center  align-items-center">
                                            <img class="img-fluid flourish-icon-style " loading="lazy"
                                                src="./flourish/img/word-spacing.png" alt="Change word spacing icon" />
                                            <h3 class="flourish_option_title " for="exampleFormControlSelect1">
                                                Word
                                                Spacing</h3>
                                        </div>
                                    </div>
                                    <div
                                        class="input-container d-flex flex-wrap justify-content-center align-items-center">
                                        <svg class="word-spacing-icon spacing-icon button-icon minus-icon"
                                            aria-label="decrease word spacing" xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" class="bi bi-dash"
                                            viewBox="0 0 16 16">
                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                        </svg>
                                        <select class="spacing-value" aria-label="word spacing options" name="word_spacing" id="word_spacing">
                                            <option value="inherit" selected>2</option>
                                            <option value="3px">3</option>
                                            <option value="4px">4</option>
                                            <option value="5px">5</option>
                                            <option value="6px">6</option>
                                            <option value="7px">7</option>
                                            <option value="8px">8</option>
                                            <option value="9px">9</option>
                                        </select>
                                        <svg class="word-spacing-icon spacing-icon button-icon plus-icon"
                                            aria-label="increase word spacing" xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" class="bi bi-plus"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                        </svg>
                                    </div>
                                </div>
                            </section><!-- col-12 col-md-4 -->
                            <section class=" text-center col-12 col-md-4" id="LineHeight_option">
                                <div class="form-group ">
                                    <div class="form-group-heading ">
                                        <div
                                            class="section-title flex-nowrap d-flex  justify-content-center  align-items-center">
                                            <img class="img-fluid flourish-icon-style " loading="lazy"
                                                src="./flourish/img/line-spacing.png" alt="Change line height icon" />
                                            <h3 class="flourish_option_title  font-weight-bold">Line
                                                Height</h3>
                                        </div>
                                    </div>
                                    <div
                                        class="input-container d-flex flex-wrap justify-content-center align-items-center">
                                        <svg class="line-height-icon spacing-icon button-icon minus-icon"
                                            aria-label="decrease line height" xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" class="bi bi-dash"
                                            viewBox="0 0 16 16">
                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                        </svg>
                                        <select class="spacing-value" aria-label="line height options" name="line_height" id="line_height">
                                            <option value="inherit" selected>2</option>
                                            <option value="1.9">3</option>
                                            <option value="2.1">4</option>
                                            <option value="2.3">5</option>
                                            <option value="2.5">6</option>
                                            <option value="2.7">7</option>
                                            <option value="2.9">8</option>
                                            <option value="3.1">9</option>
                                        </select>
                                        <svg class="line-height-icon spacing-icon button-icon plus-icon"
                                            aria-labely="increase line height" xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" fill="currentColor" class="bi bi-plus"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                        </svg>
                                    </div>
                                </div>
                            </section><!-- col-12 col-lg-6 -->
                        </section><!-- row -->
                        <div id="text-reading-assistance" class="row   flourish-sub-section">
                            <section
                                class="flourish-toggle-container col-12 col-md-6 d-flex flex-wrap flex-column justify-content-start justify-content-sm-center justify-content-lg-start "
                                id="ReadingMask_option">
                                <div class="flourish_toggleContainer pb-0" id="ReadingMask">
                                    <div class="flourish_content ">
                                        <div
                                            class="flourish-links-toggle-container justify-content-center justify-content-lg-start flex-wrap">
                                            <img class="img-fluid flourish-icon-style " loading="lazy"
                                                src="./flourish/img/reading-mask.png" alt="Reading mask icon" />
                                            <h3
                                                class="type flourish_option_title text-wrap text-center text-sm-center text-lg-left ">
                                                Reading
                                                Mask</h3>
                                            <div class="flourish_toggle" aria-label="toggle reading mask">
                                                <label class="switch" title="Toggle On/Off Reading Mask">
                                                    <input type="checkbox" class="switch-input" id="ToggleReadingMask"
                                                        name="ReadingMask">
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                            </div><!-- flourish_toggle -->
                                            <button onclick="restoreDefaultMaskSettings()" id="reset-mask-btn"
                                                class="  flourish-reset-btn" data-container="#flourish_widget"
                                                data-trigger="hover" data-toggle="popover" data-placement="top"
                                                data-content="Reset mask" role="
                    button" type="button"><img data-id="hide-img-hover" class="img-fluid flourish-reset-icon "
                                                    loading="lazy" src="./flourish/img/reset.png"
                                                    alt="Reset reading mask icon" /></button>
                                        </div>
                                        <p class="description text-sm-center text-lg-left">Adds a horizontal reading
                                            mask</p>
                                    </div><!-- flourish_content -->
                                </div><!-- class="flourish_toggleContainer" id="ReadingMask" -->
                                <div id="edit-reading-mask"
                                    class=" edit-reading-mask justify-content-start align-items-start disable-settings">
                                    <div id="edit-mask-opacity"
                                        class="input-container d-flex flex-wrap flex-column justify-content-center align-items-center">
                                        <label class="mb-2">Opacity:</label>
                                        <div
                                            class="opacity-select d-flex flex-wrap justify-content-center align-items-center">
                                            <svg class="opacity-icons  button-icon minus-icon mr-1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-label="decrease mask opacity" width="16" height="16"
                                                fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                            </svg>
                                            <select class=" opacity-value " aria-label="reading mask opacity options" name="reading-mask-opacity"
                                                id="reading-mask-opacity">
                                                <option value=".11">1</option>
                                                <option value=".22">2</option>
                                                <option value=".33">3</option>
                                                <option value=".44">4</option>
                                                <option value=".55">5</option>
                                                <option selected value=".66">6</option>
                                                <option value=".77">7</option>
                                                <option value=".88">8</option>
                                                <option value="1">9</option>
                                                <!-- <option value="1">10</option> -->
                                            </select>
                                            <svg class="opacity-icons  button-icon plus-icon ml-1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-label="increase mask opacity" width="16" height="16"
                                                fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div id="edit-mask-color"
                                        class="  color_picker_form d-flex flex-wrap flex-column justify-content-center align-items-center">
                                        <label class="mb-2" for="mask-color">
                                            Color:
                                        </label>
                                        <!-- <img style="min-width:16px;min-height:16px;box-sizing:unset;box-shadow:none;background:unset;padding:0 6px 0 0;cursor:pointer;" loading="lazy" src="chrome-extension://ohcpnigalekghcmgcdcenkpelffpdolg/img/icon16.png" title="Select with ColorPick Eyedropper - See advanced option: &quot;Add ColorPick Eyedropper near input[type=color] fields on websites&quot;" class="colorpick-eyedropper-input-trigger"> -->
                                        <input type="color" class="color_swatch mb-0 reading-color-picker"
                                            id="mask_color" title="Choose Link Color" value="#363636"
                                            colorpick-eyedropper-active="true">
                                        <!-- <span class="hexVal" id="mask_hexVal">#363636</span> -->
                                    </div>
                                    <div
                                        class="edit-middle-section d-flex flex-wrap flex-column justify-content-center align-items-center">
                                        <div id="edit-mask-size "
                                            class=" d-flex flex-wrap flex-column justify-content-center align-items-center">
                                            <label for="customRange" class="form-label mb-0">Size:</label>
                                            <input name="mask-size-input" type="range"
                                                class="form-range mask-size-input" step="1" value="60" min="10"
                                                max="200" id="mask-size-input">
                                            <span id="mask-opacity"></span>
                                        </div>
                                    </div>
                                </div>
                            </section><!-- col-12 col-lg-4 -->
                            <section
                                class="flourish-toggle-container col-12 col-md-6 d-flex flex-wrap flex-column justify-content-start justify-content-sm-center justify-content-lg-start "
                                id="ReadingGuide_option">
                                <div class="flourish_toggleContainer pb-0" id="ReadingGuide">
                                    <div class="flourish_content">
                                        <div
                                            class="flourish-links-toggle-container d-flex justify-content-center justify-content-lg-start align-items-center flex-wrap">
                                            <img class="img-fluid flourish-icon-style " loading="lazy"
                                                src="./flourish/img/reading-guide.png" alt="Reading guide icon" />
                                            <h3
                                                class="type flourish_option_title text-wrap text-center text-sm-center text-lg-left ">
                                                Reading
                                                Guide</h3>
                                            <div class="flourish_toggle" aria-label="toggle reading guide" style="margin-left:6px;">
                                                <label class="switch" title="Toggle On/Off Reading Guide">
                                                    <input type="checkbox" class="switch-input" id="ToggleReadingGuide"
                                                        name="CursorGuide">
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                            </div><!-- flourish_toggle -->
                                            <button onclick="restoreDefaultguideSettings()" id="reset-guide-btn" aria-label="reset reading guide options"
                                                data-container="#flourish_widget" data-trigger="hover"
                                                data-toggle="popover" data-placement="top" data-content="Reset guide"
                                                class="  flourish-reset-btn" role="button" type="button"><img
                                                    data-id="hide-img-hover" class="img-fluid flourish-reset-icon "
                                                    loading="lazy" src="./flourish/img/reset.png"
                                                    alt="Reset reading guide icon" /></button>
                                        </div>
                                        <p class="description text-sm-center text-lg-left">Adds a horizontal reading
                                            guide</p>
                                    </div><!-- flourish_content -->
                                </div><!-- class="flourish_toggleContainer" id="ReadingGuide" -->
                                <div id="edit-reading-guide"
                                    class=" edit-reading-guide justify-content-start align-items-start disable-settings mb-3">
                                    <div id="edit-guide-color"
                                        class="ml-4 mr-4 color_picker_form d-flex flex-wrap flex-column justify-content-center align-items-center">
                                        <label for="guide-color">
                                            Color:
                                        </label>
                                        <!-- <img style="min-width:16px;min-height:16px;box-sizing:unset;box-shadow:none;background:unset;padding:0 6px 0 0;cursor:pointer;" loading="lazy" src="chrome-extension://ohcpnigalekghcmgcdcenkpelffpdolg/img/icon16.png" title="Select with ColorPick Eyedropper - See advanced option: &quot;Add ColorPick Eyedropper near input[type=color] fields on websites&quot;" class="colorpick-eyedropper-input-trigger"> -->
                                        <input type="color" class="color_swatch mb-0 reading-color-picker"
                                            id="guide_color" title="Choose Link Color" value="#363636"
                                            colorpick-eyedropper-active="true">
                                        <!-- <span class="hexVal" id="guide_hexVal">#363636</span> -->
                                    </div>
                                    <div
                                        class="edit-middle-section d-flex flex-wrap flex-column justify-content-center align-items-center">
                                        <div id="edit-guide-size "
                                            class=" d-flex flex-wrap flex-column justify-content-center align-items-center">
                                            <label for="customRange" class="form-label mb-0">Size:</label>
                                            <input type="range" class="form-range guide-size-input" step="5" value="8"
                                                min="3" max="98" id="guide-size-input">
                                            <span id="guide-opacity"></span>
                                        </div>
                                    </div>
                                </div>
                            </section><!-- col-12 col-lg-4 -->
                        </div><!-- row -->
                        <section class="row d-flex flex-wrap pt-1 flourish-sub-section" id="TTS_option">
                            <div id="trigger-speech" class="col-12 col-lg-4 d-flex flex-wrap justify-content-center   ">
                                <div class="flourish_toggleContainer " id="TTS_click">
                                    <div class="flourish_content text-sm-center text-lg-left">
                                        <div
                                            class="d-flex flex-nowrap  justify-content-center justify-content-lg-start align-items-center">
                                            <img class="img-fluid flourish-icon-style " loading="lazy"
                                                src="./flourish/img/text-to-speech.png" alt="Text-to-speech icon" />
                                            <h3 class=" flourish_option_title">Text-to-Speech </h3>
                                            <div class="flourish_toggle " aria-label="toggle text to speech" style="margin-left:6px;">
                                                <label class="switch" title="Toggle On/Off Text-to-Speech">
                                                    <input type="checkbox" class="switch-input" id="ToggleTTS_click"
                                                        name="TTS_click_enabled">
                                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                                    <span class="switch-handle"></span>
                                                </label>
                                            </div><!-- flourish_toggle -->
                                        </div>
                                        <p class="description text-center text-lg-left mt-2 mt-lg-0">Read aloud text
                                            with settings for
                                            voice, volume, rate,
                                            and
                                            pitch </p>
                                    </div><!-- flourish_content -->
                                </div><!-- class="flourish_toggleContainer" id="PhotoSens" -->
                            </div><!-- col-12 col-lg-6 -->
                            <div id="speech-settings" class="col-12 col-lg-8 disable mt-1">
                                <div id="TTS_Utterance">
                                    <div id="voice-settings-header">
                                        <form id="select-voice-settings"
                                            class="d-flex flex-column flex-md-row align-items-center justify-content-center mt-2 mt-lg-0">
                                            <label for="voice" id="voice-settings-label"
                                                class="flourish-setting-title mb-0 mr-md-2">Select
                                                Voice:</label>
                                            <div
                                                class="select-reset-container d-flex justify-content-center align-items-center">
                                                <select class="custom-select" name="voice" id="voice" aria-label="text to speech voice options">
                                                </select>
                                                <div id="reset-voice-settings">
                                                    <button id="reset-voice-btn" data-container="#flourish_widget"
                                                        data-trigger="hover" data-toggle="popover" data-placement="top"
                                                        data-content="Reset voice settings" id="remove_cookie"
                                                        class="btn flourish-reset-btn flourish-popover-item d-flex justify-content-center align-items-center"
                                                        role="
                        button" type="button" data-original-title="" title=""><img data-id="hide-img-hover"
                                                            class="img-fluid flourish-reset-icon " loading="lazy"
                                                            src="./flourish/img/reset.png"
                                                            alt="Reset text to speech settings icon">
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div
                                        class="round-sliders d-none d-md-flex  justify-content-center align-items-center ">
                                        <div class="round-slider ">
                                            <div id="volume"></div>
                                            <div
                                                class="round-slider-icons d-flex justify-content-around align-items-center">
                                                <svg id="volume-minus-icon"
                                                    class="button-icon volume-minus-icon speech-volume speech-minus-icon speech-icon"
                                                    aria-label="decrease speech volume"
                                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z">
                                                    </path>
                                                </svg>
                                                <svg id="volume-plus-icon"
                                                    class="button-icon volume-plus-icon speech-volume speech-plus-icon speech-icon"
                                                    aria-label="increase speech volume"
                                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" viewBox="0 0 16 16">
                                                    <path
                                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="round-slider ">
                                            <div id="rate"></div>
                                            <div
                                                class="round-slider-icons d-flex justify-content-around align-items-center">
                                                <svg id="rate-minus-icon"
                                                    class="button-icon rate-minus-icon speech-rate speech-minus-icon speech-icon"
                                                    aria-label="decrease speech rate"
                                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z">
                                                    </path>
                                                </svg>
                                                <svg id="rate-plus-icon"
                                                    class="button-icon rate-plus-icon speech-rate speech-plus-icon speech-icon"
                                                    aria-label="increase speech rate"
                                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" viewBox="0 0 16 16">
                                                    <path
                                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="round-slider ">
                                            <div id="pitch"></div>
                                            <div
                                                class="round-slider-icons d-flex justify-content-around align-items-center">
                                                <svg id="pitch-minus-icon"
                                                    class="button-icon pitch-minus-icon speech-pitch speech-minus-icon speech-icon"
                                                    aria-label="decrease speech pitch"
                                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z">
                                                    </path>
                                                </svg>
                                                <svg id="pitch-plus-icon"
                                                    class="button-icon pitch-plus-icon speech-pitch speech-plus-icon speech-icon"
                                                    aria-label="increase speech pitch"
                                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" viewBox="0 0 16 16">
                                                    <path
                                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div><!--TTS_Utterance-->
                            </div><!-- col-12 col-lg-6 -->
                        </section><!-- row -->
                    </section>
                    <section id="flourish-contact-section" class="flourish-section-container">
                        <div id="flourish-contact-info"
                            class="flourish-sub-section flourish-contact-info d-flex flex-column justify-content-center align-items-center">
                            <div id="dos-statement"
                                class="d-flex flex-column justify-content-center align-items-center">
                                <img id="flourish-statement-icon" width="35" height="35" class="img-fluid flourish-icon-style text-center "
                                    loading="lazy" src="./flourish/img/flourish-logo-square-notext.png"
                                    alt="Flourish logo icon" />
                                <a class="text-center" id="flourish-statement-link"
                                    href="https://dos.myflorida.com/accessibility/">Florida Department of State
                                    Accessibility
                                    Statement</a>
                            </div>
                            <div id="email-info"
                                class=" d-flex flex-column justify-content-center align-items-center mb-2">
                                <img id="flourish-email-icon" width="35" height="35" class="img-fluid flourish-icon-style " loading="lazy"
                                    src="./flourish/img/email.png" alt="Email icon" />
                                <p class=" flourish-statement-info-p text-center"> For questions and
                                    concerns, email us at <a
                                        href="mailto:FloridaMemory@dos.myflorida.com">FloridaMemory@dos.myflorida.com</a>
                                </p>
                            </div>
                        </div>
                    </section>
                    <footer id="flourish-statement-section"
                        class="row flourish-section-container text-center flourish-sub-section">
                        <div class="col-12 d-flex justify-content-center align-items-center flex-wrap">
                            <p id="fl-mem-statement" class=" flourish-statement-info-p text-center">
                                Florida Memory is funded under the provisions of the Library Services and Technology
                                Act from the
                                Institute of Museum and Library Services.
                                Florida's LSTA program is administered by the Department of State's Division of
                                Library and
                                Information Services.
                            </p>
                        </div>
                        <div id="flourish-logos"
                            class="col-12 d-flex flex-column flex-md-row justify-content-center align-items-center">
                            <a href="https://dos.fl.gov/"><img id="flourish-dos-logo" width="250" height="100" class="" loading="lazy"
                                    src="./flourish/img/dos-logo.png" alt="Florida Department of State logo "></a>
                            <a href="https://dos.fl.gov/library-archives/"> <img id="flourish-dlis-logo"  width="250" height="100" class=""
                                    loading="lazy" src="./flourish/img/dlis-logo.png"
                                    alt="Division of Library and Information Services logo"></a>
                            <a href="https://www.imls.gov/"><img id="flourish-imls-logo" class="" width="250" height="100" loading="lazy"
                                    src="./flourish/img/imls-logo.png"
                                    alt="Institute of Museum and Library Services logo"></a>
                        </div>
                    </footer><!-- row -->
                </div><!-- container fluid -->
            </section><!-- modal_body -->
        </div>
    </main><!-- modal_content -->
</section><!-- id="flourish_widget" class="flourish_modal_background" -->

  `
}
createFlourish()
$(function () {
  $('[data-toggle="popover"]').popover()
})

$(function () {
  $('[data-toggle="popover-main"]').popover({
    container: 'body'
  })
})

let popOverSettings = {
  placement: 'top',
  container: 'body',
  html: true,
  selector: '[rel="popover-audio"]', //Sepcify the selector here
  content: function () {
    return $('#popover-content').html();
  }
}

$('body').popover(popOverSettings);


// determine if its desktop or touchscreen
let hasTouchScreen = false;
if ("maxTouchPoints" in navigator) {
  hasTouchScreen = navigator.maxTouchPoints > 0;
} else if ("msMaxTouchPoints" in navigator) {
  hasTouchScreen = navigator.msMaxTouchPoints > 0;
} else {
  let mQ = window.matchMedia && matchMedia("(pointer:coarse)");
  if (mQ && mQ.media === "(pointer:coarse)") {
    hasTouchScreen = !!mQ.matches;
  } else if ('orientation' in window) {
    hasTouchScreen = true; // deprecated, but good fallback
  } else {
    // Only as a last resort, fall back to user agent sniffing
    let UA = navigator.userAgent;
    hasTouchScreen = (
      /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
      /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
    );
  }
}

// return the os
function getOS() {
  const userAgent = window.navigator.userAgent,
    platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
    macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  let os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (/Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

// trigger change with js
const triggerEventFunc = (input, value) => {
  const e = new Event("change");
  const element = document.querySelector(input)
  element.value = value;
  element.dispatchEvent(e);
}

function triggerChange(element) {
  let changeEvent = new Event('change');
  element.dispatchEvent(changeEvent);
}

const scrollFunc = (destination, origin = 'html, body', offset = 0, time = 400) => {
  $(origin).animate({ scrollTop: $(destination).offset().top - offset }, time);
}
const worldLanguageData = [
  {
    LanguageCodeGoogleTrans: "af",
    LanguageCode: "afr",
    LanguageEnglish: "Afrikaans",
    LanguageAutonym: "Afrikaans",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "ZA ZA-NC ZA-WC NA",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Southern Africa",
    FlorishIconfilename: "afr-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ak",
    LanguageCode: "aka",
    LanguageEnglish: "Twi",
    LanguageAutonym: "Twi",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "GH-AH",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Western Africa",
    FlorishIconfilename: "aka-min.png"
  },
  {
    LanguageCodeGoogleTrans: "am",
    LanguageCode: "amh",
    LanguageEnglish: "Amharic",
    LanguageAutonym: "አማርኛ",
    LanguageScriptCode: "Ethi (430)",
    LanguageScriptAutonym: "ግዕዝ",
    LanguageUseCodes: "ET",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Eastern Africa",
    FlorishIconfilename: "amh-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ar",
    LanguageCode: "ara",
    LanguageEnglish: "Arabic",
    LanguageAutonym: "لْعَرَبِيَّةُ",
    LanguageScriptCode: "Arab (160)",
    LanguageScriptAutonym: "الْعَرَبِيَّة",
    LanguageUseCodes: "DZ BH TD KM DJ EG ER IQ JO KW LB LY MR MA OM PS QA SA SO SD SY TN AE YE TZ-07 TZ-11 TZ-15",
    WorldwideUse: "Worldwide",
    Continent: "Asia",
    ContinentAndRegion: "Southwestern Asia",
    FlorishIconfilename: "ara-min.png"
  },
  {
    LanguageCodeGoogleTrans: "as",
    LanguageCode: "asm",
    LanguageEnglish: "Assamese",
    LanguageAutonym: "অসমীয়া",
    LanguageScriptCode: "Beng (325)",
    LanguageScriptAutonym: "বাংলা",
    LanguageUseCodes: "IN-AS",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "asm-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ay",
    LanguageCode: "aym",
    LanguageEnglish: "Aymara",
    LanguageAutonym: "Aymar aru",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "BO PE",
    WorldwideUse: "",
    Continent: "South America",
    ContinentAndRegion: "South America",
    FlorishIconfilename: "aym-min.png"
  },
  {
    LanguageCodeGoogleTrans: "az",
    LanguageCode: "aze",
    LanguageEnglish: "Azerbaijani",
    LanguageAutonym: "Азәрбајҹан дили",
    LanguageScriptCode: "Cyrl (220)",
    LanguageScriptAutonym: "Кириллица",
    LanguageUseCodes: "AZ RU-DA",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southwestern Asia",
    FlorishIconfilename: "aze-min.png"
  },
  {
    LanguageCodeGoogleTrans: "be",
    LanguageCode: "bel",
    LanguageEnglish: "Belarusian",
    LanguageAutonym: "беларуская мова",
    LanguageScriptCode: "Cyrl (220)",
    LanguageScriptAutonym: "Кириллица",
    LanguageUseCodes: "BY PL",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Eastern Europe",
    FlorishIconfilename: "bel-min.png"
  },
  {
    LanguageCodeGoogleTrans: "bg",
    LanguageCode: "bul",
    LanguageEnglish: "Bulgarian",
    LanguageAutonym: "български език",
    LanguageScriptCode: "Cyrl (220)",
    LanguageScriptAutonym: "Кириллица",
    LanguageUseCodes: "BG",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Southeastern Europe",
    FlorishIconfilename: "bul-min.png"
  },
  {
    LanguageCodeGoogleTrans: "bho",
    LanguageCode: "bho",
    LanguageEnglish: "Bhojpuri",
    LanguageAutonym: "भोजपुरी",
    LanguageScriptCode: "Deva (315)",
    LanguageScriptAutonym: "देवनागरी",
    LanguageUseCodes: "FJ IN-JH",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "bho-min.png"
  },
  {
    LanguageCodeGoogleTrans: "bm",
    LanguageCode: "bam",
    LanguageEnglish: "Bambara",
    LanguageAutonym: "Bámánánkán",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "ML",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Eastern Africa",
    FlorishIconfilename: "bam-min.png"
  },
  {
    LanguageCodeGoogleTrans: "bn",
    LanguageCode: "ben",
    LanguageEnglish: "Bengali",
    LanguageAutonym: "বাংলা",
    LanguageScriptCode: "Beng (325)",
    LanguageScriptAutonym: "বাংলা",
    LanguageUseCodes: "BD IN-WB IN-TR IN-JH",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "ben-min.png"
  },
  {
    LanguageCodeGoogleTrans: "bs",
    LanguageCode: "bos",
    LanguageEnglish: "Bosnian",
    LanguageAutonym: "Bosanski",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "BA ME",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Southeastern Europe",
    FlorishIconfilename: "bos-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ca",
    LanguageCode: "cat",
    LanguageEnglish: "Catalan",
    LanguageAutonym: "Català",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "ES-CT ES-IB ES-VC AD IT-88",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Southwestern Europe",
    FlorishIconfilename: "cat-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ceb",
    LanguageCode: "ceb",
    LanguageEnglish: "Cebuano",
    LanguageAutonym: "Binisaya",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "PH-07 PH-08 PH-09 PH-10 PH-11 PH-12 PH-13 PH",
    WorldwideUse: "",
    Continent: "Oceania",
    ContinentAndRegion: "Oceania",
    FlorishIconfilename: "ceb-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ckb",
    LanguageCode: "ckb",
    LanguageEnglish: "Kurdish (Sorani)",
    LanguageAutonym: "سۆرانی",
    LanguageScriptCode: "Aran (161)",
    LanguageScriptAutonym: "نَسْتَعْلِیق",
    LanguageUseCodes: "IQ-KR",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southwestern Asia",
    FlorishIconfilename: "ckb-min.png"
  },
  {
    LanguageCodeGoogleTrans: "co",
    LanguageCode: "cos",
    LanguageEnglish: "Corsican",
    LanguageAutonym: "Corsu",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "FR-20R",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Southern Europe",
    FlorishIconfilename: "cos-min.png"
  },
  {
    LanguageCodeGoogleTrans: "cs",
    LanguageCode: "ces",
    LanguageEnglish: "Czech",
    LanguageAutonym: "Čeština",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "CZ",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Central Europe",
    FlorishIconfilename: "ces-min.png"
  },
  {
    LanguageCodeGoogleTrans: "cy",
    LanguageCode: "cym",
    LanguageEnglish: "Welsh",
    LanguageAutonym: "Cymraeg",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "GB-WLS",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Western Europe",
    FlorishIconfilename: "cym-min.png"
  },
  {
    LanguageCodeGoogleTrans: "da",
    LanguageCode: "dan",
    LanguageEnglish: "Danish",
    LanguageAutonym: "Dansk",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "DK FO",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Northern Europe",
    FlorishIconfilename: "dan-min.png"
  },
  {
    LanguageCodeGoogleTrans: "de",
    LanguageCode: "deu",
    LanguageEnglish: "German",
    LanguageAutonym: "Deutsch",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "DE AT BE LI LU CH",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Central Europe",
    FlorishIconfilename: "deu-min.png"
  },
  {
    LanguageCodeGoogleTrans: "doi",
    LanguageCode: "doi",
    LanguageEnglish: "Dogri",
    LanguageAutonym: "डोगरी",
    LanguageScriptCode: "Deva (315)",
    LanguageScriptAutonym: "देवनागरी",
    LanguageUseCodes: "IN-JK",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "doi-min.png"
  },
  {
    LanguageCodeGoogleTrans: "dv",
    LanguageCode: "div",
    LanguageEnglish: "Dhivehi",
    LanguageAutonym: "ދިވެހި,",
    LanguageScriptCode: "Thaa (170)",
    LanguageScriptAutonym: "ތާނަ",
    LanguageUseCodes: "MV",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "div-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ee",
    LanguageCode: "ewe",
    LanguageEnglish: "Ewe",
    LanguageAutonym: "Èʋegbe‎",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "*GH-TV GH-OT BJ-MO TG-M TG-P",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Western Africa",
    FlorishIconfilename: "ewe-min.png"
  },
  {
    LanguageCodeGoogleTrans: "el",
    LanguageCode: "ell",
    LanguageEnglish: "Greek",
    LanguageAutonym: "ελληνικά",
    LanguageScriptCode: "Grek (200)",
    LanguageScriptAutonym: "Ελληνικό",
    LanguageUseCodes: "GR CY",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Southern Europe",
    FlorishIconfilename: "ell-min.png"
  },
  {
    LanguageCodeGoogleTrans: "en",
    LanguageCode: "eng",
    LanguageEnglish: "English",
    LanguageAutonym: "English",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "AG BB BZ BW BI CM CA DM SZ FJ GH GD GY IN IE JM KE KI LS LR MW MT MH MU FM NA NR NG PK PW PG PH RW KN LC VC WS SC SL SG SB ZA SS SD TZ BS GM TO TT TV UG VU ZM ZW",
    WorldwideUse: "Worldwide",
    Continent: "Europe",
    ContinentAndRegion: "Western Europe",
    FlorishIconfilename: "eng-min.png"
  },
  // {
  //   LanguageCodeGoogleTrans: "en",
  //   LanguageCode: "eng",
  //   LanguageEnglish: "English",
  //   LanguageAutonym: "English (Australian)",
  //   LanguageScriptCode: "Latn (215)",
  //   LanguageScriptAutonym: "Latin",
  //   LanguageUseCodes: "AU (AU-NSW AU-QLD AU-SA AU-TAS AU-VIC AU-WA AU-ACT AU-NT)",
  //   WorldwideUse: "Worldwide",
  //Continent: "Europe",
  //   ContinentAndRegion: "Western Europe",
  //   FlorishIconfilename: "eng-AU-min.png"
  // },
  // {
  //   LanguageCodeGoogleTrans: "en",
  //   LanguageCode: "eng",
  //   LanguageEnglish: "English",
  //   LanguageAutonym: "English (Canadian)",
  //   LanguageScriptCode: "Latn (215)",
  //   LanguageScriptAutonym: "Latin",
  //   LanguageUseCodes: "CA (CA-AB CA-BC CA-MB CA-NB CA-NL CA-NS CA-ON CA-PE CA-QC CA-SK CA-NT CA-NU CA-YT)",
  //   WorldwideUse: "Worldwide",
  //Continent: "Europe",
  //   ContinentAndRegion: "Western Europe",
  //   FlorishIconfilename: "eng-CA-min.png"
  // },
  // {
  //   LanguageCodeGoogleTrans: "en",
  //   LanguageCode: "eng",
  //   LanguageEnglish: "English",
  //   LanguageAutonym: "English (British)",
  //   LanguageScriptCode: "Latn (215)",
  //   LanguageScriptAutonym: "Latin",
  //   LanguageUseCodes: "GB (GB-ENG GB-NIR GB-SCT GB-WLS)",
  //   WorldwideUse: "Worldwide",
  //Continent: "Europe",
  //   ContinentAndRegion: "Western Europe",
  //   FlorishIconfilename: "eng-GB-min.png"
  // },
  // {
  //   LanguageCodeGoogleTrans: "en",
  //   LanguageCode: "eng",
  //   LanguageEnglish: "English",
  //   LanguageAutonym: "English (American)",
  //   LanguageScriptCode: "Latn (215)",
  //   LanguageScriptAutonym: "Latin",
  //   LanguageUseCodes: "US (US-AL US-AK US-AZ US-AR US-CA US-CO US-CT US-DE US-FL US-GA US-HI US-ID US-IL US-IN US-IA US-KS US-KY US-LA US-ME US-MD US-MA US-MI US-MN US-MS US-MO US-MT US-NE US-NV US-NH US-NJ US-NM US-NY US-NC US-ND US-OH US-OK US-OR US-PA US-RI US-SC US-SD US-TN US-TX US-UT US-VT US-VA US-WA US-WV US-WI US-WY US-DC US-AS US-GU US-MP US-PR US-UM US-VI)",
  //   WorldwideUse: "Worldwide",
  //Continent: "Europe",
  //   ContinentAndRegion: "Western Europe",
  //   FlorishIconfilename: "eng-US-min.png"
  // },
  {
    LanguageCodeGoogleTrans: "eo",
    LanguageCode: "epo",
    LanguageEnglish: "Esperanto",
    LanguageAutonym: "Esperanto",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "",
    WorldwideUse: "",
    Continent: "",
    ContinentAndRegion: "",
    FlorishIconfilename: "epo-min.png"
  },
  // {
  //   LanguageCodeGoogleTrans: "es",
  //   LanguageCode: "spa",
  //   LanguageEnglish: "Spanish",
  //   LanguageAutonym: "Español",
  //   LanguageScriptCode: "Latn (215)",
  //   LanguageScriptAutonym: "Latin",
  //   LanguageUseCodes: "419 AR BO CL CO CR CU DO EC SV GQ GT HN MX NI PA PE UY VE US-PR US-TX US-FL US-AZ US-NM US-CA",
  //   WorldwideUse: "Worldwide",
  //Continent: "Europe",
  //   ContinentAndRegion: "Southwestern Europe",
  //   FlorishIconfilename: "spa-419-min.png"
  // },
  {
    LanguageCodeGoogleTrans: "es",
    LanguageCode: "spa",
    LanguageEnglish: "Spanish",
    LanguageAutonym: "Español",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "ES AR BO CL CO CR CU DO EC SV GQ GT HN MX NI PA PE UY VE US-PR US-TX US-FL US-AZ US-NM US-CA",
    WorldwideUse: "Worldwide",
    Continent: "Europe",
    ContinentAndRegion: "Southwestern Europe",
    FlorishIconfilename: "spa-min.png"
  },
  {
    LanguageCodeGoogleTrans: "et",
    LanguageCode: "est",
    LanguageEnglish: "Estonian",
    LanguageAutonym: "Eesti Keel",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "EE",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Eastern Europe",
    FlorishIconfilename: "est-min.png"
  },
  {
    LanguageCodeGoogleTrans: "eu",
    LanguageCode: "eus",
    LanguageEnglish: "Basque",
    LanguageAutonym: "Euskara",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "ES-PV ES-NA",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Southwestern Europe",
    FlorishIconfilename: "eus-min.png"
  },
  {
    LanguageCodeGoogleTrans: "fa",
    LanguageCode: "fas",
    LanguageEnglish: "Persian",
    LanguageAutonym: "فارسی",
    LanguageScriptCode: "Aran (161)",
    LanguageScriptAutonym: "نَسْتَعْلِیق",
    LanguageUseCodes: "IR AF TJ RU-DA",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southwestern Asia",
    FlorishIconfilename: "fas-min.png"
  },
  {
    LanguageCodeGoogleTrans: "fi",
    LanguageCode: "fin",
    LanguageEnglish: "Finnish",
    LanguageAutonym: "Suomi",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "FI",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Northern Europe",
    FlorishIconfilename: "fin-min.png"
  },
  {
    LanguageCodeGoogleTrans: "fr",
    LanguageCode: "fra",
    LanguageEnglish: "French",
    LanguageAutonym: "Français",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "FR BJ BF CG CD CI GA GN MC NE SN TG CH-GE CH-JU CH-NE CH-VD CH-VS CA-QC BE BE-WAL BE-BRU BI CM CA TD CF KM DJ GQ HT LU MG RW SC CH VU IT-23 CH-BE CH-FR JE CA-NB CA-NT CA-NU IN-PY CA-YT US-LA",
    WorldwideUse: "Worldwide",
    Continent: "Europe",
    ContinentAndRegion: "Western Europe",
    FlorishIconfilename: "fra-min.png"
  },
  {
    LanguageCodeGoogleTrans: "fy",
    LanguageCode: "fry",
    LanguageEnglish: "Frisian",
    LanguageAutonym: "Frysk",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "NL-FR",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Western Europe",
    FlorishIconfilename: "fry-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ga",
    LanguageCode: "gle",
    LanguageEnglish: "Irish",
    LanguageAutonym: "Gaelic",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "IE GB-NIR",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Western Europe",
    FlorishIconfilename: "gle-min.png"
  },
  {
    LanguageCodeGoogleTrans: "gd",
    LanguageCode: "gla",
    LanguageEnglish: "Scots Gaelic",
    LanguageAutonym: "Gàidhlig",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "GB-SCT",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Western Europe",
    FlorishIconfilename: "gla-min.png"
  },
  {
    LanguageCodeGoogleTrans: "gl",
    LanguageCode: "glg",
    LanguageEnglish: "Galician",
    LanguageAutonym: "Galego",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "ES-GA",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Southwestern Europe",
    FlorishIconfilename: "glg-min.png"
  },
  {
    LanguageCodeGoogleTrans: "gn",
    LanguageCode: "grn",
    LanguageEnglish: "Guarani",
    LanguageAutonym: "Avañeʼẽ",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "PY BO AR-W",
    WorldwideUse: "",
    Continent: "South America",
    ContinentAndRegion: "South America",
    FlorishIconfilename: "grn-min.png"
  },
  {
    LanguageCodeGoogleTrans: "gom",
    LanguageCode: "gom",
    LanguageEnglish: "Konkani",
    LanguageAutonym: "कोंकणी",
    LanguageScriptCode: "Deva (315)",
    LanguageScriptAutonym: "देवनागरी",
    LanguageUseCodes: "IN-GA",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "gom-min.png"
  },
  {
    LanguageCodeGoogleTrans: "gu",
    LanguageCode: "guj",
    LanguageEnglish: "Gujarati",
    LanguageAutonym: "ગુજરાતી",
    LanguageScriptCode: "Gujr\t(320)",
    LanguageScriptAutonym: "ગુજરાતી લિપિ",
    LanguageUseCodes: "IN-GJ IN-DH",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "guj-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ha",
    LanguageCode: "hau",
    LanguageEnglish: "Hausa",
    LanguageAutonym: "Harshen",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "NG NE",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Western Africa",
    FlorishIconfilename: "hau-min.png"
  },
  {
    LanguageCodeGoogleTrans: "haw",
    LanguageCode: "haw",
    LanguageEnglish: "Hawaiian",
    LanguageAutonym: "ʻŌlelo Hawaiʻi",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "US-HI",
    WorldwideUse: "",
    Continent: "Oceania",
    ContinentAndRegion: "Oceania",
    FlorishIconfilename: "haw-min.png"
  },
  {
    LanguageCodeGoogleTrans: "hi",
    LanguageCode: "hin",
    LanguageEnglish: "Hindi",
    LanguageAutonym: "हिन्दी",
    LanguageScriptCode: "Deva (315)",
    LanguageScriptAutonym: "देवनागरी",
    LanguageUseCodes: "IN",
    WorldwideUse: "Worldwide",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "hin-min.png"
  },
  {
    LanguageCodeGoogleTrans: "hmn",
    LanguageCode: "hmn",
    LanguageEnglish: "Hmong",
    LanguageAutonym: "lus Hmoob",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "CN LA MM VN TH",
    WorldwideUse: "",
    Continent: "Asia",
    Continent: "Asia",
    ContinentAndRegion: "Southeastern Asia",
    FlorishIconfilename: "hmn-min.png"
  },
  {
    LanguageCodeGoogleTrans: "hr",
    LanguageCode: "hrv",
    LanguageEnglish: "Croatian",
    LanguageAutonym: "Hrvatski",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "HR BA ME RS-VO AT-1",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Southeastern Europe",
    FlorishIconfilename: "hrv-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ht",
    LanguageCode: "hat",
    LanguageEnglish: "Haitian Creole",
    LanguageAutonym: "Kreyòl Ayisyen",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "HT",
    WorldwideUse: "",
    Continent: "North America",
    ContinentAndRegion: "North America",
    FlorishIconfilename: "hat-min.png"
  },
  {
    LanguageCodeGoogleTrans: "hu",
    LanguageCode: "hun",
    LanguageEnglish: "Hungarian",
    LanguageAutonym: "Magyar Nyelv",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "HU RS-VO AT-1 SI",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Central Europe",
    FlorishIconfilename: "hun-min.png"
  },
  {
    LanguageCodeGoogleTrans: "hy",
    LanguageCode: "hye",
    LanguageEnglish: "Armenian",
    LanguageAutonym: "հայերեն",
    LanguageScriptCode: "Arm (230)",
    LanguageScriptAutonym: "հայերեն",
    LanguageUseCodes: "AM",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southwestern Asia",
    FlorishIconfilename: "hye-min.png"
  },
  {
    LanguageCodeGoogleTrans: "id",
    LanguageCode: "ind",
    LanguageEnglish: "Indonesian",
    LanguageAutonym: "Bahasa Indonesia",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "ID",
    WorldwideUse: "",
    Continent: "Oceania",
    ContinentAndRegion: "Oceania",
    FlorishIconfilename: "ind-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ig",
    LanguageCode: "ibo",
    LanguageEnglish: "Igbo",
    LanguageAutonym: "Ásụ̀sụ́ Ìgbò",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "NG",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Western Africa",
    FlorishIconfilename: "ibo-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ilo",
    LanguageCode: "ilo",
    LanguageEnglish: "Ilocano",
    LanguageAutonym: "Ilokano",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "PH-01",
    WorldwideUse: "",
    Continent: "Oceania",
    ContinentAndRegion: "Oceania",
    FlorishIconfilename: "ilo-min.png"
  },
  {
    LanguageCodeGoogleTrans: "is",
    LanguageCode: "isl",
    LanguageEnglish: "Icelandic",
    LanguageAutonym: "Íslenska",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "IS",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Northern Europe",
    FlorishIconfilename: "isl-min.png"
  },
  {
    LanguageCodeGoogleTrans: "it",
    LanguageCode: "ita",
    LanguageEnglish: "Italian",
    LanguageAutonym: "Italiano",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "IT SM CH VA SI HR-18",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Southern Europe",
    FlorishIconfilename: "ita-min.png"
  },
  {
    LanguageCodeGoogleTrans: "iw",
    LanguageCode: "heb",
    LanguageEnglish: "Hebrew",
    LanguageAutonym: "עברית חדשה",
    LanguageScriptCode: "Hebr (125)",
    LanguageScriptAutonym: "עברית",
    LanguageUseCodes: "IL",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southwestern Asia",
    FlorishIconfilename: "heb-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ja",
    LanguageCode: "jpn",
    LanguageEnglish: "Japanese",
    LanguageAutonym: "日本語",
    LanguageScriptCode: "Jpan (413)",
    LanguageScriptAutonym: "日本語",
    LanguageUseCodes: "JP PW",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Eastern Asia",
    FlorishIconfilename: "jpn-min.png"
  },
  {
    LanguageCodeGoogleTrans: "jv",
    LanguageCode: "jav",
    LanguageEnglish: "Javanese",
    LanguageAutonym: "Basa Jawa",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "ID-JW",
    WorldwideUse: "",
    Continent: "Oceania",
    ContinentAndRegion: "Oceania",
    FlorishIconfilename: "jav-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ka",
    LanguageCode: "kat",
    LanguageEnglish: "Georgian",
    LanguageAutonym: "ქართული ენა",
    LanguageScriptCode: "Geo (240)",
    LanguageScriptAutonym: "ქართული",
    LanguageUseCodes: "GE",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southwestern Asia",
    FlorishIconfilename: "kat-min.png"
  },
  {
    LanguageCodeGoogleTrans: "kk",
    LanguageCode: "kaz",
    LanguageEnglish: "Kazakh",
    LanguageAutonym: "қазақша",
    LanguageScriptCode: "Cyrl (220)",
    LanguageScriptAutonym: "Кириллица",
    LanguageUseCodes: "KZ RU-AL CN-XJ-40 CN-XJ-23 CN-XJ-05 CN-GS-09",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Central Asia",
    FlorishIconfilename: "kaz-min.png"
  },
  {
    LanguageCodeGoogleTrans: "km",
    LanguageCode: "khm",
    LanguageEnglish: "Khmer",
    LanguageAutonym: "ភាសាខ្មែរ",
    LanguageScriptCode: "Khmr (355)",
    LanguageScriptAutonym: "អក្សរខ្មែរ",
    LanguageUseCodes: "KH",
    WorldwideUse: "",
    Continent: "Asia",
    Continent: "Asia",
    ContinentAndRegion: "Southeastern Asia",
    FlorishIconfilename: "khm-min.png"
  },
  {
    LanguageCodeGoogleTrans: "kn",
    LanguageCode: "kan",
    LanguageEnglish: "Kannflourish",
    LanguageAutonym: "ಕನ್ನಡ",
    LanguageScriptCode: "Knda (345)",
    LanguageScriptAutonym: "ಕನ್ನಡ",
    LanguageUseCodes: "IN-KA",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "kan-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ko",
    LanguageCode: "kor",
    LanguageEnglish: "Korean",
    LanguageAutonym: "한국어",
    LanguageScriptCode: "Hang (286)",
    LanguageScriptAutonym: "한국어",
    LanguageUseCodes: "KO KP",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Eastern Asia",
    FlorishIconfilename: "kor-KO-min.png"
  },
  {
    LanguageCodeGoogleTrans: "kri",
    LanguageCode: "kri",
    LanguageEnglish: "Krio",
    LanguageAutonym: "Krio",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "SL",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Western Africa",
    FlorishIconfilename: "kri-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ku",
    LanguageCode: "kur",
    LanguageEnglish: "Kurdish (Kurmanji)",
    LanguageAutonym: "Kurmancî",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "IQ-KR",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southwestern Asia",
    FlorishIconfilename: "kur-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ky",
    LanguageCode: "kir",
    LanguageEnglish: "Kyrgyz",
    LanguageAutonym: "Кыргыз тили",
    LanguageScriptCode: "Cyrl (220)",
    LanguageScriptAutonym: "Кириллица",
    LanguageUseCodes: "KG CN-XJ-30",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Central Asia",
    FlorishIconfilename: "kir-min.png"
  },
  {
    LanguageCodeGoogleTrans: "la",
    LanguageCode: "lat",
    LanguageEnglish: "Latin",
    LanguageAutonym: "Latīnum",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "VA",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Southern Europe",
    FlorishIconfilename: "lat-min.png"
  },
  {
    LanguageCodeGoogleTrans: "lb",
    LanguageCode: "ltz",
    LanguageEnglish: "Luxembourgish",
    LanguageAutonym: "Lëtzebuergesch",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "LU",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Western Europe",
    FlorishIconfilename: "ltz-min.png"
  },
  {
    LanguageCodeGoogleTrans: "lg",
    LanguageCode: "lug",
    LanguageEnglish: "Luganda",
    LanguageAutonym: "Oluganda",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "UG-C",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Eastern Africa",
    FlorishIconfilename: "lug-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ln",
    LanguageCode: "lin",
    LanguageEnglish: "Lingala",
    LanguageAutonym: "Lingála",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "CD CG",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Central Africa",
    FlorishIconfilename: "lin-min.png"
  },
  {
    LanguageCodeGoogleTrans: "lo",
    LanguageCode: "lao",
    LanguageEnglish: "Lao",
    LanguageAutonym: "ພາສາລາວ",
    LanguageScriptCode: "Laoo (356)",
    LanguageScriptAutonym: "ອັກສອນລາວ",
    LanguageUseCodes: "LA",
    WorldwideUse: "",
    Continent: "Asia",
    Continent: "Asia",
    ContinentAndRegion: "Southeastern Asia",
    FlorishIconfilename: "lao-min.png"
  },
  {
    LanguageCodeGoogleTrans: "lt",
    LanguageCode: "lit",
    LanguageEnglish: "Lithuanian",
    LanguageAutonym: "Lietuvių Kalba",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "LT",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Eastern Europe",
    FlorishIconfilename: "lit-min.png"
  },
  {
    LanguageCodeGoogleTrans: "lus",
    LanguageCode: "lus",
    LanguageEnglish: "Mizo",
    LanguageAutonym: "Mizo ṭawng",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "IN-MZ",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "lus-min.png"
  },
  {
    LanguageCodeGoogleTrans: "lv",
    LanguageCode: "lav",
    LanguageEnglish: "Latvian",
    LanguageAutonym: "Latviešu Valoda",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "LV",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Eastern Europe",
    FlorishIconfilename: "lav-min.png"
  },
  {
    LanguageCodeGoogleTrans: "mai",
    LanguageCode: "mai",
    LanguageEnglish: "Maithili",
    LanguageAutonym: "मैथिली",
    LanguageScriptCode: "Deva (315)",
    LanguageScriptAutonym: "देवनागरी",
    LanguageUseCodes: "IN-JK",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "mai-min.png"
  },
  {
    LanguageCodeGoogleTrans: "mg",
    LanguageCode: "mlg",
    LanguageEnglish: "Malagasy",
    LanguageAutonym: "Malagasy",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "MG",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Eastern Africa",
    FlorishIconfilename: "mlg-min.png"
  },
  {
    LanguageCodeGoogleTrans: "mi",
    LanguageCode: "mri",
    LanguageEnglish: "Maori",
    LanguageAutonym: "Te Reo Māori",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "NZ",
    WorldwideUse: "",
    Continent: "Oceania",
    ContinentAndRegion: "Oceania",
    FlorishIconfilename: "mri-min.png"
  },
  {
    LanguageCodeGoogleTrans: "mk",
    LanguageCode: "mkd",
    LanguageEnglish: "Macedonian",
    LanguageAutonym: "македонски",
    LanguageScriptCode: "Cyrl (220)",
    LanguageScriptAutonym: "Кириллица",
    LanguageUseCodes: "MK",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Southeastern Europe",
    FlorishIconfilename: "mkd-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ml",
    LanguageCode: "mal",
    LanguageEnglish: "Malayalam",
    LanguageAutonym: "മലയാളം",
    LanguageScriptCode: "Mlym (347)",
    LanguageScriptAutonym: "യാള ലിപി",
    LanguageUseCodes: "IN-KL IN-PY",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "mal-min.png"
  },
  {
    LanguageCodeGoogleTrans: "mn",
    LanguageCode: "mon",
    LanguageEnglish: "Mongolian",
    LanguageAutonym: "монгол хэл",
    LanguageScriptCode: "Cyrl (220)",
    LanguageScriptAutonym: "Кириллица",
    LanguageUseCodes: "MN CN-MN CN-XJ-27 CN-XJ-28 CN-XJ-42 CN-QH-28",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Central Asia",
    FlorishIconfilename: "mon-min.png"
  },
  {
    LanguageCodeGoogleTrans: "mni-Mtei",
    LanguageCode: "mni",
    LanguageEnglish: "Meiteilon (Manipuri)",
    LanguageAutonym: "Meiteilon",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "IN-MN",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "mni-min.png"
  },
  {
    LanguageCodeGoogleTrans: "mr",
    LanguageCode: "mar",
    LanguageEnglish: "Marathi",
    LanguageAutonym: "मराठी",
    LanguageScriptCode: "Deva (315)",
    LanguageScriptAutonym: "देवनागरी",
    LanguageUseCodes: "IN-MH IN-GA",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "mar-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ms",
    LanguageCode: "msa",
    LanguageEnglish: "Malay",
    LanguageAutonym: "Bahasa Melayu",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "MY BN SG",
    WorldwideUse: "",
    Continent: "Oceania",
    ContinentAndRegion: "Oceania",
    FlorishIconfilename: "msa-min.png"
  },
  {
    LanguageCodeGoogleTrans: "mt",
    LanguageCode: "mlt",
    LanguageEnglish: "Maltese",
    LanguageAutonym: "Malti",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "MT",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Southern Europe",
    FlorishIconfilename: "mlt-min.png"
  },
  {
    LanguageCodeGoogleTrans: "my",
    LanguageCode: "mya",
    LanguageEnglish: "Myanmar (Burmese)",
    LanguageAutonym: "မြန်မာစာ",
    LanguageScriptCode: "Mymr (350)",
    LanguageScriptAutonym: "အက္ခရ်မန်ဗၟ",
    LanguageUseCodes: "MM",
    WorldwideUse: "",
    Continent: "Asia",
    Continent: "Asia",
    ContinentAndRegion: "Southeastern Asia",
    FlorishIconfilename: "mya-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ne",
    LanguageCode: "nep",
    LanguageEnglish: "Nepali",
    LanguageAutonym: "नेपाली",
    LanguageScriptCode: "Deva (315)",
    LanguageScriptAutonym: "देवनागरी",
    LanguageUseCodes: "NP IN-SK IN-WB",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "nep-min.png"
  },
  {
    LanguageCodeGoogleTrans: "nl",
    LanguageCode: "nld",
    LanguageEnglish: "Dutch",
    LanguageAutonym: "Nederlands",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "NL BE SR NL-AW NL-CW NL-SX",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Western Europe",
    FlorishIconfilename: "nld-min.png"
  },
  {
    LanguageCodeGoogleTrans: "no",
    LanguageCode: "nor",
    LanguageEnglish: "Norwegian",
    LanguageAutonym: "Norsk",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "NO",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Northern Europe",
    FlorishIconfilename: "nor-min.png"
  },
  {
    LanguageCodeGoogleTrans: "nso",
    LanguageCode: "nso",
    LanguageEnglish: "Sepedi",
    LanguageAutonym: "Sepedi",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "ZA",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Southern Africa",
    FlorishIconfilename: "nso-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ny",
    LanguageCode: "nya",
    LanguageEnglish: "Chichewa",
    LanguageAutonym: "Chichewa",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "MW ZW *ZM-03 MZ-A MZ-T",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Eastern Africa",
    FlorishIconfilename: "nya-min.png"
  },
  {
    LanguageCodeGoogleTrans: "om",
    LanguageCode: "orm",
    LanguageEnglish: "Oromo",
    LanguageAutonym: "Afaan Oromoo",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "ET *KE",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Eastern Africa",
    FlorishIconfilename: "orm-min.png"
  },
  {
    LanguageCodeGoogleTrans: "or",
    LanguageCode: "ori",
    LanguageEnglish: "Odia (Oriya)",
    LanguageAutonym: "ଓଡ଼ିଆ",
    LanguageScriptCode: "Orya (327)",
    LanguageScriptAutonym: "ଓଡ଼ିଆ ଅକ୍ଷର",
    LanguageUseCodes: "IN-OR IN-JH IN-WB",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "ori-min.png"
  },
  {
    LanguageCodeGoogleTrans: "pa",
    LanguageCode: "pan",
    LanguageEnglish: "Punjabi",
    LanguageAutonym: "ਪੰਜਾਬੀ",
    LanguageScriptCode: "Guru (310)",
    LanguageScriptAutonym: "ਗੁਰਮੁਖੀ",
    LanguageUseCodes: "PK-PB IN-PB IN-HR IN-DL IN-WB",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "pan-min.png"
  },
  {
    LanguageCodeGoogleTrans: "pl",
    LanguageCode: "pol",
    LanguageEnglish: "Polish",
    LanguageAutonym: "Polski",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "PL",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Central Europe",
    FlorishIconfilename: "pol-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ps",
    LanguageCode: "pus",
    LanguageEnglish: "Pashto",
    LanguageAutonym: "پښتو",
    LanguageScriptCode: "Aran (161)",
    LanguageScriptAutonym: "نَسْتَعْلِیق",
    LanguageUseCodes: "AF PK",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "pus-min.png"
  },
  {
    LanguageCodeGoogleTrans: "pt",
    LanguageCode: "por",
    LanguageEnglish: "Portuguese (Brazil)",
    LanguageAutonym: "Português",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "PT BZ CV TL GQ GW MZ ST MO UY ZA",
    WorldwideUse: "Worldwide",
    Continent: "Europe",
    ContinentAndRegion: "Southwestern Europe",
    FlorishIconfilename: "por-min.png"
  },
  {
    LanguageCodeGoogleTrans: "qu",
    LanguageCode: "que",
    LanguageEnglish: "Quechua",
    LanguageAutonym: "Urin qichwa",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "BO AR-G *EC",
    WorldwideUse: "",
    Continent: "South America",
    ContinentAndRegion: "South America",
    FlorishIconfilename: "que-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ro",
    LanguageCode: "ron",
    LanguageEnglish: "Romanian",
    LanguageAutonym: "Românește",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "RO MD RS-VO",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Southeastern Europe",
    FlorishIconfilename: "ron-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ru",
    LanguageCode: "rus",
    LanguageEnglish: "Russian",
    LanguageAutonym: "русский язык",
    LanguageScriptCode: "Cyrl (220)",
    LanguageScriptAutonym: "Кириллица",
    LanguageUseCodes: "RU BY KZ KG TJ",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Eastern Europe",
    FlorishIconfilename: "rus-min.png"
  },
  {
    LanguageCodeGoogleTrans: "rw",
    LanguageCode: "kin",
    LanguageEnglish: "Kinyarwanda",
    LanguageAutonym: "Ikinyarwanda",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "RW",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Eastern Africa",
    FlorishIconfilename: "kin-min.png"
  },
  {
    LanguageCodeGoogleTrans: "sa",
    LanguageCode: "san",
    LanguageEnglish: "Sanskrit",
    LanguageAutonym: "संस्कृतम्",
    LanguageScriptCode: "Deva (315)",
    LanguageScriptAutonym: "देवनागरी",
    LanguageUseCodes: "IN IN-HP IN-UT",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "san-min.png"
  },
  {
    LanguageCodeGoogleTrans: "sd",
    LanguageCode: "snd",
    LanguageEnglish: "Sindhi",
    LanguageAutonym: "سِنڌِي",
    LanguageScriptCode: "Aran (161)",
    LanguageScriptAutonym: "نَسْتَعْلِیق",
    LanguageUseCodes: "PK-SD IN",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "snd-min.png"
  },
  {
    LanguageCodeGoogleTrans: "si",
    LanguageCode: "sin",
    LanguageEnglish: "Sinhala",
    LanguageAutonym: "සිංහල",
    LanguageScriptCode: "Sinh (348)",
    LanguageScriptAutonym: "සිංහල අක්ෂර මාලාව",
    LanguageUseCodes: "LK",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "sin-min.png"
  },
  {
    LanguageCodeGoogleTrans: "sk",
    LanguageCode: "slk",
    LanguageEnglish: "Slovak",
    LanguageAutonym: "Slovenčina",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "SK RS-VO",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Central Europe",
    FlorishIconfilename: "slk-min.png"
  },
  {
    LanguageCodeGoogleTrans: "sl",
    LanguageCode: "slv",
    LanguageEnglish: "Slovenian",
    LanguageAutonym: "Slovenščina",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "SI",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Central Europe",
    FlorishIconfilename: "slv-min.png"
  },
  {
    LanguageCodeGoogleTrans: "sm",
    LanguageCode: "smo",
    LanguageEnglish: "Samoan",
    LanguageAutonym: "Gagana Faʻa Sāmoa",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "WS US-AS",
    WorldwideUse: "",
    Continent: "Oceania",
    ContinentAndRegion: "Oceania",
    FlorishIconfilename: "smo-min.png"
  },
  {
    LanguageCodeGoogleTrans: "sn",
    LanguageCode: "sna",
    LanguageEnglish: "Shona",
    LanguageAutonym: "chiShona",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "ZW *MZ",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Eastern Africa",
    FlorishIconfilename: "sna-min.png"
  },
  {
    LanguageCodeGoogleTrans: "so",
    LanguageCode: "som",
    LanguageEnglish: "Somali",
    LanguageAutonym: "Soomaali",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "SO DJ ET *KE",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Eastern Africa",
    FlorishIconfilename: "som-min.png"
  },
  {
    LanguageCodeGoogleTrans: "sq",
    LanguageCode: "sqi",
    LanguageEnglish: "Albanian",
    LanguageAutonym: "Shqipja",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "AL XK MK ME",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Southeastern Europe",
    FlorishIconfilename: "sqi-min.png"
  },
  {
    LanguageCodeGoogleTrans: "sr",
    LanguageCode: "srp",
    LanguageEnglish: "Serbian",
    LanguageAutonym: "српски језик",
    LanguageScriptCode: "Cyrl (220)",
    LanguageScriptAutonym: "Кириллица",
    LanguageUseCodes: "RS BA ME XK",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Southeastern Europe",
    FlorishIconfilename: "srp-min.png"
  },
  {
    LanguageCodeGoogleTrans: "st",
    LanguageCode: "sot",
    LanguageEnglish: "Sesotho",
    LanguageAutonym: "Sesotho",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "LS ZA ZW",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Southern Africa",
    FlorishIconfilename: "sot-min.png"
  },
  {
    LanguageCodeGoogleTrans: "su",
    LanguageCode: "sun",
    LanguageEnglish: "Sundanese",
    LanguageAutonym: "Basa Sunda",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "ID-JW ID-SM",
    WorldwideUse: "",
    Continent: "Oceania",
    ContinentAndRegion: "Oceania",
    FlorishIconfilename: "sun-min.png"
  },
  {
    LanguageCodeGoogleTrans: "sv",
    LanguageCode: "swe",
    LanguageEnglish: "Swedish",
    LanguageAutonym: "Svenska",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "SE FI AX",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Northern Europe",
    FlorishIconfilename: "swe-min.png"
  },
  {
    LanguageCodeGoogleTrans: "sw",
    LanguageCode: "swa",
    LanguageEnglish: "Swahili",
    LanguageAutonym: "Kiswahili",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "TZ RW KE UG *BI CD MZ",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Eastern Africa",
    FlorishIconfilename: "swa-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ta",
    LanguageCode: "tam",
    LanguageEnglish: "Tamil",
    LanguageAutonym: "தமிழ்",
    LanguageScriptCode: "Taml (346)",
    LanguageScriptAutonym: "தமிழ் அரிச்சுவடி",
    LanguageUseCodes: "IN-TN IN-PY LK SG",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "tam-min.png"
  },
  {
    LanguageCodeGoogleTrans: "te",
    LanguageCode: "tel",
    LanguageEnglish: "Telugu",
    LanguageAutonym: "తెలుగు",
    LanguageScriptCode: "Telu (340)",
    LanguageScriptAutonym: "తెలుగు లిపి",
    LanguageUseCodes: "IN-AP IN-TG IN-PY IN-WB",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "tel-min.png"
  },
  {
    LanguageCodeGoogleTrans: "tg",
    LanguageCode: "tgk",
    LanguageEnglish: "Tajik",
    LanguageAutonym: "Тоҷикӣ",
    LanguageScriptCode: "Cyrl (220)",
    LanguageScriptAutonym: "Кириллица",
    LanguageUseCodes: "TJ",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Central Asia",
    FlorishIconfilename: "tgk-min.png"
  },
  {
    LanguageCodeGoogleTrans: "th",
    LanguageCode: "tha",
    LanguageEnglish: "Thai",
    LanguageAutonym: "ภาษาไทย",
    LanguageScriptCode: "Thai (352)",
    LanguageScriptAutonym: "อักษรไทย",
    LanguageUseCodes: "TH",
    WorldwideUse: "",
    Continent: "Asia",
    Continent: "Asia",
    ContinentAndRegion: "Southeastern Asia",
    FlorishIconfilename: "tha-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ti",
    LanguageCode: "tir",
    LanguageEnglish: "Tigrinya",
    LanguageAutonym: "ትግርኛ",
    LanguageScriptCode: "Ethi (430)",
    LanguageScriptAutonym: "ግዕዝ",
    LanguageUseCodes: "ER ET",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Eastern Africa",
    FlorishIconfilename: "tir-min.png"
  },
  {
    LanguageCodeGoogleTrans: "tk",
    LanguageCode: "tuk",
    LanguageEnglish: "Turkmen",
    LanguageAutonym: "türkmençe",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "TM",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Central Asia",
    FlorishIconfilename: "tuk-min.png"
  },
  {
    LanguageCodeGoogleTrans: "tl",
    LanguageCode: "tgl",
    LanguageEnglish: "Filipino",
    LanguageAutonym: "Tagalog",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "PH",
    WorldwideUse: "",
    Continent: "Oceania",
    ContinentAndRegion: "Oceania",
    FlorishIconfilename: "tgl-min.png"
  },
  {
    LanguageCodeGoogleTrans: "tr",
    LanguageCode: "tur",
    LanguageEnglish: "Turkish",
    LanguageAutonym: "Türkçe",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "TR CY",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southwestern Asia",
    FlorishIconfilename: "tur-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ts",
    LanguageCode: "tso",
    LanguageEnglish: "Tsonga",
    LanguageAutonym: "Xitsonga",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "ZA ZW *MZ",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Southern Africa",
    FlorishIconfilename: "tso-min.png"
  },
  {
    LanguageCodeGoogleTrans: "tt",
    LanguageCode: "tat",
    LanguageEnglish: "Tatar",
    LanguageAutonym: "татар теле",
    LanguageScriptCode: "Cyrl (220)",
    LanguageScriptAutonym: "Кириллица",
    LanguageUseCodes: "RU-TA",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Central Asia",
    FlorishIconfilename: "tat-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ug",
    LanguageCode: "uig",
    LanguageEnglish: "Uyghur",
    LanguageAutonym: "ئۇيغۇر تىلى",
    LanguageScriptCode: "Arab (160)",
    LanguageScriptAutonym: "الْعَرَبِيَّة",
    LanguageUseCodes: "CN-XJ",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Central Asia",
    FlorishIconfilename: "uig-min.png"
  },
  {
    LanguageCodeGoogleTrans: "uk",
    LanguageCode: "ukr",
    LanguageEnglish: "Ukrainian",
    LanguageAutonym: "українська мова",
    LanguageScriptCode: "Cyrl (220)",
    LanguageScriptAutonym: "Кириллица",
    LanguageUseCodes: "UA",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Eastern Europe",
    FlorishIconfilename: "ukr-min.png"
  },
  {
    LanguageCodeGoogleTrans: "ur",
    LanguageCode: "urd",
    LanguageEnglish: "Urdu",
    LanguageAutonym: "اردو",
    LanguageScriptCode: "Aran (161)",
    LanguageScriptAutonym: "نَسْتَعْلِیق",
    LanguageUseCodes: "PK IN-JK IN-JH IN-DL IN-BR IN-UP IN-AR IN-TG\tIN-WB",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southern Asia",
    FlorishIconfilename: "urd-min.png"
  },
  {
    LanguageCodeGoogleTrans: "uz",
    LanguageCode: "uzb",
    LanguageEnglish: "Uzbek",
    LanguageAutonym: "Oʻzbekcha",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "UZ",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Central Asia",
    FlorishIconfilename: "uzb-min.png"
  },
  {
    LanguageCodeGoogleTrans: "vi",
    LanguageCode: "vie",
    LanguageEnglish: "Vietnamese",
    LanguageAutonym: "Việt",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "VN",
    WorldwideUse: "",
    Continent: "Asia",
    Continent: "Asia",
    ContinentAndRegion: "Southeastern Asia",
    FlorishIconfilename: "vie-min.png"
  },
  {
    LanguageCodeGoogleTrans: "xh",
    LanguageCode: "xho",
    LanguageEnglish: "Xhosa",
    LanguageAutonym: "isiXhosa",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "ZA ZW *BW",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Southern Africa",
    FlorishIconfilename: "xho-min.png"
  },
  {
    LanguageCodeGoogleTrans: "yi",
    LanguageCode: "yid",
    LanguageEnglish: "Yiddish",
    LanguageAutonym: "ייִדיש",
    LanguageScriptCode: "Hebr (125)",
    LanguageScriptAutonym: "עברית",
    LanguageUseCodes: "RU-YEV *BA DE IL NL PL RO SE UA RU",
    WorldwideUse: "",
    Continent: "Europe",
    ContinentAndRegion: "Central Europe",
    FlorishIconfilename: "yid-min.png"
  },
  {
    LanguageCodeGoogleTrans: "yo",
    LanguageCode: "yor",
    LanguageEnglish: "Yoruba",
    LanguageAutonym: "Èdè Yorùbá",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "NG",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Western Africa",
    FlorishIconfilename: "yor-min.png"
  },
  {
    LanguageCodeGoogleTrans: "zh-CN",
    LanguageCode: "zho",
    LanguageEnglish: "Chinese (Simplified)",
    LanguageAutonym: "简体字",
    LanguageScriptCode: "Hans (501)",
    LanguageScriptAutonym: "简化字",
    LanguageUseCodes: "CN SG",
    WorldwideUse: "Worldwide",
    Continent: "Asia",
    ContinentAndRegion: "Eastern Asia",
    FlorishIconfilename: "zho-CN-min.png"
  },
  {
    LanguageCodeGoogleTrans: "zh-TW",
    LanguageCode: "zho",
    LanguageEnglish: "Chinese (Traditional)",
    LanguageAutonym: "繁体字",
    LanguageScriptCode: "Hant (502)",
    LanguageScriptAutonym: "正體字",
    LanguageUseCodes: "TW HK MO",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Eastern Asia",
    FlorishIconfilename: "zho-TW-min.png"
  },
  {
    LanguageCodeGoogleTrans: "zu",
    LanguageCode: "zul",
    LanguageEnglish: "Zulu",
    LanguageAutonym: "isiZulu",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "ZA",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Southern Africa",
    FlorishIconfilename: "zul-min.png"
  },
  {
    LanguageCodeGoogleTrans: "",
    LanguageCode: "run",
    LanguageEnglish: "Rundi",
    LanguageAutonym: "Ikirundi",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "BI",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Eastern Africa",
    FlorishIconfilename: "run-min.png"
  },
  {
    LanguageCodeGoogleTrans: "",
    LanguageCode: "bsq",
    LanguageEnglish: "Bassa",
    LanguageAutonym: "Ɓǎsɔ́ɔ̀",
    LanguageScriptCode: "Bass (259)",
    LanguageScriptAutonym: "ɓǎsɔ́ɔ̀",
    LanguageUseCodes: "LR CI SL",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Western Africa",
    FlorishIconfilename: "bsq-min.png"
  },
  {
    LanguageCodeGoogleTrans: "",
    LanguageCode: "ffm",
    LanguageEnglish: "Fula",
    LanguageAutonym: "𞤊𞤵𞤤𞤬𞤵𞤤𞤣𞤫",
    LanguageScriptCode: "Adlm (166)",
    LanguageScriptAutonym: "𞤀𞤣𞤤𞤢𞤥 𞤆𞤵𞤤𞤢𞤪",
    LanguageUseCodes: "ML",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Western Africa",
    FlorishIconfilename: "ffm-min.png"
  },
  {
    LanguageCodeGoogleTrans: "",
    LanguageCode: "din",
    LanguageEnglish: "Dinka",
    LanguageAutonym: "Thuɔŋjäŋ",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "SS",
    WorldwideUse: "",
    Continent: "Africa",
    ContinentAndRegion: "Western Africa",
    FlorishIconfilename: "din-min.png"
  },
  {
    LanguageCodeGoogleTrans: "",
    LanguageCode: "kar",
    LanguageEnglish: "Karen",
    LanguageAutonym: "Karen",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "*MM TH",
    WorldwideUse: "",
    Continent: "Asia",
    Continent: "Asia",
    ContinentAndRegion: "Southeastern Asia",
    FlorishIconfilename: "kar-min.png"
  },
  {
    LanguageCodeGoogleTrans: "",
    LanguageCode: "syr",
    LanguageEnglish: "Suret",
    LanguageAutonym: "ܣܘܪܝܬ",
    LanguageScriptCode: "Syrc (135)",
    LanguageScriptAutonym: "ܐܠܦ ܒܝܬ ܣܘܪܝܝܐ",
    LanguageUseCodes: "IQ",
    WorldwideUse: "",
    Continent: "Asia",
    ContinentAndRegion: "Southwestern Asia",
    FlorishIconfilename: "syr-min.png"
  },
  {
    LanguageCodeGoogleTrans: "",
    LanguageCode: "pdc",
    LanguageEnglish: "Pennsylvania Dutch",
    LanguageAutonym: "Pennsilfaanisch Deitsche",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "*US-PA",
    WorldwideUse: "",
    Continent: "North America",
    ContinentAndRegion: "North America",
    FlorishIconfilename: "pdc-min.png"
  },
  {
    LanguageCodeGoogleTrans: "",
    LanguageCode: "mus",
    LanguageEnglish: "Creek (Muscogee)",
    LanguageAutonym: "Mvskoke",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "*US-AL US-FL US-OK",
    WorldwideUse: "",
    Continent: "North America",
    ContinentAndRegion: "North America",
    FlorishIconfilename: "mus-min.png"
  },
  {
    LanguageCodeGoogleTrans: "",
    LanguageCode: "mik",
    LanguageEnglish: "Mikisúkî",
    LanguageAutonym: "Hitchiti",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "*US-FL",
    WorldwideUse: "",
    Continent: "North America",
    ContinentAndRegion: "North America",
    FlorishIconfilename: "mik-3-min.png"
  },
  {
    LanguageCodeGoogleTrans: "",
    LanguageCode: "cho",
    LanguageEnglish: "Choctaw",
    LanguageAutonym: "Chahta anumpa",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "*US-MS US-OK",
    WorldwideUse: "",
    Continent: "North America",
    ContinentAndRegion: "North America",
    FlorishIconfilename: "cho-min.png"
  },
  {
    LanguageCodeGoogleTrans: "",
    LanguageCode: "chr",
    LanguageEnglish: "Cherokee",
    LanguageAutonym: "ᏣᎳᎩ ᎦᏬᏂᎯᏍᏗ",
    LanguageScriptCode: "Cher (445)",
    LanguageScriptAutonym: "ᏣᎳᎩ",
    LanguageUseCodes: "*US-NC US-OK",
    WorldwideUse: "",
    Continent: "North America",
    ContinentAndRegion: "North America",
    FlorishIconfilename: "chr-min.png"
  },
  {
    LanguageCodeGoogleTrans: "",
    LanguageCode: "nav",
    LanguageEnglish: "Navajo",
    LanguageAutonym: "Diné Bizaad",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "*US-NM US-AZ US-UT US-CO",
    WorldwideUse: "",
    Continent: "North America",
    ContinentAndRegion: "North America",
    FlorishIconfilename: "nav-min.png"
  },
  {
    LanguageCodeGoogleTrans: "",
    LanguageCode: "pon",
    LanguageEnglish: "Pohnpeian",
    LanguageAutonym: "Lokaiahn Pohnpei",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "FM-PNI",
    WorldwideUse: "",
    Continent: "Oceania",
    ContinentAndRegion: "Oceania",
    FlorishIconfilename: "pon-min.png"
  },
  {
    LanguageCodeGoogleTrans: "",
    LanguageCode: "chk",
    LanguageEnglish: "Chuukese",
    LanguageAutonym: "Chuuk",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "FM-TRK",
    WorldwideUse: "",
    Continent: "Oceania",
    ContinentAndRegion: "Oceania",
    FlorishIconfilename: "chk-min.png"
  },
  {
    LanguageCodeGoogleTrans: "",
    LanguageCode: "mah",
    LanguageEnglish: "Marshallese",
    LanguageAutonym: "Kajin M̧ajeļ",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "MH",
    WorldwideUse: "",
    Continent: "Oceania",
    ContinentAndRegion: "Oceania",
    FlorishIconfilename: "mah-min.png"
  },
  {
    LanguageCodeGoogleTrans: "",
    LanguageCode: "ton",
    LanguageEnglish: "Tongan",
    LanguageAutonym: "ea faka-Tonga",
    LanguageScriptCode: "Latn (215)",
    LanguageScriptAutonym: "Latin",
    LanguageUseCodes: "TO",
    WorldwideUse: "",
    Continent: "Oceania",
    ContinentAndRegion: "Oceania",
    FlorishIconfilename: "ton-min.png"
  }
]


const usStatesLanguagesData = [
  { languages: ["eng", "spa", "zh-CN", "tgl", "vie", "ara", "fra", "kor", "rus", "por", "hat", "hin", "deu", "deu", "ita", "urd", "fas", "tel", "jpn"], state: "United States" },
  { languages: ["eng", "spa", "kor", "zh-CN", "vie", "ara", "deu", "fra", "guj", "tgl", "hin", "lao", "rus", "por", "tur", "jpn"], state: "Alabama" },
  { languages: ["eng", "tgl", "spa", "kor", "hmn", "rus", "smo", "zh-CN", "lao", "jpn", "ilo", "vie", "ukr", "tha", "deu", "pol"], state: "Alaska" },
  { languages: ["eng", "spa", "nav", "zh-CN", "vie", "ara", "tgl", "kor", "fra", "deu", "rus", "jpn", "fas", "syr", "srp", "tha"], state: "Arizona" },
  { languages: ["eng", "spa", "vie", "mah", "zh-CN", "lao", "tgl", "ara", "deu", "fra", "hmn", "kor", "por", "jpn", "hin", "guj"], state: "Arkansas" },
  { languages: ["eng", "spa", "zh-CN", "vie", "tgl", "kor", "hye", "fas", "rus", "jpn", "ara", "pan", "khm", "hmn", "hin", "tha"], state: "California" },
  { languages: ["eng", "spa", "vie", "zh-CN", "kor", "rus", "amh", "ara", "deu", "fra", "nep", "tgl", "jpn", "orm", "fas", "bsq", "ibo", "yor"], state: "Colorado" },
  { languages: ["eng", "spa", "por", "pol", "zh-CN", "ita", "fra", "hat", "rus", "vie", "ara", "kor", "sqi", "hin", "tgl", "ell"], state: "Connecticut" },
  { languages: ["eng", "spa", "zh-CN", "hat", "guj", "fra", "kor", "ita", "vie", "deu", "tgl", "hin", "urd", "ara", "tel", "nld"], state: "Delaware" },
  { languages: ["eng", "spa", "amh", "zh-CN", "fra", "tgl", "rus", "por", "ita", "vie", "bsq", "ibo", "yor", "ben", "jpn", "kor", "tha", "deu", "ara"], state: "District of Columbia" },
  { languages: ["eng", "spa", "hat", "vie", "por", "zh-CN", "fra", "tgl", "rus", "ara", "ita", "deu", "kor", "pol", "guj", "tha"], state: "Florida" },
  { languages: ["eng", "spa", "vie", "kor", "zh-CN", "guj", "fra", "amh", "hin", "hat", "rus", "ara", "por", "fas", "deu", "jpn"], state: "Georgia" },
  { languages: ["eng", "ilo", "tgl", "jpn", "zh-CN", "kor", "spa", "vie", "smo", "mah", "chk", "haw", "pon", "ceb", "ton", "lao"], state: "Hawaii" },
  { languages: ["eng", "spa", "zh-CN", "srp", "kor", "vie", "ara", "deu", "tgl", "rus", "fra", "jpn", "ron", "run", "fas", "ukr"], state: "Idaho" },
  { languages: ["eng", "spa", "pol", "zh-CN", "kor", "tgl", "ara", "rus", "guj", "urd", "vie", "ita", "hin", "fra", "ell", "deu"], state: "Illinois" },
  { languages: ["eng", "spa", "zh-CN", "deu", "pdc", "mya", "ara", "kor", "vie", "fra", "jpn", "nld", "tgl", "rus", "pan", "hin"], state: "Indiana" },
  { languages: ["eng", "spa", "zh-CN", "vie", "srp", "deu", "ara", "lao", "kor", "hin", "fra", "pdc", "tha", "tgl", "kar", "rus"], state: "Iowa" },
  { languages: ["eng", "spa", "vie", "zh-CN", "deu", "kor", "lao", "ara", "tgl", "mya", "fra", "jpn", "rus", "hmn", "fas", "swa"], state: "Kansas" },
  { languages: ["eng", "spa", "zh-CN", "deu", "vie", "ara", "srp", "jpn", "fra", "kor", "pdc", "nep", "orm", "rus", "tgl", "run"], state: "Kentucky" },
  { languages: ["eng", "spa", "fra", "vie", "zh-CN", "ara", "tgl", "kor", "por", "lao", "jpn", "urd", "deu", "fas", "rus", "tha"], state: "Louisiana" },
  { languages: ["eng", "fra", "spa", "zh-CN", "orm", "vie", "ara", "khm", "rus", "tgl", "deu", "tha", "din", "kor", "pol", "jpn"], state: "Maine" },
  { languages: ["eng", "spa", "zh-CN", "kor", "vie", "fra", "tgl", "rus", "amh", "bsq", "ibo", "yor", "urd", "fas", "hat", "por", "ara", "guj"], state: "Maryland" },
  { languages: ["eng", "spa", "por", "zh-CN", "hat", "vie", "rus", "ara", "khm", "fra", "ita", "kor", "ell", "pol", "hin", "guj"], state: "Massachusetts" },
  { languages: ["eng", "spa", "ara", "zh-CN", "syr", "vie", "sqi", "kor", "ben", "pol", "deu", "ita", "jpn", "rus", "srp", "tgl"], state: "Michigan" },
  { languages: ["eng", "spa", "hmn", "orm", "vie", "zh-CN", "rus", "lao", "amh", "kar", "deu", "khm", "ara", "fra", "kor", "tgl"], state: "Minnesota" },
  { languages: ["eng", "spa", "vie", "zh-CN", "fra", "ara", "cho", "tgl", "deu", "kor", "guj", "jpn", "rus", "pan", "ita", "hin"], state: "Mississippi" },
  { languages: ["eng", "spa", "zh-CN", "vie", "srp", "deu", "ara", "kor", "rus", "fra", "tgl", "pdc", "fas", "orm", "por", "amh"], state: "Missouri" },
  { languages: ["eng", "spa", "deu", "zh-CN", "jpn", "tgl", "fra", "rus", "kor", "ara", "tha", "nor", "vie", "ukr", "pdc", "ita"], state: "Montana" },
  { languages: ["eng", "spa", "vie", "zh-CN", "ara", "kar", "fra", "orm", "deu", "kor", "nep", "rus", "lao", "kur", "fas", "jpn"], state: "Nebraska" },
  { languages: ["eng", "spa", "tgl", "zh-CN", "kor", "vie", "amh", "tha", "jpn", "ara", "rus", "fra", "fas", "smo", "deu", "ilo"], state: "Nevflourish" },
  { languages: ["eng", "spa", "fra", "zh-CN", "nep", "vie", "por", "ell", "ara", "srp", "ind", "kor", "rus", "hat", "run", "pol"], state: "New Hampshire" },
  { languages: ["eng", "spa", "zh-CN", "kor", "por", "guj", "pol", "ita", "ara", "tgl", "rus", "hat", "hin", "vie", "fra", "urd"], state: "New Jersey" },
  { languages: ["eng", "spa", "nav", "vie", "deu", "zh-CN", "ara", "kor", "tgl", "jpn", "fra", "ita", "rus", "hin", "fas", "tha"], state: "New Mexico" },
  { languages: ["eng", "spa", "zh-CN", "rus", "hat", "kor", "ita", "yid", "ben", "pol", "ara", "fra", "urd", "tgl", "ell", "sqi"], state: "New York" },
  { languages: ["eng", "spa", "zh-CN", "vie", "kor", "fra", "ara", "hmn", "rus", "tgl", "guj", "khm", "deu", "hin", "lao", "jpn"], state: "North Caolina" },
  { languages: ["eng", "spa", "deu", "zh-CN", "orm", "vie", "run", "ara", "swa", "rus", "jpn", "nep", "fra", "kor", "tgl", "nor"], state: "North Dakota" },
  { languages: ["eng", "spa", "zh-CN", "deu", "ara", "pdc", "rus", "fra", "vie", "orm", "kor", "ita", "jpn", "nld", "ukr", "ron"], state: "Ohio" },
  { languages: ["eng", "spa", "vie", "zh-CN", "kor", "deu", "ara", "mya", "hmn", "tgl", "fra", "lao", "tha", "urd", "chr", "fas"], state: "Oklahoma" },
  { languages: ["eng", "spa", "vie", "zh-CN", "rus", "kor", "ukr", "jpn", "ara", "ron", "khm", "orm", "deu", "fas", "fra", "tha"], state: "Oregon" },
  { languages: ["eng", "spa", "zh-CN", "vie", "rus", "pdc", "kor", "ita", "ara", "fra", "deu", "guj", "pol", "hat", "khm", "por"], state: "Pennsylvania" },
  { languages: ["eng", "spa", "por", "zh-CN", "hat", "khm", "fra", "ita", "lao", "ara", "rus", "vie", "bsq", "ibo", "yor", "pol", "kor", "tgl"], state: "Rhode Island" },
  { languages: ["eng", "spa", "zh-CN", "vie", "kor", "fra", "tgl", "rus", "deu", "guj", "ara", "por", "jpn", "ukr", "hin", "khm"], state: "South Carolina" },
  { languages: ["eng", "spa", "deu", "zh-CN", "kar", "vie", "nep", "srp", "amh", "ffm", "tgl", "kor", "rus", "orm", "ukr", "fra"], state: "South Dakota" },
  { languages: ["eng", "spa", "ara", "zh-CN", "vie", "kor", "fra", "lao", "amh", "deu", "guj", "jpn", "tgl", "hin", "rus", "fas"], state: "Tennessee" },
  { languages: ["eng", "spa", "vie", "zh-CN", "kor", "ara", "urd", "tgl", "fra", "hin", "fas", "deu", "guj", "rus", "jpn", "lao"], state: "Texas" },
  { languages: ["eng", "spa", "zh-CN", "vie", "kor", "nav", "nep", "ton", "srp", "tgl", "deu", "rus", "ara", "khm", "fra", "jpn"], state: "Utah" },
  { languages: ["eng", "fra", "spa", "zh-CN", "vie", "nep", "srp", "deu", "orm", "ita", "ara", "rus", "tgl", "por", "jpn", "tha"], state: "Vermont" },
  { languages: ["eng", "spa", "kor", "vie", "zh-CN", "ara", "tgl", "fas", "amh", "urd", "fra", "rus", "hin", "deu", "ben", "bsq", "ibo", "yor"], state: "Virginia" },
  { languages: ["eng", "spa", "zh-CN", "vie", "kor", "rus", "tgl", "ukr", "khm", "jpn", "amh", "orm", "ara", "pan", "deu", "lao"], state: "Washington" },
  { languages: ["eng", "spa", "zh-CN", "fra", "deu", "ara", "vie", "kor", "jpn", "tgl", "ita", "tha", "nep", "fas", "rus", "urd"], state: "West Virginia" },
  { languages: ["eng", "spa", "hmn", "zh-CN", "deu", "ara", "rus", "kor", "vie", "pdc", "lao", "fra", "pol", "hin", "sqi", "tgl"], state: "Wisconsin" },
  { languages: ["eng", "spa", "zh-CN", "deu", "tgl", "fra", "kor", "vie", "ita", "rus", "ind", "jpn", "nep", "fas", "guj", "nav"], state: "Wyoming" }
]


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


//triggers select to change lang
const triggerTranslateSelect = (googTransCode) => {
  const selectElement = document.querySelector('.goog-te-combo');
  selectElement.value = googTransCode;
  selectElement.dispatchEvent(new Event('change'));
}

//in the main modal - current language icon and text
const setCurrLangBubble = (googTransCode) => {
  const currLanguageItem = worldLanguageData.filter(lang => lang.LanguageCodeGoogleTrans === googTransCode)[0]
  const currLangIcon = document.querySelector('#curr-language-icon')//from curr lang in main modal
  const currLangText = document.querySelector('#curr-language-text')
  const translateIcon = document.querySelector('#translate-icon')//from main page
  currLangIcon.src = `./flourish/img/language/${currLanguageItem.FlorishIconfilename}`;
  translateIcon.src = `./flourish/img/language/${currLanguageItem.FlorishIconfilename}`;
  currLangText.innerText = currLanguageItem.LanguageAutonym;
}

// translate language section ------------------->
const dismissGoogleTranslate = () => {
  // console.log('dismiss google trans ran')
  triggerTranslateSelect('en')
  setCurrLangBubble('en')
  removeWidgetControls(['google-translate'])
  widgetItemObj.isTranslated = false
  $.removeCookie('googtrans');
  checkIfWidgetActive()
}

const changeSiteLanguage = (googTransCode) => {
  if (googTransCode && googTransCode !== 'en') {
    triggerTranslateSelect(googTransCode)
  } else {
    dismissGoogleTranslate()
  }
}

const handleSiteLangChanges = (googTransCode) => {
  const currLanguageItem = worldLanguageData.filter(lang => lang.LanguageCodeGoogleTrans === googTransCode)[0]
  removeWidgetControls(['google-translate'])
  addWidgetControls('google-translate', `Google translate: ${currLanguageItem.LanguageEnglish}`)
  widgetItemObj.isTranslated = true
  setCurrLangBubble(googTransCode)
  checkIfWidgetActive()
}
// btns have a google translate code set as their id... if the language isn't supported there won't be a code and it will have the language + 'language-btn' added as id instead

const translateNotSupported = (item) => {
  if (item.id.includes('language-btn')) {
    $(function () {
      $('.flourish-popover').popover({
        container: '#flourish_widget'
      })
    })
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
const langBtnClickHandler = () => {
  const langTransBtns = document.querySelectorAll('.lang-translate-selector')
  langTransBtns.forEach(btn => {
    translateNotSupported(btn)
    btn.addEventListener('click', () => {
      if (btn.classList.contains('disable')) return
      let currLang = document.querySelector(".goog-te-combo").value;
      if (!currLang) currLang = 'en'

      if (currLang !== btn.id) {
        changeSiteLanguage(btn.id)
        let newLang = document.querySelector(".goog-te-combo").value;
        // console.log('btn id', btn.id, 'new lang', newLang)
        if (newLang && currLang !== newLang) {
          // console.log('Curr:', currLang, '-', 'New:', newLang)
          handleSiteLangChanges(btn.id)
          handleTranslateSpeechVoiceSelect(btn.id)
          translateNotSupported(btn)
          closeLangModal(btn)
          resetMaskOnTranslate()
        }
      }
    })
  })
}

const handleTranslateSpeechVoiceSelect = (googTransLangId) => {
  //search for a compatible voice/accent on site translate
  let voiceList = speechSynthesis.getVoices();
  for (const voiceItem of voiceList) {
    const slicedId = voiceItem.lang.split("-")[0];
    if (voiceItem.lang === googTransLangId || slicedId === googTransLangId) {
      triggerEventFunc('#voice', voiceItem.name);
      return;
    }
  }

  //if no direct connection found - search for closest compatibility
  const similarLanguageArr = [
    ['az', 'be', 'bg', 'kk', 'ky', 'mk', 'mn', 'sr', 'tg', 'tt', 'uk'],
    ['bho', 'doi', 'gom', 'mai', 'mr', 'ne', 'sa'],
    ['jv']
  ]
  const compatibleAccents = ['Google русский', 'Google हिन्दी', 'Google Bahasa Indonesia']
  for (let i = 0; i < similarLanguageArr.length; i++) {
    const compatibleAccent = compatibleAccents[i]
    for (let j = 0; j < similarLanguageArr[i].length; j++) {
      if (googTransLangId === similarLanguageArr[i][j]) {
        similarLanguageArr[i][j]
        console.log('curr', similarLanguageArr[i][j], 'compatible accent', compatibleAccent)
        triggerEventFunc('#voice', compatibleAccent)
        return;
      }
    }
  }
  triggerEventFunc('#voice', 'Google US English')
}

const resetLangModalSettings = () => {
  const defaultFilterBtn = document.querySelector('#all-languages-filter')
  defaultFilterBtn.click()
  const langModalSearchInput = document.querySelector('#search-lang-modal')
  langModalSearchInput.value = ''
}

const closeLangModal = (btn) => {
  if (!btn.classList.contains('disable') &&
    !btn.classList.contains('audio_state'
    )) {
    $('#all-languages-modal').modal('hide')
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
}


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
          <img loading="lazy" class="language-icons" src="./flourish/img/language/${arr[i].FlorishIconfilename}"
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
        // console.log(currLang, newLang)
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
//in popup language modal - 3 filter sections
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
        // languageBtnHandler()
      } else if (filterParam === 'LanguageScriptAutonym') {
        setLanguageScriptResults(worldLanguageData)
        // languageBtnHandler()
      } else {
        setDefaultModal()
      }
      $('#no-results-error').hide()
    }
    langBtnClickHandler()
  })
})

const languageBtnHandler = () => {
  document.querySelectorAll('.lang-translate-selector').forEach(item => {
    // translateNotSupported(item)
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
let modalSearchTimer;
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
  // languageBtnHandler()
  if (filteredSearchArr.length === 0) {
    $('#no-results-error').css("display", "flex")
  } else {
    $('#no-results-error').hide()
    clearTimeout(modalSearchTimer);
    modalSearchTimer = setTimeout(() => resetTextToSpeech(), 500);
  }
  langBtnClickHandler()

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
  // languageBtnHandler()
}

const openTranslateModal = () => {
  setDefaultModal()
  // document.body.style.overflow = 'hidden';
}

const closetranslateModal = () => {
  document.body.style.overflow = '';
}

document.querySelector('#flourish-more-languages-btn').addEventListener('click', openTranslateModal)

// // Close modal on "X" button click
// document.querySelector('#close-language-modal').addEventListener('click', closeModal);

// // Close modal when clicking outside of the modal content
// document.querySelector('#modal-background').addEventListener('click', (event) => {
//     if (event.target === event.currentTarget) {
//         closeModal();
//     }
// });

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

const translateIcon = document.querySelector('#translate-icon')

translateIcon.addEventListener('click', () => {
  displayModal()
  $('.modal_body #language-options').get(0).scrollIntoView({ behavior: "auto", block: "start" });
  // setTimeout(() => {
  //         document.querySelector('#flourish-more-languages-btn').click()
  // }, 500);
})
// change classes for main ada icon size based on innerwidth
const setFlourishIconPlacement = () => {
  const flourishMain = document.querySelector('#flourish-widget-main')
  if (window.innerWidth < 500) {
    flourishMain.classList.remove('trigger-medium', 'trigger-large')
    flourishMain.classList.add('trigger-small')
  } else if (window.innerWidth > 500 && window.innerWidth < 1200) {
    flourishMain.classList.remove('trigger-small', 'trigger-large')
    flourishMain.classList.add('trigger-medium')
  } else if (window.innerWidth > 1200) {
    flourishMain.classList.remove('trigger-small', 'trigger-medium')
    flourishMain.classList.add('trigger-large')
  }
}
setFlourishIconPlacement()

// const changePopoverPlacement = () => {
//   const flourishMain = document.querySelector('#flourish-widget-main')
//   if (flourishMain.classList.contains('trigger-left')) {
//     $('#toggle-flourish-list').data('placement', 'right');
//   } else {
//     $('#toggle-flourish-list').data('placement', 'left');
//   }
// }
// changePopoverPlacement()

window.addEventListener("resize", () => {
  setFlourishIconPlacement()
  // changePopoverPlacement()
});
const initAudioIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up trigger-audio-icon" viewBox="0 0 16 16">\
<path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>\
<path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>\
<path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"/>\
</svg>'

const resetAudioIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/></svg>'

const pauseAudioIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/></svg>'

const playAudioIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/></svg>'
const resetCurrActiveItem = () => {
  const currActiveItem = document.querySelector('.curr-active-item');
  if (currActiveItem) {
    $('.curr-active-item').children('.trigger-audio-icon').first().html(initAudioIcon);
  }
}

const triggerSpeechToggle = (value) => {
  const e = new Event("change");
  const element = document.querySelector("#ToggleTTS_click")
  element.value = value;
  element.dispatchEvent(e);
  $("#speech-settings").removeClass("disable");
}

const resetTextToSpeech = () => {
  if (document.body.classList.contains('TTS_click_enabled')) {
    $('#ToggleTTS_click').prop('checked', false).trigger('change')
    setTimeout(() => {
      $('#ToggleTTS_click').prop('checked', true).trigger('change')
    }, 600)
  }
}
// edit params in the modal for speech voice

const editSpeechControls = () => {
  // speech edit controls and round slider etc
  let speechVol = $.cookie("speechVolCookie");
  let speechRate = $.cookie("speechRateCookie");
  let speechPitch = $.cookie("speechPitchCookie");

  const getCookieVal = (cookie) => {
    let value = 5
    if ($.cookie(cookie)) {
      value = $.cookie(cookie)
    }
    return value
  }
  let volValue = getCookieVal(speechVol)

  const updateSpeechCookies = (item, value) => {
    resetSpeech()
    $.cookie(item, value, { expires: 30 })
  }

  // getMobileOperatingSystem();
  // roundSlider.js -- https://roundsliderui.com/
  $("#volume").roundSlider({
    sliderType: "min-range",
    radius: 60,
    showTooltip: true,
    width: 10,
    value: volValue.speechVol ? volValue.speechVol : 5,
    step: 1,
    handleSize: 0,
    max: 10,
    min: 0,
    handleShape: "square",
    circleShape: "half-top",
    change: function (e) {
      updateSpeechCookies('speechVol', e.value)
    }
  });

  $("#rate").roundSlider({
    sliderType: "min-range",
    radius: 60,
    showTooltip: true,
    width: 10,
    value: volValue.speechRate ? volValue.speechRate : 5,
    step: 1,
    handleSize: 0,
    max: 10,
    min: 0,
    handleShape: "square",
    circleShape: "half-top",
    change: function (e) {
      updateSpeechCookies('speechRate', e.value)
    }
  });

  $("#pitch").roundSlider({
    sliderType: "min-range",
    radius: 60,
    showTooltip: true,
    width: 10,
    value: volValue.speechPitch ? volValue.speechPitch : 5,
    step: 1,
    handleSize: 0,
    max: 10,
    min: 0,
    handleShape: "square",
    circleShape: "half-top",
    change: function (e) {
      updateSpeechCookies('speechPitch', e.value)
    }
  });

  // plus/minus for vol/rate/pitch input
  const speechIcon = document.querySelectorAll('.speech-icon')
  speechIcon.forEach(icon => {
    icon.addEventListener('click', () => {
      let currValId = null;
      let currCookie = null;
      if (icon.classList.contains('speech-volume')) {
        currValId = '#volume'
        currCookie = 'speechVol'
      } else if (icon.classList.contains('speech-rate')) {
        currValId = '#rate'
        currCookie = 'speechRate'
      } else {
        currValId = '#pitch'
        currCookie = 'speechPitch'
      }
      let currRoundSlideValue = $(currValId).roundSlider("option", "value")
      if (icon.classList.contains('speech-plus-icon')) {
        $(currValId).roundSlider({ value: currRoundSlideValue + 1 });
        $.cookie(currCookie, currRoundSlideValue + 1, { expires: 30 })
      } else {
        $(currValId).roundSlider({ value: currRoundSlideValue - 1 });
        $.cookie(currCookie, currRoundSlideValue - 1, { expires: 30 })
      }
      resetSpeech()
    })
  })

  $("#volume input").addClass("volume_selector");
  $("#rate input").addClass("rate_selector");
  $("#pitch input").addClass("pitch_selector");
  $("<span class='headings'>Volume</span>").appendTo("#volume");
  $("<span class='headings'>Rate</span>").appendTo("#rate");
  $("<span class='headings'>Pitch</span>").appendTo("#pitch");
}

editSpeechControls()

const resetVoiceSettings = () => {
  $("#volume").roundSlider({
    value: 5
  });
  $("#rate").roundSlider({
    value: 5
  });
  $("#pitch").roundSlider({
    value: 5
  });
}

const fullVoiceReset = () => {
  $.removeCookie('voiceCookie');
  resetVoiceSettings()
  resetSpeech()
  resetVoiceDefault()
}

const resetVoiceBtn = document.querySelector('#reset-voice-btn')
resetVoiceBtn.addEventListener('click', () => {
  fullVoiceReset()
  // resetTextToSpeech()
})

const speechSynthesisParams = (item) => {
  const clear = () => { clearInterval(speechInterval) }
  const itemType = item.closest('.TTS_content').firstChild.nodeName.toLowerCase()
  if (itemType !== 'select') {
    ssu.text = $(item).parent("div.audio_state").prev(itemType).text();
  } else {
    ssu.text = $(item).parent().prev()[0].value
  }
  ssu.volume = parseFloat(volumeInput.value / 10);
  ssu.rate = parseFloat(rateInput.value / 5);
  ssu.pitch = parseFloat(pitchInput.value / 5 + .01);
  ssu.onerror = clear
  if (voiceSelect.value) {
    ssu.voice = speechSynthesis.getVoices().filter(function (voice) {
      synth.cancel();
      $(item).removeClass('audio-paused audio-playing')
      $(item).addClass('audio-inactive ')
      return voice.name == voiceSelect.value;
    })[0];
  }
}

// initialize the speech synthesis library
let ssu;
let voices;
let synth = window.speechSynthesis;
let voiceSelect = document.getElementById('voice');
let volumeInput = document.querySelector('.volume_selector');
let rateInput = document.querySelector('.rate_selector');
let pitchInput = document.querySelector('.pitch_selector');

// Fetch the list of voices and populate the voice options.
const loadVoices = () => {
  // Fetch the available voices.
  if (document.querySelector('#voice').length === 0) {
    let voiceList = speechSynthesis.getVoices();

    // console.log(voiceList)
    // Loop through each of the voices.
    voiceList.forEach(function (voice, i) {
      // if (i !== 0 && i !== 2 && i !== 4 && i !== 5 && i !== 6) return;
      // if (voice.name !== 'Google US English' &&
      //   voice.name !== 'Google UK English Male' &&
      //   voice.name !== 'Microsoft David - English (United States)' &&
      //   voice.name !== 'English United States' &&
      //   voice.name !== 'Daniel' &&
      //   voice.name !== 'Samantha' &&
      //   voice.name !== 'Microsoft Jenny Online (Natural) - English (United States)' &&
      //   voice.name !== 'Microsoft Steffan Online (Natural) - English (United States)' &&
      //   voice.name !== 'English (USA,DEFAULT)') {
      //   return
      // }
      // console.log(voiceSelect)
      let option = document.createElement('option');
      option.value = voice.name;
      option.innerHTML = voice.name;
      voiceSelect.appendChild(option);

    });
    // if (document.querySelector('#voice').length === 0) {
    //   voiceList.forEach(function (voice, i) {
    //     let option = document.createElement('option');
    //     option.value = voice.name;
    //     option.innerHTML = voice.name;
    //     voiceSelect.appendChild(option);

    //   });
    // }
    // if (document.querySelector('#voice').length < 2) {
    //   $('#voice-settings-header').addClass('d-none')
    // }

  }
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
synth.onvoiceschanged = function (e) {
  loadVoices();
};

$(document).ready(function () {
  initSpeechSynthesis();
});

$("#voice").on("change", function (e) {
  resetSpeech()
  let currVoice = $('#voice').find(":selected").text();
  let voiceCookie = $.cookie("speechVoiceCookie");
  $.cookie("voiceCookie", currVoice, { expires: 30 })
});

const resetVoiceDefault = () => {
  if ($("#voice option[value='Google US English']").length > 0) {
    return $("#voice").val('Google US English');
  } else {
    return $("#voice").val($("#voice option:first").val());
  }
}

setTimeout(() => {
  if ($.cookie("voiceCookie")) {
    let cookieValue = $.cookie("voiceCookie")
    $("#voice").val(cookieValue)
  } else {
    resetVoiceDefault()
  }
}, 500);
// main toggle/setup for text to speech
// Toggle Text-to-Speech click
$(function () {
  $('[id="ToggleTTS_click"]').change(function () {
    if ($(this).is(':checked')) {
      toggleSpeechOn()
    } else {
      toggleSpeechOff()
    }
  });
});

let voiceSelectCurrVal = ''

const toggleSpeechOn = () => {
  $(".audio_state").hide()
  $("body").addClass("TTS_click_enabled");
  $(".audio_state").fadeIn(600)
  $("#speech-settings").removeClass("disable");
  $('#reset-voice-settings').fadeIn()
  addWidgetControls('ToggleTTS_click', 'Text to speech')
  widgetItemObj.isSpeech = true
  addAudioPlayers('p, :header, button, td, th, label, strong, a, li, span, select')
  speechItemHandler()
  checkIfWidgetActive()
  if (document.getElementById('ttsInstructions')) {
    document.getElementById('ttsInstructions').innerText = 'Text-to-Speech is active. Press Shift + 8 to toggle it back on.';
  }
}

const toggleSpeechOff = () => {
  $("#speech-settings").addClass("disable");
  $('#reset-voice-settings').fadeOut()
  $(".audio_state").hide()
  $("body").removeClass("TTS_click_enabled");
  $.cookie('TTS_click_enabled', 'false');
  removeAudioState()
  removeWidgetControls(['ToggleTTS_click'])
  widgetItemObj.isSpeech = false
  checkIfWidgetActive()
  document.getElementById('ttsInstructions').innerText = 'Text to speech is inactive. Press Shift + 8 to toggle it back on.';

}

const removeAudioState = () => {
  document.querySelectorAll('.audio_state').forEach(item => {
    item.remove()
  })
  document.querySelectorAll('.TTS_content').forEach(item => {
    $(item).contents().unwrap();
  })
}

$("#Flourish_trigger").click(function () {
  resetSpeech()
});

// Cancels all utterances if the user leaves the site.
window.onbeforeunload = function (e) {
  resetSpeech()
};

function initSpeechSynthesis() {
  if (!('speechSynthesis' in window)) {
    alert("Sorry, your browser doesn't support text to speech!");
    return;
  }
  ssu = new SpeechSynthesisUtterance();
  ssu.lang = 'en-US';
};

document.querySelector('#flourish_reset').addEventListener('click', () => {
  fullVoiceReset()
  loadVoices()
})
document.querySelector('#reset-flourish').addEventListener('click', () => {
  fullVoiceReset()
  loadVoices()
})

document.querySelector('#flourish-more-languages-btn').addEventListener('click', () => {
  languageModalSpeechHandler('#all-languages-modal-content .translate-language-span')
})

document.querySelectorAll('.lang-filter').forEach(item => {
  item.addEventListener('click', () => {
    languageModalSpeechHandler('#all-languages-modal-content .translate-language-span, #all-languages-modal-content h5, #all-languages-modal-content h6')
  })
})

const languageModalSpeechHandler = (selectors) => {
  setTimeout(() => {
    if (document.body.classList.contains('TTS_click_enabled')) {
      addAudioPlayers(selectors)
      speechItemHandler()
    }
  }, 200)
}


const speechCookieHandler = () => {
  const screenReaderAria = document.createElement('div')
  screenReaderAria.id = 'ttsInstructions'
  screenReaderAria.setAttribute('aria-live', 'assertive')
  if ($.cookie('TTS_click_enabled') === 'true') {
    triggerSpeechToggle('true')
    screenReaderAria.innerText = 'Text-to-Speech feature is currently active. Press Shift + 8 to disable it.';
  } else {
    screenReaderAria.innerText = 'Text-to-Speech feature is not currently active. Press Shift + 8 to enable it';
  }
  document.body.prepend(screenReaderAria)
}

setTimeout(() => {
  speechCookieHandler()
}, 300)
// reset all speech players to default volume icon
const resetSpeech = () => {
  synth.cancel();
  $(".trigger-audio").each(function (index) {
    if ($(this).hasClass('play-pause')) {
      $(this).addClass('inactive-item')
      $(this).removeClass('audio-paused audio-playing curr-active-item')
      $(this).addClass('audio-inactive ')
      resetCurrActiveItem()
    } else {
      $(this).addClass('d-none')
    }
  });
}

//create audio players around text
const addAudioPlayers = (selectors) => {
  $(selectors).not("#language-btn-modal-header *").each(function () {
    const itemDisplay = window.getComputedStyle(this, null).display
    const itemOpacity = window.getComputedStyle(this, null).opacity
    const currTextItem = $(this).text()
    const itemType = this.nodeName

    if (currTextItem && currTextItem.replaceAll(/\s/g, '') !== ''
      && currTextItem.replaceAll(/\s/g, '') !== 'inherit'
      && currTextItem.replaceAll(/\s/g, '').length > 1
      && itemDisplay !== 'none'
      && itemOpacity !== '0'
      && this.id !== 'preset-color-btn'
      && this.id !== 'custom-color-btn'
      && !$(this).parent().hasClass('TTS_content')) {

      if (itemType === 'SPAN' || itemType === 'LI' || itemType === 'TD' || itemType === 'TH') {
        if (!this.firstElementChild) {
          generateAudioPlayer(this)
        }
      } else if (itemType === 'SELECT') {
        if (this.value !== 'inherit') {
          generateAudioPlayer(this)
        }
      } else if (itemType === 'A') {
        if (!this.closest('p')) {
          generateAudioPlayer(this)
        }
      } else {
        generateAudioPlayer(this)
      }
    }
    if (this.classList.contains('hidden-span')) {
      generateAudioPlayer(this)
    }
  })
}

const generateAudioPlayer = (item) => {
  $(item).wrap('<section class="TTS_content"></section>');
  $(`<div class="audio_state">\
    <button class="trigger-audio play-pause inactive-item audio-inactive" title="Trigger audio">${initAudioIcon}</button>\
    <button class="trigger-audio reset-audio-btn d-none" title="Cancel">\
    ${resetAudioIcon}
    </button></div>`).insertAfter(item);
}

/***** handler for speech items -- the speech btn and the play/pause/reset all have trigger audio class.. tehse conditionals test whcih one is which *****/
let speechInterval
const speechItemHandler = () => {
  $('div.audio_state .trigger-audio').each(function (index) {
    $(this).unbind('click').click(function (e) {
      e.preventDefault()
      clearInterval(speechInterval)
      if ($(this).hasClass('play-pause')) {
        if (!$(this).hasClass('curr-active-item') && !$(this).hasClass('reset-audio-btn')) {
          initAudioHandler(this)
        } if ($(this).hasClass('audio-inactive')) {
          startAudioHandler(this)
        } else if ($(this).hasClass('audio-playing')) {
          pauseAudioHandler(this)
        } else if ($(this).hasClass('audio-paused')) {
          resumeAudioHandler(this)
        }
      } else {
        resetAudioHandler(this)
      }
      e.stopPropagation(this)
    });
  });
}

const initAudioHandler = (item) => {
  console.log('init audio ran')
  resetCurrActiveItem()
  resetSpeech()
  $(item).addClass('curr-active-item').removeClass('inactive-item')
  $(item).closest('.audio_state').children('.reset-audio-btn').first().removeClass('d-none')
}

const startAudioHandler = (item) => {
  console.log('start audio ran')
  synth.cancel();
  speechSynthesisParams(item)
  synth.speak(ssu);
  startAudioBtns(item)
  forceSpeechInterval()
  resetCompletedAudio(item)
}

//switch icons to pause icons while audio is playing
const startAudioBtns = (item) => {
  $(item).children('.trigger-audio-icon').first().html(pauseAudioIcon);
  $(item).removeClass('audio-inactive audio-paused').addClass('audio-playing')
}

const forceSpeechInterval = (item) => {
  // on chrome speechSynthesis has a bug where it stops playing if the passage is longer than 15 seconds
  const currOS = getOS()
  if (currOS !== 'Android') {
    speechInterval = setInterval(() => {
      if (!speechSynthesis.speaking) {
        clearInterval(speechInterval);
      } else {
        console.log('15 sec interval force continue - speech synthesis bug workaround')
        speechSynthesis.pause();
        speechSynthesis.resume();
      }
    }, 14000);
  }
}

const resetCompletedAudio = (item) => {
  ssu.addEventListener("end", (event) => {
    console.log('audio ended and is now reset. Press play to start from the beginning')
    synth.cancel();
    if ($(item).hasClass('curr-active-item')) {
      $(item).removeClass('audio-paused audio-playing')
      $(item).addClass('audio-inactive ')
      $(item).children('.trigger-audio-icon').first().html(playAudioIcon);
    }
  });
}

const resumeAudioHandler = (item) => {
  console.log('resume audio ran')
  startAudioBtns(item)
  synth.resume()
  forceSpeechInterval()
}

const pauseAudioHandler = (item) => {
  console.log('pause audio ran')
  $(item).removeClass('audio-inactive audio-playing')
  $(item).addClass('audio-paused')
  $(item).children('.trigger-audio-icon').first().html(playAudioIcon);
  synth.pause()
  const currOS = getOS()
  if (currOS !== 'Android') {
    speechInterval = setInterval(() => {
      console.log('15 sec pause - prevent breaking- speech synthesis bug workaround')
      speechSynthesis.resume();
      speechSynthesis.pause()
    }, 14000);
  }
}

const resetAudioHandler = (item) => {
  console.log('reset audio ran')
  synth.cancel()
  $(item).siblings('.play-pause').removeClass('audio-paused audio-playing').addClass('audio-inactive')
  $(item).siblings('.play-pause').children('.trigger-audio-icon').first().html(playAudioIcon);

}



// active item add/delete section -------------->
const addWidgetControls = (item, text) => {
  const widgetList = document.querySelector('#widget-list')
  const doesItemExist = document.querySelector(`li.${item}`)
  if (!doesItemExist) {
    const listItem = document.createElement('li')
    listItem.classList.add(item, 'fade-in', 'close-list-items')
    listItem.innerHTML = `<svg class="close-active-item" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
  </svg> <span class="close-active-text">${text}</span> `
    widgetList.append(listItem)
    languageModalSpeechHandler('.close-active-text')
  }
  let closeItems = document.querySelectorAll('.close-list-items')
  closeItemHandler(closeItems)
  // console.log('add widget controls ran')
}

const removeWidgetControls = (itemArr) => {
  itemArr.forEach(item => {
    $(`li.${item}`).remove();
  });
  checkIfWidgetActive()
}



const closeItemHandler = (closeItems) => {
  closeItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.contains('ToggleHighlightHover') && $('#ToggleHighlightHover').prop('checked', false).trigger('change')
      item.classList.contains('ToggleHighlightLinks') && $('#ToggleHighlightLinks').prop('checked', false).trigger('change')
      item.classList.contains('ToggleTextMagnifier') && $('#ToggleTextMagnifier').prop('checked', false).trigger('change')
      item.classList.contains('ToggleImageDescription') && $('#ToggleImageDescription').prop('checked', false).trigger('change')
      item.classList.contains('TogglePhotoFilter') && $('#TogglePhotoFilter').prop('checked', false).trigger('change')
      item.classList.contains('ToggleReadingMask') && $('#ToggleReadingMask').prop('checked', false).trigger('change')
      item.classList.contains('ToggleReadingGuide') && $('#ToggleReadingGuide').prop('checked', false).trigger('change')
      item.classList.contains('ToggleTTS_click') && $('#ToggleTTS_click').prop('checked', false).trigger('change')
      item.classList.contains('ColorPicker') && resetColorPicker()
      item.classList.contains('letter_spacing') && restoreSpacingDefault('#letter_spacing', ['letter_spacing'])
      item.classList.contains('word_spacing') && restoreSpacingDefault('#word_spacing', ['word_spacing'])
      item.classList.contains('line_height') && restoreSpacingDefault('#line_height', ['line_height'])
      item.classList.contains('Cursor_Enlarge_option') && restoreDefaultCursorSize()
      item.classList.contains('FontSizeMedium') && restoreDefaultFontSize()
      item.classList.contains('google-translate') && dismissGoogleTranslate()
      item.classList.contains('FT_Dyslexic') && restoreDefaultFontType()
      item.classList.contains('FT_Baskerville') && restoreDefaultFontType()
      let colorPreArr = ['DarkContrastBackground', 'DesaturateBackground', 'InvertBackground', 'HighSaturationBackground', 'LowSaturationBackground']
      for (let i = 0; i < colorPreArr.length; i++) {
        if (item.classList.contains(colorPreArr[i])) {
          colorPresetToDefault()
        }
      }
      checkIfWidgetActive()
      const remainingItems = document.querySelectorAll('.close-list-items');
      if (remainingItems.length === 0) {
        removeDeleteContainer()
      }
    })
  })
}

const addWidgetControlsOnLoad = () => {
  widgetItemObj.isHighlighted && addWidgetControls('ToggleHighlightHover', 'Highlight on hover')
  widgetItemObj.isOutlined && addWidgetControls('ToggleHighlightLinks', 'Highlight all links')
  widgetItemObj.isTextMag && addWidgetControls('ToggleTextMagnifier', 'Magnify text')
  widgetItemObj.isImgMag && addWidgetControls('ToggleImageDescription', 'Image description')
  widgetItemObj.isPhotoSens && addWidgetControls('TogglePhotoFilter', 'Photosensitivity filter')
  widgetItemObj.isReadingMask && addWidgetControls('ToggleReadingMask', 'Reading mask')
  widgetItemObj.isReadingGuide && addWidgetControls('ToggleReadingGuide', 'Reading guide')
  widgetItemObj.isSpeech && addWidgetControls('ToggleTTS_click', 'Text to speech')
  widgetItemObj.isLetterSpaceChanged && addWidgetControls('letter_spacing', 'Letter spacing')
  widgetItemObj.isWordSpaceChanged && addWidgetControls('word_spacing', 'Word spacing')
  widgetItemObj.isLineHeightChanged && addWidgetControls('line_height', 'Line height')
  if (widgetItemObj.isBackColorChanged || widgetItemObj.isTextColorChanged || widgetItemObj.isLinkColorChanged) {
    addWidgetControls('ColorPicker', 'Custom colors')
  }
  widgetItemObj.isDarkContrast && addWidgetControls('DarkContrastBackground', 'Dark contrast preset')
  widgetItemObj.isDesaturated && addWidgetControls('DesaturateBackground', 'Desaturate preset')
  widgetItemObj.isHighSat && addWidgetControls('HighSaturationBackground', 'High saturation')
  widgetItemObj.isLowSat && addWidgetControls('LowSaturationBackground', 'Low saturation')
  widgetItemObj.isInverted && addWidgetControls('InvertBackground', 'Inverted preset')
  widgetItemObj.isFontBig && addWidgetControls('FontSizeMedium', 'Change font size')
  widgetItemObj.isDyslexicFont && addWidgetControls('FontTypeDyslexic', 'Open-dyslexic font')
  widgetItemObj.isBaskervilleFont && addWidgetControls('FontTypeBaskerville', 'Libre-baskerville font')
  widgetItemObj.isCursorBig && addWidgetControls('Cursor_Enlarge_option', 'Change cursor')
}
addWidgetControlsOnLoad()


// func to display and close modal
const displayModal = () => {
  const overlay = document.querySelector('#flourish_widget')
  if (overlay.style.display !== "flex") {
    $("#flourish-triggers").fadeOut(700);
    $("#flourish_widget").css('opacity', '0');
    $("#flourish_widget").css("display", "flex")
    $("#flourish_widget").fadeTo(0, 1);
    $(".modal_content").fadeToggle(0);
    $(".modal_body").scrollTop(0);
    document.body.classList.add("prevent-body-overflow");
  } else {
    $("#flourish_widget").fadeTo(400, 0);
    $(".modal_content").fadeToggle(400);
    setTimeout(() => {
      document.body.classList.remove("prevent-body-overflow");
      $("#flourish_widget").css("display", "none")
      $("#flourish-triggers").fadeIn();
    }, 500);
  }
}

let flourish_widget = document.getElementById("flourish_widget");
let toggleFlourishIcon = document.getElementById("flourish_icon");
let Closeflourish_widget = document.getElementsByClassName("flourish_close")[0];
toggleFlourishIcon.onclick = function () {
  displayModal()
}

Closeflourish_widget.onclick = function () {
  displayModal()
}

window.onclick = function (event) {
  if (event.target == flourish_widget) {
    // flourish_widget.style.display = "none";
    displayModal()
  }
}

// active item sub menu on the side ---------------------------->
const addDeleteContainer = () => {
  $("#toggle-flourish-list").attr("src", "./flourish/img/toggle-on.svg");
  $("#toggle-flourish-list").removeClass('hide-active-list')
  $("#toggle-flourish-list").addClass('show-active-list')
  $("#item-delete-container").fadeIn()
  $.cookie("deleteContainerActive", 'true', { expires: 30 });
}

const removeDeleteContainer = () => {
  $("#toggle-flourish-list").attr("src", "./flourish/img/toggle-off.svg");
  $("#toggle-flourish-list").removeClass('show-active-list')
  $("#toggle-flourish-list").addClass('hide-active-list')
  $("#item-delete-container").fadeOut()
  $('.flourish-popover-item').popover('hide');
  $.removeCookie('deleteContainerActive');
}

// active item list listener
let toggleWidgetList = document.getElementById('toggle-flourish-list')
toggleWidgetList.addEventListener('click', () => {
  if (toggleWidgetList.classList.contains('show-active-list')) {
    removeDeleteContainer()
  } else {
    addDeleteContainer()
  }
})

if ($.cookie("deleteContainerActive")) {
  addDeleteContainer()
}

// close hover popover on click
document.querySelectorAll('.flourish-popover-item').forEach(item => {
  item.addEventListener('click', () => {
    $('.flourish-popover-item').popover('hide');
  })
})

// item delete container - close on offscreen click
// item delete container - close on offscreen click
// item delete container - close on offscreen click
$('body').click(function (event) {
  // Check if the toggle widget is active
  if (toggleWidgetList.classList.contains('show-active-list')) {
    // Check if the clicked target is NOT within the item-delete-container-remove class or its children
    if (!$(event.target).closest('.close-list-items').length && !$(event.target).closest('#toggle-flourish-list-container').length) {
      console.log('close container')
      removeDeleteContainer();
    }
  }
});


// text/img magnify, reading mask/guide need to change colors when background colors change
const changeMagAndMaskColor = (colorInput) => {
  let magColorNum = 1
  let color = '#000000'

  if (colorInput === 'white') {
    magColorNum = 4
    color = '#FFFFFF'
  } else if (colorInput === 'black') {
    magColorNum = 1
    color = '#000000'
  }

  if (!$.cookie('text-magnify-color-swatch')
    || $.cookie('text-magnify-color-swatch') === 'text-mag-color-1'
    || $.cookie('text-magnify-color-swatch') === 'text-mag-color-4') {
    document.querySelector(`#text-mag-color-${magColorNum}`).click()
  }
  if (!$.cookie('img-magnify-color-swatch')
    || $.cookie('img-magnify-color-swatch') === 'img-mag-color-1'
    || $.cookie('img-magnify-color-swatch') === 'img-mag-color-4') {
    document.querySelector(`#img-mag-color-${magColorNum}`).click()
  }
  if (!$.cookie('readingMaskColor')
    || $.cookie('readingMaskColor') === '#ffffff'
    || $.cookie('readingMaskColor') === '#000000') {
    triggerEventFunc('#mask_color', color)
    triggerEventFunc('#reading-mask-opacity', '.66')
  }
  if (!$.cookie('readingGuideColor')
    || $.cookie('readingGuideColor') === '#ffffff'
    || $.cookie('readingGuideColor') === '#000000') {
    triggerEventFunc('#guide_color', color)
  }
}
//older code -- could use refactoring.
// custom color adjustments
const resetColorInputs = (colorInput, hexInput, hexValue) => {
  const colorItem = document.querySelector(colorInput)
  colorItem.value = hexValue
  colorItem.dispatchEvent(new Event('change'));
  $(hexInput).html(hexValue);
}

const restoreDefaultColorPicker = () => {
  resetColorInputs('#background_color', '#bg_hexVal', defaultBgColor)
  resetColorInputs('#text_color', '#txt_hexVal', defaultTextColor)
  resetColorInputs('#link_color', '#link_hexVal', defaultLinkColor)
}

const deactivatePresets = () => {
  $('#ColorAdjust_option').removeClass('disable-colors')
  $('#DarkContrastBG_option').addClass('disable-colors')
  $('#DesaturateBG_option').addClass('disable-colors')
  $('#InvertBG_option').addClass('disable-colors')
}

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  .slice(1).map(n => parseInt(n, 10)
    .toString(16).padStart(2, '0')).join('')}`

const defaultLink = document.querySelector("a");
let defaultBgColor = rgb2hex(window.getComputedStyle(document.body, null).getPropertyValue('background-color'));
let defaultTextColor = rgb2hex(window.getComputedStyle(document.body, null).getPropertyValue('color'));
let defaultLinkColor = rgb2hex(window.getComputedStyle(defaultLink, null).getPropertyValue('color'));
restoreDefaultColorPicker()

let config = {
  regTextContrast: 5,
  largeTextContrast: 3,
  linkContrast: 3
}

let cache = {};
$("#reset-color-picker").click(function () {
  resetColorPicker()
});

const setupCache = () => {
  cache.bgColor = document.querySelector('#background_color');
  cache.textColor = document.querySelector('#text_color');
  cache.linkColor = document.querySelector('#link_color');
  cache.inputs = document.querySelectorAll('input.color_swatch');
  cache.BgtoText = document.querySelector('#textBackRatioContainer');
  cache.BgtoLink = document.querySelector('#linkBackRatioContainer');
  cache.TexttoLink = document.querySelector('#linkTextRatioContainer');
  cache.contrastValues = document.querySelector('.contrast_values');
}

const getLuminance = (r, g, b) => {
  const RsRGB = r / 255;
  const GsRGB = g / 255;
  const BsRGB = b / 255;
  const R = (RsRGB <= 0.03928) ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
  const G = (GsRGB <= 0.03928) ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
  const B = (BsRGB <= 0.03928) ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4);
  const L = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  return L;
};

const calculateContrast = (L1, L2) => {
  const contrast = (L1 + 0.05) / (L2 + 0.05)
  return parseFloat(contrast.toFixed(2));
};

const hexToRGB = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const takeTwoColors = (c1, c2) => {
  const c1l = getLuminance(c1.r, c1.g, c1.b);
  const c2l = getLuminance(c2.r, c2.g, c2.b);
  if (c1l > c2l) {
    return calculateContrast(c1l, c2l);
  } else {
    return calculateContrast(c2l, c1l);
  }
};

const onInputChange = (e) => {
  widgetItemObj.isTextColorChanged = true
  widgetItemObj.isBackColorChanged = true
  widgetItemObj.isLinkColorChanged = true
  addWidgetControls('ColorPicker', 'Custom colors')
  checkIfWidgetActive()
  if ($('body').hasClass('highcontrast') || $('body').hasClass('inverted') || $('body').hasClass('desaturated')) {
    $("body").removeClass("highcontrast inverted desaturated")
    $.removeCookie('InvertBackground');
    $.removeCookie('DarkContrastBackground');
    $.removeCookie('DesaturateBackground');
    $("#DefaultBG_option").addClass('active').siblings().removeClass('active');
    removeWidgetControls(['DarkContrastBackground', 'DesaturateBackground', 'InvertBackground'])
    widgetItemObj.isDarkContrast = false
    widgetItemObj.isDesaturated = false
    widgetItemObj.isInverted = false
  }
  const value = e.target.value;
  $("#defaultContainer").hide();
  if (!cache.bgColor.value) {
    cache.bgColor.value = defaultBgColor;
  }
  if (!cache.textColor.value) {
    cache.textColor.value = defaultTextColor;
  }
  if (!cache.linkColor.value) {
    cache.linkColor.value = defaultLinkColor;
  }
  const bgColor = hexToRGB(cache.bgColor.value);
  const textColor = hexToRGB(cache.textColor.value);
  const linkColor = hexToRGB(cache.linkColor.value);

  $('body *').not('#flourish_widget, #flourish_widget *, .modal_content *').css('color', cache.textColor.value);
  $('.SearchForm .input-group .input-group-append #submit_search').css('color', cache.textColor.value);
  $('#footerFeat_container, .Footer').css('color', cache.textColor.value);

  $('body').not('[class="flourish_modal_background"]').css('background-color', cache.bgColor.value);
  $('#Scroll_btn').attr('style', 'background-color: ' + cache.bgColor.value);
  $('#navContainer, #navContainer #main_navbar .dropdown-menu.backdrop_hover, #navContainer #main_navbar .dropdown-menu > .dropdown-submenu.firstLevel').attr('style', 'background-color: ' + cache.bgColor.value);
  $('#footerFeat_container, .Footer').css('background-color', cache.bgColor.value);
  $('#menudropdown .card-body').css('background-color', cache.bgColor.value);

  $('body a').not("#flourish_widget a").attr('style', 'color: ' + cache.linkColor.value);
  // $( "a" ).each(function( ) {
  //   $(this).hover(function() {
  //     $(this).css("color",cache.linkColor)
  //   });
  // });

  const bgTextContrast = takeTwoColors(bgColor, textColor);
  const bgLinkContrast = takeTwoColors(bgColor, linkColor);
  const textLinkContrast = takeTwoColors(textColor, linkColor);

  if (bgTextContrast >= 4.5) {
    $(cache.BgtoText).attr('class', 'pass').text('Pass');
  } else if (bgTextContrast <= 4.5) {
    $(cache.BgtoText).attr('class', 'fail').text('Fail');
  }
  if (bgLinkContrast >= 4.5) {
    $(cache.BgtoLink).attr('class', 'pass').text('Pass');
  } else if (bgLinkContrast <= 4.5) {
    $(cache.BgtoLink).attr('class', 'fail').text('Fail');
  }
  if (textLinkContrast >= 3) {
    $(cache.TexttoLink).attr('class', 'pass').text('Pass');
  } else if (textLinkContrast <= 3) {
    $(cache.TexttoLink).attr('class', 'fail').text('Fail');
  }

  passFailStyle(cache.BgtoText, '#text-contrast')
  passFailStyle(cache.BgtoLink, '#link-contrast')
  passFailStyle(cache.TexttoLink, '#link-text-contrast')

  $('#text-text').css({ 'color': cache.textColor.value, 'background-color': cache.bgColor.value });
  $('#link-text').css({ 'color': cache.linkColor.value, 'background-color': cache.bgColor.value });
  $('.link-text-text').css('background-color', cache.bgColor.value);
  $('.both-text').css({ 'color': cache.textColor.value });
  $('.both-link').css({ 'color': cache.linkColor.value });

  if (cache.textColor.value === defaultTextColor && cache.linkColor.value === defaultLinkColor && cache.bgColor.value === defaultBgColor) {
    $('.contrast-section-container ').fadeOut('slow')
    $('#reset-color-picker').fadeOut('slow')
  } else {
    $('.contrast-section-container ').fadeIn('slow')
    $('#reset-color-picker').css({ 'display': 'flex' }).hide().fadeIn()
  }
};

const passFailStyle = (classItem, changeItem) => {
  classItem.classList.contains('pass')
    ? $(changeItem).css('background-color', 'green').text("Pass")
    : $(changeItem).css('background-color', 'red').text("Fail")
}

const addEventListeners = () => {
  cache.bgColor.addEventListener('change', onInputChange);
  cache.textColor.addEventListener('change', onInputChange);
  cache.linkColor.addEventListener('change', onInputChange);
};

const initflourishListeners = () => {
  setupCache();
  addEventListeners();
}
initflourishListeners();

const resetColorPicker = () => {
  if (widgetItemObj.isTextColorChanged, widgetItemObj.isBackColorChanged, widgetItemObj.isLinkColorChanged) {
    resetColorInputs('#background_color', '#bg_hexVal', defaultBgColor)
    resetColorInputs('#text_color', '#txt_hexVal', defaultTextColor)
    resetColorInputs('#link_color', '#link_hexVal', defaultLinkColor)
    $('body').not('#flourish-widget-main, #flourish-widget-main *').attr('style', 'background: ' + '' + '!important');
    $('body').not('#flourish-widget-main, #flourish-widget-main *').attr('style', 'background-color:' + '' + '!important');
    $('body *').not('a, #flourish-widget-main, #flourish-widget-main *').attr('style', 'color: ' + '' + '!important');
    $('a').not('#flourish-widget-main, #flourish-widget-main *').attr('style', 'color: ' + '' + '!important');
    $.removeCookie('BackgroundColorCookie');
    $.removeCookie('TextColorCookie');
    $.removeCookie('LinkColorCookie');
    removeWidgetControls(['ColorPicker'])
    widgetItemObj.isTextColorChanged = false
    widgetItemObj.isBackColorChanged = false
    widgetItemObj.isLinkColorChanged = false
    checkIfWidgetActive()
    $('#color-scheme-presets').removeClass('disable-colors')
    $('#DarkContrastBG_option').removeClass('disable-colors')
    $('#DesaturateBG_option').removeClass('disable-colors')
    $('#InvertBG_option').removeClass('disable-colors')
    // $('#extra-links').fadeOut()
    // $('.preset-container').css('margin-top', '1.3rem');
    resetCustomPresets()
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.color = '';
        link.style.opacity = '';
      })
      link.addEventListener('mouseleave', () => {
        link.style.opacity = '';
        link.style.color = '';
      })
    })

  }
  $.removeCookie('customColorChange');
  document.getElementById('preset-color-btn').click()
}

$(document).ready(function () {
  $.fn.cssAsHex = function (colorProp) {
    let hexDigits = '0123456789abcdef';
    function hex(x) {
      return isNaN(x) ? '00' : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    };
    function rgb2hex(rgb) {
      let rgbRegex = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      return '#' + hex(rgbRegex[1]) + hex(rgbRegex[2]) + hex(rgbRegex[3]);
    };
    return rgb2hex(this.css(colorProp));
  };

  //BackgroundColor
  $('#background_color').on("change", function () {
    let hexBackgroundColor = $('body').cssAsHex('background-color');
    $("#bg_hexVal").html(hexBackgroundColor);
    $.cookie.raw = true; //to bypass the default cookie value which is encoded/decoded when writing/reading
    $.cookie('BackgroundColorCookie', hexBackgroundColor, { expires: 30 });
    deactivatePresets()
    document.querySelectorAll('body *:not(#flourish-widget-main *):not(input[type="text"]):not(input[type="textarea"])').forEach(function (element) {
      element.style.backgroundColor = hexBackgroundColor; // Change to your desired color
    });
  });
  if ($.cookie('BackgroundColorCookie') != undefined) {
    setCookieColors('BackgroundColorCookie', '#background_color', "#bg_hexVal")
  }

  //TextColor
  $('#text_color').on("change", function () {
    let hexTextColor = $('body *').cssAsHex('color');
    $("#txt_hexVal").html(hexTextColor);
    $.cookie.raw = true;
    $.cookie('TextColorCookie', hexTextColor, { expires: 30 });
    deactivatePresets()
  });
  if ($.cookie('TextColorCookie') != undefined) {
    setCookieColors('TextColorCookie', '#text_color', "#txt_hexVal")
  }

  //LinkColor
  $('#link_color').on("change", function () {

    const bgHexVal = document.querySelector('#bg_hexVal')

    let hexLinkColor = $('body a').cssAsHex('color');
    $("#link_hexVal").html(hexLinkColor);
    $.cookie.raw = true;
    $.cookie('LinkColorCookie', hexLinkColor, { expires: 30 });
    $('body a').css('background-color', bgHexVal);
    document.querySelectorAll('a:not(#flourish-modal-content a)').forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.color = hexLinkColor;
        link.style.opacity = .7;
      })
      link.addEventListener('mouseleave', () => {
        link.style.opacity = 1;
        link.style.color = hexLinkColor;
      })
    })
    // Change the color and background color of all links except those within #flourish-widget-main
    document.querySelectorAll('a:not(#flourish-widget-main a)').forEach(function (link) {
      link.style.color = hexLinkColor; // Change to your desired link text color
      let hexBackgroundColor = $('body').cssAsHex('background-color');
      link.style.backgroundColor = hexBackgroundColor; // Change to your desired link background color
    });
  });

  if ($.cookie('LinkColorCookie') != undefined) {
    setCookieColors('LinkColorCookie', '#link_color', "#link_hexVal")
  }
});

const setCookieColors = (cookie, input, hex) => {
  const hexValue = $.cookie(cookie)
  const colorInput = document.querySelector(input)
  colorInput.value = hexValue
  colorInput.dispatchEvent(new Event('change'));
  $(hex).html(hexValue);
  $.cookie.raw = true;
}

document.querySelectorAll('.custom-color-input').forEach(item => {
  item.addEventListener('click', () => {
    $.cookie('customColorChange', 'true', { expires: 30 });
    $.removeCookie('main-color-preset');
  })
})

setTimeout(() => {
  $(document).ready(function () {
    if ($.cookie('customColorChange') == 'true') {
      document.querySelector('#custom-color-btn').click()
    }

  });
}, 500)



// website color presets ---------------------------->
const colorPresetObj = [
  {
    id: 'color-preset-1',
    bgColor: '#D9D3D3',
    textColor: '#000000',
    linkColor: ['#AD007F', '#426426', '#8F4500', '#225D91', '#7532C8', '#B21515',]
  },
  {
    id: 'color-preset-2',
    bgColor: '#FEE543',
    textColor: '#000000',
    linkColor: ['#3A4BE4', '#B62F2F', '#00750E', '#A133A3', '#944F00']
  },
  {
    id: 'color-preset-3',
    bgColor: '#072664',
    textColor: '#FFFFFF',
    linkColor: ['#E07800', '#9D980B', '#F06666', '#009DE0', '#D06CD0', '#1FAC0C', '#F24AE4']
  },
  {
    id: 'color-preset-4',
    bgColor: '#1A1A1A',
    textColor: '#FF2929',
    linkColor: ['#F1E0FF', '#F3F4A9', '#A5F8EA', '#FFE6CC', '#BEF4BE', '#FFE0F8']
  },
  {
    id: 'color-preset-5',
    bgColor: '#002E18',
    textColor: '#FFFFFF',
    linkColor: ['#578FFF', '#FF5757', '#00A88C', '#999400', '#C966FF', '#00A80B', '#FF3DCB']
  },
  {
    id: 'color-preset-6',
    bgColor: '#CCF8FF',
    textColor: '#000000',
    linkColor: ['#886211', '#C70092', '#0C7A00', '#D51515', '#0B69BC', '#B300D6']
  },
  {
    id: 'color-preset-7',
    bgColor: '#F9CA94',
    textColor: '#000000',
    linkColor: ['#2B54B6', '#6B2BE3', '#1D6808', '#9C159E', '#066555', '#A81F5A']
  },
  {
    id: 'color-preset-8',
    bgColor: '#44064C',
    textColor: '#FFFFFF',
    linkColor: ['#999400', '#15A512', '#FF5252', '#00A398', '#FA00E5', '#8288E3']
  },
  {
    id: 'color-preset-9',
    bgColor: '#E3CCFF',
    textColor: '#000000',
    linkColor: ['#2D57B9', '#AD0088', '#1B691B', '#8B00D6', '#B31414', '#2A6365']
  },
  {
    id: 'color-preset-10',
    bgColor: '#37EBDC',
    textColor: '#000000',
    linkColor: ['#9C3A3A', '#A503A0']
  },
  {
    id: 'color-preset-11',
    bgColor: '#CAFFC2',
    textColor: '#000000',
    linkColor: ['#4054E7', '#D11515', '#C313B4',]
  },
  {
    id: 'color-preset-12',
    bgColor: '#591212',
    textColor: '#FFFFFF',
    linkColor: ['#009DE0', '#E07800', '#1FAC0C', '#9D980B', '#F24AE4']
  },
]

// swithc between custom and presets btn
const colorSectionBtns = document.querySelectorAll('.color-section-btn')
colorSectionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!btn.classList.contains('active')) {
      colorSectionBtns.forEach((item) => { item.classList.remove('active') })
      btn.classList.add('active')
    } if (btn.id === 'custom-color-btn') {
      $('#preset-schemes').hide()
      $('#custom-schemes').fadeIn()
    } else {
      $('#custom-schemes').hide()
      $('#preset-schemes').fadeIn()
    }
  })
})

const colorPresetItems = document.querySelectorAll('.main-color-presets')

colorPresetItems.forEach((item, i) => {
  item.style.backgroundColor = colorPresetObj[i].linkColor[0]
  item.style.border = `${colorPresetObj[i].textColor} solid 5px`
  item.style.boxShadow = `0 0 0 4px ${colorPresetObj[i].bgColor}, 0 0 0 5px rgba(0, 0, 0, .2)`
  item.addEventListener('click', () => {
    $.cookie('main-color-preset', colorPresetObj[i].id, { expires: 30 });
    $.removeCookie('alt-link');
    colorPresetItems.forEach((item) => { item.classList.remove('active') })
    $(item).addClass('active').siblings().removeClass('active');
    triggerEventFunc("#background_color", colorPresetObj[i].bgColor)
    triggerEventFunc("#text_color", colorPresetObj[i].textColor)
    $("#txt_hexVal").html(colorPresetObj[i].textColor);
    triggerEventFunc("#link_color", colorPresetObj[i].linkColor[0])
    const linkArr = createLinks(i)
    createLinkColorOptions(linkArr)
    handleLinkColorOptions()
    invertFlourishToggle(item)
    $.removeCookie('customColorChange');
  })
})

const createLinks = (indexInput) => {

  const linkArr = colorPresetObj[indexInput].linkColor
  $.cookie('alt-link', linkArr[0], { expires: 30 });
  return linkArr
}

const createLinkColorOptions = (linkArr) => {
  const linkContainer = document.querySelector('#alt-link-colors')
  linkContainer.innerHTML = ''
  for (let j = 0; j < linkArr.length; j++) {
    const newLinkColor = document.createElement('div')
    newLinkColor.style.backgroundColor = linkArr[j]
    newLinkColor.classList.add('alt-link-color')
    newLinkColor.id = linkArr[j]
    linkContainer.append(newLinkColor)
  }
}

const handleLinkColorOptions = () => {
  const linkColors = document.querySelectorAll('.alt-link-color')
  linkColors[0].classList.add('active')
  linkColors.forEach(linkColor => {
    linkColor.addEventListener('click', () => {
      triggerEventFunc("#link_color", linkColor.id)
      linkColors.forEach((colorItem) => { colorItem.classList.remove('active') })
      $(linkColor).addClass('active').siblings().removeClass('active');
      $.cookie('alt-link', linkColor.id, { expires: 30 });
    })
  })
}
const invertFlourishToggle = (item) => {
  const toggle = document.querySelector('#toggle-flourish-list')
  if (item.id === 'color-preset-3' || item.id === 'color-preset-4' || item.id === 'color-preset-5' || item.id === 'color-preset-8' || item.id === 'color-preset-12') {
    toggle.classList.add('invert-toggle')
    changeMagAndMaskColor('white')
  } else {
    toggle.classList.remove('invert-toggle')
    changeMagAndMaskColor('black')
  }
}
setTimeout(() => {
  let linkColor = null
  if ($.cookie('alt-link')) {
    linkColor = $.cookie('alt-link')
    document.getElementById('preset-color-btn').click();
  }
  if ($.cookie('main-color-preset')) {
    const presetId = $.cookie('main-color-preset')
    document.getElementById(presetId).click();
    if (linkColor) {
      document.getElementById(linkColor).click();
    }
  }
  else {

    handleLinkColorOptions()
    if (linkColor) {
      document.getElementById(linkColor).click();
    }
  }
}, 500)

const resetCustomPresets = () => {
  $.removeCookie('main-color-preset');
  $.removeCookie('alt-link');
  const defaultLinkColors = ['#3863FF', '#E60000', '#996900', '#727A00', '#278321', '#7C57E0', '#A648A8']
  createLinkColorOptions(defaultLinkColors)
  handleLinkColorOptions()
  document.querySelector('#toggle-flourish-list').classList.remove('invert-toggle')
  colorPresetItems.forEach((item) => { item.classList.remove('active') })
  document.querySelectorAll('.alt-link-color').forEach((colorItem) => { colorItem.classList.remove('active') })
}

const triggerItemClick = (item, value) => {
  const e = new Event("change");
  const element = document.querySelector(item)
  element.value = value;
  element.dispatchEvent(e);
}


// change font ----------------------------->
const fontTypeArr = [
  {
    id: 'FT_Baskerville',
    activeItemText: 'Libre-baskerville font',
    activeItemObj: 'isBaskervilleFont',
    class_: 'BaskervilleFont',
  },
  {
    id: 'FT_Dyslexic',
    activeItemText: 'Open-dyslexic font',
    activeItemObj: 'isDyslexicFont',
    class_: 'DyslexicFont',
  }
]

const fontTypeOptions = document.querySelectorAll('.font-type-option')

fontTypeOptions.forEach(font => {
  font.addEventListener('click', () => {
    fontTypeHandler(font.id)
  })
})

const restoreDefaultFontType = () => {

  for (let i = 0; i < fontTypeArr.length; i++) {
    const { id, class_, activeItemObj } = fontTypeArr[i]
    widgetItemObj[activeItemObj] = false
    $.removeCookie(id);
    removeWidgetControls([id])
    $('body').removeClass(class_);
  }
  widgetItemObj.isFontChanged = false
  $('#FT_Default').addClass('active').siblings().removeClass('active');
}

const fontTypeHandler = (currItemId) => {
  const currItemTag = `#${currItemId}`
  $(currItemTag).addClass('active').siblings().removeClass('active');
  if (currItemId === 'FT_Default') {
    restoreDefaultFontType()
  } else {
    widgetItemObj.isFontChanged = true
    for (let i = 0; i < fontTypeArr.length; i++) {
      const { id, class_, activeItemObj, activeItemText } = fontTypeArr[i]
      if (id === currItemId) {
        $('body').addClass(class_);
        widgetItemObj[activeItemObj] = true

        $.cookie(id, true, { expires: 30 });
        addWidgetControls(id, activeItemText)
      } else {
        widgetItemObj[activeItemObj] = false
        $.removeCookie(id);
        removeWidgetControls([id])
        $('body').removeClass(class_);
      }
    }
  }
  $.removeCookie('FM_FontTypeCookie');
  checkIfWidgetActive()
}

for (let i = 0; i < fontTypeArr.length; i++) {
  if ($.cookie(fontTypeArr[i].id) == "true") {
    fontTypeHandler(fontTypeArr[i].id)
    setTimeout(() => {
      $("#FT_Default").removeClass('active')
    }, 300)
  }
}
// / change font size section ------------------------->
const restoreDefaultFontSize = () => {
  $('body').removeClass('fontSizeMedium');
  $("#FS_Default").addClass('active').siblings().removeClass('active');
  $.removeCookie('FontSizeCookie');
  removeWidgetControls(['FontSizeMedium'])
  widgetItemObj.isFontBig = false
  checkIfWidgetActive()
}

const increaseFontSize = () => {
  $('#FS_Medium').addClass('active').siblings().removeClass('active');
  $("body").addClass("fontSizeMedium");
  addWidgetControls('FontSizeMedium', 'Change font size')
  widgetItemObj.isFontBig = true
  $.cookie('FontSizeCookie', true, { expires: 30 });
  checkIfWidgetActive()
}

$(document).ready(function () {
  if ($.cookie('FontSizeCookie') == 'true') {
    increaseFontSize()
  }
  $("#flourish_widget a.FontSizeMedium").click(function () {
    increaseFontSize()
  });
  $("#flourish_widget a.FontSizeDefault").click(function () {
    restoreDefaultFontSize()
  });
});

// change cursor size section ----------------------------->
const increaseCursorSize = () => {
  $('#Cur_Enlarge').addClass('active').siblings().removeClass('active');
  $("body").addClass("Cursor_Enlarge");
  addWidgetControls('Cursor_Enlarge_option', 'Increase cursor size')
  widgetItemObj.isCursorBig = true
  $.cookie('CursorEnlargeCookie', true, { expires: 30 });
  checkIfWidgetActive()
}

const restoreDefaultCursorSize = () => {
  $('body').removeClass('Cursor_Enlarge');
  $('#Cur_Default').addClass('active').siblings().removeClass('active');
  $.removeCookie('CursorEnlargeCookie');
  removeWidgetControls(['Cursor_Enlarge_option'])
  widgetItemObj.isCursorBig = false
  checkIfWidgetActive()
}

$(document).ready(function () {
  if ($.cookie('CursorEnlargeCookie') == 'true') {
    increaseCursorSize()
  }
  $("#Cur_Enlarge").click(function () {
    increaseCursorSize()
  });
  $("#Cur_Default").click(function () {
    restoreDefaultCursorSize()
  });
});



// letter spacing word spacing line height section --------------------->
const setSpacingCss = (value, css) => {
  $("body p").not('#flourish_widget, #flourish_widget *, i, div').css(css, value); //Selects everything inside body except flourish modal and
  $(".Footer").css(css, value);
}

const selectChangeHandler = (icon, iconClass, itemId) => {
  if (icon.classList.contains(iconClass)) {
    if (icon.classList.contains('plus-icon')) {
      $(itemId).next().prop('selected', true).trigger('change');
    }
    if (icon.classList.contains('minus-icon')) {
      $(itemId).prev().prop('selected', true).trigger('change');
    }
  }
}

document.querySelectorAll('.spacing-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    selectChangeHandler(icon, 'letter-spacing-icon', '#letter_spacing option:selected')
    selectChangeHandler(icon, 'word-spacing-icon', '#word_spacing option:selected')
    selectChangeHandler(icon, 'line-height-icon', '#line_height option:selected')
  })
})

const restoreSpacingDefault = (itemId, removeItemArr) => {
  $(itemId).prop("selectedIndex", 0).trigger('change');
  checkIfWidgetActive()
  removeWidgetControls(removeItemArr)
}


// letter spacing
$(document).ready(function () {
  let selectedVal = $.cookie("LetterSpaceVal");
  if (selectedVal) {
    $("#letter_spacing").val(selectedVal);
    $("#letter_spacing").prop("selected", true);
    $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div, .close-active-text').css("letter-spacing", selectedVal); //Selects everything inside body except flourish modal and header
    $(".Footer").css("letter-spacing", selectedVal);
    // changeIndent(selectedVal, '10px', '#LetterSpacing_option select'close-active-text, '6.5px')
  }
  $("#letter_spacing").on("change", function () {
    let selection1 = $(this).val();

    $(selection1).prop("selected", true);
    $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div, .close-active-text').css("letter-spacing", selection1); //Selects everything inside body except flourish modal and header
    $(".Footer").css("letter-spacing", selection1);
    $.cookie("LetterSpaceVal", selection1, { expires: 30 })
    // changeIndent(selection1, '10px', '#LetterSpacing_option select', '6.5px')
    widgetItemObj.isLetterSpaceChanged = selection1 === 'inherit' ? false : true
    selection1 === 'inherit' ? removeWidgetControls(['letter_spacing']) : addWidgetControls('letter_spacing', 'Letter spacing')
    checkIfWidgetActive()
  });
});
//Word Spacing
$(document).ready(function () {
  let selectedVal2 = $.cookie("WordSpaceVal");
  if (selectedVal2) {
    $("#word_spacing").val(selectedVal2);
    $("#word_spacing").prop("selected", true);
    $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div').css("word-spacing", selectedVal2); //Selects everything inside body except flourish modal and header
    // changeIndent(selectedVal2, '10px', '#WordSpacing_option select', '6.5px')
  }
  $("#word_spacing").on("change", function () {
    let selection2 = $(this).val();
    $(selection2).prop("selected", true);
    $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div').css("word-spacing", selection2); //Selects everything inside body except flourish modal and header
    $(".Footer").css("#word_spacing", selection2);
    $.cookie("WordSpaceVal", selection2, { expires: 30 })
    // changeIndent(selection2, '10px', '#WordSpacing_option select', '6.5px')
    widgetItemObj.isWordSpaceChanged = selection2 === 'inherit' ? false : true
    selection2 === 'inherit' ? removeWidgetControls(['word_spacing']) : addWidgetControls('word_spacing', 'Word spacing')
    checkIfWidgetActive()

  });
});
//line height
$(document).ready(function () {

  let selectedVal3 = $.cookie("LinpageHeightVal");
  if (selectedVal3) {
    $("#line_height").val(selectedVal3);
    $("#line_height").prop("selected", true);
    $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div').css("line-height", selectedVal3); //Selects everything inside body except flourish modal and header
    $(".Footer").css("line-height", selectedVal3);
  }
  $("#line_height").on("change", function () {
    let selection3 = $(this).val();
    $(selection3).prop("selected", true);
    $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div').css("line-height", selection3); //Selects everything inside body except flourish modal and header
    $(".Footer").css("line-height", selection3);
    $.cookie("LinpageHeightVal", selection3, { expires: 30 })
    widgetItemObj.isLineHeightChanged = selection3 === 'inherit' ? false : true
    checkIfWidgetActive()
    selection3 === 'inherit' ? removeWidgetControls(['line_height']) : addWidgetControls('line_height', 'Line height')

  });
});

// text magnify section ----------------------------------->
let textMagObj = {
  color: 'rgb(255,255,255)',
  backGroundColor: 'rgb(54,54,54)',
  size: '22px',
}

if ($.cookie('TextMagnifier') == "true") {
  $('#ToggleTextMagnifier').prop('checked', false).trigger('change')
  setTimeout(() => {
    $('#ToggleTextMagnifier').prop('checked', true).trigger('change')
    $('#reset-text-magnify-btn').css("display", "flex").hide().fadeIn('slow');
  }, 500)
}

let textMagY = 65
window.onmousemove = function (e) {
  if (e.pageY >= $(document).height() - 120) {
    textMagY = 250
  } else if (e.pageY < 100) {
    textMagY = -0
  }
  else {
    textMagY = 65
  }
}

$(document).on('mousemove', function (e) {
  let textMagX = 15
  if (e.pageX > window.innerWidth / 1.3) {
    textMagX = -300
  }
  $('#text_magnify').css({
    left: e.pageX + textMagX,
    top: e.pageY - textMagY
  });
});

const hoverTextFunc = () => {
  if ($('#ToggleTextMagnifier').is(':checked')) {
    $('#reset-text-magnify-btn').css("display", "flex").hide().fadeIn('slow');
    $('#edit-text-magnify').css("display", "flex").hide().fadeIn();
    $('.text-mag-preview-container').css("display", "flex").hide().fadeIn();
    $("body").addClass("TextMagnifier");
    $('#ToggleZoom').prop('checked', false);
    let textTimer;
    let textMagnify
    $("p, a, :header, header,  span, button, td, figcaption").not('#flourish-triggers, #flourish-triggers ul, #flourish-triggers ul li, #flourish-triggers *, #reset-text-magnify-btn, #reset-img-magnify-btn').on("mouseenter", function () {
      clearTimeout(textTimer)
      textMagnify = $(this).text();
      if (textMagnify.length > 1000) {
        $('#text_magnify').css({ 'max-width': '1000px' });
      } else {
        $('#text_magnify').css({ 'max-width': '500px' });
      }
      textTimer = setTimeout(function () {
        if (textMagnify.replaceAll(/\s/g, '') !== '') {
          $("#text_magnify").text(textMagnify);
          $('#text_magnify').css({ 'color': textMagObj.color, 'background-color': textMagObj.backGroundColor, 'font-size': textMagObj.size });
          if (document.body.classList.contains('TextMagnifier')) {
            $('#text_magnify').show()
          }
        }
      }, 300);
    }).on("mouseleave", function () {
      textMagnify = ''
      $('#text_magnify').hide()
    });
    addWidgetControls('ToggleTextMagnifier', 'Text magnify')
    widgetItemObj.isTextMag = true
  } else {
    $('#reset-text-magnify-btn').fadeOut()
    $('#edit-text-magnify').fadeOut()
    $('.text-mag-preview-container').fadeOut()
    $("body").removeClass("TextMagnifier");
    $('#text_magnify').fadeOut()
    removeWidgetControls(['ToggleTextMagnifier'])
    widgetItemObj.isTextMag = false
  }
  checkIfWidgetActive()
}

$(window).scroll(function () {
  $('#text_magnify').fadeOut('fast')
});

$(function () {
  $('#ToggleTextMagnifier').change(function () {
    hoverTextFunc()
  });
});


// image description ------------------------------>
let imgMagObj = {
  color: 'rgb(255,255,255)',
  backGroundColor: 'rgb(54,54,54)',
  size: '22px!important',
}

if ($.cookie('ImageDescription') == "true") {
  $('#ToggleImageDescription').prop('checked', false).trigger('change')
  setTimeout(() => {
    $('#ToggleImageDescription').prop('checked', true).trigger('change')
    $('#reset-img-magnify-btn').css("display", "flex").hide().fadeIn('slow');
  }, 500);
}

$(document).on('mousemove', function (e) {
  let imgMagY = 65
  let imgMagX = 15
  if (e.pageY >= $(document).height() - 120) {
    imgMagY = 100
  } else if (e.pageY < 100) {
    imgMagY = -0
  }
  else {
    imgMagY = 65
  }
  if (e.pageX > window.innerWidth / 1.3) {
    imgMagX = -200
  }
  $('#ImageDescription_magnify').css({
    left: e.pageX + imgMagX,
    top: e.pageY - imgMagY
  });
});

const imgMagFunc = () => {
  if ($('#ToggleImageDescription').is(':checked')) {
    $('#reset-img-magnify-btn').css("display", "flex").hide().fadeIn('slow');
    $('#edit-img-magnify').css("display", "flex").hide().fadeIn();
    $('.img-mag-preview-container').css("display", "flex").hide().fadeIn();
    $("body").addClass("ImageDescription");
    addWidgetControls('ToggleImageDescription', 'Image description')
    widgetItemObj.isImgMag = true
    let imgTimer;
    let imgAltMagnify = ''
    $('svg[alt], img[alt], i.fa[alt]').not('#toggle-flourish-list').on("mouseenter", function () {
      clearTimeout(imgTimer)
      let imgHideId = $(this).attr("data-id");
      imgAltMagnify = $(this).attr("alt");
      imgTimer = setTimeout(function () {
        if (imgAltMagnify.replaceAll(/\s/g, '') !== '') {
          $("#ImageDescription_magnify").text(imgAltMagnify);
          $('#ImageDescription_magnify').css({ 'color': imgMagObj.color, 'background-color': imgMagObj.backGroundColor, 'font-size': imgMagObj.size });
          if (document.body.classList.contains('ImageDescription') && imgHideId !== 'hide-img-hover') {
            $('#ImageDescription_magnify').show()
          }
        }
      }, 300);
    }).on("mouseleave", function () {
      imgAltMagnify = ''
      $('#ImageDescription_magnify').hide()
    });
  } else {
    $('#reset-img-magnify-btn').fadeOut()
    $('#edit-img-magnify').fadeOut()
    $('.img-mag-preview-container').fadeOut()
    $("body").removeClass("ImageDescription");
    $('#ImageDescription_magnify').fadeOut()
    removeWidgetControls(['ToggleImageDescription'])
    widgetItemObj.isImgMag = false
  }
  checkIfWidgetActive()
}

$(function () {
  $('#ToggleImageDescription').change(function () {
    imgMagFunc()
  });
});

$(window).scroll(function () {
  $('#ImageDescription_magnify').fadeOut('fast')
});

// text magnifier and image magnifier settings section------------------->
const textMagColorControls = (colors, preview, cssObj) => {
  const colorPresets = document.querySelectorAll(colors)
  colorPresets.forEach(preset => {
    preset.addEventListener('mouseenter', () => {
      let hoverColor = $(preset).css("background-color");
      let hoverBackGroundColor = $(preset).css("border-color");
      $(preview).css({ 'color': hoverColor, 'background-color': hoverBackGroundColor, 'border-color': hoverColor });
    })
    preset.addEventListener('mouseleave', () => {
      $(preview).css({ 'color': cssObj.color, 'background-color': cssObj.backGroundColor, 'border-color': cssObj.color });
    })
    preset.addEventListener('click', () => {
      cssObj.color = $(preset).css("background-color");
      cssObj.backGroundColor = $(preset).css("border-color");

      colorPresets.forEach(items => {
        items.classList.remove('active')
      })
      preset.classList.add('active')
      $(preview).css({ 'color': cssObj.color, 'background-color': cssObj.backGroundColor, 'border-color': cssObj.color });
      $.cookie(colors.slice(1), preset.id, { expires: 30 })
    })
  })
}

const restoreMagColorDefault = (type, colors, cssObj, preview) => {
  const colorPresets = document.querySelectorAll(colors)
  colorPresets.forEach(items => {
    items.classList.remove('active')
  })
  let newId = null
  if (document.body.classList.contains('highcontrast') || document.body.classList.contains('inverted')) {
    newId = `#${type}-mag-color-4`
    cssObj.color = '#363636';
    cssObj.backGroundColor = '#ffffff';
  } else {
    newId = `#${type}-mag-color-1`
    cssObj.color = 'rgb(255,255,255)';
    cssObj.backGroundColor = 'rgb(54,54,54)';
  }
  $(preview).css({ 'color': cssObj.color, 'background-color': cssObj.backGroundColor, 'border-color': cssObj.color });
  document.querySelector(newId).classList.add('active')
  $.cookie(colors.slice(1), newId.slice(1), { expires: 30 })
}

// text and image mag SIZE control
const textMagSizeControls = (input, preview, cssObj) => {
  const textMagSizeInput = document.querySelector(input)
  textMagSizeInput.addEventListener('change', () => {
    let updatedPxSize = `${textMagSizeInput.value}px`
    cssObj.size = updatedPxSize;
    $.cookie(input.slice(1), updatedPxSize, { expires: 30 })
    $(preview).css("fontSize", updatedPxSize);
  })
}

const restoreDefaultMagnify = (type, colors, sizeInput, cssObj, preview) => {
  restoreMagColorDefault(type, colors, cssObj, preview)
  cssObj.size = '22px'
  $(sizeInput).val(22).change();
  $.cookie(sizeInput.slice(1), '22px', { expires: 30 })
  $(preview).css({ 'font-size': cssObj.size });
}

// func to handle cookies for text and img size and color
const magnifyCookieHandler = (type, cookie, preview, obj) => {
  if ($.cookie(cookie.slice(1))) {
    let cookieVal = $.cookie(cookie.slice(1))
    if (type === 'size') {
      obj.size = cookieVal
      $(cookie).val(parseInt(cookieVal)).change();
      $(preview).css("fontSize", obj.size);
    } else {
      const colorPresets = document.querySelectorAll(cookie)
      colorPresets.forEach(items => {
        items.classList.remove('active')
      })
      let cookieIdVal = `#${cookieVal}`
      document.querySelector(cookieIdVal).classList.add('active')
      obj.color = $(cookieIdVal).css("background-color");
      obj.backGroundColor = $(cookieIdVal).css("border-color");
      $(preview).css({ 'color': obj.color, 'background-color': obj.backGroundColor, 'border-color': obj.color });
    }
  }
}

// text magnify settings
textMagColorControls('.text-magnify-color-swatch', '.text-magnifier-preview', textMagObj)
textMagSizeControls('.text-magnify-size-input', '.text-magnifier-preview', textMagObj)

restoreDefaultTextMagSettings = () => {
  restoreDefaultMagnify('text', '.text-magnify-color-swatch', '.text-magnify-size-input', textMagObj, '.text-magnifier-preview')
}

//img description settings
textMagColorControls('.img-magnify-color-swatch', '.img-magnifier-preview', imgMagObj)
textMagSizeControls('.img-magnify-size-input', '.img-magnifier-preview', imgMagObj)

restoreDefaultImageSettings = () => {
  restoreDefaultMagnify('img', '.img-magnify-color-swatch', '.img-magnify-size-input', imgMagObj, '.img-magnifier-preview')
}

setTimeout(() => {
  magnifyCookieHandler('size', '.img-magnify-size-input', '.img-magnifier-preview', imgMagObj)
  magnifyCookieHandler('color', '.img-magnify-color-swatch', '.img-magnifier-preview', imgMagObj)
  magnifyCookieHandler('size', '.text-magnify-size-input', '.text-magnifier-preview', textMagObj)
  magnifyCookieHandler('color', '.text-magnify-color-swatch', '.text-magnifier-preview', textMagObj)
}, 1000)


// reading mask section -------------------------------------->

setTimeout(() => {
  turnOffItemsOnMobile()
}, 200)

let maxPageHeight = document.body.scrollHeight
let resizeId;
window.addEventListener("resize", () => {
  if (hasTouchScreen || window.innerWidth < 650) {
    turnOffItemsOnMobile()
  } else if (window.innerWidth > 650) {
    $(".reading-mask").fadeOut('fast')
    clearTimeout(resizeId);
    resizeId = setTimeout(resetMaskOnWidthChange, 400);
  }
  hideItemsonTouchScreen()
  // getRidOfReadingAssistance()
});

const resetMaskOnWidthChange = () => {
  if (document.body.classList.contains('ReadingMask_ON')) {
    maxPageHeight = document.body.scrollHeight
    $(".reading-mask").fadeIn()
  }
}

const hideItemsonTouchScreen = () => {
  if (window.innerWidth < 992 || hasTouchScreen) {
    $('#text-reading-assistance').addClass('d-none')
  } else {
    $('#text-reading-assistance').removeClass('d-none')
  }
}
hideItemsonTouchScreen()

const turnOffItemsOnMobile = () => {
  if (hasTouchScreen || window.innerWidth < 650) {
    if ($('#ToggleReadingMask').is(':checked')) {
      $('#ToggleReadingMask').prop('checked', false).trigger('change');
    }
    if ($('#ToggleReadingGuide').is(':checked')) {
      $('#ToggleReadingGuide').prop('checked', false).trigger('change');
    }
    document.body.classList.remove('CursorGuide')
    $("#top_mask").fadeOut()
    $("#bottom_mask").fadeOut()
    $.removeCookie('readingMaskWidth');
    $.removeCookie('edit-reading-mask');
    $.removeCookie('CursorGuide');
    if ($.cookie("ReadingMask")) {
      document.body.classList.remove('ReadingMask_ON')
      $.removeCookie('ReadingMask');
    }
  }
}
$.removeCookie('readingMaskWidth');

$(function () {
  $('[id="ToggleReadingMask"]').change(function () {
    if ($(this).is(':checked')) {
      showReadingMask()
    } else {
      hideReadingMask()
    }
    checkIfWidgetActive()
  });
});

const showReadingMask = () => {
  $.cookie("readingMaskWidth", window.innerWidth, { expires: 1 });
  $('#reset-mask-btn').css("display", "flex").hide().fadeIn('slow');
  $("#edit-reading-mask").css("display", "flex").hide().fadeIn()
  $.cookie("edit-reading-mask", true, { expires: 30 });
  $.cookie("ReadingMask", true, { expires: 30 });
  widgetItemObj.isReadingMask = true
  $("body").addClass("ReadingMask_ON");
  addWidgetControls('ToggleReadingMask', 'Reading mask')
  maxPageHeight = document.body.scrollHeight
  $(".reading-mask").fadeIn()
}

const hideReadingMask = () => {
  $("body").removeClass("ReadingMask_ON");
  $("body").removeClass("ReadingMask ");
  $("#edit-reading-mask").fadeOut()
  $.cookie("edit-reading-mask", false, { expires: 30 });
  $.removeCookie('ReadingMask');
  removeWidgetControls(['ToggleReadingMask'])
  widgetItemObj.isReadingMask = false
  $('#reset-mask-btn').css("display", "none")
  $(".reading-mask").fadeOut()
}

const resetMaskOnTranslate = () => {
  if (document.body.classList.contains('ReadingMask_ON')) {
    $('.reading-mask').fadeOut()
    maxPageHeight = document.body.scrollHeight
    setTimeout(() => $('.reading-mask').fadeIn(), 2500)
  }
}

setTimeout(() => {
  if ($.cookie('ReadingMask') === 'true') {
    maxPageHeight = document.body.scrollHeight
    showReadingMask()
  } else {
    $('#reset-mask-btn').css("display", "none")
  }
}, 500)

let opacityCookie = $.cookie("readingMaskOpacity");
if (opacityCookie) {
  $("#reading-mask-opacity").val(opacityCookie);
  $(".reading-mask").css({ "opacity": opacityCookie })
}

document.querySelectorAll('.opacity-icons').forEach(icon => {
  icon.addEventListener('click', () => {
    selectChangeHandler(icon, 'opacity-icons', '#reading-mask-opacity option:selected')
    let newVal = $('#reading-mask-opacity').val();
    $(".reading-mask").css({ "opacity": newVal })
    $.cookie("readingMaskOpacity", newVal, { expires: 30 })
  })
})

const maskOpacityInput = document.getElementById('reading-mask-opacity')
maskOpacityInput.addEventListener('change', () => {
  $(".reading-mask").css({ "opacity": maskOpacityInput.value })
  $.cookie("readingMaskOpacity", maskOpacityInput.value, { expires: 30 })
})

// change mask size*****************>
let defaultMaskVal = 60
let maskValue = defaultMaskVal

let maskSizeCookieVal = $.cookie("readingMaskHeight");
if (maskSizeCookieVal) {

  $("#mask-size-input").val(maskSizeCookieVal);
  maskValue = maskSizeCookieVal
}

const maskSizeInputRange = document.getElementById('mask-size-input')
maskSizeInputRange.addEventListener('change', () => {
  let sizeInputVal = maskSizeInputRange.value
  maskValue = sizeInputVal
  $.cookie("readingMaskHeight", maskValue, { expires: 30 })
})

$(window).scroll(function (e) {
  maxPageHeight = document.body.scrollHeight
});

document.body.addEventListener('mousemove', (e) => {
  maxPageHeight = document.body.scrollHeight
  const bottomOverlayHeight = maxPageHeight - e.pageY
  const topOverlayHeight = maxPageHeight - bottomOverlayHeight - maskValue
  $('#bottom_mask').css({ top: e.pageY, height: bottomOverlayHeight + 'px' });
  $('#top_mask').css({ top: 0 - maskValue, height: topOverlayHeight + 'px' });
})

const changeColorPicker = (color, cssSelector, hexSelector, inputSelector,) => {
  $(inputSelector).val(color).trigger('change')
  $(cssSelector).css({ "background-color": color })
  $(hexSelector).text(color);
}

let maskColorCookieVal = $.cookie("readingMaskColor");
if (maskColorCookieVal) {
  changeColorPicker(maskColorCookieVal, '.reading-mask', '#mask_hexVal', "#mask_color")
}

// change mask color
const maskColorChangeInput = document.getElementById('mask_color')
maskColorChangeInput.addEventListener('change', () => {
  changeColorPicker(maskColorChangeInput.value, '.reading-mask', '#mask_hexVal')
  $.cookie("readingMaskColor", maskColorChangeInput.value, { expires: 30 })
})

const resetMaskSettingsCookies = () => {
  $.removeCookie('readingMaskOpacity');
  $.removeCookie('readingMaskHeight');
  $.removeCookie('readingMaskColor');
}

const restoreDefaultMaskSettings = () => {
  let defaultColor = '#363636'
  if ($.cookie("InvertBackground") === 'yes' || $.cookie("DarkContrastBackground") === 'yes') {
    defaultColor = '#ffffff'
  }
  changeColorPicker(defaultColor, '.reading-mask', '#mask_hexVal', "#mask_color")
  const e = new Event("change");
  const element = document.querySelector("#reading-mask-opacity")
  element.value = '.66';
  element.dispatchEvent(e);
  $("#mask-size-input").val(defaultMaskVal);
  maskValue = defaultMaskVal
  resetMaskSettingsCookies()
}

if ($.cookie("edit-reading-mask") === 'true') {
  $("#edit-reading-mask").css("display", "flex").hide().fadeIn()
}

if ($.cookie('ReadingMask')) {
  $('#reset-mask-btn').css("display", "flex").hide().fadeIn('slow');
}

setTimeout(() => {
  if (document.body.classList.contains('ReadingMask_ON')) {
    $('.reading-mask').fadeIn()
  }
}, 100);

// reading guide section --------------------->
$(document).ready(function () {
  $("input.switch-input[type=checkbox]").each(function () {
    let name = $(this).attr('name');
    if ($.cookie(name) && $.cookie(name) == "true") {
      $(this).prop('checked', $.cookie(name));
      $("body").addClass(name);
      if ($('[id="ToggleReadingGuide"]').is(':checked')) {
        $("body").addClass(name);
      }
    }
  });
  $("input.switch-input[type=checkbox]").change(function () {
    let name = $(this).attr("name");
    $.cookie(name, $(this).prop('checked'), { expires: 30, })
  });
});

if ($.cookie("edit-reading-guide") === 'true') {
  $("#edit-reading-guide").css("display", "flex").hide().fadeIn()
  $('#reset-guide-btn').css("display", "flex").hide().fadeIn('slow');
}

$(function () {
  $('[id="ToggleReadingGuide"]').change(function () {
    if ($(this).is(':checked')) {
      $('#reset-guide-btn').css("display", "flex").hide().fadeIn('slow');
      $("#edit-reading-guide").css("display", "flex").hide().fadeIn()
      $.cookie("edit-reading-guide", true, { expires: 30 });
      $("#tail").hide()
      $("body").addClass("CursorGuide");
      $("#tail").fadeIn(500)
      addWidgetControls('ToggleReadingGuide', 'Reading guide')
      widgetItemObj.isReadingGuide = true
    } else {
      $('#reset-guide-btn').fadeOut()
      $("#edit-reading-guide").fadeOut()
      $.cookie("edit-reading-guide", false, { expires: 30 });
      $("#tail").fadeOut(500)
      setTimeout(() => {
        $("body").removeClass('CursorGuide');
      }, 500);
      removeWidgetControls(['ToggleReadingGuide'])
      widgetItemObj.isReadingGuide = false
    }
    checkIfWidgetActive()
  });
});

// //////////// Reading guide size
// change guide size
let guideYVal = 8

let guideSizeCookieVal = $.cookie("readingGuideHeight");
if (guideSizeCookieVal) {
  guideYVal = guideSizeCookieVal
  $("#guide-size-input").val(guideYVal).change()
  $("#tail").css({ "height": guideYVal });
}

const guideSizeInputRange = document.getElementById('guide-size-input')
guideSizeInputRange.addEventListener('change', () => {
  guideYVal = guideSizeInputRange.value
  $.cookie("readingGuideHeight", guideYVal, { expires: 30 })
  $("#tail").css({ "height": guideYVal });
})

$(document).bind('mousemove', function (e) {
  $('#tail').css({
    left: 0,
    top: e.pageY - (parseInt(guideYVal) + 12)
  });
});

let guideColorCookieVal = $.cookie("readingGuideColor");
if (guideColorCookieVal) {
  changeColorPicker(guideColorCookieVal, '#tail', '#guide_hexVal', "#guide_color")
}

// change guide color
const guideColorChangeInput = document.getElementById('guide_color')
guideColorChangeInput.addEventListener('change', () => {
  changeColorPicker(guideColorChangeInput.value, '#tail', '#guide_hexVal')
  $.cookie("readingGuideColor", guideColorChangeInput.value, { expires: 30 })
})

//reset cookies
const resetGuideSettingsCookies = () => {
  $.removeCookie('readingGuideHeight');
  $.removeCookie('readingGuideColor');
}

// restore default
const restoreDefaultguideSettings = () => {
  let defaultColor = '#363636'
  if ($.cookie("InvertBackground") === 'yes' || $.cookie("DarkContrastBackground") === 'yes') {
    defaultColor = '#ffffff'
  }
  changeColorPicker(defaultColor, '#tail', '#guide_hexVal', "#guide_color")
  guideYVal = 8
  $("#guide-size-input").val(guideYVal)
  $("#tail").css({ "height": guideYVal });
  resetGuideSettingsCookies()
}

// photosensitivity filter section --------------------->
$(function () {
  $('[id="TogglePhotoFilter"]').change(function () {
    if ($(this).is(':checked')) {
      $("html").addClass("PhotoSens");
      addWidgetControls('TogglePhotoFilter', 'Photosensitivity filter')
      widgetItemObj.isPhotoSens = true
      if (!widgetItemObj.isLowSat) {
        $("html").addClass("lowsaturation");
      }
    } else {
      $("html").removeClass("PhotoSens");
      $("body").removeClass("PhotoSens");
      removeWidgetControls(['TogglePhotoFilter'])
      widgetItemObj.isPhotoSens = false
      if (!widgetItemObj.isLowSat) {
        $("html").removeClass("lowsaturation");
      }
    }
    checkIfWidgetActive()
  });
});

if ($.cookie('PhotoSens') == "true") {
  $('#TogglePhotoFilter').prop('checked', true).trigger('change')
  if (!widgetItemObj.isLowSat) {
    $("html").addClass("lowsaturation");
  }
}

// highlight on hover section ------------------------>
$(function () {
  $('[id="ToggleHighlightHover"]').change(function () {
    if ($(this).is(':checked')) {
      $("body").addClass("HighlightHover");
      addWidgetControls('ToggleHighlightHover', 'Highlight on hover')
      widgetItemObj.isHighlighted = true
    } else {
      $("body").removeClass("HighlightHover");
      removeWidgetControls(['ToggleHighlightHover'])
      widgetItemObj.isHighlighted = false
    }
    checkIfWidgetActive()
  });
});
// outline all links section ------------------------>
$(function () {
  $('[id="ToggleHighlightLinks"]').change(function () {
    if ($(this).is(':checked')) {
      $("body").addClass("HighlightLinks");
      addWidgetControls('ToggleHighlightLinks', 'Highlight all links')
      widgetItemObj.isOutlined = true
    } else {
      $("body").removeClass("HighlightLinks");
      removeWidgetControls(['ToggleHighlightLinks'])
      widgetItemObj.isOutlined = false
    }
    checkIfWidgetActive()
  });
});

// key commands section ------------------------------------->
const keyTogglerFunc = (itemId) => {
  if ($(itemId).is(':checked')) {
    $(itemId).prop('checked', false).trigger('change');
  } else {
    $(itemId).prop('checked', true).trigger('change');
  }
}

document.addEventListener('keydown', (event) => {
  let name = event.key;
  if (name === 'Shift') return
  if (event.shiftKey) {
    name === "!" && keyTogglerFunc('#ToggleHighlightHover')
    name === "@" && keyTogglerFunc('#ToggleHighlightLinks')
    name === "#" && keyTogglerFunc('#ToggleTextMagnifier')
    name === "$" && keyTogglerFunc('#ToggleImageDescription')
    name === '%' && keyTogglerFunc('#TogglePhotoFilter')
    name === "^" && keyTogglerFunc('#ToggleReadingMask')
    name === '&' && keyTogglerFunc('#ToggleReadingGuide')
    name === '*' && keyTogglerFunc('#ToggleTTS_click')
    name === 'Q' && resetflourishModal()
    name === 'A' && displayModal()
  } else {
    return;
  }
}, false);

// website color profile section ---------------------------------->
const colorSchemeArr = [
  {
    id: 'DarkContrastBackground',
    class_: 'highcontrast',
    location: 'body',
    maskColor: '#ffffff',
    colorPickerReset: true,
    activeItemText: 'Dark contrast preset',
    activeItemObj: 'isDarkContrast',
  },
  {
    id: 'DesaturateBackground',
    class_: 'desaturated',
    location: 'body',
    maskColor: '#363636',
    colorPickerReset: true,
    activeItemText: 'Desaturate preset',
    activeItemObj: 'isDesaturated',
  },
  {
    id: 'InvertBackground',
    class_: 'inverted',
    location: 'body',
    maskColor: '#ffffff',
    colorPickerReset: true,
    activeItemText: 'Inverted preset',
    activeItemObj: 'isInverted',
  },
  {
    id: 'HighSaturationBackground',
    class_: 'highsaturation',
    location: 'html',
    maskColor: '#363636',
    colorPickerReset: false,
    activeItemText: 'High saturation',
    activeItemObj: 'isHighSat',
  },
  {
    id: 'LowSaturationBackground',
    class_: 'lowsaturation',
    location: 'html',
    maskColor: '#363636',
    colorPickerReset: false,
    activeItemText: 'Low saturation',
    activeItemObj: 'isLowSat',
  },
]

const makeColorPresetsFalse = (presetArr) => {
  for (let i = 0; i < presetArr.length; i++) {
    presetArr[i] = false
  }
}

const disableColorPicker = () => {
  $('#DarkContrastBG_option').removeClass('disable-colors')
  $('#DesaturateBG_option').removeClass('disable-colors')
  $('#InvertBG_option').removeClass('disable-colors')
  $('#ColorAdjust_option').addClass('disable-colors')
}
const enableColorPicker = () => {
  $('#ColorAdjust_option').removeClass('disable-colors')
}

const colorPresetToDefault = () => {
  changeMagAndMaskColor('black')
  $('#ColorAdjust_option').removeClass('disable-colors')
  // restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
  // restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')
  for (let i = 0; i < colorSchemeArr.length; i++) {
    const { id, class_, location, activeItemObj } = colorSchemeArr[i]
    widgetItemObj[activeItemObj] = false
    $.removeCookie(id);
    removeWidgetControls([id])
    $(location).removeClass(class_);
    // $("#DefaultBG_option").addClass('active').siblings().removeClass('active');
    document.querySelector('#defaultBackground').click()
  }
}

const colorPresetHandler = (currItemId) => {
  const currItemTag = `#${currItemId}`
  $(currItemTag).closest('li').addClass('active').siblings().removeClass('active');
  document.querySelector(currItemTag).click()
  if (currItemId === 'defaultBackground') {
    colorPresetToDefault()
  } else {
    if (currItemId === 'DarkContrastBackground' || currItemId === 'InvertBackground') {
      changeMagAndMaskColor('white')
    } else {
      changeMagAndMaskColor('black')
    }
    for (let i = 0; i < colorSchemeArr.length; i++) {
      const { id, class_, location, activeItemText, activeItemObj, maskColor, colorPickerReset } = colorSchemeArr[i]
      if (id === currItemId) {
        if (colorPickerReset) {
          resetColorPicker()
          disableColorPicker()
        } else {
          enableColorPicker()
        }
        widgetItemObj[activeItemObj] = true
        $.cookie(id, 'yes', { expires: 30 });
        addWidgetControls(id, activeItemText)
        $(location).addClass(class_);
      } else {
        widgetItemObj[activeItemObj] = false
        $.removeCookie(id);
        removeWidgetControls([id])
        $(location).removeClass(class_);
      }
      checkIfWidgetActive()
    }
  }

}

for (let i = 0; i < colorSchemeArr.length; i++) {
  if ($.cookie(colorSchemeArr[i].id) == "yes") {
    colorPresetHandler(colorSchemeArr[i].id)
    setTimeout(() => {
      $("#DefaultBG_option").removeClass('active')
    }, 300)

  }
}

const colorPresetOptions = document.querySelectorAll('.backgroundOptions')
colorPresetOptions.forEach(preset => {
  preset.addEventListener('click', () => {
    colorPresetHandler(preset.id)
  })
})

// reset modal ----------------------------->
const resetflourishModal = () => {
  const hasTrueValues = Object.values(widgetItemObj).some(val => val === true)
  if (!hasTrueValues) return;

  const { isHighlighted, isOutlined, isTextMag, isImgMag, isFontBig, isFontChanged, isCursorBig, isLineHeightChanged, isWordSpaceChanged, isLetterSpaceChanged, isDarkContrast, isDesaturated, isInverted, isHighSat, isLowSat, isTextColorChanged, isBackColorChanged, isLinkColorChanged, isPhotoSens, isReadingMask, isReadingGuide, isSpeech, isDyslexicFont, isBaskervilleFont, isTranslated
  } = widgetItemObj;

  const isBodyColorChanged = isTextColorChanged || isBackColorChanged || isLinkColorChanged
  const isPresetColorChanged = isDarkContrast || isDesaturated || isInverted || isHighSat || isLowSat

  if (isTextMag) {
    isTextMag && $('#ToggleTextMagnifier').prop('checked', false).trigger('change')
    restoreDefaultMagnify('text', '.text-magnify-color-swatch', '.text-magnify-size-input', textMagObj, '.text-magnifier-preview')
  }
  if (isImgMag) {
    isImgMag && $('#ToggleImageDescription').prop('checked', false).trigger('change')
    restoreDefaultMagnify('img', '.img-magnify-color-swatch', '.img-magnify-size-input', imgMagObj, '.img-magnifier-preview')
  }
  if (isReadingMask) {
    isReadingMask && $('#ToggleReadingMask').prop('checked', false).trigger('change')
    restoreDefaultMaskSettings()
  }
  if (isReadingGuide) {
    isReadingGuide && $('#ToggleReadingGuide').prop('checked', false).trigger('change')
    restoreDefaultguideSettings()
  }
  isHighlighted && $('#ToggleHighlightHover').prop('checked', false).trigger('change')
  isOutlined && $('#ToggleHighlightLinks').prop('checked', false).trigger('change')
  isPhotoSens && $('#TogglePhotoFilter').prop('checked', false).trigger('change')
  isSpeech && $('#ToggleTTS_click').prop('checked', false).trigger('change')
  isFontBig && restoreDefaultFontSize()
  isFontChanged && restoreDefaultFontType()
  isCursorBig && restoreDefaultCursorSize()
  isLetterSpaceChanged && restoreSpacingDefault('#letter_spacing', ['letter_spacing'])
  isWordSpaceChanged && restoreSpacingDefault('#word_spacing', ['word_spacing'])
  isLineHeightChanged && restoreSpacingDefault('#line_height', ['line_height'])
  isPresetColorChanged && colorPresetToDefault()
  isBodyColorChanged && resetColorPicker()

  isTranslated && dismissGoogleTranslate()

  removeAllCookies()

  //  $(".audio_state").hide()
}

let resetIcon = document.getElementById('reset-flourish')
resetIcon.addEventListener('click', () => {
  resetflourishModal()
})

