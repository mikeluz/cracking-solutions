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

// 4.5 -- write a function that validates a given tree as being a binary search tree
function validateBST(tree, rootValue, notRootFlag) {
  // if not root, pass in a flag indicating current node is not the root, as well as the root value for min/max comparison
	var notRoot = notRootFlag || null;
	var rootVal = rootValue || null;

	// if the first call, this parameter will be null, so assign and pass into downstream recursive calls the two args
	if (!notRootFlag) {
		notRoot = true;
		rootVal = tree.value;
	}
	if (!tree) {
		// if undefined, it means it made it to a terminal without finding an out of order leaf
		return true;
	}
	if ((tree.left && tree.value < tree.left.value) || (tree.right && tree.value > tree.right.value)) {
		// check for out of order leaves
		return false;
	}
	if ((tree.left && (tree.left.right && tree.left.right.value > rootVal)) || 
	   (tree.left && (tree.left.left && tree.left.left.value > rootVal)) || 
	   (tree.right && (tree.right.left && tree.right.left.value < rootVal)) ||
	   (tree.right && (tree.right.right && tree.right.right.value < rootVal))) {
			// check for leaves that are in order with respect to their parent but out of order with respect to root value
	    return false;
	   }
	// recurse down the tree
	return validateBST(tree.left, rootVal, notRoot) && validateBST(tree.right, rootVal, notRoot);
}

var testBST = new BST(20);
var leftChild = new BST(15);
leftChild.right = new BST(25); // note 25 is placed as right child of 15, thus correct with respect to parent but incorrect re: root 
testBST.left = leftChild;

validateBST(testBST); // false
validateBST(newBSTEven); // true

// 4.6 -- Write function to find nearest successor node
function findSuccessor(node) {
	// if not right node, return parent
	if (!node.right) {
		return node.parent;
	}
	// base case -- if no left node, you've reached successor
	if (!node.left) {
		return node;
	} else {
		// grab right node
		var current = node.right;
		while (current) {
			// walk all the way down its left side
			current = current.left;
		}
		// return leftmost node
		return current;
	}
}

// 4.7 -- Build Order -- given a list of projects and a list of dependencies, output a build order
function createBuildOrder(graph, buildOrder) {
	var buildOrderCopy = [].slice.call(buildOrder);

	// for each project, loop over its dependencies and check if they have not already been added to the build order
	// if so, add it to the build order
	for (var proj in graph) {
			for (var i = 0; i < graph[proj].length; i++) {
				if (!buildOrderCopy.includes(graph[proj][i])) {
					buildOrderCopy.push(graph[proj][i]);
				}
			}
		  // once buildOrderCopy contains all over a proj's dependencies, add it if it hasn't already been added
			if (!buildOrderCopy.includes(proj)) {
			 	buildOrderCopy.push(proj); 
			}
		}
		
	return buildOrderCopy;
}

function findBuildOrder(projects, dependencies) {
	var graph = {};
	var buildOrder = [];

	var projectsCopy = [].slice.call(projects);
	var dependenciesCopy = [].slice.call(dependencies);

	projectsCopy.forEach(function(p) {
		if (!graph[p]) {
			graph[p] = [];
		}
	});

	dependenciesCopy.forEach(function(d) {
		if (graph[d[0]].length === 0) {
			graph[d[1]] = [d[0]];
		} else {
			graph[d[1]].push(d[0]);
		}
	});

	// get base dependencies -- projects that either do not appear at all in the dependencies or are only depended upon
	for (var proj in graph) {
	  if (!Object.keys(graph).includes(proj)) {
	    buildOrder.push(proj);
	  }
		if (graph[proj].length === 0) {
			buildOrder.push(proj);
		}
	}
	return createBuildOrder(graph, buildOrder);
}

var projects = ['a', 'b', 'c', 'd', 'e', 'f'];
var dependencies = [['a', 'd'], ['f', 'b'], ['b', 'd'], ['f', 'a'], ['d', 'c']];

findBuildOrder(projects, dependencies); // [e, f, a, b, d, c]

// 4.8 -- find common ancestor of two nodes of a tree
function findCommonAncestor(nodeOne, nodeTwo) {

}