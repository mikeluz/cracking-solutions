// 4.1 -- given a directed graph, design algorithm to find out whether there is a route between them
function findRoute(graph, visited, vOne, vTwo) {

	visited[vOne] = true;

	return graph[vOne].some(function(vertex) {
		if (vOne === vTwo) {
			return true;
		} else if (!visited[vertex]) {
			return findRoute(graph, visited, vertex, vTwo);
		} else {
			return false;
		}
	});

};

var graph = {
	"A": ["B", "C"],
	"C": ["B"],
	"D": ["A", "F"],
	"F": ["E", "C"],
	"E": [],
	"B": ["A", "D", "G"],
	"G": []
};

findRoute(graph, {}, "A", "G");

// 4.2 -- given asc sorted array of ints, write algo to create a BST with minimal height
class BST {
	constructor(val) {
		this.value = val;
		this.left = null;
		this.right = null;
	}
	push(val) {
		if (val > this.value) {
			if (this.right) {
				this.right.push(val);
			} else {
				this.right = new BST(val);
			}
		} else {
			if (this.left) {
				this.left.push(val);
			} else {
				this.left = new BST(val);
			}
		}
	}
}

function createBST(array) {
	var arrCopy = [].slice.call(array);
	var tree;
	var rootIndex = Math.floor(arrCopy.length / 2);
	
	var rootEl = arrCopy[rootIndex];
	tree = new BST(rootEl);
	
	// add left
	for (var i = rootIndex - 1; i >= 0; i -= 2) {
		if (arrCopy[i-1]) {
			tree.push(arrCopy[i-1]);
		}
		tree.push(arrCopy[i]);
	}

	// add right
	for (var i = rootIndex + 1; i < arrCopy.length; i += 2) {
		if (arrCopy[i+1]) {
			tree.push(arrCopy[i+1]);
		}
		tree.push(arrCopy[i]);
	}

	return tree;
}

var sortedArrayEven = [1,2,3,4,5,6,7,8,9,10]; // even number of elements
var sortedArrayOdd = [1,2,3,4,5,6,7,8,9,10,11]; // even number of elements
var small = [1, 2];
var verySmall = [1];
var newBSTEven = createBST(sortedArrayEven);
var newBSTOdd = createBST(sortedArrayOdd);
var newBSTSmall = createBST(small);
var newBSTVerySmall = createBST(verySmall);
console.log(newBSTEven);
console.log(newBSTOdd);
console.log(newBSTSmall);
console.log(newBSTVerySmall);

// 4.3 -- given a BT, design algo that creates a linked list of all the nodes at each depth (BT of depth D will have D linked lists)
class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head;
		this.tail;
	}
	addToHead(val) {
		var newNode = new Node(val);
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			var oldHead = this.head;
			this.head = newNode;
			this.head.next = oldHead;
		}
	}
}

function createLinkedLists(rootNode, arrayOfLists, level) {
	if (rootNode === null) {
		return;
	}
	var list = null;
	if (!arrayOfLists[level]) {
		arrayOfLists.push(new LinkedList());
	}
	list = arrayOfLists[level];
	list.addToHead(rootNode.value);
	createLinkedLists(rootNode.left, arrayOfLists, level + 1);
	createLinkedLists(rootNode.right, arrayOfLists, level + 1);
}
var array = [];
createLinkedLists(newBSTOdd, array, 0);
console.log(array);

// 4.4 -- write a function that checks if a given tree is balanced (no two level-successive nodes have only one leaf)
function checkBalanced(rootNode) {
  if (!rootNode) {
  	// if recursion reaches undefined rootNode it is balanced
    return true;
  } else {
  	// check if there is no left; if so, check if there is a right; if there is, check if that has no left or right; if so, return false
    if (!rootNode.left) {
      if (rootNode.right) {
        if (!rootNode.right.left || !rootNode.right.right) {
    			return false;
    		} 
      }
  	}
  	// same as above but for right
  	if (!rootNode.right) {
  	  if (rootNode.left) {
    	  if (!rootNode.left.left || !rootNode.left.right) {
    			return false;
    		} 
  	  }
  	}
  }
	return checkBalanced(rootNode.left) && checkBalanced(rootNode.right);	
}

checkBalanced(newBSTOdd);
checkBalanced(newBSTEven);
checkBalanced(newBSTEven);
