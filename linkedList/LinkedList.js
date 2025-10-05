const Node = (value = null, nextNode = null) => ({ value, nextNode });

class LinkedList {
  constructor(iterable = null) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    if (iterable != null) {
      for (const v of iterable) {
        this.append(v);
      }
    }
  }

  size() {
    return this.length;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  append(value) {
    const node = Node(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail.nextNode = node;
      this.tail = node;
    }
    this.length += 1;
    return this;
  }

  prepend(value) {
    const node = Node(value, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.length += 1;
    return this;
  }
  at(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let current = this.head;

    for (let i = 0; i < index; i += 1) {
      current = current.nextNode;
    }
    return current;
  }

  pop() {
    if (!this.head) {
      return null;
    }
    if (this.length === 1) {
      const out = this.tail;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return out;
    }
    let prev = this.head;

    while (prev.nextNode && prev.nextNode !== this.tail) {
      prev = prev.nextNode;
    }
    const out = this.tail;
    prev.nextNode = null;
    this.tail = prev;
    this.length -= 1;
    return out;
  }

  contains(value, equals = (a, b) => a === b) {
    return this.find(value, equals) !== -1;
  }

  find(value, equals = (a, b) => a === b) {
    let idx = 0;
    let current = this.head;
    while (current) {
      if (equals(current.value, value)) {
        return idx;
      }
      current = current.nextNode;
      idx += 1;
    }
    return -1;
  }

  toString(mapper = (v) => String(v)) {
    const parts = [];
    let current = this.head;
    while (current) {
      parts.push(`( ${mapper(current.value)})`);
      current = current.nextNode;
    }
    parts.push("null");
    return parts.join(" -> ");
  }

  insertAt(value, index) {
    if (index < 0 || index > this.length) {
      return false;
    }
    if (index === 0) {
      this.prepend(value);
      return true;
    }

    if (index === this.length) {
      this.append(value);
      return true;
    }
    const prev = this.at(index - 1);
    const node = Node(value, prev.nextNode);
    prev.nextNode = node;
    this.length += 1;
    return true;
  }

  removeAt(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    if (index === 0) {
      const out = this.head;
      this.head = this.head.nextNode;
      if (this.length === 1) {
        this.tail = null;
      }
      this.length -= 1;
      out.nextNode = null;
      return out;
    }
    const prev = this.at(index - 1);
    const out = prev.nextNode;
    prev.nextNode = out.nextNode;
    if (out === this.tail) {
      this.tail = prev;
    }
    this.length -= 1;
    out.nextNode = null;
    return out;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    return this;
  }

  [Symbol.iterator]() {
    let current = this.head;
    return {
      next() {
        if (!current) {
          return { done: true };
        }
        const value = current.value;
        current = current.nextNode;
        return { value, done: false };
      },
    };
  }
}

module.exports = { Node, LinkedList };
