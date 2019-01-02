const { fileToArr, count } = require("../utils");
const FILE = "./input.txt";

const logEntries = fileToArr(FILE);

let currentId = undefined;

const sortByDateTime = (a, b) => {
  if (!(a.year - b.year)) {
    if (!(a.month - b.month)) {
      if (!(a.day - b.day)) {
        if (!(a.hour - b.hour)) {
          return a.minute - b.minute;
        }
        return a.hour - b.hour;
      }
      return a.day - b.day;
    }
    return a.month - b.month;
  }
  return a.year - b.year;
};

const parsed = logEntries
  .map(entry => {
    const action = entry.match(/\]\s(.*)/)[1];
    const [date, time] = entry.match(/\[(.{16})\]/)[1].split(" ");
    const timeSplit = time.split(":");
    const [hour, minute] = [
      parseInt(timeSplit[0], 10),
      parseInt(timeSplit[1], 10)
    ];
    const [year, month, day] = date
      .split("-")
      .map(numString => parseInt(numString, 10));
    return { year, month, day, hour, minute, action };
  })
  .sort(sortByDateTime)
  .map(entry => {
    let id = entry.action.match(/#(.{4})/);
    if (id) {
      id = parseInt(id[1], 10);
      currentId = id;
    }
    entry.id = currentId;
    return entry;
  });

const sleepRecord = {
  id: null,
  sleepMin: null,
  awakeMin: null
};

const sleepRecords = parsed.reduce((arr, entry) => {
  const { action, id, minute } = entry;
  if (action.includes("begins shift")) {
    sleepRecord.id = id;
    sleepRecord.sleepMin = null;
    sleepRecord.awakeMin = null;
  }
  if (action.includes("falls asleep")) {
    sleepRecord.sleepMin = minute;
  }
  if (action.includes("wakes up")) {
    sleepRecord.awakeMin = minute;
    console.l;
    arr.push({ ...sleepRecord });
    sleepRecord.sleepMin = null;
    sleepRecord.awakeMin = null;
  }
  return arr;
}, []);

const recordsById = sleepRecords.reduce((records, sleepEntry) => {
  const { id, sleepMin, awakeMin } = sleepEntry;
  if (!records[id]) {
    records[id] = [];
  }
  for (let i = sleepMin; i < awakeMin; i++) {
    records[id][i] ? (records[id][i] += 1) : (records[id][i] = 1);
  }
  return records;
}, {});

const mostSleepy = Object.keys(recordsById).reduce(
  (acc, id) => {
    const totalSleep = recordsById[id].reduce((sum, min) => sum + min, 0);
    if (totalSleep > acc.mostSleep) {
      acc.mostSleep = totalSleep;
      acc.id = id;
    }
    return acc;
  },
  { mostSleep: 0, id: null }
);

const bestMinute = id =>
  recordsById[id].reduce(
    (acc, mins, i) => {
      if (mins > acc.maxSleep) {
        acc.maxSleep = mins;
        acc.minuteIndex = i;
      }
      return acc;
    },
    { maxSleep: 0, minuteIndex: null }
  );

console.log(mostSleepy.id * bestMinute(mostSleepy.id).minuteIndex);

const idForHighestMinute = Object.keys(recordsById)
  .map(id => {
    return {
      mostMins: Math.max(...recordsById[id].filter(item => item != null)),
      id
    };
  })
  .reduce(
    (acc, entry, i) => {
      if (entry.mostMins > acc.highMin) {
        acc.highMin = entry.mostMins;
        acc.id = entry.id;
      }
      return acc;
    },
    { highMin: 0, id: null }
  ).id;

console.log(
  parseInt(idForHighestMinute, 10) * bestMinute(idForHighestMinute).minuteIndex
);
