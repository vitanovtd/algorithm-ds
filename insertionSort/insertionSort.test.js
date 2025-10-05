const { insertionSort } = require("./insertionSort");

test("unsorted array", () => {
  expect(insertionSort([5, 2, 4, 6, 1, 3])).toEqual([1, 2, 3, 4, 5, 6]);
});

test("sorted array unchanged", () => {
  expect(insertionSort([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
});

test("empty array", () => {
  expect(insertionSort([])).toEqual([]);
});

test("duplicate values", () => {
  expect(insertionSort([1, 4, 3, 4])).toEqual([1, 3, 4, 4]);
});
