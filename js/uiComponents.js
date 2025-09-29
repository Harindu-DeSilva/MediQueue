const addPatientForm = document.getElementById("add-patient-form");
const patientQueueBody = document.getElementById("patient-queue");
const patientTable = document.getElementById("patient-table");
const queueStatus = document.getElementById("queue-status");
const dequeueBtn = document.getElementById("dequeue-btn");
const sortBtn = document.getElementById("sort-btn");
const searchBtn = document.getElementById("search-btn");
const resetViewBtn = document.getElementById("reset-view-btn");
const notification = document.getElementById("notification");
const notificationMessage = document.getElementById("notification-message");

// Initial render
updateAndRenderQueue();

// Event Listeners
addPatientForm.addEventListener("submit", handleAddPatient);
dequeueBtn.addEventListener("click", handleDequeuePatient);
sortBtn.addEventListener("click", handleSort);
searchBtn.addEventListener("click", handleSearch);
resetViewBtn.addEventListener("click", handleResetView);
document.getElementById("search-algo").addEventListener("change", (e) => {
  const searchAlgo = e.target.value;
  const searchBySelect = document.getElementById("search-by");
  if (searchAlgo === "binary") {
    showNotification(
      "Binary search requires the data to be sorted. The view will be sorted by the search key."
    );
    // Binary search works best with unique keys like ID or sorted names.
  }
});

// Event Handlers

function handleAddPatient(e) {
  e.preventDefault();
  const name = e.target.name.value.trim();
  const age = e.target.age.value;
  const severity = e.target.severity.value;
  if (name && age && severity) {
    const newPatient = new Patient(name, age, severity);
    patientQueue.enqueue(newPatient);
    updateAndRenderQueue();
    e.target.reset();
  } else {
    showNotification("Please fill all fields correctly.", "error");
  }
}


function handleDequeuePatient() {
  const servedPatient = patientQueue.dequeue();
  if (servedPatient) {
    showNotification(`Serving patient: ${servedPatient.name} (ID: ${servedPatient.id})`);
  }
  updateAndRenderQueue();
}

// function to handle sorting
function handleSort() {
  if (patientQueue.getSize() < 2) {
    showNotification("Need at least two patients to sort.", "error");
    return;
  }
  const sortBy = document.getElementById("sort-by").value;
  const sortAlgo = document.getElementById("sort-algo").value;

  // Create a copy to sort, preserving the original queue order
  displayedPatientQueue = patientQueue.getQueueArray();

  const sortFunction = sortingAlgorithms[sortAlgo];
  const startTime = performance.now();
  sortFunction(displayedPatientQueue, sortBy);
  const endTime = performance.now();

  renderQueue(displayedPatientQueue);
  showNotification(
    `Sorted by ${sortBy} using ${sortAlgo} sort in ${(
      endTime - startTime
    ).toFixed(2)}ms.`
  );
}


function handleResetView() {
  updateAndRenderQueue();
  showNotification("View has been reset to the original queue.");
}

// UI Rendering Functions

function updateAndRenderQueue() {
  displayedPatientQueue = patientQueue.getQueueArray();
  renderQueue(displayedPatientQueue);
}

function renderQueue(queueToRender, highlightIndex = -1) {
  patientQueueBody.innerHTML = "";

  if (queueToRender.length === 0) {
    patientTable.classList.add("hidden");
    queueStatus.classList.remove("hidden");
  } else {
    patientTable.classList.remove("hidden");
    queueStatus.classList.add("hidden");

    queueToRender.forEach((patient, index) => {
      const row = document.createElement("tr");
      row.className =
        "hover:bg-indigo-50 transition-colors duration-200 fade-in-row";

      if (index === highlightIndex) {
        row.className += " bg-green-200";
      }

      const severityClasses = getSeverityClasses(patient.severity);

      row.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${
                          patient.id
                        }</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${
                          patient.name
                        }</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${
                          patient.age
                        }</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                            <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              severityClasses.bg
                            } ${severityClasses.text}">
                                ${patient.severity}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${patient.getFormattedArrivalTime()}</td>
                    `;
      patientQueueBody.appendChild(row);
    });
  }
}

function getSeverityClasses(severity) {
  switch (severity) {
    case 1:
      return { bg: "bg-red-100", text: "text-red-800" }; // Critical
    case 2:
      return { bg: "bg-orange-100", text: "text-orange-800" }; // High
    case 3:
      return { bg: "bg-yellow-100", text: "text-yellow-800" }; // Medium
    case 4:
      return { bg: "bg-green-100", text: "text-green-800" }; // Low
    case 5:
      return { bg: "bg-blue-100", text: "text-blue-800" }; // Minor
    default:
      return { bg: "bg-gray-100", text: "text-gray-800" };
  }
}

function showNotification(message, type = "info") {
  notificationMessage.textContent = message;

  // Reset classes
  notification.className =
    "fixed top-5 right-5 text-white py-2 px-5 rounded-lg shadow-xl transform translate-x-[120%] opacity-0";

  if (type === "error") {
    notification.classList.add("bg-red-500");
  } else if (type === "success") {
    notification.classList.add("bg-green-500");
  } else {
    notification.classList.add("bg-indigo-500");
  }

  // Animate in
  requestAnimationFrame(() => {
    notification.classList.remove("translate-x-[120%]", "opacity-0");
  });

  // Animate out after 3 seconds
  setTimeout(() => {
    notification.classList.add("translate-x-[120%]", "opacity-0");
  }, 3000);
}

