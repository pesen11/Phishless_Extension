//Get URL

//const { model } = require("@tensorflow/tfjs");
const url = "https://00.ge/forum/profile/casinobitcoin32018581/";
//Get tokenizer object

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

//Convert url to array

const urlArr = [...url.toLowerCase()];

//map arr to objects

const mapper = function (urlarray) {
  var a = [];
  urlarray.map(function (word) {
    a.push(myTokens[word]);
  });
  return a;
};

//check the mapper function
/*
console.log(urlArr);
const our = mapper(urlArr);
console.log(our);
*/

// Get tokenize o/p for the given url

const tokenizedURL = mapper(urlArr);
//console.log(tokenizedURL);

function padEnd(array, minLength, fillValue = undefined) {
  if (array.length >= 300) {
    return array.slice(0, 300);
  } else {
    return Object.assign(new Array(minLength).fill(fillValue), array);
  }
}

const testURL = padEnd(tokenizedURL, 300, 0);
console.log(testURL);

//get the keras model

import * as tf from "@tensorflow/tfjs";

async function loadModel() {
  var m = await tf.loadLayersModel(
    "https://github.com/pesen11/Phishless_Extension/blob/main/CNN-LSTM/phishv2/model.json"
  );
  console.log("model loaded");
  return m;
}
var model = loadModel();

model.then(function (res) {
  const example = tf.tensor([testURL]);
  const prediction = res.predict(example);
  const outputData = prediction.dataSync();
  console.log(outputData[0]);
});
