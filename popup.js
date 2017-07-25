var counts = {}

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

document.addEventListener("DOMContentLoaded", function(){
  console.log("Loaded content");
  var url;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    url = tab.url;
    console.log(url);
  });

  var t = document.getElementById("track");
  t.addEventListener("change", function() {
    if (t.value == "yes") {
      if (url != "") {
        console.log(counts[url])
        if (counts[url] == undefined) {
          counts[url] = 0;
        }
        counts[url]++;
      }
      document.getElementById("count").innerHTML = "Visit count: " + counts[url];
    }
  });
});
