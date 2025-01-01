class Node {
  key;
  value;
  nextNode; // make this private
  constructor(key, value, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }

  get nextNode() {
    return this.nextNode;
  }

  /**
   * @param {Node} nodeIn
   */
  set nextNode(nodeIn) {
    this.nextNode = nodeIn;
  }

  get value() {
    return this.data;
  }

  /**
   * @param {Integer} dataIn
   */
  set value(dataIn) {
    this.data = dataIn;
  }

  get key() {
    return this.key;
  }

  set key(k) {
    this.key = k;
  }
}

class LinkedList {
  head; // init as null
  tail; // init as null
  size = 0;

  // if a separate head and tail are defined then link head and tail
  // if no data is entered set head and tail to null
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // seems to be working
  // TODO: check if the linked list is empty
  append(key, value) {
    const newNode = new Node(key, value);
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
      this.head.nextNode = newNode;
      this.size++;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
      this.size++;
    }
  }

  // seems to be working
  // TODO: check if link list is empty
  prepend(key, value) {
    const newNode = new Node(key, value);

    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
      this.head.nextNode = newNode;
      this.size++;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
      this.size++;
    }
  }

  // works
  get size() {
    return this.size;
  }

  // works
  get head() {
    return this.head;
  }

  // works
  get tail() {
    return this.tail;
  }

  // seems to be working
  at(index) {
    if (index == 0) {
      return this.head;
    }

    if (index == this.size - 1) {
      return this.tail;
    }

    if (index >= this.size || index <= 0) {
      throw new Error("index out of range");
    }

    let currentNode = this.head; // linearly traversing from head to to index

    for (let i = 1; i < index + 1; i++) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  // works
  pop() {
    if (this.size < 1) {
      throw new Error("this link list is empty");
    }
    if (this.size == 1) {
      const temp = this.head;
      this.head = null;
      this.tail = null;
      this.size--;
      return temp;
    }
    const temp = this.tail;
    const newTail = this.at(this.size - 2);
    this.tail = newTail;
    this.tail.nextNode = null;
    this.size--;
    return temp;
  }

  // returns first instance where a matching k,v pair is found
  contains(key, value) {
    let currentNode = this.head;
    while (currentNode != null) {
      if (currentNode.key == key && currentNode.value == value) return true;
      currentNode = currentNode.nextNode;
    }
    if (currentNode == null) return false; // this line shouldn't be necessary

    return false;
  }

  // return first instance a matching k,v pair is found or null
  find(key, value) {
    if ((this.head.key = key && this.head.value === value)) {
      return 0;
    }

    if (this.tail.key == key && this.tail.value === value) {
      return this.size - 1;
    }

    let index = 1;
    let currentNode = this.head.nextNode;
    while (currentNode) {
      if (currentNode.key == key && currentNode.value === value) {
        return index;
      } else {
        index++;
        currentNode = currentNode.nextNode;
      }
    }
    return null;
  }

  // TODO: update to fit kv pair
  toString() {
    let LLString = `( ${this.head.value} ) -> `;

    let currentNode = this.head.nextNode;
    do {
      LLString = LLString.concat(`( ${currentNode.value} ) -> `);
      currentNode = currentNode.nextNode;
    } while (currentNode !== null);

    return LLString.concat(`null`);
  }

  // extra credit
  insertAt(index) {}
  removeAt(index) {}
}

let ll = new LinkedList();

ll.prepend("asd", 12);
ll.append("asd", 22);
console.log(ll.at(0));
console.log(ll.at(1));
// console.log(ll.at(2));

ll.find(("asd", 22));

export { Node, LinkedList };
