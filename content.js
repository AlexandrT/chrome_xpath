var port = chrome.runtime.connect({name: "sendXpath"});
port.onMessage.addListener(function(msg){
  console.log("new message!");
  console.log(msg);
})

function foo(){
  $("*").on('click', getXpath);
}

function getXpath(event, element) {
  var attrForXpath = [];

  function temp(event, element) {
    var DOMelem = element;

    var partXpath = DOMelem.attr("id");

    if (partXpath != null) {
      attrForXpath.push("/" + DOMelem.prop("tagName") + "[@id='" + partXpath + "']");
    } else {
      partXpath = DOMelem.attr("class");
      if (partXpath != null) {
        attrForXpath.push("/" + DOMelem.prop("tagName") + "[@class='" + partXpath + "']");
      } else if (DOMelem.parent().is(document)) {
        console.log("already html");
      } else {
        attrForXpath.push("/" + DOMelem.prop("tagName") + "[" + (DOMelem.index() + 1) + "]"); //index() возвращает номер среди всех соседей или учитывает только с таким же tagName?
        temp(event, DOMelem.parent());
      }
    }
  }

  var element = $(this);
  temp(event, element);

  $("*").off('click', getXpath);
  var fullXpath = attrForXpath.reverse().join();
  fullXpath = fullXpath.replace(/,/g, "");
  console.log(fullXpath);
  console.log(Date.now());
  port.postMessage(fullXpath);
}