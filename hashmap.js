export default (function() {

  const BASE_CHAR_CODE = 'a'.charCodeAt(0);
  const HASH_PRIME = 37;
  const LOAD_FACTOR = 0.8;
  const GROWTH_MULTIPLIER = 2;

  class HashMap {
    constructor(capacity = 16) {
      this._capacity = capacity;
      this._count = 0;
      this._buckets = new Array(capacity);
    }

    // Public methods

    clear() {
      this._buckets = new Array(this._capacity);
    }

    entries() {
      return this._mapAllNodes((currentNode) =>
        [currentNode.key, currentNode.value]
      );
    }

    get(key) {
      let matchingNode = this._getNodeMatching(key);
      if (matchingNode) {
        return matchingNode.value;
      } else {
        return null;
      }
    }
    
    has(key) {
      return !!this._getNodeMatching(key);
    }

    keys() {
      return this._mapAllNodes((currentNode) => currentNode.key);
    }

    remove(key) {
      if (this.has(key)) {
        const index = this._hash(key);
        this._buckets[index] = this._buckets[index].remove(key);
        this._count--;
        return true;
      } else {
        return false;
      }
    }

    set(key, value) {
      // Increase capacity if necessary.
      if (this._count >= (this._capacity * LOAD_FACTOR)) {
        this._setCapacity(this._capacity * GROWTH_MULTIPLIER);
      }

      // Find the bucket corresponding to this key.
      const index = this._hash(key);
      let existingBucket = this._buckets[index];
      if (existingBucket) {
        let matchingNode = existingBucket.find(key);
        if (matchingNode) {
          // This key is already present. Replace the value.
          matchingNode.value = value;
          return;
        }
      }

      // If we're here, this key is new.
      // Add a node for it, and put it on the front of the bucket.
      const newNode = new BucketNode(key, value);
      newNode.next = existingBucket;
      this._buckets[index] = newNode;
      this._count++;
    }

    values() {
      return this._mapAllNodes((currentNode) => currentNode.value);
    }

    // Private helper methods

    _getNodeMatching(key) {
      let index = this._hash(key);
      let bucket = this._buckets[index];
      if (bucket) {
        return bucket.find(key);
      } else {
        return null;
      }
    }

    _hash(key) {
      let hashCode = 0;
      for (let i = 0; i < key.length; i++) {
        hashCode *= HASH_PRIME;
        hashCode += key.charCodeAt(i) - BASE_CHAR_CODE;
        hashCode %= this._capacity;
      }

      if (hashCode < 0 || hashCode >= this._capacity) {
        throw new Error("Hash code out of bounds!", hashCode);
      }
      return hashCode;
    }

    _mapAllNodes(funcMap) {
      let results = new Array(this._count);
      let i = 0;
      for (let bucket of this._buckets) {
        for (
          let currentNode = bucket;
          currentNode != null;
          currentNode = currentNode.next
        ) {
          results[i] = funcMap(currentNode);
          i++;
        }
      }
      return results;
    }

    _setCapacity(newCapacity) {
      // Remember the old buckets for later in this function
      const oldBuckets = this._buckets;
      const oldCapacity = this._capacity;

      // Make a new empty array of buckets
      this._capacity = newCapacity;
      this._buckets = new Array(newCapacity);

      // Move the contents of the old buckets into the new buckets
      for (let i = 0; i < oldCapacity; i++) {
        for (
          let oldNode = oldBuckets[i];
          oldNode != null;
          oldNode = oldNode.next
        ) {
          this.set(oldNode.key, oldNode.value);
        }
      }
    }

  }

  class BucketNode {
    constructor(key, value) {
      this.key = key;
      this.value = value;
      this.next = null;
    }

    find(key) {
      if (this.key == key) {
        return this;
      } else if (this.next) {
        return this.next.find(key);
      } else {
        return null;
      }
    }

    remove(key) {
      if (this.key == key) {
        let newHead = this.next;
        this.next = null;
        return newHead;
      } else if (this.next) {
        // Key might be removed down the line.
        this.next = this.next.remove(key);
        return this;
      } else {
        return this; // Key not found. No change.
      }
    }
  }

  return HashMap;
}());