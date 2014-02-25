var ae = [];
collection = document.getElementsByTagName("*");
for (var i = 0; collection && collection.length && i < collection.length; i++) {
  ae.push(collection[i]);
}

for (var i = 0; i < ae.length; i++) {
  ae[i].addEventListener('click', getXpath);
}


function getXpath(event) {
	var arr = [];
	var DOMelem = this;
  var partXpath = DOMelem.getAttribute("id");
  if (partXpath != null) {
      arr.push(DOMelem.tag + "//id = " + partXpath);
  } else {
      partXpath = DOMelem.getAttribute("class");
      if (partXpath != null) {
          arr.push(DOMelem.tag + "//class = " + partXpath);
      // } else if (typeof DOMelem.parent != "undefined") {
          // getXpath(DOMelem.parent);
      } else {
          console.log("impossible parse");
      }
  }

  console.log(arr);
}

function setXpath(arr){
  var xpath = arr.join();
  console.log(xpath);
  $("#xpath-field").val(xpath);
}
