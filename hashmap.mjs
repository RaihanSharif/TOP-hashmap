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

  // if the key already exists in bucket, then the old value is overwritten
  // else new element is added to the bucket
  //TODO: change length when new element added
  set(key, value) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index] === null) {
      this.buckets[index] = new LinkedList();
      this.buckets[index].append(key, value);
    } else {
      const found = this.buckets[index].find(key);
      if (found === null) {
        this.buckets[index].append(key, value);
      } else {
        this.buckets[index].at(found).value = value;
      }
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
h.set("ab", 12);
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
h.set("u", 19);
h.set("v", 19);
h.set("w", 19);
h.set("x", 19);
h.set("y", 20);
h.set("z", 20);
for (let i = 0; i < h.buckets.length; i++) {
  const elems = [];
  let ll = h.buckets[i];
  for (let j = 0; j < ll.size; j++) {
    let node = ll.at(j);
    elems.push([node.key, node.value]);
  }
  console.log(elems);
}
console.log(`----------------------------------`);
console.log(`a`, h.get("a"));
console.log("b", h.get("b"));
console.log("c", h.get("c"));

h.set("a", 22);
h.set("ab", 33);

console.log(`----------------------------------`);
for (let i = 0; i < h.buckets.length; i++) {
  const elems = [];
  let ll = h.buckets[i];
  for (let j = 0; j < ll.size; j++) {
    let node = ll.at(j);
    elems.push([node.key, node.value]);
  }
  console.log(elems);
}

console.log(`--------------`);
console.log(`a`, h.get("a"));
console.log(`b`, h.get("b"));
console.log(`c`, h.get("c"));
console.log(`non-existant`, h.get("non-existant"));

console.log(`--------------`);
console.log(`a`, h.has("a"));
console.log(`b`, h.has("b"));
console.log(`c`, h.has("c"));
console.log(`non-existant`, h.has("non-existant"));
