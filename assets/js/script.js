// ******************************
// DATA DEFINITIONS
// ******************************
// HTML elements
var rootEl = $('#schedule-today');
var divHourEl, spanHourEl, inputHourEl, buttonHourEl, schedHrs;

// Date : {Date}: INTERP: Today's date
// EXAMPLES: "Thursday, October 13th, 2022"
var currentDate = moment().format("dddd, MMMM Do YYYY");
// FUNCTION TEMPLATE
function tmpl_currentDate(d) {
    return d;
}

var currentHour = moment().hour();

// Day Start Time : {number} : INTERP: Start of regular business hours
var dayStartNum = 8;
// FUNCTION TEMPLATE
function tmpl_dayStartNum(n) {
    return n;
}

// Formatted Day Start : {date} : INTERP: 
var dayStartTime = moment().hour(dayStartNum).minute(00).format('hh:mm A');
// FUNCTION TEMPLATE
function tmpl_dayStart(ds) {
    return 
}

// Day End : {date} : INTERP: AS TIME, hh p.m., End of business hours
var dayEndNum = 17;
// FUNCTION TEMPLATE
function tmpl_dayENDNum(n) {
    return n;
}

var dayEndTime = moment().hour(dayEndNum).minute(00).format('hh:mm A');
// FUNCTION TEMPLATE
function tmpl_dayStart(ds) {
    return 
}

var scheduleArray = [];

// Display current date at top of page
function showCurrentDate() {
  $("#currentDay").text(currentDate);
}

// store items in local storage
function storeScheduleEvents() {
  // Stringify and set key in localStorage to schedule array
  localStorage.setItem("schedule", JSON.stringify(scheduleArray));
}
// sets schedule background color based on if timeblock is past, present or future
function setTimeColors() {
  schedHr = $(".schedule-hour");
  schedHr.each(function( i ) {
      // PAST: if div-hour(data-hour) is less than current hour
     if (this.dataset.hour < currentHour) {
          this.style.backgroundColor = 'lightgrey';
          this.nextSibling.style.backgroundColor = 'lightgrey';
      }
      //PRESENT: else if div-hour = current hour
      else if (this.dataset.hour == currentHour) {
        this.style.backgroundColor = 'pink';
        this.nextSibling.style.backgroundColor = 'pink';
      }
      //FUTURE: else if div-hour > current hour
      else if (this.dataset.hour > currentHour) {
          // set background color = GREEN
          this.style.backgroundColor = 'lightgreen';
          this.nextSibling.style.backgroundColor = 'lightgreen';
      }
  });
}

// use for sorting scheduleArray
function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const hourA = Number(a.hour);
  const hourB = Number(b.hour);

  let comparison = 0;
  if (hourA > hourB) {
    comparison = 1;
  } else if (hourA < hourB) {
    comparison = -1;
  }
  return comparison;
}

// Use to render hour blocks on webpage
function renderSchedule() {
  for (var i = 0; i < scheduleArray.length; i++) {
    console.log(scheduleArray[i].notes);
    $("#data-note-" + scheduleArray[i].hour).val(scheduleArray[i].notes)
  }
}

// Create schedule elements to draw on screen
// get day start/end times;create/display a sequential list of hourly input fields
function makeElements() {
  for (var i = dayStartNum; i < dayEndNum; i++) {
    // Make a "time slot" item
    divHourEl = $('<div>').addClass("input-group m-0");
    // Hour display 
    spanHourEl = $('<span>').attr("data-hour",i).text(moment(i,'hh').format('hh A')).addClass("input-group-text schedule-hour");
    // Text input 
    inputHourEl = $('<textarea>').addClass('hour-note form-control').attr("id","data-note-" + i);
    // Save button
    buttonHourEl = $('<button>').text("Save").attr("id", "btn-hour-" + i).addClass("btn btn-outline-secondary btn-dark");
    // append TimeSlot parent to schedule container
    rootEl.append(divHourEl);
    // append hourly text area to TimeSlot
    divHourEl.append(spanHourEl, inputHourEl, buttonHourEl);

    // add event listener for SAVE button
    buttonHourEl.on("click", function(event) { 

      event.preventDefault();

      var element = event.target;
      var scheduleHour = $(element).parent().children('span').attr('data-hour');
      var scheduleNote = $.trim($(element).parent().children('textarea').val());
      // Do I need to put this is an array or object first?
      // Add new todoText to events array
      var scheduleEvent = {
        hour : scheduleHour,
        notes: scheduleNote
      }
    
      // check if an entry for 'data-hour' already exists in the scheduleArray (in memory)
      for (var i = 0; i < scheduleArray.length; i++) {
        
        scheduleArray.sort(compare);
        console.log(scheduleArray);
        //if there are existing entries in the array for this hour
        if (scheduleArray[i].hour == scheduleHour) {
          // remove those entries from the array
          scheduleArray.splice(i, 1);
          // In this case, decrement index by 1 so search ensures all matching entries get removed
          i--;
        }

        // BUG:  BELOW snippet was removed from function as it introduces a problem with old schedule entries getting written to the screen
        // when a textarea is saved with empty contents to remove an entry.

        // if notes for the current text area are blank, then stop
        // -- (don't add anything new to the array)
        // console.log(scheduleEvent.notes)
        // if (scheduleEvent.notes === "") {
        //   return;
        // } 
      }
      // push the schedule event to the events array
      scheduleArray.push(scheduleEvent);
      // storeToLocalStorage
      storeScheduleEvents();
    });
  }
}

// Do all this on page load (called @ end of JS)
function init() {
  // show date on page
  showCurrentDate();
  // Get stored todos from localStorage
  var storedSchedule = JSON.parse(localStorage.getItem("schedule"));
  // If todos were retrieved from localStorage, update the todos array to it
  if (storedSchedule !== null) {
    scheduleArray = storedSchedule;
  }
  // draw the schedule
  makeElements();
  // update schedule colors
  setTimeColors();
  // render the initial schedule
  renderSchedule();
}

// store items in local storage
function storeTodos() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("todos", JSON.stringify(todos));
}

init()