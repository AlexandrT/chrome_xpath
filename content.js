var port = chrome.runtime.connect({name: "sendXpath"});
port.onMessage.addListener(function(msg){
  console.log(msg);
})

function foo(){
  $("*").on('click', getXpath);
}

function removeEvent() {
  $("*").off('click', getXpath);
}

function buildXpath(arrayOfParts) {
  return arrayOfParts.reverse().join().replace(/,/g, "");
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

  removeEvent();
  var fullXpath = buildXpath(attrForXpath);
  console.log(fullXpath);
  port.postMessage(fullXpath);
}
