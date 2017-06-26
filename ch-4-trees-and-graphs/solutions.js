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

	for (var i = 0; i < arrCopy.length; i++) {
		if (i === (Math.floor(arrCopy.length / 2) - 1)) {
			continue;
		}
		if (i === 0) {
			var rootEl = arrCopy[Math.floor(arrCopy.length / 2) - 1];
			tree = new BST(rootEl);
		} else {
			tree.push(arrCopy[i]);
		}
	}

	return tree;
}

var sortedArray = [1,2,3,4,5,6,7,8,9,10];
var newBST = createBST(sortedArray);
console.log(newBST);