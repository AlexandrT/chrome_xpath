var port = chrome.runtime.connect({name: "sendXpath"});
port.onMessage.addListener(function(msg){
  console.log("new message!");
  console.log(msg);
})

function foo(){
  $("*").on('click', getXpath);
}

function getXpath(event) {
  var attrForXpath = [];
  var DOMelem = $(this);
  // var $DOMelem = target;
  var partXpath = DOMelem.attr("id"); //если такого атрибута нет - исключение падает
  if (partXpath != null) {
    attrForXpath.push("//" + DOMelem.prop("tagName") + "[@id='" + partXpath + "']");
  } else {
    partXpath = DOMelem.attr("class");
    if (partXpath != null) {
      attrForXpath.push("//" + DOMelem.prop("tagName") + "[@class='" + partXpath + "']");
    // } else if (typeof DOMelem.parent != "undefined") {
      // attrForXpath.push("//" + DOMelem.prop("tagName")); //учесть, что может быть несколько соседей с такими же тегами
      // getXpath(DOMelem.parent());
    } else {
      console.log("impossible parse");
    }
  }
  $("*").off('click', getXpath);
  fullXpath = attrForXpath.reverse().join();
  console.log(fullXpath);
  console.log(Date.now());
  port.postMessage(fullXpath);
}