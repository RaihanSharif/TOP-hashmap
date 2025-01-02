import { Node, LinkedList } from "./linked_list.mjs";

//TODO: do load factor logic on adding new element
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
  set(key, value) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    // TODO: load factoring
    if (this.buckets[index] === null) {
      this.buckets[index] = new LinkedList();
      this.buckets[index].append(key, value);
      this.length++;
    } else {
      const found = this.buckets[index].find(key);
      if (found === null) {
        this.buckets[index].append(key, value);
        this.length++;
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

  remove(key) {
    if (!this.has(key)) return false;

    const index = this.hash(key);

    const search = this.buckets[index].find(key);
    console.log(`removing:`, this.buckets[index].at(search));
    this.buckets[index].removeAt(search);
    this.length--;
    // TODO: load factor
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
  entries() {}
}

let h = new HashMap();
h.set("a", 1);
h.set("ab", 2);
h.set("b", 4);
h.set("c", 5);
h.set("d", 6);
h.set("e", 7);
h.set("f", 8);
h.set("g", 9);
h.set("h", 10);
h.set("j", 11);
h.set("k", 12);
h.set("l", 13);
h.set("m", 14);
h.set("n", 15);
h.set("o", 16);
h.set("p", 17);
h.set("q", 18);
h.set("r", 19);
h.set("s", 20);
h.set("t", 21);
h.set("u", 22);
h.set("v", 23);
h.set("w", 24);
h.set("x", 25);
h.set("y", 26);
h.set("z", 27);
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

// h.set("a", 22);
// h.set("ab", 33);

// console.log(`----------------------------------`);
// for (let i = 0; i < h.buckets.length; i++) {
//   const elems = [];
//   let ll = h.buckets[i];
//   for (let j = 0; j < ll.size; j++) {
//     let node = ll.at(j);
//     elems.push([node.key, node.value]);
//   }
//   console.log(elems);
// }

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

// console.log(`--------------`);
// console.log(`remove non-existant key:`, h.remove("non-existant"));
// console.log(`remove key that does exist:`, h.remove("p"));

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

// h.clear();

// console.log(`after clearing`, console.log(h.buckets));

console.log(`keys`, h.keys());
console.log(`values`, h.values());
