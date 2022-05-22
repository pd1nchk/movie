 /* Can be true or false */
 let weekStartOnMonday = true;
 let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
               'August', 'September', 'October', 'November', 'December'];
 let days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sut', 'Sun'];
 // DO NOT CHANGE THE letIABLES BELOW!
 // Keep track of row and cell for the table.
 let tableRowPos = rowCellPos = 0;
 let table = document.getElementById('tableCalendar');
 // Global date object and letiables
 let date = new Date();
 let row = "";
 Date.prototype.monthName = function() {
   return months[this.getMonth()];
 };
 Date.prototype.dayName = function(i) {
   return days[i];
 }
 /**
  * This needs to have a new Date(), since we do not want to change the
  * let date = new Date() object above.
  */
 Date.prototype.getStartDay = function() {
   let start = new Date(this.getFullYear(), this.getMonth(), '1').getDay();
   if(start == 0 && weekStartOnMonday == true) { start = 7; }
   return start;
 }
 /**
 * This needs to have a new Date(), since we do not want to change the
 * let date = new Date() object above.
 */
 Date.prototype.getDaysInMonth = function() {
   return new Date(this.getFullYear(), this.getMonth()+1, 0).getDate();
 }
 /**
  * This is the onLoad func.
  */
 function loadCalendar() {
   table = document.getElementById("tableCalendar");
   setStartDay();
   buildMonthYear();
   buildWeekDaysName();
   buildDays();
   addRowHandlers();
 }
 /**
  * Change the month. Dir is 1 or -1
  */
 function changeMonth(dir) {
   date.setMonth(date.getMonth()+dir);
   emptyTable();
   buildMonthYear();
   buildWeekDaysName();
   buildDays();
 }
 /**
  * Set a new row for table.
  */
 function setNewRow(table) {
   rowCellPos = 0;
   return table.insertRow(tableRowPos++);
 }
 /**
  * Set a new cell for certain row in table.
  */
 function setNewCell(row) {
   return row.insertCell(rowCellPos++);
 }
 /**
  * Set an empty cell.
  */
 function setEmptyCell(iStart, length) {
   for(let i = iStart; i < length; i++) {
     setNewCell(row).innerHTML = "&nbsp;";
   }
 }
 /**
  * Set the names of the weekdays
  */
 function buildWeekDaysName() {
   row = setNewRow(table);
   for(let i = 0; i < 7; i++) {
     setNewCell(row).innerHTML = date.dayName(i);
   }
 }
 /**
  * Build table from Date object.
  */
 function buildDays() {
   row = setNewRow(table);
   let startPos = (weekStartOnMonday) ? 1 : 0;
   setEmptyCell(startPos, date.getStartDay());
   for(let i = 1; i <= date.getDaysInMonth(); i++) {
     if(rowCellPos % 7 == 0) {
       row = setNewRow(table);
     }
     let cell = setNewCell(row);
     cell.innerHTML = i;
     if(date.getDate() == i) { cell.className = 'today'; }
   }
   setEmptyCell(rowCellPos, 7);
   // global let needs to be reset
   tableRowPos = rowCellPos = 0;
 }
 /**
  * Set the monthname and year.
  */
 function buildMonthYear() {
   document.getElementById("choosenMonth").innerHTML = date.monthName() + " " + date.getFullYear();
 }
 /**
  * Empty the table when changing month.
  */
 function emptyTable() {
   document.getElementById("tableCalendar").innerHTML = "";
 }
 /**
  * Если неделя начинается в воскресенье, изменяется порядок.
  */
 function setStartDay() {
   if(weekStartOnMonday == false) {
     days.unshift(days[6]);
     days.pop();
   }
 }

 function addRowHandlers() {
  let table = document.getElementById("tableCalendar");
  let rows = table.getElementsByTagName("tr");
  for (i = 0; i < rows.length; i++) {
    let currentRow = table.rows[i];
    let createClickHandler = function(row) {
      return function() {
        let cell = row.getElementsByTagName("td")[i];
        let id = cell.innerHTML;
        alert("id:" + id);
      };
    };
    currentRow.onclick = createClickHandler(currentRow);
  }
}