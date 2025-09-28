function binarySearch(arr, key, value) {
  insertionSort(arr, key);
  let left = 0, right = arr.length - 1;
  const targetValue = key === 'id' ? parseInt(value) : value.toLowerCase();

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = typeof arr[mid][key] === 'string' ? arr[mid][key].toLowerCase() : arr[mid][key];
    if (midValue === targetValue) return mid;
    if (midValue < targetValue) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
