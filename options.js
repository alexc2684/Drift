//upon list add, begin tracking

var storedid;

function removeName(itemid){
    var item = document.getElementById(itemid);
    list.removeChild(item);
}

document.addEventListener("DOMContentLoaded", function(){
  var listid;
  restore_options();
  if (!listid) {
    listid = storedid;
  } else {
    listid = 0;
    storedid = listid;
  }
  document.getElementById('save').addEventListener('click', save_options);

  addInput = document.getElementById("addSite");
  addInput.addEventListener("click", function() {
    var input = document.getElementById("url");
    var url = input.value;
    if (url.indexOf("www.") != -1) { //TODO: Better url checking
      var li = document.createElement("li");
      // li.className += "list-group-item";
      li.innerHTML = url;
      input.value = "";
      li.setAttribute("id", "url" + listid);
      var removeButton = document.createElement('button');
      removeButton.appendChild(document.createTextNode("remove"));
      removeButton.setAttribute("id", listid);
      removeButton.className = "remove";
      li.appendChild(removeButton);
      listid += 1;
      storedid = listid;
      document.getElementById("urlList").appendChild(li);
    }
  });

  document.addEventListener('click', function(e) {
    if (e.target.className == 'remove') {
      itemid = "url" + e.target.id;
      var item = document.getElementById(itemid);
      document.getElementById("urlList").removeChild(item);
    }
  })

});

function save_options() {
  var ul = document.getElementById("urlList");
  var items = ul.getElementsByTagName("li");
  var links = []
  //make links a dictionary
  //store the ids for list elements also
  for (var i = 0; i < items.length; i++) {
    links.push(items[i].innerHTML);
  }
  var status = document.getElementById('status');
  status.textContent = 'Options saved.';

  chrome.extension.sendMessage({msg: "toTrack", urls: links}, function(response) {
    console.log(response);
  });

  chrome.storage.sync.set({
    urls: links,
    lastid: storedid
  }, function() {
    var status = document.getElementById("status");
    status.textContent = "Options Saved";
    setTimeout(function() {
      status.textContent = "";}, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    urls: [],
    lastid: 0
  }, function(items) {
    storedid = items.lastid;
    for (var i = 0; i < items.urls.length; i++) {
      var li = document.createElement("li");
      li.innerHTML = items.urls[i];
      document.getElementById("urlList").appendChild(li);
      console.log(items.urls[i]);
    }
  });
}
