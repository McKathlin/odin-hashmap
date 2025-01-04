import HashMap from "./hashmap.js";

export default (function() {
  const DEFAULT_STARTING_CAPACITY = 16;

  class HashSet {
    constructor(capacity = DEFAULT_STARTING_CAPACITY) {
      this._map = new HashMap(capacity);
    }

    add(item) {
      return this._map.set(item, true);
    }

    clear() {
      this._map.clear();
    }

    entries() {
      return this._map.keys();
    }

    equals(otherSet) {
      return this.length() == otherSet.length() &&
        this.isSubsetOf(otherSet);
    }

    forEach(callback) {
      this._map.forEach(callback);
    }

    has(item) {
      return this._map.has(item);
    }

    intersect(otherSet) {
      let intersection = new HashSet();
      this.forEach((item) => {
        if (otherSet.has(item)) {
          intersection.add(item);
        }
      })
      return intersection;
    }

    isSubsetOf(otherSet) {
      if (this.length() > otherSet.length()) {
        return false;
      }

      let allFound = true;
      this.forEach((item) => {
        if (!otherSet.has(item)) {
          allFound = false;
        }
      })
      return allFound;
    }

    isSupersetOf(otherSet) {
      return otherSet.isSubsetOf(this);
    }

    keys() {
      return this.entries();
    }

    length() {
      return this._map.length();
    }

    remove(key) {
      return this._map.remove(key);
    }

    union(otherSet) {
      let combined = new HashSet();
      this.forEach((item) => combined.add(item));
      otherSet.forEach((item) => combined.add(item));
      return combined;
    }

    values() {
      return this.entries();
    }
  }

  return HashSet;
}());