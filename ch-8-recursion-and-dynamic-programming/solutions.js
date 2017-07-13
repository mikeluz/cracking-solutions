// 8.1 -- function that returns # of possible ways a kid can go up stairs taking 1, 2, or 3 steps at a time

// NOT MEMOIZED
function stairs(n) {
  if (n < 0) {
    return 0;
  }
  if (n === 0) {
    return 1;
  }
  return stairs(n - 1) + stairs(n - 2) + stairs(n - 3);
}

stairs(10); // returns 274

// MEMOIZED
function stairsMemo(n, memo) {
  if (n < 0) {
    return 0;
  }
  if (n === 0) {
    return 1;
  }
  if (memo[n]) {
  	return memo[n];
  } else {
  	memo = stairs(n - 1) + stairs(n - 2) + stairs(n - 3);
  }

  return memo[n];
}

stairsMemo(10, {}); // returns 274

// 8.2 -- find path for robot on grid from upper left to bottom right, can only go right and down, must avoid obstacles

function findPath(grid, currentRow, currentColumn) {

	if (currentColumn === (grid[0].length - 1) && currentRow === (grid.length - 1)) {
		return "FINISHED";
	}
	
	if (currentColumn >= grid[0].length - 1 || currentRow >= grid.length) {
		return false;
	}

	if (grid[currentRow][currentColumn] === 1) {
		return false;
	}

	return findPath(grid, currentRow + 1, currentColumn) || findPath(grid, currentRow, currentColumn + 1);

}

var grid = [
	[0, 0, 1],
	[1, 0, 1],
	[0, 0, 0]
];

findPath(grid, 0, 0);

// 8.3 -- find magic index of array, i.e., arr[i] = i

function findMagic(arr, i) {

	if (arr[i] === i) {
		return i;
	}

	if (i >= arr.length) {
		return "NO MAGIC INDEX";
	}

	return findMagic(arr, i + 1);

}

var array = [1, 2, 3, 4, 5];

findMagic(array, 0);

// 8.4 -- function to return all subsets of a set

function findPowerSet(set, powerSet) {
	
	if (!set.length) {
		return powerSet;
	}
	
	var setCopy = [].slice.call(set);
	var powerSetCopy = [].slice.call(powerSet);
	
	var newElement = setCopy.pop();
	var newSubset = [newElement];
	
	powerSetCopy.forEach(el => {
	  var copy = el.slice();
    copy.push(newElement);
    powerSetCopy.push(copy);
	});
	
	powerSetCopy.push(newSubset);
	
	return findPowerSet(setCopy, powerSetCopy);

}

var set = [1, 2, 3, 4, 5];

var superSets = findPowerSet(set, []);

// 8.5 -- recursive multiplication

function recursiveMultiply(a, b, count) {

	if (count >= b) {
		return a;
	}

	return recursiveMultiply(a + a, b - 1, count + 1);

}

recursiveMultiply(5, 4, 0);







