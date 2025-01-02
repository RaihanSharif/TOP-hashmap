import { Node, LinkedList } from "./linked_list.mjs";

class HashMap {
  buckets = Array(16).fill(null); // 16 nulls, no error
  static loadFactor = 0.75;
  capacity = this.buckets.length;
  length = 0;

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  /**
   * resizes buckets array when hashmap exceeds load factor
   */
  resize() {
    this.length = 0;
    const oldBuckets = this.buckets;
    const newBuckets = Array(this.capacity * 2).fill(null);
    this.buckets = newBuckets;

    this.capacity = newBuckets.length;

    // move everything to the new bucket
    for (let i = 0; i < oldBuckets.length; i++) {
      const bucket = oldBuckets[i];
      if (bucket !== null) {
        for (let j = 0; j < bucket.size; j++) {
          const node = bucket.at(j);
          const newIndex = this.hash(node.key);
          this.set(node.key, node.value);
        }
      }
    }
  }

  // if the key already exists in bucket, then the old value is overwritten
  // else new element is added to the bucket
  set(key, value, buckets = this.buckets) {
    const index = this.hash(key);
    if (index < 0 || index >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }
    if (buckets[index] === null) {
      buckets[index] = new LinkedList();
      buckets[index].append(key, value);
      this.length++;
    } else {
      const found = buckets[index].find(key);
      if (found === null) {
        buckets[index].append(key, value);
        this.length++;
      } else {
        buckets[index].at(found).value = value;
      }
    }

    if (this.length > this.capacity * HashMap.loadFactor) {
      this.resize();
    }
  }

  // return the value of the supplied key or null
  // if it doesn't exist
  get(key) {
    const index = this.hash(key);
    const search = this.buckets[index].find(key);
    if (search === null) {
      return null;
    } else {
      return this.buckets[index].at(search).value;
    }
  }

  // return true if key in hashmap, returns false otherwise
  // hash the key, get the bucket, check the bucket's linked list
  has(key) {
    if (this.get(key) === null) {
      return false;
    } else {
      return true;
    }
  }

  remove(key) {
    if (!this.has(key)) return false;

    const index = this.hash(key);

    const search = this.buckets[index].find(key);
    console.log(`removing:`, this.buckets[index].at(search));
    this.buckets[index].removeAt(search);
    this.length--;
    return true;
  }

  // returns the number of stored keys
  get length() {
    return this.length;
  }

  // remove all elements from hashmap
  clear() {
    this.buckets = Array(16).fill(null);
  }

  // return an array of all the keys in the hashmap
  keys() {
    const keys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket !== null) {
        for (let j = 0; j < bucket.size; j++) {
          keys.push(bucket.at(j).key);
        }
      }
    }
    return keys;
  }

  // return an array of all the values stores in the hashmap
  values() {
    const values = [];
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket !== null) {
        for (let j = 0; j < bucket.size; j++) {
          values.push(bucket.at(j).value);
        }
      }
    }
    return values;
  }

  // return an array of k,v pairs
  // [[firstKey, firstValue], [secondKey, secondValue]]
  entries() {
    const entries = [];
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket !== null) {
        for (let j = 0; j < bucket.size; j++) {
          entries.push([bucket.at(j).key, bucket.at(j).value]);
        }
      }
    }
    return entries;
  }
}

let test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(`entries before`, test.entries());
console.log(`length before`, test.length);
console.log(`capacity before`, test.capacity);

test.set("moon", "silver");

console.log(`entries after overload`, test.entries());
console.log(`length after overload`, test.length);
console.log(`capacity after overload`, test.capacity);
