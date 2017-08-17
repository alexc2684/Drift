//upon list add, begin tracking

function removeName(itemid){
    var item = document.getElementById(itemid);
    list.removeChild(item);
}

document.addEventListener("DOMContentLoaded", function(){
  var listid;
  restore_options();
  if (!listid) {
    listid = 0;
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
      console.log(removeButton.className);
      //addevent listener
      //set id to the id of the button - then do 'item'+id to getrid
      li.appendChild(removeButton);
      listid += 1;
      document.getElementById("urlList").appendChild(li);
    }
  });

  document.addEventListener('click', function(e) {
    if (e.target.className == 'remove') {
      itemid = "url" + e.target.id;
      var item = document.getElementById(itemid);
      console.log(itemid);
      document.getElementById("urlList").removeChild(item);
    }
  })

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
    urls: links,
    lastid: listid
  }, function() {
    var status = document.getElementById("status");
    status.textContent = "Options Saved";
    setTimeout(function() {
      status.textContent = "";}, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    urls: []
  }, function(items) {
    // listid = lastid;
    for (var i = 0; i < items.urls.length; i++) {
      var li = document.createElement("LI");
      li.innerHTML = items.urls[i];
      document.getElementById("urlList").appendChild(li);
      console.log(items.urls[i]);
    }
  });
}
