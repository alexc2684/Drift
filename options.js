//upon list add, begin tracking

document.addEventListener("DOMContentLoaded", function(){
  restore_options();
  document.getElementById('save').addEventListener('click', save_options);
  addInput = document.getElementById("addSite");
  addInput.addEventListener("click", function() {
    var input = document.getElementById("url");
    var url = input.value;
    if (url.indexOf("www.") != -1) {
      var li = document.createElement("LI");
      li.innerHTML = url;
      input.value = "";
      document.getElementById("urlList").appendChild(li);
    }
  });
});

function save_options() {
  var ul = document.getElementById("urlList");
  var items = ul.getElementsByTagName("li");
  var links = []
  for (var i = 0; i < items.length; i++) {
    links.push(items[i].innerHTML);
  }
  var status = document.getElementById('status');
  status.textContent = 'Options saved.';

  chrome.extension.sendMessage({msg: "toTrack", urls: links}, function(response) {
    console.log(response);
  });

  chrome.storage.sync.set({
    urls: links
  }, function() {
    var status = document.getElementById("status");
    status.textContent = "Options Saved";
    console.log(links);
    setTimeout(function() {
      status.textContent = "";}, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    urls: []
  }, function(items) {
    for (var i = 0; i < items.urls.length; i++) {
      var li = document.createElement("LI");
      li.innerHTML = items.urls[i];
      document.getElementById("urlList").appendChild(li);
      console.log(items.urls[i]);
    }
  });
}
