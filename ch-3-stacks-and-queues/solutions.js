// 3.3 -- implement a "stackOfStacks" data structure that creates a new stack when one has filled
class Node {
	constructor(val) {
		this.value = val;
		this.next = null;
	}
}

class Stack {
	constructor(top) {
		this.length = 0;
		this.top = top || null;
	}
	push(val) {
		let newNode = new Node(val);
		if (this.top) {
			let oldTop = this.top;
			this.top = newNode;
			this.top.next = oldTop;
		} else {
			this.top = newNode;
		}
	this.length++;
	}
	pop() {
		let topToPop = this.top;
		this.top = this.top.next;
		return topToPop.value;
	}
	peek() {
		return this.top;
	}
}

class stackOfStacks {
	constructor() {
		this.stacks = new Stack();
	}
	push(val) {
	  if (!this.stacks.top) {
	    this.stacks.push(new Stack());
	  }
	  if (this.stacks.top.value.length === 5) {
	   	this.stacks.push(new Stack());
	  }
		if (this.stacks.top.value.length < 5) {
			this.stacks.top.value.push(val);
		}
	}
	pop() {
		let current = this.stacks.top;
		while (current.value.length === 5) {
			current = current.next;
		}
		return current.value.pop();
	}
	popAt(index) {
	  if (index > this.stacks.length) {
	    return "No stack at that index.";
	  }
		let count = 0;
		let current = this.stacks.top;
		while (count < index) {
			current = current.next;
			count++;
		}
		return current.value.pop();
	}
}

let stackSet = new stackOfStacks();
stackSet.push(5);
stackSet.push(6);
stackSet.push(7);
stackSet.push(8);
stackSet.push(9);
stackSet.push(10);
stackSet.push(11);
stackSet.push(12);
stackSet.push(13);
stackSet.push(14);
stackSet.push(15);
stackSet.push(16);
stackSet.push(17);
console.log(stackSet.pop()); // 17
console.log(stackSet.popAt(2)); // 9

// 3.5 -- function that sorts a stack with the smallest at the top
const sortAsc = (stack) => {
	let sortedStack = new Stack();
	let current = stack.top;
	sortedStack.push(current);
	current = current.next;
	while (current) {
		sortCurrent = sortedStack.top;

		if (current.value < sortCurrent.value) {
			sortedStack.push(current);
			current = current.next;
		}
		
		var insertPoint = sortCurrent;

		while (current.value > sortCurrent.value) {
			sortedCurrent = sortedCurrent.next;
		}
		current.next = sortedCurrent;

		current = current.next;
	}
}