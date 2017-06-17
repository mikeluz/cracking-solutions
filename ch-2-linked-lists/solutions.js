// ES6 Linked List implementation

// Node class -- all members of list will be one of these
class Node {

	constructor(val) {
		this.value = val;
		this.next = null;
		this.prev = null;
	}

}

// Linked List class
class LinkedList {

	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}


	addToHead(val) {
		let newHead = new Node(val)
		let oldHead = this.head

		this.head = newHead;

		if (oldHead) {
			oldHead.prev = newHead;
			newHead.next = oldHead;
		}

		if (!this.tail) this.tail = newHead;

		this.length += 1;
	}

	addToTail(val) {
		let newTail = new Node(val)
		let oldTail = this.tail

		this.tail = newTail

		if (oldTail) {
			oldTail.next = newTail;
			newTail.prev = oldTail
		}

		if (!this.head) this.head = newTail

		this.length += 1;
	}

	removeHead() {
		let newHead = this.head.next
		this.head = newHead
		this.head.prev = null
	}

	removeTail() {
		let newTail = this.tail.prev
		this.tail = newTail
		this.tail.next = null
	}

	removeMiddleNode(node) {
		let oldNext = node.next
		let oldPrev = node.prev

		oldNext.prev = oldPrev
		oldPrev.next = oldNext
		this.length -= 1
	}

	deleteNode(val) {
		let current = this.head
		while (current) {
			if (current.value === val) {
				// if head
				if (!current.prev) {
				  this.removeHead()
				}
				// if tail
				if (!current.next) {
				  this.removeTail()
				} 
				// if middle node
				if (!current.next && !current.prev) {
				  current.next.prev = current.prev
				  current.prev.next = current.next
				}
				this.length -= 1;
				return;
			}
			current = current.next
		}
	}

	removeDupes() {

		let current = this.head
		let hash = {}

		// find dupes and map them to a hash
		while (current) {
			if (!hash[current.value]) {
				hash[current.value] = 1
			} else {
				hash[current.value] += 1
			}
			current = current.next
		}

		// remove dupes
		for (var val in hash) {
			while (hash[val] > 1) {
				this.deleteNode(Number(val))
				hash[val] -= 1
			}
		}
	}

	findKthFromLast(k) {

		let index = this.length;
		let kFromLast = index - k;
		let current = this.tail;

		while (index > kFromLast) {
			current = current.prev
			index--;
		}

		return current;

	}

}

let list = new LinkedList();

list.addToHead(5);
list.addToHead(6);
list.addToHead(7);
list.addToTail(8);
list.addToHead(8);
list.addToTail(9);
list.addToTail(10);
list.addToHead(10);
// list.removeDupes();
list.addToHead(235);
list.addToHead(87);
list.addToHead(21);
list.addToTail(45);
list.addToHead(123);
list.addToTail(67);

console.log(list);
list.findKthFromLast(4);