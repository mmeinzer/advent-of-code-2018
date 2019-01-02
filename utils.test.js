const { count } = require("./utils");

describe("count", () => {
  test("correctly the number values matching a given statement", () => {
    expect(count([0, 0, 0, 1, 2], x => x > 1)).toBe(1);
    expect(
      count(
        ["a", "b", "c", "d", "a", "a"],
        (letter, i) => letter === "a" && i > 0
      )
    ).toBe(2);
  });
});
