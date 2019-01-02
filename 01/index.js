const { fileToArr } = require("../utils");

const nums = fileToArr("./day1.txt")
  .map(x => parseInt(x, 10))
  .filter(x => !isNaN(x));

function firstRepeat(freqs) {
  let currentFreq = 0;
  let currentIndex = 0;
  const freqSet = new Set();

  // track loops for fun
  let iteration = 1;

  while (true) {
    if (freqSet.has(currentFreq)) {
      return { currentFreq, iteration };
    } else {
      freqSet.add(currentFreq);
      iteration += 1;
      currentFreq += freqs[currentIndex];
      if (currentIndex === freqs.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex += 1;
      }
    }
  }
}

console.log(firstRepeat(nums));
