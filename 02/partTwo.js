// const { fileToArr } = require("../utils");
// const FILE = "./input.txt";

// const candidates = fileToArr(FILE);

// candidates.forEach((string, i) => {
//   candidates.forEach((compString, j) => {
//     if (numberOfDifferences(string, compString) === 1) {
//       console.log(dropDifferences(string, compString));
//     }
//   });
// });

function dropDifferences(strA, strB) {
  let newStr = strA.split("").reduce((acc, letter, i) => {
    if (letter === strB[i]) {
      acc += letter;
    }
    return acc;
  }, "");
  return newStr;
}

function numberOfDifferences(strA, strB) {
  if (strA.length !== strB.length) {
    throw Error("String lengths must be equal");
  }
  let count = 0;
  const bLetters = strB.split("");
  strA.split("").forEach((letter, i) => {
    if (letter !== bLetters[i]) {
      count += 1;
    }
  });
  return count;
}

module.exports = { numberOfDifferences };
