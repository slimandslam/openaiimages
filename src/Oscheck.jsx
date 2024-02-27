
function isLinux() {
  return navigator.appVersion.includes('Linux');
}

function isWindows() {
  return navigator.appVersion.includes('Win');
}

function isMacOS() {
  return navigator.appVersion.includes('Mac');
}

function isIOS() {
  return /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function isAndroid() {
  return /Android/.test(navigator.userAgent);
}


export { isLinux, isWindows, isMacOS, isIOS, isAndroid };
