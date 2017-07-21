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
  console.log("Loaded");
  var t = document.getElementById("track");
  t.addEventListener("change", function() {
    console.log("Changed");
    console.log(t.value);
    if (t.value == "yes") {
      //start tracking
      document.getElementById("count").innerHTML = "Visit Count: 1";
    }
  });

});
