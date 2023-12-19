// determine if its desktop or touchscreen
var hasTouchScreen = false;
if ("maxTouchPoints" in navigator) {
  hasTouchScreen = navigator.maxTouchPoints > 0;
} else if ("msMaxTouchPoints" in navigator) {
  hasTouchScreen = navigator.msMaxTouchPoints > 0;
} else {
  var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
  if (mQ && mQ.media === "(pointer:coarse)") {
    hasTouchScreen = !!mQ.matches;
  } else if ('orientation' in window) {
    hasTouchScreen = true; // deprecated, but good fallback
  } else {
    // Only as a last resort, fall back to user agent sniffing
    var UA = navigator.userAgent;
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

const makeMagAndMaskWhite = () => {
  document.querySelector('#text-mag-color-4').click()
  document.querySelector('#img-mag-color-4').click()
  triggerEventFunc('#mask_color', '#FFFFFF')
  triggerEventFunc('#guide_color', '#FFFFFF')
  triggerEventFunc('#reading-mask-opacity', '.7')

}
const makeMagAndMaskBlack = () => {
  document.querySelector('#text-mag-color-1').click()
  document.querySelector('#img-mag-color-1').click()
  triggerEventFunc('#mask_color', '#000000')
  triggerEventFunc('#guide_color', '#000000')
  triggerEventFunc('#reading-mask-opacity', '.6')
}

