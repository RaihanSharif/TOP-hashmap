class HashMap {
  buckets = Array(16); // 16 undefineds, no error
  static loadFactor = 0.8;
  capacity = this.buckets.length;
  length = 0;
  // if number of entries is > (loadFactor * capacity)
  //    time to double the size of the buckets array

  // never access buckets direrctly with keys, the hash fucntion gives
  // you the necessary bucket
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
    }

    return hashCode;
  }

  // if the key already exists, then the old value is
  // is overwritten.
  set(key, value) {
    // hash(key);
    // check the bucket linked list for an element with this key
    // if it exists, update the value
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
