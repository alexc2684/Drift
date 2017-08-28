var watchList = {}
chrome.tabs.query({
  active: true,
  currentWindow: true
}, function(tabs) {
  var tab = tabs[0];
  var url = tab.url;
  console.log(url);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.storage.sync.get({
    watchList: []
  }, function(items) {
    console.log(items.watchList);
    watchList = items.watchList;
    var url = tab.url;
    console.log(url);
    console.log(url in watchList);
    if (url in watchList) {
      watchList[url] += 1;
    }
    console.log(watchList);
    save_options();
  });


});

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    restore_options();
    if (request.msg == "toTrack") {
      var urls = request.urls;
      //initialize new urls
      console.log(urls);
      var urlList = [];
      for (var i = 0; i < Object.keys(urls).length; i++) {
        urlList.push(urls[i]);
        if (!(urls[i] in watchList)) {
          watchList[urls[i]] = 0;
        }
      }
      //check if any items have been removed
      for (item in watchList) {
        if (!(urlList.includes(item))) {
          delete watchList[item];
        }
      }
      save_options(watchList);

    }

});

function save_options(watchList) {
  chrome.storage.sync.set({
    watchList: watchList
  }, function() {
    console.log("Saved");
  });
}

function restore_options() {
  chrome.storage.sync.get({
    watchList: []
  }, function(items) {
    console.log(items.watchList);
    watchList = items.watchList;

  });
}
