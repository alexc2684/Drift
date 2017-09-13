var storedid;
restore_options();

function removeName(itemid){
    var item = document.getElementById(itemid);
    list.removeChild(item);
}

function validateUrl(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
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
    if (validateUrl(url)) { //TODO: Better url checking
      input.value = "";
      var tr = document.createElement("tr");
      tr.setAttribute("id", "url" + listid);
      tr.setAttribute("class", "body");
      var td1 = document.createElement("td");
      td1.innerHTML = url;
      var td2 = document.createElement("td");
      var removeButton = document.createElement('button');
      removeButton.appendChild(document.createTextNode("remove"));
      removeButton.setAttribute("id", listid);
      removeButton.className = "remove";
      td2.appendChild(removeButton);
      tr.appendChild(td1);
      tr.appendChild(td2);
      listid += 1;
      storedid = listid;
      document.getElementById("urlList").appendChild(tr);
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
  var items = document.querySelectorAll(".body");
  var links = {}
  for (var i = 0; i < items.length; i++) {
    elem = items[i].innerHTML;
    i1 = elem.indexOf(">") + 1;
    temp = elem.substring(i1, elem.length);
    console.log(temp);
    i2 = temp.indexOf("<");
    url = temp.substring(0, i2);
    links[i] = url;
  }
  console.log(links);

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
    for (var i = 0; i < Object.keys(items.urls).length; i++) {
      url = items.urls[i];
      var tr = document.createElement("tr");
      tr.setAttribute("id", "url" + i);
      tr.setAttribute("class", "body");
      var td1 = document.createElement("td");
      td1.innerHTML = url;
      var td2 = document.createElement("td");
      var removeButton = document.createElement('button');
      removeButton.appendChild(document.createTextNode("remove"));
      removeButton.setAttribute("id", i);
      removeButton.className = "remove";
      td2.appendChild(removeButton);
      tr.appendChild(td1);
      tr.appendChild(td2);
      document.getElementById("urlList").appendChild(tr);
    }
    var tbl = document.getElementById("sites");
    tbl.className += " table-hover";
    var thead = document.getElementById("head");
    thead.className += " blue-grey lighten-4";
  });
}
