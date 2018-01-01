const moment = require('moment');

// let date = new moment();
// date.add(100, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do YYYY'));

let date = new moment();
let someTimestamp = moment().valueOf();
console.log(someTimestamp)
console.log(date.format('h:mm a'));