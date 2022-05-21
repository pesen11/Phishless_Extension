/*
$('a').click(function(){
    alert("You are about to go to "+$(this).attr('href'));
});
*/
// import * as tf from "js/tf.min.js";

var result = {};
//---------------------- 1.  IP Address  ----------------------

var url = window.location.href;
// alert(url);
var urlDomain = window.location.hostname;
var onlyDomain = urlDomain.replace("www.", "");
// var patt = /(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]?[0-9])(\.|$){4}/;
// var patt2 = /(0x([0-9][0-9]|[A-F][A-F]|[A-F][0-9]|[0-9][A-F]))(\.|$){4}/;
var ip = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
if (ip.test(urlDomain)) {
  result["IP Address"] = "1";
} else {
  result["IP Address"] = "0";
}

//alert(result);

//---------------------- 2.  @ Symbol  ----------------------

var patt = /@/;
if (patt.test(url)) {
  result["@ Symbol"] = "1";
} else {
  result["@ Symbol"] = "0";
}

//---------------------- 3.  URL Length  ----------------------

//alert(url.length);
if (url.length < 400) {
  result["URL Length"] = "0";
} else {
  result["URL Length"] = "1";
}
//alert(result);

//---------------------- 4.  Redirecting using //  ----------------------

if (url.lastIndexOf("//") > 7) {
  result["Redirecting using //"] = "1";
} else {
  result["Redirecting using //"] = "0";
}

//---------------------- 5.  HTTPS in URL's domain part  ----------------------

patt = /https/;
if (patt.test(onlyDomain)) {
  result["HTTPS in URL's domain part"] = "1";
} else {
  result["HTTPS in URL's domain part"] = "0";
}

//---------------------- 6.  Tiny URL  ----------------------

var onlyDomain = urlDomain.replace("www.", "");

if (onlyDomain.length < 7) {
  result["Tiny URL"] = "1";
} else {
  result["Tiny URL"] = "0";
}
//alert(result);

//---------------------- 7. (-) Prefix/Suffix in domain  ----------------------

patt = /-/;
if (patt.test(urlDomain)) {
  result["(-) Prefix/Suffix in domain"] = "1";
} else {
  result["(-) Prefix/Suffix in domain"] = "0";
}

//---------------------- 8. Favicon  ----------------------

var favicon = undefined;
var nodeList = document.getElementsByTagName("link");
for (var i = 0; i < nodeList.length; i++) {
  if (
    nodeList[i].getAttribute("rel") == "icon" ||
    nodeList[i].getAttribute("rel") == "shortcut icon"
  ) {
    favicon = nodeList[i].getAttribute("href");
  }
}
if (!favicon) {
  result["Favicon"] = "0";
} else if (favicon.length == 12) {
  result["Favicon"] = "0";
} else {
  patt = RegExp(urlDomain, "g");
  if (patt.test(favicon)) {
    result["Favicon"] = "0";
  } else {
    result["Favicon"] = "1";
  }
}

//---------------------- 9.  Request URL  ----------------------

var imgTags = document.getElementsByTagName("img");

var phishCount = 0;
var legitCount = 0;

patt = RegExp(onlyDomain, "g");

for (var i = 0; i < imgTags.length; i++) {
  var src = imgTags[i].getAttribute("src");
  if (!src) continue;
  if (patt.test(src)) {
    legitCount++;
  } else if (src.charAt(0) == "/" && src.charAt(1) != "/") {
    legitCount++;
  } else {
    phishCount++;
  }
}
var totalCount = phishCount + legitCount;
var outRequest = (phishCount / totalCount) * 100;
//alert(outRequest);

if (outRequest < 50) {
  result["Request URL"] = "0";
} else {
  result["Request URL"] = "1";
}

// --------------------- 10.  URL of Anchor  ----------------------
var aTags = document.getElementsByTagName("a");

phishCount = 0;
legitCount = 0;
var allhrefs = "";

for (var i = 0; i < aTags.length; i++) {
  var hrefs = aTags[i].getAttribute("href");
  if (!hrefs) continue;
  allhrefs += hrefs + "       ";
  if (patt.test(hrefs)) {
    legitCount++;
  } else if (
    hrefs.charAt(0) == "#" ||
    (hrefs.charAt(0) == "/" && hrefs.charAt(1) != "/")
  ) {
    legitCount++;
  } else {
    phishCount++;
  }
}
totalCount = phishCount + legitCount;
outRequest = (phishCount / totalCount) * 100;

if (outRequest < 50) {
  result["Anchor"] = "0";
} else {
  result["Anchor"] = "1";
}

//---------------------- 11. Links in script and link  ----------------------

var mTags = document.getElementsByTagName("meta");
var sTags = document.getElementsByTagName("script");
var lTags = document.getElementsByTagName("link");

phishCount = 0;
legitCount = 0;

allhrefs = "sTags  ";

for (var i = 0; i < sTags.length; i++) {
  var sTag = sTags[i].getAttribute("src");
  if (sTag != null) {
    allhrefs += sTag + "      ";
    if (patt.test(sTag)) {
      legitCount++;
    } else if (sTag.charAt(0) == "/" && sTag.charAt(1) != "/") {
      legitCount++;
    } else {
      phishCount++;
    }
  }
}

allhrefs += "      lTags   ";
for (var i = 0; i < lTags.length; i++) {
  var lTag = lTags[i].getAttribute("href");
  if (!lTag) continue;
  allhrefs += lTag + "       ";
  if (patt.test(lTag)) {
    legitCount++;
  } else if (lTag.charAt(0) == "/" && lTag.charAt(1) != "/") {
    legitCount++;
  } else {
    phishCount++;
  }
}

totalCount = phishCount + legitCount;
outRequest = (phishCount / totalCount) * 100;

//need to sort out
if (outRequest < 17) {
  result["Script & Link"] = "0";
} else {
  result["Script & Link"] = "1";
}

//alert(allhrefs);

//---------------------- 12.Server Form Handler ----------------------

var forms = document.getElementsByTagName("form");
var res = "0";

for (var i = 0; i < forms.length; i++) {
  var action = forms[i].getAttribute("action");
  if (!action || action == "") {
    res = "1";
    break;
  } else if (!(action.charAt(0) == "/" || patt.test(action))) {
    res = "0";
  }
}
result["SFH"] = res;

//---------------------- 13.Submitting to mail ----------------------

var forms = document.getElementsByTagName("form");
var res = "0";

for (var i = 0; i < forms.length; i++) {
  var action = forms[i].getAttribute("action");
  if (!action) continue;
  if (action.startsWith("mailto")) {
    res = "1";
    break;
  }
}
result["mailto"] = res;

//---------------------- 14.Using iFrame ----------------------

var iframes = document.getElementsByTagName("iframe");

if (iframes.length == 0) {
  result["iFrames"] = "0";
} else {
  result["iFrames"] = "1";
}

/*
//---------------------- 7.  No. of Sub Domains  ----------------------

//patt=".";

// if((onlyDomain.match(RegExp('\\.','g'))||[]).length==1){ 
//     result["No. of Sub Domains"]="-1";
// }else if((onlyDomain.match(RegExp('\\.','g'))||[]).length==2){ 
//     result["No. of Sub Domains"]="0";    
// }else{
//     result["No. of Sub Domains"]="1";
// }

/**************************15.Deep_Learning**************************** */

const myTokens = {
  t: 1,
  "/": 2,
  e: 3,
  o: 4,
  a: 5,
  p: 6,
  s: 7,
  c: 8,
  i: 9,
  ".": 10,
  r: 11,
  n: 12,
  m: 13,
  h: 14,
  w: 15,
  l: 16,
  d: 17,
  u: 18,
  b: 19,
  ":": 20,
  "-": 21,
  f: 22,
  g: 23,
  2: 24,
  0: 25,
  1: 26,
  y: 27,
  k: 28,
  3: 29,
  4: 30,
  7: 31,
  5: 32,
  v: 33,
  6: 34,
  8: 35,
  9: 36,
  x: 37,
  _: 38,
  "=": 39,
  j: 40,
  z: 41,
  q: 42,
  "&": 43,
  "?": 44,
  "%": 45,
  ";": 46,
  "@": 47,
  "+": 48,
  "~": 49,
  "#": 50,
  ",": 51,
  "(": 52,
  ")": 53,
  ã: 54,
  â: 55,
  "\x82": 56,
  "\x83": 57,
  "!": 58,
  $: 59,
  "`": 60,
  "[": 61,
  "]": 62,
  "{": 63,
  "}": 64,
  "*": 65,
  "'": 66,
  "<": 67,
  "\xa0": 68,
  "^": 69,
  µ: 70,
  拠: 71,
  傅: 72,
  "\x91": 73,
  " ": 74,
};
const urlArr = [...url.toLowerCase()];
const mapper = function (urlarray) {
  var a = [];
  urlarray.map(function (word) {
    a.push(myTokens[word]);
  });
  return a;
};
const tokenizedURL = mapper(urlArr);
function padEnd(array, minLength, fillValue = undefined) {
  if (array.length >= 300) {
    return array.slice(0, 300);
  } else {
    return Object.assign(new Array(minLength).fill(fillValue), array);
  }
}
const testURL = padEnd(tokenizedURL, 300, 0);

//import * as tf from "@tensorflow/tfjs";

// async function loadModel() {
//   var m = await tf.loadLayersModel(
//     "https://raw.githubusercontent.com/pesen11/Major/main/phishv2/model.json"
//   );
//   console.log("model loaded");
//   return m;
// }
// var model = loadModel();

// model.then(function (res) {
//   const example = tf.tensor([testURL]);
//   const prediction = res.predict(example);
//   const outputData = prediction.dataSync();
//   console.log(outputData[0]);
// });

//---------------------- Sending the result  ----------------------

chrome.runtime.sendMessage(result, function (response) {
  console.log(result);
  //console.log(response);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "alert_user")
    alert("Warning!!! You might be getting phished.");
});
