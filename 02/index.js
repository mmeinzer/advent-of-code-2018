function main() {
  const { fileToArr } = require("../utils");
  const FILE = "./input.txt";

  const candidates = fileToArr(FILE);

  const totals = candidates
    .map(string => getLetterCounts(string))
    .map(countObj => objectHasValues(countObj, [2, 3]))
    .reduce(
      (acc, hasValsObj) => {
        if (hasValsObj["2"]) {
          acc[2] += 1;
        }
        if (hasValsObj["3"]) {
          acc[3] += 1;
        }
        return acc;
      },
      { "2": 0, "3": 0 }
    );

  const answer = Object.values(totals).reduce(
    (product, val) => product * val,
    1
  );

  console.log(answer);
}

// Comment out to run tests
// main();

function getLetterCounts(string) {
  const counts = {};
  string
    .trim()
    .split("")
    .forEach(letter => {
      if (counts[letter]) {
        counts[letter] += 1;
      } else {
        counts[letter] = 1;
      }
    });
  return counts;
}

function objectHasValues(obj, valsToFind) {
  const values = Object.values(obj);
  const valMap = {};
  valsToFind.forEach(val => {
    valMap[val] = values.includes(val);
  });
  return valMap;
}

module.exports = { getLetterCounts, objectHasValues };
