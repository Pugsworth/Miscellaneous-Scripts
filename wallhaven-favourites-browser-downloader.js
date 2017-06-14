function fetchImgURL(id) {
  return new Promise(function(resolve, reject) {
    let urlBase = "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-";
    
    let xhr = new XMLHttpRequest();
    
    xhr.open("HEAD", urlBase + id + ".jpg", true);
    xhr.onreadystatechange = function() {
      if (this.readyState == XMLHttpRequest.DONE) {
        if (this.status == 200)
          resolve(urlBase + id + ".jpg");
        else
          resolve(urlBase + id + ".png");
      }
    }
    xhr.send();
  });
}

var promises = [];

var images = document.getElementsByClassName("preview");

for (var i = 0; i < images.length; i++) {
  var match = images[i].href.match(/[^\/]+\/(\d+)/);
  
  if (!match)
    continue;
  
  var id = match[1];
  
  promises.push(fetchImgURL(id));
}

var builder = ["<html><body>"];

Promise.all(promises).then(function(values) {
  
  for (var i = 0; i < values.length; i++) {
   builder.push('<img style="width:128px;height:auto;" src="' + values[i] + '"/>');
  }

  builder.push("</body></html>");
}).then(function() {
  if (builder.length <= 2)
    return;
  
  var address = "data:text/html;charset=utf-8," + encodeURIComponent(builder.join(""));
  location.href = address;
});