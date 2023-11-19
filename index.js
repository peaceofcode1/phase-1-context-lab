function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeesData) {
    return employeesData.map(employeeData => createEmployeeRecord(employeeData));
  }
  
  function createTimeInEvent(dateStamp) {
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(dateStamp.split(" ")[1], 10),
      date: dateStamp.split(" ")[0]
    });
  
    return this;
  }
  
  function createTimeOutEvent(dateStamp) {
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(dateStamp.split(" ")[1], 10),
      date: dateStamp.split(" ")[0]
    });
  
    return this;
  }
  
  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date).hour;
    const timeOut = this.timeOutEvents.find(event => event.date === date).hour;
  
    return (timeOut - timeIn) / 100;
  }
  
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
  
  function allWagesFor() {
    const datesWorked = this.timeInEvents.map(event => event.date);
  
    return datesWorked.reduce((totalWages, date) => {
      return totalWages + wagesEarnedOnDate.call(this, date);
    }, 0);
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor.call(employee);
    }, 0);
  }
  
  
  const employeeRecords = [
    createEmployeeRecord(["John", "Doe", "Manager", 25]),
    createEmployeeRecord(["Jane", "Smith", "Developer", 20]),
   
  ];
  
  
  console.log(createEmployeeRecords([
    ["John", "Doe", "Manager", 25],
    ["Jane", "Smith", "Developer", 20]
  ]));
  
 
  const totalPayroll = calculatePayroll(employeeRecords);
  console.log("Total Payroll:", totalPayroll);
  