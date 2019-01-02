const { fileToArr, count } = require("../utils");
const FILE = "./input.txt";

const patterns = fileToArr(FILE);

const parsed = patterns.map(str => {
  const mainSplit = str.split(" ");
  const startCoords = mainSplit[2];
  const xStart = parseInt(startCoords.split(",")[0], 10);
  const yStart = parseInt(startCoords.split(",")[1].split(":"), 10);
  const [width, height] = mainSplit[3]
    .split("x")
    .map(string => parseInt(string, 10));
  return {
    id: parseInt(
      mainSplit[0]
        .split("")
        .slice(1)
        .join(""),
      10
    ),
    xStart,
    yStart,
    width,
    height
  };
});

const fabric = [];
parsed.forEach(({ xStart, yStart, width, height, id }) => {
  for (let j = yStart; j < yStart + height; j++) {
    if (!fabric[j]) {
      fabric[j] = [];
    }
    for (let i = xStart; i < xStart + width; i++) {
      if (fabric[j][i]) {
        fabric[j][i].push(id);
      } else {
        fabric[j][i] = [id];
      }
    }
  }
});
const doubleOccupied = fabric.reduce((sum, row) => {
  return sum + count(row, x => x.length >= 2);
}, 0);
console.log({ doubleOccupied });

const ids = new Set(parsed.map(({ id }) => id));
fabric.forEach(row => {
  row.forEach(squareOccupants => {
    if (squareOccupants.length >= 2) {
      squareOccupants.forEach(id => {
        ids.delete(id);
      });
    }
  });
});
console.log({ ids });
