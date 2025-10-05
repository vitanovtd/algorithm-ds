const { LinkedList } = require("./LinkedList");

test("constructor head/tail", () => {
  const list = new LinkedList();
  expect(list.size()).toBe(0);
  expect(list.getHead()).toBeNull();
  expect(list.getTail()).toBeNull();
});

test("prepend adds to head", () => {
  const list = new LinkedList();
  list.prepend(2).prepend(1);
  expect(list.size()).toBe(2);
  expect(list.getHead().value).toBe(1);
  expect(list.getTail().value).toBe(2);
});

test("at(index)", () => {
  const list = new LinkedList([0, 1, 2]);
  expect(list.at(0).value).toBe(0);
  expect(list.at(1).value).toBe(1);
  expect(list.at(2).value).toBe(2);
  expect(list.at(-1)).toBeNull();
  expect(list.at(3)).toBeNull();
});

test("pop removes and returns the tail node", () => {
  const list = new LinkedList([0, 1, 2]);
  const out = list.pop();
  expect(out.value).toBe(2);
  expect(list.size()).toBe(2);
  expect(list.getTail().value).toBe(1);
});

test("pop handles single-element and empty lists", () => {
  const one = new LinkedList([42]);
  const out1 = one.pop();
  expect(out1.value).toBe(42);
  expect(one.size()).toBe(0);
  expect(one.getHead()).toBeNull();
  expect(one.getTail()).toBeNull();

  const empty = new LinkedList();
  expect(empty.pop()).toBeNull();
});

test("contains and find work with default comparator", () => {
  const list = new LinkedList([5, 6, 7]);
  expect(list.contains(6)).toBe(true);
  expect(list.contains(9)).toBe(false);
  expect(list.find(5)).toBe(0);
  expect(list.find(7)).toBe(2);
  expect(list.find(9)).toBe(-1);
});

test("contains", () => {
  const list = new LinkedList([{ id: 1 }, { id: 2 }]);
  const equals = (a, b) => a.id === b.id;
  expect(list.contains({ id: 2 }, equals)).toBe(true);
  expect(list.contains({ id: 3 }, equals)).toBe(false);
});

test("toString lists values and ends with null", () => {
  const list = new LinkedList([1, 2]);
  const s = list.toString();
  expect(s.endsWith("null")).toBe(true);
  expect(s).toContain("1");
  expect(s).toContain("2");
});

test("insertAt inserts at head, middle, and tail; returns true/false", () => {
  const list = new LinkedList([1, 3]);
  expect(list.insertAt(0, 0)).toBe(true);
  expect(list.getHead().value).toBe(0);

  expect(list.insertAt(2, 2)).toBe(true); // [0,1,2,3]
  expect(list.at(2).value).toBe(2);

  expect(list.insertAt(4, list.size())).toBe(true);
  expect(list.getTail().value).toBe(4);

  expect(list.insertAt(99, -1)).toBe(false);
  expect(list.insertAt(99, list.size() + 1)).toBe(false);
});

test("removeAt removes head, middle, tail", () => {
  const list = new LinkedList([0, 1, 2, 3]);

  const firstValue = list.removeAt(0);
  expect(firstValue.value).toBe(0);
  expect(list.getHead().value).toBe(1);

  const midValue = list.removeAt(1);
  expect(midValue.value).toBe(2);
  expect(list.at(1).value).toBe(3);

  const tailValue = list.removeAt(list.size() - 1);
  expect(tailValue.value).toBe(3);
  expect(list.getTail().value).toBe(1);

  expect(list.removeAt(-1)).toBeNull();
  expect(list.removeAt(list.size())).toBeNull();
});

test("clear the list", () => {
  const list = new LinkedList([1, 2, 3]);
  list.clear();
  expect(list.size()).toBe(0);
  expect(list.getHead()).toBeNull();
  expect(list.getTail()).toBeNull();
});

test("iterator ", () => {
  const list = new LinkedList([1, 2, 3]);
  expect([...list]).toEqual([1, 2, 3]);
});
