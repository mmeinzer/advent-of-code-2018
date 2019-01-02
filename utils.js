const fs = require("fs");
const path = require("path");

function fileToArr(pathToFile, seperator = "\n") {
  const fullPath = path.format({
    dir: path.dirname(process.mainModule.filename),
    base: pathToFile
  });
  const file = fs.readFileSync(fullPath, "utf8", e => {
    console.log(e);
  });
  return file.trim().split(seperator);
}

function count(arr, whereFunc) {
  return arr.reduce((acc, val, i, array) => {
    if (whereFunc(val, i, array)) {
      acc += 1;
    }
    return acc;
  }, 0);
}

module.exports = { fileToArr, count };
