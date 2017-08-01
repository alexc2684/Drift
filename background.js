var watchList = {}

chrome.extension.onMessage.addListener(
  //add items from options to watchList
  function(request, sender, sendResponse) {
    var urls = request.urls;
    for (var i = 0; i < urls.length; i++) {
      if (!(urls[i] in watchList)) {
        watchList[urls[i]] = 0;
      }
    }
    //check if any items have been removed
    for (item in watchList) {
      console.log(!(urls.includes(item)));
      if (!(urls.includes(item))) {
        delete watchList[item];
      }
    }
    console.log(watchList);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var url = request.data;
  if (url in watchList) {
    watchList[url] += 1;
  }
  chrome.runtime.sendMessage({msg: "bg", data: url});

  sendResponse();
});
