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

    has(item) {
      return this._map.has(item);
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

    values() {
      return this.entries();
    }
  }

  return HashSet;
}());