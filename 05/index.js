const { fileToArr } = require("../utils");
const FILE = "./input.txt";

let polymer = fileToArr(FILE, "");

function react(polymer, letter) {
  let iterations = 0;
  let lastLength = polymer.length + 1;
  let pairIndex = null;
  let newPolymer = [];
  while (lastLength > polymer.length) {
    iterations += 1;
    lastLength = polymer.length;
    newPolymer = polymer.filter((item, i, arr) => {
      if (letter && letter === item.toLowerCase()) {
        return false;
      }
      if (i === arr.length - 1) {
        return true;
      }
      if (i === pairIndex) {
        pairIndex = null;
        return false;
      }
      if (
        item.toLowerCase() === arr[i + 1].toLowerCase() &&
        item !== arr[i + 1]
      ) {
        pairIndex = i + 1;
        return false;
      }
      return true;
    });
    polymer = newPolymer;
  }
  polymer.iterations = iterations;
  return polymer;
}

console.log(react(polymer).length);

const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];
const test = letters.map(letter => {
  const { length, iterations } = react(polymer, letter);
  return { letter, length, iterations };
});
console.log(test);
