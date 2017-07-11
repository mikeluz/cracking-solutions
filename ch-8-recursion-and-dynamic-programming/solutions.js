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

// 8.2