function findMax(arr) {
  let max = arr[0];
  arr.forEach(e => {
    max = e > max ? e : max;
  });
  return max;
}

function findMin(arr) {
  let min = arr[0];
  arr.forEach(e => {
    min = e < min ? e : min;
  });
  return min;
}

function includes(arr, val) {
  for (let e of arr) {
    if (e === val) return true;
  }
  return false;
}

function sum(arr) {
  let cont = 0;
  for (let e of arr) {
    cont += e;
  }
  return cont;
}

function missingNumbers(arr) {
  const start = findMin(arr);
  const finish = findMax(arr);
  const faltantes = [];

  for (let i = start; i < finish; i++) {
    if (!includes(arr, i)) {
      faltantes.push(i);
    }
  }
  return faltantes;
}

module.exports = {
  findMax,
  findMin,
  includes,
  sum,
  missingNumbers
};
