var isActivated = false;

function updateIcon() {
  var suffix = "off";
  if (isActivated) {
    suffix = "on";
  } 
  chrome.browserAction.setIcon({path:"images/icon38-" + suffix + ".png"});
}

function reloadActiveTab(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
}

function toggleActivate() {
  isActivated = !isActivated;
  updateIcon();
  reloadActiveTab();
}
chrome.browserAction.onClicked.addListener(toggleActivate);
updateIcon();

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
  sendResponse({isActivated: isActivated});
});


