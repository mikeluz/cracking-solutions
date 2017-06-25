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

	// 2.3 -- Remove middle node by reference to the node to remove
	removeMiddleNode(node) {
		let oldNext = node.next
		let oldPrev = node.prev

		// since JS has automatic garbage collection, just need to remove references
		// in other languages you overwrite the passed-in node with a new node constructed out of references to the next node
		// this deletes the current node by overwriting it with its next
		// does not work on final node as final node does not have a next
		oldNext.prev = oldPrev
		oldPrev.next = oldNext
		this.length -= 1
	}

	// helper function for removeDupes
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

	// 2.1 -- Remove dupes from unsorted linked list
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

	// 2.2 -- Find kth to last element
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

	// 2.4 -- Create partition
	makePartition(pVal) {

		// create new LinkedLists -- immutable data structure style
		let tempList = new LinkedList()
		let partitionedList = new LinkedList()

		let current = this.head;

		while (current) {

			if (current.value === pVal) {
				partitionedList.addToHead(current.value)
			}
			if (current.value < pVal) {
				tempList.addToHead(current.value)
			} else {
				partitionedList.addToHead(current.value)
			}

			current = current.next;
		}

		current = tempList.head
		
		while (current) {
			partitionedList.addToHead(current.value)
			current = current.next
		}

		current = partitionedList.head

		while (current) {
			current = current.next
		}

		// return new partitioned list -- immutable data structure style
		return partitionedList
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
list.addToHead(235);
list.addToHead(87);
list.addToHead(21);
list.addToTail(45);
list.addToHead(123);
list.addToTail(67);

// 2.5 -- Sum two numbers represented as LinkedLists, return sum as LinkedList
function convertListToNum(list) {
	let num = ''
	let current = list.head
	while (current) {
		num += current.value.toString();
		current = current.next
	}

	return Number(num)
}

function convertNumToList(num) {
	let list = new LinkedList();
	let numArr = num.toString().split('');

	while (numArr.length) {
		let currentNum = numArr.pop();
		list.addToHead(currentNum)
	}

	return list;
}

function sumTwoLists(listOne, listTwo) {
	let listOneNum = convertListToNum(listOne);
	let listTwoNum = convertListToNum(listTwo);
	let sum = listOneNum + listTwoNum;

	return convertNumToList(sum);
}

let listOne = convertNumToList(123)
let listTwo = convertNumToList(234)

sumTwoLists(listOne, listTwo) // list of three nodes, head->tail 3, 5, 7

// 2.6 -- Determine if a list is a palindrome
function isListPalindrome(list) {

	let reverseList = new LinkedList()

	let current = list.head;

	while (current) {
		reverseList.addToHead(current.value)
		current = current.next
	}

	let count = 0;

  let currentListNode = list.head
  let currentReverseListNode = reverseList.head

	while (count < Math.floor(list.length / 2)) {
		if (currentListNode.value !== currentReverseListNode.value) {
			return false;
		}
		currentListNode = currentListNode.next
		currentReverseListNode = currentReverseListNode.next
		count++;
	}
	
	return true;
	
}

let listPalindrome = new LinkedList();
listPalindrome.addToHead(1);
listPalindrome.addToHead(3);
listPalindrome.addToHead(3);
listPalindrome.addToHead(2);
listPalindrome.addToHead(1);
isListPalindrome(listPalindrome); // returns false

// 2.7 -- Determine if two lists intersect and return the node of intersection (singly Linked List only, as there is no "prev" reference)
function intersection(listOne, listTwo) {

	// if tails are different, no intersection
	if (listOne.tail !== listTwo.tail) {
		return null;
	}

	if (listOne.length > listTwo.length) {
		let toCut
	}

}

