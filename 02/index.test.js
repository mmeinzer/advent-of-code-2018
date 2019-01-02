const { getLetterCounts, objectHasValues } = require("./index");
const { numberOfDifferences } = require("./partTwo");

describe("getLetterCounts", () => {
  test("returns an object with the count of each letter in the input string", () => {
    let data = getLetterCounts("abc");
    expect(data).toEqual({ a: 1, b: 1, c: 1 });
    data = getLetterCounts("aabbcca ");
    expect(data).toEqual({ a: 3, b: 2, c: 2 });
  });
});

describe("objectHasValue", () => {
  test("correctly returns true when an object contains ALL of the given values", () => {
    let data = objectHasValues({ a: 2, b: 3, c: 1, d: 3 }, [3, 2]);
    expect(data).toEqual({ "3": true, "2": true });
  });

  test("correctly returns false when an object doesn't contain ALL of the given values", () => {
    let data = objectHasValues({ a: 2, b: 3, c: 1 }, [3, 4]);
    expect(data).toEqual({ "3": true, "4": false });
  });
});

describe("numberOfDifferences", () => {
  test("correctly gets the number of differences", () => {
    expect(numberOfDifferences("abcd", "abce")).toBe(1);
    expect(numberOfDifferences("abcde", "abade")).toBe(1);
    expect(numberOfDifferences("abcdef", "aaadef")).toBe(2);
  });

  test("throws an error when strings are different lengths", () => {
    expect(() => numberOfDifferences("abc", "abcd")).toThrow();
  });
});
