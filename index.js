function createEmployeeRecord(array) {
  const obj = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return obj;
}

function createEmployeeRecords(array) {
  return array.map(element => {
    return createEmployeeRecord(element);
  });
}

function createTimeInEvent(recordObject, string) {
  let dateArray = string.split(" ");
  let obj = {
    type: "TimeIn",
    hour: parseInt(dateArray[1], 10),
    date: dateArray[0]
  };
  recordObject.timeInEvents.push(obj);
  return recordObject;
}

function createTimeOutEvent(recordObject, string) {
  let dateArray = string.split(" ");
  let obj = {
    type: "TimeOut",
    hour: parseInt(dateArray[1], 10),
    date: dateArray[0]
  };
  recordObject.timeOutEvents.push(obj);
  return recordObject;
}

function hoursWorkedOnDate(recordObject, dateString) {
  let selectedDayInTime = recordObject.timeInEvents.find(
    day => day.date === dateString
  ).hour;
  let selectedDayOutTime = recordObject.timeOutEvents.find(
    day => day.date === dateString
  ).hour;
  const workedTime = (selectedDayOutTime - selectedDayInTime) / 100;
  return workedTime;
}

function wagesEarnedOnDate(employeeRecord, date) {
  return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  let datesWorked = employeeRecord.timeInEvents.map(day => day.date);
  let payAmount = datesWorked.reduce((accumulator, date) => {
    return accumulator + wagesEarnedOnDate(employeeRecord, date);
  }, 0);
  return payAmount;
}

function calculatePayroll(array) {
  return array.reduce((accumulator, employee) => {
    return accumulator + allWagesFor(employee);
  }, 0);
}

function findEmployeeByFirstName(sourceArray, firstName) {
  return sourceArray.find(employee => employee.firstName === firstName);
}
