//get list of websites from the options pages
//on DOM loaded: if website in list
//add count

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var tab = tabs[0];
  url = tab.url;
  //parse url for matching
  first = url.indexOf(".") + 1;
  temp = url.slice(first, url.length);
  sec = temp.indexOf(".");
  url = url.slice(first, sec);
  chrome.runtime.sendMessage({data: url}, function(response) {
    console.log(response);
  });
});
