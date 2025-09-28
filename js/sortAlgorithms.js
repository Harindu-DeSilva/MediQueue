function insertionSort(arr, key) {
	for (let i = 1; i < arr.length; i++) {
		let current = arr[i];
		let j = i - 1;
		while (j >= 0 && arr[j][key] > current[key]) {
			arr[j + 1] = arr[j];
			j--;
		}
		arr[j + 1] = current;
	}
}


const sortingAlgorithms = {
	insertion: insertionSort
};
window.sortingAlgorithms = sortingAlgorithms;

