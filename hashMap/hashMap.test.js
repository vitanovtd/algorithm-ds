const { hashMap } = require("./hashMap");

describe("hashMap", () => {
  let map;

  beforeEach(() => {
    map = hashMap();
  });

  describe("set and get", () => {
    test("stores and get values", () => {
      map.set("apple", "yellow");
      expect(map.get("apple")).toBe("yellow");
    });
    test("stores and get values", () => {
      map.set("apple", "red");
      map.set("car", "bmw");
      expect(map.get("apple")).toBe("red");
      expect(map.get("car")).toBe("bmw");
    });
    test("to return null", () => {
      expect(map.get("office")).toBeNull();
    });
  });

  describe("has", () => {
    test("return true for existing key", () => {
      map.set("apple", "red");
      expect(map.has("apple")).toBe(true);
    });
  });

  describe("remove", () => {
    test("removes existing key and returns true", () => {
      map.set("apple", "red");
      expect(map.remove("apple")).toBe(true);
      expect(map.has("apple")).toBe(false);
      expect(map.length()).toBe(0);
    });

    test("returns false for non-existent key", () => {
      expect(map.remove("banana")).toBe(false);
    });

    test("decreases length after removal", () => {
      map.set("apple", "red");
      map.set("banana", "yellow");
      expect(map.length()).toBe(2);
      map.remove("apple");
      expect(map.length()).toBe(1);
    });
  });

  describe("collision handling", () => {
    test("handles multiple keys in same bucket", () => {
      map.set("apple", "red");
      map.set("elppa", "green");
      expect(map.get("apple")).toBe("red");
      expect(map.get("elppa")).toBe("green");
      expect(map.length()).toBe(2);
    });
  });
});
