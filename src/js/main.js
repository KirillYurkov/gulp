'use strict'
// import Calendar from "./calendar.js";
let date=new Date();
let year=date.getFullYear();
let month=date.getMonth();
let calendar=new Calendar('calendar');
calendar.createCalendar(year,month);


