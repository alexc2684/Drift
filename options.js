//upon list add, begin tracking

var storedid;
restore_options();

function removeName(itemid){
    var item = document.getElementById(itemid);
    list.removeChild(item);
}

document.addEventListener("DOMContentLoaded", function(){
  var listid;
  if (storedid) {
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
      console.log(li.innerHTML);
      document.getElementById("urlList").appendChild(li);
    }
  });

  document.addEventListener('click', function(e) {
    if (e.target.className == 'remove') {
      itemid = "url" + e.target.id;
      var item = document.getElementById(itemid);
      document.getElementById("urlList").removeChild(item);
      storedid--;
      listid--;
    }
  })

});

function save_options() {
  var ul = document.getElementById("urlList");
  console.log("ul");
  console.log(ul);
  console.log(ul.getElementsByTagName("li"));
  var items = document.querySelectorAll("ul.list-group li");
  console.log(items);
  var links = {}
  //TODO: make links an object
  //TODO: store name: and id:, reconstruct the HTML on restore
  for (var i = 0; i < items.length; i++) {
    elem = items[i].innerHTML;
    index = elem.indexOf("<");
    url = elem.substring(0, index);
    links[i] = url;
  }
  var status = document.getElementById('status');
  status.textContent = 'Options saved.';

  chrome.extension.sendMessage({msg: "toTrack", urls: links}, function(response) {
    // console.log(response);
  });
  console.log(links);
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
    console.log(items.urls);
    console.log(items.lastid);
    console.log(Object.keys(items.urls).length);
    for (var i = 0; i < Object.keys(items.urls).length; i++) {
      console.log(items.urls[i]);
      url = items.urls[i];
      // li.innerHTML = items.urls[i];
      var li = document.createElement("li");
      // li.className += "list-group-item";
      li.innerHTML = url;
      li.setAttribute("id", "url" + i);
      var removeButton = document.createElement('button');
      removeButton.appendChild(document.createTextNode("remove"));
      removeButton.setAttribute("id", i);
      removeButton.className = "remove";
      li.appendChild(removeButton);
      console.log(li);
      document.getElementById("urlList").appendChild(li);
    }
  });
}
