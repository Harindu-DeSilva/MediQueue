let patientIdCounter = 1;
const mainPatientQueue = [];
let displayedPatientQueue = [];

class Patient {
  constructor(name, age, severity) {
    this.id = patientIdCounter++;
    this.name = name;
    this.age = parseInt(age);
    this.severity = parseInt(severity);
    this.arrivalTime = new Date();
  }
  getFormattedArrivalTime() {
    return this.arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
