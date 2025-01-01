import { Node, LinkedList } from "./linked_list.mjs";

class HashMap {
  buckets = Array(16).fill(null); // 16 nulls, no error
  static loadFactor = 0.8;
  capacity = this.buckets.length; // not necessary
  length = 0;
  // if number of entries is > (loadFactor * capacity)
  //    time to double the size of the buckets array

  // never access buckets direrctly with keys, the hash fucntion gives
  // you the necessary bucket
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  // if the key already exists, then the old value is
  // is overwritten.
  set(key, value) {
    // hash(key);
    // check the bucket linked list for an element with this key
    // if it exists, update the value

    const index = this.hash(key);
    console.log(index);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index] === null) {
      const newLL = new LinkedList();
      newLL.append(key, value);
      this.buckets[index] = newLL;
      this.length++;
    } else {
      const existingLL = this.buckets[index];
      const nodeIndex = existingLL.find(key, value);

      if (nodeIndex == null) {
        // append to the linkedList of this bucket
        existingLL.append(new Node(key, value));
        this.length;
      } else {
        const node = existingLL.at(index);
        node.value = value;
      }
    }
  }

  get(key) {
    // hash the key, get the bucket
    // check bucket's linked list for the key, return value
    // else return null
  }

  has(key) {
    // return true if key in hashmap, returns false otherwise
    // hash the key, get the bucket, check the bucket's linked list
  }

  remove(key) {}

  // returns the number of stored keys
  length() {}

  // remove all elements from hashmap
  clear() {}

  // return an array of all the keys in the hashmap
  keys() {}

  // return an array of all the values stores in the hashmap
  values() {}

  // return an array of k,v pairs
  // [[firstKey, firstValue], [secondKey, secondValue]]
  entries() {}
}

let h = new HashMap();
h.set("a", 1);
h.set("b", 2);
h.set("c", 3);
h.set("d", 4);
h.set("e", 5);
h.set("f", 6);
h.set("g", 7);
h.set("h", 8);
h.set("j", 9);
h.set("k", 10);
h.set("l", 11);
h.set("m", 12);
h.set("n", 13);
h.set("o", 14);
h.set("p", 15);
h.set("q", 16);
h.set("r", 17);
h.set("s", 18);
h.set("t", 19);
h.set("ab", 20);
console.log(h.buckets);
