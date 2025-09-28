function binarySearch(arr, key, value) {
  insertionSort(arr, key);
  let left = 0, right = arr.length - 1;
  const targetValue = key === 'id' ? parseInt(value) : value.toLowerCase();
}
