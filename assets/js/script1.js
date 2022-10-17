//*********************************************************
//DATA DEFINITIONS
//*********************************************************

// Date : {Date}: INTERP: Today's date @typedef
// EXAMPLES: "Thursday, October 13th, 2022"
var currentDate = moment().format("dddd, MMMM Do YYYY");
// FUNCTION TEMPLATE
function tmpl_currentDate(d) {
    return d;
}

// Day Start    : {date} : INTERP: AS TIME, hh a.m., Start of regular business hours
var dayStartNum = 8;
// FUNCTION TEMPLATE
function tmpl_dayStartNum(n) {
    return n;
}

var dayStart = moment().hour(dayStartNum).minute(00).format('hh:mm A');
// FUNCTION TEMPLATE
function tmpl_dayStart(ds) {
    return 
}

// Day End      : {date} : INTERP: AS TIME, hh p.m., End of business hours
var dayEndNum = 17;
// FUNCTION TEMPLATE
function tmpl_dayENDNum(n) {
    return n;
}

var dayEnd = moment().hour(dayEndNum).minute(00).format('hh:mm A');
// FUNCTION TEMPLATE
function tmpl_dayStart(ds) {
    return 
}
console.log(dayStart);
console.log(dayEnd);

// eventItem 	: {Object}/{Mixed data}	: INTERP: A scheduled event
// 				: - Start Time : {Date} : INTERP: Event START Date, hh:mm:ss am/pm or 24hr
// 				: - End Time : {Date} 	: INTERP: Event END Date, hh:mm:ss am/pm or 24hr
//              : - Notes : {String}    : INTERP: Event detail (Any text will do)
// - REQUIRES: End Date must be greater than Start Date
// - REQUIRES: a SAVE button/event to save Event to Events (local storage).
// EXAMPLES: {""}
var eventItem = {
    startTime: "",
    endTime: "",
    notes: ""
}


// Events : {Storage} - Window.localStorage - {Object}/{Mixed data}
// INTERP: Store Event objects for retrieval and display in Calendar
// - REQUIRES: on STORE, JSON.Stringify to convert Event Object to String
// - REQUIRES: on RETRIEVE, JSON.parse to convert back to Event obj



// - Itemized hours	: array of dates: INTERP: AS TIME, 1 hour increments from reg
// 									: NOTES:
// 									: - The business hours from regularHoursStart to ...End
// 									: - (at least display)
// 									: - FORMAT: hh am/pm or hh 24hr)
		
