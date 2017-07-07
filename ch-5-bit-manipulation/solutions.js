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

// 5.3 -- you can flip one bit of a number; return the largest string of 1s you can create with this one move
function findMostOnes(num) {
  
  var bin = num.toString(2);
  var oneCounts = [];
  var count = 0;
  
  for (var i = 0; i < bin.length; i++) {
    if (bin[i] === "0") {
    	if (count > 0) {
    		oneCounts.push(count);
    		count = 0;
    	}
    	continue;
    } else {
    	count++;
    	if (i === (bin.length - 1)) {
    	  oneCounts.push(count)
    	}
    }
  }

  var largest = 0;
  
  for (var k = 0; k < oneCounts.length; k++) {
    var current = oneCounts[k] + (oneCounts[k+1] ? oneCounts[k+1] : 0); 
    if (current > largest) {
      largest = current;
    }
  }
  console.log(oneCounts);
 	
 	return largest + 1;
  
}

findMostOnes(573567); // returns 10

// 5.4 -- given an int print the next largest and next smallest integer with same # of 1s in its binary representation
function sameNumOfOnes(num) {

	var bin = num.toString(2);
	var numOfOnes = 0;
	var lessNumOfOnes = 0;
	var moreNumOfOnes = 0;

  console.log(num, bin);

	for (var i = 0; i < bin.length; i++) {
		if (bin[i] === "1") {
			numOfOnes++;
		}
	}

	var less = (num - 1);
	var lessBin;

	while (lessNumOfOnes !== numOfOnes) {

		lessBin = less.toString(2);
		lessNumOfOnes = 0;

		for (var i = 0; i < bin.length; i++) {
			if (lessBin[i] === "1") {
				lessNumOfOnes++;
			}
		}
  
		if (lessNumOfOnes === numOfOnes) {
			console.log(less, lessBin);
			break;
		}

		less--;
	}

	var more = (num + 1);
	var moreBin;

	while (moreNumOfOnes !== numOfOnes) {

		moreBin = more.toString(2);
		moreNumOfOnes = 0;

		for (var i = 0; i < bin.length; i++) {
			if (moreBin[i] === "1") {
				moreNumOfOnes++;
			}
		}

    console.log(moreNumOfOnes);
		if (moreNumOfOnes === numOfOnes) {
			console.log(more, moreBin);
			break;
		}

		more++;
	}

}

sameNumOfOnes(11352);

// 5.6 -- write function that determines the number of bits that would need to be switch to turn one given int into another given int
function numOfConversionBits(a, b) {

	var xor = a ^ b;

	var bin = xor.toString(2);

	var countOfOnes = 0;

	for (var i = 0; i < bin.length; i++) {
		if (bin[i] === "1") {
			countOfOnes++;
		}
	}

	return countOfOnes;

}

numOfConversionBits(29, 15); // returns 2

// 5.7 -- pairwise swap, swap odd and even bits in as few instructions as possible
function pairwiseSwap(num) {
	var bin = num.toString(2).split('');
	var temp;
  var i = bin.length - 1;

	while (i > 0) {
		if (bin[i] !== bin[i-1]) {
			temp = bin[i];
			bin[i] = bin[i-1];
			bin[i-1] = temp;
		}
		if ((i -2 ) < 0) {
		  break;
		}
		i = i - 2;
	}

	return bin.join('');
}

pairwiseSwap(54); // returns 111001
