// 5.1 -- insert number M into N starting at position start and ending at end (from left to right)

function insertBin(n, m, start, end) {

	var nCleared = n;
	var mShifted = m << end;

	for (var i = end; i <= start; i++) {
		nCleared = nCleared & ~(1 << i);
	}

	return nCleared | mShifted;

}

insertBin(1024, 19, 6, 2); // returns 1100, or '10001001100' in binary

// 5.2 -- 

