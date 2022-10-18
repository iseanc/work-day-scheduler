// ******************************
// DATA DEFINITIONS
// ******************************
// HTML elements
var rootEl = $('#schedule-today');
var divHourEl,spanHourEl, inputHourEl, buttonHourEl, schedHrs;

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

console.log("1500 hrs", moment().hour(15).get('hour'));
console.log("now hrs", moment().hour());
console.log(moment().hour(15).get('hour') < moment().hour());

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

// ******************************
// FOR PAGE HEADER
// ****************************** 

// Display current date
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


// ******************************
// MAKE SCHEDULE
// ******************************

// Get (select) the parent container element

// - dayStartNum, dayEndNum
// get day start/end times;create/display a sequential list of hourly input fields
function makeElements() {
  for (var i = dayStartNum; i < dayEndNum; i++) {
    // Make a "time slot" item
    divHourEl = $('<div>').addClass("input-group m-0");
    // Hour display 
    spanHourEl = $('<span>').attr("data-hour",i).text(moment(i,'hh').format('hh A')).addClass("input-group-text schedule-hour");
    // Text input 
    inputHourEl = $('<textarea>').addClass('hour-note form-control');
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
      // if notes are blank, stop
      if (scheduleEvent === "") {
        return;
      }
      // push the schedule event to the events array
      scheduleArray.push(scheduleEvent);
      // storeToLocalStorage
      storeScheduleEvents();
      // Do I need to re-render to screen?
    });
  }
}
// makeElements();
// setTimeColors();

// schedule = JSON.parse(localStorage.getItem('schedule'));
// console.log(schedule);

for (var i = scheduleArray.length - 1; i >= 0; i--) {
  if (scheduleArray[i].hour == 11) {
     console.log("the index: " + i + " has hour: " + test[i].hour + " and notes:" + test[i].notes);
  //   // console.log(test[i].hour);
  scheduleArray.splice(i, 1);
    console.log(scheduleArray);
  }
}

// console.log(test);

//var index = element.parentElement.getAttribute("data-index");
    //todos.splice(index, 1);

// ****************************************************************
// PULL THESE FUNCTION TEMPLATES IN AS NEEDED
// ****************************************************************


// EVENT LISTENER
// FOR TODOs, THIS IS THE "REMOVE" ACTION
// Add click event to todoList element
// buttonHourEl.addEventListener("click", function(event) {
//   var element = event.target;

//   // Checks if element is a button
//   if (element.matches("button") === true) {
//     // Get its data-index value and remove the todo element from the list
//     var index = element.parentElement.getAttribute("data-index");
//     todos.splice(index, 1);

//     // Store updated todos in localStorage, re-render the list
//     storeTodos();
//     renderTodos();
//   }
// });


// This function is being called below and will run when the page loads.
function init() {
  showCurrentDate();
  // Get stored todos from localStorage
  var storedSchedule = JSON.parse(localStorage.getItem("schedule"));
  console.log(storedSchedule)
  // If todos were retrieved from localStorage, update the todos array to it
  if (storedSchedule !== null) {
    scheduleArray = storedSchedule;
  }
  // This is a helper function that will render todos to the DOM
  console.log()

  // draw the schedule
  makeElements();
  // update schedule colors
  setTimeColors();
}

// store items in local storage
function storeTodos() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("todos", JSON.stringify(todos));
}

// THIS EVENT PUTS ITEMS IN STORAGE THEN UPDATES THE DISPLAY OF ENTRIES IN THE LIST ON THE HTML PAGE

// Add submit event to form
// todoForm.addEventListener("submit", function(event) {
//   event.preventDefault();

//   var todoText = todoInput.value.trim();

//   // Return from function early if submitted todoText is blank
//   if (todoText === "") {
//     return;
//   }

//   // Add new todoText to todos array, clear the input
//   todos.push(todoText);
//   todoInput.value = "";

//   // Store updated todos in localStorage, re-render the list
//   storeTodos();
//   renderTodos();
// });

init()