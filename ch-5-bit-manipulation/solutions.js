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

// 5.2 -- convert decimal to binary representation

function roundDecimal(decimal, places) {
  var count = places;
  var value = decimal;
  while (count > 0) {
    value = value * 10;
    count--;
  }
  return Number("0." + Math.round(value).toString(10));
}

function decimalToBinary(decimal) {
  var binStr = "0.";
  var newBit;
  var doubled = decimal;
  var patternStart;
  var places;
  
  while (doubled > 0) {
    if (binStr.length < 64) {
      doubled = doubled * 2;
      newBit = Math.floor(doubled);
      doubled = doubled - newBit;
      if (!patternStart) {
        patternStart = doubled;
        places = Number(patternStart.toString(10).length) - 2;
      };
      if (roundDecimal(patternStart, 6) === roundDecimal(doubled, 6) && binStr.length > 3) {
        return binStr;
      }
      binStr += newBit;
    } else {
      return "ERROR";
    } 
  }
  
  return binStr;
  
}

decimalToBinary(.6);
decimalToBinary(.86);
decimalToBinary(.72)
decimalToBinary(.37);
decimalToBinary(.65);
decimalToBinary(.7223);

// 5.3 -- 

