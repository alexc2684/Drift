//get list of websites from the options pages
//on DOM loaded: if website in list
//add count

document.addEventListener("DOMContentLoaded", function(){

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    url = tab.url;
    //parse url for matching
    var parser = document.createElement('a');
    parser.href = url;
    url = parser.hostname;
    chrome.runtime.sendMessage({msg: "currLink", data: url}, function(response) {
      console.log(response);
    });
  });

});
