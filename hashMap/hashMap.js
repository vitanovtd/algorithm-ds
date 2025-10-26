function hashMap(initialCapacity = 16) {
  let buckets = new Array(initialCapacity).fill(null).map(() => []);
  let capacity = initialCapacity;
  let size = 0;
  const loadFactor = 0.75;

  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }
    return hashCode;
  }

  function checkBound(index) {
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  function resize() {
    const oldBuckets = buckets;
    capacity *= 2;
    buckets = new Array(capacity).fill(null).map(() => []);
    size = 0;

    // rehash all entries

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        set(key, value);
      }
    }
  }

  function set(key, value) {
    const index = hash(key);
    checkBound(index);

    const bucket = buckets[index];

    // check if key exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    size++;

    if (size / capacity > loadFactor) {
      resize();
    }
  }

  function get(key) {
    const index = hash(key);
    checkBound(index);

    const bucket = buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }

    return null;
  }

  function has(key) {
    const index = hash(key);
    checkBound(index);

    const bucket = buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return true;
      }
    }
    return false;
  }

  function remove(key) {
    const index = hash(key);
    checkBound(index);

    const bucket = buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        size--;
        return true;
      }
    }

    return false;
  }

  function length() {
    return size;
  }

  function clear() {
    buckets = new Array(capacity).fill(null).map(() => []);
    size = 0;
  }

  function keys() {
    const allKeys = [];
    for (const bucket of buckets) {
      for (const [key] of bucket) {
        allKeys.push(key);
      }
    }

    return allKeys;
  }

  function values() {
    const allValues = [];
    for (const bucket of buckets) {
      for (const [, value] of bucket) {
        allValues.push(value);
      }
    }

    return allValues;
  }

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
  };
}

module.exports = { hashMap };
