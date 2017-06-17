// Arrays and Strings

// 1.1 -- write a function that determines whether each character in a string is unique (not repeated)
function uniq(str) {

  if (str.length > 128) return false;
  
  let hash = {}
  
  for (let i = 0; i < str.length; i++) {
    let current = str.charAt(i)
    if (hash[current]) {
      return false;
    } else {
      hash[current] = 1;
    }
  }
  
  return true;
  
}

uniq("simple") // true

// 1.2 -- write a function that determines if two strings contain the exact same letters (are permutations of each other)
function perm(str1, str2) {
  
  let sorted1 = str1.split('').sort().join('')
  let sorted2 = str2.split('').sort().join('')
  
  if (sorted1 === sorted2) return true
  else return false
  
}

perm("hello", "olehl") // true

// 1.3 -- write a function that replaces whitespace with '%20'
function url(str) {

	let arr = str.split("")

	let result = [];

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] !== " ") {
			result.push(arr[i])
		}
		if (arr[i+1] === " " || arr[i+1] === undefined) {
			continue;
		}
		if (arr[i] === " ") {
			result.push("%20")
		}
	}

	return result.join("");

}

url("an     example   input  here    ") // "an%20example%20input%20here"

// 1.4 -- write a function that determines if a string is a permutation of a palindrome
function permPal(str) {

	let strCopy = str.toLowerCase().slice('').split('')
	let currentLetter = [strCopy.shift()]
	let perms = [currentLetter];

	while (strCopy.length) {

		currentLetter = strCopy.shift();	
		let newPerms = [];

		perms.forEach(perm => {

			let filtered = perm.filter(el => {
				return el !== " ";
			})

			for (let k = 0; k <= filtered.length; k++) {
				let tmp = filtered.slice()
				tmp.splice(k, 0, currentLetter) // (start index, # to delete, what to insert), inserts third arg at the first arg index, second arg is # of elements to delete starting from first arg index
				newPerms.push(tmp)
			}
		})

		perms = newPerms;

	}

	let answer = perms.some(perm => {
	  let forward = perm.slice().join('')
		let backward = perm.slice().reverse().join('')
    return forward === backward
	})

	return answer;

}

permPal("Tact Coa"); // true

// 1.5 -- write a function that checks if a str is a single edit from being a second
function isLonger(str1, str2) {
	if (str1.length > str2.length) {
		return str1;
	}
	return str2;
}

function isShorter(str1, str2) {
	if (str1.length < str2.length) {
		return str1;
	}
	return str2;
}

function oneEdit(str1, str2) {

	// deletion/insertion edit
	if (str1.length === str2.length) {

		for (let i = 0; i < str2.length; i++) {
			if (str1[i] !== str2[i]) {
			  let str1Slice = str1.slice(1)
			  let str2Slice = str2.slice(1)
			  if (str1Slice !== str2Slice) {
			    return false;
			  }
			}
		}
		
		return true;		

	} 

	if (Math.abs(str1.length - str2.length) === 1) {
		let longer = isLonger(str1, str2)
		let shorter = isShorter(str1, str2)
		for (let i = 0; i < shorter.length; i++) {
			if (longer[i] !== shorter[i]) {
				if (longer[i+1] !== shorter[i]) {
					return false
				}
			}
		}

		// one edit away: delete one letter from 
		return true;

	}

	// not one edit away
	return false;

}

oneEdit("pale", "bake") // false

// 1.6 -- write a function that compresses a string by replacing repeated letters with the # of repeats
function comp(str) {
  
  let count = 1;
  let currentLetter = '';
  let compStr = str.slice();
  
  for (var i = 0; i < compStr.length; i++) {
    currentLetter = compStr[i]
    while (currentLetter === compStr[i+count]) {
      count++;
    }
    if (count > 1) {
      compStr = compStr.slice(0,i) + currentLetter + count + compStr.slice(i+count)
      count = 1;
    }
  }
  
  return compStr;
  
}

comp('aaabbbbccccc'); // "a3b4c5"

// 1.7 -- write a function to rotate an NxN matrix (square two-dimensional array) 90 degrees
function rotateNinety(matrix) {
  
  let rotated = [];
  
  let tempRow = [];
  let index = 0;
  
  while (index < matrix.length) {
    for (let i = matrix.length-1; i >= 0; i--) {
      tempRow.push(matrix[i][index]);
    }
    rotated.push(tempRow)
    tempRow = [];
    index++;
  }

  return rotated;
  
}

rotateNinety([[1,2,3],[4,5,6],[7,8,9]]); // [ [ 7, 4, 1 ], [ 8, 5, 2 ], [ 9, 6, 3 ] ]

// 1.8 -- write a function that takes an NxM matrix and if there is a zero, turns all elements in that row and column to zeros
function zeroRow(array) {
  
  let copy = array.slice()
  
  for (let i = 0; i < copy.length; i++) {
    copy[i] = 0; 
  }
  
  return copy;
}

function zeroMatrix(matrix) {
  
  let zeroIndices = [];
  
  matrix.forEach((row, index) => {
    for (let i = 0; i < row.length; i++) {
      if (row[i] === 0) {
        zeroIndices.push(i);
        matrix[index] = zeroRow(row);
      }
    }
  })
  
  let currentIndex = zeroIndices.pop();
  
  while (currentIndex) {
    
    for (var k = 0; k < matrix.length; k++) {
     matrix[k][currentIndex] = 0;   
    }
   
    currentIndex = zeroIndices.pop();
    
  }
  
  return matrix;
  
}

zeroMatrix([[1,2,0,5],[4,5,6,6],[7,8,9,0]]); // [ [ 0, 0, 0, 0 ], [ 4, 5, 0, 0 ], [ 0, 0, 0, 0 ] ]

// 1.9 -- write a function that determines if str2 (2nd arg) is a rotation of str1 (1st arg) with one call to isSubstring
function isRotation(str1, str2) {

	if (str1.length !== str2.length) return false;

	let double = str1 + str1;

	return double.includes(str2)

}

isRotation("water", "erwat"); // true







