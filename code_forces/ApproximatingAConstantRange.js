'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString.trim().split('\n').map(string => {
      return string.trim();
  });
  
  main();    
});

function readLine() {
  return inputString[currentLine++];
}

function approximatingRange(size, arr) {
  /*
   * Write your code here.
   */

  let currPoint = { value: arr[0], index: 0 };
  let nextPoint = { value: arr[0], index: 0 };
  let minPoint = { value: arr[0], index: 0 };
  let maxPoint = { value: arr[0], index: 0 };
  let maxRange = 0;

  for (let i = 0; i < size; i++) {
    if (Math.abs(arr[i] - arr[i-1]) > 1) {
      const range = i - currPoint.index;
      maxRange = Math.max(maxRange, range);
      currPoint = { value: arr[i], index: i };
      nextPoint = { value: arr[i], index: i };
      minPoint = { value: arr[i], index: i };
      maxPoint = { value: arr[i], index: i };
    } else if (Math.abs(arr[i] - arr[i-1]) === 1) {
      if ((Math.abs(arr[i] - maxPoint.value) > 1) || 
        (Math.abs(arr[i] - minPoint.value) > 1)
      ) {
        const range = i - currPoint.index;
        maxRange = Math.max(maxRange, range);
        currPoint.value = nextPoint.value;
        currPoint.index = nextPoint.index;

        if (arr[i] > nextPoint.value) {
          minPoint = { value: nextPoint.value, index: nextPoint.index };
          maxPoint = { value: arr[i], index: i };
        }
        if (arr[i] < nextPoint.value) {
          maxPoint = { value: nextPoint.value, index: nextPoint.index };
          minPoint = { value: arr[i], index: i };
        }
      }

      nextPoint = { value: arr[i], index: i }
    }   

    if (size === i + 1) {
      const range = size - currPoint.index;
      if (range > maxRange) {
        maxRange = range;
      }
    }
  }

  return maxRange;

}

function main() {
  
  const size = parseInt(readLine(), 10);

  const arr = readLine().split(' ').map(bTemp => parseInt(bTemp, 10));

  console.log(approximatingRange(size, arr));
}
