//upon list add, begin tracking

document.addEventListener("DOMContentLoaded", function(){
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
