class ArrayQueue {
  constructor(capacity) {
    this.capacity = capacity;
    this.arr = new Array(capacity);
    this.front = 0;
    this.rear = -1;
    this.size = 0;
  }

  enqueue(data) {
    if (this.isFull()) {
      if (typeof showNotification === 'function') {
        showNotification("Queue Overflow. Cannot add patient.", "error");
      }
      return false;
    }
    this.rear = (this.rear + 1) % this.capacity;
    this.arr[this.rear] = data;
    this.size++;
    if (typeof showNotification === 'function') {
      showNotification(`Inserted: ${data.name}`);
    }
    return true;
  }

  dequeue() {
    if (this.isEmpty()) {
      if (typeof showNotification === 'function') {
        showNotification("Queue Underflow. No patients to serve.", "error");
      }
      return null;
    }
    // Find the index of the patient with the highest priority (lowest severity)
    let highestPriorityIdx = this.front;
    for (let i = 1; i < this.size; i++) {
      const idx = (this.front + i) % this.capacity;
      if (this.arr[idx].severity < this.arr[highestPriorityIdx].severity) {
        highestPriorityIdx = idx;
      }
    }
    const value = this.arr[highestPriorityIdx];
    // Shift elements to fill the gap
    for (let i = highestPriorityIdx; i !== this.rear; i = (i + 1) % this.capacity) {
      const nextIdx = (i + 1) % this.capacity;
      this.arr[i] = this.arr[nextIdx];
    }
    this.arr[this.rear] = undefined;
    this.rear = (this.rear - 1 + this.capacity) % this.capacity;
    this.size--;
    return value;
  }

  isEmpty() {
    return this.size === 0;
  }
  isFull() {
    return this.size === this.capacity;
  }
  getSize() {
    return this.size;
  }
  getQueueArray() {
    const result = [];
    for (let i = 0; i < this.size; i++) {
      const index = (this.front + i) % this.capacity;
      result.push(this.arr[index]);
    }
    return result;
  }
}

// Provide a global patientQueue instance for use in UI and other modules
window.patientQueue = new ArrayQueue(100);
