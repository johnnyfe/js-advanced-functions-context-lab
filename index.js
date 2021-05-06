/* Your Code Here */
function createEmployeeRecord(row){
    return {
    firstName:row[0],
    familyName:row[1],
    title:row[2],
    payPerHour:row[3],
    timeInEvents:[],
    timeOutEvents:[]
    }
}
function createEmployeeRecords (employee){
    return employee.map(function (row){
        return createEmployeeRecord (row)
    })
}
function createTimeInEvent (newDate){
    let [date, hour]=newDate.split(' ')
    this.timeInEvents.push({
        type:"TimeIn",
        hour:parseInt(hour,10),
        date,
    })
    return this
}
function createTimeOutEvent (newDate){
    let [date, hour]=newDate.split(' ')
    this.timeOutEvents.push({
        type:"TimeOut",
        hour:parseInt(hour,10),
        date,
    })
    return this
}
function hoursWorkedOnDate (usedDate){
    let inEvent=this.timeInEvents.find(function(e){
        return e.date === usedDate
    })
    let outEvent=this.timeOutEvents.find(function(e){
        return e.date === usedDate
    })

    return (outEvent.hour - inEvent.hour)/100
}
function wagesEarnedOnDate (aDate){
    let rawWage=hoursWorkedOnDate.call(this,aDate)*this.payPerHour
    return parseFloat(rawWage.toString())
}
function calculatePayroll (arrayOfEmployee){
    return arrayOfEmployee.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}
function findEmployeeByFirstName(collection,firstName){
    return collection.find(function(rec){
        return rec.firstName=firstName
    })
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}